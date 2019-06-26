"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
exports.duplicateEmail = "already taken";
exports.emailNotLongEnough = "email must be at least 3 characters";
exports.invalidEmail = "email must be a valid email";
exports.passwordNotLongEnough = "password must be at least 3 characters";
exports.validUserSchema = yup.object().shape({
    email: yup
        .string()
        .min(3, exports.emailNotLongEnough)
        .max(255)
        .email(exports.invalidEmail)
        .required(),
    password: yup
        .string()
        .min(3, exports.passwordNotLongEnough)
        .max(255)
        .required()
});
//# sourceMappingURL=user.js.map