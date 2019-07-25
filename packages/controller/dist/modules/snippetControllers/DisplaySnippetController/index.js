var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
import * as React from "react";
import gql from "graphql-tag";
import { graphql } from "react-apollo";
var C = /** @class */ (function (_super) {
    __extends(C, _super);
    function C(props) {
        var _this = _super.call(this, props) || this;
        _this.componentWillReceiveProps = function (newProps) {
            var snippet = newProps.data;
            if (typeof snippet !== "undefined" && snippet) {
                _this.setState({ snippet: snippet });
            }
        };
        _this.state = {
            snippet: {
                noData: []
            }
        };
        return _this;
    }
    C.prototype.componentDidMount = function () {
        var snippet = this.props.data;
        if (typeof snippet !== "undefined" && snippet) {
            this.setState({ snippet: snippet });
        }
    };
    C.prototype.render = function () {
        return this.props.children(this.state.snippet);
    };
    return C;
}(React.PureComponent));
export { C };
export var getSnippet = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tquery GetSnippetQuery (\n        $snippetId: String!\n\t){\n        {\n  getSnippetById(snippetId: $snippetId){\n      id\n      content\n      title\n      language\n      tags\n      user\n      theme\n      createdAt\n  }\n}\n\t}\n"], ["\n\tquery GetSnippetQuery (\n        $snippetId: String!\n\t){\n        {\n  getSnippetById(snippetId: $snippetId){\n      id\n      content\n      title\n      language\n      tags\n      user\n      theme\n      createdAt\n  }\n}\n\t}\n"])));
export var DisplaySnippetController = graphql(getSnippet)(C);
var templateObject_1;
//# sourceMappingURL=index.js.map