import { ResolverMap } from "../../types/graphql-utils";
import { Comment } from "../../entity/Comment";
import { updateComment } from "./functions/updateComment";
import { createComment } from "./functions/createComment";
import { deleteComment } from "./functions/deleteComment";

export const resolvers: ResolverMap = {
	Query: {
		getSnippetComments: async (_, { snippetId }) => {
			const res = await Comment.find({
				where: { snippet: snippetId }
			});
			return res;
		},
		getUserComments: async (_, { userId }) => {
			const res = await Comment.find({
				where: { user: userId }
			});
			return res;
		},
		getCommentById: async (_, { snippetId }) => {
			const res = await Comment.findOne({
				where: { snippet: snippetId }
			});
			return res;
		}
	},

	Mutation: {
		createComment: (_, args: any, { session }) => {
			return createComment(session, args);
		},
		updateComment: (_, args: any, { session }) => {
			return updateComment(session, args);
		},
		deleteComment: (_, args: any, { session }) => {
			return deleteComment(session, args);
		}
	}
};
