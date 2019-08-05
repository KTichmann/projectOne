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
exports.userCanEditComment = (commentId, userId) => __awaiter(this, void 0, void 0, function* () {
    const userCanEdit = yield Comment_1.Comment.find({
        where: { id: commentId }
    });
    if (userCanEdit.length < 1) {
        return false;
    }
    return userCanEdit[0].user === userId;
});
//# sourceMappingURL=userCanEditComment.js.map