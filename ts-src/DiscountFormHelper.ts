import { DiscountType, OrganizationName, UserType } from "./enum/types";
import { Database } from "./Database";
import { IDiscount } from "./interface/IDiscount";
import { IPreschool } from "./interface/IPreschool";
import { formHelper } from "./formHelper";
import { DiscountHelper } from "./DiscountHelper";
import { tableHelper } from "./tableHelper";

export class DiscountFormHelper {

	 /*
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
      DiscountHelper.editDiscountFromInput(discount);
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
}