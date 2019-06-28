import { v4 } from "uuid";
import { Db } from "mongodb";

export const createConfirmEmailLink = async (
	url: string,
	userId: string,
	mongo: Db
) => {
	const id = v4();

	const collection = mongo.collection("userVerification");
	await collection.insertOne({ createdAt: new Date(), id, userId });

	// await redis.set(id, userId, "ex", 60 * 60 * 24); //Works on linux - expiry time set

	// await redis.set(id, userId); // Windows redis doesn't accept more than 2 args

	return `${url}/confirm/${id}`;
};
