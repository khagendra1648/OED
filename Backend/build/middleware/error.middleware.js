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
exports.FileMimeError = exports.FileSizeExceed = exports.ApplicationStartError = exports.UserNotExist = exports.PermissionNotGranted = exports.InvalidInputError = exports.ResponseError = exports.UnknownError = exports.CustomError = void 0;
var CustomError = /** @class */ (function () {
    function CustomError(message, statusCode) {
        this.statusCode = statusCode;
        this.message = message;
    }
    CustomError.sendResponse = function (error, req, res, next) {
        res.statusCode = (error.statusCode) ? error.statusCode : res.statusCode;
        return res.json({ message: error.message });
    };
    return CustomError;
}());
exports.CustomError = CustomError;
var UnknownError = /** @class */ (function (_super) {
    __extends(UnknownError, _super);
    function UnknownError(message) {
        if (message === void 0) { message = "Unknown error occured"; }
        return _super.call(this, message, 500) || this;
    }
    return UnknownError;
}(CustomError));
exports.UnknownError = UnknownError;
var ResponseError = /** @class */ (function (_super) {
    __extends(ResponseError, _super);
    function ResponseError(message, statusCode) {
        return _super.call(this, message, statusCode) || this;
    }
    return ResponseError;
}(CustomError));
exports.ResponseError = ResponseError;
var InvalidInputError = /** @class */ (function (_super) {
    __extends(InvalidInputError, _super);
    function InvalidInputError(message) {
        if (message === void 0) { message = "Invalid input"; }
        return _super.call(this, message, 400) || this;
    }
    return InvalidInputError;
}(CustomError));
exports.InvalidInputError = InvalidInputError;
var PermissionNotGranted = /** @class */ (function (_super) {
    __extends(PermissionNotGranted, _super);
    function PermissionNotGranted(messag) {
        if (messag === void 0) { messag = "Permission not granted"; }
        return _super.call(this, messag, 403) || this;
    }
    return PermissionNotGranted;
}(CustomError));
exports.PermissionNotGranted = PermissionNotGranted;
var UserNotExist = /** @class */ (function (_super) {
    __extends(UserNotExist, _super);
    function UserNotExist(messag) {
        if (messag === void 0) { messag = "User not registered"; }
        return _super.call(this, messag, 401) || this;
    }
    return UserNotExist;
}(CustomError));
exports.UserNotExist = UserNotExist;
var ApplicationStartError = /** @class */ (function (_super) {
    __extends(ApplicationStartError, _super);
    function ApplicationStartError(error) {
        return _super.call(this, error) || this;
    }
    return ApplicationStartError;
}(Error));
exports.ApplicationStartError = ApplicationStartError;
var FileSizeExceed = /** @class */ (function (_super) {
    __extends(FileSizeExceed, _super);
    function FileSizeExceed(error) {
        return _super.call(this, error) || this;
    }
    return FileSizeExceed;
}(Error));
exports.FileSizeExceed = FileSizeExceed;
var FileMimeError = /** @class */ (function (_super) {
    __extends(FileMimeError, _super);
    function FileMimeError(error) {
        return _super.call(this, error) || this;
    }
    return FileMimeError;
}(Error));
exports.FileMimeError = FileMimeError;
//# sourceMappingURL=error.middleware.js.map