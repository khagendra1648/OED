"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRepo = void 0;
var data_source_1 = require("../data-source");
var post_entity_1 = require("../entity/post.entity");
exports.postRepo = data_source_1.AppDataStore.getRepository(post_entity_1.post);
//# sourceMappingURL=post.repo.js.map