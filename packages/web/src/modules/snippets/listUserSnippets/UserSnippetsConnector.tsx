import * as React from "react";
import { ListSnippetsComponent } from "../../shared/listSnippetsComponent";
import { UserSnippetsController } from "@abb/controller";

export class UserSnippetsConnector extends React.PureComponent<{
	username: string;
}> {
	render() {
		return (
			<UserSnippetsController username={this.props.username}>
				{snippets => {
					return <ListSnippetsComponent snippets={snippets.getUserSnippets} />;
				}}
			</UserSnippetsController>
		);
	}
}
