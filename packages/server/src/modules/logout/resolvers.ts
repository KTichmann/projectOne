import { ResolverMap } from "../../types/graphql-utils";
import { removeAllUsersSessions } from "../../utils/removeAllUsersSessions";

export const resolvers: ResolverMap = {
	Query: {
		dummy: () => "dummy"
	},

	Mutation: {
		logout: async (_, __, { session }) => {
			const { userId } = session;

			if (userId) {
				removeAllUsersSessions(userId);
				return true;
			}

			return false;
		}
	}
};
