import { graphql } from "react-apollo";
import {
	FollowingSnippetsQuery,
	PublicSnippetsQuery,
	MySnippetsQuery,
	UserSnippetsQuery,
	SearchSnippetsQuery
} from "src/generated/mutationTypes";
import { Props, ListControllerTemplate } from "./ListControllerTemplate";
import {
	getPublicSnippets,
	getFollowingSnippets,
	getUserSnippets,
	getMySnippets,
	searchSnippets
} from "./queries";

export const FollowingSnippetsController = graphql<
	Props,
	FollowingSnippetsQuery
>(getFollowingSnippets)(ListControllerTemplate);

export const PublicSnippetsController = graphql<Props, PublicSnippetsQuery>(
	getPublicSnippets
)(ListControllerTemplate);

export const UserSnippetsController = graphql<Props, UserSnippetsQuery>(
	getUserSnippets,
	{
		options: props => ({ variables: { username: props.username } })
	}
)(ListControllerTemplate);

export const MySnippetsController = graphql<Props, MySnippetsQuery>(
	getMySnippets
)(ListControllerTemplate);

export const SearchSnippetsController = graphql<Props, SearchSnippetsQuery>(
	searchSnippets,
	{
		options: props => ({ variables: { query: props.query } })
	}
)(ListControllerTemplate);
