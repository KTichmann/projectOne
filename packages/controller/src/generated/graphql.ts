import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Comment = {
  __typename?: "Comment";
  id: Scalars["ID"];
  content: Scalars["String"];
  user: Scalars["String"];
  createdAt: Scalars["String"];
};

export type CommentOrError = Comment | ContentError;

export type ContentError = {
  __typename?: "ContentError";
  error: Scalars["String"];
  message: Scalars["String"];
};

export type Error = {
  __typename?: "Error";
  path: Scalars["String"];
  message: Scalars["String"];
};

export type Mutation = {
  __typename?: "Mutation";
  createComment?: Maybe<CommentOrError>;
  updateComment?: Maybe<CommentOrError>;
  deleteComment?: Maybe<Scalars["Boolean"]>;
  followUser?: Maybe<Array<Maybe<Error>>>;
  unfollowUser?: Maybe<Array<Maybe<Error>>>;
  sendForgotPasswordEmail?: Maybe<Scalars["Boolean"]>;
  forgotPasswordChange?: Maybe<Array<Error>>;
  login?: Maybe<Array<Error>>;
  logout?: Maybe<Scalars["Boolean"]>;
  register?: Maybe<Array<Error>>;
  createSnippet?: Maybe<SnippetOrError>;
  updateSnippet?: Maybe<SnippetOrError>;
  deleteSnippet?: Maybe<Scalars["Boolean"]>;
};

export type MutationCreateCommentArgs = {
  snippetId: Scalars["String"];
  content: Scalars["String"];
};

export type MutationUpdateCommentArgs = {
  commentId: Scalars["String"];
  content: Scalars["String"];
};

export type MutationDeleteCommentArgs = {
  commentId: Scalars["String"];
};

export type MutationFollowUserArgs = {
  userId: Scalars["String"];
};

export type MutationUnfollowUserArgs = {
  userId: Scalars["String"];
};

export type MutationSendForgotPasswordEmailArgs = {
  email: Scalars["String"];
};

export type MutationForgotPasswordChangeArgs = {
  newPassword: Scalars["String"];
  key: Scalars["String"];
};

export type MutationLoginArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationRegisterArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  username: Scalars["String"];
};

export type MutationCreateSnippetArgs = {
  content: Scalars["String"];
  language: Scalars["String"];
  visibility: Scalars["String"];
  theme: Scalars["String"];
  tags?: Maybe<Array<Scalars["String"]>>;
  title: Scalars["String"];
};

export type MutationUpdateSnippetArgs = {
  id: Scalars["String"];
  content?: Maybe<Scalars["String"]>;
  language?: Maybe<Scalars["String"]>;
  visibility?: Maybe<Scalars["String"]>;
  theme?: Maybe<Scalars["String"]>;
  tags?: Maybe<Array<Scalars["String"]>>;
  title: Scalars["String"];
};

export type MutationDeleteSnippetArgs = {
  snippetId: Scalars["String"];
};

export type Query = {
  __typename?: "Query";
  getSnippetComments?: Maybe<Array<Maybe<Comment>>>;
  getUserComments?: Maybe<Array<Maybe<Comment>>>;
  getCommentById?: Maybe<Comment>;
  getUserFollowers?: Maybe<Array<Scalars["String"]>>;
  getUserFollowing?: Maybe<Array<Scalars["String"]>>;
  getFollowingSnippets?: Maybe<Array<Snippet>>;
  dummy?: Maybe<Scalars["String"]>;
  errorFill?: Maybe<Scalars["String"]>;
  me?: Maybe<User>;
  getPublicSnippets?: Maybe<Array<Maybe<Snippet>>>;
  getUserSnippets?: Maybe<Array<Maybe<Snippet>>>;
  getSnippetById?: Maybe<Snippet>;
  getSnippetsByTag?: Maybe<Array<Maybe<Snippet>>>;
  getMySnippets?: Maybe<Array<Maybe<Snippet>>>;
  searchSnippets?: Maybe<Array<Maybe<Snippet>>>;
};

export type QueryGetSnippetCommentsArgs = {
  snippetId: Scalars["String"];
};

export type QueryGetUserCommentsArgs = {
  userId: Scalars["String"];
};

export type QueryGetCommentByIdArgs = {
  commentId: Scalars["String"];
};

export type QueryGetUserFollowersArgs = {
  userId?: Maybe<Scalars["String"]>;
};

export type QueryGetUserFollowingArgs = {
  userId?: Maybe<Scalars["String"]>;
};

export type QueryGetUserSnippetsArgs = {
  username: Scalars["String"];
};

export type QueryGetSnippetByIdArgs = {
  snippetId: Scalars["String"];
};

export type QueryGetSnippetsByTagArgs = {
  tag: Scalars["String"];
};

export type QuerySearchSnippetsArgs = {
  query: Scalars["String"];
};

export type Snippet = {
  __typename?: "Snippet";
  id: Scalars["ID"];
  content: Scalars["String"];
  language: Scalars["String"];
  tags?: Maybe<Array<Maybe<Scalars["String"]>>>;
  user: Scalars["String"];
  theme: Scalars["String"];
  createdAt: Scalars["String"];
  title: Scalars["String"];
  comments?: Maybe<Scalars["Int"]>;
};

export type SnippetOrError = Snippet | ContentError;

export type User = {
  __typename?: "User";
  id: Scalars["ID"];
  username: Scalars["String"];
  email: Scalars["String"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Comment: ResolverTypeWrapper<Comment>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Snippet: ResolverTypeWrapper<Snippet>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
  User: ResolverTypeWrapper<User>;
  Mutation: ResolverTypeWrapper<{}>;
  CommentOrError: ResolversTypes["Comment"] | ResolversTypes["ContentError"];
  ContentError: ResolverTypeWrapper<ContentError>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Error: ResolverTypeWrapper<Error>;
  SnippetOrError: ResolversTypes["Snippet"] | ResolversTypes["ContentError"];
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  String: Scalars["String"];
  Comment: Comment;
  ID: Scalars["ID"];
  Snippet: Snippet;
  Int: Scalars["Int"];
  User: User;
  Mutation: {};
  CommentOrError: ResolversTypes["Comment"] | ResolversTypes["ContentError"];
  ContentError: ContentError;
  Boolean: Scalars["Boolean"];
  Error: Error;
  SnippetOrError: ResolversTypes["Snippet"] | ResolversTypes["ContentError"];
};

export type CommentResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Comment"] = ResolversParentTypes["Comment"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  content?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  user?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type CommentOrErrorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["CommentOrError"] = ResolversParentTypes["CommentOrError"]
> = {
  __resolveType: TypeResolveFn<
    "Comment" | "ContentError",
    ParentType,
    ContextType
  >;
};

export type ContentErrorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["ContentError"] = ResolversParentTypes["ContentError"]
> = {
  error?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type ErrorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Error"] = ResolversParentTypes["Error"]
> = {
  path?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]
> = {
  createComment?: Resolver<
    Maybe<ResolversTypes["CommentOrError"]>,
    ParentType,
    ContextType,
    MutationCreateCommentArgs
  >;
  updateComment?: Resolver<
    Maybe<ResolversTypes["CommentOrError"]>,
    ParentType,
    ContextType,
    MutationUpdateCommentArgs
  >;
  deleteComment?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    MutationDeleteCommentArgs
  >;
  followUser?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Error"]>>>,
    ParentType,
    ContextType,
    MutationFollowUserArgs
  >;
  unfollowUser?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Error"]>>>,
    ParentType,
    ContextType,
    MutationUnfollowUserArgs
  >;
  sendForgotPasswordEmail?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    MutationSendForgotPasswordEmailArgs
  >;
  forgotPasswordChange?: Resolver<
    Maybe<Array<ResolversTypes["Error"]>>,
    ParentType,
    ContextType,
    MutationForgotPasswordChangeArgs
  >;
  login?: Resolver<
    Maybe<Array<ResolversTypes["Error"]>>,
    ParentType,
    ContextType,
    MutationLoginArgs
  >;
  logout?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
  register?: Resolver<
    Maybe<Array<ResolversTypes["Error"]>>,
    ParentType,
    ContextType,
    MutationRegisterArgs
  >;
  createSnippet?: Resolver<
    Maybe<ResolversTypes["SnippetOrError"]>,
    ParentType,
    ContextType,
    MutationCreateSnippetArgs
  >;
  updateSnippet?: Resolver<
    Maybe<ResolversTypes["SnippetOrError"]>,
    ParentType,
    ContextType,
    MutationUpdateSnippetArgs
  >;
  deleteSnippet?: Resolver<
    Maybe<ResolversTypes["Boolean"]>,
    ParentType,
    ContextType,
    MutationDeleteSnippetArgs
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  getSnippetComments?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Comment"]>>>,
    ParentType,
    ContextType,
    QueryGetSnippetCommentsArgs
  >;
  getUserComments?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Comment"]>>>,
    ParentType,
    ContextType,
    QueryGetUserCommentsArgs
  >;
  getCommentById?: Resolver<
    Maybe<ResolversTypes["Comment"]>,
    ParentType,
    ContextType,
    QueryGetCommentByIdArgs
  >;
  getUserFollowers?: Resolver<
    Maybe<Array<ResolversTypes["String"]>>,
    ParentType,
    ContextType,
    QueryGetUserFollowersArgs
  >;
  getUserFollowing?: Resolver<
    Maybe<Array<ResolversTypes["String"]>>,
    ParentType,
    ContextType,
    QueryGetUserFollowingArgs
  >;
  getFollowingSnippets?: Resolver<
    Maybe<Array<ResolversTypes["Snippet"]>>,
    ParentType,
    ContextType
  >;
  dummy?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  errorFill?: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  me?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
  getPublicSnippets?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Snippet"]>>>,
    ParentType,
    ContextType
  >;
  getUserSnippets?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Snippet"]>>>,
    ParentType,
    ContextType,
    QueryGetUserSnippetsArgs
  >;
  getSnippetById?: Resolver<
    Maybe<ResolversTypes["Snippet"]>,
    ParentType,
    ContextType,
    QueryGetSnippetByIdArgs
  >;
  getSnippetsByTag?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Snippet"]>>>,
    ParentType,
    ContextType,
    QueryGetSnippetsByTagArgs
  >;
  getMySnippets?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Snippet"]>>>,
    ParentType,
    ContextType
  >;
  searchSnippets?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Snippet"]>>>,
    ParentType,
    ContextType,
    QuerySearchSnippetsArgs
  >;
};

export type SnippetResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Snippet"] = ResolversParentTypes["Snippet"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  content?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  language?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  tags?: Resolver<
    Maybe<Array<Maybe<ResolversTypes["String"]>>>,
    ParentType,
    ContextType
  >;
  user?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  theme?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  comments?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
};

export type SnippetOrErrorResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["SnippetOrError"] = ResolversParentTypes["SnippetOrError"]
> = {
  __resolveType: TypeResolveFn<
    "Snippet" | "ContentError",
    ParentType,
    ContextType
  >;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]
> = {
  id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
  username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
  email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Comment?: CommentResolvers<ContextType>;
  CommentOrError?: CommentOrErrorResolvers;
  ContentError?: ContentErrorResolvers<ContextType>;
  Error?: ErrorResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Snippet?: SnippetResolvers<ContextType>;
  SnippetOrError?: SnippetOrErrorResolvers;
  User?: UserResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
