import React from "react";
import { Snippet } from "../sharedComponents/Snippet";
import Spinner from "react-spinkit";
import { CommentListComponent } from "../../comments/commentList/CommentListComponent";
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
      comments
    } = this.state.snippet;
    console.log(this.state.snippet);
    return this.state.snippet ? (
      <div>
        <Snippet
          key={id}
          title={title}
          avatar={avatar}
          value={content}
          language={language}
          theme={theme}
          count={comments}
          tags={tags}
          snapId={id}
          username={user}
          hideCommentCount={false}
        />
        <CommentListComponent snippetId={id} />
      </div>
    ) : (
      <Spinner
        name="pacman"
        color="#1890ff"
        style={{ left: "53%", position: "absolute", top: "20%" }}
      />
    );
  }
}
