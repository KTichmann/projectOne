// tslint:disable
// graphql typescript definitions

declare namespace GQL {
  interface IGraphQLResponseRoot {
    data?: IQuery | IMutation;
    errors?: Array<IGraphQLResponseError>;
  }

  interface IGraphQLResponseError {
    /** Required for all errors */
    message: string;
    locations?: Array<IGraphQLResponseErrorLocation>;
    /** 7.2.2 says 'GraphQL servers may provide additional entries to error' */
    [propName: string]: any;
  }

  interface IGraphQLResponseErrorLocation {
    line: number;
    column: number;
  }

  interface IQuery {
    __typename: 'Query';
    dummy: string | null;
    errorFill: string | null;
    me: IUser | null;
    getPublicSnippets: Array<ISnippet | null> | null;
    getUserSnippets: Array<ISnippet | null> | null;
    getSnippetById: ISnippet | null;
    getSnippetsByTag: Array<ISnippet | null> | null;
    hello: string;
  }

  interface IGetUserSnippetsOnQueryArguments {
    userId: string;
  }

  interface IGetSnippetByIdOnQueryArguments {
    snippetId: string;
  }

  interface IGetSnippetsByTagOnQueryArguments {
    tag: string;
  }

  interface IHelloOnQueryArguments {
    name?: string | null;
  }

  interface IUser {
    __typename: 'User';
    id: string;
    email: string;
  }

  interface ISnippet {
    __typename: 'Snippet';
    id: string;
    content: string;
    language: string;
    tags: Array<string | null> | null;
    user: string;
  }

  interface IMutation {
    __typename: 'Mutation';
    sendForgotPasswordEmail: boolean | null;
    forgotPasswordChange: Array<IError> | null;
    login: Array<IError> | null;
    logout: boolean | null;
    register: Array<IError> | null;
    createSnippet: ISnippet | null;
    updateSnippet: ISnippet | null;
  }

  interface ISendForgotPasswordEmailOnMutationArguments {
    email: string;
  }

  interface IForgotPasswordChangeOnMutationArguments {
    newPassword: string;
    key: string;
  }

  interface ILoginOnMutationArguments {
    email: string;
    password: string;
  }

  interface IRegisterOnMutationArguments {
    email: string;
    password: string;
  }

  interface ICreateSnippetOnMutationArguments {
    content: string;
    language: string;
    visibility: string;
    tags?: Array<string> | null;
  }

  interface IUpdateSnippetOnMutationArguments {
    id: string;
    content?: string | null;
    language?: string | null;
    visibility?: string | null;
    tags?: Array<string> | null;
  }

  interface IError {
    __typename: 'Error';
    path: string;
    message: string;
  }
}

// tslint:enable
