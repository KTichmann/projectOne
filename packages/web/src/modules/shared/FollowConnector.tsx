import * as React from "react";
import { FollowUserController } from "@abb/controller";

export class FollowConnector extends React.PureComponent<{
	children: React.ReactElement;
}> {
	render() {
		return (
			<FollowUserController>
				{({ follow }) => React.cloneElement(this.props.children, { follow })}
			</FollowUserController>
		);
	}
}
