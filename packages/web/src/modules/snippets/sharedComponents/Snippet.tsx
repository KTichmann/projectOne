import React from "react";
import { Card, Avatar, Icon, Tag, Row, Col } from "antd";
import Meta from "antd/lib/card/Meta";
import Avatars from "@dicebear/avatars";
import sprites from "@dicebear/avatars-bottts-sprites";
import "./SnippetStyles.css";
import { Link } from "react-router-dom";
import { CodeBlock } from "../../shared/CodeBlock";

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
    // avatar,
    language,
    tags,
    value,
    theme,
    count,
    snapId,
    username,
    hideCommentCount
  } = props;
  let avatars = new Avatars(sprites({}));
  let avatar = avatars.create(username!);
  return (
    <Card
      style={{
        width: "100%",
        padding: "0px",
        boxShadow: "2px 2px 10px 1px rgba(0,0,0,.3)"
      }}
    >
      <Row style={{ display: "flex" }}>
        <Link to={`/user/${username}`}>
          <div
            style={{ width: "50px" }}
            dangerouslySetInnerHTML={{
              __html: avatar
            }}
          />
        </Link>
        <Meta
          style={{ marginLeft: "15px", marginBottom: "10px" }}
          title={<Link to={`/snippet/${snapId}`}>{title}</Link>}
          description={<Link to={`/user/${username}`}>{username || ""} </Link>}
        />
      </Row>
      <CodeBlock
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
