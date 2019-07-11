import { ResolverMap } from "../../types/graphql-utils";
import { Snippet } from "../../entity/Snippet";

export const resolvers: ResolverMap = {
  Query: {
    getPublicSnippets: async () =>
      await Snippet.find({ where: { visibility: "public" } }),
    getUserSnippets: async (userId: number) =>
      await Snippet.find({ where: { user: userId } }),
    getSnippetById: async (snippetId: number) =>
      await Snippet.findOne({ where: { id: snippetId } })
  },

  Mutation: {}
};
