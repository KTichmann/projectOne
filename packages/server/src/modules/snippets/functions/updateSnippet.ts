import { userCanEditSnippet } from "./userCanEditSnippet";
import { Session } from "../../../types/graphql-utils";
import { Snippet } from "../../../entity/Snippet";
import { noUser, noSnippet } from "../../../utils/errorMessages";

export const updateSnippet = async (
	session: Session,
	args: GQL.IUpdateSnippetOnMutationArguments
) => {
	const { id, content, language, visibility, title, theme } = args;
	let { tags } = args;
	if (!tags) {
		tags = [];
	}
	const userId = session.userId;
	const userCanEdit = await userCanEditSnippet(id, userId as string);
	if (!userCanEdit) {
		return {
			error: "user",
			message: noUser
		};
	}

	const snippetToUpdate = await Snippet.findOne(id);
	if (typeof snippetToUpdate === "undefined") {
		return {
			error: "snippet",
			message: noSnippet
		};
	}

	if (tags.length > 0) {
		snippetToUpdate.tags = tags;
	}
	if (content) {
		snippetToUpdate.content = content;
	}
	if (language) {
		snippetToUpdate.language = language;
	}
	if (visibility) {
		snippetToUpdate.visibility = visibility;
	}
	if (theme) {
		snippetToUpdate.theme = theme;
	}
	if (title) {
		snippetToUpdate.title = title;
	}

	await Snippet.save(snippetToUpdate);

	return snippetToUpdate;
};
