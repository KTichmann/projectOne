"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const session = require("express-session");
const connectMongo = require("connect-mongo");
const graphql_yoga_1 = require("graphql-yoga");
const createTypeormConn_1 = require("./utils/createTypeormConn");
const confirmEmail_1 = require("./routes/confirmEmail");
const genSchema_1 = require("./utils/genSchema");
const mongoDb_1 = require("./utils/mongoDb");
const SESSION_SECRET = "asdfj;124;hae[0u2q45nasdf1234";
const MongoStore = connectMongo(session);
const MONGO_URL = process.env.MONGO_URL;
exports.startServer = () => __awaiter(this, void 0, void 0, function* () {
    const mongo = yield mongoDb_1.MongoDb();
    const server = new graphql_yoga_1.GraphQLServer({
        schema: genSchema_1.genSchema(),
        context: ({ request }) => ({
            mongo,
            url: request.protocol + "://" + request.get("host"),
            session: request.session,
            req: request
        })
    });
    server.express.use(session({
        store: new MongoStore({
            url: MONGO_URL,
            stringify: false
        }),
        name: "tid",
        secret: SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    }));
    const cors = {
        credentials: true,
        origin: process.env.NODE_ENV === "test"
            ? "*"
            : process.env.FRONTEND_HOST
    };
    server.express.get("/confirm/:id", (req, res) => confirmEmail_1.confirmEmail(req, res, mongo));
    yield createTypeormConn_1.createTypeormConn();
    const app = yield server.start({
        cors,
        port: process.env.NODE_ENV === "test" ? 0 : process.env.PORT || 4000
    });
    console.log(`Server is running on localhost:${process.env.NODE_ENV === "test" ? 0 : process.env.PORT || 4000}`);
    return app;
});
//# sourceMappingURL=startServer.js.map