"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.logger = void 0;
var config_1 = require("../bootstrap/config");
var logger_util_1 = require("../utils/logger.util");
exports.logger = new logger_util_1.HttpLogger(config_1.global_settings.log.httpLog, config_1.global_settings.log.errorLog, config_1.global_settings.log.emailLog, config_1.global_settings.log.smsLog, config_1.global_settings.log.smsErrorLog, config_1.global_settings.log.directory);
//# sourceMappingURL=global.js.map