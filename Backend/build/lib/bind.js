"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ControlleBind = ControlleBind;
exports.Controller = Controller;
require("reflect-metadata");
var express_1 = require("express");
var error_middleware_1 = require("../middleware/error.middleware");
var yup_1 = require("yup");
var global_1 = require("../global/global");
var responseHandler_util_1 = require("../utils/responseHandler.util");
var imageHandler_1 = require("./imageHandler");
/**
 * Decorator for binding object with it's prototype doesn't support method decorator
 * @param constructor class with property and method for binding
 * @returns new class that with a constructor that returns a object of param class binded with the prototype
 * @deprecated
 */
function ControlleBind(constructor) {
    var e_1, _a;
    var _return_class = /** @class */ (function () {
        // Constructor that takes the argument of class T then creates a instance of T and binds the prototype behavior to the instance 
        function class_1() {
            var e_2, _a;
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            var classInstance = new (constructor.bind.apply(constructor, __spreadArray([void 0], __read(args), false)))(); // Creating an instance of the class
            var _loop_1 = function (key) {
                var descriptor = Object.getOwnPropertyDescriptor(constructor.prototype, key); // Getting descriptor of all the property from prototype
                if (typeof (descriptor === null || descriptor === void 0 ? void 0 : descriptor.value) === 'function') {
                    // Adding additional code to the function like error handling, responseHandler
                    var _original_value_1 = descriptor === null || descriptor === void 0 ? void 0 : descriptor.value;
                    descriptor.value = function () {
                        var args = [];
                        for (var _i = 0; _i < arguments.length; _i++) {
                            args[_i] = arguments[_i];
                        }
                        return __awaiter(this, void 0, void 0, function () {
                            var result, e_3;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0:
                                        _a.trys.push([0, 2, , 3]);
                                        return [4 /*yield*/, _original_value_1.apply(this, args)];
                                    case 1:
                                        result = _a.sent();
                                        if (!result)
                                            return [2 /*return*/];
                                        else
                                            (0, responseHandler_util_1.responseHandler)(args[1], result);
                                        return [3 /*break*/, 3];
                                    case 2:
                                        e_3 = _a.sent();
                                        if (args[0] instanceof imageHandler_1.ImageHandler)
                                            imageHandler_1.image_handler.delete(args[0]);
                                        if (e_3 instanceof error_middleware_1.CustomError)
                                            return [2 /*return*/, args[2](e_3)];
                                        if (e_3 instanceof yup_1.ValidationError)
                                            return [2 /*return*/, args[2](new error_middleware_1.CustomError(e_3.message, 400))];
                                        global_1.logger.errorLogger(args[0], e_3);
                                        args[1].statusCode = 500;
                                        return [2 /*return*/, args[1].json({
                                                message: e_3.message
                                            })];
                                    case 3: return [2 /*return*/];
                                }
                            });
                        });
                    };
                    descriptor.value = descriptor.value.bind(classInstance); //Binding functions to the class instance with properties
                }
                Object.defineProperty(constructor.prototype, key, descriptor);
            };
            try {
                for (var _b = __values(Object.getOwnPropertyNames(constructor.prototype)), _c = _b.next(); !_c.done; _c = _b.next()) {
                    var key = _c.value;
                    _loop_1(key);
                }
            }
            catch (e_2_1) { e_2 = { error: e_2_1 }; }
            finally {
                try {
                    if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                }
                finally { if (e_2) throw e_2.error; }
            }
            return classInstance;
        }
        return class_1;
    }());
    try {
        // Binding static property to the return class from param class 
        for (var _b = __values(Object.getOwnPropertyNames(constructor)), _c = _b.next(); !_c.done; _c = _b.next()) {
            var key = _c.value;
            var descriptor = Object.getOwnPropertyDescriptor(constructor, key);
            Object.defineProperty(_return_class, key, descriptor);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return _return_class;
}
/**
 * Decorator for binding object with it's prototype used with method decorator
 * @param constructor class with property and method for binding
 * @returns new class that with a constructor that returns a object of param class binded with the prototype
 */
function Controller(path, args) {
    if (args === void 0) { args = []; }
    return function (constructor) {
        var e_4, _a;
        // Setting router for controller and assigning path
        var router = (0, express_1.Router)();
        router.route(path);
        // Binding nested route to parent routes
        if (args)
            args.forEach(function (controller) {
                Reflect.getMetadataKeys(controller).forEach(function (name) {
                    var metaData = Reflect.getMetadata(name, controller);
                    if (metaData.router) {
                        router.use(metaData.path, metaData.router);
                    }
                });
            });
        // Constructor that takes the argument of class T then creates a instance of T and binds the prototype behavior to the instance 
        var _return_class = /** @class */ (function () {
            function class_2() {
                var e_5, _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var classInstance = new (constructor.bind.apply(constructor, __spreadArray([void 0], __read(args), false)))(); // Creating an instance from argument constructor
                try {
                    for (var _b = __values(Object.getOwnPropertyNames(constructor.prototype)), _c = _b.next(); !_c.done; _c = _b.next()) { // Getting name of all properties of the prototype object
                        var i = _c.value;
                        var descriptor = Object.getOwnPropertyDescriptor(constructor.prototype, i); // Getting descriptor of all the property from prototype
                        if (typeof descriptor.value == "function") {
                            descriptor.value = descriptor.value.bind(classInstance); //Binding functions to the class instance with properties
                        }
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                Reflect.getMetadataKeys(constructor.prototype).forEach(function (name) { return _attach_route_meta(name, router, Reflect.getMetadata(name, constructor.prototype), classInstance); });
                Reflect.defineMetadata(path, { router: router, path: path }, classInstance);
                return classInstance;
            }
            return class_2;
        }());
        try {
            // Binding static property to the return class from param class 
            for (var _b = __values(Object.getOwnPropertyNames(constructor)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                var descriptor = Object.getOwnPropertyDescriptor(constructor, key);
                Object.defineProperty(_return_class, key, descriptor);
            }
        }
        catch (e_4_1) { e_4 = { error: e_4_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_4) throw e_4.error; }
        }
        return _return_class;
    };
}
function _attach_route_meta(path, router, urlDescriptor, instance) {
    // extending the function descriptor value
    var _original_value = urlDescriptor.descriptor.value; //Storing fucntinon descriptor value 
    urlDescriptor.descriptor.value = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return __awaiter(this, void 0, void 0, function () {
            var result, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, _original_value.apply(this, args)];
                    case 1:
                        result = _a.sent();
                        if (!result)
                            return [2 /*return*/];
                        else {
                            (0, responseHandler_util_1.responseHandler)(args[1], result);
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        e_6 = _a.sent();
                        console.log(e_6);
                        if (args[0].imageHandler)
                            imageHandler_1.image_handler.delete(args[0]);
                        if (e_6 instanceof error_middleware_1.CustomError)
                            return [2 /*return*/, args[2](e_6)];
                        if (e_6 instanceof yup_1.ValidationError)
                            return [2 /*return*/, args[2](new error_middleware_1.CustomError(e_6.message, 400))];
                        global_1.logger.errorLogger(args[0], e_6);
                        args[1].statusCode = 500;
                        return [2 /*return*/, args[1].json({
                                message: e_6.message
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    urlDescriptor.descriptor.value = urlDescriptor.descriptor.value.bind(instance); //Binding functions to the class instance with properties
    router["".concat(urlDescriptor.method)](path.split("\r\r\n\n")[1], urlDescriptor.descriptor.value); // Attaching function to route with it's method protocol and url path
}
//# sourceMappingURL=bind.js.map