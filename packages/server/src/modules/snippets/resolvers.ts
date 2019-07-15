import { ResolverMap } from "../../types/graphql-utils";
import { Snippet } from "../../entity/Snippet";
import { createSnippet } from "./functions/createSnippet";
import { Any } from "typeorm";

export const resolvers: ResolverMap = {
  Query: {
    getPublicSnippets: async () => {
      const res = await Snippet.find({
        where: { visibility: "public" }
      });
      return res;
    },
    getUserSnippets: async (_, { userId }) => {
      const res = await Snippet.find({
        where: { userId }
      });
      return res;
    },
    getSnippetById: async (_, { snippetId }) => {
      const res = await Snippet.findOne({
        where: { id: snippetId }
      });
      return res;
    }
    // getSnippetsByTag: async (_, { tag }) => {
    //   const res = await Snippet.find({
    //     where: { tags: Any(tag) }
    //   });

    //   return res;
    // }
  },

  Mutation: {
    createSnippet: (
      _,
      args: GQL.ICreateSnippetOnMutationArguments,
      { session }
    ) => {
      return createSnippet(session, args);
    }
  }
};
