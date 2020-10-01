import { IDiscount } from "./interface/IDiscount";

export class tableHelper {
  /**
   * İndirim yönetim sistemi bölümündeki indiriö tablosunun dinamik olarak discountList üzerinden oluşturan metod
   */
  static createDiscountTable(discountList) {
    if (!document.getElementById("discountTableId")) {
      tableHelper.printDiscountTable(discountList);
    }
  }

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
   * Anaokulu yönetim sistemi bölümündeki anaokulu tablosunun dinamik olarak preschoolList üzerinden oluşturan metod
   */
  static createPreschoolTable(preschoolList) {
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
      cell.innerHTML =
        '<td><span class="icon style2 major fa-cog"></span></td>';
      row.appendChild(cell);

      tblBody.appendChild(row);
    }
    table.appendChild(tblBody);
    myPreschoolTableParent.appendChild(table);
  }
  /**
   * @TODO Anaokulu eklendiği zaman tabloyu yenileyecek olan metod, düzenlenmesi lazım
   */
  static updatePreschoolTable(preschoolList) {
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
      const rowString = tableHelper.toTableString(preschool);
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
  static toTableString(preschool: IPreschool): string {
    return `<tr scope = "row">
        <td>${preschool.PreschoolName}</td>
        <td>${preschool.Price}</td>
        <td>${preschool.EndOfEarlyRegistrationDate}</td>
        <td><span class="icon solid style2 major fa-cog"></span></td>
        <td><span class="icon solid style2 major fa-hashtag" ></span></td>
    </tr>`;
  }

  static updateDiscountTable(discountList) {
    debugger;
    let element = document. getElementById("discountTableId");
    element. parentNode. removeChild(element);
    
    tableHelper.createDiscountTable(discountList);
  }
}
