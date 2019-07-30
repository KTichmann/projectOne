import * as React from "react";
import { ListSnippetsComponent } from "../../shared/listSnippetsComponent";
import { SearchSnippetsController } from "@abb/controller";

export class SearchSnippetsConnector extends React.PureComponent<{
	query: string;
}> {
	render() {
		return (
			<SearchSnippetsController query={this.props.query}>
				{snippets => {
					return <ListSnippetsComponent snippets={snippets.searchSnippets} />;
				}}
			</SearchSnippetsController>
		);
	}
}
