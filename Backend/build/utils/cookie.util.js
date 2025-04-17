"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setCookie = setCookie;
function setCookie(res, name, value, option) {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.header("");
    res.cookie(name, value, {
        maxAge: 10 * 12 * 30 * 24 * 60 * 60 * 60 * 1000, path: "/",
        // secure:true,
        // sameSite:"none"
    });
}
//# sourceMappingURL=cookie.util.js.map