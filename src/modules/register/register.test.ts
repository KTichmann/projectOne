import { request } from "graphql-request";
import { User } from "../../entity/User";

import {
	duplicateEmail,
	emailNotLongEnough,
	invalidEmail,
	passwordNotLongEnough
} from "./errorMessages";
import { createTypeormConn } from "../../utils/createTypeormConn";

const email = "testing@test.com";
const password = "testing";

const mutation = (e: string, p: string) => `
mutation {
	register(email: "${e}", password: "${p}") {
		path
		message
	}
}`;

beforeAll(async () => {
	await createTypeormConn();
});

describe("register user", () => {
	test("user registers successfully", async () => {
		const response = await request(
			process.env.TEST_HOST as string,
			mutation(email, password)
		);
		expect(response).toEqual({ register: null });
		const users = await User.find({ where: { email } });
		expect(users).toHaveLength(1);
		const user = users[0];
		expect(user.email).toEqual(email);
		expect(user.password).not.toEqual(password);
	});

	test("duplicate email responds with correct error", async () => {
		const response2: any = await request(
			process.env.TEST_HOST as string,
			mutation(email, password)
		);
		expect(response2.register).toHaveLength(1);
		expect(response2.register[0]).toEqual({
			path: "email",
			message: duplicateEmail
		});
	});

	test("invalid email responds with correct error", async () => {
		const response3: any = await request(
			process.env.TEST_HOST as string,
			mutation("e", password)
		);
		expect(response3).toEqual({
			register: [
				{
					path: "email",
					message: emailNotLongEnough
				},
				{
					path: "email",
					message: invalidEmail
				}
			]
		});
	});

	test("invalid password responds with correct error", async () => {
		const response4: any = await request(
			process.env.TEST_HOST as string,
			mutation(email, "t")
		);
		expect(response4).toEqual({
			register: [
				{
					path: "password",
					message: passwordNotLongEnough
				}
			]
		});
	});

	test("invalid password and email responds with correct error", async () => {
		const response4: any = await request(
			process.env.TEST_HOST as string,
			mutation("e", "t")
		);
		expect(response4).toEqual({
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
	});
});
