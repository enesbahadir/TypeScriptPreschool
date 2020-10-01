import "./css/style.css";
import "./css/fontawesome-all.min.css";
import { database } from "./database";
import { DiscountType, OrganizationName, UserType } from "./enum/types";
import { tableHelper } from "./tableHelper";
import { formHelper } from "./formHelper";
import { userHelper } from "./userHelper";
import { discountHelper } from "./discountHelper";

let preschoolList = database.createPreschoolList();
let discountList = database.createDiscountList();
/**
 * Sayfa ilk açıldığında indirim ve anaokulu tablolarının dinamik olarak preschoolList ve discountList üzerinden oluşmalarını ve
 * İndirim hesaplama sayfasındaki anaokulu - kurum dropdown'ların dinamik olarak dolmasını sağlayan metodlar
 */
let myParent = document.getElementById("selectField");
formHelper.createPreschoolSelectList(myParent);
formHelper.createOrganizationNameSelectList(
  document.getElementById("selectOrganizationField"),
  "userInput"
);
tableHelper.createDiscountTable(discountList);
tableHelper.createPreschoolTable(preschoolList);

/**
 * İndirim Hesapla butonuna basıldığında kişi bilgilerine göre User nesnesi oluşturan ve inidrim hesaplama metodunu çağırır.
 */
const discountCalculateButton: HTMLElement = document.getElementById(
  `calculate`
  );
  discountCalculateButton.onclick = function() {
    userHelper.createUserFromUserInput();
};

/**
 *@TODO isimlendirmeler düzeltilecek
 */
const discountAppendButton: HTMLElement = document.getElementById(
  `append-discount`
  );
  discountAppendButton.onclick = function() {
  if (!document.getElementById("discountAppendForm"))
    createAppendDiscountForm();
  const discountAppend: HTMLElement = document.getElementById(`appendDiscount`);
  discountAppend.onclick = function() {
    discountHelper.createDiscountFromInput();
  };
  //createDiscountFromInput();
};

/**
 * Yeni indirim ekleme için gerekli bilgilerin istendiği formunu oluşturur, 
 * <form>
		<div class="fields">
      <div class="field"> ... html yapısını kullanır.
 */
function createAppendDiscountForm() {
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

  createPreschoolCheckboxAndDiscountInput(discountAppendFieldsDiv);

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
										<li><a href="" class="button fit" id="appendDiscount">İndirim
												Ekle</a></li>
									</ul>
								</div>`;

  discountAppendParent.appendChild(discountAppendForm);
}

/**
 * Yeni indirim ekleme tablosunda indirimin ekleneceği anaokullarını ve miktarlarını checkbox ve text input olarak dinanik olarak doldurur.
 */
function createPreschoolCheckboxAndDiscountInput(parentDiv) {
  for (let i = 0; i < preschoolList.length; i++) {
    let div1 = document.createElement("div");
    div1.className = "field half";

    let option = <HTMLInputElement>document.createElement("input");
    option.type = "checkbox";
    option.id = "discountAppendPreschoolCheckbox-" + i.toString();
    option.name = preschoolList[i].PreschoolName;

    let label = document.createElement("label");
    label.setAttribute("for", option.id);
    let labelText = document.createTextNode(preschoolList[i].PreschoolName);
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

    div2.appendChild(discountAppendPreschoolInput);

    parentDiv.appendChild(div1);
    parentDiv.appendChild(div2);
  }
}



