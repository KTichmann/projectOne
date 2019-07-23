import * as React from "react";
import { FollowingSnippetsController } from "@abb/controller";
import { FollowingSnippetsComponent } from "./components/FollowingSnippetsComponent";

export class FollowingSnippetsConnector extends React.PureComponent {
	render() {
		return (
			<FollowingSnippetsController>
				{snippets => <FollowingSnippetsComponent snippets={snippets} />}
			</FollowingSnippetsController>
		);
	}
}
