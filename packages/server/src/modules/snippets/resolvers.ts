import { ResolverMap } from "../../types/graphql-utils";
import { Snippet } from "../../entity/Snippet";
import { createSnippet } from "./functions/createSnippet";
import { updateSnippet } from "./functions/updateSnippet";
import { deleteSnippet } from "./functions/deleteSnippet";

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
		},

		getSnippetsByTag: async (_, { tag }) => {
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
			return cleanedRes;
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
