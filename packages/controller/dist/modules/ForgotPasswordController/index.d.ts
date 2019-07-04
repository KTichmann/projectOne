import * as React from "react";
import { MutationForgotPasswordChangeArgs } from "src/generated/graphql";
interface Props {
    children: (data: {
        submit: (values: MutationForgotPasswordChangeArgs) => Promise<{
            [key: string]: string;
        } | null>;
    }) => JSX.Element | null;
}
export declare const ForgotPasswordController: React.ComponentClass<Props, any>;
export {};
