import * as yup from "yup";
export declare const duplicateEmail = "already taken";
export declare const emailNotLongEnough = "email must be at least 3 characters";
export declare const invalidEmail = "email must be a valid email";
export declare const passwordNotLongEnough = "password must be at least 3 characters";
export declare const userEmailSchema: yup.ObjectSchema<yup.Shape<object, {
    email: string;
}>>;
export declare const userPasswordSchema: yup.ObjectSchema<yup.Shape<object, {
    password: string;
}>>;
export declare const validUserSchema: yup.ObjectSchema<yup.Shape<object, {
    email: string;
    password: string;
}>>;
export declare const loginSchema: yup.ObjectSchema<yup.Shape<object, {
    email: string;
    password: string;
}>>;
