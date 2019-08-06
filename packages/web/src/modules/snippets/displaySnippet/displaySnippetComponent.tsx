import React from "react";
import { Snippet } from "../sharedComponents/Snippet";

export class DisplaySnippetComponent extends React.PureComponent<
  {
    snippet: any;
  },
  { snippet: any }
> {
  constructor(props: { snippet: any }) {
    super(props);

    this.state = {
      snippet: false
    };
  }

  componentDidMount() {
    if (this.props.snippet) {
      this.setState({ snippet: this.props.snippet });
    }
  }

  componentWillReceiveProps(newProps: any) {
    if (newProps.snippet) {
      this.setState({ snippet: newProps.snippet });
    }
  }

  render() {
    const {
      title,
      avatar,
      language,
      theme,
      content,
      tags,
      id,
      user,
      count
    } = this.state.snippet;
    return this.state.snippet ? (
      <Snippet
        key={id}
        title={title}
        avatar={avatar}
        value={content}
        language={language}
        theme={theme}
        count={count}
        tags={tags}
        snapId={id}
        username={user}
        hideCommentCount={false}
      />
    ) : (
      "Low ding"
    );
  }
}
