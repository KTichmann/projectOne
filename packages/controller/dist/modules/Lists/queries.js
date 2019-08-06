var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import gql from "graphql-tag";
export var getFollowingSnippets = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query Query {\n    getFollowingSnippets {\n      id\n      content\n      title\n      language\n      tags\n      user\n      theme\n      createdAt\n      comments\n    }\n  }\n"], ["\n  query Query {\n    getFollowingSnippets {\n      id\n      content\n      title\n      language\n      tags\n      user\n      theme\n      createdAt\n      comments\n    }\n  }\n"])));
export var getPublicSnippets = gql(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  query Query {\n    getPublicSnippets {\n      id\n      content\n      title\n      language\n      tags\n      user\n      theme\n      createdAt\n      comments\n    }\n  }\n"], ["\n  query Query {\n    getPublicSnippets {\n      id\n      content\n      title\n      language\n      tags\n      user\n      theme\n      createdAt\n      comments\n    }\n  }\n"])));
export var getMySnippets = gql(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  query Query {\n    getMySnippets {\n      id\n      content\n      title\n      language\n      tags\n      user\n      theme\n      createdAt\n      comments\n    }\n  }\n"], ["\n  query Query {\n    getMySnippets {\n      id\n      content\n      title\n      language\n      tags\n      user\n      theme\n      createdAt\n      comments\n    }\n  }\n"])));
export var getUserSnippets = gql(templateObject_4 || (templateObject_4 = __makeTemplateObject(["\n  query GetUserSnippets($username: String!) {\n    getUserSnippets(username: $username) {\n      id\n      content\n      title\n      language\n      tags\n      user\n      theme\n      comments\n      createdAt\n    }\n  }\n"], ["\n  query GetUserSnippets($username: String!) {\n    getUserSnippets(username: $username) {\n      id\n      content\n      title\n      language\n      tags\n      user\n      theme\n      comments\n      createdAt\n    }\n  }\n"])));
export var searchSnippets = gql(templateObject_5 || (templateObject_5 = __makeTemplateObject(["\n  query SearchSnippets($query: String!) {\n    searchSnippets(query: $query) {\n      id\n      content\n      title\n      language\n      tags\n      user\n      theme\n      comments\n      createdAt\n    }\n  }\n"], ["\n  query SearchSnippets($query: String!) {\n    searchSnippets(query: $query) {\n      id\n      content\n      title\n      language\n      tags\n      user\n      theme\n      comments\n      createdAt\n    }\n  }\n"])));
var templateObject_1, templateObject_2, templateObject_3, templateObject_4, templateObject_5;
//# sourceMappingURL=queries.js.map