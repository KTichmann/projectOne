import * as React from "react";
import { CommentList } from "./CommentList";
import { CommentListController } from "@abb/controller";
export class CommentListConnector extends React.PureComponent<{
  snippetId: string;
  newComments: any[];
}> {
  render() {
    return (
      <CommentListController snippetId={this.props.snippetId}>
        {({ comments }) => (
          <CommentList
            comments={comments}
            newComments={this.props.newComments}
            snippetId={this.props.snippetId}
          />
        )}
      </CommentListController>
    );
  }
}
