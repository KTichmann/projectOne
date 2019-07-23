import * as React from "react";
import { CreateSnippetController } from "@abb/controller";
import { CreateSnippetComponent } from "./components/CreateSnippetComponent";

export class CreateSnippetConnector extends React.PureComponent {
	render() {
		return (
			<CreateSnippetController>
				{({ submit }) => (
					<CreateSnippetComponent submit={submit} test='testing' />
				)}
			</CreateSnippetController>
		);
	}
}
