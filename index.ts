import './style.css';

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
                    discountCalculateDiv.innerHTML = ``;
                    preschoolManagementDiv.innerHTML = ``;

};



