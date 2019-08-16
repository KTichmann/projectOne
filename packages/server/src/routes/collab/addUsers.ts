import { Request, Response } from "express";
import { Db } from "mongodb";
import { noUser } from "../../utils/errorMessages";
import { User } from "../../entity/User";

export const addUser = async (req: Request, res: Response, _: Db) => {
	// const collection = mongo.collection("editors");
	const userId = req!.session!.userId;

	if (!userId) {
		res.send({ error: "user", message: noUser });
		return;
	}

	const newUser = req.body.user;

	if (newUser.length < 0) {
		return res.status(402).send({
			error: "params",
			message: "users param must be an array with length > 0"
		});
	}

	const checkEmail = User.findOne({ where: { email: newUser } });
	const checkUsername = User.findOne({ where: { username: newUser } });

	if (!checkEmail && !checkUsername) {
		return res.status(402).send({
			error: "params",
			message: "user not found"
		});
	}
	console.log(checkEmail, checkUsername);

	// console.log(mongo, collection);

	// users.map(async user => {
	//    const email = await User.findOne({ where: { email: user } });
	//     User.findOne
	// })

	return res.send({
		whoopsie: "daisy"
	});
};
