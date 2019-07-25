var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from "graphql-tag";
export var getFollowingSnippets = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tquery Query {\n\t\tgetFollowingSnippets {\n\t\t\tid\n\t\t\tcontent\n\t\t\ttitle\n\t\t\tlanguage\n\t\t\ttags\n\t\t\tuser\n\t\t\ttheme\n\t\t\tcreatedAt\n\t\t}\n\t}\n"], ["\n\tquery Query {\n\t\tgetFollowingSnippets {\n\t\t\tid\n\t\t\tcontent\n\t\t\ttitle\n\t\t\tlanguage\n\t\t\ttags\n\t\t\tuser\n\t\t\ttheme\n\t\t\tcreatedAt\n\t\t}\n\t}\n"])));
export var getPublicSnippets = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n\tquery Query {\n\t\tgetPublicSnippets {\n\t\t\tid\n\t\t\tcontent\n\t\t\ttitle\n\t\t\tlanguage\n\t\t\ttags\n\t\t\tuser\n\t\t\ttheme\n\t\t\tcreatedAt\n\t\t}\n\t}\n"], ["\n\tquery Query {\n\t\tgetPublicSnippets {\n\t\t\tid\n\t\t\tcontent\n\t\t\ttitle\n\t\t\tlanguage\n\t\t\ttags\n\t\t\tuser\n\t\t\ttheme\n\t\t\tcreatedAt\n\t\t}\n\t}\n"])));
var templateObject_1, templateObject_2;
//# sourceMappingURL=queries.js.map