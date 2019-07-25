import * as React from "react";
import { ListSnippetsComponent } from "../../shared/listSnippetsComponent";
import { PublicSnippetsController } from "@abb/controller";

export class PublicSnippetsConnector extends React.PureComponent {
	render() {
		return (
			<PublicSnippetsController>
				{snippets => (
					<ListSnippetsComponent snippets={snippets.getPublicSnippets} />
				)}
			</PublicSnippetsController>
		);
	}
}
