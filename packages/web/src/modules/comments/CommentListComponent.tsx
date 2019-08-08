import React from "react";
import { Comment, Avatar, Form, Button, List, Input } from "antd";
import { CommentListConnector } from "./CommentListConnector";

const { TextArea } = Input;

const Editor = ({
	onChange,
	onSubmit,
	submitting,
	value
}: {
	[key: string]: any;
}) => (
	<div>
		<Form.Item>
			<TextArea rows={4} onChange={onChange} value={value} />
		</Form.Item>
		<Form.Item>
			<Button
				htmlType='submit'
				loading={submitting}
				onClick={onSubmit}
				type='primary'>
				Add Comment
			</Button>
		</Form.Item>
	</div>
);

export class CommentListComponent extends React.Component<
	{},
	{ comments: any[]; submitting: boolean; value: string }
> {
	state = {
		comments: [],
		submitting: false,
		value: ""
	};

	handleSubmit = () => {
		if (!this.state.value) {
			return;
		}

		this.setState({
			submitting: true
		});

		setTimeout(() => {
			this.setState({
				submitting: false,
				value: "",
				comments: [
					{
						author: "Han Solo",
						avatar:
							"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png",
						content: <p>{this.state.value}</p>
						// datetime: moment().fromNow()
					},
					...this.state.comments
				]
			});
		}, 1000);
	};

	handleChange = (e: any) => {
		this.setState({
			value: e.target.value
		});
	};

	render() {
		const { comments, submitting, value } = this.state;

		return (
			<div>
				<CommentListConnector snippetId='8f736f2c-2110-43ab-a441-8539094b3df2' />
				<Comment
					avatar={
						<Avatar
							src='https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
							alt='Han Solo'
						/>
					}
					content={
						<Editor
							onChange={this.handleChange}
							onSubmit={this.handleSubmit}
							submitting={submitting}
							value={value}
						/>
					}
				/>
			</div>
		);
	}
}
