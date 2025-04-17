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
exports.capitalize = capitalize;
exports.generateRandomString = generateRandomString;
exports.generateToken = generateToken;
exports.tokenVerify = tokenVerify;
exports.hashPassword = hashPassword;
exports.verifyHash = verifyHash;
exports.generateId = generateId;
exports.filterbody = filterbody;
exports.calculateAverageNormalizedRating = calculateAverageNormalizedRating;
var crypto = __importStar(require("crypto"));
var jwt = __importStar(require("jsonwebtoken"));
var bcrypt = __importStar(require("bcrypt"));
function capitalize(string) {
    if (!string)
        return undefined;
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}
//random number generator
function generateRandomString(length) {
    if (length === void 0) { length = 100; }
    var grs = crypto.randomBytes(length).toString('hex');
    return grs;
}
//token generator
function generateToken(secrects, userObj) {
    var accessToken = jwt.sign(userObj, secrects);
    return accessToken;
}
//token verify
function tokenVerify(secrects, token) {
    var verifyToken = jwt.verify(token, secrects);
    return verifyToken;
}
function hashPassword(password) {
    var hashedPass = bcrypt.hashSync(password, 10);
    return hashedPass;
}
function verifyHash(password, hash) {
    return bcrypt.compareSync(password, hash);
}
function generateId(length) {
    if (length === void 0) { length = 10; }
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function filterbody(body) {
    var scriptPattern = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/;
    body = body.replace(scriptPattern, "");
    return body;
}
function calculateAverageNormalizedRating(ratings) {
    // Normalize the ratings by dividing each rating by 5.
    var normalizedRatings = ratings.map(function (rating) { return rating / 5; });
    if (normalizedRatings.length === 0) {
        return 0; // Return 0 if there are no ratings to avoid dividing by zero.
    }
    var sum = normalizedRatings.reduce(function (accumulator, currentValue) { return accumulator + currentValue; }, 0);
    var average = (sum / normalizedRatings.length) * 5; // Scale the average back to the 0-5 range.
    return average;
}
//# sourceMappingURL=base.util.js.map