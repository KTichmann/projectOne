import { GraphQLResolveInfo } from "graphql";
export declare type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export declare type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};
export declare type Comment = {
    __typename?: "Comment";
    id: Scalars["ID"];
    content: Scalars["String"];
    user: Scalars["String"];
    createdAt: Scalars["String"];
};
export declare type CommentOrError = Comment | ContentError;
export declare type ContentError = {
    __typename?: "ContentError";
    error: Scalars["String"];
    message: Scalars["String"];
};
export declare type Error = {
    __typename?: "Error";
    path: Scalars["String"];
    message: Scalars["String"];
};
export declare type Mutation = {
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
export declare type MutationCreateCommentArgs = {
    snippetId: Scalars["String"];
    content: Scalars["String"];
};
export declare type MutationUpdateCommentArgs = {
    commentId: Scalars["String"];
    content: Scalars["String"];
};
export declare type MutationDeleteCommentArgs = {
    commentId: Scalars["String"];
};
export declare type MutationFollowUserArgs = {
    userId: Scalars["String"];
};
export declare type MutationUnfollowUserArgs = {
    userId: Scalars["String"];
};
export declare type MutationSendForgotPasswordEmailArgs = {
    email: Scalars["String"];
};
export declare type MutationForgotPasswordChangeArgs = {
    newPassword: Scalars["String"];
    key: Scalars["String"];
};
export declare type MutationLoginArgs = {
    email: Scalars["String"];
    password: Scalars["String"];
};
export declare type MutationRegisterArgs = {
    email: Scalars["String"];
    password: Scalars["String"];
    username: Scalars["String"];
};
export declare type MutationCreateSnippetArgs = {
    content: Scalars["String"];
    language: Scalars["String"];
    visibility: Scalars["String"];
    theme: Scalars["String"];
    tags?: Maybe<Array<Scalars["String"]>>;
    title: Scalars["String"];
};
export declare type MutationUpdateSnippetArgs = {
    id: Scalars["String"];
    content?: Maybe<Scalars["String"]>;
    language?: Maybe<Scalars["String"]>;
    visibility?: Maybe<Scalars["String"]>;
    theme?: Maybe<Scalars["String"]>;
    tags?: Maybe<Array<Scalars["String"]>>;
    title: Scalars["String"];
};
export declare type MutationDeleteSnippetArgs = {
    snippetId: Scalars["String"];
};
export declare type Query = {
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
export declare type QueryGetSnippetCommentsArgs = {
    snippetId: Scalars["String"];
};
export declare type QueryGetUserCommentsArgs = {
    userId: Scalars["String"];
};
export declare type QueryGetCommentByIdArgs = {
    commentId: Scalars["String"];
};
export declare type QueryGetUserFollowersArgs = {
    userId?: Maybe<Scalars["String"]>;
};
export declare type QueryGetUserFollowingArgs = {
    userId?: Maybe<Scalars["String"]>;
};
export declare type QueryGetUserSnippetsArgs = {
    username: Scalars["String"];
};
export declare type QueryGetSnippetByIdArgs = {
    snippetId: Scalars["String"];
};
export declare type QueryGetSnippetsByTagArgs = {
    tag: Scalars["String"];
};
export declare type QuerySearchSnippetsArgs = {
    query: Scalars["String"];
};
export declare type Snippet = {
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
export declare type SnippetOrError = Snippet | ContentError;
export declare type User = {
    __typename?: "User";
    id: Scalars["ID"];
    username: Scalars["String"];
    email: Scalars["String"];
};
export declare type ResolverTypeWrapper<T> = Promise<T> | T;
export declare type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export declare type StitchingResolver<TResult, TParent, TContext, TArgs> = {
    fragment: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export declare type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | StitchingResolver<TResult, TParent, TContext, TArgs>;
export declare type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;
export declare type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
    subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
    resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}
export declare type SubscriptionResolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ((...args: any[]) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>) | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;
export declare type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (parent: TParent, context: TContext, info: GraphQLResolveInfo) => Maybe<TTypes>;
export declare type NextResolverFn<T> = () => Promise<T>;
export declare type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (next: NextResolverFn<TResult>, parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => TResult | Promise<TResult>;
/** Mapping between all available schema types and the resolvers types */
export declare type ResolversTypes = {
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
export declare type ResolversParentTypes = {
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
export declare type CommentResolvers<ContextType = any, ParentType extends ResolversParentTypes["Comment"] = ResolversParentTypes["Comment"]> = {
    id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
    content?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    user?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};
export declare type CommentOrErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes["CommentOrError"] = ResolversParentTypes["CommentOrError"]> = {
    __resolveType: TypeResolveFn<"Comment" | "ContentError", ParentType, ContextType>;
};
export declare type ContentErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes["ContentError"] = ResolversParentTypes["ContentError"]> = {
    error?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};
export declare type ErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes["Error"] = ResolversParentTypes["Error"]> = {
    path?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};
export declare type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes["Mutation"] = ResolversParentTypes["Mutation"]> = {
    createComment?: Resolver<Maybe<ResolversTypes["CommentOrError"]>, ParentType, ContextType, MutationCreateCommentArgs>;
    updateComment?: Resolver<Maybe<ResolversTypes["CommentOrError"]>, ParentType, ContextType, MutationUpdateCommentArgs>;
    deleteComment?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType, MutationDeleteCommentArgs>;
    followUser?: Resolver<Maybe<Array<Maybe<ResolversTypes["Error"]>>>, ParentType, ContextType, MutationFollowUserArgs>;
    unfollowUser?: Resolver<Maybe<Array<Maybe<ResolversTypes["Error"]>>>, ParentType, ContextType, MutationUnfollowUserArgs>;
    sendForgotPasswordEmail?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType, MutationSendForgotPasswordEmailArgs>;
    forgotPasswordChange?: Resolver<Maybe<Array<ResolversTypes["Error"]>>, ParentType, ContextType, MutationForgotPasswordChangeArgs>;
    login?: Resolver<Maybe<Array<ResolversTypes["Error"]>>, ParentType, ContextType, MutationLoginArgs>;
    logout?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType>;
    register?: Resolver<Maybe<Array<ResolversTypes["Error"]>>, ParentType, ContextType, MutationRegisterArgs>;
    createSnippet?: Resolver<Maybe<ResolversTypes["SnippetOrError"]>, ParentType, ContextType, MutationCreateSnippetArgs>;
    updateSnippet?: Resolver<Maybe<ResolversTypes["SnippetOrError"]>, ParentType, ContextType, MutationUpdateSnippetArgs>;
    deleteSnippet?: Resolver<Maybe<ResolversTypes["Boolean"]>, ParentType, ContextType, MutationDeleteSnippetArgs>;
};
export declare type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]> = {
    getSnippetComments?: Resolver<Maybe<Array<Maybe<ResolversTypes["Comment"]>>>, ParentType, ContextType, QueryGetSnippetCommentsArgs>;
    getUserComments?: Resolver<Maybe<Array<Maybe<ResolversTypes["Comment"]>>>, ParentType, ContextType, QueryGetUserCommentsArgs>;
    getCommentById?: Resolver<Maybe<ResolversTypes["Comment"]>, ParentType, ContextType, QueryGetCommentByIdArgs>;
    getUserFollowers?: Resolver<Maybe<Array<ResolversTypes["String"]>>, ParentType, ContextType, QueryGetUserFollowersArgs>;
    getUserFollowing?: Resolver<Maybe<Array<ResolversTypes["String"]>>, ParentType, ContextType, QueryGetUserFollowingArgs>;
    getFollowingSnippets?: Resolver<Maybe<Array<ResolversTypes["Snippet"]>>, ParentType, ContextType>;
    dummy?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
    errorFill?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
    me?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
    getPublicSnippets?: Resolver<Maybe<Array<Maybe<ResolversTypes["Snippet"]>>>, ParentType, ContextType>;
    getUserSnippets?: Resolver<Maybe<Array<Maybe<ResolversTypes["Snippet"]>>>, ParentType, ContextType, QueryGetUserSnippetsArgs>;
    getSnippetById?: Resolver<Maybe<ResolversTypes["Snippet"]>, ParentType, ContextType, QueryGetSnippetByIdArgs>;
    getSnippetsByTag?: Resolver<Maybe<Array<Maybe<ResolversTypes["Snippet"]>>>, ParentType, ContextType, QueryGetSnippetsByTagArgs>;
    getMySnippets?: Resolver<Maybe<Array<Maybe<ResolversTypes["Snippet"]>>>, ParentType, ContextType>;
    searchSnippets?: Resolver<Maybe<Array<Maybe<ResolversTypes["Snippet"]>>>, ParentType, ContextType, QuerySearchSnippetsArgs>;
};
export declare type SnippetResolvers<ContextType = any, ParentType extends ResolversParentTypes["Snippet"] = ResolversParentTypes["Snippet"]> = {
    id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
    content?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    language?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    tags?: Resolver<Maybe<Array<Maybe<ResolversTypes["String"]>>>, ParentType, ContextType>;
    user?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    theme?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    comments?: Resolver<Maybe<ResolversTypes["Int"]>, ParentType, ContextType>;
};
export declare type SnippetOrErrorResolvers<ContextType = any, ParentType extends ResolversParentTypes["SnippetOrError"] = ResolversParentTypes["SnippetOrError"]> = {
    __resolveType: TypeResolveFn<"Snippet" | "ContentError", ParentType, ContextType>;
};
export declare type UserResolvers<ContextType = any, ParentType extends ResolversParentTypes["User"] = ResolversParentTypes["User"]> = {
    id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
    username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
};
export declare type Resolvers<ContextType = any> = {
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
export declare type IResolvers<ContextType = any> = Resolvers<ContextType>;
