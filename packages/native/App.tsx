import { Container, Content, Header, Footer } from "native-base";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { Head } from "./src/Header";
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import { HomeScreenRouter } from "./src/Home";

export default function App() {
	const [isReady, setReady] = useState(false);
	const componentDidMount = async () => {
		await Font.loadAsync({
			Roboto: require("native-base/Fonts/Roboto.ttf"),
			Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
			...Ionicons.font
		});
		setReady(true);
	};
	useEffect(() => {
		componentDidMount();
	}, []);
	return <HomeScreenRouter />;
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	}
});
