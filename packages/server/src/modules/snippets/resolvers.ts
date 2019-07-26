import { ResolverMap } from "../../types/graphql-utils";
import { Snippet } from "../../entity/Snippet";
import { createSnippet } from "./functions/createSnippet";
import { updateSnippet } from "./functions/updateSnippet";
import { deleteSnippet } from "./functions/deleteSnippet";
import { addUsernamesToSnippets } from "./functions/addUsernamesToSnippets";

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
			return addUsernamesToSnippets(res);
		},
		getUserSnippets: async (
			_,
			{ userId }: GQL.IGetUserSnippetsOnQueryArguments
		) => {
			const res = await Snippet.find({
				where: { userId }
			});
			return addUsernamesToSnippets(res);
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
			return addUsernamesToSnippets(cleanedRes);
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
