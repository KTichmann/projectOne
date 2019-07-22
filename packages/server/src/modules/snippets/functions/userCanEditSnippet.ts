import { Snippet } from "../../../entity/Snippet";

export const userCanEditSnippet = async (snippetId: string, userId: string) => {
	// const userId = session.userId;
	const userCanEdit = await Snippet.find({
		where: { id: snippetId }
	});
	if (userCanEdit.length < 1) {
		return false;
	}
	return userCanEdit[0].user === userId;
};
