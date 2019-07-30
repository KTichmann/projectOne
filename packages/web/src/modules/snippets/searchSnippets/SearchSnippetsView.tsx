import React from "react";
import { RouteComponentProps } from "react-router";
import { SearchSnippetsConnector } from "./SearchSnippetsConnector";

export class SearchSnippetsView extends React.PureComponent<
	RouteComponentProps<{ query: string }>
> {
	render() {
		return <SearchSnippetsConnector query={this.props.match.params.query} />;
	}
}
