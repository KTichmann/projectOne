"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
exports.duplicateEmail = "already taken";
exports.emailNotLongEnough = "email must be at least 3 characters";
exports.invalidEmail = "email must be a valid email";
exports.passwordNotLongEnough = "password must be at least 3 characters";
exports.registerPasswordValidation = yup
    .string()
    .min(3, exports.passwordNotLongEnough)
    .max(255)
    .required();
exports.validUserSchema = yup.object().shape({
    email: yup
        .string()
        .min(3, exports.emailNotLongEnough)
        .max(255)
        .email(exports.invalidEmail)
        .required(),
    password: exports.registerPasswordValidation
});
exports.loginSchema = yup.object().shape({
    email: yup
        .string()
        .min(3, "invalid login")
        .max(255, "invalid login")
        .email("Please enter a valid email")
        .required("Email field cannot be empty"),
    password: yup
        .string()
        .min(3, "invalid login")
        .max(255, "invalid login")
        .required("Password field cannot be empty")
});
//# sourceMappingURL=user.js.map