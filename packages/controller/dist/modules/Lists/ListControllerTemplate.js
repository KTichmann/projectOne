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
import * as React from "react";
var ListControllerTemplate = /** @class */ (function (_super) {
    __extends(ListControllerTemplate, _super);
    function ListControllerTemplate(props) {
        var _this = _super.call(this, props) || this;
        _this.componentWillReceiveProps = function (newProps) {
            var snippets = newProps.data;
            if (typeof snippets !== "undefined" && snippets) {
                _this.setState({ snippets: snippets });
            }
        };
        _this.state = {
            snippets: {
                noData: []
            }
        };
        return _this;
    }
    ListControllerTemplate.prototype.componentDidMount = function () {
        var snippets = this.props.data;
        if (typeof snippets !== "undefined" && snippets) {
            this.setState({ snippets: snippets });
        }
    };
    ListControllerTemplate.prototype.render = function () {
        return this.props.children(this.state.snippets);
    };
    return ListControllerTemplate;
}(React.PureComponent));
export { ListControllerTemplate };
//# sourceMappingURL=ListControllerTemplate.js.map