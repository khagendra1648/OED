"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.global_settings = void 0;
var base_util_1 = require("../utils/base.util");
var dotenv = __importStar(require("dotenv"));
dotenv.config({});
exports.global_settings = {
    mail: {
        from: "sarbagyashahi894@gmail.com.np",
        username: process.env.MAIL_USERNAME,
        password: process.env.MAIL_PASSWORD,
        host: process.env.MAIL_HOST
    },
    sms: {
        url: process.env.MESSAGE_URL,
        apiKey: process.env.MESSAGE_API,
    },
    secrets: {
        authentication_user: (0, base_util_1.generateRandomString)(),
        authentication_staff: (0, base_util_1.generateRandomString)()
    },
    oauth: {
        google: {
            client_secret: process.env.GOOGLE_CLIENT_TOKEN,
            client_id: process.env.GOOGLE_CLIENT_ID,
            redirect_uri: process.env.GOOGLE_REDIRECT_URL
        }
    },
    static: {
        image: "./public/images",
        compressedImage: "./public/compress",
        article: "./Assests"
    },
    general: {
        pagination: isNaN(Number(process.env.PAGINATION)) ? 20 : Number(process.env.PAGINATION)
    },
    payment: {
        credit_rate: checkCreditRate(Number(process.env.CREDIT_RATE))
    },
    apis_keys: {
        esewa_secretKey: process.env.ESEWA_KEY,
        fonepay_secretKey: process.env.FONEPAY_KEY,
        khalti_secretKey: process.env.KHALTI_KEY,
    },
    message: {
        credit_rate_per_Characters: process.env.CHARACTERS_CREDIT
    },
    log: {
        emailLog: process.env.EMAIL_LOG,
        httpLog: process.env.HTTP_LOG,
        errorLog: process.env.ERROR_LOG,
        smsLog: process.env.SMS_LOG,
        smsErrorLog: process.env.SMS_ERROR_LOG,
        directory: process.env.LOG_DIRECTORY
    }
};
function checkCreditRate(value) {
    if (isNaN(value))
        throw new Error("Credit not a number check config file");
    return value;
}
//# sourceMappingURL=config.js.map