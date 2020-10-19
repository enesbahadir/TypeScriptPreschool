import { Database } from "./../data/Database";
import { DiscountType } from "./../enum/Types";
import { FormHelper } from "./../form/FormHelper";
import { DiscountFormHelper } from "./../form/DiscountFormHelper";
import { PreschoolFormHelper } from "./../form/PreschoolFormHelper";
import { PreschoolHelper } from "./../model/PreschoolHelper";
import { PreschoolManagementAPI } from "./../api/PreschoolManagementAPI";
/**
 * Sistemde gözükecek olan tabloların oluşturulduğu sınıftır.
 */
export class TableHelper {
  /**
   * İndirim tablosunun daha önceden sayfa olup-olmadığı kontrol eder.
   */
  static createDiscountTable() {
    if (!document.getElementById("discountTableId")) {
      TableHelper.printDiscountTable(Database.discounts);
    }
  }
  /**
   * İndirim yönetim sistemi bölümündeki indirim tablosunun dinamik olarak database'de tutulan discounts üzerinden oluşturan metod
   */
  static printDiscountTable(discountList) {
    let discountTableParent = document.getElementById("discountTableDiv");
    let table = document.createElement("table");
    let tblBody = document.createElement("tbody");
    table.id = "discountTableId";
    table.innerHTML = `<thead>
								<tr>
									<th>İndirimin Adı</th>
									<th>İndirimin Uygulancağı Anaokulu ve Miktarı</th>
                  <th>İndirim Tipi</th>
									<th>Uygulanacağı Kişi Tipi</th>
									<th>Sil</th>
									<th>Düzenle</th>
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
      for (let j = 0; j < discountList[i].DiscountValues.length; j++) {
        let preschool = discountList[i].DiscountValues[j].preschool;
        let cellString = preschool.preschoolName;
        cellString += "   ";
        cellString += discountList[i].DiscountValues[j].value;

        if (discountList[i].DiscountType == "PERCENTAGE")
          cellString += "% ";
        else cellString += "TL ";
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
          case "PERSONEL": {
            cellString += "Personel- ";
            break;
          }
          case "IHVAN": {
            cellString += "Ihvan- ";
            break;
          }
          case "STANDART": {
            cellString += "Standart";
            break;
          }
        }
      }

      cellText = document.createTextNode(cellString);

      cell.appendChild(cellText);
      row.appendChild(cell);

      let cellButtonDelete = document.createElement("button");
      cell = document.createElement("td");
      cellButtonDelete.innerHTML = "Sil";

      cellButtonDelete.addEventListener("click", function() {
        let confirmDelete = confirm(
          "İndirim silinsin mi? Bu işlem geri alınamaz!"
        );
        if (confirmDelete) {
          Database.discounts = Database.discounts.filter(
            discount => discount.DiscountName != discountList[i].DiscountName
          );
          TableHelper.updateDiscountTable();
        }

        return;
      });
      cell.appendChild(cellButtonDelete);
      row.appendChild(cell);

      let cellButtonEdit = document.createElement("button");
      cell = document.createElement("td");
      cellButtonEdit.innerHTML = "Düzenle";

      cellButtonEdit.addEventListener("click", function() {
        DiscountFormHelper.editDiscountForm(discountList[i]);
        return;
      });
      cell.appendChild(cellButtonEdit);
      row.appendChild(cell);

      tblBody.appendChild(row);
    }
    table.appendChild(tblBody);

    discountTableParent.appendChild(table);
  }

 

  /**
   * İndirim tablosunda değişiklik yapıldığı zaman, mecvut tabloyu silerek yenisini ekler.
   */
  static updateDiscountTable() {
    let element = document.getElementById("discountTableId");
    element.parentNode.removeChild(element);

    TableHelper.createDiscountTable();
  }

  static printPreschoolTable(preschoolList) {
    let myPreschoolTableParent = document.getElementById("preschoolTableDiv"); // div

    let table = document.createElement("table"); // <table>
    let tblBody = document.createElement("tbody"); // <tbody>
    table.id = "preschoolTableId"; // <table id= "preschoolTableId">
    table.innerHTML = `<thead>
            <tr>
              <th scope="col">Anaokulunun Adı</th>
              <th scope="col">Anaokulu Ücreti</th>
              <th scope="col">Erken Kayıt Dönemi Sonu</th>
              <th scope="col">Sil</th>
              <th scope="col">Düzenle</th>
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
      cellText = document.createTextNode(preschoolList[i].Price);
      cell.appendChild(cellText);
      row.appendChild(cell);

      cell = document.createElement("td");
      cellText = document.createTextNode(
        preschoolList[i].EndOfEarlyRegistrationDate
      );
      cell.appendChild(cellText);
      row.appendChild(cell);

      cell = document.createElement("td");
      let cellButtonDelete = document.createElement("button");
      cellButtonDelete.innerHTML = "Sil";

      cellButtonDelete.addEventListener("click", function() {
        let confirmDelete = confirm(
          "Anaokulu silinsin mi? Bu işlem geri alınamaz!"
        );
        if (confirmDelete) {
          PreschoolManagementAPI.deletePreschoolWithAPI(preschoolList[i].Id);
          /*
          database.preschools = database.preschools.filter(
            preschool =>
              preschool.PreschoolName != preschoolList[i].PreschoolName
          );
          */
          TableHelper.updatePreschoolTable();
        }

        return;
      });
      cell.appendChild(cellButtonDelete);
      row.appendChild(cell);

      cell = document.createElement("td");
      let cellButtonEdit = document.createElement("button");
      cellButtonEdit.innerHTML = "Düzenle";
      cellButtonEdit.addEventListener("click", function() {
        PreschoolFormHelper.createPreschoolEditForm(preschoolList[i]);
        return;
      });
      cell.appendChild(cellButtonEdit);
      row.appendChild(cell);
      tblBody.appendChild(row);
    }
    table.appendChild(tblBody);
    myPreschoolTableParent.appendChild(table);
  }
  /**
   * Anaokulu yönetim sistemi bölümündeki anaokulu tablosunun dinamik olarak database'de tutulan preschools üzerinden oluşturan metod
   */
  static createPreschoolTable() {
    if (!document.getElementById("preschoolTableId")) {
      TableHelper.printPreschoolTable(Database.preschools);
    }
  }
  /**
   *
   */
  static updatePreschoolTable() {
    let element = document.getElementById("preschoolTableId");
    element.parentNode.removeChild(element);

    TableHelper.printPreschoolTable(Database.preschools);
  }

  static printHomeButton(parentDiv) {
    const li = document.createElement("li");
    const button = document.createElement("a");
    button.href = "#first";
    button.className = "button fit";
    button.innerText = "Anasayfaya Dön";
    li.appendChild(button);
    parentDiv.appendChild(li);
  }
}
