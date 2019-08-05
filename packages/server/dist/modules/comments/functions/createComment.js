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
const Comment_1 = require("../../../entity/Comment");
const Snippet_1 = require("../../../entity/Snippet");
const errorMessages_1 = require("../../../utils/errorMessages");
exports.createComment = (session, { content, snippetId }) => __awaiter(this, void 0, void 0, function* () {
    const userId = session.userId;
    if (!userId) {
        return { error: "user", message: errorMessages_1.noUser };
    }
    const snippetExists = yield Snippet_1.Snippet.findOne({ where: { id: snippetId } });
    if (typeof snippetExists === "undefined") {
        return { error: "snippet", message: errorMessages_1.noSnippet };
    }
    const comment = Comment_1.Comment.create({
        user: userId,
        snippet: snippetId,
        content
    });
    yield comment.save();
    return comment;
});
//# sourceMappingURL=createComment.js.map