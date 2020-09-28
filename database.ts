import { IDiscount } from "./IDiscount";
import { DiscountType, UserType, OrganizationName } from "./types";

export class database {
  public preschools : Array<IPreschool>;
  public discounts : Array<IDiscount>;

  createPreschoolList() {
    this.preschools.push( 
      {PreschoolName : "M Lalebahçesi", Price : 1200, EndOfEarlyRegistrationDate : "01/10/2020"},
      {PreschoolName : "Y Lalebahçesi", Price : 1000, EndOfEarlyRegistrationDate : "01/09/2020"}
    );
    return this.preschools;
  }

  createDiscountList() {
    this.discounts.push(
      {DiscountName : "Erken", DiscountType : DiscountType.PERCENTAGE, UserTypes : [UserType.PERSONEL], OrganizationName : OrganizationName.NONE, PreschoolNamesAndTheirDiscounts : [["Madenler Lalebahçesi"][50],["Yunus Emre Lalebahçesi"][50]]}
    );
    return this.discounts;
  }


}