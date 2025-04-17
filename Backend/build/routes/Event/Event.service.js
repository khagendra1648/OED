"use strict";
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
exports.eventService = void 0;
var error_middleware_1 = require("../../middleware/error.middleware");
var event_model_1 = require("../../model/event.model");
var event_entity_1 = require("../../entity/event.entity");
var eventService = /** @class */ (function () {
    function eventService(event_model) {
        if (event_model === void 0) { event_model = new event_model_1.eventModel(); }
        this.event_model = event_model;
    }
    eventService.prototype.createevent = function (create) {
        return __awaiter(this, void 0, void 0, function () {
            var events;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        events = new event_entity_1.event() //檢
                        ;
                        events.event_name = create.event_name;
                        events.event_description = create.event_description;
                        events.event_Image = create.event_Image;
                        events.event_location = create.event_location;
                        events.event_time = create.event_time;
                        return [4 /*yield*/, this.event_model.create(events)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, ('menu is created')];
                }
            });
        });
    };
    eventService.prototype.getevents = function (read) {
        return __awaiter(this, void 0, void 0, function () {
            var events;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.event_model.find({})];
                    case 1:
                        events = _a.sent();
                        return [2 /*return*/, { data: events }];
                }
            });
        });
    };
    eventService.prototype.Putevents = function (Put) {
        return __awaiter(this, void 0, void 0, function () {
            var events;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.event_model.findOne({ where: { Id: Put.event_Id } })];
                    case 1:
                        events = _a.sent();
                        events.event_name = Put.event_name;
                        events.event_Image = Put.event_Image;
                        events.event_description = Put.event_description;
                        events.event_Image = Put.event_Image ? Put.event_Image : events.event_Image;
                        return [4 /*yield*/, this.event_model.save(events)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, ('menu is edited')];
                }
            });
        });
    };
    eventService.prototype.Deleteevents = function (Delete) {
        return __awaiter(this, void 0, void 0, function () {
            var events;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.event_model.findOne({ where: { Id: Delete } })];
                    case 1:
                        events = _a.sent();
                        if (!events)
                            throw new error_middleware_1.InvalidInputError("No id found");
                        return [4 /*yield*/, this.event_model.delete(events)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, ('Event is deleted')];
                }
            });
        });
    };
    return eventService;
}());
exports.eventService = eventService;
//# sourceMappingURL=Event.service.js.map