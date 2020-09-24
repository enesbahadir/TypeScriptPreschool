import './style.css';
import {database} from "./database";

const discountCalculateDiv : HTMLElement = document.getElementById('discount-calculate');
const discountManagementDiv : HTMLElement = document.getElementById('discount-management');
const preschoolManagementDiv : HTMLElement = document.getElementById('preschool');

const discountCalculateButton: HTMLElement = document.getElementById('discount-button');
discountCalculateButton.onclick = function() {
  discountManagementDiv.innerHTML = ``;
  preschoolManagementDiv.innerHTML = ``;
  discountCalculateDiv.innerHTML = 
          `<section class="wrapper style1 align-center" id = "second">
						<div class="inner">
              <div class="content">
                <form method="post" action="#">
                  <div class="fields">
                    <div class="field">
                      <label for="name">Name</label>
                      <input type="text" name="name" id="name" value="" />
                    </div>                
                    <div class="field">
                      <label for="preschool">Anaokulu</label>
                      <select name="preschool" id="preschool">
                        <option value="">- Anaokulu Seçiniz -</option>
                        <option value="1">Yunus Emre Lalebahçesi</option>
                        <option value="2">Madenler Lalebahçesi</option>
                      </select>
                    </div>
                    <div class="field third">
                      <input type="radio" id="user-personel" name="priority" checked />
                      <label for="user-personel">Personel</label>
                    </div>
                    <div class="field third">
                      <input type="radio" id="user-ihvan" name="priority" />
                      <label for="user-ihvan">Ihvan</label>
                    </div>
                    <div class="field third">
                      <input type="radio" id="user-standart" name="priority" />
                      <label for="user-standart">Standart</label>
                    </div>
                    <div class="field ">
                      <ul class="actions stacked ">
                        <li><a href="#" class="button fit" onclick="a()">İndirim Hesapla</a></li>
                      </ul>
                    </div>
                </form>
              </div>  
						</div>
            <ul class="actions stacked align-center">
								<li><a href="#first" class="button large wide smooth-scroll-middle">Listeye Dön</a></li>
							</ul>
    </section>`;
};
const discountManagementButton: HTMLElement = document.getElementById('discount-management-button');
discountManagementButton.onclick = function() {
  discountManagementDiv.innerHTML = `
    <section class="wrapper style1 align-center" id = "third"> 
      <div class="inner">
        <header>
					<h3>İndirim Düzenleme Tablosu</h3>
				</header>
				<div class="content">
					<div class="table-wrapper">
						<table>
							<thead>
								<tr>
                  <th>İndirimin Adı</th>
                  <th>İndirimin Uygulancağı Anaokulu</th>
                  <th>İndirim Miktarı</th>
                  <th>Uygulanacağı Kişi Tipi</th>
                  <th>Düzenle</th>
								</tr>
							</thead>
							<tbody>
								<tr>
                  <td>Item 1</td>
                  <td>Ante turpis integer aliquet porttitor.</td>
                  <td>29.99</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Item 1</td>
                  <td>Ante turpis integer aliquet porttitor.</td>
                  <td>29.99</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Item 1</td>
                  <td>Ante turpis integer aliquet porttitor.</td>
                  <td>29.99</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Item 1</td>
                  <td>Ante turpis integer aliquet porttitor.</td>
                  <td>29.99</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>Item 1</td>
                  <td>Ante turpis integer aliquet porttitor.</td>
                  <td>29.99</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
       </div>
       <ul class="actions stacked align-center">
								<li><a href="#first" class="button large wide smooth-scroll-middle">Listeye Dön</a></li>
							</ul>
     </section>`;
  discountCalculateDiv.innerHTML = ``;
  preschoolManagementDiv.innerHTML = ``;
};
const preschoolManagementButton: HTMLElement = document.getElementById('preschool-management-button');
preschoolManagementButton.onclick = function () {
  preschoolManagementDiv.innerHTML =`
    <section class="wrapper style1 align-center" id = "fourth"> 
      <div class="inner">
        <header>
					<h3>Anaokulu Düzenleme Tablosu</h3>
				</header>
				<div class="content">
					<div class="table-wrapper">
						<table>
							<thead>
								<tr>
                  <th>Anaokulunun Adı</th>
                  <th>Anlaşmalı Kurum</th>
                  <th>Erken Kayıt Dönemi Sonu</th>
                  <th>Düzenle</th>
								</tr>
							</thead>
							<tbody>
								<tr>
                  <td>Item 1</td>
                  <td>Ante turpis integer aliquet porttitor.</td>
                  <td>29.99</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Item 1</td>
                  <td>Ante turpis integer aliquet porttitor.</td>
                  <td>29.99</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Item 1</td>
                  <td>Ante turpis integer aliquet porttitor.</td>
                  <td>29.99</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Item 1</td>
                  <td>Ante turpis integer aliquet porttitor.</td>
                  <td>29.99</td>
                  <td></td>
                </tr>
                <tr>
                  <td>Item 1</td>
                  <td>Ante turpis integer aliquet porttitor.</td>
                  <td>29.99</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
       </div>
       <ul class="actions stacked align-center">
								<li><a href="#first" class="button large wide smooth-scroll-middle">Listeye Dön</a></li>
							</ul>
     </section>`;
     let db = new database();
     let list = db.createPreschoolList().length;
     alert(list);
   //  preschoolManagementDiv.innerHTML += createTable(list.values);
     discountCalculateDiv.innerHTML =``;
     discountManagementDiv.innerHTML = ``;
};

function createTable(tableData) {
  var table = document.createElement('table');
  var tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
}




