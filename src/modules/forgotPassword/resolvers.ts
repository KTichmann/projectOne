import { ResolverMap } from "../../types/graphql-utils";

// 20 minute timeout
// lock account

export const resolvers: ResolverMap = {
  Query: {
    dummy: () => "bye"
  },

  Mutation: {}
};
