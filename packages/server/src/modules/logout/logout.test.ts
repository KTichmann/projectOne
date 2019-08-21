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

		expect(await sess1.me()).toEqual(await sess2.me());

		await sess1.logout();
		expect(await sess1.me()).toEqual(await sess2.me());
	});
	test("single session - logs out a user", async () => {
		const client = new TestClient(process.env.TEST_HOST as string);

		client.login(email, password).then(async _ => {
			const response = await client.me();
			expect(response.data).toEqual({
				me: {
					id: userId,
					email
				}
			});
		});

		client.logout().then(async _ => {
			const response2 = await client.me();

			expect(response2.data.me).toBeNull();
		});
	});
});
