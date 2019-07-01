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
const bcrypt = require("bcryptjs");
const User_1 = require("../../entity/User");
const errorMessages_1 = require("./errorMessages");
const errorResponse = [
    {
        path: "email",
        message: errorMessages_1.invalidLogin
    }
];
exports.resolvers = {
    Query: {
        errorFill: () => "bye"
    },
    Mutation: {
        login: (_, { email, password }, { session }) => __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email } });
            if (!user) {
                return errorResponse;
            }
            const valid = yield bcrypt.compare(password, user.password);
            if (!valid) {
                return errorResponse;
            }
            if (!user.confirmed) {
                return [
                    {
                        path: "email",
                        message: errorMessages_1.confirmedEmailError
                    }
                ];
            }
            if (user.forgotPasswordLocked) {
                return [
                    {
                        path: "email",
                        message: errorMessages_1.forgotPasswordLocked
                    }
                ];
            }
            session.userId = user.id;
            return null;
        })
    }
};
//# sourceMappingURL=resolvers.js.map