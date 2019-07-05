import React from "react";
import { RouteComponentProps } from "react-router";

export class TextView extends React.PureComponent<RouteComponentProps<{}>> {
	render() {
		return (
			<h1>
				{this.props.location && this.props.location.state.message
					? this.props.location.state.message
					: "Confirmed!"}
			</h1>
		);
	}
}
