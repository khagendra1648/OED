"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuModel = void 0;
var global_model_1 = require("./global.model");
var menu_repo_1 = require("../repository/menu.repo");
var menuModel = /** @class */ (function (_super) {
    __extends(menuModel, _super);
    function menuModel() {
        return _super.call(this, menu_repo_1.menuRepo) || this;
    }
    return menuModel;
}(global_model_1.GlobalModel));
exports.menuModel = menuModel;
//# sourceMappingURL=menu.model.js.map