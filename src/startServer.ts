import { GraphQLServer } from "graphql-yoga";
import { createTypeormConn } from "./utils/createTypeormConn";
import { redis } from "./redis";
import { confirmEmail } from "./routes/confirmEmail";
import { genSchema } from "./utils/genSchema";

export const startServer = async () => {
  // make graphql server, passing in schema array to mergeSchemas to make one schema
  const server = new GraphQLServer({
    schema: genSchema(),
    context: ({ request }) => ({
      redis,
      url: request.protocol + "://" + request.get("host")
    })
  });

  server.express.get("/confirm/:id", confirmEmail);

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
