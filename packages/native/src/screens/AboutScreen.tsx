import React from "react";
import {
	Container,
	Header,
	Content,
	Accordion,
	Button,
	Left,
	Icon,
	Title,
	Body,
	Right
} from "native-base";
const dataArray = [
	{ title: "First Element", content: "Lorem ipsum dolor sit amet" },
	{ title: "Second Element", content: "Lorem ipsum dolor sit amet" },
	{ title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];

export class AboutScreen extends React.PureComponent<{ navigation: any }> {
	render() {
		return (
			<Container>
				<Header>
					<Left>
						<Button
							transparent
							onPress={() => {
								console.log("clicky");
								this.props.navigation.openDrawer();
							}}>
							<Icon name='menu' />
						</Button>
					</Left>
					<Body>
						<Title>Homescreen</Title>
					</Body>
					<Right />
				</Header>
				<Accordion dataArray={dataArray} expanded={0} />
			</Container>
		);
	}
}
