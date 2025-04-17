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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
var user_entity_1 = require("../../entity/user.entity");
var error_middleware_1 = require("../../middleware/error.middleware");
var user_model_1 = require("../../model/user.model");
var base_util_1 = require("../../utils/base.util");
var base_type_1 = require("../../typings/base.type");
var config_1 = require("../../bootstrap/config");
var base_util_2 = require("../../utils/base.util");
var store_global_1 = require("../../store/store.global");
var cookie_util_1 = require("../../utils/cookie.util");
var AuthService = /** @class */ (function () {
    function AuthService(user_model) {
        if (user_model === void 0) { user_model = new user_model_1.UserModel(); }
        this.user_model = user_model;
    }
    AuthService.prototype.register = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var existingUser, user, hashPass;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.user_model.findOne({ where: { User_email: data.email } })];
                    case 1:
                        existingUser = _a.sent();
                        if (existingUser)
                            throw new error_middleware_1.InvalidInputError("Email already registered");
                        if (data.password !== data.confirmPassword)
                            throw new error_middleware_1.InvalidInputError("Password do not match");
                        user = new user_entity_1.User();
                        user.User_Phone = data.number;
                        user.User_address = data.address;
                        user.User_email = data.email;
                        user.User_name = data.first_name + " " + data.last_name;
                        hashPass = (0, base_util_1.hashPassword)(data.password);
                        user.User_password = hashPass;
                        return [4 /*yield*/, this.user_model.create(user)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { message: "User created" }];
                }
            });
        });
    };
    AuthService.prototype.register_admin = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var existingUser, user, hashPass;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.user_model.findOne({ where: { User_email: data.email } })];
                    case 1:
                        existingUser = _a.sent();
                        if (existingUser)
                            throw new error_middleware_1.InvalidInputError("Email already registered");
                        if (data.password !== data.confirmPassword)
                            throw new error_middleware_1.InvalidInputError("Password do not match");
                        user = new user_entity_1.User();
                        user.User_Phone = data.number;
                        user.User_address = data.address;
                        user.User_email = data.email;
                        user.role = base_type_1.Role.ADMIN;
                        user.User_name = data.first_name + " " + data.last_name;
                        hashPass = (0, base_util_1.hashPassword)(data.password);
                        user.User_password = hashPass;
                        return [4 /*yield*/, this.user_model.create(user)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { message: "User created" }];
                }
            });
        });
    };
    AuthService.prototype.login = function (body, res) {
        return __awaiter(this, void 0, void 0, function () {
            var User, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(body);
                        return [4 /*yield*/, this.user_model.findOne({ where: { User_email: body.email } })];
                    case 1:
                        User = _a.sent();
                        if (!User)
                            throw new error_middleware_1.UserNotExist("User doesn't exist");
                        if ((0, base_util_1.verifyHash)(body.password, User.User_password))
                            throw new error_middleware_1.CustomError("Password don't match try again", 400);
                        token = (0, base_util_2.generateToken)(config_1.global_settings.secrets.authentication_user, { userId: User.Id, role: User.role });
                        store_global_1.global_login_store.set_login_token(token, User.Id);
                        (0, cookie_util_1.setCookie)(res, "token", token, { sameSite: false, secure: false });
                        return [2 /*return*/, { statusCode: 200, message: "Login in successful" }];
                }
            });
        });
    };
    AuthService.prototype.login_staff = function (body, res) {
        return __awaiter(this, void 0, void 0, function () {
            var User, token;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        console.log(body);
                        return [4 /*yield*/, this.user_model.findOne({ where: { User_email: body.email } })];
                    case 1:
                        User = _a.sent();
                        if (!User)
                            throw new error_middleware_1.UserNotExist("User doesn't exist");
                        if ((0, base_util_1.verifyHash)(body.password, User.User_password))
                            throw new error_middleware_1.CustomError("Password don't match try again", 400);
                        if (User.role == base_type_1.Role.USER)
                            throw new error_middleware_1.PermissionNotGranted("User cannot use this route");
                        token = (0, base_util_2.generateToken)(config_1.global_settings.secrets.authentication_staff, { userId: User.Id, role: User.role });
                        store_global_1.global_login_store.set_login_token(token, User.Id);
                        (0, cookie_util_1.setCookie)(res, "token", token, {});
                        return [2 /*return*/, { statusCode: 200, message: "Login in successful" }];
                }
            });
        });
    };
    return AuthService;
}());
exports.AuthService = AuthService;
//# sourceMappingURL=authservice.js.map