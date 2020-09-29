import { DiscountType, UserType, OrganizationName } from "./types"; 

/**
 * İndirim sınıfına erişmek için kullanılan interface
 */
export interface IDiscount {

   DiscountName : string;
   DiscountType : DiscountType;
   UserTypes : Array<UserType>;
   OrganizationName : OrganizationName;
   PreschoolNamesAndTheirDiscounts :Array <string | number>;


}