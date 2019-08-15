import * as React from "react";
import gql from "graphql-tag";
import { ChildDataProps, graphql } from "react-apollo";

interface Props {
	children: (data: { [key: string]: any[] }) => JSX.Element | null;
	snippetId: string;
}

class C extends React.PureComponent<
	ChildDataProps<Props, any[], any>,
	{ comments: any[] }
> {
	constructor(props: ChildDataProps<Props, any, any>) {
		super(props);
		this.state = {
			comments: []
		};
	}
	// componentDidMount() {
	// 	const comments = this.props.data;
	// 	if (typeof comments !== "undefined" && comments.length > 0) {
	// 		this.setState({ comments });
	// 	}
	// }
	componentWillReceiveProps = (newProps: any) => {
		const comments = newProps.data.getSnippetComments;
		if (typeof comments !== "undefined" && comments.length > 0) {
			this.setState({ comments });
		}
	};

	render() {
		return this.props.children({ comments: this.state.comments });
	}
}

export const getComments = gql`
	query GetCommentsQuery($snippetId: String!) {
		getSnippetComments(snippetId: $snippetId) {
			id
			content
			user
			createdAt
		}
	}
`;

export const CommentListController = graphql<Props, any, any>(getComments, {
	options: props => ({ variables: { snippetId: props.snippetId } })
})(C);
