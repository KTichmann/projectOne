import { ResolverMap } from "../../types/graphql-utils";
import { Comment } from "../../entity/Comment";
import { updateComment } from "./functions/updateComment";
import { createComment } from "./functions/createComment";
import { deleteComment } from "./functions/deleteComment";

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
			return res;
		},
		getUserComments: async (
			_,
			{ userId }: GQL.IGetUserCommentsOnQueryArguments
		) => {
			const res = await Comment.find({
				where: { user: userId }
			});
			return res;
		},
		getCommentById: async (
			_,
			{ commentId }: GQL.IGetCommentByIdOnQueryArguments
		) => {
			const res = await Comment.findOne({
				where: { snippet: commentId }
			});
			return res;
		}
	},

	Mutation: {
		createComment: (
			_,
			args: GQL.ICreateCommentOnMutationArguments,
			{ session }
		) => {
			return createComment(session, args);
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
