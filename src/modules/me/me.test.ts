import axios from "axios";
import { Connection } from "typeorm";
import { createTypeormConn } from "../../utils/createTypeormConn";
import { User } from "../../entity/User";

const email = "bobert@bobert.com";
const password = "testing";
let conn: Connection;

const loginMutation = (e: string, p: string) => `
mutation {
	register(email: "${e}", password: "${p}") {
		path
		message
	}
}`;

const meQuery = `
{
    me {
        id
        email
    }
}`;

beforeAll(async () => {
	conn = await createTypeormConn();
	await User.create({
		email,
		password,
		confirmed: true
	}).save();
});

afterAll(async () => {
	conn.close();
});

describe("me query", () => {
	// test("can't get user if not logged in", async () => {
	// 	// TODO
	// });

	test("gets current user", async () => {
		await axios.post(
			process.env.TEST_HOST as string,
			{
				query: loginMutation(email, password)
			},
			{
				withCredentials: true
			}
		);

		const response = await axios.post(
			process.env.TEST_HOST as string,
			{
				query: meQuery
			},
			{
				withCredentials: true
			}
		);

		console.log(response.data.data.me);
	});
});
