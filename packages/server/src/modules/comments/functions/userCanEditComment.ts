import { Comment } from "../../../entity/Comment";

export const userCanEditComment = async (commentId: string, userId: string) => {
	const userCanEdit = await Comment.find({
		where: { id: commentId }
	});
	if (userCanEdit.length < 1) {
		return false;
	}
	return userCanEdit[0].user === userId;
};
