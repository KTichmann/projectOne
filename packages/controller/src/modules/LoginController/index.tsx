import * as React from "react";
import { graphql, ChildMutateProps } from "react-apollo";
import gql from "graphql-tag";
// tslint:disable-next-line: no-implicit-dependencies
import { normalizeErrors } from "src/utils/normalizeErrors";

interface Props {
	children: (data: {
		submit: (values: any) => Promise<any>;
	}) => JSX.Element | null;
}

class C extends React.PureComponent<ChildMutateProps<Props, any, any>> {
	submit = async (values: any) => {
		const response = await this.props.mutate({
			variables: values
		});
		if (response) {
			const login = response.data.login;

			return normalizeErrors(login);
		}
		console.log("response: ", response);
		return null;
	};

	render() {
		return this.props.children({ submit: this.submit });
	}
}

const loginMutation = gql(`
    mutation LoginMutation($email: String!, $password: String!){
        login(email: $email, password: $password){
            path,
            message
        }
    }
`);

export const LoginController = graphql(loginMutation)(C);
