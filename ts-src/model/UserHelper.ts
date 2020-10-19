import { Database } from "./../data/Database";
import { DiscountCalculator } from "./../DiscountCalculator";
import { OrganizationName, UserType } from "./../enum/Types";
import { User } from "./User";

export class UserHelper {
  /**
   * İndirim hesaplama bölümünde kullanıcının girdiği bilgiler doğrultusunda User nesnesi oluşturan metod
   */
  static createUserFromUserInput() {
    const userName = <HTMLInputElement>document.getElementById("userName");
    const preschoolChoose = <HTMLInputElement>(
      document.getElementById("myPreschoolSelect")
    );
    const organizationChooseInput = <HTMLInputElement>(
      document.getElementById("organizationSelect-" + "userInput")
    );
    let organizationChoose;
    switch (organizationChooseInput.value) {
      case "ANADOLU": {
        organizationChoose = OrganizationName.ANADOLU;
        break;
      }
      case "SAGLIK": {
        organizationChoose = OrganizationName.SAGLIK;
        break;
      }
      default: {
        organizationChoose = OrganizationName.NONE;
      }
    }

    let userTypeChoose;
    let userPersonelRadio = <HTMLInputElement>(
      document.getElementById("user-personel")
    );
    if (userPersonelRadio.checked) userTypeChoose = UserType.PERSONEL;

    userPersonelRadio = <HTMLInputElement>document.getElementById("user-ihvan");
    if (userPersonelRadio.checked) userTypeChoose = UserType.IHVAN;

    userPersonelRadio = <HTMLInputElement>document.getElementById("user-standart");
    if (userPersonelRadio.checked) userTypeChoose = UserType.STANDART;

    let user = new User(userName.value, userTypeChoose, organizationChoose);
    let preschool = Database.preschools[preschoolChoose.value];
    let discount = DiscountCalculator.calculateDiscount(user, preschool);
    const discountResult: HTMLElement = document.getElementById(
      `discount-result`
    );
    if(discount == NaN || discount == null)
    {
      discountResult.innerHTML =
      `<p>` +
      preschool.PreschoolName +
      ` Anaokulunun ücreti ` +
      preschool.Price +
      ` TL'dir. Sizin ödemeniz gereken ücret</p>
                    <h3 >` +
      preschool.Price +
      ` TL</h3>`;
    }
     else
    discountResult.innerHTML =
      `<p>` +
      preschool.PreschoolName +
      ` Anaokulunun ücreti ` +
      preschool.Price +
      ` TL'dir. Sizin ödemeniz gereken ücret</p>
                    <h3 >` +
      discount +
      ` TL</h3>`;
      
  }
  
}
