import * as React from "react";
import { CommentList } from "./CommentList";
import { CommentListController } from "@abb/controller";
export class CommentListConnector extends React.PureComponent<{
	snippetId: string;
}> {
	render() {
		return (
			<CommentListController snippetId={this.props.snippetId}>
				{({ comments }) => <CommentList comments={comments} />}
			</CommentListController>
		);
	}
}
