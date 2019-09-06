import React from "react";
import { Container, Header, Content, Accordion } from "native-base";
const dataArray = [
	{ title: "First Element", content: "Lorem ipsum dolor sit amet" },
	{ title: "Second Element", content: "Lorem ipsum dolor sit amet" },
	{ title: "Third Element", content: "Lorem ipsum dolor sit amet" }
];
export const AboutScreen = () => {
	return (
		<Container>
			<Accordion dataArray={dataArray} expanded={0} />
		</Container>
	);
};
