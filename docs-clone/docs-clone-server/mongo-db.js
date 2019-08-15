const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

// Set up and connect MongoDb
const url = process.env.MONGO_URL;

export const MongoDb = async (db = "collab") => {
	const client = await MongoClient.connect(url, { useNewUrlParser: true });
	return client.db(db);
};
