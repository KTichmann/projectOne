import * as React from "react";
import { ChildDataProps } from "react-apollo";
import { Snippet } from "src/generated/graphql";
export interface Props {
	children: (data: { [key: string]: Snippet[] }) => JSX.Element | null;
	username?: string;
	query?: string;
}

export class ListControllerTemplate extends React.PureComponent<
	ChildDataProps<Props, any>,
	{ snippets: any }
> {
	constructor(props: ChildDataProps<Props, any>) {
		super(props);

		this.state = {
			snippets: {
				noData: []
			}
		};
	}
	componentDidMount() {
		const snippets = this.props.data;
		if (typeof snippets !== "undefined" && snippets) {
			this.setState({ snippets });
		}
	}
	componentWillReceiveProps = (newProps: any) => {
		const snippets = newProps.data;
		if (typeof snippets !== "undefined" && snippets) {
			this.setState({ snippets });
		}
	};

	render() {
		return this.props.children(this.state.snippets);
	}
}
