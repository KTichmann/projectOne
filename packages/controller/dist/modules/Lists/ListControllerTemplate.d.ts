import * as React from "react";
import { ChildDataProps } from "react-apollo";
import { Snippet } from "src/generated/graphql";
export interface Props {
    children: (data: {
        [key: string]: Snippet[];
    }) => JSX.Element | null;
    username?: string;
    query?: string;
}
export declare class ListControllerTemplate extends React.PureComponent<ChildDataProps<Props, any>, {
    snippets: any;
}> {
    constructor(props: ChildDataProps<Props, any>);
    componentDidMount(): void;
    componentWillReceiveProps: (newProps: any) => void;
    render(): JSX.Element | null;
}
