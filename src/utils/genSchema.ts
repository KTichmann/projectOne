import { importSchema } from "graphql-import";
import * as path from "path";
import * as fs from "fs";
import { mergeSchemas, makeExecutableSchema } from "graphql-tools";
import { GraphQLSchema } from "graphql";

export const genSchema = () => {
  // Holds a list of all the schemas
  const schemas: GraphQLSchema[] = [];

  // Get a list of folder names from modules dir
  const folders = fs.readdirSync(path.join(__dirname, "../modules"));

  // Loop through folders, get the resolver and schema files
  // and add them to schemas array as an executable schema
  folders.forEach(folder => {
    const { resolvers } = require(`../modules/${folder}/resolvers`);
    const typeDefs = importSchema(
      path.join(__dirname, `../modules/${folder}/schema.graphql`)
    );

    schemas.push(makeExecutableSchema({ resolvers, typeDefs }));
  });

  return mergeSchemas({ schemas });
};
