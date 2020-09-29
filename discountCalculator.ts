import { database } from "./database";
import { IDiscount } from "./IDiscount";
import { IUser } from "./IUser";
import { OrganizationName } from "./types";

export class DiscountCalculator {
  /**
   * Kullanıcı ve Anaokulu nesneleri alarak indirim hesaplamasını yapan metod
   */
  static calculateDiscount(user: IUser, preschool: IPreschool) {
    debugger;
    let discount = 0;
    database.discounts.forEach(function(value, index, array) {
      discount += <number>(
        DiscountCalculator.calculateEarlyRegistrationDiscount(value, preschool)
      );
      discount += <number>(
        DiscountCalculator.calculateOrganizationDiscount(value, user, preschool)
      );
      discount += <number>(
        DiscountCalculator.calculateUserTypeDiscount(value, user, preschool)
      );
    });
    return discount;
  }
  /**
   * @TODO erken kayıt indirim kontrolü
   */
  static calculateEarlyRegistrationDiscount(
    discount: IDiscount,
    preschool: IPreschool
  ) {
    if (discount.DiscountName == "Erken Kayıt İndirimi") {
      let index = discount.PreschoolNamesAndTheirDiscounts.indexOf(
        preschool.PreschoolName
      );
      return discount.PreschoolNamesAndTheirDiscounts[index + 1];
      if(index < 0) return 0;
    }
    return 0;
  }

  static calculateUserTypeDiscount(
    discount: IDiscount,
    user: IUser,
    preschool: IPreschool
  ) {
    if (
      discount.UserTypes.length == 1 &&
      discount.UserTypes.includes(user.TypeOfUser) &&
      discount.OrganizationName == OrganizationName.NONE
    ) {
      let index = discount.PreschoolNamesAndTheirDiscounts.indexOf(
        preschool.PreschoolName
      );
      if(index < 0) return 0;
      return discount.PreschoolNamesAndTheirDiscounts[index + 1];
    }

    return 0;
  }

  static calculateOrganizationDiscount(
    discount: IDiscount,
    user: IUser,
    preschool: IPreschool
  ) {
    if (
      discount.OrganizationName != OrganizationName.NONE &&
      discount.OrganizationName == user.OrganizationOfUser && 
      discount.UserTypes.includes(user.TypeOfUser)
    ) {
      let index = discount.PreschoolNamesAndTheirDiscounts.indexOf(
        preschool.PreschoolName
      );
      if(index < 0) return 0;
      return discount.PreschoolNamesAndTheirDiscounts[index + 1];
    }
    return 0;
  }

  calculatePriceWithDiscount(
    percent: number,
    amount: number,
    preschool: IPreschool
  ) {
    return preschool.Price - (preschool.Price * percent) / 100 - amount;
  }
}
