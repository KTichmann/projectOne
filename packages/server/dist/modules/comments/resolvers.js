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
const Comment_1 = require("../../entity/Comment");
const updateComment_1 = require("./functions/updateComment");
const createComment_1 = require("./functions/createComment");
const deleteComment_1 = require("./functions/deleteComment");
const addUsernamesToSnippets_1 = require("../snippets/functions/addUsernamesToSnippets");
exports.resolvers = {
    CommentOrError: {
        __resolveType(obj, _, __) {
            if (obj.id) {
                return "Comment";
            }
            else {
                return "ContentError";
            }
        }
    },
    Query: {
        getSnippetComments: (_, { snippetId }) => __awaiter(this, void 0, void 0, function* () {
            const res = yield Comment_1.Comment.find({
                where: { snippet: snippetId }
            });
            const response = yield addUsernamesToSnippets_1.addUsernamesToSnippets(res);
            return response;
        }),
        getUserComments: (_, { userId }) => __awaiter(this, void 0, void 0, function* () {
            const res = yield Comment_1.Comment.find({
                where: { user: userId }
            });
            const response = yield addUsernamesToSnippets_1.addUsernamesToSnippets(res);
            return response;
        }),
        getCommentById: (_, { commentId }) => __awaiter(this, void 0, void 0, function* () {
            const res = yield Comment_1.Comment.findOne({
                where: { snippet: commentId }
            });
            const response = yield addUsernamesToSnippets_1.addUsernamesToSnippets([res]);
            return response[0];
        })
    },
    Mutation: {
        createComment: (_, args, { session }) => __awaiter(this, void 0, void 0, function* () {
            const comment = yield createComment_1.createComment(session, args);
            const response = yield addUsernamesToSnippets_1.addUsernamesToSnippets([comment]);
            return response[0];
        }),
        updateComment: (_, args, { session }) => {
            return updateComment_1.updateComment(session, args);
        },
        deleteComment: (_, args, { session }) => {
            return deleteComment_1.deleteComment(session, args);
        }
    }
};
//# sourceMappingURL=resolvers.js.map