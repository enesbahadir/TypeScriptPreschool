// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"ts-src/enum/types.ts":[function(require,module,exports) {
"use strict";
/**
 * Sistemde tanımlı kişi tiplerini, İndirim tiplerinin ve Kurumların Listelendiği enum sınıfları
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OrganizationName = exports.DiscountType = exports.UserType = void 0;
var UserType;

(function (UserType) {
  UserType[UserType["PERSONEL"] = 0] = "PERSONEL";
  UserType[UserType["IHVAN"] = 1] = "IHVAN";
  UserType[UserType["STANDART"] = 2] = "STANDART";
})(UserType = exports.UserType || (exports.UserType = {}));

var DiscountType;

(function (DiscountType) {
  DiscountType[DiscountType["PERCENTAGE"] = 0] = "PERCENTAGE";
  DiscountType[DiscountType["AMOUNT"] = 1] = "AMOUNT";
})(DiscountType = exports.DiscountType || (exports.DiscountType = {}));

var OrganizationName;

(function (OrganizationName) {
  OrganizationName[OrganizationName["SAGLIK"] = 0] = "SAGLIK";
  OrganizationName[OrganizationName["ANADOLU"] = 1] = "ANADOLU";
  OrganizationName[OrganizationName["NONE"] = 2] = "NONE";
})(OrganizationName = exports.OrganizationName || (exports.OrganizationName = {}));
},{}],"ts-src/PreschoolListFromAPI.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreschoolListFromAPI = void 0;

var PreschoolListFromAPI = /*#__PURE__*/function () {
  function PreschoolListFromAPI() {
    _classCallCheck(this, PreschoolListFromAPI);
  }

  _createClass(PreschoolListFromAPI, null, [{
    key: "getPreschoolsUsingXhr",
    value: function getPreschoolsUsingXhr() {
      debugger;
      var xhr = new XMLHttpRequest();
      var preschools = new Array();
      xhr.open("GET", 'http://localhost:8080/preschools/');

      xhr.onload = function (event) {
        var data = JSON.parse(event.target.response);

        if (Number(event.target.status) >= 200 && Number(event.target.status) < 400) {
          data._embedded.preschoolList.forEach(function (preschool) {
            preschools.push({
              PreschoolName: preschool.preschoolName,
              Price: Number(preschool.price),
              EndOfEarlyRegistrationDate: preschool.endOfEarlyRegistrationDate,
              Id: preschool.id
            });
          });
        } else {
          console.log('error');
        }
      };

      xhr.onerror = function (err) {
        console.log('[Error]', err);
      }; // Send XHR request


      xhr.send();
      return preschools;
    }
  }]);

  return PreschoolListFromAPI;
}();

exports.PreschoolListFromAPI = PreschoolListFromAPI;
},{}],"ts-src/database.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.database = void 0;

var types_1 = require("./enum/types");

var PreschoolListFromAPI_1 = require("./PreschoolListFromAPI");
/**
 * Sistemde kullanıcak olan Anaokulu ve İndirim listelerinin saklandığı ve oluşturulduğu sınıf
 */


var database = /*#__PURE__*/function () {
  function database() {
    _classCallCheck(this, database);
  }

  _createClass(database, null, [{
    key: "createPreschoolList",

    /**
     * Sistemde kullanılacak olan Anaokulu Listesinin default değerlerini listeye ekler.
     */
    value: function createPreschoolList() {
      this.preschools = PreschoolListFromAPI_1.PreschoolListFromAPI.getPreschoolsUsingXhr();
      /*this.preschools.push(
        {
          PreschoolName: "M Lalebahçesi",
          Price: 1200,
          EndOfEarlyRegistrationDate: "11/01/2020"
        },
        {
          PreschoolName: "Y Lalebahçesi",
          Price: 1000,
          EndOfEarlyRegistrationDate: "09/01/2020"
        }
      );*/

      return this.preschools;
    }
    /**
     *Sistemde kullanılacak olan İndirim Listesinin default değerlerini listeye ekler.
     */

  }, {
    key: "createDiscountList",
    value: function createDiscountList() {
      this.discounts.push({
        DiscountName: "Erken Kayıt İndirimi",
        DiscountType: types_1.DiscountType.PERCENTAGE,
        UserTypes: [types_1.UserType.PERSONEL, types_1.UserType.IHVAN, types_1.UserType.STANDART],
        OrganizationName: types_1.OrganizationName.NONE,
        PreschoolNamesAndTheirDiscounts: ["M Lalebahçesi", 20, "Y Lalebahçesi", 25]
      }, {
        DiscountName: "Personel İndirimi",
        DiscountType: types_1.DiscountType.PERCENTAGE,
        UserTypes: [types_1.UserType.PERSONEL],
        OrganizationName: types_1.OrganizationName.NONE,
        PreschoolNamesAndTheirDiscounts: ["M Lalebahçesi", 50, "Y Lalebahçesi", 50]
      }, {
        DiscountName: "Ihvan İndirimi",
        DiscountType: types_1.DiscountType.PERCENTAGE,
        UserTypes: [types_1.UserType.IHVAN],
        OrganizationName: types_1.OrganizationName.NONE,
        PreschoolNamesAndTheirDiscounts: ["M Lalebahçesi", 5, "Y Lalebahçesi", 5]
      }, {
        DiscountName: "Sağlık İndirimi",
        DiscountType: types_1.DiscountType.PERCENTAGE,
        UserTypes: [types_1.UserType.IHVAN, types_1.UserType.STANDART],
        OrganizationName: types_1.OrganizationName.SAGLIK,
        PreschoolNamesAndTheirDiscounts: ["M Lalebahçesi", 10]
      }, {
        DiscountName: "Anadolu İndirimi",
        DiscountType: types_1.DiscountType.AMOUNT,
        UserTypes: [types_1.UserType.IHVAN, types_1.UserType.STANDART],
        OrganizationName: types_1.OrganizationName.ANADOLU,
        PreschoolNamesAndTheirDiscounts: ["Y Lalebahçesi", 100]
      });
      return this.discounts;
    }
  }]);

  return database;
}();

exports.database = database;
database.preschools = new Array();
database.discounts = new Array();
},{"./enum/types":"ts-src/enum/types.ts","./PreschoolListFromAPI":"ts-src/PreschoolListFromAPI.ts"}],"ts-src/discountHelper.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.discountHelper = void 0;

var database_1 = require("./database");

var types_1 = require("./enum/types");
/**
 * İndirim ekleme işleminin yapıldığı sınıftır.
 */


var discountHelper = /*#__PURE__*/function () {
  function discountHelper() {
    _classCallCheck(this, discountHelper);
  }

  _createClass(discountHelper, null, [{
    key: "createDiscountFromInput",

    /**
     *  Kullanıcının girdiği bilgiler ile yeni indirim tanımlar. Yeni indirimi databse'de tutulan Anaokulu Listesine ekler.
     */
    value: function createDiscountFromInput() {
      var discountName = discountHelper.getDiscountName("discountAppend-discountName");
      var preschoolNamesAndTheirDiscounts = discountHelper.getpreschoolNamesAndTheirDiscounts();
      var discountType = discountHelper.getdiscountType("discount-append-percentage-radio");
      var userTypes = discountHelper.getUserTypes();
      var organizationName = discountHelper.getOrganizationName("discountAppend");
      database_1.database.discounts.push({
        DiscountName: discountName.value,
        DiscountType: discountType,
        UserTypes: userTypes,
        OrganizationName: organizationName,
        PreschoolNamesAndTheirDiscounts: preschoolNamesAndTheirDiscounts
      });
      alert("İndirim başarılı bir şekilde eklendi.");
      document.getElementById("discountAppendForm").parentNode.removeChild(document.getElementById("discountAppendForm"));
      document.getElementById("discountAppendHeader").parentNode.removeChild(document.getElementById("discountAppendHeader"));
    }
  }, {
    key: "editDiscountFromInput",
    value: function editDiscountFromInput(discount) {
      var discountName = discountHelper.getDiscountName("discountEdit-discountName");
      var preschoolNamesAndTheirDiscounts = discountHelper.getpreschoolNamesAndTheirDiscounts();
      var discountType = discountHelper.getdiscountType("discount-Edit-percentage-radio");
      var userTypes = discountHelper.getUserTypes();
      var organizationName = discountHelper.getOrganizationName("discountEdit");
      var indexOfDiscount = database_1.database.discounts.indexOf(discount);
      database_1.database.discounts[indexOfDiscount] = {
        DiscountName: discountName.value,
        DiscountType: discountType,
        UserTypes: userTypes,
        OrganizationName: organizationName,
        PreschoolNamesAndTheirDiscounts: preschoolNamesAndTheirDiscounts
      };
    }
  }, {
    key: "getDiscountName",
    value: function getDiscountName(id) {
      return document.getElementById(id);
    }
  }, {
    key: "getpreschoolNamesAndTheirDiscounts",
    value: function getpreschoolNamesAndTheirDiscounts() {
      var preschoolNamesAndTheirDiscounts = new Array();

      for (var i = 0; i < database_1.database.preschools.length; i++) {
        var checkbox = document.getElementById("discountAppendPreschoolCheckbox-" + i.toString());
        if (!checkbox.checked) continue;else {
          var text = document.getElementById("discountAppendPreschoolText-" + i.toString());
          preschoolNamesAndTheirDiscounts.push(checkbox.name, text.value);
        }
      }

      return preschoolNamesAndTheirDiscounts;
    }
  }, {
    key: "getdiscountType",
    value: function getdiscountType(id) {
      var discountType;
      var discountTypeRadio = document.getElementById(id);

      if (discountTypeRadio.checked) {
        discountType = types_1.DiscountType.PERCENTAGE;
      } else {
        discountType = types_1.DiscountType.AMOUNT;
      }

      return discountType;
    }
  }, {
    key: "getUserTypes",
    value: function getUserTypes() {
      var userTypes = new Array();
      var option = document.getElementById("user-type-personel");
      if (option.checked) userTypes.push(types_1.UserType.PERSONEL);
      option = document.getElementById("user-type-ihvan");
      if (option.checked) userTypes.push(types_1.UserType.IHVAN);
      option = document.getElementById("user-type-standart");
      if (option.checked) userTypes.push(types_1.UserType.STANDART);
      return userTypes;
    }
  }, {
    key: "getOrganizationName",
    value: function getOrganizationName(id) {
      var organizationName;
      var a = document.getElementById("organizationSelect-" + id);

      switch (a.value) {
        case "ANADOLU":
          {
            organizationName = types_1.OrganizationName.ANADOLU;
            break;
          }

        case "SAGLIK":
          {
            organizationName = types_1.OrganizationName.SAGLIK;
            break;
          }

        default:
          {
            organizationName = types_1.OrganizationName.NONE;
          }
      }

      return organizationName;
    }
  }]);

  return discountHelper;
}();

exports.discountHelper = discountHelper;
},{"./database":"ts-src/database.ts","./enum/types":"ts-src/enum/types.ts"}],"ts-src/PreschoolManagementAPI.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreschoolManagementAPI = void 0;

var database_1 = require("./database");

var PreschoolManagementAPI = /*#__PURE__*/function () {
  function PreschoolManagementAPI() {
    _classCallCheck(this, PreschoolManagementAPI);
  }

  _createClass(PreschoolManagementAPI, null, [{
    key: "createPreschoolWithAPI",
    value: function createPreschoolWithAPI(IPreschool) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", 'http://localhost:8080/preschools/', false);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(IPreschool);
      window.location.reload();
      database_1.database.createPreschoolList();
    }
  }, {
    key: "editPreschoolWithAPI",
    value: function editPreschoolWithAPI(IPreschool, id) {
      var xhr = new XMLHttpRequest();
      xhr.open("PUT", 'http://localhost:8080/preschools/' + id);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(IPreschool);
      window.location.reload();
      database_1.database.createPreschoolList();
    }
  }, {
    key: "deletePreschoolWithAPI",
    value: function deletePreschoolWithAPI(id) {
      var xhr = new XMLHttpRequest();
      xhr.open("DELETE", 'http://localhost:8080/preschools/' + id);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send();
      window.location.reload();
      database_1.database.createPreschoolList();
    }
  }]);

  return PreschoolManagementAPI;
}();

exports.PreschoolManagementAPI = PreschoolManagementAPI;
},{"./database":"ts-src/database.ts"}],"ts-src/tableHelper.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tableHelper = void 0;

var database_1 = require("./database");

var types_1 = require("./enum/types");

var formHelper_1 = require("./formHelper");

var PreschoolManagementAPI_1 = require("./PreschoolManagementAPI");
/**
 * Sistemde gözükecek olan tabloların oluşturulduğu sınıftır.
 */


var tableHelper = /*#__PURE__*/function () {
  function tableHelper() {
    _classCallCheck(this, tableHelper);
  }

  _createClass(tableHelper, null, [{
    key: "createDiscountTable",

    /**
     * İndirim tablosunun daha önceden sayfa olup-olmadığı kontrol eder.
     */
    value: function createDiscountTable() {
      if (!document.getElementById("discountTableId")) {
        tableHelper.printDiscountTable(database_1.database.discounts);
      }
    }
    /**
     * İndirim yönetim sistemi bölümündeki indirim tablosunun dinamik olarak database'de tutulan discounts üzerinden oluşturan metod
     */

  }, {
    key: "printDiscountTable",
    value: function printDiscountTable(discountList) {
      var discountTableParent = document.getElementById("discountTableDiv");
      var table = document.createElement("table");
      var tblBody = document.createElement("tbody");
      table.id = "discountTableId";
      table.innerHTML = "<thead>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th>\u0130ndirimin Ad\u0131</th>\n\t\t\t\t\t\t\t\t\t<th>\u0130ndirimin Uygulanca\u011F\u0131 Anaokulu ve Miktar\u0131</th>\n                  <th>\u0130ndirim Tipi</th>\n\t\t\t\t\t\t\t\t\t<th>Uygulanaca\u011F\u0131 Ki\u015Fi Tipi</th>\n\t\t\t\t\t\t\t\t\t<th>Sil</th>\n\t\t\t\t\t\t\t\t\t<th>D\xFCzenle</th>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</thead>";
      discountTableParent.appendChild(table);

      var _loop = function _loop(i) {
        var row = document.createElement("tr");
        var cell = document.createElement("td");
        var cellText = document.createTextNode(discountList[i].DiscountName);
        cell.appendChild(cellText);
        row.appendChild(cell);
        cell = document.createElement("td");
        var countOfPreschools = 0;

        if (discountList[i].PreschoolNamesAndTheirDiscounts.length / 2 % 2 != 0 && discountList[i].PreschoolNamesAndTheirDiscounts.length != 2) {
          countOfPreschools = discountList[i].PreschoolNamesAndTheirDiscounts.length / 2 + 1;
        } else {
          countOfPreschools = discountList[i].PreschoolNamesAndTheirDiscounts.length / 2;
        }

        for (var j = 0, k = 1; j <= countOfPreschools; j += 2, k += 2) {
          var _cellString = discountList[i].PreschoolNamesAndTheirDiscounts[j].toString();

          _cellString += "   ";
          _cellString += discountList[i].PreschoolNamesAndTheirDiscounts[k].toString();
          if (discountList[i].DiscountType == types_1.DiscountType.PERCENTAGE) _cellString += "% ";else _cellString += "TL ";
          cellText = document.createTextNode(_cellString);
          cell.appendChild(cellText);
        }

        row.appendChild(cell);
        cell = document.createElement("td");
        if (discountList[i].DiscountType) cellText = document.createTextNode("Miktar");else cellText = document.createTextNode("Yüzde");
        cell.appendChild(cellText);
        row.appendChild(cell);
        cell = document.createElement("td");
        var cellString = "";

        for (var _j = 0; _j < discountList[i].UserTypes.length; _j++) {
          switch (discountList[i].UserTypes[_j]) {
            case 0:
              {
                cellString += "Personel- ";
                break;
              }

            case 1:
              {
                cellString += "Ihvan- ";
                break;
              }

            case 2:
              {
                cellString += "Standart";
                break;
              }
          }
        }

        cellText = document.createTextNode(cellString);
        cell.appendChild(cellText);
        row.appendChild(cell);
        var cellButtonDelete = document.createElement("button");
        cell = document.createElement("td");
        cellButtonDelete.innerHTML = "Sil";
        cellButtonDelete.addEventListener("click", function () {
          var confirmDelete = confirm("İndirim silinsin mi? Bu işlem geri alınamaz!");

          if (confirmDelete) {
            database_1.database.discounts = database_1.database.discounts.filter(function (discount) {
              return discount.DiscountName != discountList[i].DiscountName;
            });
            tableHelper.updateDiscountTable();
          }

          return;
        });
        cell.appendChild(cellButtonDelete);
        row.appendChild(cell);
        var cellButtonEdit = document.createElement("button");
        cell = document.createElement("td");
        cellButtonEdit.innerHTML = "Düzenle";
        cellButtonEdit.addEventListener("click", function () {
          formHelper_1.formHelper.editDiscountForm(discountList[i]);
          return;
        });
        cell.appendChild(cellButtonEdit);
        row.appendChild(cell);
        tblBody.appendChild(row);
      };

      for (var i = 0; i < discountList.length; i++) {
        _loop(i);
      }

      table.appendChild(tblBody);
      discountTableParent.appendChild(table);
    }
    /**
     * İndirim tablosunda değişiklik yapıldığı zaman, mecvut tabloyu silerek yenisini ekler.
     */

  }, {
    key: "updateDiscountTable",
    value: function updateDiscountTable() {
      var element = document.getElementById("discountTableId");
      element.parentNode.removeChild(element);
      tableHelper.createDiscountTable();
    }
  }, {
    key: "printPreschoolTable",
    value: function printPreschoolTable(preschoolList) {
      var myPreschoolTableParent = document.getElementById("preschoolTableDiv"); // div

      var table = document.createElement("table"); // <table>

      var tblBody = document.createElement("tbody"); // <tbody>

      table.id = "preschoolTableId"; // <table id= "preschoolTableId">

      table.innerHTML = "<thead>\n            <tr>\n              <th scope=\"col\">Anaokulunun Ad\u0131</th>\n              <th scope=\"col\">Anaokulu \xDCcreti</th>\n              <th scope=\"col\">Erken Kay\u0131t D\xF6nemi Sonu</th>\n              <th scope=\"col\">Sil</th>\n              <th scope=\"col\">D\xFCzenle</th>\n            </tr>\n          </thead>";
      myPreschoolTableParent.appendChild(table);

      var _loop2 = function _loop2(i) {
        var row = document.createElement("tr"); //<tr>

        var cell = document.createElement("td"); //<td>

        var cellText = document.createTextNode(preschoolList[i].PreschoolName);
        cell.appendChild(cellText);
        row.appendChild(cell);
        cell = document.createElement("td");
        cellText = document.createTextNode(preschoolList[i].Price);
        cell.appendChild(cellText);
        row.appendChild(cell);
        cell = document.createElement("td");
        cellText = document.createTextNode(preschoolList[i].EndOfEarlyRegistrationDate);
        cell.appendChild(cellText);
        row.appendChild(cell);
        cell = document.createElement("td");
        var cellButtonDelete = document.createElement("button");
        cellButtonDelete.innerHTML = "Sil";
        cellButtonDelete.addEventListener("click", function () {
          var confirmDelete = confirm("Anaokulu silinsin mi? Bu işlem geri alınamaz!");

          if (confirmDelete) {
            PreschoolManagementAPI_1.PreschoolManagementAPI.deletePreschoolWithAPI(preschoolList[i].Id);
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
        var cellButtonEdit = document.createElement("button");
        cellButtonEdit.innerHTML = "Düzenle";
        cellButtonEdit.addEventListener("click", function () {
          formHelper_1.formHelper.createPreschoolEditForm(preschoolList[i]);
          return;
        });
        cell.appendChild(cellButtonEdit);
        row.appendChild(cell);
        tblBody.appendChild(row);
      };

      for (var i = 0; i < preschoolList.length; i++) {
        _loop2(i);
      }

      table.appendChild(tblBody);
      myPreschoolTableParent.appendChild(table);
    }
    /**
     * Anaokulu yönetim sistemi bölümündeki anaokulu tablosunun dinamik olarak database'de tutulan preschools üzerinden oluşturan metod
     */

  }, {
    key: "createPreschoolTable",
    value: function createPreschoolTable() {
      if (!document.getElementById("preschoolTableId")) {
        tableHelper.printPreschoolTable(database_1.database.preschools);
      }
    }
    /**
     *
     */

  }, {
    key: "updatePreschoolTable",
    value: function updatePreschoolTable() {
      debugger;
      var element = document.getElementById("preschoolTableId");
      element.parentNode.removeChild(element);
      tableHelper.printPreschoolTable(database_1.database.preschools);
    }
  }, {
    key: "printHomeButton",
    value: function printHomeButton(parentDiv) {
      var li = document.createElement("li");
      var button = document.createElement("a");
      button.href = "#first";
      button.className = "button fit";
      button.innerText = "Anasayfaya Dön";
      li.appendChild(button);
      parentDiv.appendChild(li);
    }
  }]);

  return tableHelper;
}();

exports.tableHelper = tableHelper;
},{"./database":"ts-src/database.ts","./enum/types":"ts-src/enum/types.ts","./formHelper":"ts-src/formHelper.ts","./PreschoolManagementAPI":"ts-src/PreschoolManagementAPI.ts"}],"ts-src/Preschool.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Preschool = void 0;
/**
 * Sistemde kullanılan anaokulu sınıfının bilgilerinin saklandığı sınıf
 */

var Preschool = /*#__PURE__*/function () {
  function Preschool(preschoolName, endOfEarlyRegistrationDate, price, id) {
    var _this = this;

    _classCallCheck(this, Preschool);

    this.toString = function () {
      return "{" + "\"preschoolName\"" + ":" + "\"" + _this._preschoolName + "\"" + "," + "\"endOfEarlyRegistrationDate\"" + ":" + "\"" + _this._endOfEarlyRegistrationDate + "\"" + "," + "\"price\"" + ":\"" + _this._price + "\"" + "," + "\"id\"" + ":\"" + _this._id + "\"" + "}";
    };

    this._endOfEarlyRegistrationDate = endOfEarlyRegistrationDate;
    this._preschoolName = preschoolName;
    this._price = price;
    this._id = id;
  }

  _createClass(Preschool, [{
    key: "isInEarlyRegistrationDate",
    value: function isInEarlyRegistrationDate(endOfEarlyRegistrationDate) {
      var date = Date.parse(endOfEarlyRegistrationDate);
      return false;
    }
  }, {
    key: "Id",
    get: function get() {
      return this._id;
    },
    set: function set(id) {
      this._id = id;
    }
  }, {
    key: "IsInEarlyRegistration",
    get: function get() {
      return this._isInEarlyRegistration;
    },
    set: function set(isInEarlyRegistration) {
      this._isInEarlyRegistration = isInEarlyRegistration;
    }
  }, {
    key: "PreschoolName",
    get: function get() {
      return this._preschoolName;
    }
  }, {
    key: "preschoolName",
    set: function set(preschoolName) {
      this._preschoolName = preschoolName;
    }
  }, {
    key: "Price",
    get: function get() {
      return this._price;
    },
    set: function set(price) {
      this._price = price;
    }
  }, {
    key: "EndOfEarlyRegistrationDate",
    get: function get() {
      return this._endOfEarlyRegistrationDate;
    },
    set: function set(endOfEarlyRegistrationDate) {
      this._endOfEarlyRegistrationDate = endOfEarlyRegistrationDate;
    }
  }]);

  return Preschool;
}();

exports.Preschool = Preschool;
},{}],"ts-src/preschoolHelper.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.preschoolHelper = void 0;

var database_1 = require("./database");

var Preschool_1 = require("./Preschool");

var PreschoolManagementAPI_1 = require("./PreschoolManagementAPI");

var preschoolHelper = /*#__PURE__*/function () {
  function preschoolHelper() {
    _classCallCheck(this, preschoolHelper);
  }

  _createClass(preschoolHelper, null, [{
    key: "createPreschoolFromInput",
    value: function createPreschoolFromInput() {
      var preschoolName = document.getElementById("preschoolAppendName");
      var preschoolPrice = document.getElementById("preschoolAppendPrice");
      var preschoolRegistrationDate = document.getElementById("preschoolAppendDate");
      var newPreschool = new Preschool_1.Preschool(preschoolName.value, preschoolRegistrationDate.value, Number(preschoolPrice.value), database_1.database.preschools.length + 1);
      PreschoolManagementAPI_1.PreschoolManagementAPI.createPreschoolWithAPI(newPreschool);
      /*database.preschools.push({
        PreschoolName: preschoolName.value,
        Price: Number(preschoolPrice.value),
        EndOfEarlyRegistrationDate: preschoolRegistrationDate.value
      });*/
    }
  }, {
    key: "editPreschoolFromInput",
    value: function editPreschoolFromInput(preschool) {
      var preschoolName = document.getElementById("preschoolEditName");
      var preschoolPrice = document.getElementById("preschoolEditPrice");
      var preschoolRegistrationDate = document.getElementById("preschoolEditDate");
      var indexOfPreschool = database_1.database.preschools.indexOf(preschool);
      var newPreschool = new Preschool_1.Preschool(preschoolName.value, preschoolRegistrationDate.value, Number(preschoolPrice.value), indexOfPreschool + 1);
      PreschoolManagementAPI_1.PreschoolManagementAPI.editPreschoolWithAPI(newPreschool, indexOfPreschool + 1);
      /* database.preschools[indexOfPreschool] = {
         PreschoolName: preschoolName.value,
         Price: Number(preschoolPrice.value),
         EndOfEarlyRegistrationDate: preschoolRegistrationDate.value
       };*/
    }
  }]);

  return preschoolHelper;
}();

exports.preschoolHelper = preschoolHelper;
},{"./database":"ts-src/database.ts","./Preschool":"ts-src/Preschool.ts","./PreschoolManagementAPI":"ts-src/PreschoolManagementAPI.ts"}],"ts-src/formHelper.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formHelper = void 0;

var types_1 = require("./enum/types");

var database_1 = require("./database");

var discountHelper_1 = require("./discountHelper");

var tableHelper_1 = require("./tableHelper");

var preschoolHelper_1 = require("./preschoolHelper");
/**
 * Sistemde giriş yapılacak olan formların oluşturulduğu sınıftır.
 */


var formHelper = /*#__PURE__*/function () {
  function formHelper() {
    _classCallCheck(this, formHelper);
  }

  _createClass(formHelper, null, [{
    key: "createPreschoolSelectList",

    /**
     * İndirim hesaplama bölümünde kullanıcının, indirimin hesaplayanacağı anaokulunu dinamik olarak preschoolList üzerinden
     * dropdown olarak dolduran metod.
     */
    value: function createPreschoolSelectList(myParent) {
      var selectList = document.createElement("select");
      selectList.id = "myPreschoolSelect";
      selectList.innerHTML = "<option value=\"none\" selected disabled hidden required> \n          L\xFCtfen Anaokulu Se\xE7iniz";
      myParent.appendChild(selectList);

      for (var i = 0; i < database_1.database.preschools.length; i++) {
        var option = document.createElement("option");
        option.value = i.toString();
        option.text = database_1.database.preschools[i].PreschoolName;
        selectList.appendChild(option);
      }
    }
    /**
     * İndirim hesaplama bölümünde kullanıcının, indirimin hesaplayanacağı kurumun dinamik olarak enum sınıfları içerisindeki OrganizationName'den dropdown olarak dolduran metod.
     */

  }, {
    key: "createOrganizationNameSelectList",
    value: function createOrganizationNameSelectList(myOrganizationParent, id, discount) {
      var selectOrganizationList = document.createElement("select");
      selectOrganizationList.id = "organizationSelect-" + id;
      selectOrganizationList.innerHTML = "<option value=\"none\" selected disabled hidden> \n          L\xFCtfen \xC7al\u0131\u015F\u0131lan Kurumu Se\xE7iniz";
      myOrganizationParent.appendChild(selectOrganizationList);

      for (var i in types_1.OrganizationName) {
        if (isNaN(Number(i))) {
          var option = document.createElement("option");
          option.text = i;
          selectOrganizationList.appendChild(option);

          if (discount) {
            var org = discount.OrganizationName;
            var dis = void 0;

            switch (org) {
              case 0:
                {
                  dis = "SAGLIK";
                  break;
                }

              case 1:
                {
                  dis = "ANADOLU";
                  break;
                }

              case 2:
                {
                  dis = "NONE";
                  break;
                }
            }

            if (dis === i) {
              option.defaultSelected = true;
            }
          }
        }
      }
    }
    /**
     * Kişi tiplerini checkbox olarak tek satırda 3 hücre olacak şekilde pararmetre olarak alınan parent nesnesine child olarak ekler.
     */

  }, {
    key: "createUserTypeCheckBox",
    value: function createUserTypeCheckBox(parent, discount) {
      var div = document.createElement("div");
      div.className = "field third";
      var option = document.createElement("input");
      option.type = "checkbox";
      option.id = "user-type-personel";
      option.name = "user-type-personel";
      var label = document.createElement("label");
      label.setAttribute("for", option.id);
      var labelText = document.createTextNode("Personel");
      label.appendChild(labelText);
      div.appendChild(option);
      div.appendChild(label);
      var div2 = document.createElement("div");
      div2.className = "field third";
      var option2 = document.createElement("input");
      option2.type = "checkbox";
      option2.id = "user-type-ihvan";
      option2.name = "user-type-ihvan";
      var label2 = document.createElement("label");
      label2.setAttribute("for", option2.id);
      var labelText2 = document.createTextNode("Ihvan");
      label2.appendChild(labelText2);
      div2.appendChild(option2);
      div2.appendChild(label2);
      var div3 = document.createElement("div");
      div3.className = "field third";
      var option3 = document.createElement("input");
      option3.type = "checkbox";
      option3.id = "user-type-standart";
      option3.name = "user-type-standart";
      var label3 = document.createElement("label");
      label3.setAttribute("for", option3.id);
      var labelText3 = document.createTextNode("Standart");
      label3.appendChild(labelText3);
      div3.appendChild(option3);
      div3.appendChild(label3);

      if (discount) {
        if (discount.UserTypes.includes(types_1.UserType.PERSONEL)) option.defaultChecked = true;
        if (discount.UserTypes.includes(types_1.UserType.IHVAN)) option2.defaultChecked = true;
        if (discount.UserTypes.includes(types_1.UserType.STANDART)) option3.defaultChecked = true;
      }

      parent.appendChild(div);
      parent.appendChild(div2);
      parent.appendChild(div3);
    }
    /**
    * Yeni indirim ekleme için gerekli bilgilerin istendiği formunu oluşturur,
    * <form>
          <div class="fields">
        <div class="field"> ... html yapısını kullanır.
    */

  }, {
    key: "createAppendDiscountForm",
    value: function createAppendDiscountForm() {
      if (document.getElementById("discountEditForm") != null) {
        document.getElementById("discountEditForm").parentNode.removeChild(document.getElementById("discountEditForm"));
        document.getElementById("discountEditHeader").parentNode.removeChild(document.getElementById("discountEditHeader"));
      }

      var discountAppendParent = document.getElementById("discountAppendFormDiv"); // formun oluşturulacağı div

      var discountAppendHeader = document.createElement("header");
      discountAppendHeader.id = "discountAppendHeader";
      discountAppendHeader.innerHTML = "<header> <h3> İndirim Ekleme Tablosu </h3> </header>";
      var discountAppendForm = document.createElement("form");
      discountAppendForm.id = "discountAppendForm";
      var discountAppendFieldsDiv = document.createElement("div"); // her bir input satırının toplanacağı div, fields

      discountAppendFieldsDiv.className = "fields";
      var discountNameInputFieldDiv = document.createElement("div"); // indirim isminin istendiği div, field

      discountNameInputFieldDiv.className = "field";
      var discountAppendNameLabel = document.createElement("p");
      discountAppendNameLabel.innerText = "İndirim İsmi";
      var discountAppendNameInput = document.createElement("input");
      discountAppendNameInput.type = "text";
      discountAppendNameInput.id = "discountAppend-discountName";
      discountNameInputFieldDiv.appendChild(discountAppendNameLabel);
      discountNameInputFieldDiv.appendChild(discountAppendNameInput);
      discountAppendFieldsDiv.appendChild(discountNameInputFieldDiv);
      formHelper.createPreschoolCheckboxAndDiscountInput(discountAppendFieldsDiv);
      var discountTypePercentFieldDiv = document.createElement("div");
      discountTypePercentFieldDiv.className = "field half";
      var discountTypePercentRadio = document.createElement("input");
      discountTypePercentRadio.type = "radio";
      discountTypePercentRadio.name = "priority";
      discountTypePercentRadio.value = "PERCENTAGE";
      discountTypePercentRadio.id = "discount-append-percentage-radio";
      var discountTypePercentRadioLabel = document.createElement("label");
      discountTypePercentRadioLabel.setAttribute("for", "discount-append-percentage-radio");
      discountTypePercentRadioLabel.innerText = "Yüzde";
      var discountTypeAmountFieldDiv = document.createElement("div");
      discountTypeAmountFieldDiv.className = "field half";
      var discountTypeAmountRadio = document.createElement("input");
      discountTypeAmountRadio.type = "radio";
      discountTypeAmountRadio.name = "priority";
      discountTypeAmountRadio.value = "AMOUNT";
      discountTypeAmountRadio.id = "discount-append-amount-radio";
      var discountTypeAmountRadioLabel = document.createElement("label");
      discountTypeAmountRadioLabel.setAttribute("for", "discount-append-amount-radio");
      discountTypeAmountRadioLabel.innerText = "Miktar";
      discountTypePercentFieldDiv.appendChild(discountTypePercentRadio);
      discountTypePercentFieldDiv.appendChild(discountTypePercentRadioLabel);
      discountTypeAmountFieldDiv.appendChild(discountTypeAmountRadio);
      discountTypeAmountFieldDiv.appendChild(discountTypeAmountRadioLabel);
      discountAppendFieldsDiv.appendChild(discountTypePercentFieldDiv);
      discountAppendFieldsDiv.appendChild(discountTypeAmountFieldDiv);
      formHelper.createUserTypeCheckBox(discountAppendFieldsDiv);
      var discountOrganizationFieldDiv = document.createElement("div");
      discountOrganizationFieldDiv.className = "field";
      discountOrganizationFieldDiv.id = "discountOrganizationFieldDiv";
      formHelper.createOrganizationNameSelectList(discountOrganizationFieldDiv, "discountAppend");
      discountAppendFieldsDiv.appendChild(discountOrganizationFieldDiv);
      discountAppendForm.appendChild(discountAppendFieldsDiv);
      discountAppendParent.appendChild(discountAppendHeader);
      discountAppendForm.innerHTML += "<div class=\"field \">\n\t\t\t\t\t\t\t\t\t<ul class=\"actions stacked \">\n\t\t\t\t\t\t\t\t\t\t<li><a class=\"button fit\" id=\"appendDiscount\">\u0130ndirim\n\t\t\t\t\t\t\t\t\t\t\t\tEkle</a></li>\n\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t</div>";
      discountAppendParent.appendChild(discountAppendForm);
    }
    /**
     *
     */

  }, {
    key: "editDiscountForm",
    value: function editDiscountForm(discount) {
      var discountAppendForm = document.getElementById("discountAppendForm");

      if (discountAppendForm != null) {
        discountAppendForm.parentNode.removeChild(discountAppendForm);
        document.getElementById("discountAppendHeader").parentNode.removeChild(document.getElementById("discountAppendHeader"));
      }

      if (document.getElementById("discountEditForm") != null) {
        document.getElementById("discountEditForm").parentNode.removeChild(document.getElementById("discountEditForm"));
        document.getElementById("discountEditHeader").parentNode.removeChild(document.getElementById("discountEditHeader"));
      }

      var discountEditParent = document.getElementById("discountEditFormDiv");
      var discountEditHeader = document.createElement("header");
      discountEditHeader.id = "discountEditHeader";
      discountEditHeader.innerHTML = "<header> <h3> İndirim Düzenleme Tablosu </h3> </header>";
      var discountEditForm = document.createElement("form");
      discountEditForm.id = "discountEditForm";
      var discountEditFieldsDiv = document.createElement("div"); // her bir input satırının toplanacağı div, fields

      discountEditFieldsDiv.className = "fields";
      var discountEditNameInputFieldDiv = document.createElement("div"); // indirim isminin istendiği div, field

      discountEditNameInputFieldDiv.className = "field";
      var discountEditNameLabel = document.createElement("p");
      discountEditNameLabel.innerText = "İndirim İsmi";
      var discountEditNameInput = document.createElement("input");
      discountEditNameInput.type = "text";
      discountEditNameInput.id = "discountEdit-discountName";
      discountEditNameInput.defaultValue = discount.DiscountName;
      discountEditNameInputFieldDiv.appendChild(discountEditNameLabel);
      discountEditNameInputFieldDiv.appendChild(discountEditNameInput);
      discountEditFieldsDiv.appendChild(discountEditNameInputFieldDiv);
      formHelper.createPreschoolCheckboxAndDiscountInput(discountEditFieldsDiv, discount);
      var discountEditTypePercentFieldDiv = document.createElement("div");
      discountEditTypePercentFieldDiv.className = "field half";
      var discountTypePercentRadio = document.createElement("input");
      discountTypePercentRadio.type = "radio";
      discountTypePercentRadio.name = "priority";
      discountTypePercentRadio.value = "PERCENTAGE";
      discountTypePercentRadio.id = "discount-Edit-percentage-radio";
      if (discount.DiscountType == types_1.DiscountType.PERCENTAGE) discountTypePercentRadio.defaultChecked = true;
      var discountTypePercentRadioLabel = document.createElement("label");
      discountTypePercentRadioLabel.setAttribute("for", "discount-Edit-percentage-radio");
      discountTypePercentRadioLabel.innerText = "Yüzde";
      var discountEditTypeAmountFieldDiv = document.createElement("div");
      discountEditTypeAmountFieldDiv.className = "field half";
      var discountTypeAmountRadio = document.createElement("input");
      discountTypeAmountRadio.type = "radio";
      discountTypeAmountRadio.name = "priority";
      discountTypeAmountRadio.value = "AMOUNT";
      discountTypeAmountRadio.id = "discount-Edit-amount-radio";
      var discountTypeAmountRadioLabel = document.createElement("label");
      discountTypeAmountRadioLabel.setAttribute("for", "discount-Edit-amount-radio");
      discountTypeAmountRadioLabel.innerText = "Miktar";
      if (discount.DiscountType == types_1.DiscountType.AMOUNT) discountTypeAmountRadio.defaultChecked = true;
      discountEditTypePercentFieldDiv.appendChild(discountTypePercentRadio);
      discountEditTypePercentFieldDiv.appendChild(discountTypePercentRadioLabel);
      discountEditTypeAmountFieldDiv.appendChild(discountTypeAmountRadio);
      discountEditTypeAmountFieldDiv.appendChild(discountTypeAmountRadioLabel);
      discountEditFieldsDiv.appendChild(discountEditTypePercentFieldDiv);
      discountEditFieldsDiv.appendChild(discountEditTypeAmountFieldDiv);
      formHelper.createUserTypeCheckBox(discountEditFieldsDiv, discount);
      var discountOrganizationFieldDiv = document.createElement("div");
      discountOrganizationFieldDiv.className = "field";
      discountOrganizationFieldDiv.id = "discountOrganizationFieldDiv";
      formHelper.createOrganizationNameSelectList(discountOrganizationFieldDiv, "discountEdit", discount);
      discountEditFieldsDiv.appendChild(discountOrganizationFieldDiv);
      discountEditForm.appendChild(discountEditFieldsDiv);
      discountEditParent.appendChild(discountEditHeader);
      discountEditForm.innerHTML += "<div class=\"field \">\n\t\t\t\t\t\t\t\t\t<ul class=\"actions stacked \">\n\t\t\t\t\t\t\t\t\t\t<li><a class=\"button fit\" id=\"editDiscount\">\u0130ndirimi\n\t\t\t\t\t\t\t\t\t\t\tD\xFCzenle</a></li>\n\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t</div>";
      discountEditParent.appendChild(discountEditForm);
      var discountEditButton = document.getElementById("editDiscount");

      discountEditButton.onclick = function () {
        discountHelper_1.discountHelper.editDiscountFromInput(discount);
        tableHelper_1.tableHelper.updateDiscountTable();
        document.getElementById("discountEditForm").parentNode.removeChild(document.getElementById("discountEditForm"));
        document.getElementById("discountEditHeader").parentNode.removeChild(document.getElementById("discountEditHeader"));
        alert("İndirim başarılı bir şekilde güncellendi.");
      };
    }
    /**
     * Yeni indirim ekleme tablosunda indirimin ekleneceği anaokullarını ve miktarlarını checkbox ve text input olarak dinanik olarak doldurur.
     */

  }, {
    key: "createPreschoolCheckboxAndDiscountInput",
    value: function createPreschoolCheckboxAndDiscountInput(parentDiv, discount) {
      for (var i = 0; i < database_1.database.preschools.length; i++) {
        var div1 = document.createElement("div");
        div1.className = "field half";
        var option = document.createElement("input");
        option.type = "checkbox";
        option.id = "discountAppendPreschoolCheckbox-" + i.toString();
        option.name = database_1.database.preschools[i].PreschoolName;
        var label = document.createElement("label");
        label.setAttribute("for", option.id);
        var labelText = document.createTextNode(database_1.database.preschools[i].PreschoolName);
        label.appendChild(labelText);
        div1.appendChild(option);
        div1.appendChild(label);
        var div2 = document.createElement("div");
        div2.className = "field half";
        var discountAppendPreschoolInput = document.createElement("input");
        discountAppendPreschoolInput.type = "text";
        discountAppendPreschoolInput.id = "discountAppendPreschoolText-" + i.toString();

        if (discount) {
          if (discount.PreschoolNamesAndTheirDiscounts.includes(database_1.database.preschools[i].PreschoolName)) {
            option.defaultChecked = true;
            var index = discount.PreschoolNamesAndTheirDiscounts.indexOf(database_1.database.preschools[i].PreschoolName);
            discountAppendPreschoolInput.defaultValue = discount.PreschoolNamesAndTheirDiscounts[index + 1];
          }
        }

        div2.appendChild(discountAppendPreschoolInput);
        parentDiv.appendChild(div1);
        parentDiv.appendChild(div2);
      }
    }
  }, {
    key: "createUserInputForm",
    value: function createUserInputForm() {
      var userInputDiv = document.getElementById("userInputDiv");
      if (!document.getElementById("userInputForm")) userInputDiv.innerHTML = "\t\t\t\t\t\n          <form method=\"post\" action=\"#\" id = \"userInputForm\">\n\t\t\t\t\t\t<div class=\"fields\">\n\t\t\t\t\t\t\t<div class=\"field\">\n\t\t\t\t\t\t\t\t<label for=\"name\">Kullan\u0131c\u0131 \u0130smi</label>\n\t\t\t\t\t\t\t\t<input type=\"text\" name=\"name\" id=\"userName\" value=\"\" required/>\n                    </div>\n\t\t\t\t\t\t\t\t<div class=\"field\" id=\"selectField\">\n\t\t\t\t\t\t\t\t\t<label for=\"preschool\">Anaokulu</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"field\" id=\"selectOrganizationField\">\n\t\t\t\t\t\t\t\t\t<label for=\"orgazationName\">\xC7al\u0131\u015F\u0131lan Kurum</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"field third\" id=\"userTypeRadio\">\n\t\t\t\t\t\t\t\t\t<input type=\"radio\" id=\"user-personel\" name=\"priority\" value=\"PERSONEL\" checked />\n\t\t\t\t\t\t\t\t\t<label for=\"user-personel\">Personel</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"field third\">\n\t\t\t\t\t\t\t\t\t<input type=\"radio\" id=\"user-ihvan\" name=\"priority\" value = \"IHVAN\" />\n\t\t\t\t\t\t\t\t\t<label for=\"user-ihvan\">Ihvan</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"field third\">\n\t\t\t\t\t\t\t\t\t<input type=\"radio\" id=\"user-standart\" name=\"priority\" value = \"STANDART\" />\n\t\t\t\t\t\t\t\t\t<label for=\"user-standart\">Standart</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"field \">\n\t\t\t\t\t\t\t\t\t<ul class=\"actions stacked \" id = \"discountCalculateButtonUl\">\n\t\t\t\t\t\t\t\t\t\t<li><a href=\"#discount-result\" class=\"button fit\" id=\"calculate\">\u0130ndirim\n\t\t\t\t\t\t\t\t\t\t\t\tHesapla</a></li>\n\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\t<div class=\"field \">\n\t\t\t\t\t\t\t\t\t<header id=\"discount-result\">\n\t\t\t\t\t\t\t\t\t</header>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t</form>";
    }
  }, {
    key: "createPreschoolAppendForm",
    value: function createPreschoolAppendForm() {
      if (document.getElementById("preschoolEditForm") != null) {
        document.getElementById("preschoolEditForm").parentNode.removeChild(document.getElementById("preschoolEditForm"));
        document.getElementById("preschoolEditHeader").parentNode.removeChild(document.getElementById("preschoolEditHeader"));
      }

      var preschoolAppendDiv = document.getElementById("preschoolAppendDiv");
      var preschoolAppendHeader = document.createElement("header");
      preschoolAppendHeader.id = "preschoolAppendHeader";
      preschoolAppendHeader.innerHTML = "<header> <h3> Anaokulu Ekleme Tablosu </h3> </header>";
      var preschoolAppendForm = document.createElement("form");
      preschoolAppendForm.id = "preschoolAppendForm";
      var preschoolAppendFieldsDiv = document.createElement("div");
      preschoolAppendFieldsDiv.className = "fields";
      var preschoolNameInputFieldDiv = document.createElement("div");
      preschoolNameInputFieldDiv.className = "field";
      var preschoolAppendNameLabel = document.createElement("p");
      preschoolAppendNameLabel.innerText = "Anaokulu İsmi";
      var preschoolAppendNameInput = document.createElement("input");
      preschoolAppendNameInput.type = "text";
      preschoolAppendNameInput.id = "preschoolAppendName";
      preschoolNameInputFieldDiv.appendChild(preschoolAppendNameLabel);
      preschoolNameInputFieldDiv.appendChild(preschoolAppendNameInput);
      preschoolAppendFieldsDiv.appendChild(preschoolNameInputFieldDiv);
      var preschoolPriceInputFieldDiv = document.createElement("div");
      preschoolPriceInputFieldDiv.className = "field";
      var preschoolAppendPriceLabel = document.createElement("p");
      preschoolAppendPriceLabel.innerText = "Anaokulu Ücreti";
      var preschoolAppendPriceInput = document.createElement("input");
      preschoolAppendPriceInput.type = "text";
      preschoolAppendPriceInput.id = "preschoolAppendPrice";
      preschoolPriceInputFieldDiv.appendChild(preschoolAppendPriceLabel);
      preschoolPriceInputFieldDiv.appendChild(preschoolAppendPriceInput);
      preschoolAppendFieldsDiv.appendChild(preschoolPriceInputFieldDiv);
      var preschoolDateInputFieldDiv = document.createElement("div");
      preschoolDateInputFieldDiv.className = "field";
      var preschoolAppendDateLabel = document.createElement("p");
      preschoolAppendDateLabel.innerText = "Anaokulu Erken Kayıt Bitiş Tarihi";
      var preschoolAppendDateInput = document.createElement("input");
      preschoolAppendDateInput.type = "text";
      preschoolAppendDateInput.id = "preschoolAppendDate";
      preschoolAppendDateInput.placeholder = "AA/GG/YYYY";
      preschoolDateInputFieldDiv.appendChild(preschoolAppendDateLabel);
      preschoolDateInputFieldDiv.appendChild(preschoolAppendDateInput);
      preschoolAppendFieldsDiv.appendChild(preschoolDateInputFieldDiv);
      preschoolAppendForm.appendChild(preschoolAppendFieldsDiv);
      preschoolAppendDiv.appendChild(preschoolAppendHeader);
      preschoolAppendForm.innerHTML += "<div class=\"field \">\n\t\t\t\t\t\t\t\t\t<ul class=\"actions stacked \">\n\t\t\t\t\t\t\t\t\t\t<li><a class=\"button fit\" id=\"appendPreschool\">Anaokulu\n\t\t\t\t\t\t\t\t\t\t\t\tEkle</a></li>\n\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t</div>";
      preschoolAppendDiv.appendChild(preschoolAppendForm);
      var preschoolAppendButton = document.getElementById("appendPreschool");

      preschoolAppendButton.onclick = function () {
        preschoolHelper_1.preschoolHelper.createPreschoolFromInput();
        document.getElementById("preschoolAppendForm").parentNode.removeChild(document.getElementById("preschoolAppendForm"));
        document.getElementById("preschoolAppendHeader").parentNode.removeChild(document.getElementById("preschoolAppendHeader"));
        alert("Anaokulu başarılı bir şekilde eklendi.");
        tableHelper_1.tableHelper.updatePreschoolTable();
      };
    }
  }, {
    key: "createPreschoolEditForm",
    value: function createPreschoolEditForm(preschool) {
      var preschoolAppendForm = document.getElementById("preschoolAppendForm");

      if (preschoolAppendForm != null) {
        preschoolAppendForm.parentNode.removeChild(preschoolAppendForm);
        document.getElementById("preschoolAppendHeader").parentNode.removeChild(document.getElementById("preschoolAppendHeader"));
      }

      if (document.getElementById("preschoolEditForm") != null) {
        document.getElementById("preschoolEditForm").parentNode.removeChild(document.getElementById("preschoolEditForm"));
        document.getElementById("preschoolEditHeader").parentNode.removeChild(document.getElementById("preschoolEditHeader"));
      }

      var preschoolEditDiv = document.getElementById("preschoolEditDiv");
      var preschoolEditHeader = document.createElement("header");
      preschoolEditHeader.id = "preschoolEditHeader";
      preschoolEditHeader.innerHTML = "<header> <h3> Anaokulu Düzenleme Tablosu </h3> </header>";
      var preschoolEditForm = document.createElement("form");
      preschoolEditForm.id = "preschoolEditForm";
      var preschoolEditFieldsDiv = document.createElement("div");
      preschoolEditFieldsDiv.className = "fields";
      var preschoolNameInputFieldDiv = document.createElement("div");
      preschoolNameInputFieldDiv.className = "field";
      var preschoolEditNameLabel = document.createElement("p");
      preschoolEditNameLabel.innerText = "Anaokulu İsmi";
      var preschoolEditNameInput = document.createElement("input");
      preschoolEditNameInput.type = "text";
      preschoolEditNameInput.id = "preschoolEditName";
      preschoolEditNameInput.defaultValue = preschool.PreschoolName;
      preschoolNameInputFieldDiv.appendChild(preschoolEditNameLabel);
      preschoolNameInputFieldDiv.appendChild(preschoolEditNameInput);
      preschoolEditFieldsDiv.appendChild(preschoolNameInputFieldDiv);
      var preschoolPriceInputFieldDiv = document.createElement("div");
      preschoolPriceInputFieldDiv.className = "field";
      var preschoolEditPriceLabel = document.createElement("p");
      preschoolEditPriceLabel.innerText = "Anaokulu Ücreti";
      var preschoolEditPriceInput = document.createElement("input");
      preschoolEditPriceInput.type = "text";
      preschoolEditPriceInput.id = "preschoolEditPrice";
      preschoolEditPriceInput.defaultValue = preschool.Price.toString();
      preschoolPriceInputFieldDiv.appendChild(preschoolEditPriceLabel);
      preschoolPriceInputFieldDiv.appendChild(preschoolEditPriceInput);
      preschoolEditFieldsDiv.appendChild(preschoolPriceInputFieldDiv);
      var preschoolDateInputFieldDiv = document.createElement("div");
      preschoolDateInputFieldDiv.className = "field";
      var preschoolEditDateLabel = document.createElement("p");
      preschoolEditDateLabel.innerText = "Anaokulu Erken Kayıt Bitiş Tarihi";
      var preschoolEditDateInput = document.createElement("input");
      preschoolEditDateInput.type = "text";
      preschoolEditDateInput.id = "preschoolEditDate";
      preschoolEditDateInput.placeholder = "AA/GG/YYYY";
      preschoolEditDateInput.defaultValue = preschool.EndOfEarlyRegistrationDate;
      preschoolDateInputFieldDiv.appendChild(preschoolEditDateLabel);
      preschoolDateInputFieldDiv.appendChild(preschoolEditDateInput);
      preschoolEditFieldsDiv.appendChild(preschoolDateInputFieldDiv);
      preschoolEditForm.appendChild(preschoolEditFieldsDiv);
      preschoolEditDiv.appendChild(preschoolEditHeader);
      preschoolEditForm.innerHTML += "<div class=\"field \">\n\t\t\t\t\t\t\t\t\t<ul class=\"actions stacked \">\n\t\t\t\t\t\t\t\t\t\t<li><a class=\"button fit\" id=\"editPreschool\">Anaokulunu\n\t\t\t\t\t\t\t\t\t\t\tD\xFCzenle</a></li>\n\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t</div>";
      preschoolEditDiv.appendChild(preschoolEditForm);
      var preschoolEditButton = document.getElementById("editPreschool");

      preschoolEditButton.onclick = function () {
        preschoolHelper_1.preschoolHelper.editPreschoolFromInput(preschool);
        document.getElementById("preschoolEditForm").parentNode.removeChild(document.getElementById("preschoolEditForm"));
        document.getElementById("preschoolEditHeader").parentNode.removeChild(document.getElementById("preschoolEditHeader"));
        alert("Anaokulu başarılı bir şekilde düzenlendi.");
        tableHelper_1.tableHelper.updatePreschoolTable();
      };
    }
  }]);

  return formHelper;
}();

exports.formHelper = formHelper;
},{"./enum/types":"ts-src/enum/types.ts","./database":"ts-src/database.ts","./discountHelper":"ts-src/discountHelper.ts","./tableHelper":"ts-src/tableHelper.ts","./preschoolHelper":"ts-src/preschoolHelper.ts"}],"ts-src/discountCalculator.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscountCalculator = void 0;

var database_1 = require("./database");

var types_1 = require("./enum/types");
/**
 * İndirim hesaplamalarının yapıldığı sınıftır.
 */


var DiscountCalculator = /*#__PURE__*/function () {
  function DiscountCalculator() {
    _classCallCheck(this, DiscountCalculator);
  }

  _createClass(DiscountCalculator, null, [{
    key: "calculateDiscount",

    /**
     * Kullanıcı ve Anaokulu nesneleri alarak indirim hesaplamasını, indirim tipi olan yüzde ve miktar cinsinden hesaplamasını yapan metod databse sınıfıda tanımlı discount listesini kullanır.
     */
    value: function calculateDiscount(user, preschool) {
      var percent = 0;
      var amount = 0;
      database_1.database.discounts.forEach(function (value, index, array) {
        switch (value.DiscountType) {
          case types_1.DiscountType.PERCENTAGE:
            {
              percent += DiscountCalculator.executeCalculateMethods(user, preschool, value);
              break;
            }

          case types_1.DiscountType.AMOUNT:
            {
              amount += DiscountCalculator.executeCalculateMethods(user, preschool, value);
              break;
            }
        }
      });
      return DiscountCalculator.calculatePriceWithDiscount(percent, amount, preschool);
    }
    /**
     * İndirim hesaplaması yapan 3 metod calculateEarlyRegistrationDiscount, calculateOrganizationDiscount, calculateUserTypeDiscount
     * yönlendirme yaparak toplam sonucu döner
     */

  }, {
    key: "executeCalculateMethods",
    value: function executeCalculateMethods(user, preschool, discount) {
      var result = 0;
      result += Number(DiscountCalculator.calculateEarlyRegistrationDiscount(discount, preschool));
      result += Number(DiscountCalculator.calculateOrganizationDiscount(discount, user, preschool));
      result += Number(DiscountCalculator.calculateUserTypeDiscount(discount, user, preschool));
      return result;
    }
    /**
     * Erken kayıt indirimini hesaplar, erken kayıt bilgisi kullanıcının seçtği anaokulundan gelmektedir.
     */

  }, {
    key: "calculateEarlyRegistrationDiscount",
    value: function calculateEarlyRegistrationDiscount(discount, preschool) {
      if (DiscountCalculator.calculateEarlyRegistration(preschool) && discount.DiscountName == "Erken Kayıt İndirimi") {
        var index = discount.PreschoolNamesAndTheirDiscounts.indexOf(preschool.PreschoolName);
        return Number(discount.PreschoolNamesAndTheirDiscounts[index + 1]);
      }

      return Number(0);
    }
    /**
     * Kişi tip indirimni hesaplar, kişiye özel indirim çalışılan kurum seçilmeden ve tek bir kişi tipi seçilmiş olduğunda hesaplamaktadır.
     */

  }, {
    key: "calculateUserTypeDiscount",
    value: function calculateUserTypeDiscount(discount, user, preschool) {
      if (discount.UserTypes.length == 1 && discount.UserTypes.includes(user.TypeOfUser) && discount.OrganizationName == types_1.OrganizationName.NONE) {
        var index = discount.PreschoolNamesAndTheirDiscounts.indexOf(preschool.PreschoolName);
        if (index < 0) return Number(0);
        return Number(discount.PreschoolNamesAndTheirDiscounts[index + 1]);
      }

      return Number(0);
    }
    /**
     * Çalışılan kurum indirimini hesaplar, Kurumun NONE olmaması, kullanıcının girdiği kurum ile indirimin kurumunun aynı olması ve indirim listesinde kurumun bulunması kontrollerini sağlar.
     */

  }, {
    key: "calculateOrganizationDiscount",
    value: function calculateOrganizationDiscount(discount, user, preschool) {
      if (discount.OrganizationName != types_1.OrganizationName.NONE && discount.OrganizationName == user.OrganizationOfUser && discount.UserTypes.includes(user.TypeOfUser)) {
        var index = discount.PreschoolNamesAndTheirDiscounts.indexOf(preschool.PreschoolName);
        if (index < 0) return Number(0);
        return Number(discount.PreschoolNamesAndTheirDiscounts[index + 1]);
      }

      return Number(0);
    }
    /**
     * Yüzde ve miktar olarak hesaplanan indirimlerin anaokulu ücretine uygulanmış halini dönen metod
     */

  }, {
    key: "calculatePriceWithDiscount",
    value: function calculatePriceWithDiscount(percent, amount, preschool) {
      if (percent > 100) return 0;
      return Number(preschool.Price - preschool.Price * percent / 100 - amount);
    }
    /**
     * Anaokulunun erken kayıt tarihini bugün ile kıyaslayarak
     */

  }, {
    key: "calculateEarlyRegistration",
    value: function calculateEarlyRegistration(preschool) {
      var preschoolEarltRegistrationDate = new Date(preschool.EndOfEarlyRegistrationDate);
      var now = new Date();
      return preschoolEarltRegistrationDate > now;
    }
  }]);

  return DiscountCalculator;
}();

exports.DiscountCalculator = DiscountCalculator;
},{"./database":"ts-src/database.ts","./enum/types":"ts-src/enum/types.ts"}],"ts-src/User.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;
/**
 * Sistemde kullanılan kişi bilgilerinin saklandığı sınıf
 */

var User = /*#__PURE__*/function () {
  function User(_userName, _typeOfUser, _organizationOfUser) {
    _classCallCheck(this, User);

    this._userName = _userName;
    this._typeOfUser = _typeOfUser;
    this._organizationOfUser = _organizationOfUser;
  }

  _createClass(User, [{
    key: "UserName",
    get: function get() {
      return this._userName;
    },
    set: function set(userName) {
      this._userName = userName;
    }
  }, {
    key: "TypeOfUser",
    get: function get() {
      return this._typeOfUser;
    },
    set: function set(typeOfUser) {
      this._typeOfUser = typeOfUser;
    }
  }, {
    key: "OrganizationOfUser",
    get: function get() {
      return this._organizationOfUser;
    },
    set: function set(organizationOfUser) {
      this._organizationOfUser = organizationOfUser;
    }
  }]);

  return User;
}();

exports.User = User;
},{}],"ts-src/userHelper.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userHelper = void 0;

var database_1 = require("./database");

var discountCalculator_1 = require("./discountCalculator");

var types_1 = require("./enum/types");

var User_1 = require("./User");

var userHelper = /*#__PURE__*/function () {
  function userHelper() {
    _classCallCheck(this, userHelper);
  }

  _createClass(userHelper, null, [{
    key: "createUserFromUserInput",

    /**
     * İndirim hesaplama bölümünde kullanıcının girdiği bilgiler doğrultusunda User nesnesi oluşturan metod
     */
    value: function createUserFromUserInput() {
      var userName = document.getElementById("userName");
      var preschoolChoose = document.getElementById("myPreschoolSelect");
      var organizationChooseInput = document.getElementById("organizationSelect-" + "userInput");
      var organizationChoose;

      switch (organizationChooseInput.value) {
        case "ANADOLU":
          {
            organizationChoose = types_1.OrganizationName.ANADOLU;
            break;
          }

        case "SAGLIK":
          {
            organizationChoose = types_1.OrganizationName.SAGLIK;
            break;
          }

        default:
          {
            organizationChoose = types_1.OrganizationName.NONE;
          }
      }

      var userTypeChoose;
      var userPersonelRadio = document.getElementById("user-personel");
      if (userPersonelRadio.checked) userTypeChoose = types_1.UserType.PERSONEL;
      userPersonelRadio = document.getElementById("user-ihvan");
      if (userPersonelRadio.checked) userTypeChoose = types_1.UserType.IHVAN;
      userPersonelRadio = document.getElementById("user-standart");
      if (userPersonelRadio.checked) userTypeChoose = types_1.UserType.STANDART;
      var user = new User_1.User(userName.value, userTypeChoose, organizationChoose);
      var preschool = database_1.database.preschools[preschoolChoose.value];
      var discount = discountCalculator_1.DiscountCalculator.calculateDiscount(user, preschool);
      var discountResult = document.getElementById("discount-result");

      if (discount == NaN || discount == null) {
        discountResult.innerHTML = "<p>" + preschool.PreschoolName + " Anaokulunun \xFCcreti " + preschool.Price + " TL'dir. Sizin \xF6demeniz gereken \xFCcret</p>\n                    <h3 >" + preschool.Price + " TL</h3>";
      } else discountResult.innerHTML = "<p>" + preschool.PreschoolName + " Anaokulunun \xFCcreti " + preschool.Price + " TL'dir. Sizin \xF6demeniz gereken \xFCcret</p>\n                    <h3 >" + discount + " TL</h3>";
    }
  }]);

  return userHelper;
}();

exports.userHelper = userHelper;
},{"./database":"ts-src/database.ts","./discountCalculator":"ts-src/discountCalculator.ts","./enum/types":"ts-src/enum/types.ts","./User":"ts-src/User.ts"}],"ts-src/hello.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var formHelper_1 = require("./formHelper");

var tableHelper_1 = require("./tableHelper");

var userHelper_1 = require("./userHelper");

var discountHelper_1 = require("./discountHelper");

var database_1 = require("./database");
/**
 * State, programın içerisde hangi bölümde işlem yaptığımız tutar.
 */


var state = 0;
/**
 * Sistem ilk açıldığında preschoolList ve discountList sistemde tanımlı olan anaokullarını ve indirimleri database'de bulunanan listelere aktarır.
 */

var preschoolList = database_1.database.createPreschoolList();
var discountList = database_1.database.createDiscountList();
var discountCalculateDiv = document.getElementById("second");
discountCalculateDiv.style.display = "none";
var discountTableDiv = document.getElementById("third");
discountTableDiv.style.display = "none";
var preschoolTableDiv = document.getElementById("fourth");
preschoolTableDiv.style.display = "none";
/**
 * İndirim Hesaplama butonuna tıklandığı zaman;
 * İndirim ve anaokulu listeleri daha önceden oluşturulmuş ise onları siler,
 * İndirim Hesaplamak için gerekli formu çağırır.
 */

var discountCalculateFormButton = document.getElementById("discountButton");

discountCalculateFormButton.onclick = function () {
  var discountManagementState = document.getElementById("discountTableId");
  if (discountManagementState != null) removeState("discountTableId");
  discountCalculateDiv.style.display = "inline";
  discountTableDiv.style.display = "none";
  preschoolTableDiv.style.display = "none";

  if (state != 1) {
    formHelper_1.formHelper.createUserInputForm();
    tableHelper_1.tableHelper.printHomeButton(document.getElementById("discountCalculateButtonUl"));
    var myParent = document.getElementById("selectField");
    formHelper_1.formHelper.createPreschoolSelectList(myParent);
    formHelper_1.formHelper.createOrganizationNameSelectList(document.getElementById("selectOrganizationField"), "userInput");
  }

  var discountCalculateButton = document.getElementById("calculate");

  discountCalculateButton.onclick = function () {
    userHelper_1.userHelper.createUserFromUserInput();
  };

  state = 1;
};
/**
 * İndirim Yönetim Sistemi butonuna basıldığı zaman;
 * İndirim hesaplama formu ve anaokulu listesi oluşturulmuş ise siler,
 * İndirim yönetim tablosunu oluşturan metodu çağırır.
 */


var discountManagementButton = document.getElementById("discountManagementButton");

discountManagementButton.onclick = function () {
  var discountCalculateState = document.getElementById("userInputForm");
  if (discountCalculateState != null) removeState("userInputForm");
  discountCalculateDiv.style.display = "none";
  discountTableDiv.style.display = "inline";
  preschoolTableDiv.style.display = "none";
  tableHelper_1.tableHelper.createDiscountTable();
  var discountAppendButton = document.getElementById("append-discount");

  discountAppendButton.onclick = function () {
    if (!document.getElementById("discountAppendForm")) formHelper_1.formHelper.createAppendDiscountForm();
    var discountAppend = document.getElementById("appendDiscount");

    discountAppend.onclick = function () {
      discountHelper_1.discountHelper.createDiscountFromInput();
      tableHelper_1.tableHelper.updateDiscountTable();
    };
  };

  state = 2;
};
/**
 *
 */


var reschoolManagementButton = document.getElementById("preschoolManagementButton");

reschoolManagementButton.onclick = function () {
  state = 3;
  var discountManagementState = document.getElementById("discountTableId");
  if (discountManagementState != null) removeState("discountTableId");
  discountCalculateDiv.style.display = "none";
  discountTableDiv.style.display = "none";
  preschoolTableDiv.style.display = "inline";
  tableHelper_1.tableHelper.createPreschoolTable();
  var preschoolAppendButton = document.getElementById("appendPreschoolForm");

  preschoolAppendButton.onclick = function () {
    if (!document.getElementById("preschoolAppendForm")) formHelper_1.formHelper.createPreschoolAppendForm();
  };
};

function removeState(id) {
  var element = document.getElementById(id);
  element.parentNode.removeChild(element);
}
},{"./formHelper":"ts-src/formHelper.ts","./tableHelper":"ts-src/tableHelper.ts","./userHelper":"ts-src/userHelper.ts","./discountHelper":"ts-src/discountHelper.ts","./database":"ts-src/database.ts"}],"../../AppData/Roaming/npm-cache/_npx/2124/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57678" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm-cache/_npx/2124/node_modules/parcel/src/builtins/hmr-runtime.js","ts-src/hello.ts"], null)
//# sourceMappingURL=/hello.cffb4215.js.map