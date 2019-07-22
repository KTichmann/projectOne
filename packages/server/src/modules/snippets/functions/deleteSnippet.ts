import { Session } from "../../../types/graphql-utils";
import { Snippet } from "../../../entity/Snippet";
import { userCanEditSnippet } from "./userCanEditSnippet";

export const deleteSnippet = async (
	session: Session,
	{ snippetId }: GQL.IDeleteSnippetOnMutationArguments
) => {
	const userId = session.userId;
	const userCanEdit = await userCanEditSnippet(snippetId, userId as string);
	if (!userCanEdit) {
		return false;
	}
	const deleteSuccess = await Snippet.delete({ id: snippetId });
	return deleteSuccess.affected === 1;
};
