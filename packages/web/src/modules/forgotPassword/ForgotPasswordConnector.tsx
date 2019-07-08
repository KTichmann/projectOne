import * as React from "react";
import { ForgotPasswordView } from "./views/ForgotPasswordView";
import { ForgotPasswordController } from "@abb/controller";
import { RouteComponentProps } from "react-router-dom";

export class ForgotPasswordConnector extends React.PureComponent<
	RouteComponentProps<{}>
> {
	afterSubmit = () => {
		this.props.history.push("/m/forgot-password", {
			messageTitle: "Password Reset Email Successfully Sent",
			messageText: "Please check your inbox for the password reset link.",
			img: "keys"
		});
	};
	render() {
		return (
			<ForgotPasswordController>
				{({ submit }) => (
					<ForgotPasswordView submit={submit} afterSubmit={this.afterSubmit} />
				)}
			</ForgotPasswordController>
		);
	}
}
