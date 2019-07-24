import * as React from "react";
import { LoginView } from "./views/LoginView";
import { LoginController } from "@abb/controller";
import { RouteComponentProps } from "react-router";

export class LoginConnector extends React.PureComponent<
	RouteComponentProps<{}>
> {
	afterSubmit = () => {
		this.props.history.push("/");
	};
	render() {
		return (
			<LoginController>
				{({ submit }) => (
					<LoginView submit={submit} afterSubmit={this.afterSubmit} />
				)}
			</LoginController>
		);
	}
}
