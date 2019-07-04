import * as yup from "yup";

export const duplicateEmail = "already taken";
export const emailNotLongEnough = "email must be at least 3 characters";
export const invalidEmail = "email must be a valid email";
export const passwordNotLongEnough = "password must be at least 3 characters";

export const registerPasswordValidation = yup
	.string()
	.min(3, passwordNotLongEnough)
	.max(255)
	.required();

export const validUserSchema = yup.object().shape({
	email: yup
		.string()
		.min(3, emailNotLongEnough)
		.max(255)
		.email(invalidEmail)
		.required(),
	password: registerPasswordValidation
});

export const loginSchema = yup.object().shape({
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
