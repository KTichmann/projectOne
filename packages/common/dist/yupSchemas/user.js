"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
exports.duplicateEmail = "already taken";
exports.emailNotLongEnough = "email must be at least 3 characters";
exports.invalidEmail = "email must be a valid email";
exports.passwordNotLongEnough = "password must be at least 3 characters";
const userEmail = yup
    .string()
    .min(3, exports.emailNotLongEnough)
    .max(255, "invalid login")
    .email("Please enter a valid email")
    .required("Email field cannot be empty");
const userPassword = yup
    .string()
    .min(3, exports.passwordNotLongEnough)
    .max(255, "invalid login")
    .required("Password field cannot be empty");
const username = yup
    .string()
    .min(3, "username too short")
    .max(255, "username too long")
    .required("Username cannot be empty");
exports.userEmailSchema = yup.object().shape({
    email: userEmail
});
exports.userPasswordSchema = yup.object().shape({
    password: userPassword
});
exports.validUserSchema = yup.object().shape({
    email: yup
        .string()
        .min(3, exports.emailNotLongEnough)
        .max(255)
        .email(exports.invalidEmail)
        .required(),
    password: userPassword,
    username
});
exports.loginSchema = yup.object().shape({
    email: userEmail,
    password: userPassword
});
//# sourceMappingURL=user.js.map