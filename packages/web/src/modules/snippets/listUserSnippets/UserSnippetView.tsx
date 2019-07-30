import React from "react";
import { RouteComponentProps } from "react-router";
import { UserSnippetsConnector } from "./UserSnippetsConnector";

export class UserSnippetView extends React.PureComponent<
	RouteComponentProps<{ username: string }>
> {
	render() {
		return (
			<UserSnippetsConnector username={this.props.match.params.username} />
		);
	}
}
