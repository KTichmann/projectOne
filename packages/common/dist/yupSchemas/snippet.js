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
exports.SUPPORTED_THEMES = [
    "3024-day",
    "3024-night",
    "abcdef",
    "blackboard",
    "cobalt",
    "darcula",
    "duotone-dark",
    "duotone-light",
    "eclipse",
    "elegant"
];
const VISIBILITY_OPTIONS = ["public", "private"];
const language = yup
    .mixed()
    .oneOf(exports.SUPPORTED_LANGS, `language must be one of [${exports.SUPPORTED_LANGS}]`);
const theme = yup
    .mixed()
    .oneOf(exports.SUPPORTED_THEMES, `theme must be one of [${exports.SUPPORTED_THEMES}]`);
const title = yup.string().required("snippet title cannot be empty");
const visibility = yup.mixed().oneOf(VISIBILITY_OPTIONS);
exports.validSnippetSchema = yup.object().shape({
    title,
    language,
    theme,
    visibility
});
//# sourceMappingURL=snippet.js.map