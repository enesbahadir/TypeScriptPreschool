import "./css/style.css";
import "./css/fontawesome-all.min.css";
import { database } from "./database";
import { formHelper } from "./formHelper";
import { tableHelper } from "./tableHelper";
import { userHelper } from "./userHelper";
import { discountHelper } from "./discountHelper";

let x : number =1;

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
tableHelper.createPreschoolTable(preschoolList);
tableHelper.createDiscountTable(discountList);

if (x === 1){
  tableHelper.createDiscountTable(discountList);
}
else if( x === 2){
  tableHelper.createPreschoolTable(preschoolList);
}

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
    formHelper.createAppendDiscountForm();
  const discountAppend: HTMLElement = document.getElementById(`appendDiscount`);
  discountAppend.onclick = function() {
    discountHelper.createDiscountFromInput();
    tableHelper.updateDiscountTable(database.discounts);
  };
};







