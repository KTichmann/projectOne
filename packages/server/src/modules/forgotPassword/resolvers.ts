import * as yup from "yup";
import * as bcrypt from "bcryptjs";

import { ResolverMap } from "../../types/graphql-utils";
import { createForgotPasswordLink } from "../../utils/createForgotPasswordLink";
// import { forgotPasswordLockAccount } from "../../utils/forgotPasswordLockAccount";
import { User } from "../../entity/User";
import { expiredKeyError } from "./errorMessages";
import { registerPasswordValidation } from "../../yupSchemas";
import { formatYupError } from "../../utils/formatYupError";
import { sendEmail } from "../../utils/sendEmail";

// 20 minute timeout
// lock account

const schema = yup.object().shape({
	newPassword: registerPasswordValidation
});

export const resolvers: ResolverMap = {
	Query: {
		dummy: () => "bye"
	},

	Mutation: {
		sendForgotPasswordEmail: async (
			_,
			{ email }: GQL.ISendForgotPasswordEmailOnMutationArguments,
			{ mongo }
		) => {
			const user = await User.findOne({ where: { email } });
			if (!user) {
				return false;
			}
			// await forgotPasswordLockAccount(user.id);

			const url = await createForgotPasswordLink(
				process.env.FRONTEND_HOST as string,
				user.id,
				mongo
			);

			// send email with the url
			await sendEmail(email, url, "Reset your password here: ");

			return true;
		},
		forgotPasswordChange: async (
			_,
			{ newPassword, key }: GQL.IForgotPasswordChangeOnMutationArguments,
			{ mongo }
		) => {
			const collection = mongo.collection("forgotPassword");
			const forgotPasswordObj = await collection.findOne({ id: key });
			if (!forgotPasswordObj) {
				return [
					{
						path: "password",
						message: expiredKeyError
					}
				];
			}
			const userId = forgotPasswordObj.userId;

			try {
				await schema.validate({ newPassword }, { abortEarly: true });
			} catch (err) {
				return formatYupError(err);
			}
			const hashedPassword = await bcrypt.hash(newPassword, 10);

			const updatePromise = User.update(
				{ id: userId },
				{
					forgotPasswordLocked: false,
					password: hashedPassword
				}
			);

			const deleteKeyPromise = collection.deleteOne({ id: key });

			await Promise.all([updatePromise, deleteKeyPromise]);

			return null;
		}
	}
};
