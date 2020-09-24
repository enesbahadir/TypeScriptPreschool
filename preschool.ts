class preschool implements IPreschoolAccess {

  private _preschoolName : string;
  private _isInEarlyRegistration : boolean;
  private _price : number;
  private  _endOfEarlyRegistrationDate : string;

  constructor(preschoolName : string, endOfEarlyRegistrationDate : string, price : number)
  {
    this._endOfEarlyRegistrationDate = endOfEarlyRegistrationDate;
    this._preschoolName = preschoolName;
    this._price = price;
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

}