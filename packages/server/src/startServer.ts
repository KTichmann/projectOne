import * as session from "express-session";
import * as connectRedis from "connect-redis";
// import * as RateLimit from "express-rate-limit";
// import * as RateLimitRedisStore from "rate-limit-redis";

import { GraphQLServer } from "graphql-yoga";
import { createTypeormConn } from "./utils/createTypeormConn";
import { redis } from "./redis";
import { confirmEmail } from "./routes/confirmEmail";
import { genSchema } from "./utils/genSchema";
import { redisSessionPrefix } from "./constants";
import { MongoDb } from "./utils/mongoDb";

const SESSION_SECRET = "asdfj;124;hae[0u2q45nasdf1234";
const RedisStore = connectRedis(session);

export const startServer = async () => {
	const mongo = await MongoDb();

	// make graphql server, passing in schema array to mergeSchemas to make one schema
	const server = new GraphQLServer({
		schema: genSchema(),
		context: ({ request }) => ({
			mongo,
			redis,
			url: request.protocol + "://" + request.get("host"),
			session: request.session,
			req: request
		})
	});

	// server.express.use(
	// 	new RateLimit({
	// 		store: new RateLimitRedisStore({
	// 			client: redis
	// 		}),
	// 		windowMs: 15 * 60 * 1000,
	// 		max: 100
	// 	})
	// );

	server.express.use(
		session({
			store: new RedisStore({
				client: redis as any,
				prefix: redisSessionPrefix
			}),
			name: "tid",
			secret: SESSION_SECRET,
			resave: false,
			saveUninitialized: false,
			cookie: {
				httpOnly: true,
				secure: process.env.NODE_ENV === "production",
				maxAge: 1000 * 60 * 60 * 24 * 7 // 7 days
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
		port: process.env.NODE_ENV === "test" ? 0 : 4000
	});

	console.log(
		`Server is running on localhost:${
			process.env.NODE_ENV === "test" ? 0 : 4000
		}`
	);

	return app;
};
