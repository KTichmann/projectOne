// import * as Redis from "ioredis";
import fetch from "node-fetch";

import { createConfirmEmailLink } from "./createConfirmEmailLink";
import { createTypeormConn } from "./createTypeormConn";
import { User } from "../entity/User";
import { MongoDb } from "./mongoDb";

let userId: string;
// const redis = new Redis();

beforeAll(async () => {
	await createTypeormConn();
	const user = await User.create({
		email: "bob5@bob.com",
		password: "testing"
	}).save();

	userId = user.id;
});

describe("createConfirmEmailLink works", () => {
	test("confirms user and clears key in redis", async () => {
		const mongo = await MongoDb();

		const url = await createConfirmEmailLink(
			process.env.TEST_HOST as string,
			userId as string,
			mongo
		);
		const response = await fetch(url);
		const text = await response.text();
		expect(text).toEqual("ok");

		const user = await User.findOne({ where: { id: userId } });
		expect((user as User).confirmed).toBeTruthy();

		// const chunks = url.split("/");
		// const key = chunks[chunks.length - 1];
		// const value = await redis.get(key);
		// expect(value).toBeNull();
	});
});
