import "./style.css";
import { database } from "./database";
import { OrganizationName } from "./types";

let db = new database();
let preschoolList = db.createPreschoolList();
let discountList = db.createDiscountList();

createPreschoolSelectList();
createOrganizationNameSelectList();

const discountCalculateButton: HTMLElement = document.getElementById(
  `calculate`
);
discountCalculateButton.onclick = function() {
  alert("indirim hesaplama metodu");
};

const preschoolManagement: HTMLElement = document.getElementById(
  "preschool-management-button"
);
preschoolManagement.onclick = createPreschoolTable;

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

function toTableString(preschool: IPreschool): string {
  return `<tr scope = "row">
        <td>${preschool.PreschoolName}</td>
        <td>${preschool.Price}</td>
        <td>${preschool.EndOfEarlyRegistrationDate}</td>
        <td><span class="icon solid style2 major fa-cog"></span></td>
        <td><span class="icon solid style2 major fa-hashtag" ></span></td>
    </tr>`;
}

function createPreschoolSelectList() {
  let myParent = document.getElementById("selectField");

  let selectList = document.createElement("select");
  selectList.id = "myPreschoolSelect";
  selectList.innerHTML = `<option value="none" selected disabled hidden> 
          Lütfen Anaokulu Seçiniz`;
  myParent.appendChild(selectList);

  for (let i = 0; i < preschoolList.length; i++) {
    let option = document.createElement("option");
    option.value = i.toString();
    option.text = preschoolList[i].PreschoolName;
    selectList.appendChild(option);
  }
}

function createPreschoolTable () {
  if(document.getElementById("preschoolTableId"))
  {
    return;
  }

  let myPreschoolTableParent = document.getElementById("preschoolTable");

  let table = document.createElement("table");
  let tblBody = document.createElement("tbody");
  table.id="preschoolTableId";
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
    let row = document.createElement("tr");

    let cell = document.createElement("td");
    let cellText = document.createTextNode(preschoolList[i].PreschoolName);
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellText = document.createTextNode(preschoolList[i].Price.toString());
    cell.appendChild(cellText);
    row.appendChild(cell);

    cell = document.createElement("td");
    cellText = document.createTextNode(preschoolList[i].EndOfEarlyRegistrationDate);
    cell.appendChild(cellText);
    row.appendChild(cell);

    tblBody.appendChild(row);

   
  }
  table.appendChild(tblBody);
  myPreschoolTableParent.appendChild(table);

}

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


