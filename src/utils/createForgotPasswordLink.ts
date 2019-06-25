import { v4 } from "uuid";
import { Redis } from "ioredis";
import { forgotPasswordPrefix } from "../constants";

export const createForgotPasswordLink = async (
	url: string,
	userId: string,
	redis: Redis
) => {
	const id = v4();

	await redis.set(`${forgotPasswordPrefix}${id}`, userId, "ex", 60 * 20); // Works on linux - expiry time set

	// await redis.set(`${forgotPasswordPrefix}${id}`, userId); // Windows redis doesn't accept more than 2 args

	return `${url}/change-password/${id}`;
};
