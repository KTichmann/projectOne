import { Comment } from "../../../entity/Comment";
import console = require("console");

export const addCommentCountsToSnippets = async (snippetArr: any[]) => {
  console.log(snippetArr);
  const result = snippetArr.map(async snippet => {
    const commentCount = await Comment.findAndCount({
      where: { snippet: snippet.id }
    });
    console.log("snippet: ", snippet.id);
    console.log(commentCount);
    snippet.comments = commentCount[1];
    return snippet;
  });

  const resolvedResult = await Promise.all(result);
  return resolvedResult;
};
