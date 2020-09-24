import discountCalculateHtml from './discount-calculate.html';
// Import stylesheets
import './style.css';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('discount-button');
appDiv.onclick = function() {
  const discountDiv : HTMLElement = document.getElementById('discount-calculate');

  discountDiv.innerHTML = 
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
    </section>`;
};

