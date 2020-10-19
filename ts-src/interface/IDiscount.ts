import { DiscountType, UserType, OrganizationName } from "./../enum/types"; 
import { IDiscountValues } from "./IDiscountValues";

/**
 * İndirim sınıfına erişmek için kullanılan interface
 */
export interface IDiscount {

   DiscountName : string;
   DiscountType : DiscountType;
   UserTypes : Array<UserType>;
   OrganizationName : OrganizationName;
   DiscountValues :Array <IDiscountValues>;
   Id : number;

}

