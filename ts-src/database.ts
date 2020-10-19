import { IDiscount } from "./interface/IDiscount";
import { IPreschool } from "./interface/IPreschool";
import { DiscountType, UserType, OrganizationName } from "./enum/types";
import { PreschoolListFromAPI } from "./PreschoolListFromAPI";
import { DiscountListFromAPI } from "./DiscountListFromAPI";
import { DiscountValues } from "./model/DiscountValues";

/**
 * Sistemde kullanıcak olan Anaokulu ve İndirim listelerinin saklandığı ve oluşturulduğu sınıf
 */
export class Database {
  static preschools: Array<IPreschool> = new Array();
  static discounts: Array<IDiscount> = new Array();
  static discountValues : Array<DiscountValues> = new Array();

  /**
   * Sistemde kullanılacak olan Anaokulu Listesinin default değerlerini listeye ekler.
   */
  static createPreschoolList() {
    this.preschools = PreschoolListFromAPI.getPreschoolsUsingXhr();
    /*this.preschools.push(
      {
        PreschoolName: "M Lalebahçesi",
        Price: 1200,
        EndOfEarlyRegistrationDate: "11/01/2020"
      },
      {
        PreschoolName: "Y Lalebahçesi",
        Price: 1000,
        EndOfEarlyRegistrationDate: "09/01/2020"
      }
    );*/
    return this.preschools;
  }
  /**
   *Sistemde kullanılacak olan İndirim Listesinin default değerlerini listeye ekler.
   */
  static createDiscountList() {
    let discountListFromAPI = new DiscountListFromAPI (); 
    this.discounts = discountListFromAPI.getDiscountsUsingXhr();
    /*
        this.discounts.push(
          {
            DiscountName: "Erken Kayıt İndirimi",
            DiscountType: DiscountType.PERCENTAGE,
            UserTypes: [UserType.PERSONEL, UserType.IHVAN, UserType.STANDART],
            OrganizationName: OrganizationName.NONE,
            PreschoolNamesAndTheirDiscounts: [
              "M Lalebahçesi",
              20,
              "Y Lalebahçesi",
              25
            ]
          },

          {
            DiscountName: "Personel İndirimi",
            DiscountType: DiscountType.PERCENTAGE,
            UserTypes: [UserType.PERSONEL],
            OrganizationName: OrganizationName.NONE,
            PreschoolNamesAndTheirDiscounts: [
              "M Lalebahçesi",
              50,
              "Y Lalebahçesi",
              50
            ]
          },
          {
            DiscountName: "Ihvan İndirimi",
            DiscountType: DiscountType.PERCENTAGE,
            UserTypes: [UserType.IHVAN],
            OrganizationName: OrganizationName.NONE,
            PreschoolNamesAndTheirDiscounts: [
              "M Lalebahçesi",
              5,
              "Y Lalebahçesi",
              5
            ]
          },

          {
            DiscountName: "Sağlık İndirimi",
            DiscountType: DiscountType.PERCENTAGE,
            UserTypes: [UserType.IHVAN, UserType.STANDART],
            OrganizationName: OrganizationName.SAGLIK,
            PreschoolNamesAndTheirDiscounts: ["M Lalebahçesi", 10]
          },

          {
            DiscountName: "Anadolu İndirimi",
            DiscountType: DiscountType.AMOUNT,
            UserTypes: [UserType.IHVAN, UserType.STANDART],
            OrganizationName: OrganizationName.ANADOLU,
            PreschoolNamesAndTheirDiscounts: ["Y Lalebahçesi", 100]
          }
        );
    */
    return this.discounts;
  }

  static createDiscountValuesList()
  {
     let discountListFromAPI = new DiscountListFromAPI (); 
    this.discountValues = discountListFromAPI.getDiscountValuesUsingXhr();
    return this.discountValues;
  }
}
