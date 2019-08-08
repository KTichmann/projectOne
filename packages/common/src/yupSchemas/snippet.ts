import * as yup from "yup";

export const SUPPORTED_LANGS = [
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

export const SUPPORTED_THEMES = [
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

// const content = yup
// 	.string()
// 	.max(500, "invalid login")
// 	.required("snippet content cannot be empty");

const language = yup
	.mixed()
	.oneOf(SUPPORTED_LANGS, `language must be one of [${SUPPORTED_LANGS}]`);

const theme = yup
	.mixed()
	.oneOf(SUPPORTED_THEMES, `theme must be one of [${SUPPORTED_THEMES}]`);

const title = yup.string().required("snippet title cannot be empty");

const visibility = yup.mixed().oneOf(VISIBILITY_OPTIONS);

export const validSnippetSchema = yup.object().shape({
	title,
	language,
	theme,
	visibility
});
