import * as React from "react";
import { RouteComponentProps } from "react-router";
import { LogoutController } from "@abb/controller";

export class LogoutConnector extends React.PureComponent<
	RouteComponentProps<{}>
> {
	afterSubmit = () => {
		this.props.history.push("/");
		window.location.reload();
	};
	render() {
		return (
			<LogoutController>
				{({ logout }) => {
					logout().then((res: any) => {
						this.afterSubmit();
					});
					return null;
				}}
			</LogoutController>
		);
	}
}
