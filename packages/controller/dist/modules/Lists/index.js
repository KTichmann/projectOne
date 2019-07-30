import { graphql } from "react-apollo";
import { ListControllerTemplate } from "./ListControllerTemplate";
import { getPublicSnippets, getFollowingSnippets, getUserSnippets, getMySnippets, searchSnippets } from "./queries";
export var FollowingSnippetsController = graphql(getFollowingSnippets)(ListControllerTemplate);
export var PublicSnippetsController = graphql(getPublicSnippets)(ListControllerTemplate);
export var UserSnippetsController = graphql(getUserSnippets, {
    options: function (props) { return ({ variables: { username: props.username } }); }
})(ListControllerTemplate);
export var MySnippetsController = graphql(getMySnippets)(ListControllerTemplate);
export var SearchSnippetsController = graphql(searchSnippets, {
    options: function (props) { return ({ variables: { query: props.query } }); }
})(ListControllerTemplate);
//# sourceMappingURL=index.js.map