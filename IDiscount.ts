import { DiscountType, UserType, OrganizationName } from "./types"; 

export interface IDiscount {

   DiscountName : string;
   DiscountType : DiscountType;
   UserTypes : Array<UserType>;
   OrganizationName : OrganizationName;
   PreschoolNamesAndTheirDiscounts :Array<string | number>;


}