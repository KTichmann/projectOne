import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";
import { formatYupError } from "../../utils/formatYupError";
import { duplicateEmail } from "./errorMessages";
import { createConfirmEmailLink } from "../../utils/createConfirmEmailLink";
import { sendEmail } from "../../utils/sendEmail";
import { validUserSchema } from "@abb/common";

export const resolvers: ResolverMap = {
	Query: {
		errorFill: () => "bye"
	},

	Mutation: {
		register: async (
			_,
			args: GQL.IRegisterOnMutationArguments,
			{ mongo, url }
		) => {
			try {
				await validUserSchema.validate(args, { abortEarly: false });
			} catch (err) {
				return formatYupError(err);
			}
			const { email, password } = args;
			const userAlreadyExists = await User.findOne({
				where: { email },
				select: ["id"]
			});

			if (userAlreadyExists) {
				return [{ path: "email", message: duplicateEmail }];
			}

			// Create the user object
			const user = User.create({
				email,
				password
			});
			// Save the user to the db
			await user.save();

			if (process.env.NODE_ENV !== "test") {
				await sendEmail(
					email,
					await createConfirmEmailLink(url, user.id, mongo),
					"Verify your email address"
				);
			}

			return null;
		}
	}
};
