import React from "react";
import { Container, Rule } from "./styles/homeViewStyles";
import { CreateSnippetConnector } from "../snippets/createSnippet/CreateSnippetConnector";
import { RouteComponentProps } from "react-router";
import { PublicSnippetsConnector } from "../snippets/listPublicSnippets/PublicSnippetsConnector";

export const Home = (props: RouteComponentProps<{}>) => {
	const afterSubmit = (id: string) => {
		props.history.push(`/snippet/${id}`);
	};
	return (
		<Container>
			<h1 style={{ marginBottom: "1rem", marginLeft: ".4rem" }}>
				Post a Snippet:{" "}
			</h1>
			<CreateSnippetConnector afterSubmit={afterSubmit} />
			<Rule>&nbsp;</Rule>
			<PublicSnippetsConnector />
		</Container>
	);
};
