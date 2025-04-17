"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.global_login_store = void 0;
var config_1 = require("../bootstrap/config");
var singleton_1 = require("../lib/singleton");
var error_middleware_1 = require("../middleware/error.middleware");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var GlobalStore = /** @class */ (function () {
    function GlobalStore() {
        var _this = this;
        this.login_store = new Map();
        this.secondary_token = new Map();
        this.token_secret = config_1.global_settings.secrets.authentication_user;
        this.staff_token_secret = config_1.global_settings.secrets.authentication_staff;
        this._clear_token = function (fn, time) {
            if (time === void 0) { time = 60000 * 5; }
            setTimeout(function () {
                fn();
            }, time);
        };
        this._validate_token = function (token) {
            var validate = jsonwebtoken_1.default.verify(token, _this.token_secret);
            return validate;
        };
        this._validate_staff_token = function (token) {
            var validate = jsonwebtoken_1.default.verify(token, _this.staff_token_secret);
            return validate;
        };
        this._set_token = function (hash, userId, token) {
            if (!hash.has(userId)) {
                hash.set(userId, [token]);
            }
            var tokens = hash.get(userId);
            tokens.push(token);
        };
        this._get_token = function (hash, userId) {
            if (!hash.has(userId))
                return { found: false, tokens: [] };
            return { found: true, tokens: hash.get(userId) };
        };
        this._remove_token = function (hash, userId, token) {
            _this._clear_token(function () {
                if (!hash.has(userId))
                    return false;
                var tokens = hash.get(userId);
                if (tokens.length <= 0) {
                    hash.delete(userId);
                    return;
                }
                var index = tokens.indexOf(token);
                if (index == -1)
                    return;
                tokens.splice(index, 1);
            });
            return true;
        };
        this.verify_login_token = function (token) {
            if (token == null)
                throw new error_middleware_1.CustomError("Token not found", 403);
            var verify = _this._validate_token(token);
            var _a = _this._get_token(_this.login_store, verify.userId), found = _a.found, tokens = _a.tokens;
            if (!found || tokens.indexOf(token) <= -1)
                throw new error_middleware_1.CustomError("Session expired", 403);
            return verify;
        };
        this.verify_staff_token = function (token) {
            if (token == null)
                throw new error_middleware_1.CustomError("Token not found", 403);
            var verify = _this._validate_staff_token(token);
            var _a = _this._get_token(_this.login_store, verify.userId), found = _a.found, tokens = _a.tokens;
            if (!found || tokens.indexOf(token) <= -1)
                throw new error_middleware_1.CustomError("Session expired", 403);
            return verify;
        };
        this.remove_login_token = function (userId, token) {
            if (!_this.login_store.has(userId))
                return false;
            var tokens = _this.login_store.get(userId);
            if (tokens.length <= 0) {
                _this.login_store.delete(userId);
                return false;
            }
            var index = tokens.indexOf(token);
            tokens = __spreadArray(__spreadArray([], __read(tokens.slice(0, index)), false), __read(tokens.slice(index + 1)), false);
            tokens.splice(index, 1);
            return true;
        };
        this.verify_secondary_token = function (token) {
            if (token == null)
                throw new error_middleware_1.CustomError("Token not found", 403);
            var verify = _this._validate_token(token);
            var _a = _this._get_token(_this.secondary_token, verify.userId), found = _a.found, tokens = _a.tokens;
            if (!found || tokens.indexOf(token) <= -1)
                throw new error_middleware_1.PermissionNotGranted("Token expired");
            var index = tokens.indexOf(token);
            tokens.splice(index, 1);
            return verify;
        };
        this.set_login_token = function (token, userId) {
            _this._set_token(_this.login_store, userId, token);
        };
        this.set_login_token_staff = function (token, userId) {
            _this._set_token(_this.login_store, userId, token);
        };
        this.set_secondary_token = function (userId, token) {
            _this._set_token(_this.secondary_token, userId, token);
            _this._remove_token(_this.secondary_token, userId, token);
        };
    }
    GlobalStore = __decorate([
        (0, singleton_1.Singleton)(),
        __metadata("design:paramtypes", [])
    ], GlobalStore);
    return GlobalStore;
}());
exports.global_login_store = new GlobalStore();
//# sourceMappingURL=store.global.js.map