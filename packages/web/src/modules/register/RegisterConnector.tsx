import * as React from "react";
import { RegisterController } from "@abb/controller";
import { RegisterView } from "./views/RegisterView";
import { RouteComponentProps } from "react-router-dom";

export class RegisterConnector extends React.PureComponent<
	RouteComponentProps<{}>
> {
	afterSubmit = () => {
		this.props.history.push("/m/confirm-register", {
			message:
				"Thank you for registering, please check your email for a message from us :D"
		});
	};
	render() {
		return (
			<RegisterController>
				{({ submit }) => (
					<RegisterView afterSubmit={this.afterSubmit} submit={submit} />
				)}
			</RegisterController>
		);
	}
}
