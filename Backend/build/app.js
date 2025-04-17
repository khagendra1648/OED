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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var application_lib_1 = require("./lib/application.lib");
var error_middleware_1 = require("./middleware/error.middleware");
var data_source_1 = require("./data-source");
var dotenv = __importStar(require("dotenv"));
var auth_controller_1 = require("./routes/auth/auth.controller");
var Order_controller_1 = require("./routes/Order/Order.controller");
var post_controller_1 = require("./routes/post/post.controller");
var Menu_controller_1 = require("./routes/menu/Menu.controller");
var Donate_controller_1 = require("./routes/Donate/Donate.controller");
var article_controller_1 = require("./routes/Article/article.controller");
var Event_controller_1 = require("./routes/Event/Event.controller");
dotenv.config();
var bspApplication = new application_lib_1.BspApplication((0, express_1.default)(), [
    new auth_controller_1.AuthController(),
    new Order_controller_1.OrderController(),
    new post_controller_1.PostController(),
    new Menu_controller_1.MenuController(),
    new Donate_controller_1.DonateController(),
    new article_controller_1.articleController(),
    new Event_controller_1.EventController()
]);
var app = bspApplication.getApplication();
app.use("/public", express_1.default.static("./public"));
app.use(error_middleware_1.CustomError.sendResponse);
function applicationStart(AppDataSource) {
    return new Promise(function (resolve, reject) {
        AppDataSource.initialize().then(function (conn) {
            bspApplication.startApplication(process.env.DEV_PORT);
            console.log("Connected to database");
        }).catch(function (e) {
            console.log(e);
            reject(new error_middleware_1.ApplicationStartError(e.message));
        });
    });
}
applicationStart(data_source_1.AppDataStore);
//# sourceMappingURL=app.js.map