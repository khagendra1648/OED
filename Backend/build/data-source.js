"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataStore = exports.dataStoreOptions = void 0;
var typeorm_1 = require("typeorm");
exports.dataStoreOptions = {
    type: "mysql",
    host: "localhost",
    database: "oed",
    username: "root",
    synchronize: true,
    debug: false,
    logging: false,
    trace: false,
    entities: [__dirname + '/entity/**/*.entity.{js,ts}'],
    migrations: [__dirname + '/migrations/**/*.entity.{js,ts}']
};
exports.AppDataStore = new typeorm_1.DataSource(exports.dataStoreOptions);
//# sourceMappingURL=data-source.js.map