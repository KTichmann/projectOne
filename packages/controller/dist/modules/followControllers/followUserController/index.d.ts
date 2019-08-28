import * as React from "react";
interface Props {
    children: (data: {
        follow: (values: any) => Promise<{
            [key: string]: string;
        } | null>;
    }) => JSX.Element | null;
}
export declare const FollowUserController: React.ComponentClass<Props, any>;
export {};
