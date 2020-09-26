import './style.css';
import {database} from "./database";


 

let db = new database();
let preschoolList = db.createPreschoolList();

const discountCalculateButton2 : HTMLElement = document.getElementById(`calculate`);
discountCalculateButton2.onclick = 
  function () {
    alert ("indirim hesaplama metodu");
};

const preschoolManagement : HTMLElement = document.getElementById('preschool-management-button');
preschoolManagement.onclick =  updateTable;

function updateTable(){
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
          </tbody>
        </table>
      </div>
    </div>`;


  const parser = new DOMParser();
  const parse = <T extends HTMLElement>(str: string) =>
          <T>parser.parseFromString(str, 'text/html').documentElement;
  const table = parse<HTMLTableElement>(tableString);

  preschoolList.forEach((preschool) => {
    const rowString = toTableString( preschool);
    const row = parse<HTMLTableRowElement>(rowString);
    debugger;
    table.children[1].appendChild(row);
  });

  const existingTable = document.getElementById("tableEx");
  if(existingTable)
    existingTable.parentElement.replaceChild(table, existingTable);
    
    
  
}

function toTableString( preschool: IPreschool): string
{
  
    return `<tr scope = "row">
        <td>${preschool.PreschoolName}</td>
        <td>${preschool.Price}</td>
        <td>${preschool.EndOfEarlyRegistrationDate}</td>
        <td><span class="icon solid style2 major fa-cog"></span></td>
        <td><span class="icon solid style2 major fa-hashtag" ></span></td>
    </tr>`;
}






