import React from "react";
import { CodeBlock } from "./CodeBlock";
import { Card } from "native-base";

export const Snippet = (props: {
	title: string;
	avatar: string;
	language: string;
	tags: string[];
	value: string;
	theme: string;
	count: number;
	snapId?: string;
	username?: string;
	hideCommentCount?: boolean;
}) => {
	const { language, value, theme } = props;
	return (
		<Card>
			<CodeBlock value={value} language={language} />
		</Card>
	);
};
