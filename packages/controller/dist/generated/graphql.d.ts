import { GraphQLResolveInfo } from "graphql";
export declare type Maybe<T> = T | null;
export declare type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
}
export interface Comment {
    __typename?: "Comment";
    id: Scalars["ID"];
    content: Scalars["String"];
    user: Scalars["String"];
    createdAt: Scalars["String"];
}
export declare type CommentOrError = Comment | ContentError;
export interface ContentError {
    __typename?: "ContentError";
    error: Scalars["String"];
    message: Scalars["String"];
}
export interface Error {
    __typename?: "Error";
    path: Scalars["String"];
    message: Scalars["String"];
}
export interface Mutation {
    __typename?: "Mutation";
    createComment?: Maybe<CommentOrError>;
    updateComment?: Maybe<CommentOrError>;
    deleteComment?: Maybe<Scalars["Boolean"]>;
    followUser?: Maybe<Array<Maybe<Error>>>;
    unfollowUser?: Maybe<Array<Maybe<Error>>>;
    sendForgotPasswordEmail?: Maybe<Scalars["Boolean"]>;
    forgotPasswordChange?: Maybe<Error[]>;
    login?: Maybe<Error[]>;
    logout?: Maybe<Scalars["Boolean"]>;
    register?: Maybe<Error[]>;
    createSnippet?: Maybe<SnippetOrError>;
    updateSnippet?: Maybe<SnippetOrError>;
    deleteSnippet?: Maybe<Scalars["Boolean"]>;
}
export interface MutationCreateCommentArgs {
    snippetId: Scalars["String"];
    content: Scalars["String"];
}
export interface MutationUpdateCommentArgs {
    commentId: Scalars["String"];
    content: Scalars["String"];
}
export interface MutationDeleteCommentArgs {
    commentId: Scalars["String"];
}
export interface MutationFollowUserArgs {
    userId: Scalars["String"];
}
export interface MutationUnfollowUserArgs {
    userId: Scalars["String"];
}
export interface MutationSendForgotPasswordEmailArgs {
    email: Scalars["String"];
}
export interface MutationForgotPasswordChangeArgs {
    newPassword: Scalars["String"];
    key: Scalars["String"];
}
export interface MutationLoginArgs {
    email: Scalars["String"];
    password: Scalars["String"];
}
export interface MutationRegisterArgs {
    email: Scalars["String"];
    password: Scalars["String"];
    username: Scalars["String"];
}
export interface MutationCreateSnippetArgs {
    content: Scalars["String"];
    language: Scalars["String"];
    visibility: Scalars["String"];
    theme: Scalars["String"];
    tags?: Maybe<Array<Scalars["String"]>>;
    title: Scalars["String"];
}
export interface MutationUpdateSnippetArgs {
    id: Scalars["String"];
    content?: Maybe<Scalars["String"]>;
    language?: Maybe<Scalars["String"]>;
    visibility?: Maybe<Scalars["String"]>;
    theme?: Maybe<Scalars["String"]>;
    tags?: Maybe<Array<Scalars["String"]>>;
    title: Scalars["String"];
}
export interface MutationDeleteSnippetArgs {
    snippetId: Scalars["String"];
}
export interface Query {
    __typename?: "Query";
    getSnippetComments?: Maybe<Array<Maybe<Comment>>>;
    getUserComments?: Maybe<Array<Maybe<Comment>>>;
    getCommentById?: Maybe<Comment>;
    getUserFollowers?: Maybe<Array<Scalars["String"]>>;
    getUserFollowing?: Maybe<Array<Scalars["String"]>>;
    getFollowingSnippets?: Maybe<Snippet[]>;
    dummy?: Maybe<Scalars["String"]>;
    errorFill?: Maybe<Scalars["String"]>;
    me?: Maybe<User>;
    getPublicSnippets?: Maybe<Array<Maybe<Snippet>>>;
    getUserSnippets?: Maybe<Array<Maybe<Snippet>>>;
    getSnippetById?: Maybe<Snippet>;
    getSnippetsByTag?: Maybe<Array<Maybe<Snippet>>>;
}
export interface QueryGetSnippetCommentsArgs {
    snippetId: Scalars["String"];
}
export interface QueryGetUserCommentsArgs {
    userId: Scalars["String"];
}
export interface QueryGetCommentByIdArgs {
    commentId: Scalars["String"];
}
export interface QueryGetUserFollowersArgs {
    userId?: Maybe<Scalars["String"]>;
}
export interface QueryGetUserFollowingArgs {
    userId?: Maybe<Scalars["String"]>;
}
export interface QueryGetUserSnippetsArgs {
    userId: Scalars["String"];
}
export interface QueryGetSnippetByIdArgs {
    snippetId: Scalars["String"];
}
export interface QueryGetSnippetsByTagArgs {
    tag: Scalars["String"];
}
export interface Snippet {
    __typename?: "Snippet";
    id: Scalars["ID"];
    content: Scalars["String"];
    language: Scalars["String"];
    tags?: Maybe<Array<Maybe<Scalars["String"]>>>;
    user: Scalars["String"];
    theme: Scalars["String"];
    createdAt: Scalars["String"];
    title: Scalars["String"];
}
export declare type SnippetOrError = Snippet | ContentError;
export interface User {
    __typename?: "User";
    id: Scalars["ID"];
    username: Scalars["String"];
    email: Scalars["String"];
}
export declare type ResolverTypeWrapper<T> = Promise<T> | T;
export declare type ResolverFn<TResult, TParent, TContext, TArgs> = (parent: TParent, args: TArgs, context: TContext, info: GraphQLResolveInfo) => Promise<TResult> | TResult;
export interface StitchingResolver<TResult, TParent, TContext, TArgs> {
    fragment: string;
    resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
}
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
export interface ResolversTypes {
    Query: ResolverTypeWrapper<{}>;
    String: ResolverTypeWrapper<Scalars["String"]>;
    Comment: ResolverTypeWrapper<Comment>;
    ID: ResolverTypeWrapper<Scalars["ID"]>;
    Snippet: ResolverTypeWrapper<Snippet>;
    User: ResolverTypeWrapper<User>;
    Mutation: ResolverTypeWrapper<{}>;
    CommentOrError: ResolversTypes["Comment"] | ResolversTypes["ContentError"];
    ContentError: ResolverTypeWrapper<ContentError>;
    Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
    Error: ResolverTypeWrapper<Error>;
    SnippetOrError: ResolversTypes["Snippet"] | ResolversTypes["ContentError"];
}
/** Mapping between all available schema types and the resolvers parents */
export interface ResolversParentTypes {
    Query: {};
    String: Scalars["String"];
    Comment: Comment;
    ID: Scalars["ID"];
    Snippet: Snippet;
    User: User;
    Mutation: {};
    CommentOrError: ResolversTypes["Comment"] | ResolversTypes["ContentError"];
    ContentError: ContentError;
    Boolean: Scalars["Boolean"];
    Error: Error;
    SnippetOrError: ResolversTypes["Snippet"] | ResolversTypes["ContentError"];
}
export interface CommentResolvers<ContextType = any, ParentType = ResolversParentTypes["Comment"]> {
    id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
    content?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    user?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
}
export interface CommentOrErrorResolvers<ContextType = any, ParentType = ResolversParentTypes["CommentOrError"]> {
    __resolveType: TypeResolveFn<"Comment" | "ContentError", ParentType, ContextType>;
}
export interface ContentErrorResolvers<ContextType = any, ParentType = ResolversParentTypes["ContentError"]> {
    error?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
}
export interface ErrorResolvers<ContextType = any, ParentType = ResolversParentTypes["Error"]> {
    path?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
}
export interface MutationResolvers<ContextType = any, ParentType = ResolversParentTypes["Mutation"]> {
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
}
export interface QueryResolvers<ContextType = any, ParentType = ResolversParentTypes["Query"]> {
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
}
export interface SnippetResolvers<ContextType = any, ParentType = ResolversParentTypes["Snippet"]> {
    id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
    content?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    language?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    tags?: Resolver<Maybe<Array<Maybe<ResolversTypes["String"]>>>, ParentType, ContextType>;
    user?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    theme?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    createdAt?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    title?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
}
export interface SnippetOrErrorResolvers<ContextType = any, ParentType = ResolversParentTypes["SnippetOrError"]> {
    __resolveType: TypeResolveFn<"Snippet" | "ContentError", ParentType, ContextType>;
}
export interface UserResolvers<ContextType = any, ParentType = ResolversParentTypes["User"]> {
    id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
    username?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
    email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
}
export interface Resolvers<ContextType = any> {
    Comment?: CommentResolvers<ContextType>;
    CommentOrError?: CommentOrErrorResolvers;
    ContentError?: ContentErrorResolvers<ContextType>;
    Error?: ErrorResolvers<ContextType>;
    Mutation?: MutationResolvers<ContextType>;
    Query?: QueryResolvers<ContextType>;
    Snippet?: SnippetResolvers<ContextType>;
    SnippetOrError?: SnippetOrErrorResolvers;
    User?: UserResolvers<ContextType>;
}
/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export declare type IResolvers<ContextType = any> = Resolvers<ContextType>;
