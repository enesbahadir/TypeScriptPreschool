import { DiscountType, OrganizationName, UserType } from "./enum/types";
import { database } from "./database";
import { IDiscount } from "./interface/IDiscount";

/**
 * Sistemde giriş yapılacak olan formların oluşturulduğu sınıftır.
 */
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
  static createOrganizationNameSelectList(myOrganizationParent, id, discount?) {
    let selectOrganizationList = document.createElement("select");
    selectOrganizationList.id = "organizationSelect-" + id;
    selectOrganizationList.innerHTML = `<option value="none" selected disabled hidden> 
          Lütfen Çalışılan Kurumu Seçiniz`;
    myOrganizationParent.appendChild(selectOrganizationList);
    debugger;
    for (let i in OrganizationName) {
      if (isNaN(Number(i))) {
        let option = document.createElement("option");
        option.text = i;
        selectOrganizationList.appendChild(option);
        if (discount) {
          if (discount.OrganizationName == i) {
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
 * Yeni indirim ekleme için gerekli bilgilerin istendiği formunu oluşturur, 
 * <form>
		<div class="fields">
      <div class="field"> ... html yapısını kullanır.
 */
  static createAppendDiscountForm() {
    let discountAppendParent = document.getElementById("discountAppendFormDiv"); // formun oluşturulacağı div
    let discountAppendHeader = document.createElement("header");
    discountAppendHeader.innerHTML =
      "<header> <h3> İndirim Ekleme Tablosu </h3> </header>";
    let discountAppendForm = document.createElement("form");
    discountAppendForm.id = "discountAppendForm";
    let discountAppendFieldsDiv = document.createElement("div"); // her bir input satırının toplanacağı div, fields
    discountAppendFieldsDiv.className = "fields";

    let discountNameInputFieldDiv = document.createElement("div"); // indirim isminin istendiği div, field
    discountNameInputFieldDiv.className = "field";

    let discountAppendNameLabel = <HTMLElement>document.createElement("p");
    discountAppendNameLabel.innerText = "İndirim İsmi";
    let discountAppendNameInput = <HTMLInputElement>(
      document.createElement("input")
    );
    discountAppendNameInput.type = "text";
    discountAppendNameInput.id = "discountAppend-discountName";

    discountNameInputFieldDiv.appendChild(discountAppendNameLabel);
    discountNameInputFieldDiv.appendChild(discountAppendNameInput);
    discountAppendFieldsDiv.appendChild(discountNameInputFieldDiv);

    formHelper.createPreschoolCheckboxAndDiscountInput(discountAppendFieldsDiv);

    let discountTypePercentFieldDiv = document.createElement("div");
    discountTypePercentFieldDiv.className = "field half";
    let discountTypePercentRadio = <HTMLInputElement>(
      document.createElement("input")
    );
    discountTypePercentRadio.type = "radio";
    discountTypePercentRadio.name = "priority";
    discountTypePercentRadio.value = "PERCENTAGE";
    discountTypePercentRadio.id = "discount-append-percentage-radio";

    let discountTypePercentRadioLabel = document.createElement("label");
    discountTypePercentRadioLabel.setAttribute(
      "for",
      "discount-append-percentage-radio"
    );
    discountTypePercentRadioLabel.innerText = "Yüzde";

    let discountTypeAmountFieldDiv = document.createElement("div");
    discountTypeAmountFieldDiv.className = "field half";

    let discountTypeAmountRadio = <HTMLInputElement>(
      document.createElement("input")
    );
    discountTypeAmountRadio.type = "radio";
    discountTypeAmountRadio.name = "priority";
    discountTypeAmountRadio.value = "AMOUNT";
    discountTypeAmountRadio.id = "discount-append-amount-radio";

    let discountTypeAmountRadioLabel = document.createElement("label");
    discountTypeAmountRadioLabel.setAttribute(
      "for",
      "discount-append-amount-radio"
    );
    discountTypeAmountRadioLabel.innerText = "Miktar";

    discountTypePercentFieldDiv.appendChild(discountTypePercentRadio);
    discountTypePercentFieldDiv.appendChild(discountTypePercentRadioLabel);
    discountTypeAmountFieldDiv.appendChild(discountTypeAmountRadio);
    discountTypeAmountFieldDiv.appendChild(discountTypeAmountRadioLabel);

    discountAppendFieldsDiv.appendChild(discountTypePercentFieldDiv);
    discountAppendFieldsDiv.appendChild(discountTypeAmountFieldDiv);

    formHelper.createUserTypeCheckBox(discountAppendFieldsDiv);

    let discountOrganizationFieldDiv = document.createElement("div");
    discountOrganizationFieldDiv.className = "field";
    discountOrganizationFieldDiv.id = "discountOrganizationFieldDiv";

    formHelper.createOrganizationNameSelectList(
      discountOrganizationFieldDiv,
      "discountAppend"
    );
    discountAppendFieldsDiv.appendChild(discountOrganizationFieldDiv);

    discountAppendForm.appendChild(discountAppendFieldsDiv);
    discountAppendParent.appendChild(discountAppendHeader);
    discountAppendForm.innerHTML += `<div class="field ">
									<ul class="actions stacked ">
										<li><a class="button fit" id="appendDiscount">İndirim
												Ekle</a></li>
									</ul>
								</div>`;

    discountAppendParent.appendChild(discountAppendForm);
  }
  /**
   * Yeni indirim ekleme tablosunda indirimin ekleneceği anaokullarını ve miktarlarını checkbox ve text input olarak dinanik olarak doldurur.
   */
  static createPreschoolCheckboxAndDiscountInput(parentDiv, discount?) {
    for (let i = 0; i < database.preschools.length; i++) {
      let div1 = document.createElement("div");
      div1.className = "field half";

      let option = <HTMLInputElement>document.createElement("input");
      option.type = "checkbox";
      option.id = "discountAppendPreschoolCheckbox-" + i.toString();
      option.name = database.preschools[i].PreschoolName;

      let label = document.createElement("label");
      label.setAttribute("for", option.id);
      let labelText = document.createTextNode(
        database.preschools[i].PreschoolName
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
            database.preschools[i].PreschoolName
          )
        ) {
          option.defaultChecked = true;
          let index = discount.PreschoolNamesAndTheirDiscounts.indexOf(
            database.preschools[i].PreschoolName
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

  static editDiscountForm(discount: IDiscount) {
    let discountEditParent = document.getElementById("discountEditFormDiv");
    let discountEditHeader = document.createElement("header");
    discountEditHeader.innerHTML =
      "<header> <h3> İndirim Düzenleme Tablosu </h3> </header>";
    let discountEditForm = document.createElement("form");
    discountEditForm.id = "discountEditForm";
    let discountEditFieldsDiv = document.createElement("div"); // her bir input satırının toplanacağı div, fields
    discountEditFieldsDiv.className = "fields";

    let discountNameInputFieldDiv = document.createElement("div"); // indirim isminin istendiği div, field
    discountNameInputFieldDiv.className = "field";

    let discountEditNameLabel = <HTMLElement>document.createElement("p");
    discountEditNameLabel.innerText = "İndirim İsmi";
    debugger;
    let discountEditNameInput = <HTMLInputElement>(
      document.createElement("input")
    );
    discountEditNameInput.type = "text";
    discountEditNameInput.id = "discountEdit-discountName";
    discountEditNameInput.defaultValue = discount.DiscountName;

    discountNameInputFieldDiv.appendChild(discountEditNameLabel);
    discountNameInputFieldDiv.appendChild(discountEditNameInput);
    discountEditFieldsDiv.appendChild(discountNameInputFieldDiv);

    formHelper.createPreschoolCheckboxAndDiscountInput(
      discountEditFieldsDiv,
      discount
    );

    let discountTypePercentFieldDiv = document.createElement("div");
    discountTypePercentFieldDiv.className = "field half";
    let discountTypePercentRadio = <HTMLInputElement>(
      document.createElement("input")
    );
    discountTypePercentRadio.type = "radio";
    discountTypePercentRadio.name = "priority";
    discountTypePercentRadio.value = "PERCENTAGE";
    discountTypePercentRadio.id = "discount-Edit-percentage-radio";
    if (discount.DiscountType == DiscountType.PERCENTAGE)
      discountTypePercentRadio.defaultChecked = true;

    let discountTypePercentRadioLabel = document.createElement("label");
    discountTypePercentRadioLabel.setAttribute(
      "for",
      "discount-Edit-percentage-radio"
    );
    discountTypePercentRadioLabel.innerText = "Yüzde";

    let discountTypeAmountFieldDiv = document.createElement("div");
    discountTypeAmountFieldDiv.className = "field half";

    let discountTypeAmountRadio = <HTMLInputElement>(
      document.createElement("input")
    );
    discountTypeAmountRadio.type = "radio";
    discountTypeAmountRadio.name = "priority";
    discountTypeAmountRadio.value = "AMOUNT";
    discountTypeAmountRadio.id = "discount-Edit-amount-radio";

    let discountTypeAmountRadioLabel = document.createElement("label");
    discountTypeAmountRadioLabel.setAttribute(
      "for",
      "discount-Edit-amount-radio"
    );
    discountTypeAmountRadioLabel.innerText = "Miktar";

    if (discount.DiscountType == DiscountType.AMOUNT)
      discountTypeAmountRadio.defaultChecked = true;

    discountTypePercentFieldDiv.appendChild(discountTypePercentRadio);
    discountTypePercentFieldDiv.appendChild(discountTypePercentRadioLabel);
    discountTypeAmountFieldDiv.appendChild(discountTypeAmountRadio);
    discountTypeAmountFieldDiv.appendChild(discountTypeAmountRadioLabel);

    discountEditFieldsDiv.appendChild(discountTypePercentFieldDiv);
    discountEditFieldsDiv.appendChild(discountTypeAmountFieldDiv);

    formHelper.createUserTypeCheckBox(discountEditFieldsDiv, discount);

    let discountOrganizationFieldDiv = document.createElement("div");
    discountOrganizationFieldDiv.className = "field";
    discountOrganizationFieldDiv.id = "discountOrganizationFieldDiv";

    formHelper.createOrganizationNameSelectList(
      discountOrganizationFieldDiv,
      "discountEdit", 
      discount
    );
    discountEditFieldsDiv.appendChild(discountOrganizationFieldDiv);

    discountEditForm.appendChild(discountEditFieldsDiv);
    discountEditParent.appendChild(discountEditHeader);
    discountEditForm.innerHTML += `<div class="field ">
									<ul class="actions stacked ">
										<li><a class="button fit" id="EditDiscount">İndirim
												Ekle</a></li>
									</ul>
								</div>`;

    discountEditParent.appendChild(discountEditForm);
  }
}
