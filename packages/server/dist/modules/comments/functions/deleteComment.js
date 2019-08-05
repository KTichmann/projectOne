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
const userCanEditComment_1 = require("./userCanEditComment");
exports.deleteComment = (session, { commentId }) => __awaiter(this, void 0, void 0, function* () {
    const userId = session.userId;
    const userCanEdit = yield userCanEditComment_1.userCanEditComment(commentId, userId);
    if (!userCanEdit) {
        return false;
    }
    const deleteSuccess = yield Comment_1.Comment.delete({ id: commentId });
    return deleteSuccess.affected === 1;
});
//# sourceMappingURL=deleteComment.js.map