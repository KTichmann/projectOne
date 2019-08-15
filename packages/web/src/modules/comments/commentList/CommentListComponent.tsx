import React from "react";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import { CommentListConnector } from "./CommentListConnector";
import { EditorConnector } from "../commentEditor/EditorConnector";

export class CommentListComponent extends React.Component<
  { snippetId: string },
  { comments: any[]; submitting: boolean; value: string }
> {
  state = {
    comments: [],
    submitting: false,
    value: ""
  };

  updateCommentList = (response: any) => {
    this.setState({
      comments: [...this.state.comments, response]
    });
  };

  handleChange = (e: any) => {
    this.setState({
      value: e.target.value
    });
  };

  render() {
    const { comments } = this.state;

    return (
      <div>
        <CommentListConnector
          snippetId={this.props.snippetId}
          newComments={comments}
        />
        <Comment
          avatar={
            <Avatar
              src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
              alt="Han Solo"
            />
          }
          content={
            <EditorConnector
              snippetId={this.props.snippetId}
              updateCommentList={this.updateCommentList}
            />
          }
        />
      </div>
    );
  }
}
