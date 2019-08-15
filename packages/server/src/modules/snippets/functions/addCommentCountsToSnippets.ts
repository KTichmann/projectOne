import { Comment } from "../../../entity/Comment";

export const addCommentCountsToSnippets = async (snippetArr: any[]) => {
	const result = snippetArr.map(async snippet => {
		const commentCount = await Comment.findAndCount({
			where: { snippet: snippet.id }
		});
		snippet.comments = commentCount[1];
		return snippet;
	});

	const resolvedResult = await Promise.all(result);
	return resolvedResult;
};
