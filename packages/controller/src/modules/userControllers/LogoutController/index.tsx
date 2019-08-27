import * as React from "react";
import { graphql, ChildMutateProps } from "react-apollo";
import gql from "graphql-tag";

interface Props {
	children: (data: { logout: () => Promise<boolean> }) => null;
}

class C extends React.PureComponent<ChildMutateProps<Props, any, any>> {
	logout = async () => {
		const response = await this.props.mutate();
		let res;
		if (
			typeof response !== "undefined" &&
			typeof response.data !== "undefined" &&
			response.data.logout
		) {
			res = response.data.logout;
		}
		return res || false;
	};

	render() {
		return this.props.children({ logout: this.logout });
	}
}

const logoutMutation = gql`
	mutation {
		logout
	}
`;

export const LogoutController = graphql<Props, any, any>(logoutMutation)(C);
