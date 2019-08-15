import * as React from "react";
import { MutationCreateCommentArgs } from "src/generated/graphql";
interface Props {
    children: (data: {
        submit: (values: MutationCreateCommentArgs) => Promise<any>;
    }) => JSX.Element | null;
}
export declare const AddCommentController: React.ComponentClass<Props, any>;
export {};
