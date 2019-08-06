import React from "react";
import { Card, Avatar, Icon, Tag, Row, Col } from "antd";
import Meta from "antd/lib/card/Meta";
import "./SnippetStyles.css";
import { Link } from "react-router-dom";
import { CodeMirror } from "../../shared/CodeMirror";

export const Snippet = (props: {
  title: string;
  avatar: string;
  language: string;
  tags: string[];
  value: string;
  theme: string;
  count: number;
  snapId?: string;
  username?: string;
  hideCommentCount?: boolean;
}) => {
  const {
    title,
    avatar,
    language,
    tags,
    value,
    theme,
    count,
    snapId,
    username,
    hideCommentCount
  } = props;
  return (
    <Card
      style={{
        width: "100%",
        padding: "0px",
        boxShadow: "2px 2px 10px 1px rgba(0,0,0,.3)"
      }}
    >
      <Row type="flex" justify="space-between">
        <Col>
          <Meta
            style={{ marginBottom: "10px" }}
            avatar={
              <Link to={`/user/${username}`}>
                <Avatar src={avatar} />
              </Link>
            }
            title={<Link to={`/snippet/${snapId}`}>{title}</Link>}
            description={
              <Link to={`/user/${username}`}>{username || ""} </Link>
            }
          />
        </Col>
      </Row>

      <CodeMirror
        value={value}
        language={language}
        theme={theme}
        readOnly={true}
      />
      <Meta
        style={{ float: "left", margin: "10px" }}
        description={tags.map(tag => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      />
      <Link to={`/snippet/${snapId}`}>
        <Meta
          style={{ margin: "10px", float: "right" }}
          avatar={hideCommentCount ? false : <Icon type="message" />}
          description={
            hideCommentCount
              ? false
              : `${count} comment${count === 1 ? "" : "s"}`
          }
        />
      </Link>
    </Card>
  );
};
