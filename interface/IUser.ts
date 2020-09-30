import { OrganizationName, UserType } from "./types";
/**
 * Kişi sınıfına erişmek için kullanılan interface
 */
export interface IUser {

  UserName : string;
  TypeOfUser : UserType;
  OrganizationOfUser : OrganizationName;

  

  

}