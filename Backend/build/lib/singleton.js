"use strict";
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
exports.Model = Model;
exports.Singleton = Singleton;
function Model() {
    return function (ctr) {
        var e_1, _a;
        var instance;
        var return_call = /** @class */ (function () {
            function class_1() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (instance) {
                    return instance;
                }
                instance = new (ctr.bind.apply(ctr, __spreadArray([void 0], __read(args), false)))();
                return instance;
            }
            return class_1;
        }());
        try {
            for (var _b = __values(Object.getOwnPropertyNames(ctr)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                var descriptor = Object.getOwnPropertyDescriptor(ctr, key);
                Object.defineProperty(return_call, key, descriptor);
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return return_call;
    };
}
function Singleton() {
    return function (ctr) {
        var e_2, _a;
        var instance;
        var return_call = /** @class */ (function () {
            function class_2() {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                if (instance) {
                    return instance;
                }
                instance = new (ctr.bind.apply(ctr, __spreadArray([void 0], __read(args), false)))();
                return instance;
            }
            return class_2;
        }());
        try {
            for (var _b = __values(Object.getOwnPropertyNames(ctr)), _c = _b.next(); !_c.done; _c = _b.next()) {
                var key = _c.value;
                var descriptor = Object.getOwnPropertyDescriptor(ctr, key);
                Object.defineProperty(return_call, key, descriptor);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
        return return_call;
    };
}
//# sourceMappingURL=singleton.js.map