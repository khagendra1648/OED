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
exports.OrderService = void 0;
var order_entity_1 = require("../../entity/order.entity");
var order_model_1 = require("../../model/order.model");
var error_middleware_1 = require("../../middleware/error.middleware");
var menu_model_1 = require("../../model/menu.model");
var typeorm_1 = require("typeorm");
var OrderService = /** @class */ (function () {
    function OrderService(order_model, menu_model) {
        if (order_model === void 0) { order_model = new order_model_1.orderModel(); }
        if (menu_model === void 0) { menu_model = new menu_model_1.menuModel(); }
        this.order_model = order_model;
        this.menu_model = menu_model;
    }
    OrderService.prototype.createorder = function (create) {
        return __awaiter(this, void 0, void 0, function () {
            var orders, foodItem, order_price, foodItem_1, foodItem_1_1, i;
            var e_1, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        orders = new order_entity_1.order();
                        return [4 /*yield*/, this.menu_model.find({ where: { Id: (0, typeorm_1.In)(create.order_items) } })];
                    case 1:
                        foodItem = _b.sent();
                        order_price = 0;
                        try {
                            for (foodItem_1 = __values(foodItem), foodItem_1_1 = foodItem_1.next(); !foodItem_1_1.done; foodItem_1_1 = foodItem_1.next()) {
                                i = foodItem_1_1.value;
                                order_price += i.menu_price;
                            }
                        }
                        catch (e_1_1) { e_1 = { error: e_1_1 }; }
                        finally {
                            try {
                                if (foodItem_1_1 && !foodItem_1_1.done && (_a = foodItem_1.return)) _a.call(foodItem_1);
                            }
                            finally { if (e_1) throw e_1.error; }
                        }
                        if (foodItem.length <= 0)
                            throw new error_middleware_1.InvalidInputError("No food found");
                        orders.order_location = create.order_locations;
                        orders.items = foodItem;
                        orders.order_price = order_price;
                        console.log(orders);
                        return [4 /*yield*/, this.order_model.save(orders)];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, ('order is created')];
                }
            });
        });
    };
    OrderService.prototype.getorders = function (read) {
        return __awaiter(this, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.order_model.find({ relations: { items: true } })];
                    case 1:
                        orders = _a.sent();
                        return [2 /*return*/, { data: orders }];
                }
            });
        });
    };
    OrderService.prototype.Deleteorders = function (Delete) {
        return __awaiter(this, void 0, void 0, function () {
            var orders;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.order_model.findOne({ where: { Id: Delete } })];
                    case 1:
                        orders = _a.sent();
                        if (!orders)
                            throw new error_middleware_1.InvalidInputError("No id found");
                        return [4 /*yield*/, this.order_model.delete(orders)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, ('menu is deleted')];
                }
            });
        });
    };
    return OrderService;
}());
exports.OrderService = OrderService;
//# sourceMappingURL=Order.service.js.map