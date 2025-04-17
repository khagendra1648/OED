"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleRepo = void 0;
var data_source_1 = require("../data-source");
var article_entity_1 = require("../entity/article.entity");
exports.articleRepo = data_source_1.AppDataStore.getRepository(article_entity_1.article);
//# sourceMappingURL=article.repo.js.map