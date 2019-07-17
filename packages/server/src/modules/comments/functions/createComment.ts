import { Comment } from "../../../entity/Comment";
import { Session } from "../../../types/graphql-utils";
import { Snippet } from "../../../entity/Snippet";

export const createComment = async (
	session: Session,
	{ content, snippetId }: any
) => {
	const userId = session.userId;
	if (!userId) {
		return null;
	}

	const snippetExists = await Snippet.findOne({ where: { id: snippetId } });
	if (typeof snippetExists === "undefined") {
		return null;
	}

	const comment = Comment.create({
		user: userId,
		snippet: snippetId,
		content
	});

	await comment.save();

	return comment;
};
