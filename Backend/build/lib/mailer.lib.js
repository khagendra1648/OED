"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailMailer = exports.Mailer = exports.TemplateEngine = exports.MailSendError = exports.MailConnectionError = void 0;
var nodemailer_1 = require("nodemailer");
var singleton_1 = require("./singleton");
var dotenv = __importStar(require("dotenv"));
var global_1 = require("../global/global");
var config_1 = require("../bootstrap/config");
dotenv.config();
var MailConnectionError = /** @class */ (function (_super) {
    __extends(MailConnectionError, _super);
    function MailConnectionError(messag) {
        return _super.call(this, messag) || this;
    }
    return MailConnectionError;
}(Error));
exports.MailConnectionError = MailConnectionError;
var MailSendError = /** @class */ (function (_super) {
    __extends(MailSendError, _super);
    function MailSendError() {
        return _super.call(this) || this;
    }
    return MailSendError;
}(Error));
exports.MailSendError = MailSendError;
var TemplateEngine = /** @class */ (function () {
    function TemplateEngine(template) {
        this.template = template;
    }
    TemplateEngine.prototype.render = function (context) {
        return this.template.replace(/\{\{(\w+)\}\}/g, function (_match, capture) { return context[capture] || ''; });
    };
    return TemplateEngine;
}());
exports.TemplateEngine = TemplateEngine;
var Mailer = /** @class */ (function () {
    function Mailer(config) {
        var _this = this;
        this.config = config;
        this.connect = function () {
            try {
                _this.transport = (0, nodemailer_1.createTransport)({
                    host: _this.config.host,
                    auth: {
                        user: _this.config.auth.username,
                        pass: _this.config.auth.password,
                    },
                    secure: _this.config.secure,
                    port: _this.config.port,
                    connectionTimeout: 10000,
                    socketTimeout: 10000
                });
            }
            catch (e) {
                throw new MailConnectionError(e.message);
            }
        };
        this.sendMail = function (message) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.transport
                    .sendMail(message).catch(function (e) { return global_1.logger.emailLogger(e, message.from, message.to); });
                return [2 /*return*/, {
                        message: "Mail sent seccess"
                    }];
            });
        }); };
        this.sendMailHTML = function (email, template, subject) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.sendMail({
                    from: config_1.global_settings.mail.from,
                    to: email,
                    html: template,
                    subject: subject
                });
                return [2 /*return*/];
            });
        }); };
        this.connect();
    }
    Mailer = __decorate([
        (0, singleton_1.Singleton)(),
        __metadata("design:paramtypes", [Object])
    ], Mailer);
    return Mailer;
}());
exports.Mailer = Mailer;
var EmailMailer = /** @class */ (function (_super) {
    __extends(EmailMailer, _super);
    function EmailMailer(config) {
        return _super.call(this, config) || this;
    }
    EmailMailer = __decorate([
        (0, singleton_1.Model)(),
        __metadata("design:paramtypes", [Object])
    ], EmailMailer);
    return EmailMailer;
}(Mailer));
exports.EmailMailer = EmailMailer;
// export const email_mailer=new EmailMailer({
//     auth:{
//             username:setting.setting.mail.auth.username,
//             password:setting.setting.mail.auth.password
//         },
//     host:setting.setting.mail.host,
//     port:setting.setting.mail.port,
//     secure:true
// })
//# sourceMappingURL=mailer.lib.js.map