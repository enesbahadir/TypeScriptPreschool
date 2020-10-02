import "./css/style.css";
import "./css/fontawesome-all.min.css";
import { database } from "./database";
import { formHelper } from "./formHelper";
import { tableHelper } from "./tableHelper";
import { userHelper } from "./userHelper";
import { discountHelper } from "./discountHelper";
/**
 * State, programın içerisde hangi bölümde işlem yaptığımız tutar.
 */
let state: number = 0;
/**
 * Sistem ilk açıldığında preschoolList ve discountList sistemde tanımlı olan anaokullarını ve indirimleri database'de bulunanan listelere aktarır.
 */
let preschoolList = database.createPreschoolList();
let discountList = database.createDiscountList();

const discountCalculateDiv: HTMLElement = document.getElementById("second");
discountCalculateDiv.style.visibility = "hidden";

const discountTableDiv: HTMLElement = document.getElementById("third");
discountTableDiv.style.visibility = "hidden";

const preschoolTableDiv: HTMLElement = document.getElementById("fourth");
preschoolTableDiv.style.visibility = "hidden";

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
  
  discountCalculateDiv.style.visibility = "visible";
  discountTableDiv.style.visibility = "hidden";
  preschoolTableDiv.style.visibility = "hidden";
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
  discountCalculateDiv.style.visibility = "hidden";
  discountTableDiv.style.visibility = "visible";
  preschoolTableDiv.style.visibility = "hidden";
  tableHelper.createDiscountTable();

  const discountAppendButton: HTMLElement = document.getElementById(
    `append-discount`
  );
  discountAppendButton.onclick = function() {
    if (!document.getElementById("discountAppendForm"))
      formHelper.createAppendDiscountForm();
    const discountAppend: HTMLElement = document.getElementById(
      `appendDiscount`
    );
    discountAppend.onclick = function() {
      discountHelper.createDiscountFromInput();
      tableHelper.updateDiscountTable();
    };
  };
  state = 2;
};

const reschoolManagementButton: HTMLElement = document.getElementById(
  "preschoolManagementButton"
);
reschoolManagementButton.onclick = function() {
  state = 3;
  let discountManagementState = document.getElementById("discountTableId");
  if (discountManagementState != null) removeState("discountTableId");

  discountCalculateDiv.style.visibility = "hidden";
  discountTableDiv.style.visibility = "hidden";
  preschoolTableDiv.style.visibility = "visible";
  tableHelper.createPreschoolTable(preschoolList);
  tableHelper.printHomeButton(preschoolTableDiv);
};

 function removeState(id) {
  let element = document.getElementById(id);
  element.parentNode.removeChild(element);
}



