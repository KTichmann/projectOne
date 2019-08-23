import { Connection } from "typeorm";
import { createTypeormConn } from "../../utils/createTypeormConn";
import { User } from "../../entity/User";
import { user, snippet } from "../../testSetup/utils/constants";
import { Snippet } from "../../entity/Snippet";
import { TestClient } from "../../utils/testClient";
import console = require("console");

let conn: Connection;
let userId: any;

beforeAll(async () => {
	conn = await createTypeormConn();
	const newUser = await User.create({
		...user,
		confirmed: true
	}).save();
	userId = newUser.id;
	const res = await Snippet.create({
		...snippet,
		user: userId
	});
	await res.save();
});

afterAll(async () => {
	conn.close();
});

describe("CreateSnippet", () => {
	test("creates a snippet", async () => {
		const client = new TestClient(process.env.TEST_HOST as string);
		return client.login(user.email, user.password).then(async () => {
			return client.createSnippet({ ...snippet }).then(async res => {
				expect(res.data).toEqual({
					createSnippet: {
						language: "javascript",
						theme: "dracula",
						content: "test",
						title: "test"
					}
				});
				const res2 = await client.getMySnippets();

				expect(res2.data.getMySnippets.length).toEqual(2);
			});
		});
	});

	test("throws error when data is missing", async () => {
		const client = new TestClient(process.env.TEST_HOST as string);
		return client.login(user.email, user.password).then(async () => {
			return client
				.createSnippet({
					visibility: "public",
					language: "javascript",
					theme: "dracula",
					content: "test"
				})
				.then(res => {
					console.log(res);
				})
				.catch(err => {
					expect(err.message).toBeDefined();
				});
		});
	});
});
