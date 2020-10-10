import { database } from "./database";
import { DiscountType } from "./enum/types";
import { formHelper } from "./formHelper";

import { PreschoolManagementAPI } from "./PreschoolManagementAPI";
/**
 * Sistemde gözükecek olan tabloların oluşturulduğu sınıftır.
 */
export class tableHelper {
  /**
   * İndirim tablosunun daha önceden sayfa olup-olmadığı kontrol eder.
   */
  static createDiscountTable() {
    if (!document.getElementById("discountTableId")) {
      tableHelper.printDiscountTable(database.discounts);
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
      let countOfPreschools = 0;
      if (
        (discountList[i].PreschoolNamesAndTheirDiscounts.length / 2) % 2 != 0 &&
        discountList[i].PreschoolNamesAndTheirDiscounts.length != 2
      ) {
        countOfPreschools =
          discountList[i].PreschoolNamesAndTheirDiscounts.length / 2 + 1;
      } else {
        countOfPreschools =
          discountList[i].PreschoolNamesAndTheirDiscounts.length / 2;
      }
      for (let j = 0, k = 1; j <= countOfPreschools; j += 2, k += 2) {
        let cellString = discountList[i].PreschoolNamesAndTheirDiscounts[
          j
        ].toString();
        cellString += "   ";
        cellString += discountList[i].PreschoolNamesAndTheirDiscounts[
          k
        ].toString();
        if (discountList[i].DiscountType == DiscountType.PERCENTAGE)
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

      let cellButtonDelete = document.createElement("button");
      cell = document.createElement("td");
      cellButtonDelete.innerHTML = "Sil";

      cellButtonDelete.addEventListener("click", function() {
        let confirmDelete = confirm(
          "İndirim silinsin mi? Bu işlem geri alınamaz!"
        );
        if (confirmDelete) {
          database.discounts = database.discounts.filter(
            discount => discount.DiscountName != discountList[i].DiscountName
          );
          tableHelper.updateDiscountTable();
        }

        return;
      });
      cell.appendChild(cellButtonDelete);
      row.appendChild(cell);

      let cellButtonEdit = document.createElement("button");
      cell = document.createElement("td");
      cellButtonEdit.innerHTML = "Düzenle";

      cellButtonEdit.addEventListener("click", function() {
        formHelper.editDiscountForm(discountList[i]);
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

    tableHelper.createDiscountTable();
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
          tableHelper.updatePreschoolTable();
        }

        return;
      });
      cell.appendChild(cellButtonDelete);
      row.appendChild(cell);

      cell = document.createElement("td");
      let cellButtonEdit = document.createElement("button");
      cellButtonEdit.innerHTML = "Düzenle";
      cellButtonEdit.addEventListener("click", function() {
        formHelper.createPreschoolEditForm(preschoolList[i]);
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
      tableHelper.printPreschoolTable(database.preschools);
    }
  }
  /**
   *
   */
  static updatePreschoolTable() {
    debugger;
    let element = document.getElementById("preschoolTableId");
    element.parentNode.removeChild(element);

    tableHelper.printPreschoolTable(database.preschools);
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
