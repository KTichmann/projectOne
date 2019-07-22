"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
exports.SUPPORTED_LANGS = [
    "javascript",
    "html",
    "python",
    "css",
    "php",
    "ruby"
];
const VISIBILITY_OPTIONS = ["public", "private"];
const content = yup
    .string()
    .max(500, "invalid login")
    .required("snippet content cannot be empty");
const language = yup
    .mixed()
    .oneOf(exports.SUPPORTED_LANGS, `language must be one of [${exports.SUPPORTED_LANGS}]`);
const visibility = yup.mixed().oneOf(VISIBILITY_OPTIONS);
exports.validSnippetSchema = yup.object().shape({
    content,
    language,
    visibility
});
//# sourceMappingURL=snippet.js.map