import { Connection } from "typeorm";
import { createTypeormConn } from "../../utils/createTypeormConn";
import { User } from "../../entity/User";
import { TestClient } from "../../utils/testClient";
import { forgotPasswordLockAccount } from "../../utils/forgotPasswordLockAccount";
import { forgotPasswordLocked } from "../login/errorMessages";
import { passwordNotLongEnough } from "../register/errorMessages";
import { createForgotPasswordLink } from "../../utils/createForgotPasswordLink";
import { MongoDb } from "../../utils/mongoDb";

const email = "bobert@bobert.com";
const password = "testing";
const newPassword = "newPassword";
const username = "bobert@bobert.com";
let conn: Connection;
let userId: any;

beforeAll(async () => {
	conn = await createTypeormConn();
	const user = await User.create({
		email,
		password,
		username,
		confirmed: true
	}).save();
	userId = user.id;
});

afterAll(async () => {
	conn.close();
});

describe("forgot password", () => {
	test("works", async () => {
		const client = new TestClient(process.env.TEST_HOST as string);
		const mongo = await MongoDb();

		// const url =
		const url = await createForgotPasswordLink(
			"http://localhost:0",
			userId,
			mongo
		);
		await forgotPasswordLockAccount(userId);
		const parts = url.split("/");
		const key = parts[parts.length - 1];
		// make sure you can't login after you've locked your account
		const test1 = await expect(await client.login(email, password)).toEqual({
			data: {
				login: [
					{
						path: "email",
						message: forgotPasswordLocked
					}
				]
			}
		});

		// try changing to a password that's too short
		const test2 = expect(await client.forgotPasswordChange("a", key)).toEqual({
			data: {
				forgotPasswordChange: [
					{
						path: "newPassword",
						message: passwordNotLongEnough
					}
				]
			}
		});

		// change password works
		const response = await client.forgotPasswordChange(newPassword, key);
		const test3 = expect(response.data).toEqual({
			forgotPasswordChange: null
		});

		const test4 = expect(await client.login(email, newPassword)).toEqual({
			data: {
				login: null
			}
		});

		return Promise.all([test1, test2, test3, test4]);
	});
});
