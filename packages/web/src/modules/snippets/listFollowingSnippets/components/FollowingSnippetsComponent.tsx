import React, { Props } from "react";
import { SnippetList } from "../../../shared/SnippetList";
import { SUPPORTED_LANGS } from "@abb/common";

export class FollowingSnippetsComponent extends React.PureComponent<
	{
		getSnippets: () => Promise<any>;
	},
	{ snippets: any[] }
> {
	constructor(props: { getSnippets: () => Promise<any> }) {
		super(props);

		this.state = {
			snippets: []
		};
	}

	componentDidMount = async () => {
		const snippets = await this.props.getSnippets();
		this.setState({ snippets });
	};

	render() {
		return (
			<div>
				<SnippetList values={this.state.snippets} />
			</div>
		);
	}
}
