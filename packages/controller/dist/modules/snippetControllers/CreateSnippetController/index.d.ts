import * as React from "react";
import { MutationCreateSnippetArgs } from "src/generated/graphql";
interface Props {
    children: (data: {
        submit: (values: MutationCreateSnippetArgs) => Promise<any>;
    }) => JSX.Element | null;
}
export declare const CreateSnippetController: React.ComponentClass<Props, any>;
export {};
