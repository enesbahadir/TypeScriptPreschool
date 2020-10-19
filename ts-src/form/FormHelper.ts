import { DiscountType, OrganizationName, UserType } from "./../enum/Types";
import { Database } from "./../data/Database";
import { IDiscount } from "./../interface/IDiscount";
import { IPreschool } from "./../interface/IPreschool";
import { DiscountHelper } from "./../model/DiscountHelper";
import { TableHelper } from "./../table/TableHelper";
import { PreschoolHelper } from "./../model/PreschoolHelper";

/**
 * Sistemde giriş yapılacak olan formların oluşturulduğu sınıftır.
 */
export class FormHelper {
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

    for (let i = 0; i < Database.preschools.length; i++) {
      let option = document.createElement("option");
      option.value = i.toString();
      option.text = Database.preschools[i].PreschoolName;
      selectList.appendChild(option);
    }
  }

  /**
   * İndirim hesaplama bölümünde kullanıcının, indirimin hesaplayanacağı kurumun dinamik olarak enum sınıfları içerisindeki OrganizationName'den dropdown olarak dolduran metod.
   */
  static createOrganizationNameSelectList(myOrganizationParent, id, discount?) {
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

        if (discount) {
          let org = discount.OrganizationName;
          let dis;
          switch (org) {
            case 0: {
              dis = "SAGLIK";
              break;
            }
            case 1: {
              dis = "ANADOLU";
              break;
            }
            case 2: {
              dis = "NONE";
              break;
            }
          }
          if (dis === i) {
            option.defaultSelected = true;
          }
        }
      }
    }
  }

  /**
   * Kişi tiplerini checkbox olarak tek satırda 3 hücre olacak şekilde pararmetre olarak alınan parent nesnesine child olarak ekler.
   */
  static createUserTypeCheckBox(parent, discount?) {
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

    if (discount) {
      if (discount.UserTypes.includes(UserType.PERSONEL))
        option.defaultChecked = true;
      if (discount.UserTypes.includes(UserType.IHVAN))
        option2.defaultChecked = true;
      if (discount.UserTypes.includes(UserType.STANDART))
        option3.defaultChecked = true;
    }

    parent.appendChild(div);
    parent.appendChild(div2);
    parent.appendChild(div3);
  }
  
  /**
   * Yeni indirim ekleme tablosunda indirimin ekleneceği anaokullarını ve miktarlarını checkbox ve text input olarak dinanik olarak doldurur.
   */
  static createPreschoolCheckboxAndDiscountInput(parentDiv, discount?) {
    for (let i = 0; i < Database.preschools.length; i++) {
      let div1 = document.createElement("div");
      div1.className = "field half";

      let option = <HTMLInputElement>document.createElement("input");
      option.type = "checkbox";
      option.id = "discountAppendPreschoolCheckbox-" + i.toString();
      option.name = Database.preschools[i].PreschoolName;
      option.value = Database.preschools[i].Id.toString();

      let label = document.createElement("label");
      label.setAttribute("for", option.id);
      let labelText = document.createTextNode(
        Database.preschools[i].PreschoolName
      );
      label.appendChild(labelText);
      div1.appendChild(option);
      div1.appendChild(label);

      let div2 = document.createElement("div");
      div2.className = "field half";
      let discountAppendPreschoolInput = <HTMLInputElement>(
        document.createElement("input")
      );
      discountAppendPreschoolInput.type = "text";
      discountAppendPreschoolInput.id =
        "discountAppendPreschoolText-" + i.toString();

      if (discount) {
        if (
          discount.PreschoolNamesAndTheirDiscounts.includes(
            Database.preschools[i].PreschoolName
          )
        ) {
          option.defaultChecked = true;
          let index = discount.PreschoolNamesAndTheirDiscounts.indexOf(
            Database.preschools[i].PreschoolName
          );
          discountAppendPreschoolInput.defaultValue =
            discount.PreschoolNamesAndTheirDiscounts[index + 1];
        }
      }

      div2.appendChild(discountAppendPreschoolInput);

      parentDiv.appendChild(div1);
      parentDiv.appendChild(div2);
    }
  }

  static createUserInputForm() {
    const userInputDiv: HTMLElement = document.getElementById("userInputDiv");
    if (!document.getElementById("userInputForm"))
      userInputDiv.innerHTML = `					
          <form method="post" action="#" id = "userInputForm">
						<div class="fields">
							<div class="field">
								<label for="name">Kullanıcı İsmi</label>
								<input type="text" name="name" id="userName" value="" required/>
                    </div>
								<div class="field" id="selectField">
									<label for="preschool">Anaokulu</label>
								</div>
								<div class="field" id="selectOrganizationField">
									<label for="orgazationName">Çalışılan Kurum</label>
								</div>
								<div class="field third" id="userTypeRadio">
									<input type="radio" id="user-personel" name="priority" value="PERSONEL" checked />
									<label for="user-personel">Personel</label>
								</div>
								<div class="field third">
									<input type="radio" id="user-ihvan" name="priority" value = "IHVAN" />
									<label for="user-ihvan">Ihvan</label>
								</div>
								<div class="field third">
									<input type="radio" id="user-standart" name="priority" value = "STANDART" />
									<label for="user-standart">Standart</label>
								</div>
								<div class="field ">
									<ul class="actions stacked " id = "discountCalculateButtonUl">
										<li><a href="#discount-result" class="button fit" id="calculate">İndirim
												Hesapla</a></li>
									</ul>
								</div>
								<div class="field ">
									<header id="discount-result">
									</header>
								</div>
					</form>`;
  }

}
