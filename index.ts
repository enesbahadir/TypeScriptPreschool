import "./style.css";
import "./fontawesome-all.min.css"
import { database } from "./database";
import {  OrganizationName, UserType } from "./types";
import { User } from "./User";
import { DiscountCalculator } from "./discountCalculator";


let preschoolList = database.createPreschoolList();
let discountList = database.createDiscountList();

/**
 * Sayfa ilk açıldığında indirim ve anaokulu tablolarının dinamik olarak preschoolList ve discountList üzerinden oluşmalarını ve
 * İndirim hesaplama sayfasındaki anaokulu - kurum dropdown'ların dinamik olarak dolmasını sağlayan metodlar
 */
createPreschoolSelectList();
createOrganizationNameSelectList();
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
    debugger;
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
function createPreschoolSelectList() {
  let myParent = document.getElementById("selectField");

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
    cell.innerHTML= "<td><span class=\"icon style2 major fa-hashtag\"></span></td>";
    row.appendChild(cell);

    cell = document.createElement("td");
    cell.innerHTML= "<td><span class=\"icon style2 major fa-cog\"></span></td>";
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
function createOrganizationNameSelectList() {
  let myOrganizationParent = document.getElementById("selectOrganizationField");
  let selectOrganizationList = document.createElement("select");
  selectOrganizationList.id = "myOrganizationSelect";
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
    document.getElementById("myOrganizationSelect")
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
  alert(discount);
}


