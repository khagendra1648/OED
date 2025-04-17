"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRepo = void 0;
var data_source_1 = require("../data-source");
var user_entity_1 = require("../entity/user.entity");
exports.userRepo = data_source_1.AppDataStore.getRepository(user_entity_1.User);
//# sourceMappingURL=user.repo.js.map