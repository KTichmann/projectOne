import React from "react";
import moment from "moment";
import { Comment, List } from "antd";

export const CommentList = ({ comments }: { comments: any[] }) => {
	return (
		<List
			dataSource={comments}
			header={`${comments.length} ${comments.length > 1 ? "replies" : "reply"}`}
			itemLayout='horizontal'
			renderItem={props => (
				<Comment {...props} datetime={moment(props.createdAt).format()} />
			)}
		/>
	);
};
