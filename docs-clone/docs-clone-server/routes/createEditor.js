import { Request, Response } from "express";

export const createEditor = async(req, res, mongo) => {
    const collection = mongo.collection("userVerification");
}
export const confirmEmail = async (req: Request, res: Response, mongo: Db) => {
	

	const { id } = req.params;
	const cursor = await collection.find({ id: { $eq: id } });
	const docArr = await cursor.toArray();
	const userId = docArr[0].userId;

	if (userId) {
		await User.update({ id: userId }, { confirmed: true });

		await collection.remove({ userId: { $eq: userId } }, { single: true });

		res.redirect(`${process.env.FRONTEND_HOST as string}/login`);
	} else {
		res.send("Not a valid url");
	}
};
