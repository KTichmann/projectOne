import React, { Props } from "react";
import { SnippetList } from "./SnippetList";
import { Pagination } from "antd";

export class ListSnippetsComponent extends React.PureComponent<
	{
		snippets: any[];
	},
	{ snippets: any[]; displaySnippets: any[] }
> {
	constructor(props: { snippets: any[]; displaySnippets: any[] }) {
		super(props);

		this.state = {
			snippets: [],
			displaySnippets: []
		};
	}

	componentDidMount() {
		if (this.props.snippets) {
			this.setState({ snippets: this.props.snippets });
			this.paginate(this.props.snippets, 10, 1);
		}
	}

	componentWillReceiveProps(newProps: any) {
		if (newProps.snippets) {
			this.setState({ snippets: newProps.snippets });
			this.paginate(newProps.snippets, 10, 1);
		}
	}

	paginate = (array: any[], pageSize: number, pageNumber: number) => {
		--pageNumber;
		this.setState({
			displaySnippets: array.slice(
				pageNumber * pageSize,
				(pageNumber + 1) * pageSize
			)
		});
	};

	render() {
		return (
			<div>
				<SnippetList values={this.state.displaySnippets} />
				<Pagination
					total={this.state.snippets.length}
					style={{
						display: "flex",
						justifyContent: "center",
						margin: "2rem"
					}}
					pageSize={10}
					defaultCurrent={1}
					onChange={(page, pageSize) => {
						this.paginate(
							this.state.snippets,
							pageSize as number,
							page as number
						);
						window.scrollTo(0, 0);
					}}
				/>
			</div>
		);
	}
}
