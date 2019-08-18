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
const Snippet_1 = require("../../entity/Snippet");
const createSnippet_1 = require("./functions/createSnippet");
const updateSnippet_1 = require("./functions/updateSnippet");
const deleteSnippet_1 = require("./functions/deleteSnippet");
const addUsernamesToSnippets_1 = require("./functions/addUsernamesToSnippets");
const typeorm_1 = require("typeorm");
const addCommentCountsToSnippets_1 = require("./functions/addCommentCountsToSnippets");
exports.resolvers = {
    SnippetOrError: {
        __resolveType(obj, _, __) {
            if (obj.id) {
                return "Snippet";
            }
            else {
                return "ContentError";
            }
        }
    },
    Query: {
        getPublicSnippets: () => __awaiter(this, void 0, void 0, function* () {
            const res = yield Snippet_1.Snippet.find({
                where: { visibility: "public" }
            });
            const response = yield addCommentCountsToSnippets_1.addCommentCountsToSnippets(res);
            return addUsernamesToSnippets_1.addUsernamesToSnippets(response);
        }),
        getUserSnippets: (_, { username }) => __awaiter(this, void 0, void 0, function* () {
            const res = yield Snippet_1.Snippet.find({
                where: { username, visibility: "public" }
            });
            const response = yield addCommentCountsToSnippets_1.addCommentCountsToSnippets(res);
            return addUsernamesToSnippets_1.addUsernamesToSnippets(response);
        }),
        getMySnippets: (_, __, { session }) => __awaiter(this, void 0, void 0, function* () {
            const userId = session.userId;
            const res = yield Snippet_1.Snippet.find({
                where: { userId }
            });
            const response = yield addCommentCountsToSnippets_1.addCommentCountsToSnippets(res);
            return addUsernamesToSnippets_1.addUsernamesToSnippets(response);
        }),
        getSnippetById: (_, { snippetId }) => __awaiter(this, void 0, void 0, function* () {
            const res = yield Snippet_1.Snippet.findOne({
                where: { id: snippetId }
            });
            if (!res) {
                return null;
            }
            const resultArr = yield addUsernamesToSnippets_1.addUsernamesToSnippets([res]);
            const result = yield addCommentCountsToSnippets_1.addCommentCountsToSnippets(resultArr);
            return result[0];
        }),
        getSnippetsByTag: (_, { tag }) => __awaiter(this, void 0, void 0, function* () {
            const res = yield Snippet_1.Snippet.createQueryBuilder()
                .where(":tag = ANY(tags)", {
                tag
            })
                .execute();
            const cleanedRes = res.map((obj) => ({
                id: obj.Snippet_id,
                content: obj.Snippet_content,
                language: obj.Snippet_language,
                tags: obj.Snippet_tags,
                user: obj.Snippet_user
            }));
            const response = yield addCommentCountsToSnippets_1.addCommentCountsToSnippets(cleanedRes);
            return addUsernamesToSnippets_1.addUsernamesToSnippets(response);
        }),
        searchSnippets: (_, { query }) => __awaiter(this, void 0, void 0, function* () {
            const titleSearch = yield Snippet_1.Snippet.find({ where: { title: typeorm_1.Like(query) } });
            const userSearch = yield Snippet_1.Snippet.find({
                where: { user: typeorm_1.Like(query) }
            });
            const contentSearch = yield Snippet_1.Snippet.find({
                where: { content: typeorm_1.Like(query) }
            });
            const response = yield addCommentCountsToSnippets_1.addCommentCountsToSnippets([
                ...titleSearch,
                ...contentSearch,
                ...userSearch
            ]);
            return addUsernamesToSnippets_1.addUsernamesToSnippets(response);
        })
    },
    Mutation: {
        createSnippet: (_, args, { session }) => {
            return createSnippet_1.createSnippet(session, args);
        },
        updateSnippet: (_, args, { session }) => {
            return updateSnippet_1.updateSnippet(session, args);
        },
        deleteSnippet: (_, args, { session }) => {
            return deleteSnippet_1.deleteSnippet(session, args);
        }
    }
};
//# sourceMappingURL=resolvers.js.map