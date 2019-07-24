import * as React from "react";
interface Props {
    children: (data: {
        username: string;
        id: string;
    }) => JSX.Element | null;
}
export declare const MeController: React.ComponentClass<Props, any>;
export {};
