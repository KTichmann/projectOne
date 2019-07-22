import * as React from "react";
import { graphql, ChildMutateProps } from "react-apollo";
import gql from "graphql-tag";
import { normalizeArrayErrors } from "../../../utils/normalizeErrors";
import { MutationLoginArgs } from "src/generated/graphql";
import { LoginMutation } from "src/generated/mutationTypes";

interface Props {
	children: (data: {
		submit: (
			values: MutationLoginArgs
		) => Promise<{
			[key: string]: string;
		} | null>;
	}) => JSX.Element | null;
}

class C extends React.PureComponent<
	ChildMutateProps<Props, LoginMutation, MutationLoginArgs>
> {
	submit = async (values: MutationLoginArgs) => {
		const response = await this.props.mutate({
			variables: values
		});
		if (
			typeof response !== "undefined" &&
			typeof response.data !== "undefined" &&
			response.data.login
		) {
			const login = response.data.login;
			return normalizeArrayErrors(login);
		}
		return null;
	};

	render() {
		return this.props.children({ submit: this.submit });
	}
}

const loginMutation = gql`
	mutation LoginMutation($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			path
			message
		}
	}
`;

export const LoginController = graphql<Props, LoginMutation, MutationLoginArgs>(
	loginMutation
)(C);
