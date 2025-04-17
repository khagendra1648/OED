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
exports.readCsvBuffer = readCsvBuffer;
exports.readCsvFile = readCsvFile;
var csv = __importStar(require("fast-csv"));
function readCsvBuffer(buffer) {
    return new Promise(function (resolve, reject) {
        var return_value = [];
        var keys;
        var file = csv.parseString(buffer.toString());
        var counter = 0;
        file.on("data", function (data) {
            if (counter > 0) {
                var object_1 = {};
                data.forEach(function (value, index) {
                    object_1[keys[index]] = value;
                });
                return_value.push(object_1);
            }
            else {
                counter++;
                keys = data;
            }
        }).on("end", function () {
            resolve(return_value);
        }).on("error", function (e) {
            console.log(e);
            reject(new Error("Error reading file"));
        });
    });
}
function readCsvFile(path) {
    return new Promise(function (resolve, reject) {
        var return_value = [];
        var keys;
        var file = csv.parseFile(path);
        var counter = 0;
        file.on("data", function (data) {
            if (counter > 0) {
                var object_2 = {};
                data.forEach(function (value, index) {
                    console.log(value);
                    object_2[keys[index]] = value;
                });
                return_value.push(object_2);
            }
            else {
                counter++;
                keys = data;
            }
        }).on("end", function () {
            resolve(return_value);
        }).on("error", function (e) {
            console.log(e);
            reject(new Error("Error reading file"));
        });
    });
}
//# sourceMappingURL=csv.util.js.map