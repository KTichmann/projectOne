import * as session from "express-session";
import * as connectMongo from "connect-mongo";
import { GraphQLServer } from "graphql-yoga";
import { createTypeormConn } from "./utils/createTypeormConn";
import { confirmEmail } from "./routes/confirmEmail";
import { genSchema } from "./utils/genSchema";
import { MongoDb } from "./utils/mongoDb";
import console = require("console");

const MongoStore = connectMongo(session);

export const startServer = async () => {
	const SESSION_SECRET = process.env.SESSION_SECRET;
	const MONGO_URL = process.env.MONGO_URL;

	const mongo = await MongoDb();

	// make graphql server, passing in schema array to mergeSchemas to make one schema
	const server = new GraphQLServer({
		schema: genSchema(),
		context: ({ request }) => ({
			mongo,
			url: request.protocol + "://" + request.get("host"),
			session: request.session,
			req: request
		})
	});

	// const limiter = RateLimit({
	// 	store: new RateLimitMongoStore({ uri: MONGO_URL }),
	// 	max: 100,
	// 	windowMs: 15 * 60 * 1000
	// });
	// server.express.use(limiter);

	server.express.use(
		session({
			store: new MongoStore({
				url: MONGO_URL as string,
				stringify: false
			}),
			name: "tid",
			secret: SESSION_SECRET!,
			resave: false,
			saveUninitialized: false,
			cookie: {
				httpOnly: true,
				// secure: process.env.NODE_ENV === "production",
				secure: false,
				maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days,
				sameSite: false
			}
		})
	);

	const cors = {
		credentials: true,
		origin:
			process.env.NODE_ENV === "test"
				? "*"
				: (process.env.FRONTEND_HOST as string)
	};

	server.express.get("/confirm/:id", (req, res) =>
		confirmEmail(req, res, mongo)
	);

	// connect to our db through typeorm
	await createTypeormConn();
	const app = await server.start({
		cors,
		port: process.env.NODE_ENV === "test" ? 0 : process.env.PORT || 4000
	});

	console.log(
		`Server is running on localhost:${
			process.env.NODE_ENV === "test" ? 0 : process.env.PORT || 4000
		}`
	);

	return app;
};
