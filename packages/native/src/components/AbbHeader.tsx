import React from "react";
import { Header, Left, Button, Icon, Title, Body, Right } from "native-base";

export class AbbHeader extends React.PureComponent<{
	navigation: any;
	title: string;
}> {
	render() {
		return (
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
					<Title>{this.props.title}</Title>
				</Body>
				<Right />
			</Header>
		);
	}
}
