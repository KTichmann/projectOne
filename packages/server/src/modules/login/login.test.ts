import { invalidLogin, confirmedEmailError } from "./errorMessages";
import { User } from "../../entity/User";
import { createTypeormConn } from "../../utils/createTypeormConn";
import { Connection } from "typeorm";
import { TestClient } from "../../utils/testClient";

const email = "tom@bob.com";
const password = "jalksdf";
const username = "tom@bob.com";

let conn: Connection;
beforeAll(async () => {
	conn = await createTypeormConn();
});
afterAll(async () => {
	conn.close();
});

const loginExpectError = async (
	client: any,
	e: string,
	p: string,
	errMsg: string
) => {
	const response = await client.login(e, p);
	expect(response.data).toEqual({
		login: [
			{
				path: "email",
				message: errMsg
			}
		]
	});
};

const loginSetup = async () => {
	const client = new TestClient(process.env.TEST_HOST as string);
	await client.register(email, password, username);
	return client;
};

describe("login", () => {
	test("email not found send back error", async () => {
		const client = new TestClient(process.env.TEST_HOST as string);
		await loginExpectError(client, "bob@bob.com", "whatever", invalidLogin);
	});

	test("email not confirmed", async () => {
		const client = await loginSetup();

		await loginExpectError(client, email, password, confirmedEmailError);

		await User.update({ email }, { confirmed: true });

		await loginExpectError(client, email, "aslkdfjaksdljf", invalidLogin);
	});

	test("login successful", async () => {
		const client = await loginSetup();

		const response = await client.login(email, password);

		expect(response.data).toEqual({ login: null });
	});
});
