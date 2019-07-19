import * as React from "react";
import { graphql, ChildMutateProps } from "react-apollo";
import gql from "graphql-tag";
import { MutationForgotPasswordChangeArgs } from "src/generated/graphql";
import { ForgotPasswordEmailMutation } from "src/generated/mutationTypes";

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
		ForgotPasswordEmailMutation,
		MutationForgotPasswordChangeArgs
	>
> {
	submit = async (values: MutationForgotPasswordChangeArgs) => {
		const response = await this.props.mutate({
			variables: values
		});
		if (
			typeof response !== "undefined" &&
			response.data &&
			!response.data.sendForgotPasswordEmail
		) {
			return {
				email:
					"Failed to send email confirmation, please verify that you entered the email correctly and try again."
			};
		}
		return null;
	};

	render() {
		return this.props.children({ submit: this.submit });
	}
}

const forgotPasswordMutation = gql`
	mutation forgotPasswordMutation($email: String!) {
		sendForgotPasswordEmail(email: $email)
	}
`;

export const ForgotPasswordController = graphql<
	Props,
	ForgotPasswordEmailMutation,
	MutationForgotPasswordChangeArgs
>(forgotPasswordMutation)(C);
