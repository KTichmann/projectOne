import { ResolverMap } from "../../types/graphql-utils";
import { Snippet } from "../../entity/Snippet";
import { createSnippet } from "./functions/createSnippet";

export const resolvers: ResolverMap = {
	Query: {
		getPublicSnippets: async () => {
			const res = await Snippet.find({
				where: { visibility: "public" }
			});
			return res;
		},
		getUserSnippets: async (userId: string) => {
			const res = await Snippet.find({
				where: { userId }
			});
			return res;
		},
		getSnippetById: async (id: string) => {
			const res = await Snippet.find({
				where: { id }
			});
			return res;
		}
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
