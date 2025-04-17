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
exports.ResponseHandlerError = void 0;
exports.responseHandler = responseHandler;
var error_middleware_1 = require("../middleware/error.middleware");
var ResponseHandlerError = /** @class */ (function (_super) {
    __extends(ResponseHandlerError, _super);
    function ResponseHandlerError(message, statusCode) {
        return _super.call(this, message, statusCode) || this;
    }
    return ResponseHandlerError;
}(error_middleware_1.CustomError));
exports.ResponseHandlerError = ResponseHandlerError;
function responseHandler(res, data) {
    try {
        res.send(data);
    }
    catch (e) {
        throw new ResponseHandlerError("Error sending response", 500);
    }
}
//# sourceMappingURL=responseHandler.util.js.map