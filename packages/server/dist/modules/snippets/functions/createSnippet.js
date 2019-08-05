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
const common_1 = require("@abb/common");
const formatYupError_1 = require("../../../utils/formatYupError");
const Snippet_1 = require("../../../entity/Snippet");
const errorMessages_1 = require("../../../utils/errorMessages");
exports.createSnippet = (session, args) => __awaiter(this, void 0, void 0, function* () {
    const { content, language, visibility, title, theme } = args;
    let { tags } = args;
    try {
        yield common_1.validSnippetSchema.validate(args, { abortEarly: false });
    }
    catch (err) {
        return formatYupError_1.formatYupError(err);
    }
    const userId = session.userId;
    if (!userId) {
        return {
            error: "user",
            message: errorMessages_1.noUser
        };
    }
    if (!tags) {
        tags = [];
    }
    const snippet = Snippet_1.Snippet.create({
        user: userId,
        visibility,
        language,
        theme,
        content,
        title,
        tags
    });
    yield snippet.save();
    return snippet;
});
//# sourceMappingURL=createSnippet.js.map