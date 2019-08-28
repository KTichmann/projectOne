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
		__typename: "Query";
		getSnippetComments: Array<IComment | null> | null;
		getUserComments: Array<IComment | null> | null;
		getCommentById: IComment | null;
		getUserFollowers: Array<string> | null;
		getUserFollowing: Array<string> | null;
		dummy: string | null;
		errorFill: string | null;
		me: IUser | null;
		getPublicSnippets: Array<ISnippet | null> | null;
		getUserSnippets: Array<ISnippet | null> | null;
		getSnippetById: ISnippet | null;
		getSnippetsByTag: Array<ISnippet | null> | null;
	}

	interface IGetSnippetCommentsOnQueryArguments {
		snippetId: string;
	}

	interface IGetUserCommentsOnQueryArguments {
		userId: string;
	}

	interface IGetCommentByIdOnQueryArguments {
		commentId: string;
	}

	interface IGetUserFollowersOnQueryArguments {
		userId: string;
	}

	interface IGetUserFollowingOnQueryArguments {
		userId: string;
	}

	interface IGetUserSnippetsOnQueryArguments {
		username: string;
	}

	interface IGetSnippetByIdOnQueryArguments {
		snippetId: string;
	}

	interface IGetSnippetsByTagOnQueryArguments {
		tag: string;
	}

	interface IComment {
		__typename: "Comment";
		id: string;
		content: string;
		user: string;
		createdAt: string;
	}

	interface IUser {
		__typename: "User";
		id: string;
		username: string;
		email: string;
	}

	interface ISnippet {
		__typename: "Snippet";
		id: string;
		content: string;
		language: string;
		tags: Array<string | null> | null;
		user: string;
		createdAt: string;
	}

	interface IMutation {
		__typename: "Mutation";
		createComment: CommentOrError | null;
		updateComment: CommentOrError | null;
		deleteComment: boolean | null;
		followUser: Array<IError | null> | null;
		unfollowUser: Array<IError | null> | null;
		sendForgotPasswordEmail: boolean | null;
		forgotPasswordChange: Array<IError> | null;
		login: Array<IError> | null;
		logout: boolean | null;
		register: Array<IError> | null;
		createSnippet: SnippetOrError | null;
		updateSnippet: SnippetOrError | null;
		deleteSnippet: boolean | null;
	}

	interface ICreateCommentOnMutationArguments {
		snippetId: string;
		content: string;
	}

	interface IUpdateCommentOnMutationArguments {
		commentId: string;
		content: string;
	}

	interface IDeleteCommentOnMutationArguments {
		commentId: string;
	}

	interface IFollowUserOnMutationArguments {
		username: string;
	}

	interface IUnfollowUserOnMutationArguments {
		userId: string;
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
		username: string;
	}

	interface ICreateSnippetOnMutationArguments {
		content: string;
		language: string;
		theme: string;
		visibility: string;
		title: string;
		tags?: Array<string> | null;
	}

	interface IUpdateSnippetOnMutationArguments {
		id: string;
		title?: string;
		theme?: string;
		content?: string | null;
		language?: string | null;
		visibility?: string | null;
		tags?: Array<string> | null;
	}

	interface IDeleteSnippetOnMutationArguments {
		snippetId: string;
	}

	type CommentOrError = IComment | IContentError;

	interface IContentError {
		__typename: "ContentError";
		error: string;
		message: string;
	}

	interface IError {
		__typename: "Error";
		path: string;
		message: string;
	}

	type SnippetOrError = ISnippet | IContentError;
}

// tslint:enable
