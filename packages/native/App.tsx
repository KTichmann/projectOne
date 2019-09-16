import { Ionicons } from "@expo/vector-icons";
import * as Font from "expo-font";
import React from "react";
import { StyleSheet, View, Text } from "react-native";
import HomeScreenRouter from "./src/navigationRouter";
import {
	Header,
	Left,
	Icon,
	Title,
	Body,
	Right,
	Button,
	Root
} from "native-base";

export default class App extends React.PureComponent<
	{ navigation: any },
	{ isReady: boolean }
> {
	constructor(props) {
		super(props);
		this.state = {
			isReady: false
		};
	}
	componentDidMount() {
		console.log("we MOUNTING!");
		Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			...Ionicons.font
		}).then(res => {
			this.setState({ isReady: true });
		});
	}
	render() {
		return this.state.isReady ? (
			<Root>
				<HomeScreenRouter />
			</Root>
		) : (
			<View>
				<Text>Testing</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});
