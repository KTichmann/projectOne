import * as React from "react";
import gql from "graphql-tag";
import { graphql, ChildMutateProps } from "react-apollo";
import { normalizeArrayErrors } from "../../../utils/normalizeErrors";

interface Props {
	children: (data: {
		follow: (
			values: any
		) => Promise<{
			[key: string]: string;
		} | null>;
	}) => JSX.Element | null;
}

class C extends React.PureComponent<ChildMutateProps<Props, any, any>> {
	follow = async (values: any) => {
		console.log("values: ", values);
		const response = await this.props.mutate({
			variables: values
		});
		if (
			typeof response !== "undefined" &&
			typeof response.data !== "undefined" &&
			response.data.followUser
		) {
			const follow = response.data.followUser;
			return normalizeArrayErrors(follow);
		}
		return null;
	};

	render() {
		return this.props.children({ follow: this.follow });
	}
}

const followUserMutation = gql`
	mutation FollowUserMutation($username: String!) {
		followUser(username: $username) {
			path
			message
		}
	}
`;

export const FollowUserController = graphql<Props, any, any>(
	followUserMutation
)(C);
