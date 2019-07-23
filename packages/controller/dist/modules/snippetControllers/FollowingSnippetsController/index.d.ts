import * as React from "react";
interface Props {
    children: (data: {
        getSnippets: () => Promise<any>;
    }) => JSX.Element | null;
}
export declare const FollowingSnippetsController: React.ComponentClass<Props, any>;
export {};
