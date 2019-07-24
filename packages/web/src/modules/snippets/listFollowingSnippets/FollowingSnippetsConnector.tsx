import * as React from "react";
import { FollowingSnippetsController } from "@abb/controller";
import { ListSnippetsComponent } from "../../shared/listSnippetsComponent";

export class FollowingSnippetsConnector extends React.PureComponent {
	render() {
		return (
			<FollowingSnippetsController>
				{snippets => <ListSnippetsComponent snippets={snippets} />}
			</FollowingSnippetsController>
		);
	}
}
