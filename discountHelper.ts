import { database } from "./database";
import { DiscountType, OrganizationName, UserType } from "./enum/types";

/**
 * İndirim ekleme işleminin yapıldığı sınıftır.
 */
export class discountHelper 
{
   /**
    *  Kullanıcının girdiği bilgiler ile yeni indirim tanımlar. Yeni indirimi databse'de tutulan Anaokulu Listesine ekler.
    */
static createDiscountFromInput() {
  let discountName = <HTMLInputElement>(
    document.getElementById("discountAppend-discountName")
  );

  let preschoolNamesAndTheirDiscounts: Array<string | number> = new Array();
  for (let i = 0; i < database.preschools.length; i++) {
    let checkbox = <HTMLInputElement>(
      document.getElementById("discountAppendPreschoolCheckbox-" + i.toString())
    );
    if (!checkbox.checked) continue;
    else {
      let text = <HTMLInputElement>(
        document.getElementById("discountAppendPreschoolText-" + i.toString())
      );
      preschoolNamesAndTheirDiscounts.push(checkbox.name, text.value);
    }
  }

  let discountType;
  let discountTypeRadio = <HTMLInputElement>(
    document.getElementById("discount-append-percentage-radio")
  );
  if (discountTypeRadio.checked) {
    discountType = DiscountType.PERCENTAGE;
  } else {
    discountType = DiscountType.AMOUNT;
  }

  let userTypes: Array<UserType> = new Array();
  let option = <HTMLInputElement>document.getElementById("user-type-personel");
  if (option.checked) userTypes.push(UserType.PERSONEL);
  option = <HTMLInputElement>document.getElementById("user-type-ihvan");
  if (option.checked) userTypes.push(UserType.IHVAN);
  option = <HTMLInputElement>document.getElementById("user-type-standart");
  if (option.checked) userTypes.push(UserType.STANDART);

  let organizationName: OrganizationName;
  let a = <HTMLInputElement>(
    document.getElementById("organizationSelect-" + "discountAppend")
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
  database.discounts.push({
    DiscountName: discountName.value,
    DiscountType: discountType,
    UserTypes: userTypes,
    OrganizationName: organizationName,
    PreschoolNamesAndTheirDiscounts: preschoolNamesAndTheirDiscounts
  });
}
}