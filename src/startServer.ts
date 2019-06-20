import { importSchema } from "graphql-import";
import { GraphQLServer } from "graphql-yoga";
import * as path from "path";
import * as fs from "fs";
import { createTypeormConn } from "./utils/createTypeormConn";
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";
import { GraphQLSchema } from "graphql";

export const startServer = async () => {
	// Holds a list of all the schemas
	const schemas: GraphQLSchema[] = [];

	// Get a list of folder names from modules dir
	const folders = fs.readdirSync(path.join(__dirname, "modules"));

	// Loop through folders, get the resolver and schema files
	// and add them to schemas array as an executable schema
	folders.forEach(folder => {
		const { resolvers } = require(`./modules/${folder}/resolvers`);
		const typeDefs = importSchema(
			path.join(__dirname, `./modules/${folder}/schema.graphql`)
		);

		schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
	});
	// make graphql server, passing in schema array to mergeSchemas to make one schema
	const server = new GraphQLServer({ schema: mergeSchemas({ schemas }) });
	// connect to our db through typeorm
	await createTypeormConn();
	const app = await server.start({
		port: process.env.NODE_ENV === "test" ? 0 : 4000
	});

	console.log(
		`Server is running on localhost:${
			process.env.NODE_ENV === "test" ? 0 : 4000
		}`
	);

	return app;
};
