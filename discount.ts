import { UserType } from "./types";

class Discount {
  
  private _discountName : string;
  private _discountType;
  private _userTypes : Array<UserType>;
  private _organizationName;
  private _preschoolNamesAndTheirDiscounts :Array<string | number>;

  get DiscountName() {
    return this._discountName;
  }

  set DiscountName(discountName : string) {
    this._discountName = discountName;
  }

  get DiscountType () {
    return this._discountType;
  }

  set DiscountType(discountType) {
    this._discountType = discountType;
  }

  get UserTypes () {
    return this._userTypes;
  }

  set UserTypes(userTypes) {
    this._userTypes = userTypes;
  }

  get OrganizationName () {
    return this._organizationName;
  }

  set OrganizationName(organizationName) {
    this._organizationName = organizationName;
  }

  get PreschoolNamesAndTheirDiscounts () {
    return this._preschoolNamesAndTheirDiscounts;
  }

  set PreschoolNamesAndTheirDiscounts ( preschoolNamesAndTheirDiscounts) {
    this._preschoolNamesAndTheirDiscounts = preschoolNamesAndTheirDiscounts;
  }
}