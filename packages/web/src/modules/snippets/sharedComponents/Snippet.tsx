import React from "react";
import { Card, Avatar, Icon, Tag } from "antd";
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
		username
	} = props;
	return (
		<Card style={{ width: "100%", padding: "0px" }}>
			<Meta
				style={{ marginBottom: "10px" }}
				avatar={<Avatar src={avatar} />}
				title={title}
				description={username || ""}
			/>
			<CodeMirror
				value={value}
				language={language}
				theme={theme}
				readOnly={true}
			/>
			<Meta
				style={{ float: "left", margin: "10px" }}
				description={tags.map(tag => (
					<Tag>{tag}</Tag>
				))}
			/>
			<Link to={`/snapshot/${snapId}`}>
				<Meta
					style={{ margin: "10px", float: "right" }}
					avatar={<Icon type='message' />}
					description={`${count} comments`}
				/>
			</Link>
		</Card>
	);
};
