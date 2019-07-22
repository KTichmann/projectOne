import { MongoDb } from "./mongoDb";

export const removeAllUsersSessions = async (userId: string) => {
	const db = await MongoDb("test");

	await db.collection("sessions").deleteMany({ "session.userId": userId });
};
