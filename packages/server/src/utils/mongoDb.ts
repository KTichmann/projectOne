import * as mongodb from "mongodb";
const MongoClient = mongodb.MongoClient;
const MONGO_DB_PASS = process.env.MONGO_DB_PASS;
// Set up and connect MongoDb
const url = `mongodb+srv://admin:${MONGO_DB_PASS}@abb-9svkf.mongodb.net/test?retryWrites=true&w=majority`;

export const MongoDb = async (db = "abbproject") => {
	const client = await MongoClient.connect(url, { useNewUrlParser: true });
	return client.db(db);
};
