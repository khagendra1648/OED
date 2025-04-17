"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpLogger = void 0;
var morgan_1 = __importDefault(require("morgan"));
var fs_1 = __importDefault(require("fs"));
var dotenv_1 = __importDefault(require("dotenv"));
var path_1 = __importDefault(require("path"));
dotenv_1.default.config();
var HttpLogger = /** @class */ (function () {
    function HttpLogger(httpFilePath, errorFilePath, emailFilePath, smsLogFileName, smsError, directory) {
        if (httpFilePath === void 0) { httpFilePath = "http.log"; }
        if (errorFilePath === void 0) { errorFilePath = "error.log"; }
        if (emailFilePath === void 0) { emailFilePath = "email.log"; }
        if (smsLogFileName === void 0) { smsLogFileName = "sms.log"; }
        if (smsError === void 0) { smsError = "smsError.log"; }
        var _this = this;
        this.httpRequestLogger = function () {
            var stream = _this.requestStream;
            return (0, morgan_1.default)("combined", {
                skip: function (req, res) { return res.statusCode == 404; },
                stream: stream,
            });
        };
        this.errorLogger = function (req, message) {
            var date = new Date();
            var formatMessage = "";
            var totalSpace = 100;
            var logHeader = req ?
                req.path + " " + "".concat(date.getFullYear(), "/").concat(date.getMonth(), "/").concat(date.getDay(), " ").concat(date.getHours(), ":").concat(date.getMinutes(), ":").concat(date.getSeconds()) :
                "Internal database query ".concat(date.getFullYear(), "/").concat(date.getMonth(), "/").concat(date.getDay(), " ").concat(date.getHours(), ":").concat(date.getMinutes(), ":").concat(date.getSeconds());
            var times = (totalSpace - logHeader.length) / 2;
            formatMessage += "-".repeat(times);
            formatMessage += logHeader;
            formatMessage += "-".repeat(times) + "\n\n";
            formatMessage += message.stack;
            formatMessage += "\n\n" + "-".repeat(totalSpace) + "\n\n";
            _this.errorStream.write(formatMessage);
        };
        this.emailLogger = function (err, from, to) {
            var date = new Date();
            var formatMessage = "";
            var totalSpace = 100;
            var logHeader = "Email sent from ".concat(from, " to ").concat(to, " failed at ").concat(date.getFullYear(), "/").concat(date.getMonth() + 1, "/").concat(date.getDate(), " ").concat(date.getHours(), ":").concat(date.getMinutes() + 1, ":").concat(date.getSeconds());
            var times = (totalSpace - logHeader.length) / 2;
            formatMessage += "-".repeat(times);
            formatMessage += logHeader;
            formatMessage += "-".repeat(times) + "\n\n";
            formatMessage += err.stack;
            formatMessage += "\n\n" + "-".repeat(totalSpace) + "\n\n";
            _this.emailStream.write(formatMessage);
        };
        // Sinlge instance of logger through out the process
        if (HttpLogger.instance instanceof HttpLogger)
            return HttpLogger.instance;
        HttpLogger.instance = this;
        if (!fs_1.default.existsSync(directory))
            fs_1.default.mkdirSync(directory);
        // Creating a write stream
        this.requestStream = fs_1.default.createWriteStream(path_1.default.join(directory, httpFilePath), { flags: 'a' });
        this.errorStream = fs_1.default.createWriteStream(path_1.default.join(directory, errorFilePath), { flags: 'a' });
        this.emailStream = fs_1.default.createWriteStream(path_1.default.join(directory, emailFilePath), { flags: 'a' });
        this.smsStream = fs_1.default.createWriteStream(path_1.default.join(directory, smsLogFileName), { flags: 'a' });
        this.smsErrorStream = fs_1.default.createWriteStream(path_1.default.join(directory, smsError), { flags: 'a' });
        return this;
    }
    return HttpLogger;
}());
exports.HttpLogger = HttpLogger;
//# sourceMappingURL=logger.util.js.map