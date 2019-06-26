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
const User_1 = require("../../entity/User");
const common_1 = require("@abb/common");
const createTypeormConn_1 = require("../../utils/createTypeormConn");
const testClient_1 = require("../../utils/testClient");
const email = "testing@test.com";
const password = "testing";
let conn;
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    conn = yield createTypeormConn_1.createTypeormConn();
}));
afterAll(() => __awaiter(this, void 0, void 0, function* () {
    conn.close();
}));
describe("register user", () => {
    test("user registers successfully", () => __awaiter(this, void 0, void 0, function* () {
        const client = new testClient_1.TestClient(process.env.TEST_HOST);
        const response = yield client.register(email, password);
        expect(response.data).toEqual({ register: null });
        const users = yield User_1.User.find({ where: { email } });
        expect(users).toHaveLength(1);
        const user = users[0];
        expect(user.email).toEqual(email);
        expect(user.password).not.toEqual(password);
    }));
    test("duplicate email responds with correct error", () => __awaiter(this, void 0, void 0, function* () {
        const client = new testClient_1.TestClient(process.env.TEST_HOST);
        const response2 = yield client.register(email, password);
        expect(response2.data.register).toHaveLength(1);
        expect(response2.data.register[0]).toEqual({
            path: "email",
            message: common_1.duplicateEmail
        });
    }));
    test("invalid email responds with correct error", () => __awaiter(this, void 0, void 0, function* () {
        const client = new testClient_1.TestClient(process.env.TEST_HOST);
        const response3 = yield client.register("e", password);
        expect(response3.data).toEqual({
            register: [
                {
                    path: "email",
                    message: common_1.emailNotLongEnough
                },
                {
                    path: "email",
                    message: common_1.invalidEmail
                }
            ]
        });
    }));
    test("invalid password responds with correct error", () => __awaiter(this, void 0, void 0, function* () {
        const client = new testClient_1.TestClient(process.env.TEST_HOST);
        const response4 = yield client.register(email, "t");
        expect(response4.data).toEqual({
            register: [
                {
                    path: "password",
                    message: common_1.passwordNotLongEnough
                }
            ]
        });
    }));
    test("invalid password and email responds with correct error", () => __awaiter(this, void 0, void 0, function* () {
        const client = new testClient_1.TestClient(process.env.TEST_HOST);
        const response4 = yield client.register("e", "t");
        expect(response4.data).toEqual({
            register: [
                {
                    path: "email",
                    message: "email must be at least 3 characters"
                },
                {
                    path: "email",
                    message: "email must be a valid email"
                },
                {
                    path: "password",
                    message: "password must be at least 3 characters"
                }
            ]
        });
    }));
});
//# sourceMappingURL=register.test.js.map