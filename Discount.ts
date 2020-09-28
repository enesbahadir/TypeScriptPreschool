import { IDiscount } from "./IDiscount";
import { DiscountType, OrganizationName, UserType } from "./types";


export class Discount implements IDiscount {
  
  private _discountName : string;
  private _discountType : DiscountType;
  private _userTypes : Array<UserType>;
  private _organizationName : OrganizationName;
  private _preschoolNamesAndTheirDiscounts : Array <string | number>;

  constructor(discountName : string, discountType : DiscountType, userTypes : Array<UserType>, organizationName : OrganizationName, preschoolNamesAndTheirDiscounts :Array<string | number>) {
    this._discountName = discountName;
    this._discountType = discountType;
    this._userTypes = userTypes;
    this._organizationName = organizationName;
    this._preschoolNamesAndTheirDiscounts = preschoolNamesAndTheirDiscounts;
  }

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