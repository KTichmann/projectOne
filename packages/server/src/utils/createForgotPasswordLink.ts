import { v4 } from "uuid";
import { Db } from "mongodb";

export const createForgotPasswordLink = async (
	url: string,
	userId: string,
	mongo: Db
) => {
	const id = v4();

	const collection = mongo.collection("forgotPassword");
	await collection.insertOne({ createdAt: new Date(), id, userId });

	return `${url}/change-password/${id}`;
};
