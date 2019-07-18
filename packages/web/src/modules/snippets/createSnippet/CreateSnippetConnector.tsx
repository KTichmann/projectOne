import * as React from "react";
import { LoginController } from "@abb/controller";
import { CreateSnippetComponent } from "./components/CreateSnippetComponent";

export class LoginConnector extends React.PureComponent {
	render() {
		return (
			<LoginController>
				{({ submit }) => <CreateSnippetComponent submit={submit} />}
			</LoginController>
		);
	}
}
