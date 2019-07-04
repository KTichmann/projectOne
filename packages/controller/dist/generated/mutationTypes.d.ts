import { Maybe, Error, Scalars } from "./graphql";
export interface LoginMutation {
    login: Maybe<Error[]>;
}
export interface RegisterMutation {
    register: Maybe<Error[]>;
}
export interface ForgotPasswordEmailMutation {
    sendForgotPasswordEmail?: Maybe<Scalars["Boolean"]>;
}
