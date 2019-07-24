import * as React from "react";
import gql from "graphql-tag";
import { graphql, ChildDataProps } from "react-apollo";
import { FollowingSnippetsQuery } from "src/generated/mutationTypes";
import { Snippet } from "src/generated/graphql";
interface Props {
	children: (data: Snippet[]) => JSX.Element | null;
}

class C extends React.PureComponent<
	ChildDataProps<Props, FollowingSnippetsQuery>,
	{ snippets: Snippet[] }
> {
	constructor(props: ChildDataProps<Props, FollowingSnippetsQuery>) {
		super(props);

		this.state = {
			snippets: []
		};
	}
	componentWillReceiveProps = (newProps: any) => {
		const snippets = newProps.data.getFollowingSnippets;
		if (typeof snippets !== "undefined" && snippets) {
			this.setState({ snippets });
		}
	};

	render() {
		return this.props.children(this.state.snippets);
	}
}

const getFollowingSnippets = gql`
	query Query {
		getFollowingSnippets {
			id
			content
			title
			language
			tags
			user
			theme
			createdAt
		}
	}
`;

export const FollowingSnippetsController = graphql<
	Props,
	FollowingSnippetsQuery
>(getFollowingSnippets)(C);
