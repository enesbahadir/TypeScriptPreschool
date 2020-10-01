import { database } from "./database";
import { IDiscount } from "./interface/IDiscount";
import { IUser } from "./interface/IUser";
import { DiscountType, OrganizationName } from "./enum/types";

/**
 * İndirim hesaplamalarının yapıldığı sınıftır.
 */
export class DiscountCalculator {
  /**
   * Kullanıcı ve Anaokulu nesneleri alarak indirim hesaplamasını, indirim tipi olan yüzde ve miktar cinsinden hesaplamasını yapan metod databse sınıfıda tanımlı discount listesini kullanır.
   */
  static calculateDiscount(user: IUser, preschool: IPreschool) {
    debugger;
    let percent : number = 0 ;
    let amount : number = 0;
    database.discounts.forEach(function(value, index, array) {
      switch (value.DiscountType) {
        case DiscountType.PERCENTAGE: {
          percent += DiscountCalculator.executeCalculateMethods(
            user,
            preschool,
            value
          );
          break;
        }
        case DiscountType.AMOUNT: {
          amount += DiscountCalculator.executeCalculateMethods(
            user,
            preschool,
            value
          );
          break;
        }
      }
    });
    return DiscountCalculator.calculatePriceWithDiscount(
      percent,
      amount,
      preschool
    );
  }
  /**
   * İndirim hesaplaması yapan 3 metod calculateEarlyRegistrationDiscount, calculateOrganizationDiscount, calculateUserTypeDiscount
   * yönlendirme yaparak toplam sonucu döner
   */
  static executeCalculateMethods(
    user: IUser,
    preschool: IPreschool,
    discount: IDiscount
  ) {
    let result = 0;

    result += Number(
      DiscountCalculator.calculateEarlyRegistrationDiscount(discount, preschool)
    );
    result += Number(
      DiscountCalculator.calculateOrganizationDiscount(
        discount,
        user,
        preschool
      )
    );
    result += Number(
      DiscountCalculator.calculateUserTypeDiscount(discount, user, preschool)
    );

    return result;
  }
  /**
   * Erken kayıt indirimini hesaplar, erken kayıt bilgisi kullanıcının seçtği anaokulundan gelmektedir.
   */
  static calculateEarlyRegistrationDiscount(
    discount: IDiscount,
    preschool: IPreschool
  ) {
    if (
      DiscountCalculator.calculateEarlyRegistration(preschool) &&
      discount.DiscountName == "Erken Kayıt İndirimi"
    ) {
      let index = discount.PreschoolNamesAndTheirDiscounts.indexOf(
        preschool.PreschoolName
      );
      return Number( discount.PreschoolNamesAndTheirDiscounts[index + 1]);
      
    }
    return Number(0);
  }
  /**
   * Kişi tip indirimni hesaplar, kişiye özel indirim çalışılan kurum seçilmeden ve tek bir kişi tipi seçilmiş olduğunda hesaplamaktadır.
   */
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
      if (index < 0) return Number(0);
      return Number( discount.PreschoolNamesAndTheirDiscounts[index + 1]);
    }

    return Number(0);
  }
  /**
   * Çalışılan kurum indirimini hesaplar, Kurumun NONE olmaması, kullanıcının girdiği kurum ile indirimin kurumunun aynı olması ve indirim listesinde kurumun bulunması kontrollerini sağlar.
   */
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
      if (index < 0) return Number(0);
      return Number( discount.PreschoolNamesAndTheirDiscounts[index + 1]);
    }
    return Number(0);
  }
  /**
   * Yüzde ve miktar olarak hesaplanan indirimlerin anaokulu ücretine uygulanmış halini dönen metod
   */
  static calculatePriceWithDiscount(
    percent: number,
    amount: number,
    preschool: IPreschool
  ) {
    return Number(preschool.Price - (preschool.Price * percent) / 100 - amount);
  }

  /**
   * Anaokulunun erken kayıt tarihini bugün ile kıyaslayarak 
   */
  static calculateEarlyRegistration(preschool: IPreschool) {
    let preschoolEarltRegistrationDate = new Date(
      preschool.EndOfEarlyRegistrationDate
    );
    let now = new Date();
    return preschoolEarltRegistrationDate > now;
  }
}
