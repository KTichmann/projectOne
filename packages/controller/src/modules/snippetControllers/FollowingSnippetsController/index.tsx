import * as React from "react";
import gql from "graphql-tag";
import { CreateSnippetMutation } from "src/generated/mutationTypes";
import { MutationCreateSnippetArgs } from "src/generated/graphql";
import { ChildMutateProps, graphql } from "react-apollo";
interface Props {
  children: (data: {
    submit: (values: MutationCreateSnippetArgs) => Promise<any>;
  }) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<Props, CreateSnippetMutation, MutationCreateSnippetArgs>
> {
  componentDidMount = async () => {
    const response = await this.props.mutate();
    console.log(response);
  };
  submit = async values => {
    const response = await this.props.mutate({
      variables: values
    });
    if (
      typeof response !== "undefined" &&
      response.data &&
      response.data.createSnippet
    ) {
      if (!response.data.createSnippet.error) {
        return null;
      }
      return response.data.createSnippet;
    }
    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const getFollowingSnippets = gql`
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
  CreateSnippetMutation,
  MutationCreateSnippetArgs
>(createSnippetGQLMutation)(C);