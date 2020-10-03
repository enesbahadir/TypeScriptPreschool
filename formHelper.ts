import { DiscountType, OrganizationName, UserType } from "./enum/types";
import { database } from "./database";
import { IDiscount } from "./interface/IDiscount";
import { discountHelper } from "./discountHelper";
import { tableHelper } from "./tableHelper";
import { preschoolHelper } from "./preschoolHelper";

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
 * Yeni indirim ekleme için gerekli bilgilerin istendiği formunu oluşturur, 
 * <form>
		<div class="fields">
      <div class="field"> ... html yapısını kullanır.
 */
  static createAppendDiscountForm() {
    if (document.getElementById("discountEditForm") != null) {
      document
        .getElementById("discountEditForm")
        .parentNode.removeChild(document.getElementById("discountEditForm"));
      document
        .getElementById("discountEditHeader")
        .parentNode.removeChild(document.getElementById("discountEditHeader"));
    }

    let discountAppendParent = document.getElementById("discountAppendFormDiv"); // formun oluşturulacağı div
    let discountAppendHeader = document.createElement("header");
    discountAppendHeader.id = "discountAppendHeader";
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
   *
   */
  static editDiscountForm(discount: IDiscount) {
    let discountAppendForm = document.getElementById("discountAppendForm");
    if (discountAppendForm != null) {
      discountAppendForm.parentNode.removeChild(discountAppendForm);
      document
        .getElementById("discountAppendHeader")
        .parentNode.removeChild(
          document.getElementById("discountAppendHeader")
        );
    }

    if (document.getElementById("discountEditForm") != null) {
      document
        .getElementById("discountEditForm")
        .parentNode.removeChild(document.getElementById("discountEditForm"));
      document
        .getElementById("discountEditHeader")
        .parentNode.removeChild(document.getElementById("discountEditHeader"));
    }

    let discountEditParent = document.getElementById("discountEditFormDiv");
    let discountEditHeader = document.createElement("header");
    discountEditHeader.id = "discountEditHeader";
    discountEditHeader.innerHTML =
      "<header> <h3> İndirim Düzenleme Tablosu </h3> </header>";
    let discountEditForm = document.createElement("form");
    discountEditForm.id = "discountEditForm";
    let discountEditFieldsDiv = document.createElement("div"); // her bir input satırının toplanacağı div, fields
    discountEditFieldsDiv.className = "fields";

    let discountEditNameInputFieldDiv = document.createElement("div"); // indirim isminin istendiği div, field
    discountEditNameInputFieldDiv.className = "field";

    let discountEditNameLabel = <HTMLElement>document.createElement("p");
    discountEditNameLabel.innerText = "İndirim İsmi";
    let discountEditNameInput = <HTMLInputElement>(
      document.createElement("input")
    );
    discountEditNameInput.type = "text";
    discountEditNameInput.id = "discountEdit-discountName";
    discountEditNameInput.defaultValue = discount.DiscountName;

    discountEditNameInputFieldDiv.appendChild(discountEditNameLabel);
    discountEditNameInputFieldDiv.appendChild(discountEditNameInput);
    discountEditFieldsDiv.appendChild(discountEditNameInputFieldDiv);

    formHelper.createPreschoolCheckboxAndDiscountInput(
      discountEditFieldsDiv,
      discount
    );

    let discountEditTypePercentFieldDiv = document.createElement("div");
    discountEditTypePercentFieldDiv.className = "field half";
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

    let discountEditTypeAmountFieldDiv = document.createElement("div");
    discountEditTypeAmountFieldDiv.className = "field half";

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

    discountEditTypePercentFieldDiv.appendChild(discountTypePercentRadio);
    discountEditTypePercentFieldDiv.appendChild(discountTypePercentRadioLabel);
    discountEditTypeAmountFieldDiv.appendChild(discountTypeAmountRadio);
    discountEditTypeAmountFieldDiv.appendChild(discountTypeAmountRadioLabel);

    discountEditFieldsDiv.appendChild(discountEditTypePercentFieldDiv);
    discountEditFieldsDiv.appendChild(discountEditTypeAmountFieldDiv);

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
										<li><a class="button fit" id="editDiscount">İndirimi
											Düzenle</a></li>
									</ul>
								</div>`;

    discountEditParent.appendChild(discountEditForm);

    const discountEditButton: HTMLElement = document.getElementById(
      "editDiscount"
    );

    discountEditButton.onclick = function() {
      discountHelper.editDiscountFromInput(discount);
      tableHelper.updateDiscountTable();
      document
        .getElementById("discountEditForm")
        .parentNode.removeChild(document.getElementById("discountEditForm"));
      document
        .getElementById("discountEditHeader")
        .parentNode.removeChild(document.getElementById("discountEditHeader"));
      alert("İndirim başarılı bir şekilde güncellendi.");
    };
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

  static createPreschoolAppendForm() {
    if (document.getElementById("preschoolEditForm") != null) {
      document
        .getElementById("preschoolEditForm")
        .parentNode.removeChild(document.getElementById("preschoolEditForm"));
      document
        .getElementById("preschoolEditHeader")
        .parentNode.removeChild(document.getElementById("preschoolEditHeader"));
    }

    let preschoolAppendDiv = document.getElementById("preschoolAppendDiv");
    let preschoolAppendHeader = document.createElement("header");
    preschoolAppendHeader.id = "preschoolAppendHeader";
    preschoolAppendHeader.innerHTML =
      "<header> <h3> Anaokulu Ekleme Tablosu </h3> </header>";
    let preschoolAppendForm = document.createElement("form");
    preschoolAppendForm.id = "preschoolAppendForm";
    let preschoolAppendFieldsDiv = document.createElement("div");
    preschoolAppendFieldsDiv.className = "fields";
    let preschoolNameInputFieldDiv = document.createElement("div");
    preschoolNameInputFieldDiv.className = "field";

    let preschoolAppendNameLabel = <HTMLElement>document.createElement("p");
    preschoolAppendNameLabel.innerText = "Anaokulu İsmi";
    let preschoolAppendNameInput = <HTMLInputElement>(
      document.createElement("input")
    );
    preschoolAppendNameInput.type = "text";
    preschoolAppendNameInput.id = "preschoolAppendName";

    preschoolNameInputFieldDiv.appendChild(preschoolAppendNameLabel);
    preschoolNameInputFieldDiv.appendChild(preschoolAppendNameInput);
    preschoolAppendFieldsDiv.appendChild(preschoolNameInputFieldDiv);

    let preschoolPriceInputFieldDiv = document.createElement("div");
    preschoolPriceInputFieldDiv.className = "field";

    let preschoolAppendPriceLabel = <HTMLElement>document.createElement("p");
    preschoolAppendPriceLabel.innerText = "Anaokulu Ücreti";
    let preschoolAppendPriceInput = <HTMLInputElement>(
      document.createElement("input")
    );
    preschoolAppendPriceInput.type = "text";
    preschoolAppendPriceInput.id = "preschoolAppendPrice";

    preschoolPriceInputFieldDiv.appendChild(preschoolAppendPriceLabel);
    preschoolPriceInputFieldDiv.appendChild(preschoolAppendPriceInput);
    preschoolAppendFieldsDiv.appendChild(preschoolPriceInputFieldDiv);

    let preschoolDateInputFieldDiv = document.createElement("div");
    preschoolDateInputFieldDiv.className = "field";

    let preschoolAppendDateLabel = <HTMLElement>document.createElement("p");
    preschoolAppendDateLabel.innerText = "Anaokulu Erken Kayıt Bitiş Tarihi";
    let preschoolAppendDateInput = <HTMLInputElement>(
      document.createElement("input")
    );
    preschoolAppendDateInput.type = "text";
    preschoolAppendDateInput.id = "preschoolAppendDate";
    preschoolAppendDateInput.placeholder = "AA/GG/YYYY";

    preschoolDateInputFieldDiv.appendChild(preschoolAppendDateLabel);
    preschoolDateInputFieldDiv.appendChild(preschoolAppendDateInput);
    preschoolAppendFieldsDiv.appendChild(preschoolDateInputFieldDiv);

    preschoolAppendForm.appendChild(preschoolAppendFieldsDiv);
    preschoolAppendDiv.appendChild(preschoolAppendHeader);
    preschoolAppendForm.innerHTML += `<div class="field ">
									<ul class="actions stacked ">
										<li><a class="button fit" id="appendPreschool">Anaokulu
												Ekle</a></li>
									</ul>
								</div>`;
    preschoolAppendDiv.appendChild(preschoolAppendForm);

    let preschoolAppendButton = document.getElementById("appendPreschool");
    preschoolAppendButton.onclick = function() {
      preschoolHelper.createPreschoolFromInput();
      document
        .getElementById("preschoolAppendForm")
        .parentNode.removeChild(document.getElementById("preschoolAppendForm"));
      document
        .getElementById("preschoolAppendHeader")
        .parentNode.removeChild(
          document.getElementById("preschoolAppendHeader")
        );
      alert("Anaokulu başarılı bir şekilde eklendi.");
      tableHelper.updatePreschoolTable();
    };
  }

  static createPreschoolEditForm(preschool: IPreschool) {
    let preschoolAppendForm = document.getElementById("preschoolAppendForm");
    if (preschoolAppendForm != null) {
      preschoolAppendForm.parentNode.removeChild(preschoolAppendForm);
      document
        .getElementById("preschoolAppendHeader")
        .parentNode.removeChild(
          document.getElementById("preschoolAppendHeader")
        );
    }

    if (document.getElementById("preschoolEditForm") != null) {
      document
        .getElementById("preschoolEditForm")
        .parentNode.removeChild(document.getElementById("preschoolEditForm"));
      document
        .getElementById("preschoolEditHeader")
        .parentNode.removeChild(document.getElementById("preschoolEditHeader"));
    }
    let preschoolEditDiv = document.getElementById("preschoolEditDiv");
    let preschoolEditHeader = document.createElement("header");
    preschoolEditHeader.id = "preschoolEditHeader";
    preschoolEditHeader.innerHTML =
      "<header> <h3> Anaokulu Düzenleme Tablosu </h3> </header>";
    let preschoolEditForm = document.createElement("form");
    preschoolEditForm.id = "preschoolEditForm";
    let preschoolEditFieldsDiv = document.createElement("div");
    preschoolEditFieldsDiv.className = "fields";
    let preschoolNameInputFieldDiv = document.createElement("div");
    preschoolNameInputFieldDiv.className = "field";

    let preschoolEditNameLabel = <HTMLElement>document.createElement("p");
    preschoolEditNameLabel.innerText = "Anaokulu İsmi";
    let preschoolEditNameInput = <HTMLInputElement>(
      document.createElement("input")
    );
    preschoolEditNameInput.type = "text";
    preschoolEditNameInput.id = "preschoolEditName";
    preschoolEditNameInput.defaultValue = preschool.PreschoolName;

    preschoolNameInputFieldDiv.appendChild(preschoolEditNameLabel);
    preschoolNameInputFieldDiv.appendChild(preschoolEditNameInput);
    preschoolEditFieldsDiv.appendChild(preschoolNameInputFieldDiv);

    let preschoolPriceInputFieldDiv = document.createElement("div");
    preschoolPriceInputFieldDiv.className = "field";

    let preschoolEditPriceLabel = <HTMLElement>document.createElement("p");
    preschoolEditPriceLabel.innerText = "Anaokulu Ücreti";
    let preschoolEditPriceInput = <HTMLInputElement>(
      document.createElement("input")
    );
    preschoolEditPriceInput.type = "text";
    preschoolEditPriceInput.id = "preschoolEditPrice";
    preschoolEditPriceInput.defaultValue = preschool.Price.toString();

    preschoolPriceInputFieldDiv.appendChild(preschoolEditPriceLabel);
    preschoolPriceInputFieldDiv.appendChild(preschoolEditPriceInput);
    preschoolEditFieldsDiv.appendChild(preschoolPriceInputFieldDiv);

    let preschoolDateInputFieldDiv = document.createElement("div");
    preschoolDateInputFieldDiv.className = "field";

    let preschoolEditDateLabel = <HTMLElement>document.createElement("p");
    preschoolEditDateLabel.innerText = "Anaokulu Erken Kayıt Bitiş Tarihi";
    let preschoolEditDateInput = <HTMLInputElement>(
      document.createElement("input")
    );
    preschoolEditDateInput.type = "text";
    preschoolEditDateInput.id = "preschoolEditDate";
    preschoolEditDateInput.placeholder = "AA/GG/YYYY";
    preschoolEditDateInput.defaultValue = preschool.EndOfEarlyRegistrationDate;

    preschoolDateInputFieldDiv.appendChild(preschoolEditDateLabel);
    preschoolDateInputFieldDiv.appendChild(preschoolEditDateInput);
    preschoolEditFieldsDiv.appendChild(preschoolDateInputFieldDiv);

    preschoolEditForm.appendChild(preschoolEditFieldsDiv);
    preschoolEditDiv.appendChild(preschoolEditHeader);
    preschoolEditForm.innerHTML += `<div class="field ">
									<ul class="actions stacked ">
										<li><a class="button fit" id="editPreschool">Anaokulunu
											Düzenle</a></li>
									</ul>
								</div>`;
    preschoolEditDiv.appendChild(preschoolEditForm);

    const preschoolEditButton: HTMLElement = document.getElementById(
      "editPreschool"
    );

    preschoolEditButton.onclick = function() {
      preschoolHelper.editPreschoolFromInput(preschool);
      document
        .getElementById("preschoolEditForm")
        .parentNode.removeChild(document.getElementById("preschoolEditForm"));
      document
        .getElementById("preschoolEditHeader")
        .parentNode.removeChild(document.getElementById("preschoolEditHeader"));
      alert("Anaokulu başarılı bir şekilde düzenlendi.");
      tableHelper.updatePreschoolTable();
    };
  }
}
