import { userCanEditComment } from "./userCanEditComment";
import { Session } from "../../../types/graphql-utils";
import { Comment } from "../../../entity/Comment";

export const updateComment = async (session: Session, args: any) => {
	const { commentId, content } = args;

	const userId = session.userId;
	const userCanEdit = await userCanEditComment(commentId, userId as string);
	if (!userCanEdit) {
		return null;
	}

	const commentToUpdate = await Comment.findOne(commentId);
	if (typeof commentToUpdate === "undefined") {
		return null;
	}

	commentToUpdate.content = content;

	await Comment.save(commentToUpdate);

	return commentToUpdate;
};
