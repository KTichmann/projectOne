interface Error {
    path: string;
    message: string;
}
export declare const normalizeArrayErrors: (errors: Error[]) => {
    [key: string]: string;
};
export {};
