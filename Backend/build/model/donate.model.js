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
exports.donateModel = void 0;
var donate_repo_1 = require("../repository/donate.repo");
var global_model_1 = require("./global.model");
var donateModel = /** @class */ (function (_super) {
    __extends(donateModel, _super);
    function donateModel() {
        return _super.call(this, donate_repo_1.donateRepo) || this;
    }
    return donateModel;
}(global_model_1.GlobalModel));
exports.donateModel = donateModel;
//# sourceMappingURL=donate.model.js.map