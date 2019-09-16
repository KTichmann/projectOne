import React from "react";
import {
	Text,
	Container,
	List,
	ListItem,
	Content,
	Left,
	Icon,
	Right,
	Badge
} from "native-base";
import { Image } from "react-native";
import styles from "./style";
const routes = [
	{ name: "Home", icon: "home" },
	{ name: "About", icon: "information-circle" }
];

export const SideBar = ({ navigation }) => {
	return (
		<Container>
			<Content style={{ flex: 1, backgroundColor: "#fff", top: -1 }}>
				<Image
					source={require("../../../assets/codepad.jpg")}
					// @ts-ignore
					style={styles.drawerCover}
				/>
				<List
					dataArray={routes}
					renderRow={data => {
						return (
							<ListItem
								button
								noBorder
								onPress={() => navigation.navigate(data.name)}>
								<Left>
									<Icon
										active
										name={data.icon}
										style={{ color: "#777", fontSize: 26, width: 30 }}
									/>
									{/* 
									// @ts-ignore */}
									<Text style={styles.text}>{data.name}</Text>
								</Left>
							</ListItem>
						);
					}}
				/>
			</Content>
		</Container>
	);
};
