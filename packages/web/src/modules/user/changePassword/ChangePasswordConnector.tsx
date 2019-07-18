import * as React from "react";
import { ChangePasswordView } from "./views/ChangePasswordView";
import { ChangePasswordController } from "@abb/controller";
import { RouteComponentProps } from "react-router-dom";

export class ChangePasswordConnector extends React.PureComponent<
	RouteComponentProps<{ key: string }>
> {
	render() {
		const {
			match: {
				params: { key }
			}
		} = this.props;
		return (
			<ChangePasswordController>
				{({ submit }) => (
					<ChangePasswordView
						submit={({ password }) => submit({ key, password })}
					/>
				)}
			</ChangePasswordController>
		);
	}
}
