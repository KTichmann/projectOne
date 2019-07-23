import * as React from "react";
import gql from "graphql-tag";
import { ChildMutateProps, graphql } from "react-apollo";
import { FollowingSnippetsQuery } from "src/generated/mutationTypes";
interface Props {
	children: (data: { getSnippets: () => Promise<any> }) => JSX.Element | null;
}

class C extends React.PureComponent<
	ChildMutateProps<Props, FollowingSnippetsQuery>
> {
	getSnippets = async () => {
		const response = await this.props.mutate();
		if (
			typeof response !== "undefined" &&
			response.data &&
			response.data.getFollowingSnippets
		) {
			const snippets = response.data.getFollowingSnippets;
			return snippets;
		}
		return [];
	};

	render() {
		return this.props.children({ getSnippets: this.getSnippets });
	}
}

const getFollowingSnippets = gql`
	query Query {
		getFollowingSnippets {
			id
			content
			language
			tags
			user
			createdAt
		}
	}
`;

export const FollowingSnippetsController = graphql<
	Props,
	FollowingSnippetsQuery
>(getFollowingSnippets)(C);
