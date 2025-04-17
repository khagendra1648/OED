"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Get = Get;
exports.Post = Post;
exports.Put = Put;
exports.Delete = Delete;
exports.Update = Update;
exports.Patch = Patch;
function Get(path) {
    return function (target, propertyName, descriptor) {
        Reflect.defineMetadata("get\r\r\n\n".concat(path), { method: "get", descriptor: descriptor, name: propertyName }, target); //Assigning path, descriptor, and method name to the metadata of every object
    };
}
function Post(path) {
    return function (target, propertyName, descriptor) {
        Reflect.defineMetadata("post\r\r\n\n".concat(path), { method: "post", descriptor: descriptor, name: propertyName }, target);
    };
}
function Put(path) {
    return function (target, propertyName, descriptor) {
        Reflect.defineMetadata("put\r\r\n\n".concat(path), { method: "put", descriptor: descriptor, name: propertyName }, target);
    };
}
function Delete(path) {
    return function (target, propertyName, descriptor) {
        Reflect.defineMetadata("delete\r\r\n\n".concat(path), { method: "delete", descriptor: descriptor, name: propertyName }, target);
    };
}
function Update(path) {
    return function (target, propertyName, descriptor) {
        Reflect.defineMetadata("update\r\r\n\n".concat(path), { method: "update", descriptor: descriptor, name: propertyName }, target);
    };
}
function Patch(path) {
    return function (target, propertyName, descriptor) {
        Reflect.defineMetadata("patch\r\r\n\n".concat(path), { method: "patch", descriptor: descriptor, name: propertyName }, target);
    };
}
//# sourceMappingURL=methods.js.map