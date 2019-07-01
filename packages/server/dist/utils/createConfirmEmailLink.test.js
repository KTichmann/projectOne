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
const node_fetch_1 = require("node-fetch");
const createConfirmEmailLink_1 = require("./createConfirmEmailLink");
const createTypeormConn_1 = require("./createTypeormConn");
const User_1 = require("../entity/User");
const mongoDb_1 = require("./mongoDb");
let userId;
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    yield createTypeormConn_1.createTypeormConn();
    const user = yield User_1.User.create({
        email: "bob5@bob.com",
        password: "testing"
    }).save();
    userId = user.id;
}));
describe("createConfirmEmailLink works", () => {
    test("confirms user and clears key in redis", () => __awaiter(this, void 0, void 0, function* () {
        const mongo = yield mongoDb_1.MongoDb();
        const url = yield createConfirmEmailLink_1.createConfirmEmailLink(process.env.TEST_HOST, userId, mongo);
        const response = yield node_fetch_1.default(url);
        const text = yield response.text();
        expect(text).toEqual("ok");
        const user = yield User_1.User.findOne({ where: { id: userId } });
        expect(user.confirmed).toBeTruthy();
    }));
});
//# sourceMappingURL=createConfirmEmailLink.test.js.map