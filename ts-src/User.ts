import { IUser } from "./interface/IUser";
import { UserType, OrganizationName } from "./enum/types";
/**
 * Sistemde kullanılan kişi bilgilerinin saklandığı sınıf
 */
export class User implements IUser {
  
  private _userName: string;
  private _typeOfUser: UserType;
  private _organizationOfUser: OrganizationName;

  constructor(_userName: string, _typeOfUser: UserType, _organizationOfUser: OrganizationName)
  {
    this._userName = _userName;
    this._typeOfUser = _typeOfUser;
    this._organizationOfUser = _organizationOfUser;
  }

  get UserName() {
    return this._userName;
  }

  set UserName(userName : string)
  {
    this._userName = userName;
  }

  get TypeOfUser() {
    return this._typeOfUser;
  }

  set TypeOfUser ( typeOfUser : UserType)
  {
    this._typeOfUser = typeOfUser;
  }

  get OrganizationOfUser () {
     return this._organizationOfUser;
  }

  set OrganizationOfUser( organizationOfUser : OrganizationName)
  {
    this._organizationOfUser = organizationOfUser;
  }

}