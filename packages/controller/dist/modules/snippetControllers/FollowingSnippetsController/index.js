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
            var snippets = newProps.data.getFollowingSnippets;
            if (typeof snippets !== "undefined" && snippets) {
                _this.setState({ snippets: snippets });
            }
        };
        _this.state = {
            snippets: []
        };
        return _this;
    }
    C.prototype.render = function () {
        return this.props.children(this.state.snippets);
    };
    return C;
}(React.PureComponent));
var getFollowingSnippets = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  query Query {\n    getFollowingSnippets {\n      id\n      content\n      title\n      language\n      tags\n      user\n      createdAt\n    }\n  }\n"], ["\n  query Query {\n    getFollowingSnippets {\n      id\n      content\n      title\n      language\n      tags\n      user\n      createdAt\n    }\n  }\n"])));
export var FollowingSnippetsController = graphql(getFollowingSnippets)(C);
var templateObject_1;
//# sourceMappingURL=index.js.map