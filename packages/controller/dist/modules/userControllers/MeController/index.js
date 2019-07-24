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
            var user = newProps.data.me;
            if (typeof user !== "undefined" && user) {
                _this.setState({ user: user });
            }
        };
        _this.state = {
            user: {
                username: "",
                id: ""
            }
        };
        return _this;
    }
    C.prototype.render = function () {
        return this.props.children(this.state.user);
    };
    return C;
}(React.PureComponent));
var getMe = gql(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n\tquery Query {\n\t\tme {\n\t\t\tid\n\t\t\tusername\n\t\t}\n\t}\n"], ["\n\tquery Query {\n\t\tme {\n\t\t\tid\n\t\t\tusername\n\t\t}\n\t}\n"])));
export var MeController = graphql(getMe)(C);
var templateObject_1;
//# sourceMappingURL=index.js.map