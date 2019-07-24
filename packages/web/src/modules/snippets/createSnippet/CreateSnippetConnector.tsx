import * as React from "react";
import { CreateSnippetController } from "@abb/controller";
import { CreateSnippetComponent } from "./components/CreateSnippetComponent";
import { RouteComponentProps } from "react-router";

export class CreateSnippetConnector extends React.PureComponent<{
	afterSubmit: (id: string) => void;
}> {
	render() {
		return (
			<CreateSnippetController>
				{({ submit }) => (
					<CreateSnippetComponent
						submit={submit}
						afterSubmit={this.props.afterSubmit}
					/>
				)}
			</CreateSnippetController>
		);
	}
}
