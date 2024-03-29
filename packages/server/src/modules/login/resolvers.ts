import * as bcrypt from "bcryptjs";
import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";
import {
	invalidLogin,
	confirmedEmailError,
	forgotPasswordLocked
} from "./errorMessages";
// import { userSessionIdPrefix } from "../../constants";

const errorResponse = [
	{
		path: "email",
		message: invalidLogin
	}
];

export const resolvers: ResolverMap = {
	Query: {
		errorFill: () => "bye"
	},

	Mutation: {
		login: async (
			_,
			{ email, password }: GQL.ILoginOnMutationArguments,
			{ session }
		) => {
			const user = await User.findOne({ where: { email } });
			if (!user) {
				return errorResponse;
			}
			const valid = await bcrypt.compare(password, user.password);
			if (!valid) {
				return errorResponse;
			}

			if (!user.confirmed) {
				return [
					{
						path: "email",
						message: confirmedEmailError
					}
				];
			}

			if (user.forgotPasswordLocked) {
				return [
					{
						path: "email",
						message: forgotPasswordLocked
					}
				];
			}
			// login is successful

			// create a cookie for the user
			session.userId = user.id;

			return null;
		}
	}
};
