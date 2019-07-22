import * as React from "react";
import { MutationLoginArgs } from "src/generated/graphql";
interface Props {
    children: (data: {
        submit: (values: MutationLoginArgs) => Promise<{
            [key: string]: string;
        } | null>;
    }) => JSX.Element | null;
}
export declare const LoginController: React.ComponentClass<Props, any>;
export {};
