// import { Snippet } from "../../../entity/Snippet";
import { validSnippetSchema } from "@abb/common";
import { formatYupError } from "../../../utils/formatYupError";
import { Snippet } from "../../../entity/Snippet";
import { Session } from "../../../types/graphql-utils";
import { noUser } from "../../../utils/errorMessages";

export const createSnippet = async (
	session: Session,
	args: GQL.ICreateSnippetOnMutationArguments
) => {
	const { content, language, visibility, title, theme } = args;
	let { tags } = args;

	try {
		await validSnippetSchema.validate(args, { abortEarly: false });
	} catch (err) {
		return formatYupError(err);
	}

	const userId = session.userId;
	if (!userId) {
		return {
			error: "user",
			message: noUser
		};
	}
	if (!tags) {
		tags = [];
	}
	const snippet = Snippet.create({
		user: userId,
		visibility,
		language,
		theme,
		content,
		title,
		tags
	});

	await snippet.save();

	return snippet;
};
