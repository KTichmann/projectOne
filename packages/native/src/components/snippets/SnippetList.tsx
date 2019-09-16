import React from "react";
import { Snippet } from "./Snippet";
import { View } from "native-base";
export const SnippetList = (props: any) => {
	return (
		<View>
			{props.values.length > 0 ? (
				props.values.map((val: any) => (
					<View key={val.id} style={{ margin: "10", marginBottom: "50" }}>
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
							count={val.comments}
						/>
					</View>
				))
			) : (
				<View>No snippets found</View>
			)}
		</View>
	);
};
