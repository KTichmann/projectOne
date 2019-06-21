import { v4 } from "uuid";
import { Redis } from "ioredis";

export const createConfirmEmailLink = async (
	url: string,
	userId: string,
	redis: Redis
) => {
	const id = v4();

	// await redis.set(id, userId, "ex", 60 * 60 * 24); //Works on linux - expiry time set

	await redis.set(id, userId); // Windows redis doesn't accept more than 2 args

	return `${url}/confirm/${id}`;
};
