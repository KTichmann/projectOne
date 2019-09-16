import { Accordion, Container } from "native-base";
import React from "react";
import { AbbHeader } from "../components/AbbHeader";
const dataArray = [
	{ title: "First Element", content: "Lorem ipsum dolor sit amet" },
	{ title: "Second Element", content: "Lorem ipsum dolor sit amet" },
	{ title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];

export class AboutScreen extends React.PureComponent<{ navigation: any }> {
	render() {
		return (
			<Container>
				<AbbHeader navigation={this.props.navigation} />
				<Accordion dataArray={dataArray} expanded={0} />
			</Container>
		);
	}
}
