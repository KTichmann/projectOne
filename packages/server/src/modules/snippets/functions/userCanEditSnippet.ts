import { Snippet } from "../../../entity/Snippet";

export const userCanEditSnippet = async (snippetId: string, userId: string) => {
	// const userId = session.userId;
	const userCanEdit = await Snippet.find({
		where: { id: snippetId }
	});
	console.log("userCanEdit: ", userCanEdit[0].user);
	console.log("userId", userId);
	return userCanEdit[0].user === userId;
};
