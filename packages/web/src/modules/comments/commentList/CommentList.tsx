import React from "react";
import moment from "moment";
import { Comment, List } from "antd";

export const CommentList = ({
  comments,
  newComments,
  snippetId
}: {
  comments: any[];
  newComments: any[];
  snippetId: string;
}) => {
  return (
    <List
      dataSource={[...comments, ...newComments]}
      header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
      itemLayout="horizontal"
      renderItem={props => {
        const date = moment(
          new Date(Number(props.createdAt)).toString()
        ).fromNow();
        console.log(props);
        return (
          <Comment
            content={props.content}
            author={props.user}
            datetime={date}
          />
        );
      }}
    />
  );
};
