import * as React from "react";
import { normalizeErrors } from "src/utils/normalizeErrors";
import gql from "graphql-tag";
import { graphql } from "graphql";
import { CreateSnippetMutation } from "src/generated/mutationTypes";
import { MutationCreateSnippetArgs } from "src/generated/graphql";
import { ChildMutateProps } from "react-apollo";

interface Props {
	children: (data: {
		submit: (
			values: MutationCreateSnippetArgs
		) => Promise<{
			[key: string]: string;
		} | null>;
	}) => JSX.Element | null;
}

class C extends React.PureComponent<
	ChildMutateProps<Props, CreateSnippetMutation, MutationCreateSnippetArgs>
> {
	submit = async (values: any) => {
		const response = await this.props.mutate({
			variables: values
		});
		if (
			typeof response !== "undefined" &&
			typeof response.data !== "undefined" &&
			response.data.createSnippet
		) {
			const snippet = response.data.createSnippet;
			if (snippet.error) {
				return normalizeErrors(snippet);
			} else {
				return snippet;
			}
		}
		return null;
	};

	render() {
		return this.props.children({ submit: this.submit });
	}
}

const createSnippetMutation = gql`
	mutation CreateSnippetMutation(
		$content: String!
		$language: String!
		$visibility: String!
		$tags: [String!] = []
	) {
		createSnippet(
			content: $content
			language: $language
			visibility: $visibility
			tags: $tags
		) {
			... on Snippet {
				id
				content
				createdAt
				user
			}
			... on ContentError {
				error
				message
			}
		}
	}
`;

export const CreateSnippetController = graphql<
	Props,
	createSnippetMutation,
	MutationCreateSnippetArgs
>(loginMutation)(C);
