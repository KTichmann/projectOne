import { Session } from "../../../types/graphql-utils";
import { Comment } from "../../../entity/Comment";
import { userCanEditComment } from "./userCanEditComment";

export const deleteComment = async (session: Session, { commentId }: any) => {
	const userId = session.userId;
	const userCanEdit = await userCanEditComment(commentId, userId as string);
	if (!userCanEdit) {
		return false;
	}
	const deleteSuccess = await Comment.delete({ id: commentId });
	return deleteSuccess.affected === 1;
};
