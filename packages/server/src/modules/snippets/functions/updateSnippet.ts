import { userCanEditSnippet } from "./userCanEditSnippet";
import { Session } from "../../../types/graphql-utils";
import { Snippet } from "../../../entity/Snippet";

export const updateSnippet = async (
	session: Session,
	args: GQL.IUpdateSnippetOnMutationArguments
) => {
	const { id, content, language, visibility } = args;
	let { tags } = args;
	if (!tags) {
		tags = [];
	}
	const userId = session.userId;
	const userCanEdit = await userCanEditSnippet(id, userId as string);
	if (!userCanEdit) {
		return null;
	}

	const snippetToUpdate = await Snippet.findOne(id);
	if (typeof snippetToUpdate === "undefined") {
		return null;
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

	await Snippet.save(snippetToUpdate);

	return snippetToUpdate;
};
