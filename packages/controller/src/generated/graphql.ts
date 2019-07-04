import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export interface Scalars {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
}

export interface Error {
	__typename?: "Error";
	path: Scalars["String"];
	message: Scalars["String"];
}

export interface Mutation {
	__typename?: "Mutation";
	sendForgotPasswordEmail?: Maybe<Scalars["Boolean"]>;
	forgotPasswordChange?: Maybe<Error[]>;
	login?: Maybe<Error[]>;
	logout?: Maybe<Scalars["Boolean"]>;
	register?: Maybe<Error[]>;
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
}

export interface Query {
	__typename?: "Query";
	dummy?: Maybe<Scalars["String"]>;
	errorFill?: Maybe<Scalars["String"]>;
	me?: Maybe<User>;
	hello: Scalars["String"];
}

export interface QueryHelloArgs {
	name?: Maybe<Scalars["String"]>;
}

export interface User {
	__typename?: "User";
	id: Scalars["ID"];
	email: Scalars["String"];
}

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
	parent: TParent,
	args: TArgs,
	context: TContext,
	info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export interface StitchingResolver<TResult, TParent, TContext, TArgs> {
	fragment: string;
	resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
}

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
export interface ResolversTypes {
	Query: ResolverTypeWrapper<{}>;
	String: ResolverTypeWrapper<Scalars["String"]>;
	User: ResolverTypeWrapper<User>;
	ID: ResolverTypeWrapper<Scalars["ID"]>;
	Mutation: ResolverTypeWrapper<{}>;
	Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
	Error: ResolverTypeWrapper<Error>;
}

/** Mapping between all available schema types and the resolvers parents */
export interface ResolversParentTypes {
	Query: {};
	String: Scalars["String"];
	User: User;
	ID: Scalars["ID"];
	Mutation: {};
	Boolean: Scalars["Boolean"];
	Error: Error;
}

export interface ErrorResolvers<
	ContextType = any,
	ParentType = ResolversParentTypes["Error"]
> {
	path?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
	message?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
}

export interface MutationResolvers<
	ContextType = any,
	ParentType = ResolversParentTypes["Mutation"]
> {
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
}

export interface QueryResolvers<
	ContextType = any,
	ParentType = ResolversParentTypes["Query"]
> {
	dummy?: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
	errorFill?: Resolver<
		Maybe<ResolversTypes["String"]>,
		ParentType,
		ContextType
	>;
	me?: Resolver<Maybe<ResolversTypes["User"]>, ParentType, ContextType>;
	hello?: Resolver<
		ResolversTypes["String"],
		ParentType,
		ContextType,
		QueryHelloArgs
	>;
}

export interface UserResolvers<
	ContextType = any,
	ParentType = ResolversParentTypes["User"]
> {
	id?: Resolver<ResolversTypes["ID"], ParentType, ContextType>;
	email?: Resolver<ResolversTypes["String"], ParentType, ContextType>;
}

export interface Resolvers<ContextType = any> {
	Error?: ErrorResolvers<ContextType>;
	Mutation?: MutationResolvers<ContextType>;
	Query?: QueryResolvers<ContextType>;
	User?: UserResolvers<ContextType>;
}

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
