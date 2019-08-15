import * as uuidv4 from "uuid/v4";
import { Request, Response } from "express";
import { Db } from "mongodb";
import { noUser } from "../../utils/errorMessages";

export const createSession = async (req: Request, res: Response, mongo: Db) => {
	const collection = mongo.collection("editors");
	const userId = req!.session!.userId;

	if (!userId) {
		res.send({ error: "user", message: noUser });
		return;
	}

	// Check if the user already has an editor session
	const cursor = await collection.find({ admin: { $eq: userId } });
	const sessions = await cursor.toArray();
	if (sessions.length > 0) {
		return res.status(200).send({
			error: "session",
			message: "user already has a collab session",
			sessionId: sessions[0].uid
		});
	}

	// if they don't have a session, create one:

	const uid = uuidv4();

	const insert = await collection.insertOne({
		uid,
		users: [userId],
		settings: JSON.stringify({}),
		admin: userId,
		value: ""
	});

	if (insert.insertedCount === 1) {
		return res.status(200).send({
			error: null,
			message: "session created successfully",
			uid
		});
	} else {
		console.log(insert); // for debugging
		return res.status(500).send({
			error: "unknown",
			message: "unknown server error"
		});
	}
};
