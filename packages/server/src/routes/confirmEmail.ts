import { User } from "../entity/User";
import { Request, Response } from "express";
import { Db } from "mongodb";

export const confirmEmail = async (req: Request, res: Response, mongo: Db) => {
	const collection = mongo.collection("userVerification");

	const { id } = req.params;
	const cursor = await collection.find({ id: { $eq: id } });
	const docArr = await cursor.toArray();
	const userId = docArr[0].userId;

	if (userId) {
		await User.update({ id: userId }, { confirmed: true });

		await collection.remove({ userId: { $eq: userId } }, { single: true });

		res.redirect(process.env.FRONTEND_HOST as string);
	} else {
		res.send("invalid");
	}
};
