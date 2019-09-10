import React from "react";
import { Text, Container, List, ListItem, Content } from "native-base";

const routes = ["Home", "About"];

export const SideBar = ({ navigation }) => {
	return (
		<Container>
			<Content>
				<List
					dataArray={routes}
					contentContainerStyle={{ marginTop: 120 }}
					renderRow={data => {
						return (
							<ListItem button onPress={() => navigation.navigate(data)}>
								<Text>{data}</Text>
							</ListItem>
						);
					}}
				/>
			</Content>
		</Container>
	);
};
