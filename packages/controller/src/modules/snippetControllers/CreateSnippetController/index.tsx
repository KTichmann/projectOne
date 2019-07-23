import * as React from "react";
import gql from "graphql-tag";
import { CreateSnippetMutation } from "src/generated/mutationTypes";
import { MutationCreateSnippetArgs, ContentError } from "src/generated/graphql";
import { ChildMutateProps, graphql } from "react-apollo";
interface Props {
  children: (data: {
    submit: (values: MutationCreateSnippetArgs) => Promise<any>;
  }) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<Props, CreateSnippetMutation, MutationCreateSnippetArgs>
> {
  submit = async (values: MutationCreateSnippetArgs) => {
    const response = await this.props.mutate({
      variables: values
    });
    if (
      typeof response !== "undefined" &&
      response.data &&
      response.data.createSnippet
    ) {
      const result = response.data.createSnippet;
      if (!(result as ContentError).error) {
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

const createSnippetGQLMutation = gql`
  mutation CreateSnippetMutation(
    $content: String!
    $language: String!
    $visibility: String!
    $title: String!
    $tags: [String!] = []
  ) {
    createSnippet(
      content: $content
      language: $language
      visibility: $visibility
      tags: $tags
      title: $title
    ) {
      ... on Snippet {
        id
        content
        createdAt
        title
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
