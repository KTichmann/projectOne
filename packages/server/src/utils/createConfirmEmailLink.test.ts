import fetch from "node-fetch";

import { createConfirmEmailLink } from "./createConfirmEmailLink";
import { createTypeormConn } from "./createTypeormConn";
import { User } from "../entity/User";
import { MongoDb } from "./mongoDb";
import { TestClient } from "./testClient";
import { Connection } from "typeorm";

let userId: string;
let conn: Connection;

beforeAll(async () => {
	conn = await createTypeormConn();
	const email = "tom@bob.com";
	const password = "jalksdf";
	const username = "tom";

	const client = new TestClient(process.env.TEST_HOST as string);
	await client.register(email, password, username);
	const user = await User.findOne({ where: { email } });
	userId = user!.id;
});

afterAll(async () => {
	conn.close();
});

describe("createConfirmEmailLink works", () => {
	test("confirms user and redirects", async () => {
		const mongo = await MongoDb();

		const url = await createConfirmEmailLink(
			process.env.TEST_HOST as string,
			userId as string,
			mongo
		);
		const response = await fetch(url);
		const redirectURL = await response.url;
		expect(redirectURL).toEqual(`${process.env.FRONTEND_HOST}/login`);

		const user = await User.findOne({ where: { id: userId } });
		expect((user as User).confirmed).toBeTruthy();
	});
});
