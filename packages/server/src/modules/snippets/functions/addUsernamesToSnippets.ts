import { Snippet } from "../../../entity/Snippet";
import { User } from "../../../entity/User";

export const addUsernamesToSnippets = async (snippetArr: Snippet[]) => {
  const result = snippetArr.map(async snippet => {
    const user = await User.findOne({ where: { id: snippet.user } });
    if (typeof user === "undefined") {
      return snippet;
    }
    snippet.user = user.username;
    return snippet;
  });
  const resolvedResult = await Promise.all(result);
  return resolvedResult;
};
