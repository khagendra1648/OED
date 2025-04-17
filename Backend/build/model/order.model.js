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
exports.orderModel = void 0;
// import { orderRepo } from "../repository/order.repo.ts";
var global_model_1 = require("./global.model");
var order_repo_1 = require("../repository/order.repo");
var orderModel = /** @class */ (function (_super) {
    __extends(orderModel, _super);
    function orderModel() {
        return _super.call(this, order_repo_1.orderRepo) || this;
    }
    return orderModel;
}(global_model_1.GlobalModel));
exports.orderModel = orderModel;
//# sourceMappingURL=order.model.js.map