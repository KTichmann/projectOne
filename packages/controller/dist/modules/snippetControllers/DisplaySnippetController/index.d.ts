import * as React from "react";
import { ChildDataProps } from "react-apollo";
import { QueryGetSnippetByIdArgs, Snippet } from "src/generated/graphql";
import { GetSnippetByIdQuery } from "src/generated/mutationTypes";
export interface Props {
    children: (data: {
        [key: string]: Snippet[];
    }) => JSX.Element | null;
    snippetId: string;
}
export declare class C extends React.PureComponent<ChildDataProps<Props, GetSnippetByIdQuery, QueryGetSnippetByIdArgs>, {
    snippet: any;
}> {
    constructor(props: ChildDataProps<Props, GetSnippetByIdQuery, QueryGetSnippetByIdArgs>);
    componentDidMount(): void;
    componentWillReceiveProps: (newProps: any) => void;
    render(): JSX.Element | null;
}
export declare const getSnippet: any;
export declare const DisplaySnippetController: React.ComponentClass<Props, any>;
