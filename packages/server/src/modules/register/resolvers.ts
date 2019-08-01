import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";
import { formatYupError } from "../../utils/formatYupError";
import { duplicate } from "./errorMessages";
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
			const { email, password, username } = args;
			const userEmailAlreadyExists = await User.findOne({
				where: { email },
				select: ["id"]
			});

			if (userEmailAlreadyExists) {
				return [{ path: "email", message: duplicate }];
			}

			const usernameAlreadyExists = await User.findOne({
				where: { username },
				select: ["id"]
			});

			if (usernameAlreadyExists) {
				return [{ path: "username", message: duplicate }];
			}

			// Create the user object
			const user = User.create({
				email,
				username,
				password
			});
			// Save the user to the db
			await user.save();

			if (process.env.NODE_ENV !== "test") {
				await sendEmail(
					email,
					await createConfirmEmailLink(url, user.id, mongo),
					"Please click the link below to verify your email address:"
				);
			}

			return null;
		}
	}
};
