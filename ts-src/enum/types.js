"use strict";
/**
 * Sistemde tanımlı kişi tiplerini, İndirim tiplerinin ve Kurumların Listelendiği enum sınıfları
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrganizationName = exports.DiscountType = exports.UserType = void 0;
var UserType;
(function (UserType) {
    UserType[UserType["PERSONEL"] = 0] = "PERSONEL";
    UserType[UserType["IHVAN"] = 1] = "IHVAN";
    UserType[UserType["STANDART"] = 2] = "STANDART";
})(UserType = exports.UserType || (exports.UserType = {}));
var DiscountType;
(function (DiscountType) {
    DiscountType[DiscountType["PERCENTAGE"] = 0] = "PERCENTAGE";
    DiscountType[DiscountType["AMOUNT"] = 1] = "AMOUNT";
})(DiscountType = exports.DiscountType || (exports.DiscountType = {}));
var OrganizationName;
(function (OrganizationName) {
    OrganizationName[OrganizationName["SAGLIK"] = 0] = "SAGLIK";
    OrganizationName[OrganizationName["ANADOLU"] = 1] = "ANADOLU";
    OrganizationName[OrganizationName["NONE"] = 2] = "NONE";
})(OrganizationName = exports.OrganizationName || (exports.OrganizationName = {}));
