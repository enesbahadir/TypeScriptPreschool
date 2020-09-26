import './style.css';
import {database} from "./database";

const preschoolManagement : HTMLElement = document.getElementById('preschool-management-button');
preschoolManagement.onclick =  updateTable;
 

let db = new database();
let preschoolList = db.createPreschoolList();

const discountCalculateButton2 : HTMLElement = document.getElementById(`calculate`);
discountCalculateButton2.onclick = 
  function () {
    alert ("indirim hesaplama metodu");
};

function updateTable(){

  const tableString: string = /*html*/`
          
            <table>
            <thead>
              <tr>
                <th>Anaokulunun Adı</th>
                <th>Anaokulu Ücreti</th>
                <th>Erken Kayıt Dönemi Sonu</th>
                <th>Düzenle</th>
                <th>Sil</th>
              </tr>
            </thead>
            <tbody id = "tableBody">`;


  const parser = new DOMParser();
  const parse = <T extends HTMLElement>(str: string) =>
          <T>parser.parseFromString(str, 'text/html').documentElement;
  const table = parse<HTMLTableElement>(tableString);
  preschoolList.forEach((preschool, index) => {
   
    const rowString = toTableString(index, preschool);
    const row = parse<HTMLTableRowElement>(rowString);
    //
    
    table.appendChild(row);
    //const existingTable = document.getElementById("table");
    document.body.appendChild(table);
    //existingTable.parentElement.replaceChild(table, existingTable);

  });

}

function toTableString(row: number, preschool: IPreschool): string
{
  alert(preschool.PreschoolName);
    return /*html*/`<tr>
        <th scope="row">${row + 1}</th>
        <td>${preschool.PreschoolName}</td>
        <td>${preschool.Price}</td>
        <td>${preschool.EndOfEarlyRegistrationDate}</td>
        <td><span class="glyphicon glyphicon-pencil"></span></td>
        <td><span class="glyphicon glyphicon-trash" data-delete-button></span></td>
    </tr>`;
}






