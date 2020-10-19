import { IDiscount } from "./interface/IDiscount";
import { IDiscountValues } from "./interface/IDiscountValues";
import { DiscountValues } from "./model/DiscountValues";

import { DiscountType, OrganizationName, UserType } from "./enum/types";

/**
 * Sistemde kullanılan indirimlerin bilgilerinin saklandığı sınıf
 */
export class Discount implements IDiscount {
  
  private _discountName : string;
  private _discountType : DiscountType;
  private _userTypes : Array<UserType>;
  private _organizationName : OrganizationName;
  private _discountValues : Array <IDiscountValues>;
  private _id : number;

  constructor(discountName : string, discountType : DiscountType, userTypes : Array<UserType>, 
    organizationName : OrganizationName, discountValues :Array<IDiscountValues>) {
    this._discountName = discountName;
    this._discountType = discountType;
    this._userTypes = userTypes;
    this._organizationName = organizationName;
    this._discountValues = discountValues;
  }

  get Id() {
    return this._id;
  }

  set Id(id : number)
  {
    this._id = id;
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

  get IDiscountValues () {
    return this._discountValues;
  }

  set IDiscountValues ( discountValues) {
    this._discountValues = discountValues;
  }
}