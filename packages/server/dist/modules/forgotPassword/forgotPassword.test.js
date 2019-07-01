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
const createTypeormConn_1 = require("../../utils/createTypeormConn");
const User_1 = require("../../entity/User");
const testClient_1 = require("../../utils/testClient");
const forgotPasswordLockAccount_1 = require("../../utils/forgotPasswordLockAccount");
const errorMessages_1 = require("../login/errorMessages");
const errorMessages_2 = require("../register/errorMessages");
const email = "bobert@bobert.com";
const password = "testing";
const newPassword = "newPassword";
let conn;
let userId;
beforeAll(() => __awaiter(this, void 0, void 0, function* () {
    conn = yield createTypeormConn_1.createTypeormConn();
    const user = yield User_1.User.create({
        email,
        password,
        confirmed: true
    }).save();
    userId = user.id;
}));
afterAll(() => __awaiter(this, void 0, void 0, function* () {
    conn.close();
}));
describe("forgot password", () => {
    test("works", () => __awaiter(this, void 0, void 0, function* () {
        const client = new testClient_1.TestClient(process.env.TEST_HOST);
        const url = "CHANGE";
        yield forgotPasswordLockAccount_1.forgotPasswordLockAccount(userId);
        const parts = url.split("/");
        const key = parts[parts.length - 1];
        expect(yield client.login(email, password)).toEqual({
            data: {
                login: [
                    {
                        path: "email",
                        message: errorMessages_1.forgotPasswordLocked
                    }
                ]
            }
        });
        expect(yield client.forgotPasswordChange("a", key)).toEqual({
            data: {
                forgotPasswordChange: [
                    {
                        path: "newPassword",
                        message: errorMessages_2.passwordNotLongEnough
                    }
                ]
            }
        });
        const response = yield client.forgotPasswordChange(newPassword, key);
        expect(response.data).toEqual({
            forgotPasswordChange: null
        });
        expect(yield client.login(email, newPassword)).toEqual({
            data: {
                login: null
            }
        });
    }));
});
//# sourceMappingURL=forgotPassword.test.js.map