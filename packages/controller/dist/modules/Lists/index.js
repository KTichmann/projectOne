import { graphql } from "react-apollo";
import { ListControllerTemplate } from "./ListControllerTemplate";
import { getPublicSnippets, getFollowingSnippets } from "./queries";
export var FollowingSnippetsController = graphql(getFollowingSnippets)(ListControllerTemplate);
export var PublicSnippetsController = graphql(getPublicSnippets)(ListControllerTemplate);
//# sourceMappingURL=index.js.map