import { DiscountType, OrganizationName, UserType } from "./enum/types";
import { database } from "./database";

export class formHelper {
  /**
   * İndirim hesaplama bölümünde kullanıcının, indirimin hesaplayanacağı anaokulunu dinamik olarak preschoolList üzerinden
   * dropdown olarak dolduran metod.
   */
  static createPreschoolSelectList(myParent) {
    let selectList = document.createElement("select");
    selectList.id = "myPreschoolSelect";
    selectList.innerHTML = `<option value="none" selected disabled hidden required> 
          Lütfen Anaokulu Seçiniz`;
    myParent.appendChild(selectList);

    for (let i = 0; i < database.preschools.length; i++) {
      let option = document.createElement("option");
      option.value = i.toString();
      option.text = database.preschools[i].PreschoolName;
      selectList.appendChild(option);
    }
  }

  /**
   * İndirim hesaplama bölümünde kullanıcının, indirimin hesaplayanacağı kurumun dinamik olarak enum sınıfları içerisindeki OrganizationName'den dropdown olarak dolduran metod.
   */
  static createOrganizationNameSelectList(myOrganizationParent, id) {
    let selectOrganizationList = document.createElement("select");
    selectOrganizationList.id = "organizationSelect-" + id;
    selectOrganizationList.innerHTML = `<option value="none" selected disabled hidden> 
          Lütfen Çalışılan Kurumu Seçiniz`;
    myOrganizationParent.appendChild(selectOrganizationList);

    for (let i in OrganizationName) {
      if (isNaN(Number(i))) {
        let option = document.createElement("option");
        option.text = i;
        selectOrganizationList.appendChild(option);
      }
    }
  }

  /**
 *
 */
static createUserTypeCheckBox(parent) {
  let div = document.createElement("div");
  div.className = "field third";

  let option = <HTMLInputElement>document.createElement("input");
  option.type = "checkbox";
  option.id = "user-type-personel";
  option.name = "user-type-personel";

  let label = document.createElement("label");
  label.setAttribute("for", option.id);
  let labelText = document.createTextNode("Personel");
  label.appendChild(labelText);
  div.appendChild(option);
  div.appendChild(label);

  let div2 = document.createElement("div");
  div2.className = "field third";

  let option2 = <HTMLInputElement>document.createElement("input");
  option2.type = "checkbox";
  option2.id = "user-type-ihvan";
  option2.name = "user-type-ihvan";

  let label2 = document.createElement("label");
  label2.setAttribute("for", option2.id);
  let labelText2 = document.createTextNode("Ihvan");
  label2.appendChild(labelText2);
  div2.appendChild(option2);
  div2.appendChild(label2);

  let div3 = document.createElement("div");
  div3.className = "field third";

  let option3 = <HTMLInputElement>document.createElement("input");
  option3.type = "checkbox";
  option3.id = "user-type-standart";
  option3.name = "user-type-standart";

  let label3 = document.createElement("label");
  label3.setAttribute("for", option3.id);
  let labelText3 = document.createTextNode("Standart");
  label3.appendChild(labelText3);
  div3.appendChild(option3);
  div3.appendChild(label3);

  parent.appendChild(div);
  parent.appendChild(div2);
  parent.appendChild(div3);
}
}
