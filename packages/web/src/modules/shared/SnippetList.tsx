import React from "react";
import { Snippet } from "../snippets/Snippet";

export const SnippetList = (props: any) => (
	<div>
		{props.values.forEach((val: any) => (
			<Snippet
				value={val.content}
				title={val.title}
				avatar={val.avatar}
				language={val.language}
				tags={val.tags}
				theme={val.theme}
				count={val.count}
				snapId={val.snapId}
				username={val.username}
			/>
		))}
	</div>
);
