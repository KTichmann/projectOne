import { ResolverMap } from "../../types/graphql-utils";
import { Following } from "../../entity/Following";

export const resolvers: ResolverMap = {
	Query: {
		getUserFollowers: async (_, { userId }, { session }) => {
			const id = userId || session.userId;
			const res = await Following.find({ where: { followed: id } });

			console.log(res);
			return res;
		},
		getUserFollowing: async (_, { userId }, { session }) => {
			const id = userId || session.userId;
			const res = await Following.find({ where: { following: id } });
			console.log(res);
			return res;
		}
	},
	Mutation: {
		followUser: async (_, { userId }, { session }) => {
			const followerId = session.userId;
			if (typeof followerId === "undefined") {
				return [
					{
						path: "userId",
						message: "user not logged in"
					}
				];
			}
			console.log(userId, followerId);
			const followRelation = await Following.create({
				followed: userId,
				following: followerId
			});

			await followRelation.save();

			return null;
		}
	}
};
