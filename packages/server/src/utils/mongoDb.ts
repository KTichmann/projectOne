import * as mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;
// Set up and connect MongoDb

export const MongoDb = async (db = "abbproject") => {
	const client = await MongoClient.connect(process.env.MONGO_URL!, {
		useNewUrlParser: true
	});
	return client.db(db);
};
