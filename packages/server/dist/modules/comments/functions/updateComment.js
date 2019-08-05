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
const userCanEditComment_1 = require("./userCanEditComment");
const Comment_1 = require("../../../entity/Comment");
const errorMessages_1 = require("../../../utils/errorMessages");
exports.updateComment = (session, args) => __awaiter(this, void 0, void 0, function* () {
    const { commentId, content } = args;
    const userId = session.userId;
    const userCanEdit = yield userCanEditComment_1.userCanEditComment(commentId, userId);
    if (!userCanEdit) {
        return { error: "user", message: errorMessages_1.noUser };
    }
    const commentToUpdate = yield Comment_1.Comment.findOne(commentId);
    if (typeof commentToUpdate === "undefined") {
        return { error: "comment", message: errorMessages_1.noComment };
    }
    commentToUpdate.content = content;
    yield Comment_1.Comment.save(commentToUpdate);
    return commentToUpdate;
});
//# sourceMappingURL=updateComment.js.map