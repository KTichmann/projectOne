import React from "react";
import { Snippet } from "../sharedComponents/Snippet";
import Spinner from "react-spinkit";
import { CommentListComponent } from "../../comments/commentList/CommentListComponent";

export class DisplaySnippetComponent extends React.PureComponent<
	{
		snippet: any;
		follow: any;
	},
	{ snippet: any }
> {
	constructor(props: { snippet: any; follow: any }) {
		super(props);

		this.state = {
			snippet: false
		};
	}

	componentDidMount() {
		if (this.props.snippet) {
			this.setState({ snippet: this.props.snippet });
		}
	}

	componentWillReceiveProps(newProps: any) {
		if (newProps.snippet) {
			this.setState({ snippet: newProps.snippet });
		}
	}

	render() {
		const {
			title,
			avatar,
			language,
			theme,
			content,
			tags,
			id,
			user,
			comments
		} = this.state.snippet;
		return this.state.snippet ? (
			<div>
				<Snippet
					key={id}
					title={title}
					avatar={avatar}
					value={content}
					language={language}
					theme={theme}
					count={comments}
					tags={tags}
					snapId={id}
					username={user}
					hideCommentCount={false}
					follow={this.props.follow}
				/>
				<CommentListComponent snippetId={id} />
			</div>
		) : (
			<Spinner
				name='folding-cube'
				color='#1890ff'
				style={{ left: "50%", marginTop: 100 }}
			/>
		);
	}
}
