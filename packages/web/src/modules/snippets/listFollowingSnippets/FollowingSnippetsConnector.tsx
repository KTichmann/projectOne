import * as React from "react";
import { FollowingSnippetsController } from "@abb/controller";
import { FollowingSnippetsView } from "./components/FollowingSnippetsView";

export class CreateSnippetConnector extends React.PureComponent {
  render() {
    return (
      <FollowingSnippetsController>
        {({ values }) => <FollowingSnippetsView values={values} />}
      </FollowingSnippetsController>
    );
  }
}
