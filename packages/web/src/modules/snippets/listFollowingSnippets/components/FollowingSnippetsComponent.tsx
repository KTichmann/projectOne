import React, { Props } from "react";
import { SnippetList } from "../../../shared/SnippetList";

export class FollowingSnippetsComponent extends React.PureComponent<
  {
    snippets: any[];
  },
  { snippets: any[] }
> {
  constructor(props: { snippets: any[] }) {
    super(props);

    this.state = {
      snippets: []
    };
  }

  componentWillReceiveProps(newProps: any) {
    this.setState({ snippets: newProps.snippets });
  }

  render() {
    return (
      <div>
        <SnippetList values={this.state.snippets} />
      </div>
    );
  }
}
