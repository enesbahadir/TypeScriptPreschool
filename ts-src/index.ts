import { formHelper } from "./formHelper";
import { DiscountFormHelper } from "./DiscountFormHelper";
import { PreschoolFormHelper } from "./PreschoolFormHelper";

import { tableHelper } from "./tableHelper";
import { userHelper } from "./userHelper";
import { DiscountHelper } from "./DiscountHelper";
import { Database } from "./Database";
import { PreschoolListFromAPI } from "./PreschoolListFromAPI";



/**
 * State, programın içerisde hangi bölümde işlem yaptığımız tutar.
 */
let state: number = 0;

/**
 * Sistem ilk açıldığında preschoolList ve discountList sistemde tanımlı olan anaokullarını ve indirimleri database'de bulunanan listelere aktarır.
 */
let preschoolList = Database.createPreschoolList();
let discountList = Database.createDiscountList();
let discountValuesList = Database.createDiscountValuesList();

const discountCalculateDiv: HTMLElement = document.getElementById("second");
discountCalculateDiv.style.display = "none";

const discountTableDiv: HTMLElement = document.getElementById("third");
discountTableDiv.style.display = "none";

const preschoolTableDiv: HTMLElement = document.getElementById("fourth");
preschoolTableDiv.style.display = "none";

/**
 * İndirim Hesaplama butonuna tıklandığı zaman;
 * İndirim ve anaokulu listeleri daha önceden oluşturulmuş ise onları siler,
 * İndirim Hesaplamak için gerekli formu çağırır.
 */
const discountCalculateFormButton: HTMLElement = document.getElementById(
  "discountButton"
);
discountCalculateFormButton.onclick = function() {
  let discountManagementState = document.getElementById("discountTableId");
  if (discountManagementState != null) removeState("discountTableId");

  discountCalculateDiv.style.display = "inline";
  discountTableDiv.style.display = "none";
  preschoolTableDiv.style.display = "none";
  if (state != 1) {
    formHelper.createUserInputForm();
    tableHelper.printHomeButton(
      document.getElementById("discountCalculateButtonUl")
    );
    let myParent = document.getElementById("selectField");
    formHelper.createPreschoolSelectList(myParent);
    formHelper.createOrganizationNameSelectList(
      document.getElementById("selectOrganizationField"),
      "userInput"
    );
  }
  const discountCalculateButton: HTMLElement = document.getElementById(
    `calculate`
  );
  discountCalculateButton.onclick = function() {
    userHelper.createUserFromUserInput();
  };
  state = 1;
};

/**
 * İndirim Yönetim Sistemi butonuna basıldığı zaman;
 * İndirim hesaplama formu ve anaokulu listesi oluşturulmuş ise siler,
 * İndirim yönetim tablosunu oluşturan metodu çağırır.
 */
const discountManagementButton: HTMLElement = document.getElementById(
  "discountManagementButton"
);
discountManagementButton.onclick = function() {
  let discountCalculateState = document.getElementById("userInputForm");
  if (discountCalculateState != null) removeState("userInputForm");
  discountCalculateDiv.style.display = "none";
  discountTableDiv.style.display = "inline";
  preschoolTableDiv.style.display = "none";
  tableHelper.createDiscountTable();

  const discountAppendButton: HTMLElement = document.getElementById(
    `append-discount`
  );
  discountAppendButton.onclick = function() {
    if (!document.getElementById("discountAppendForm"))
      DiscountFormHelper.createAppendDiscountForm();
    const discountAppend: HTMLElement = document.getElementById(
      `appendDiscount`
    );
    discountAppend.onclick = function() {
      DiscountHelper.createDiscountFromInput();
      tableHelper.updateDiscountTable();
    };
  };

  state = 2;
};

/**
 *
 */
const reschoolManagementButton: HTMLElement = document.getElementById(
  "preschoolManagementButton"
);
reschoolManagementButton.onclick = function() {
  state = 3;
  let discountManagementState = document.getElementById("discountTableId");
  if (discountManagementState != null) removeState("discountTableId");

  discountCalculateDiv.style.display = "none";
  discountTableDiv.style.display = "none";
  preschoolTableDiv.style.display = "inline";
  tableHelper.createPreschoolTable();

  const preschoolAppendButton = document.getElementById("appendPreschoolForm");
  preschoolAppendButton.onclick = function() {
    if (!document.getElementById("preschoolAppendForm"))
      PreschoolFormHelper.createPreschoolAppendForm();
  };
};

function removeState(id) {
  let element = document.getElementById(id);
  element.parentNode.removeChild(element);
}
