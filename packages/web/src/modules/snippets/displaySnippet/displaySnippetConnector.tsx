import * as React from "react";
import { DisplaySnippetController } from "@abb/controller";
import { DisplaySnippetComponent } from "./displaySnippetComponent";

export class DisplaySnippetConnector extends React.PureComponent<{
	snippetId: string;
}> {
	render() {
		return (
			<DisplaySnippetController snippetId={this.props.snippetId}>
				{(snippet: any) => {
					return <DisplaySnippetComponent snippet={snippet.getSnippetById} />;
				}}
			</DisplaySnippetController>
		);
	}
}
