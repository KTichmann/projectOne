import { userCanEditComment } from "./userCanEditComment";
import { Session } from "../../../types/graphql-utils";
import { Comment } from "../../../entity/Comment";
import { noUser, noComment } from "../../../utils/errorMessages";

export const updateComment = async (session: Session, args: any) => {
	const { commentId, content } = args;

	const userId = session.userId;
	const userCanEdit = await userCanEditComment(commentId, userId as string);
	if (!userCanEdit) {
		return { error: "user", message: noUser };
	}

	const commentToUpdate = await Comment.findOne(commentId);
	if (typeof commentToUpdate === "undefined") {
		return { error: "comment", message: noComment };
	}

	commentToUpdate.content = content;

	await Comment.save(commentToUpdate);

	return commentToUpdate;
};
