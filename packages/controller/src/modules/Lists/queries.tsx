import gql from "graphql-tag";

export const getFollowingSnippets = gql`
	query Query {
		getFollowingSnippets {
			id
			content
			title
			language
			tags
			user
			theme
			createdAt
		}
	}
`;

export const getPublicSnippets = gql`
	query Query {
		getPublicSnippets {
			id
			content
			title
			language
			tags
			user
			theme
			createdAt
		}
	}
`;
