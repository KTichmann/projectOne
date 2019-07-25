import * as React from "react";
import gql from "graphql-tag";
import { ChildDataProps, graphql } from "react-apollo";
import { Snippet, QueryGetSnippetByIdArgs } from "src/generated/graphql";
import { GetSnippetByIdQuery } from "src/generated/mutationTypes";
export interface Props {
	children: (data: { [key: string]: Snippet[] }) => JSX.Element | null;
}

export class C extends React.PureComponent<
	ChildDataProps<Props, GetSnippetByIdQuery, QueryGetSnippetByIdArgs>,
	{ snippet: any }
> {
	constructor(
		props: ChildDataProps<Props, GetSnippetByIdQuery, QueryGetSnippetByIdArgs>
	) {
		super(props);
		this.state = {
			snippet: {
				noData: []
			}
		};
	}
	componentDidMount() {
		const snippet = this.props.data;
		if (typeof snippet !== "undefined" && snippet) {
			this.setState({ snippet });
		}
	}
	componentWillReceiveProps = (newProps: any) => {
		const snippet = newProps.data;
		if (typeof snippet !== "undefined" && snippet) {
			this.setState({ snippet });
		}
	};

	render() {
		return this.props.children(this.state.snippet);
	}
}

export const getSnippet = gql`
	query GetSnippetQuery (
        $snippetId: String!
	){
        {
  getSnippetById(snippetId: $snippetId){
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
	}
`;

export const DisplaySnippetController = graphql<
	Props,
	GetSnippetByIdQuery,
	QueryGetSnippetByIdArgs
>(getSnippet)(C);
