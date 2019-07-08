import * as React from "react";
import { graphql, ChildMutateProps } from "react-apollo";
import gql from "graphql-tag";
import { MutationForgotPasswordChangeArgs } from "src/generated/graphql";
import { ChangePasswordMutation } from "src/generated/mutationTypes";
import { normalizeErrors } from "../../utils/normalizeErrors";

interface Props {
	children: (data: {
		submit: (
			values: MutationForgotPasswordChangeArgs
		) => Promise<{
			[key: string]: string;
		} | null>;
	}) => JSX.Element | null;
}

class C extends React.PureComponent<
	ChildMutateProps<
		Props,
		ChangePasswordMutation,
		MutationForgotPasswordChangeArgs
	>
> {
	submit = async (values: MutationForgotPasswordChangeArgs) => {
		const response = await this.props.mutate({
			variables: values
		});
		if (response && response.data && response.data.forgotPasswordChange) {
			return normalizeErrors(response.data.forgotPasswordChange);
		}

		return null;
	};

	render() {
		return this.props.children({ submit: this.submit });
	}
}

const forgotPasswordMutation = gql`
	mutation changePasswordMutation($password: String!, $key: String!) {
		forgotPasswordChange(newPassword: $password, key: $key) {
			path
			message
		}
	}
`;

export const ChangePasswordController = graphql<
	Props,
	ChangePasswordMutation,
	MutationForgotPasswordChangeArgs
>(forgotPasswordMutation)(C);
