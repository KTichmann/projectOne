import { ResolverMap } from "../../types/graphql-utils";
import { Following } from "../../entity/Following";
import { Snippet } from "../../entity/Snippet";
import console = require("console");

export const resolvers: ResolverMap = {
  Query: {
    getUserFollowers: async (
      _,
      { userId }: GQL.IGetUserFollowersOnQueryArguments,
      { session }
    ) => {
      const id = userId || session.userId;
      const res = await Following.find({ where: { followed: id } });
      return res;
    },
    getUserFollowing: async (
      _,
      { userId }: GQL.IGetUserFollowingOnQueryArguments,
      { session }
    ) => {
      const id = userId || session.userId;
      const res = await Following.find({ where: { following: id } });
      return res;
    },
    getFollowingSnippets: async (_, __, { session }) => {
      const id = session.userId;
      const following = await Following.find({ where: { following: id } });
      let snippets: any[] = [];
      for (const obj of following) {
        const { followed } = obj;
        const userSnippets = await Snippet.find({
          where: { userId: followed }
        });
        snippets = [...snippets, ...userSnippets];
      }
      console.log(snippets);
      return snippets;
    }
  },
  Mutation: {
    followUser: async (
      _,
      { userId }: GQL.IFollowUserOnMutationArguments,
      { session }
    ) => {
      const followerId = session.userId;
      if (typeof followerId === "undefined") {
        return [
          {
            path: "userId",
            message: "user not logged in"
          }
        ];
      }
      const followRelation = await Following.create({
        followed: userId,
        following: followerId
      });

      await followRelation.save();

      return null;
    }
  }
};
