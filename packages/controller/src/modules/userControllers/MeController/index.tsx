import * as React from "react";
import gql from "graphql-tag";
import { graphql, ChildDataProps } from "react-apollo";

interface Props {
	children: (data: { username: string; id: string }) => JSX.Element | null;
}

class C extends React.PureComponent<
	ChildDataProps<Props>,
	{ user: { username: string; id: string } }
> {
	constructor(props: ChildDataProps<Props>) {
		super(props);

		this.state = {
			user: {
				username: "",
				id: ""
			}
		};
	}
	componentWillReceiveProps = (newProps: any) => {
		const user = newProps.data.me;
		if (typeof user !== "undefined" && user) {
			this.setState({ user });
		}
	};

	render() {
		return this.props.children(this.state.user);
	}
}

const getMe = gql`
	query Query {
		me {
			id
			username
		}
	}
`;

export const MeController = graphql<Props>(getMe)(C);
