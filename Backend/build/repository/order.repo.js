"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderRepo = void 0;
var data_source_1 = require("../data-source");
var order_entity_1 = require("../entity/order.entity");
exports.orderRepo = data_source_1.AppDataStore.getRepository(order_entity_1.order);
//# sourceMappingURL=order.repo.js.map