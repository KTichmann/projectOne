import React from "react";
import { RouteComponentProps } from "react-router";
import { Title, Container, Image, TextBlock, Text } from "./TextViewStyles";
import mailbox from "./mailbox.png";
import balloon from "./balloon.png";
import keys from "./keys.png";
import { Link } from "react-router-dom";
export class TextView extends React.PureComponent<RouteComponentProps<{}>> {
	render() {
		const state = this.props.location.state;
		let img;
		if (state) {
			switch (state.img) {
				case "mailbox":
					img = mailbox;
					break;
				case "keys":
					img = keys;
					break;
				default:
					img = balloon;
			}
		} else {
			img = balloon;
		}

		return (
			<Container>
				<Image src={img} />
				<TextBlock>
					<Title>
						{state && state.messageTitle
							? state.messageTitle
							: "You're not in Kansas anymore"}
					</Title>
					<Text>
						{state && state.messageText ? (
							state.messageText
						) : (
							<Link to='/'>Click Heels to go home...</Link>
						)}
					</Text>
				</TextBlock>
			</Container>
		);
	}
}
