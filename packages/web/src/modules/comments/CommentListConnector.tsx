import * as React from "react";
import { CommentController } from "@abb/controller";

export class DisplaySnippetConnector extends React.PureComponent<{
	snippetId: string;
}> {
	render() {
		return (
			<CommentController snippetId={this.props.snippetId}>
				{(comments: any[], submitComment: ) => {
					return <DisplaySnippetComponent snippet={snippet.getSnippetById} />;
				}}
			</CommentController>
		);
	}
}