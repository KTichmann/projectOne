import * as yup from "yup";

export const SUPPORTED_LANGS = [
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
	.oneOf(SUPPORTED_LANGS, `language must be one of [${SUPPORTED_LANGS}]`);

const visibility = yup.mixed().oneOf(VISIBILITY_OPTIONS);

export const validSnippetSchema = yup.object().shape({
	content,
	language,
	visibility
});
