import React from "react";
import { Snippet } from "../sharedComponents/Snippet";

export class ListSnippetsComponent extends React.PureComponent<
	{
		snippet: any;
	},
	{ snippets: any[] }
> {
	constructor(props: { snippet: any }) {
		super(props);

		this.state = {
			snippet: ""
		};
	}

	componentDidMount() {
		if (this.props.snippet) {
			this.setState({ snippet: this.props.snippet });
		}
	}

	componentWillReceiveProps(newProps: any) {
		if (newProps.snippet) {
			this.setState({ snippets: newProps.snippet });
		}
	}

	render() {
		return (
			<div>
				<Snippet
					title='placeholder'
					avatar='placeholder'
					language='placeholder'
					value='placeholder'
					theme='placeholder'
					count={12}
					tags={[]}
					snapId='placeholder'
					username='placeholder'
				/>
			</div>
		);
	}
}
