import * as React from "react";
import { MutationRegisterArgs } from "src/generated/graphql";
interface Props {
    children: (data: {
        submit: (values: MutationRegisterArgs) => Promise<{
            [key: string]: string;
        } | null>;
    }) => JSX.Element | null;
}
export declare const RegisterController: React.ComponentClass<Props, any>;
export {};
