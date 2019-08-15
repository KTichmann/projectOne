import * as uuidv4 from "uuid/v4";
import { Request, Response } from "express";
import { Db } from "mongodb";
import { noUser } from "../utils/errorMessages";

export const createEditor = async (req: Request, res: Response, mongo: Db) => {
	const collection = mongo.collection("editors");
	const userId = req!.session!.userId;
	const uid = uuidv4();
	if (!userId) {
		res.send(noUser);
		return;
	}
	await collection.insertOne({
		uid,
		users: [userId],
		settings: JSON.stringify({})
	});
	res.redirect(`${process.env.COLLAB_HOST as string}/editor/${uid}`);
};
