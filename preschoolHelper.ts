import { database } from "./database";

export class preschoolHelper {

  static createPreschoolFromInput () {
    let preschoolName = <HTMLInputElement> document.getElementById("preschoolAppendName");
    let preschoolPrice = <HTMLInputElement> document.getElementById("preschoolAppendPrice");
    let preschoolRegistrationDate = <HTMLInputElement> document.getElementById("preschoolAppendDate");

    database.preschools.push({
      PreschoolName : preschoolName.value,
      Price : Number(preschoolPrice.value),
      EndOfEarlyRegistrationDate : preschoolRegistrationDate.value
    });
    
  }

    
  
}