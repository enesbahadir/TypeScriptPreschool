import { IPreschool } from "./interface/IPreschool";
/**
 * Sistemde kullanılan anaokulu sınıfının bilgilerinin saklandığı sınıf
 */
export class Preschool implements IPreschool {

  private _preschoolName : string;
  private _isInEarlyRegistration : boolean;
  private _price : number;
  private  _endOfEarlyRegistrationDate : string;
  private _id : number;

  constructor(preschoolName : string, endOfEarlyRegistrationDate : string, price : number, id : number)
  {
    this._endOfEarlyRegistrationDate = endOfEarlyRegistrationDate;
    this._preschoolName = preschoolName;
    this._price = price;
    this._id = id;
  }

  get Id()
  {
  return this._id;
  }

  set Id(id) {
  this._id = id;
  }
  get IsInEarlyRegistration() {
    return this._isInEarlyRegistration;
  } 

  set IsInEarlyRegistration(isInEarlyRegistration) {
    this._isInEarlyRegistration = isInEarlyRegistration;
  }

  get PreschoolName () {
    return this._preschoolName;
  }

  set preschoolName( preschoolName : string)
  {
    this._preschoolName = preschoolName;
  }

  get Price () {
    return this._price;
  }

  set Price(price : number) {
    this._price = price;
  }

  get EndOfEarlyRegistrationDate () {
    return this._endOfEarlyRegistrationDate;
  }

  set EndOfEarlyRegistrationDate(endOfEarlyRegistrationDate : string) {
    this._endOfEarlyRegistrationDate = endOfEarlyRegistrationDate;
  }

  isInEarlyRegistrationDate(endOfEarlyRegistrationDate : string) {
    let date = Date.parse(endOfEarlyRegistrationDate);
    
  return false;
   }

  public toString = () : string => {
        return "{" +
                "\"preschoolName\""+":"+ "\"" + this._preschoolName + "\"" +   
                ","+"\"endOfEarlyRegistrationDate\""+":"+ "\"" + this._endOfEarlyRegistrationDate + "\"" +
                ","+"\"price\"" +":\""+ this._price +  "\"" +            
                 ","+"\"id\""+":\""+  this._id  +  "\"" +
                "}";
    }

}