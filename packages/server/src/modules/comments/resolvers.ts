import { ResolverMap } from "../../types/graphql-utils";
import { Comment } from "../../entity/Comment";
import { updateComment } from "./functions/updateComment";
import { createComment } from "./functions/createComment";
import { deleteComment } from "./functions/deleteComment";
import { addUsernamesToSnippets } from "../snippets/functions/addUsernamesToSnippets";

export const resolvers: ResolverMap = {
  CommentOrError: {
    __resolveType(obj, _, __) {
      if (obj.id) {
        return "Comment";
      } else {
        return "ContentError";
      }
    }
  },
  Query: {
    getSnippetComments: async (
      _,
      { snippetId }: GQL.IGetSnippetCommentsOnQueryArguments
    ) => {
      const res = await Comment.find({
        where: { snippet: snippetId }
      });
      const response = await addUsernamesToSnippets(res);
      return response;
    },
    getUserComments: async (
      _,
      { userId }: GQL.IGetUserCommentsOnQueryArguments
    ) => {
      const res = await Comment.find({
        where: { user: userId }
      });
      const response = await addUsernamesToSnippets(res);
      return response;
    },
    getCommentById: async (
      _,
      { commentId }: GQL.IGetCommentByIdOnQueryArguments
    ) => {
      const res = await Comment.findOne({
        where: { snippet: commentId }
      });
      const response = await addUsernamesToSnippets([res]);
      return response[0];
    }
  },

  Mutation: {
    createComment: async (
      _,
      args: GQL.ICreateCommentOnMutationArguments,
      { session }
    ) => {
      const comment = await createComment(session, args);
      const response = await addUsernamesToSnippets([comment]);
      return response[0];
    },
    updateComment: (
      _,
      args: GQL.IUpdateCommentOnMutationArguments,
      { session }
    ) => {
      return updateComment(session, args);
    },
    deleteComment: (
      _,
      args: GQL.IDeleteCommentOnMutationArguments,
      { session }
    ) => {
      return deleteComment(session, args);
    }
  }
};
