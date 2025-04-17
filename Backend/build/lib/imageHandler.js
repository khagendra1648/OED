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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.image_handler = exports.ImageHandler = void 0;
exports.ImageSingle = ImageSingle;
exports.FileSingle = FileSingle;
exports.ImageArray = ImageArray;
exports.ImageField = ImageField;
var busboy_1 = __importDefault(require("busboy"));
var error_middleware_1 = require("../middleware/error.middleware");
var path = __importStar(require("path"));
var fs = __importStar(require("fs"));
var singleton_1 = require("./singleton");
var sharp_1 = __importDefault(require("sharp"));
var base_util_1 = require("../utils/base.util");
var config_1 = require("../bootstrap/config");
var ImageHandler = /** @class */ (function () {
    function ImageHandler(path, mimeType, fileSize, compressedPath) {
        if (mimeType === void 0) { mimeType = /^.*$/; }
        if (fileSize === void 0) { fileSize = 50000; }
        this.filepath = path;
        this.compressedPath = compressedPath;
        this.mimeType = mimeType;
        this.fileSize = fileSize;
        if (!fs.existsSync(this.filepath)) {
            fs.mkdirSync(this.filepath);
        }
    }
    ImageHandler.prototype.storeFile = function (file, name) {
        fs.writeFile("".concat(this.filepath, "/").concat(name), file, function (err) { });
    };
    // TODO: Change compression to suitable format
    ImageHandler.prototype.compressImage = function (file, name) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                (0, sharp_1.default)(file).png({ quality: 70, compressionLevel: 4 }).jpeg({ quality: 70 }).toFile(path.join(this.compressedPath, name), function (err, info) { });
                return [2 /*return*/];
            });
        });
    };
    ImageHandler.prototype.filterFile = function (regTest, mimeType, fileLength) {
        if (fileLength > this.fileSize)
            return false;
        if (!regTest.test(mimeType))
            return false;
        return true;
    };
    ImageHandler.prototype.singleImage = function (req, name) {
        return this.requestImageHandler(req, [{ name: name, count: 1 }]);
    };
    ImageHandler.prototype.multipleImage = function (req, _a) {
        var name = _a.name, count = _a.count;
        return this.requestImageHandler(req, [{ name: name, count: count }]);
    };
    ImageHandler.prototype.fieldImage = function (req, field) {
        return this.requestImageHandler(req, field);
    };
    ImageHandler.prototype.singleFile = function (req, name) {
        return this.requsetFileHandler(req, [{ name: name, count: 1 }]);
    };
    ImageHandler.prototype.multipleFile = function (req, _a) {
        var name = _a.name, count = _a.count;
        return this.requsetFileHandler(req, [{ name: name, count: count }]);
    };
    ImageHandler.prototype.fieldFile = function (req, field) {
        return this.requsetFileHandler(req, field);
    };
    ImageHandler.prototype.delete = function (req) {
        var files;
        files = req.requestFile;
        if (files instanceof Array)
            return files.forEach(function (file) {
                fs.unlinkSync(path.join(config_1.global_settings.static.image, file.filename));
            });
    };
    ImageHandler.prototype.requsetFileHandler = function (req, field) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var newRequest = req;
            if (!req.headers["content-type"] || req.headers["content-type"].split(";")[0] !== "multipart/form-data")
                reject(new error_middleware_1.InvalidInputError("Bad request need multipart form data"));
            var bb = (0, busboy_1.default)({ headers: req.headers });
            bb.on('file', function (fieldname, file, _a) {
                var filename = _a.filename, encoding = _a.encoding, mimeType = _a.mimeType;
                var fileLength = 0;
                var fileExt = path.extname(filename);
                var fileBuff = [];
                file.on("data", function (data) {
                    fileLength = fileLength + data.length;
                    fileBuff.push(data);
                });
                file.on("end", function () {
                    if (!_this.filterFile(/^application\/pdf$/, mimeType, fileLength))
                        return reject(new error_middleware_1.FileSizeExceed("MimeType or size doesn't match"));
                    // let newDate=generateRandomString(10)
                    // filename=newDate+fileExt
                    newRequest.body[fieldname] = filename;
                    var index = -1;
                    for (var i = 0; i < field.length; i++) {
                        if (field[i].name == fieldname) {
                            index = i;
                            break;
                        }
                    }
                    if (index > -1) {
                        if (field[index].count >= 1)
                            if (!newRequest.requestFile)
                                newRequest.requestFile = [{ extType: fileExt, filename: filename, buffer: fileBuff, fileSize: fileLength, mimetype: mimeType }];
                            else
                                newRequest.requestFile.push({ extType: fileExt, filename: filename, fileSize: fileLength, mimetype: mimeType, buffer: fileBuff });
                        field[index].count = field[index].count - 1;
                    }
                });
            });
            bb.on('field', function (fieldname, val) {
                newRequest.body[fieldname] = val;
            });
            bb.on("close", function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    resolve(newRequest);
                    return [2 /*return*/];
                });
            }); });
            bb.on("error", function () {
                reject(new Error("Unexpected error occured"));
            });
            req.pipe(bb);
        });
    };
    ImageHandler.prototype.requestImageHandler = function (req, field) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var newRequest = req;
            if (!req.headers["content-type"] || req.headers["content-type"].split(";")[0] !== "multipart/form-data")
                reject(new error_middleware_1.InvalidInputError("Bad request need multipart form data"));
            var bb = (0, busboy_1.default)({ headers: req.headers });
            bb.on('file', function (fieldname, file, _a) {
                var filename = _a.filename, encoding = _a.encoding, mimeType = _a.mimeType;
                var fileLength = 0;
                var fileExt = path.extname(filename);
                var fileBuff = [];
                file.on("data", function (data) {
                    fileLength = fileLength + data.length;
                    fileBuff.push(data);
                });
                file.on("end", function () {
                    if (!_this.filterFile(_this.mimeType, mimeType, fileLength))
                        return reject(new error_middleware_1.FileSizeExceed("MimeType or size doesn't match"));
                    var newDate = (0, base_util_1.generateRandomString)(10);
                    filename = newDate + fileExt;
                    newRequest.body[fieldname] = filename;
                    if (!newRequest.requestFile)
                        newRequest.requestFile = [{ extType: fileExt, buffer: fileBuff, filename: filename, fileSize: fileLength, mimetype: mimeType }];
                    else
                        newRequest.requestFile.push({ extType: fileExt, buffer: fileBuff, filename: filename, fileSize: fileLength, mimetype: mimeType });
                    var index = -1;
                    for (var i = 0; i < field.length; i++) {
                        if (field[i].name == fieldname) {
                            index = i;
                            break;
                        }
                    }
                    if (index > -1) {
                        if (field[index].count >= 1) {
                            var buff = Buffer.concat(fileBuff);
                            _this.storeFile(buff, filename);
                            _this.compressImage(buff, filename);
                        }
                        field[index].count = field[index].count - 1;
                    }
                });
            });
            bb.on('field', function (fieldname, val) {
                newRequest.body[fieldname] = val;
            });
            bb.on("close", function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    resolve(newRequest);
                    return [2 /*return*/];
                });
            }); });
            bb.on("error", function () {
                reject(new Error("Unexpected error occured"));
            });
            req.pipe(bb);
        });
    };
    ImageHandler = __decorate([
        (0, singleton_1.Singleton)(),
        __metadata("design:paramtypes", [String, RegExp, Number, String])
    ], ImageHandler);
    return ImageHandler;
}());
exports.ImageHandler = ImageHandler;
function ImageSingle(name) {
    return function (target, propertyName, propertDescriptor) {
        var _original_value = propertDescriptor.value;
        propertDescriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var image;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, exports.image_handler.singleImage(args[0], name)];
                        case 1:
                            image = _a.sent();
                            return [4 /*yield*/, _original_value.apply(this, [image, args[1], args[2]])];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return propertDescriptor;
    };
}
function FileSingle(name) {
    return function (target, propertyName, propertDescriptor) {
        var _original_value = propertDescriptor.value;
        propertDescriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var image;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, exports.image_handler.singleFile(args[0], name)];
                        case 1:
                            image = _a.sent();
                            return [4 /*yield*/, _original_value.apply(this, [image, args[1], args[2]])];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return propertDescriptor;
    };
}
function ImageArray(field) {
    return function (target, propertyName, propertDescriptor) {
        var _original_value = propertDescriptor.value;
        propertDescriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var image;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, exports.image_handler.multipleFile(args[0], field)];
                        case 1:
                            image = _a.sent();
                            return [4 /*yield*/, _original_value.apply(this, [image, args[1], args[2]])];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return propertDescriptor;
    };
}
function ImageField(field) {
    return function (target, propertyName, propertDescriptor) {
        var _original_value = propertDescriptor.value;
        propertDescriptor.value = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var image;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, exports.image_handler.fieldFile(args[0], field)];
                        case 1:
                            image = _a.sent();
                            return [4 /*yield*/, _original_value.apply(this, [image, args[1], args[2]])];
                        case 2: return [2 /*return*/, _a.sent()];
                    }
                });
            });
        };
        return propertDescriptor;
    };
}
exports.image_handler = new ImageHandler(config_1.global_settings.static.image, /image\/(bmp|gif|jpeg|jpg|png|svg\+xml|tiff)/, 4000000, config_1.global_settings.static.compressedImage);
//# sourceMappingURL=imageHandler.js.map