"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuRepo = void 0;
var data_source_1 = require("../data-source");
var menu_entity_1 = require("../entity/menu.entity");
exports.menuRepo = data_source_1.AppDataStore.getRepository(menu_entity_1.menu);
//# sourceMappingURL=menu.repo.js.map