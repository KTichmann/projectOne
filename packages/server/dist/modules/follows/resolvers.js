"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Following_1 = require("../../entity/Following");
const Snippet_1 = require("../../entity/Snippet");
const addUsernamesToSnippets_1 = require("../snippets/functions/addUsernamesToSnippets");
exports.resolvers = {
    Query: {
        getUserFollowers: (_, { userId }, { session }) => __awaiter(this, void 0, void 0, function* () {
            const id = userId || session.userId;
            const res = yield Following_1.Following.find({ where: { followed: id } });
            return res;
        }),
        getUserFollowing: (_, { userId }, { session }) => __awaiter(this, void 0, void 0, function* () {
            const id = userId || session.userId;
            const res = yield Following_1.Following.find({ where: { following: id } });
            return res;
        }),
        getFollowingSnippets: (_, __, { session }) => __awaiter(this, void 0, void 0, function* () {
            const id = session.userId;
            const following = yield Following_1.Following.find({ where: { following: id } });
            let snippets = [];
            for (const obj of following) {
                const { followed } = obj;
                let userSnippets = yield Snippet_1.Snippet.find({
                    where: { user: followed }
                });
                snippets = [...snippets, ...userSnippets];
            }
            return addUsernamesToSnippets_1.addUsernamesToSnippets(snippets);
        })
    },
    Mutation: {
        followUser: (_, { userId }, { session }) => __awaiter(this, void 0, void 0, function* () {
            const followerId = session.userId;
            if (typeof followerId === "undefined") {
                return [
                    {
                        path: "userId",
                        message: "user not logged in"
                    }
                ];
            }
            const followRelation = yield Following_1.Following.create({
                followed: userId,
                following: followerId
            });
            yield followRelation.save();
            return null;
        })
    }
};
//# sourceMappingURL=resolvers.js.map