import { ResolverMap } from "../../types/graphql-utils";
import { Snippet } from "../../entity/Snippet";
import { createSnippet } from "./functions/createSnippet";
import { updateSnippet } from "./functions/updateSnippet";
import { deleteSnippet } from "./functions/deleteSnippet";
import { addUsernamesToSnippets } from "./functions/addUsernamesToSnippets";
import { Like } from "typeorm";
import { addCommentCountsToSnippets } from "./functions/addCommentCountsToSnippets";

export const resolvers: ResolverMap = {
  SnippetOrError: {
    __resolveType(obj, _, __) {
      if (obj.id) {
        return "Snippet";
      } else {
        return "ContentError";
      }
    }
  },
  Query: {
    getPublicSnippets: async () => {
      const res = await Snippet.find({
        where: { visibility: "public" }
      });
      const response = await addCommentCountsToSnippets(res);
      return addUsernamesToSnippets(response);
    },
    getUserSnippets: async (
      _,
      { username }: GQL.IGetUserSnippetsOnQueryArguments
    ) => {
      const res = await Snippet.find({
        where: { username, visibility: "public" }
      });
      const response = await addCommentCountsToSnippets(res);
      return addUsernamesToSnippets(response);
    },
    getMySnippets: async (_, __, { session }) => {
      const userId = session.userId;
      const res = await Snippet.find({
        where: { userId }
      });
      const response = await addCommentCountsToSnippets(res);
      return addUsernamesToSnippets(response);
    },
    getSnippetById: async (
      _,
      { snippetId }: GQL.IGetSnippetByIdOnQueryArguments
    ) => {
      const res = await Snippet.findOne({
        where: { id: snippetId }
      });
      if (!res) {
        return null;
      }
      const resultArr = await addUsernamesToSnippets([res]);
      return resultArr[0];
    },

    getSnippetsByTag: async (
      _,
      { tag }: GQL.IGetSnippetsByTagOnQueryArguments
    ) => {
      const res = await Snippet.createQueryBuilder()
        .where(":tag = ANY(tags)", {
          tag
        })
        .execute();
      const cleanedRes = res.map((obj: any) => ({
        id: obj.Snippet_id,
        content: obj.Snippet_content,
        language: obj.Snippet_language,
        tags: obj.Snippet_tags,
        user: obj.Snippet_user
      }));
      const response = await addCommentCountsToSnippets(cleanedRes);
      return addUsernamesToSnippets(response);
    },
    searchSnippets: async (_, { query }: any) => {
      const titleSearch = await Snippet.find({ where: { title: Like(query) } });
      const userSearch = await Snippet.find({
        where: { user: Like(query) }
      });
      const contentSearch = await Snippet.find({
        where: { content: Like(query) }
      });
      const response = await addCommentCountsToSnippets([
        ...titleSearch,
        ...contentSearch,
        ...userSearch
      ]);
      return addUsernamesToSnippets(response);
    }
  },
  Mutation: {
    createSnippet: (
      _,
      args: GQL.ICreateSnippetOnMutationArguments,
      { session }
    ) => {
      return createSnippet(session, args);
    },
    updateSnippet: (
      _,
      args: GQL.IUpdateSnippetOnMutationArguments,
      { session }
    ) => {
      return updateSnippet(session, args);
    },
    deleteSnippet: (
      _,
      args: GQL.IDeleteSnippetOnMutationArguments,
      { session }
    ) => {
      return deleteSnippet(session, args);
    }
  }
};
