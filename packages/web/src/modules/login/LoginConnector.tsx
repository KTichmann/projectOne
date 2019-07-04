import * as React from "react";
import { LoginView } from "./views/LoginView";
import { LoginController } from "@abb/controller";

export class LoginConnector extends React.PureComponent {
	render() {
		return (
			<LoginController>
				{({ submit }) => <LoginView submit={submit} />}
			</LoginController>
		);
	}
}
