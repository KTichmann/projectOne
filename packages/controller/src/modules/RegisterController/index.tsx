import * as React from "react";
import { graphql, ChildMutateProps } from "react-apollo";
import gql from "graphql-tag";
import { MutationRegisterArgs } from "src/generated/graphql";
import { RegisterMutation } from "src/generated/mutationTypes";
import { normalizeErrors } from "../../utils/normalizeErrors";

interface Props {
	children: (data: {
		submit: (
			values: MutationRegisterArgs
		) => Promise<{
			[key: string]: string;
		} | null>;
	}) => JSX.Element | null;
}

class C extends React.PureComponent<
	ChildMutateProps<Props, RegisterMutation, MutationRegisterArgs>
> {
	submit = async (values: MutationRegisterArgs) => {
		const response = await this.props.mutate({
			variables: values
		});

		if (
			typeof response !== "undefined" &&
			typeof response.data !== "undefined" &&
			response.data.register
		) {
			const register = response.data.register;
			return normalizeErrors(register);
		}
		return null;
	};

	render() {
		return this.props.children({ submit: this.submit });
	}
}

const registerMutation = gql`
	mutation RegisterMutation($email: String!, $password: String!) {
		register(email: $email, password: $password) {
			path
			message
		}
	}
`;

export const RegisterController = graphql<
	Props,
	RegisterMutation,
	MutationRegisterArgs
>(registerMutation)(C);
