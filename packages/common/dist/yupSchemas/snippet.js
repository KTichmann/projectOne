"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const yup = require("yup");
exports.SUPPORTED_LANGS = [
    "javascript",
    "json",
    "html",
    "typescript",
    "jsx",
    "css",
    "scss",
    "php",
    "ruby"
];
exports.SUPPORTED_THEMES = [
    "github",
    "ambiance",
    "chaos",
    "chrome",
    "clouds",
    "cobalt",
    "dawn",
    "dracula",
    "dreamweaver",
    "eclipse",
    "gob",
    "kuroir",
    "pastel_on_dark",
    "textmate",
    "terminal"
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