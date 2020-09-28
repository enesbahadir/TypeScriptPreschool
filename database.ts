import { Discount } from "./Discount";
import { DiscountType, UserType, OrganizationName } from "./types";

export class database {
  public preschools : Array<IPreschool>;
  public discounts : Array<Discount>;

  createPreschoolList() {
    this.preschools.push( 
      {PreschoolName : "M Lalebahçesi", Price : 1200, EndOfEarlyRegistrationDate : "01/10/2020"},
      {PreschoolName : "Y Lalebahçesi", Price : 1000, EndOfEarlyRegistrationDate : "01/09/2020"}
    );
    return this.preschools;
  }

  createDiscountList() {
    this.discounts.push(
      
    );
    return this.discounts;
  }


}