"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GlobalEntity = void 0;
var typeorm_1 = require("typeorm");
var GlobalEntity = /** @class */ (function () {
    function GlobalEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", String)
    ], GlobalEntity.prototype, "Id", void 0);
    return GlobalEntity;
}());
exports.GlobalEntity = GlobalEntity;
var crypto_1 = require("crypto");
function generateRandomString(length) {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    var result = '';
    var bytes = (0, crypto_1.randomBytes)(length);
    for (var i = 0; i < bytes.length; i++) {
        result += characters.charAt(bytes[i] % charactersLength);
    }
    return result;
}
// Usage example
var randomString = generateRandomString(10); // Generates a random string of length 10
console.log(randomString);
//# sourceMappingURL=global.entity.js.map