import React, { Props } from "react";
import { SnippetList } from "./SnippetList";

export class ListSnippetsComponent extends React.PureComponent<
	{
		snippets: any[];
	},
	{ snippets: any[] }
> {
	constructor(props: { snippets: any }) {
		super(props);

		this.state = {
			snippets: []
		};
	}

	componentDidMount() {
		if (this.props.snippets) {
			this.setState({ snippets: this.props.snippets });
		}
	}

	componentWillReceiveProps(newProps: any) {
		if (newProps.snippets) {
			this.setState({ snippets: newProps.snippets });
		}
	}

	render() {
		return (
			<div>
				<SnippetList values={this.state.snippets} />
			</div>
		);
	}
}
