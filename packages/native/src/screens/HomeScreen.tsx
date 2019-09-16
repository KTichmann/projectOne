import {
	Body,
	Button,
	Card,
	CardItem,
	Container,
	Content,
	Text
} from "native-base";
import React from "react";
import { AbbHeader } from "../components/AbbHeader";
import { HomeConnector } from "../components/home/HomeConnector";

export class HomeScreen extends React.PureComponent<{ navigation: any }> {
	render() {
		return (
			<Container>
				<AbbHeader navigation={this.props.navigation} title='Home' />
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
					<HomeConnector />
				</Content>
			</Container>
		);
	}
}
