import { Database } from "./Database";
import { IPreschool } from "./interface/IPreschool";
import { Preschool } from "./Preschool";
import { PreschoolManagementAPI } from "./PreschoolManagementAPI";

export class preschoolHelper {
  static createPreschoolFromInput() {
    let preschoolName = <HTMLInputElement>(
      document.getElementById("preschoolAppendName")
    );
    let preschoolPrice = <HTMLInputElement>(
      document.getElementById("preschoolAppendPrice")
    );
    let preschoolRegistrationDate = <HTMLInputElement>(
      document.getElementById("preschoolAppendDate")
    );

    let newPreschool = new Preschool(preschoolName.value, preschoolRegistrationDate.value, 
      Number(preschoolPrice.value), Database.preschools.length+1);
    PreschoolManagementAPI.createPreschoolWithAPI(newPreschool);

    /*database.preschools.push({
      PreschoolName: preschoolName.value,
      Price: Number(preschoolPrice.value),
      EndOfEarlyRegistrationDate: preschoolRegistrationDate.value
    });*/
  }

  static editPreschoolFromInput(preschool: IPreschool) {
    let preschoolName = <HTMLInputElement>(
      document.getElementById("preschoolEditName")
    );
    let preschoolPrice = <HTMLInputElement>(
      document.getElementById("preschoolEditPrice")
    );
    let preschoolRegistrationDate = <HTMLInputElement>(
      document.getElementById("preschoolEditDate")
    );

    let indexOfPreschool = Database.preschools.indexOf(preschool);
    let newPreschool = new Preschool(preschoolName.value, preschoolRegistrationDate.value, 
      Number(preschoolPrice.value),indexOfPreschool+1);
    PreschoolManagementAPI.editPreschoolWithAPI(newPreschool,indexOfPreschool+1);
   /* database.preschools[indexOfPreschool] = {
      PreschoolName: preschoolName.value,
      Price: Number(preschoolPrice.value),
      EndOfEarlyRegistrationDate: preschoolRegistrationDate.value
    };*/
  }
}
