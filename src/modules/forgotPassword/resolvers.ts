import { ResolverMap } from "../../types/graphql-utils";
import { createForgotPasswordLink } from "../../utils/createForgotPasswordLink";
import { forgotPasswordLockAccount } from "../../utils/forgotPasswordLockAccount";
import { User } from "../../entity/User";
import { userNotFoundError, expiredKeyError } from "./errorMessages";
import { forgotPasswordPrefix } from "../../constants";

// 20 minute timeout
// lock account

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
      const userId = await redis.get(`${forgotPasswordPrefix}${key}`);
      if (userId) {
        return [
          {
            path: "key",
            message: expiredKeyError
          }
        ];
      }
      return null;
    }
  }
};
