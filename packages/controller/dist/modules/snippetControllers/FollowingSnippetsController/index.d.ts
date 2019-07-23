import * as React from "react";
import { Snippet } from "src/generated/graphql";
interface Props {
    children: (data: Snippet[]) => JSX.Element | null;
}
export declare const FollowingSnippetsController: React.ComponentClass<Props, any>;
export {};
