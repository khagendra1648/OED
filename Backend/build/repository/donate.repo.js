"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.donateRepo = void 0;
var data_source_1 = require("../data-source");
var donate_entity_1 = require("../entity/donate.entity");
exports.donateRepo = data_source_1.AppDataStore.getRepository(donate_entity_1.donate);
//# sourceMappingURL=donate.repo.js.map