export const user = {
	email: "bob@bob.bob",
	password: "bob@bob.bob",
	username: "bob@bob.bob"
};

export interface RequestSnippet {
	visibility: string;
	language: string;
	theme: string;
	content: string;
	title: string;
	tags: string[];
}

export const snippet = {
	visibility: "public",
	language: "javascript",
	theme: "dracula",
	content: "test",
	title: "test",
	tags: ["tag"]
};
