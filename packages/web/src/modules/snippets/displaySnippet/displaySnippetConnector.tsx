import * as React from "react";
import { ListSnippetsComponent } from "../../shared/listSnippetsComponent";
import { DisplaySnippetController } from "@abb/controller";

export class DisplaySnippetConnector extends React.PureComponent<{
	snippetId: string;
}> {
	render() {
		return (
			<DisplaySnippetController snippetId={this.props.snippetId}>
				{(snippet: any) => (
					<ListSnippetsComponent snippets={snippet.getPublicSnippets} />
				)}
			</DisplaySnippetController>
		);
	}
}
