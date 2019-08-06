import gql from "graphql-tag";

export const getFollowingSnippets = gql`
  query Query {
    getFollowingSnippets {
      id
      content
      title
      language
      tags
      user
      theme
      createdAt
      comments
    }
  }
`;

export const getPublicSnippets = gql`
  query Query {
    getPublicSnippets {
      id
      content
      title
      language
      tags
      user
      theme
      createdAt
      comments
    }
  }
`;

export const getMySnippets = gql`
  query Query {
    getMySnippets {
      id
      content
      title
      language
      tags
      user
      theme
      createdAt
      comments
    }
  }
`;

export const getUserSnippets = gql`
  query GetUserSnippets($username: String!) {
    getUserSnippets(username: $username) {
      id
      content
      title
      language
      tags
      user
      theme
      comments
      createdAt
    }
  }
`;

export const searchSnippets = gql`
  query SearchSnippets($query: String!) {
    searchSnippets(query: $query) {
      id
      content
      title
      language
      tags
      user
      theme
      comments
      createdAt
    }
  }
`;
