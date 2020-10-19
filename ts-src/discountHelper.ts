import { Database } from "./Database";
import { DiscountType, OrganizationName, UserType } from "./enum/types";
import { IDiscount } from "./interface/IDiscount";
import { IPreschool } from "./interface/IPreschool";
import { IDiscountValues } from "./interface/IDiscountValues";
import { Discount } from "./Discount";
import { DiscountManagementAPI } from "./DiscountManagementAPI";
import { DiscountValues } from "./model/DiscountValues";
import { preschoolHelper } from "./preschoolHelper";

/**
 * İndirim ekleme işleminin yapıldığı sınıftır.
 */
export class DiscountHelper {
  /**
   *  Kullanıcının girdiği bilgiler ile yeni indirim tanımlar. Yeni indirimi databse'de tutulan Anaokulu Listesine ekler.
   */
  static createDiscountFromInput() {
    let discountName = DiscountHelper.getDiscountName(
      "discountAppend-discountName"
    );
    let discountType = DiscountHelper.getdiscountType(
      "discount-append-percentage-radio"
    );
    let organizationName = DiscountHelper.getOrganizationName(
      "discountAppend"
    );
    let newDiscount = new Discount(discountName.value, discountType, DiscountHelper.getUserTypes(),
     organizationName, DiscountHelper.getpreschoolNamesAndTheirDiscounts());

    DiscountManagementAPI.createDiscountWithAPI(newDiscount);
     
    //alert("İndirim başarılı bir şekilde eklendi.");
     document
        .getElementById("discountAppendForm")
        .parentNode.removeChild(document.getElementById("discountAppendForm"));
      document
        .getElementById("discountAppendHeader")
        .parentNode.removeChild(document.getElementById("discountAppendHeader"));
  }

  static editDiscountFromInput(discount: IDiscount) {
    let discountName = DiscountHelper.getDiscountName(
      "discountEdit-discountName"
    );

    let preschoolNamesAndTheirDiscounts: Array<
      IDiscountValues
    > = DiscountHelper.getpreschoolNamesAndTheirDiscounts();

    let discountType = DiscountHelper.getdiscountType(
      "discount-Edit-percentage-radio"
    );

    let userTypes = DiscountHelper.getUserTypes();

    let organizationName: OrganizationName = DiscountHelper.getOrganizationName(
      "discountEdit"
    );

    let indexOfDiscount = Database.discounts.indexOf(discount);
   /* Database.discounts[indexOfDiscount] = {
      DiscountName: discountName.value,
      DiscountType: discountType,
      UserTypes: userTypes,
      OrganizationName: organizationName,
      PreschoolNamesAndTheirDiscounts: preschoolNamesAndTheirDiscounts
    }; 
    */
  }

  static getDiscountName(id) {
    return <HTMLInputElement>document.getElementById(id);
  }

  static getpreschoolNamesAndTheirDiscounts() {
    let discountValues : Array<IDiscountValues> = new Array();
    for (let i = 0; i < Database.preschools.length; i++) {
      let checkbox = <HTMLInputElement>(
        document.getElementById(
          "discountAppendPreschoolCheckbox-" + i.toString()
        )
      );
      if (!checkbox.checked) continue;
      else {
        let text = <HTMLInputElement>(
          document.getElementById("discountAppendPreschoolText-" + i.toString())
        );
        let tempDiscountValue : IDiscountValues = new DiscountValues(Database.discountValues.length+1, 
          preschoolHelper.getPreschoolWithId(Number(checkbox.value)),Number(text.value) );
        discountValues.push(
          DiscountManagementAPI.createDiscountValuesAPI(tempDiscountValue));
      }
    }
    return discountValues;
  }

  static getdiscountType(id) {
    let discountType;
    let discountTypeRadio = <HTMLInputElement>document.getElementById(id);
    if (discountTypeRadio.checked) {
      discountType = "PERCENTAGE";
    } else {
      discountType = "AMOUNT";
    }
    return discountType;
  }

  static getUserTypes() {
    let userTypes : Array<UserType> = new Array();
    let option = <HTMLInputElement>(
      document.getElementById("user-type-personel")
    );

    if (option.checked) userTypes.push(UserType.PERSONEL);
    option = <HTMLInputElement>document.getElementById("user-type-ihvan");
    if (option.checked) userTypes.push(UserType.IHVAN);
    option = <HTMLInputElement>document.getElementById("user-type-standart");
    if (option.checked) userTypes.push(UserType.IHVAN);
    return userTypes;
  }

  static getOrganizationName(id) {
    
    let organizationName: OrganizationName;
    let a = <HTMLInputElement>(
      document.getElementById("organizationSelect-" + id)
    );
    switch (a.value) {
      case "ANADOLU": {
        organizationName = OrganizationName.ANADOLU;
        break;
      }
      case "SAGLIK": {
        organizationName = OrganizationName.SAGLIK;
        break;
      }
      default: {
        organizationName = OrganizationName.NONE;
      }
    }
    return organizationName;
  }
}
