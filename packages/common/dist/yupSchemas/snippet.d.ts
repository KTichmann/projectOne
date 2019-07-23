import * as yup from "yup";
export declare const SUPPORTED_LANGS: string[];
export declare const validSnippetSchema: yup.ObjectSchema<yup.Shape<object, {
    title: string;
    content: string;
    language: any;
    visibility: any;
}>>;
