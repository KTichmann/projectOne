import React from "react";
import { Snippet } from "../snippets/sharedComponents/Snippet";
export const SnippetList = (props: any) => {
	return (
		<div>
			{props.values.map((val: any) => (
				<div key={val.id} style={{ margin: "10px", marginBottom: "50px" }}>
					<Snippet
						key={val.id}
						value={val.content}
						title={val.title}
						avatar={"test"}
						language={val.language}
						tags={val.tags}
						theme={val.theme}
						snapId={val.id}
						username={val.user}
						count={12}
					/>
				</div>
			))}
		</div>
	);
};
