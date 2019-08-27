import * as React from "react";
interface Props {
    children: (data: {
        logout: () => Promise<boolean>;
    }) => null;
}
export declare const LogoutController: React.ComponentClass<Props, any>;
export {};
