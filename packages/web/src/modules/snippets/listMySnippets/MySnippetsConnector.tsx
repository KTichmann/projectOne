import * as React from "react";
import { ListSnippetsComponent } from "../../shared/listSnippetsComponent";
import { MySnippetsController } from "@abb/controller";

export class MySnippetsConnector extends React.PureComponent {
	render() {
		return (
			<MySnippetsController>
				{snippets => {
					return <ListSnippetsComponent snippets={snippets.getMySnippets} />;
				}}
			</MySnippetsController>
		);
	}
}
