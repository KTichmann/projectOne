import { Connection } from "typeorm";
import { createTypeormConn } from "../../utils/createTypeormConn";
import { User } from "../../entity/User";
import { TestClient } from "../../utils/testClient";

const email = "bobert@bobert.com";
const password = "testing";
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

describe("logout", () => {
	test("multiple sessions", async () => {
		// computer 1
		const sess1 = new TestClient(process.env.TEST_HOST as string);
		// computer 2
		const sess2 = new TestClient(process.env.TEST_HOST as string);

		await sess1.login(email, password);
		await sess2.login(email, password);

		const test1 = expect(await sess1.me()).toEqual(await sess2.me());

		await sess1.logout();
		const test2 = expect(await sess1.me()).toEqual(await sess2.me());

		return Promise.all([test1, test2]);
	});
	test("single session - logs out a user", async () => {
		const client = new TestClient(process.env.TEST_HOST as string);

		const test1 = client.login(email, password).then(async _ => {
			const response = await client.me();
			expect(response.data).toEqual({
				me: {
					id: userId,
					email
				}
			});
		});

		const test2 = client.logout().then(async _ => {
			const response2 = await client.me();

			expect(response2.data.me).toBeNull();
		});

		return Promise.all([test1, test2]);
	});
});
