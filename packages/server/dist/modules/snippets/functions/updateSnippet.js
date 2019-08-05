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
const userCanEditSnippet_1 = require("./userCanEditSnippet");
const Snippet_1 = require("../../../entity/Snippet");
const errorMessages_1 = require("../../../utils/errorMessages");
exports.updateSnippet = (session, args) => __awaiter(this, void 0, void 0, function* () {
    const { id, content, language, visibility, title, theme } = args;
    let { tags } = args;
    if (!tags) {
        tags = [];
    }
    const userId = session.userId;
    const userCanEdit = yield userCanEditSnippet_1.userCanEditSnippet(id, userId);
    if (!userCanEdit) {
        return {
            error: "user",
            message: errorMessages_1.noUser
        };
    }
    const snippetToUpdate = yield Snippet_1.Snippet.findOne(id);
    if (typeof snippetToUpdate === "undefined") {
        return {
            error: "snippet",
            message: errorMessages_1.noSnippet
        };
    }
    if (tags.length > 0) {
        snippetToUpdate.tags = tags;
    }
    if (content) {
        snippetToUpdate.content = content;
    }
    if (language) {
        snippetToUpdate.language = language;
    }
    if (visibility) {
        snippetToUpdate.visibility = visibility;
    }
    if (theme) {
        snippetToUpdate.theme = theme;
    }
    if (title) {
        snippetToUpdate.title = title;
    }
    yield Snippet_1.Snippet.save(snippetToUpdate);
    return snippetToUpdate;
});
//# sourceMappingURL=updateSnippet.js.map