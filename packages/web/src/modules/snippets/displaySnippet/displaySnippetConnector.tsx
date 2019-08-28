import * as React from "react";
import { DisplaySnippetController } from "@abb/controller";
import { DisplaySnippetComponent } from "./displaySnippetComponent";
import { FollowConnector } from "../../shared/FollowConnector";

export class DisplaySnippetConnector extends React.PureComponent<{
	snippetId: string;
}> {
	render() {
		return (
			<DisplaySnippetController snippetId={this.props.snippetId}>
				{(snippet: any) => {
					return (
						<FollowConnector>
							<DisplaySnippetComponent
								snippet={snippet.getSnippetById}
								follow={() => {
									console.log("whoops");
								}}
							/>
						</FollowConnector>
					);
				}}
			</DisplaySnippetController>
		);
	}
}
