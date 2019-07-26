import React from "react";
import { DisplaySnippetConnector } from "./displaySnippetConnector";
import { RouteComponentProps } from "react-router";

export class SnippetView extends React.PureComponent<
	RouteComponentProps<{ snippetId: string }>
> {
	render() {
		return (
			<DisplaySnippetConnector snippetId={this.props.match.params.snippetId} />
		);
	}
}
