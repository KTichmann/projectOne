import * as yup from "yup";
import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";
import { formatYupError } from "../../utils/formatYupError";
import {
	duplicateEmail,
	emailNotLongEnough,
	invalidEmail
} from "./errorMessages";
import { createConfirmEmailLink } from "../../utils/createConfirmEmailLink";
import { sendEmail } from "../../utils/sendEmail";
import { registerPasswordValidation } from "../../yupSchemas";

const schema = yup.object().shape({
	email: yup
		.string()
		.min(3, emailNotLongEnough)
		.max(255)
		.email(invalidEmail),
	password: registerPasswordValidation
});

export const resolvers: ResolverMap = {
	Query: {
		errorFill: () => "bye"
	},

	Mutation: {
		register: async (
			_,
			args: GQL.IRegisterOnMutationArguments,
			{ redis, url }
		) => {
			try {
				await schema.validate(args, { abortEarly: false });
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
					await createConfirmEmailLink(url, user.id, redis)
				);
			}

			return null;
		}
	}
};
