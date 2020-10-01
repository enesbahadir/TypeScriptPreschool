import "./css/style.css";
import "./css/fontawesome-all.min.css";
import { database } from "./database";
import { DiscountType, OrganizationName, UserType } from "./enum/types";
import { User } from "./User";
import { DiscountCalculator } from "./discountCalculator";

let preschoolList = database.createPreschoolList();
let discountList = database.createDiscountList();

/**
 * Sayfa ilk açıldığında indirim ve anaokulu tablolarının dinamik olarak preschoolList ve discountList üzerinden oluşmalarını ve
 * İndirim hesaplama sayfasındaki anaokulu - kurum dropdown'ların dinamik olarak dolmasını sağlayan metodlar
 */
let myParent = document.getElementById("selectField");
createPreschoolSelectList(myParent);
createOrganizationNameSelectList( document.getElementById("selectOrganizationField"), "userInput" );
createDiscountTable();
createPreschoolTable();

/**
 * İndirim Hesapla butonuna basıldığında kişi bilgilerine göre User nesnesi oluşturan ve inidrim hesaplama metodunu çağırır.
 */
const discountCalculateButton: HTMLElement = document.getElementById(
  `calculate`
);
discountCalculateButton.onclick = function() {
  createUserFromUserInput();
};

/**
 * @TODO Anaokulu eklendiği zaman tabloyu yenileyecek olan metod, düzenlenmesi lazım
 */
function updatePreschoolTable() {
  const tableString: string = `
        <table id= "table">
          <thead>
            <tr>
              <th scope="col">Anaokulunun Adı</th>
              <th scope="col">Anaokulu Ücreti</th>
              <th scope="col">Erken Kayıt Dönemi Sonu</th>
              <th scope="col">Düzenle</th>
              <th scope="col">Sil</th>
            </tr>
          </thead>
          <tbody>
          <tr>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            <th></th>
            </tr>
          </tbody>
        </table>
      `;

  const parser = new DOMParser();
  const parse = <T extends HTMLElement>(str: string) =>
    <T>parser.parseFromString(str, "text/html").documentElement;
  const table = parse<HTMLTableElement>(tableString);

  preschoolList.forEach(preschool => {
    const rowString = toTableString(preschool);
    const row = parse<HTMLTableRowElement>(rowString);
    table.createTBody().append(row);
  });

  const existingTable = document.getElementById("tableEx");
  if (existingTable)
    existingTable.parentElement.replaceChild(table, existingTable);
}

/**
 * updatePreschoolTable metodunun kullandığı bir Anaokulu nesnesini tablonun hücrelerine ayıran metod
 */
function toTableString(preschool: IPreschool): string {
  return `<tr scope = "row">
        <td>${preschool.PreschoolName}</td>
        <td>${preschool.Price}</td>
        <td>${preschool.EndOfEarlyRegistrationDate}</td>
        <td><span class="icon solid style2 major fa-cog"></span></td>
        <td><span class="icon solid style2 major fa-hashtag" ></span></td>
    </tr>`;
}

/**
 * İndirim hesaplama bölümünde kullanıcının, indirimin hesaplayanacağı anaokulunu dinamik olarak preschoolList üzerinden
 * dropdown olarak dolduran metod.
 */
function createPreschoolSelectList(myParent) {
  //

  let selectList = document.createElement("select");
  selectList.id = "myPreschoolSelect";
  selectList.innerHTML = `<option value="none" selected disabled hidden required> 
          Lütfen Anaokulu Seçiniz`;
  myParent.appendChild(selectList);

  for (let i = 0; i < preschoolList.length; i++) {
    let option = document.createElement("option");
    option.value = i.toString();
    option.text = preschoolList[i].PreschoolName;
    selectList.appendChild(option);
  }
}

/**
 * Anaokulu yönetim sistemi bölümündeki anaokulu tablosunun dinamik olarak preschoolList üzerinden oluşturan metod
 */
function createPreschoolTable() {
  if (document.getElementById("preschoolTableId")) {
    return;
  }

  let myPreschoolTableParent = document.getElementById("preschoolTable"); // div

  let table = document.createElement("table"); // <table>
  let tblBody = document.createElement("tbody"); // <tbody>
  table.id = "preschoolTableId"; // <table id= "preschoolTableId">
  table.innerHTML = `<thead>
            <tr>
              <th scope="col">Anaokulunun Adı</th>
              <th scope="col">Anaokulu Ücreti</th>
              <th scope="col">Erken Kayıt Dönemi Sonu</th>
              <th scope="col">Düzenle</th>
              <th scope="col">Sil</th>
            </tr>
          </thead>`;
  myPreschoolTableParent.appendChild(table);

  for (let i = 0; i < preschoolList.length; i++) {
    let row = document.createElement("tr"); //<tr>

    let cell = document.createElement("td"); //<td>
    let cellText = document.createTextNode(preschoolList[i].PreschoolName);
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellText = document.createTextNode(preschoolList[i].Price.toString());
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellText = document.createTextNode(
      preschoolList[i].EndOfEarlyRegistrationDate
    );
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.innerHTML =
      '<td><span class="icon style2 major fa-hashtag"></span></td>';
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.innerHTML = '<td><span class="icon style2 major fa-cog"></span></td>';
    row.appendChild(cell);

    tblBody.appendChild(row);
  }
  table.appendChild(tblBody);
  myPreschoolTableParent.appendChild(table);
}

/**
 * İndirim yönetim sistemi bölümündeki indiriö tablosunun dinamik olarak discountList üzerinden oluşturan metod
 */
function createDiscountTable() {
  if (document.getElementById("discountTableId")) {
    return;
  }
  let discountTableParent = document.getElementById("discountTable");
  let table = document.createElement("table");
  let tblBody = document.createElement("tbody");
  table.id = "discountTableId";
  table.innerHTML = `<thead>
								<tr>
									<th>İndirimin Adı</th>
									<th>İndirimin Uygulancağı Anaokulu ve Miktarı</th>
                  <th>İndirim Tipi</th>
									<th>Uygulanacağı Kişi Tipi</th>
									<th>Düzenle</th>
									<th>Sil</th>
								</tr>
							</thead>`;
  discountTableParent.appendChild(table);
  for (let i = 0; i < discountList.length; i++) {
    let row = document.createElement("tr");
    let cell = document.createElement("td");
    let cellText = document.createTextNode(discountList[i].DiscountName);
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement("td");
    for (
      let j = 0, k = 1;
      j <= discountList[i].PreschoolNamesAndTheirDiscounts.length / 2;
      j += 2, k += 2
    ) {
      let cellString = discountList[i].PreschoolNamesAndTheirDiscounts[
        j
      ].toString();
      cellString += " ";
      cellString += discountList[i].PreschoolNamesAndTheirDiscounts[
        k
      ].toString();
      cellString += "-";
      cellText = document.createTextNode(cellString);
      cell.appendChild(cellText);
    }
    row.appendChild(cell);

    cell = document.createElement("td");
    if (discountList[i].DiscountType)
      cellText = document.createTextNode("Miktar");
    else cellText = document.createTextNode("Yüzde");

    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement("td");
    let cellString = "";
    for (let j = 0; j < discountList[i].UserTypes.length; j++) {
      switch (discountList[i].UserTypes[j]) {
        case 0: {
          cellString += "Personel- ";
          break;
        }
        case 1: {
          cellString += "Ihvan- ";
          break;
        }
        case 2: {
          cellString += "Standart";
          break;
        }
      }
    }

    cellText = document.createTextNode(cellString);
    cell.appendChild(cellText);
    row.appendChild(cell);

    tblBody.appendChild(row);
  }
  table.appendChild(tblBody);

  discountTableParent.appendChild(table);
}

/**
 * İndirim hesaplama bölümünde kullanıcının, indirimin hesaplayanacağı kurumun dinamik olarak enum sınıfları içerisindeki OrganizationName'den dropdown olarak dolduran metod.
 */
function createOrganizationNameSelectList(myOrganizationParent, id) {
  let selectOrganizationList = document.createElement("select");
  selectOrganizationList.id = "organizationSelect-" +id;
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
 * İndirim hesaplama bölümünde kullanıcının girdiği bilgiler doğrultusunda User nesnesi oluşturan metod
 */
function createUserFromUserInput() {
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
  let userTypeRadio = document.getElementById("userTypeRadio");
  const list = document.querySelectorAll("input[type=radio]");
  for (let i = 0; i < list.length; i++) {
    let item = <HTMLInputElement>list[i];
    if (item.checked) {
      userTypeChoose = item;
    }
  }
  switch (userTypeChoose.value) {
    case "PERSONEL": {
      userTypeChoose = UserType.PERSONEL;
      break;
    }
    case "IHVAN": {
      userTypeChoose = UserType.IHVAN;
      break;
    }
    case "STANDART": {
      userTypeChoose = UserType.STANDART;
    }
  }

  let user = new User(userName.value, userTypeChoose, organizationChoose);
  let preschool = preschoolList[preschoolChoose.value];
  let discount = DiscountCalculator.calculateDiscount(user, preschool);
  const discountResult: HTMLElement = document.getElementById(
    `discount-result`
  );
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
    createDiscountFromInput();
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

  createUserTypeCheckBox(discountAppendFieldsDiv);

  let discountOrganizationFieldDiv = document.createElement("div");
  discountOrganizationFieldDiv.className = "field";
  discountOrganizationFieldDiv.id = "discountOrganizationFieldDiv";

  createOrganizationNameSelectList(discountOrganizationFieldDiv, "discountAppend");
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

/**
 *
 */
function createUserTypeCheckBox(parent) {
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

/**
 *
 */
function createDiscountFromInput() {
  
  let discountName = <HTMLInputElement> document.getElementById("discountAppend-discountName");
  
  let preschoolNamesAndTheirDiscounts: Array<string | number> = new Array();
  for (let i = 0; i < preschoolList.length; i++) {
    let checkbox = <HTMLInputElement>(
      document.getElementById("discountAppendPreschoolCheckbox-" + i.toString())
    );
    if (!checkbox.checked) continue;
    else {
      let text = <HTMLInputElement>(
        document.getElementById("discountAppendPreschoolText-" + i.toString())
      );
      preschoolNamesAndTheirDiscounts.push(checkbox.name, text.value);
    }
  }

  let discountType;
  let discountTypeRadio = <HTMLInputElement>document.getElementById("discount-append-percentage-radio");
  if(discountTypeRadio.checked)
  {
    discountType = DiscountType.PERCENTAGE;
  }
  else
   {
     discountType = DiscountType.AMOUNT;
   }

  let userTypes : Array<UserType> = new Array();
  let option = <HTMLInputElement> document.getElementById("user-type-personel");
  if(option.checked)
    userTypes.push(UserType.PERSONEL);
  option = <HTMLInputElement> document.getElementById("user-type-ihvan");
  if(option.checked)
    userTypes.push(UserType.IHVAN);
  option = <HTMLInputElement> document.getElementById("user-type-standart");
  if(option.checked)
    userTypes.push(UserType.STANDART);

  let organizationName : OrganizationName;
  let a =<HTMLInputElement> document.getElementById("organizationSelect-"+"discountAppend");
  switch (a.value)
  {
    case "ANADOLU": {
      organizationName = OrganizationName.ANADOLU;
      break;
    }
    case "SAGLIK": {
      organizationName = OrganizationName.SAGLIK;
      break;
    }
    default: {
      organizationName = OrganizationName.NONE;
    }
  }
  debugger;
  database.discounts.push( {
        DiscountName: discountName.value,
        DiscountType: discountType,
        UserTypes: userTypes,
        OrganizationName: organizationName,
        PreschoolNamesAndTheirDiscounts: preschoolNamesAndTheirDiscounts
      });
}
