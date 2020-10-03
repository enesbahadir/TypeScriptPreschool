import { database } from "./database";
import { DiscountType, OrganizationName, UserType } from "./enum/types";
import { IDiscount } from "./interface/IDiscount";

/**
 * İndirim ekleme işleminin yapıldığı sınıftır.
 */
export class discountHelper {
  /**
   *  Kullanıcının girdiği bilgiler ile yeni indirim tanımlar. Yeni indirimi databse'de tutulan Anaokulu Listesine ekler.
   */
  static createDiscountFromInput() {
    let discountName = discountHelper.getDiscountName(
      "discountAppend-discountName"
    );
    let preschoolNamesAndTheirDiscounts: Array<
      string | number
    > = discountHelper.getpreschoolNamesAndTheirDiscounts();
    let discountType = discountHelper.getdiscountType(
      "discount-append-percentage-radio"
    );
    let userTypes: Array<UserType> = discountHelper.getUserTypes();
    let organizationName: OrganizationName = discountHelper.getOrganizationName(
      "discountAppend"
    );

    database.discounts.push({
      DiscountName: discountName.value,
      DiscountType: discountType,
      UserTypes: userTypes,
      OrganizationName: organizationName,
      PreschoolNamesAndTheirDiscounts: preschoolNamesAndTheirDiscounts
    });
    
    alert("İndirim başarılı bir şekilde eklendi.");
     document
        .getElementById("discountAppendForm")
        .parentNode.removeChild(document.getElementById("discountAppendForm"));
      document
        .getElementById("discountAppendHeader")
        .parentNode.removeChild(document.getElementById("discountAppendHeader"));
  }

  static editDiscountFromInput(discount: IDiscount) {
    let discountName = discountHelper.getDiscountName(
      "discountEdit-discountName"
    );

    let preschoolNamesAndTheirDiscounts: Array<
      string | number
    > = discountHelper.getpreschoolNamesAndTheirDiscounts();

    let discountType = discountHelper.getdiscountType(
      "discount-Edit-percentage-radio"
    );

    let userTypes = discountHelper.getUserTypes();

    let organizationName: OrganizationName = discountHelper.getOrganizationName(
      "discountEdit"
    );

    let indexOfDiscount = database.discounts.indexOf(discount);
    database.discounts[indexOfDiscount] = {
      DiscountName: discountName.value,
      DiscountType: discountType,
      UserTypes: userTypes,
      OrganizationName: organizationName,
      PreschoolNamesAndTheirDiscounts: preschoolNamesAndTheirDiscounts
    };
  }

  static getDiscountName(id) {
    return <HTMLInputElement>document.getElementById(id);
  }

  static getpreschoolNamesAndTheirDiscounts() {
    let preschoolNamesAndTheirDiscounts: Array<string | number> = new Array();
    for (let i = 0; i < database.preschools.length; i++) {
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
        preschoolNamesAndTheirDiscounts.push(checkbox.name, text.value);
      }
    }
    return preschoolNamesAndTheirDiscounts;
  }

  static getdiscountType(id) {
    let discountType;
    let discountTypeRadio = <HTMLInputElement>document.getElementById(id);
    if (discountTypeRadio.checked) {
      discountType = DiscountType.PERCENTAGE;
    } else {
      discountType = DiscountType.AMOUNT;
    }
    return discountType;
  }

  static getUserTypes() {
    let userTypes: Array<UserType> = new Array();
    let option = <HTMLInputElement>(
      document.getElementById("user-type-personel")
    );

    if (option.checked) userTypes.push(UserType.PERSONEL);
    option = <HTMLInputElement>document.getElementById("user-type-ihvan");
    if (option.checked) userTypes.push(UserType.IHVAN);
    option = <HTMLInputElement>document.getElementById("user-type-standart");
    if (option.checked) userTypes.push(UserType.STANDART);
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
