import * as React from "react";
import { graphql } from "react-apollo";
import gql from "graphql-tag";

interface Props {
	children: (data: {
		submit: (values: any) => Promise<null>;
	}) => JSX.Element | null;
}

export class RegisterController extends React.PureComponent<Props> {
	submit = async (values: any) => {
		console.log(values);
		return null;
	};

	render() {
		return this.props.children({ submit: this.submit });
	}
}

const RegisterMutation = gql(`
    mutation($email: String!, $password: String!){
        login(email: "", password: ""){
            path,
            message
        }
    }
`);
