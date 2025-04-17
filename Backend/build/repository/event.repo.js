"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eventRepo = void 0;
var data_source_1 = require("../data-source");
var event_entity_1 = require("../entity/event.entity");
exports.eventRepo = data_source_1.AppDataStore.getRepository(event_entity_1.event);
//# sourceMappingURL=event.repo.js.map