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

  static editPreschoolFromInput(preschool : IPreschool)
  {
    debugger;
    let preschoolName = <HTMLInputElement> document.getElementById("preschoolEditName");
    let preschoolPrice = <HTMLInputElement> document.getElementById("preschoolEditPrice");
    let preschoolRegistrationDate = <HTMLInputElement> document.getElementById("preschoolEditDate");

    let indexOfPreschool = database.preschools.indexOf(preschool);
    database.preschools[indexOfPreschool] = {
      PreschoolName : preschoolName.value,
      Price : Number(preschoolPrice.value),
      EndOfEarlyRegistrationDate : preschoolRegistrationDate.value
    };
  }

    
  
}