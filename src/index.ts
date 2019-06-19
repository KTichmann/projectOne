import "reflect-metadata";
import { importSchema } from "graphql-import";
import { resolvers } from "./resolvers";
const typeDefs = importSchema("schema.graphql");

import { GraphQLServer } from "graphql-yoga";

const server = new GraphQLServer({ typeDefs, resolvers });
server.start(() => console.log("Server is running on localhost:4000"));
