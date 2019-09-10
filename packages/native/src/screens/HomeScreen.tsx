import React from "react";
import {
	Button,
	Text,
	Container,
	Card,
	CardItem,
	Body,
	Content,
	Header,
	Title,
	Left,
	Icon,
	Right
} from "native-base";

export class HomeScreen extends React.PureComponent<{ navigation: any }> {
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
				<Content padder>
					<Card>
						<CardItem>
							<Body>
								<Text>Chat App to talk some awesome people!</Text>
							</Body>
						</CardItem>
					</Card>
					<Button
						full
						rounded
						dark
						style={{ marginTop: 10 }}
						onPress={() => this.props.navigation.navigate("About")}>
						<Text>Chat With People</Text>
					</Button>
					<Button
						full
						rounded
						primary
						style={{ marginTop: 10 }}
						onPress={() => this.props.navigation.navigate("About")}>
						<Text>Goto Profiles</Text>
					</Button>
				</Content>
			</Container>
		);
	}
}
