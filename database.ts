import { DiscountType, UserType } from "./types";

export class database {
  createPreschoolList() {
    let preschools : Array<IPreschool> = [
      {PreschoolName : "M Lalebahçesi", Price : 1200, EndOfEarlyRegistrationDate : "01/10/2020"},
      {PreschoolName : "Y Lalebahçesi", Price : 1000, EndOfEarlyRegistrationDate : "01/09/2020"}
    ];
    return preschools;
  }

  createDiscountList() {
    const discounts = [
      {_discountName : "Erken Kayıt İndirimi", _discountType : DiscountType.PERCENTAGE, _userTypes : [UserType.PERSONEL, UserType.IHVAN, UserType.STANDART], _preschoolNamesAndTheirDiscounts : [["Madenler Lalebahçesi"][50],["Yunus Emre Lalebahçesi"][50]] },
      {_discountName : "Ihvan Indirimi", _discountType : DiscountType.PERCENTAGE, _userTypes : [ UserType.IHVAN], _preschoolNamesAndTheirDiscounts : [["Madenler Lalebahçesi"][5],["Yunus Emre Lalebahçesi"][5]] },
      
    ];
  }


}