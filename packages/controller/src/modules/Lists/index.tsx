import { graphql } from "react-apollo";
import {
	FollowingSnippetsQuery,
	PublicSnippetsQuery
} from "src/generated/mutationTypes";
import { Props, ListControllerTemplate } from "./ListControllerTemplate";
import { getPublicSnippets, getFollowingSnippets } from "./queries";

export const FollowingSnippetsController = graphql<
	Props,
	FollowingSnippetsQuery
>(getFollowingSnippets)(ListControllerTemplate);

export const PublicSnippetsController = graphql<Props, PublicSnippetsQuery>(
	getPublicSnippets
)(ListControllerTemplate);
