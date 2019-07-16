import { userCanEditSnippet } from "./userCanEditSnippet";
import { Session } from "../../../types/graphql-utils";
import { Snippet } from "../../../entity/Snippet";

export const updateSnippet = async (
	session: Session,
	args: GQL.IUpdateSnippetOnMutationArguments
) => {
	const { id, content, language, visibility } = args;
	let { tags } = args;
	if (!tags) {
		tags = [];
	}
	const userId = session.userId;
	const userCanEdit = await userCanEditSnippet(id, userId as string);
	if (!userCanEdit) {
		return null;
	}

	// const updatePromise = User.update(
	//     { id: userId },
	//     {
	//         forgotPasswordLocked: false,
	//         password: hashedPassword
	//     }
	// );

	console.log(test);
	console.log("for the lint!", content, language, visibility);

	// const snippet = Snippet.create({
	// 	user: userId,
	// 	visibility,
	// // 	language,
	// // 	content,
	// // 	tags
	// // });

	// await snippet.save();

	// return snippet;
};
