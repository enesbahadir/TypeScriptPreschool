import { preschoolHelper } from "./preschoolHelper";
import { tableHelper } from "./tableHelper";
import { IPreschool } from "./interface/IPreschool";

export class PreschoolFormHelper {

  static createPreschoolAppendForm() {
    if (document.getElementById("preschoolEditForm") != null) {
      document
        .getElementById("preschoolEditForm")
        .parentNode.removeChild(document.getElementById("preschoolEditForm"));
      document
        .getElementById("preschoolEditHeader")
        .parentNode.removeChild(document.getElementById("preschoolEditHeader"));
    }

    let preschoolAppendDiv = document.getElementById("preschoolAppendDiv");
    let preschoolAppendHeader = document.createElement("header");
    preschoolAppendHeader.id = "preschoolAppendHeader";
    preschoolAppendHeader.innerHTML =
      "<header> <h3> Anaokulu Ekleme Tablosu </h3> </header>";
    let preschoolAppendForm = document.createElement("form");
    preschoolAppendForm.id = "preschoolAppendForm";
    let preschoolAppendFieldsDiv = document.createElement("div");
    preschoolAppendFieldsDiv.className = "fields";
    let preschoolNameInputFieldDiv = document.createElement("div");
    preschoolNameInputFieldDiv.className = "field";

    let preschoolAppendNameLabel = <HTMLElement>document.createElement("p");
    preschoolAppendNameLabel.innerText = "Anaokulu İsmi";
    let preschoolAppendNameInput = <HTMLInputElement>(
      document.createElement("input")
    );
    preschoolAppendNameInput.type = "text";
    preschoolAppendNameInput.id = "preschoolAppendName";

    preschoolNameInputFieldDiv.appendChild(preschoolAppendNameLabel);
    preschoolNameInputFieldDiv.appendChild(preschoolAppendNameInput);
    preschoolAppendFieldsDiv.appendChild(preschoolNameInputFieldDiv);

    let preschoolPriceInputFieldDiv = document.createElement("div");
    preschoolPriceInputFieldDiv.className = "field";

    let preschoolAppendPriceLabel = <HTMLElement>document.createElement("p");
    preschoolAppendPriceLabel.innerText = "Anaokulu Ücreti";
    let preschoolAppendPriceInput = <HTMLInputElement>(
      document.createElement("input")
    );
    preschoolAppendPriceInput.type = "text";
    preschoolAppendPriceInput.id = "preschoolAppendPrice";

    preschoolPriceInputFieldDiv.appendChild(preschoolAppendPriceLabel);
    preschoolPriceInputFieldDiv.appendChild(preschoolAppendPriceInput);
    preschoolAppendFieldsDiv.appendChild(preschoolPriceInputFieldDiv);

    let preschoolDateInputFieldDiv = document.createElement("div");
    preschoolDateInputFieldDiv.className = "field";

    let preschoolAppendDateLabel = <HTMLElement>document.createElement("p");
    preschoolAppendDateLabel.innerText = "Anaokulu Erken Kayıt Bitiş Tarihi";
    let preschoolAppendDateInput = <HTMLInputElement>(
      document.createElement("input")
    );
    preschoolAppendDateInput.type = "text";
    preschoolAppendDateInput.id = "preschoolAppendDate";
    preschoolAppendDateInput.placeholder = "AA/GG/YYYY";

    preschoolDateInputFieldDiv.appendChild(preschoolAppendDateLabel);
    preschoolDateInputFieldDiv.appendChild(preschoolAppendDateInput);
    preschoolAppendFieldsDiv.appendChild(preschoolDateInputFieldDiv);

    preschoolAppendForm.appendChild(preschoolAppendFieldsDiv);
    preschoolAppendDiv.appendChild(preschoolAppendHeader);
    preschoolAppendForm.innerHTML += `<div class="field ">
									<ul class="actions stacked ">
										<li><a class="button fit" id="appendPreschool">Anaokulu
												Ekle</a></li>
									</ul>
								</div>`;
    preschoolAppendDiv.appendChild(preschoolAppendForm);

    let preschoolAppendButton = document.getElementById("appendPreschool");
    preschoolAppendButton.onclick = function() {
      preschoolHelper.createPreschoolFromInput();
      document
        .getElementById("preschoolAppendForm")
        .parentNode.removeChild(document.getElementById("preschoolAppendForm"));
      document
        .getElementById("preschoolAppendHeader")
        .parentNode.removeChild(
          document.getElementById("preschoolAppendHeader")
        );
      alert("Anaokulu başarılı bir şekilde eklendi.");
      tableHelper.updatePreschoolTable();
    };
  }

  static createPreschoolEditForm(preschool: IPreschool) {
    let preschoolAppendForm = document.getElementById("preschoolAppendForm");
    if (preschoolAppendForm != null) {
      preschoolAppendForm.parentNode.removeChild(preschoolAppendForm);
      document
        .getElementById("preschoolAppendHeader")
        .parentNode.removeChild(
          document.getElementById("preschoolAppendHeader")
        );
    }

    if (document.getElementById("preschoolEditForm") != null) {
      document
        .getElementById("preschoolEditForm")
        .parentNode.removeChild(document.getElementById("preschoolEditForm"));
      document
        .getElementById("preschoolEditHeader")
        .parentNode.removeChild(document.getElementById("preschoolEditHeader"));
    }
    let preschoolEditDiv = document.getElementById("preschoolEditDiv");
    let preschoolEditHeader = document.createElement("header");
    preschoolEditHeader.id = "preschoolEditHeader";
    preschoolEditHeader.innerHTML =
      "<header> <h3> Anaokulu Düzenleme Tablosu </h3> </header>";
    let preschoolEditForm = document.createElement("form");
    preschoolEditForm.id = "preschoolEditForm";
    let preschoolEditFieldsDiv = document.createElement("div");
    preschoolEditFieldsDiv.className = "fields";
    let preschoolNameInputFieldDiv = document.createElement("div");
    preschoolNameInputFieldDiv.className = "field";

    let preschoolEditNameLabel = <HTMLElement>document.createElement("p");
    preschoolEditNameLabel.innerText = "Anaokulu İsmi";
    let preschoolEditNameInput = <HTMLInputElement>(
      document.createElement("input")
    );
    preschoolEditNameInput.type = "text";
    preschoolEditNameInput.id = "preschoolEditName";
    preschoolEditNameInput.defaultValue = preschool.PreschoolName;

    preschoolNameInputFieldDiv.appendChild(preschoolEditNameLabel);
    preschoolNameInputFieldDiv.appendChild(preschoolEditNameInput);
    preschoolEditFieldsDiv.appendChild(preschoolNameInputFieldDiv);

    let preschoolPriceInputFieldDiv = document.createElement("div");
    preschoolPriceInputFieldDiv.className = "field";

    let preschoolEditPriceLabel = <HTMLElement>document.createElement("p");
    preschoolEditPriceLabel.innerText = "Anaokulu Ücreti";
    let preschoolEditPriceInput = <HTMLInputElement>(
      document.createElement("input")
    );
    preschoolEditPriceInput.type = "text";
    preschoolEditPriceInput.id = "preschoolEditPrice";
    preschoolEditPriceInput.defaultValue = preschool.Price.toString();

    preschoolPriceInputFieldDiv.appendChild(preschoolEditPriceLabel);
    preschoolPriceInputFieldDiv.appendChild(preschoolEditPriceInput);
    preschoolEditFieldsDiv.appendChild(preschoolPriceInputFieldDiv);

    let preschoolDateInputFieldDiv = document.createElement("div");
    preschoolDateInputFieldDiv.className = "field";

    let preschoolEditDateLabel = <HTMLElement>document.createElement("p");
    preschoolEditDateLabel.innerText = "Anaokulu Erken Kayıt Bitiş Tarihi";
    let preschoolEditDateInput = <HTMLInputElement>(
      document.createElement("input")
    );
    preschoolEditDateInput.type = "text";
    preschoolEditDateInput.id = "preschoolEditDate";
    preschoolEditDateInput.placeholder = "AA/GG/YYYY";
    preschoolEditDateInput.defaultValue = preschool.EndOfEarlyRegistrationDate;

    preschoolDateInputFieldDiv.appendChild(preschoolEditDateLabel);
    preschoolDateInputFieldDiv.appendChild(preschoolEditDateInput);
    preschoolEditFieldsDiv.appendChild(preschoolDateInputFieldDiv);

    preschoolEditForm.appendChild(preschoolEditFieldsDiv);
    preschoolEditDiv.appendChild(preschoolEditHeader);
    preschoolEditForm.innerHTML += `<div class="field ">
									<ul class="actions stacked ">
										<li><a class="button fit" id="editPreschool">Anaokulunu
											Düzenle</a></li>
									</ul>
								</div>`;
    preschoolEditDiv.appendChild(preschoolEditForm);

    const preschoolEditButton: HTMLElement = document.getElementById(
      "editPreschool"
    );

    preschoolEditButton.onclick = function() {
      preschoolHelper.editPreschoolFromInput(preschool);
      document
        .getElementById("preschoolEditForm")
        .parentNode.removeChild(document.getElementById("preschoolEditForm"));
      document
        .getElementById("preschoolEditHeader")
        .parentNode.removeChild(document.getElementById("preschoolEditHeader"));
      alert("Anaokulu başarılı bir şekilde düzenlendi.");
      tableHelper.updatePreschoolTable();
    };
  }
}