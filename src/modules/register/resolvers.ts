import * as bcrypt from "bcryptjs";
import { ResolverMap } from "../../types/graphql-utils";
import { User } from "../../entity/User";

export const resolvers: ResolverMap = {
	Query: {
		errorFill: () => "bye"
	},

	Mutation: {
		register: async (
			_,
			{ email, password }: GQL.IRegisterOnMutationArguments
		) => {
			const userAlreadyExists = await User.findOne({
				where: { email },
				select: ["id"]
			});

			if (userAlreadyExists) {
				return [{ path: "email", message: "already taken" }];
			}
			// Hash the password
			const hashedPassword = await bcrypt.hash(password, 10);
			// Create the user object
			const user = User.create({
				email,
				password: hashedPassword
			});
			// Save the user to the db
			await user.save();

			return null;
		}
	}
};
