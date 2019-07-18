import { Comment } from "../../../entity/Comment";
import { Session } from "../../../types/graphql-utils";
import { Snippet } from "../../../entity/Snippet";
import { noUser, noSnippet } from "../../../utils/errorMessages";

export const createComment = async (
	session: Session,
	{ content, snippetId }: any
) => {
	const userId = session.userId;
	if (!userId) {
		return { error: "user", message: noUser };
	}

	const snippetExists = await Snippet.findOne({ where: { id: snippetId } });
	if (typeof snippetExists === "undefined") {
		return { error: "snippet", message: noSnippet };
	}

	const comment = Comment.create({
		user: userId,
		snippet: snippetId,
		content
	});

	await comment.save();

	return comment;
};
