import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
// import { add } from "@abb/common";

export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<Text>Test</Text>
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
