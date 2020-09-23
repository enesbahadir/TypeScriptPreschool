/**
 * Preschool sınıfına erişmek için kullanılan interface
 */
interface IPreschoolAccess {

  getPreschoolName() : string;
  setPreschoolNames(preschoolName: string) : void;
  isInEarlyRegistration() : boolean;
  setInEarlyRegistration(inEarlyRegistration: boolean) : void;
  getPrice() : number;
  setPrice(price : number) : void;
  getEndOfEarlyRegistrationDate() : string;
  setEndOfEarlyRegistrationDate(earlyRegistrationDate : string) : void;
  
}