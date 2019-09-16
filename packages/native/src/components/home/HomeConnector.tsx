import * as React from "react";
import { SnippetList } from "../snippets/SnippetList";
import { PublicSnippetsController } from "@abb/controller";

export class HomeConnector extends React.PureComponent {
	render() {
		return (
			<PublicSnippetsController>
				{snippets => <SnippetList snippets={snippets.getPublicSnippets} />}
			</PublicSnippetsController>
		);
	}
}
