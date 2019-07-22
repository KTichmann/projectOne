import * as React from "react";
import { RegisterController } from "@abb/controller";
import { RegisterView } from "./views/RegisterView";
import { RouteComponentProps } from "react-router-dom";

export class RegisterConnector extends React.PureComponent<
	RouteComponentProps<{}>
> {
	afterSubmit = () => {
		this.props.history.push("/m/confirm-register", {
			messageTitle: "Registration Successful!",
			messageText:
				"Thank you for registering, please check your email for a message from us.",
			img: "mailbox"
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
