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
            var comments = newProps.data;
            if (typeof comments !== "undefined" && comments.length > 0) {
                _this.setState({ comments: comments });
            }
        };
        _this.state = {
            comments: []
        };
        return _this;
    }
    C.prototype.componentDidMount = function () {
        var comments = this.props.data;
        if (typeof comments !== "undefined" && comments.length > 0) {
            this.setState({ comments: comments });
        }
    };
    C.prototype.render = function () {
        return this.props.children({ comments: this.state.comments });
    };
    return C;
}(React.PureComponent));
export var getComments = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tquery GetCommentsQuery($snippetId: String!) {\n\t\tgetSnippetComments(snippetId: $snippetId) {\n\t\t\tid\n\t\t\tcontent\n\t\t\tuser\n\t\t\tcreatedAt\n\t\t}\n\t}\n"], ["\n\tquery GetCommentsQuery($snippetId: String!) {\n\t\tgetSnippetComments(snippetId: $snippetId) {\n\t\t\tid\n\t\t\tcontent\n\t\t\tuser\n\t\t\tcreatedAt\n\t\t}\n\t}\n"])));
export var CommentListController = graphql(getComments, {
    options: function (props) { return ({ variables: { snippetId: props.snippetId } }); }
})(C);
var templateObject_1;
//# sourceMappingURL=index.js.map