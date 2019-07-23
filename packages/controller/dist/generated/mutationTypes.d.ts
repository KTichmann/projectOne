import { Maybe, Error, Scalars, SnippetOrError, CommentOrError, Snippet } from "./graphql";
export interface LoginMutation {
    login: Maybe<Error[]>;
}
export interface RegisterMutation {
    register: Maybe<Error[]>;
}
export interface ForgotPasswordEmailMutation {
    sendForgotPasswordEmail: Maybe<Scalars["Boolean"]>;
}
export interface ChangePasswordMutation {
    forgotPasswordChange: Maybe<Error[]>;
}
export interface CreateSnippetMutation {
    createSnippet: Maybe<SnippetOrError>;
}
export interface CreateCommentMutation {
    createComment: Maybe<CommentOrError>;
}
export interface UpdateCommentMutation {
    updateComment: Maybe<CommentOrError>;
}
export interface DeleteCommentMutation {
    deleteComment?: Maybe<Scalars["Boolean"]>;
}
export interface FollowUserMutation {
    followUser: Maybe<Array<Maybe<Error>>>;
}
export interface UnfollowUserMutation {
    unfollowUser: Maybe<Array<Maybe<Error>>>;
}
export interface CreateSnippetMutation {
    createSnippet: Maybe<SnippetOrError>;
}
export interface CreateSnippetMutation {
    updateSnippet: Maybe<SnippetOrError>;
}
export interface CreateSnippetMutation {
    deleteSnippet: Maybe<Scalars["Boolean"]>;
}
export interface FollowingSnippetsQuery {
    getFollowingSnippets: Maybe<Snippet[]>;
}
