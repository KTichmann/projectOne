import * as yup from "yup";
export declare const SUPPORTED_LANGS: string[];
export declare const SUPPORTED_THEMES: string[];
export declare const validSnippetSchema: yup.ObjectSchema<yup.Shape<object, {
    title: string;
    language: any;
    theme: any;
    visibility: any;
}>>;
