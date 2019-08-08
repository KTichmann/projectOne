import * as React from "react";
interface Props {
    children: (data: {
        [key: string]: any[];
    }) => JSX.Element | null;
    snippetId: string;
}
export declare const getComments: any;
export declare const CommentListController: React.ComponentClass<Props, any>;
export {};
