import * as yup from "yup";
import * as bcrypt from "bcryptjs";

import { ResolverMap } from "../../types/graphql-utils";
import { createForgotPasswordLink } from "../../utils/createForgotPasswordLink";
import { forgotPasswordLockAccount } from "../../utils/forgotPasswordLockAccount";
import { User } from "../../entity/User";
import { userNotFoundError, expiredKeyError } from "./errorMessages";
import { forgotPasswordPrefix } from "../../constants";
import { registerPasswordValidation } from "../../yupSchemas";
import { formatYupError } from "../../utils/formatYupError";

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
			{ redis }
		) => {
			const user = await User.findOne({ where: { email } });
			if (!user) {
				return [{ path: "email", message: userNotFoundError }];
			}
			await forgotPasswordLockAccount(user.id, redis);
			// @todo add frontend url
			await createForgotPasswordLink("", user.id, redis);

			// @todo send email with the url
			return true;
		},
		forgotPasswordChange: async (
			_,
			{ newPassword, key }: GQL.IForgotPasswordChangeOnMutationArguments,
			{ redis }
		) => {
			const redisKey = `${forgotPasswordPrefix}${key}`;
			const userId = await redis.get(redisKey);
			if (!userId) {
				return [
					{
						path: "key",
						message: expiredKeyError
					}
				];
			}

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

			const deleteKeyPromise = redis.del(redisKey);

			await Promise.all([updatePromise, deleteKeyPromise]);

			return null;
		}
	}
};
