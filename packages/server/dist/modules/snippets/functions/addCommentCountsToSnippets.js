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
exports.addCommentCountsToSnippets = (snippetArr) => __awaiter(this, void 0, void 0, function* () {
    const result = snippetArr.map((snippet) => __awaiter(this, void 0, void 0, function* () {
        const commentCount = yield Comment_1.Comment.findAndCount({
            where: { snippet: snippet.id }
        });
        snippet.comments = commentCount[1];
        return snippet;
    }));
    const resolvedResult = yield Promise.all(result);
    return resolvedResult;
});
//# sourceMappingURL=addCommentCountsToSnippets.js.map