import React from "react";
import SyntaxHighlighter from "react-native-syntax-highlighter";
import { tomorrow } from "react-syntax-highlighter/styles/prism";

export const CodeBlock = (props: { value: string; language: string }) => {
	return (
		<SyntaxHighlighter
			style={tomorrow}
			customStyle={{ padding: 0, margin: 0 }}
			language={props.language}
			fontSize={18}
			highlighter='prism'>
			{props.value}
		</SyntaxHighlighter>
	);
};
