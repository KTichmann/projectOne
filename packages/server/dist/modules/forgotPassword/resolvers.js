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
const yup = require("yup");
const bcrypt = require("bcryptjs");
const createForgotPasswordLink_1 = require("../../utils/createForgotPasswordLink");
const forgotPasswordLockAccount_1 = require("../../utils/forgotPasswordLockAccount");
const User_1 = require("../../entity/User");
const errorMessages_1 = require("./errorMessages");
const yupSchemas_1 = require("../../yupSchemas");
const formatYupError_1 = require("../../utils/formatYupError");
const schema = yup.object().shape({
    newPassword: yupSchemas_1.registerPasswordValidation
});
exports.resolvers = {
    Query: {
        dummy: () => "bye"
    },
    Mutation: {
        sendForgotPasswordEmail: (_, { email }, { mongo }) => __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.User.findOne({ where: { email } });
            if (!user) {
                return [{ path: "email", message: errorMessages_1.userNotFoundError }];
            }
            yield forgotPasswordLockAccount_1.forgotPasswordLockAccount(user.id);
            yield createForgotPasswordLink_1.createForgotPasswordLink("", user.id, mongo);
            return true;
        }),
        forgotPasswordChange: (_, { newPassword, key }, { mongo }) => __awaiter(this, void 0, void 0, function* () {
            const collection = mongo.collection("forgotPassword");
            const forgotPasswordObj = yield collection.findOne({ id: key });
            if (!forgotPasswordObj) {
                return [
                    {
                        path: "key",
                        message: errorMessages_1.expiredKeyError
                    }
                ];
            }
            const userId = forgotPasswordObj.userId;
            try {
                yield schema.validate({ newPassword }, { abortEarly: true });
            }
            catch (err) {
                return formatYupError_1.formatYupError(err);
            }
            const hashedPassword = yield bcrypt.hash(newPassword, 10);
            const updatePromise = User_1.User.update({ id: userId }, {
                forgotPasswordLocked: false,
                password: hashedPassword
            });
            const deleteKeyPromise = collection.deleteOne({ id: key });
            yield Promise.all([updatePromise, deleteKeyPromise]);
            return null;
        })
    }
};
//# sourceMappingURL=resolvers.js.map