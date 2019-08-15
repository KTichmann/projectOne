import * as React from "react";
import { AddCommentController } from "@abb/controller";
import { Editor } from "./EditorComponent";

export class EditorConnector extends React.PureComponent<{
  snippetId: string;
  updateCommentList: any;
}> {
  render() {
    return (
      <AddCommentController>
        {({ submit }) => (
          <Editor
            submit={submit}
            snippetId={this.props.snippetId}
            updateCommentList={this.props.updateCommentList}
          />
        )}
      </AddCommentController>
    );
  }
}
