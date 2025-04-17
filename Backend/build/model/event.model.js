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
exports.eventModel = void 0;
var event_repo_1 = require("../repository/event.repo");
var global_model_1 = require("./global.model");
var eventModel = /** @class */ (function (_super) {
    __extends(eventModel, _super);
    function eventModel() {
        return _super.call(this, event_repo_1.eventRepo) || this;
    }
    return eventModel;
}(global_model_1.GlobalModel));
exports.eventModel = eventModel;
//# sourceMappingURL=event.model.js.map