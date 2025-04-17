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
exports.postModel = void 0;
var post_repo_1 = require("../repository/post.repo");
// import { orderRepo } from "../repository/order.repo.ts";
var global_model_1 = require("./global.model");
var postModel = /** @class */ (function (_super) {
    __extends(postModel, _super);
    function postModel() {
        return _super.call(this, post_repo_1.postRepo) || this;
    }
    return postModel;
}(global_model_1.GlobalModel));
exports.postModel = postModel;
//# sourceMappingURL=post.model.js.map