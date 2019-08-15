import * as React from "react";
import gql from "graphql-tag";
import { ChildMutateProps, graphql } from "react-apollo";
import { ContentError, MutationCreateCommentArgs } from "src/generated/graphql";
import { CreateCommentMutation } from "src/generated/mutationTypes";
interface Props {
  children: (data: {
    submit: (values: MutationCreateCommentArgs) => Promise<any>;
  }) => JSX.Element | null;
}

class C extends React.PureComponent<
  ChildMutateProps<Props, CreateCommentMutation, MutationCreateCommentArgs>
> {
  submit = async (values: MutationCreateCommentArgs) => {
    const response = await this.props.mutate({
      variables: values
    });
    if (
      typeof response !== "undefined" &&
      response.data &&
      response.data.createComment
    ) {
      const result = response.data.createComment;
      if (!(result as ContentError).error) {
        return result;
      }
      return result;
    }
    return null;
  };

  render() {
    return this.props.children({ submit: this.submit });
  }
}

const addCommentMutation = gql`
  mutation AddCommentMutation($content: String!, $snippetId: String!) {
    createComment(snippetId: $snippetId, content: $content) {
      ... on Comment {
        id
        content
        user
        createdAt
      }
      ... on ContentError {
        error
        message
      }
    }
  }
`;

export const AddCommentController = graphql<
  Props,
  CreateCommentMutation,
  MutationCreateCommentArgs
>(addCommentMutation)(C);
