import { IDiscount } from "./IDiscount";
import { DiscountType, UserType, OrganizationName } from "./types";

/**
 * Sistemde kullanıcak olan Anaokulu ve İndirim listelerinin saklandığı ve oluşturulduğu sınıf
 */
export class database {
  preschools: Array<IPreschool> = new Array();
  discounts: Array<IDiscount> = new Array();

  createPreschoolList() {
    this.preschools.push(
      {
        PreschoolName: "M Lalebahçesi",
        Price: 1200,
        EndOfEarlyRegistrationDate: "01/10/2020"
      },
      {
        PreschoolName: "Y Lalebahçesi",
        Price: 1000,
        EndOfEarlyRegistrationDate: "01/09/2020"
      }
    );
    return this.preschools;
  }

  createDiscountList() {
    this.discounts.push(
      {
        DiscountName: "Erken Kayıt İndirimi",
        DiscountType: DiscountType.PERCENTAGE,
        UserTypes: [UserType.PERSONEL, UserType.IHVAN, UserType.STANDART],
        OrganizationName: OrganizationName.NONE,
        PreschoolNamesAndTheirDiscounts: [
          "M Lalebahçesi",20,
          "Y Lalebahçesi",20
        ]
      },

      {
        DiscountName: "Personel İndirimi",
        DiscountType: DiscountType.PERCENTAGE,
        UserTypes: [UserType.PERSONEL],
        OrganizationName: OrganizationName.NONE,
        PreschoolNamesAndTheirDiscounts: [
          "M Lalebahçesi",50,
          "Y Lalebahçesi",50
        ]
      },
      {
        DiscountName: "Ihvan İndirimi",
        DiscountType: DiscountType.PERCENTAGE,
        UserTypes: [UserType.IHVAN],
        OrganizationName: OrganizationName.NONE,
        PreschoolNamesAndTheirDiscounts: [
          "M Lalebahçesi",5,
          "Y Lalebahçesi",5
        ]
      },

      {
        DiscountName: "Sağlık İndirimi",
        DiscountType: DiscountType.PERCENTAGE,
        UserTypes: [UserType.IHVAN, UserType.STANDART],
        OrganizationName: OrganizationName.SAGLIK,
        PreschoolNamesAndTheirDiscounts: [
          "M Lalebahçesi",10,
          "Y Lalebahçesi",10
        ]
      },

      {
        DiscountName: "Anadolu İndirimi",
        DiscountType: DiscountType.AMOUNT,
        UserTypes: [UserType.IHVAN, UserType.STANDART],
        OrganizationName: OrganizationName.ANADOLU,
        PreschoolNamesAndTheirDiscounts: [
          "M Lalebahçesi",100,
          "Y Lalebahçesi",100
        ]
      }

    );
    return this.discounts;
  }
}
