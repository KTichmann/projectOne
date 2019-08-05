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
const formatYupError_1 = require("../../utils/formatYupError");
const errorMessages_1 = require("./errorMessages");
const createConfirmEmailLink_1 = require("../../utils/createConfirmEmailLink");
const sendEmail_1 = require("../../utils/sendEmail");
const common_1 = require("@abb/common");
exports.resolvers = {
    Query: {
        errorFill: () => "bye"
    },
    Mutation: {
        register: (_, args, { mongo, url }) => __awaiter(this, void 0, void 0, function* () {
            try {
                yield common_1.validUserSchema.validate(args, { abortEarly: false });
            }
            catch (err) {
                return formatYupError_1.formatYupError(err);
            }
            const { email, password, username } = args;
            const userEmailAlreadyExists = yield User_1.User.findOne({
                where: { email },
                select: ["id"]
            });
            if (userEmailAlreadyExists) {
                return [{ path: "email", message: errorMessages_1.duplicate }];
            }
            const usernameAlreadyExists = yield User_1.User.findOne({
                where: { username },
                select: ["id"]
            });
            if (usernameAlreadyExists) {
                return [{ path: "username", message: errorMessages_1.duplicate }];
            }
            const user = User_1.User.create({
                email,
                username,
                password
            });
            yield user.save();
            if (process.env.NODE_ENV !== "test") {
                yield sendEmail_1.sendEmail(email, yield createConfirmEmailLink_1.createConfirmEmailLink(url, user.id, mongo), "Please click the link below to verify your email address:");
            }
            return null;
        })
    }
};
//# sourceMappingURL=resolvers.js.map