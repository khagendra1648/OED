"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MESSAGE_STATUS = exports.PAYMENT_METHOD = exports.AGE_GROUP = exports.APPREANCE = exports.LANGUAGE = exports.GENDER = exports.Role = exports.ActionType = void 0;
var ActionType;
(function (ActionType) {
    ActionType["ORDER"] = "order";
    ActionType["MESSAGE"] = "message";
    ActionType["CAMPAIGN"] = "campaign";
    ActionType["DYNAMIC_MESSAGE"] = "dynamic_message";
})(ActionType || (exports.ActionType = ActionType = {}));
var Role;
(function (Role) {
    Role["ADMIN"] = "admin";
    Role["NGO"] = "ngo";
    Role["USER"] = "user";
})(Role || (exports.Role = Role = {}));
var GENDER;
(function (GENDER) {
    GENDER["MALE"] = "male";
    GENDER["FEMALE"] = "female";
    GENDER["NONE"] = "none";
})(GENDER || (exports.GENDER = GENDER = {}));
var LANGUAGE;
(function (LANGUAGE) {
    LANGUAGE["ENGLISH"] = "english";
    LANGUAGE["NEPALI"] = "nepali";
})(LANGUAGE || (exports.LANGUAGE = LANGUAGE = {}));
var APPREANCE;
(function (APPREANCE) {
    APPREANCE["DARK"] = "dark";
    APPREANCE["LIGHT"] = "light";
})(APPREANCE || (exports.APPREANCE = APPREANCE = {}));
var AGE_GROUP;
(function (AGE_GROUP) {
    AGE_GROUP["MINOR"] = "minor";
    AGE_GROUP["ADULT"] = "adult";
    AGE_GROUP["MIDLIFE"] = "midlife";
    AGE_GROUP["SENOIRS"] = "seniors";
    AGE_GROUP["NONE"] = "none";
})(AGE_GROUP || (exports.AGE_GROUP = AGE_GROUP = {}));
var PAYMENT_METHOD;
(function (PAYMENT_METHOD) {
    PAYMENT_METHOD["CASH"] = "cash";
    PAYMENT_METHOD["CREDIT"] = "credit";
    PAYMENT_METHOD["DEBIT"] = "debit";
    PAYMENT_METHOD["FONE_PAY"] = "fonepay";
    PAYMENT_METHOD["ESEWA"] = "esewa";
    PAYMENT_METHOD["KAHLTI"] = "khalti";
    PAYMENT_METHOD["CONNECT_IPS"] = "connect_ips";
    PAYMENT_METHOD["MOBILE_PAYMENT"] = "mobile";
    PAYMENT_METHOD["GIFT_CARD"] = "gift";
    PAYMENT_METHOD["NONE"] = "none";
})(PAYMENT_METHOD || (exports.PAYMENT_METHOD = PAYMENT_METHOD = {}));
var MESSAGE_STATUS;
(function (MESSAGE_STATUS) {
    MESSAGE_STATUS["PENDING"] = "pending";
    MESSAGE_STATUS["DELIVERED"] = "sent";
    MESSAGE_STATUS["FAILED"] = "failed";
    MESSAGE_STATUS["ALL"] = "all";
})(MESSAGE_STATUS || (exports.MESSAGE_STATUS = MESSAGE_STATUS = {}));
//# sourceMappingURL=base.type.js.map