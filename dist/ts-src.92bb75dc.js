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
})({"ts-src/enum/Types.ts":[function(require,module,exports) {
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
},{}],"ts-src/api/PreschoolListFromAPI.ts":[function(require,module,exports) {
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
},{}],"ts-src/api/DiscountListFromAPI.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscountListFromAPI = void 0;

var DiscountListFromAPI = /*#__PURE__*/function () {
  function DiscountListFromAPI() {
    _classCallCheck(this, DiscountListFromAPI);
  }

  _createClass(DiscountListFromAPI, [{
    key: "getDiscountsUsingXhr",
    value: function getDiscountsUsingXhr() {
      var xhr = new XMLHttpRequest();
      var discounts = new Array();
      xhr.open("GET", 'http://localhost:8080/discounts/');

      xhr.onload = function (event) {
        var data = JSON.parse(event.target.response);

        if (Number(event.target.status) >= 200 && Number(event.target.status) < 400) {
          data._embedded.discountList.forEach(function (discount) {
            discounts.push({
              DiscountName: discount.discountName,
              DiscountType: discount.discountType,
              UserTypes: discount.userType,
              OrganizationName: discount.organizationName,
              DiscountValues: discount.discountsOfPreschool,
              Id: discount.id
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
      return discounts;
    }
  }, {
    key: "getDiscountValuesUsingXhr",
    value: function getDiscountValuesUsingXhr() {
      var xhr = new XMLHttpRequest();
      var discountValues = new Array();
      xhr.open("GET", 'http://localhost:8080/values/');

      xhr.onload = function (event) {
        var data = JSON.parse(event.target.response);

        if (Number(event.target.status) >= 200 && Number(event.target.status) < 400) {
          data._embedded.discountValuesList.forEach(function (discountValue) {
            discountValues.push(discountValue);
          });
        } else {
          console.log('error');
        }
      };

      xhr.onerror = function (err) {
        console.log('[Error]', err);
      }; // Send XHR request


      xhr.send();
      return discountValues;
    }
  }]);

  return DiscountListFromAPI;
}();

exports.DiscountListFromAPI = DiscountListFromAPI;
},{}],"ts-src/data/Database.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Database = void 0;

var PreschoolListFromAPI_1 = require("./../api/PreschoolListFromAPI");

var DiscountListFromAPI_1 = require("./../api/DiscountListFromAPI");
/**
 * Sistemde kullanıcak olan Anaokulu ve İndirim listelerinin saklandığı ve oluşturulduğu sınıf
 */


var Database = /*#__PURE__*/function () {
  function Database() {
    _classCallCheck(this, Database);
  }

  _createClass(Database, null, [{
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
      var discountListFromAPI = new DiscountListFromAPI_1.DiscountListFromAPI();
      this.discounts = discountListFromAPI.getDiscountsUsingXhr();
      /*
          this.discounts.push(
            {
              DiscountName: "Erken Kayıt İndirimi",
              DiscountType: DiscountType.PERCENTAGE,
              UserTypes: [UserType.PERSONEL, UserType.IHVAN, UserType.STANDART],
              OrganizationName: OrganizationName.NONE,
              PreschoolNamesAndTheirDiscounts: [
                "M Lalebahçesi",
                20,
                "Y Lalebahçesi",
                25
              ]
            },
                  {
              DiscountName: "Personel İndirimi",
              DiscountType: DiscountType.PERCENTAGE,
              UserTypes: [UserType.PERSONEL],
              OrganizationName: OrganizationName.NONE,
              PreschoolNamesAndTheirDiscounts: [
                "M Lalebahçesi",
                50,
                "Y Lalebahçesi",
                50
              ]
            },
            {
              DiscountName: "Ihvan İndirimi",
              DiscountType: DiscountType.PERCENTAGE,
              UserTypes: [UserType.IHVAN],
              OrganizationName: OrganizationName.NONE,
              PreschoolNamesAndTheirDiscounts: [
                "M Lalebahçesi",
                5,
                "Y Lalebahçesi",
                5
              ]
            },
                  {
              DiscountName: "Sağlık İndirimi",
              DiscountType: DiscountType.PERCENTAGE,
              UserTypes: [UserType.IHVAN, UserType.STANDART],
              OrganizationName: OrganizationName.SAGLIK,
              PreschoolNamesAndTheirDiscounts: ["M Lalebahçesi", 10]
            },
                  {
              DiscountName: "Anadolu İndirimi",
              DiscountType: DiscountType.AMOUNT,
              UserTypes: [UserType.IHVAN, UserType.STANDART],
              OrganizationName: OrganizationName.ANADOLU,
              PreschoolNamesAndTheirDiscounts: ["Y Lalebahçesi", 100]
            }
          );
      */

      return this.discounts;
    }
  }, {
    key: "createDiscountValuesList",
    value: function createDiscountValuesList() {
      var discountListFromAPI = new DiscountListFromAPI_1.DiscountListFromAPI();
      this.discountValues = discountListFromAPI.getDiscountValuesUsingXhr();
      return this.discountValues;
    }
  }]);

  return Database;
}();

exports.Database = Database;
Database.preschools = new Array();
Database.discounts = new Array();
Database.discountValues = new Array();
},{"./../api/PreschoolListFromAPI":"ts-src/api/PreschoolListFromAPI.ts","./../api/DiscountListFromAPI":"ts-src/api/DiscountListFromAPI.ts"}],"ts-src/form/FormHelper.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.FormHelper = void 0;

var Types_1 = require("./../enum/Types");

var Database_1 = require("./../data/Database");
/**
 * Sistemde giriş yapılacak olan formların oluşturulduğu sınıftır.
 */


var FormHelper = /*#__PURE__*/function () {
  function FormHelper() {
    _classCallCheck(this, FormHelper);
  }

  _createClass(FormHelper, null, [{
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

      for (var i = 0; i < Database_1.Database.preschools.length; i++) {
        var option = document.createElement("option");
        option.value = i.toString();
        option.text = Database_1.Database.preschools[i].PreschoolName;
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

      for (var i in Types_1.OrganizationName) {
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
        if (discount.UserTypes.includes(Types_1.UserType.PERSONEL)) option.defaultChecked = true;
        if (discount.UserTypes.includes(Types_1.UserType.IHVAN)) option2.defaultChecked = true;
        if (discount.UserTypes.includes(Types_1.UserType.STANDART)) option3.defaultChecked = true;
      }

      parent.appendChild(div);
      parent.appendChild(div2);
      parent.appendChild(div3);
    }
    /**
     * Yeni indirim ekleme tablosunda indirimin ekleneceği anaokullarını ve miktarlarını checkbox ve text input olarak dinanik olarak doldurur.
     */

  }, {
    key: "createPreschoolCheckboxAndDiscountInput",
    value: function createPreschoolCheckboxAndDiscountInput(parentDiv, discount) {
      for (var i = 0; i < Database_1.Database.preschools.length; i++) {
        var div1 = document.createElement("div");
        div1.className = "field half";
        var option = document.createElement("input");
        option.type = "checkbox";
        option.id = "discountAppendPreschoolCheckbox-" + i.toString();
        option.name = Database_1.Database.preschools[i].PreschoolName;
        option.value = Database_1.Database.preschools[i].Id.toString();
        var label = document.createElement("label");
        label.setAttribute("for", option.id);
        var labelText = document.createTextNode(Database_1.Database.preschools[i].PreschoolName);
        label.appendChild(labelText);
        div1.appendChild(option);
        div1.appendChild(label);
        var div2 = document.createElement("div");
        div2.className = "field half";
        var discountAppendPreschoolInput = document.createElement("input");
        discountAppendPreschoolInput.type = "text";
        discountAppendPreschoolInput.id = "discountAppendPreschoolText-" + i.toString();

        if (discount) {
          if (discount.PreschoolNamesAndTheirDiscounts.includes(Database_1.Database.preschools[i].PreschoolName)) {
            option.defaultChecked = true;
            var index = discount.PreschoolNamesAndTheirDiscounts.indexOf(Database_1.Database.preschools[i].PreschoolName);
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
  }]);

  return FormHelper;
}();

exports.FormHelper = FormHelper;
},{"./../enum/Types":"ts-src/enum/Types.ts","./../data/Database":"ts-src/data/Database.ts"}],"ts-src/enum/types.ts":[function(require,module,exports) {
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
},{}],"ts-src/model/Discount.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Discount = void 0;
/**
 * Sistemde kullanılan indirimlerin bilgilerinin saklandığı sınıf
 */

var Discount = /*#__PURE__*/function () {
  function Discount(discountName, discountType, userTypes, organizationName, discountValues) {
    _classCallCheck(this, Discount);

    this._discountName = discountName;
    this._discountType = discountType;
    this._userTypes = userTypes;
    this._organizationName = organizationName;
    this._discountValues = discountValues;
  }

  _createClass(Discount, [{
    key: "Id",
    get: function get() {
      return this._id;
    },
    set: function set(id) {
      this._id = id;
    }
  }, {
    key: "DiscountName",
    get: function get() {
      return this._discountName;
    },
    set: function set(discountName) {
      this._discountName = discountName;
    }
  }, {
    key: "DiscountType",
    get: function get() {
      return this._discountType;
    },
    set: function set(discountType) {
      this._discountType = discountType;
    }
  }, {
    key: "UserTypes",
    get: function get() {
      return this._userTypes;
    },
    set: function set(userTypes) {
      this._userTypes = userTypes;
    }
  }, {
    key: "OrganizationName",
    get: function get() {
      return this._organizationName;
    },
    set: function set(organizationName) {
      this._organizationName = organizationName;
    }
  }, {
    key: "DiscountValues",
    get: function get() {
      return this._discountValues;
    },
    set: function set(discountValues) {
      this._discountValues = discountValues;
    }
  }]);

  return Discount;
}();

exports.Discount = Discount;
},{}],"ts-src/api/DiscountManagementAPI.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscountManagementAPI = void 0;

var Database_1 = require("./../data/Database");

var DiscountManagementAPI = /*#__PURE__*/function () {
  function DiscountManagementAPI() {
    _classCallCheck(this, DiscountManagementAPI);
  }

  _createClass(DiscountManagementAPI, null, [{
    key: "createDiscountWithAPI",
    value: function createDiscountWithAPI(discount) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", 'http://localhost:8080/discounts/', false);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(discount);
      window.location.reload();
      if (!(Number(event.target.status) >= 200 && Number(event.target.status) < 400)) console.log('error');
      Database_1.Database.createDiscountList();
    }
  }, {
    key: "createDiscountValuesAPI",
    value: function createDiscountValuesAPI(discountValues) {
      debugger;
      var xhr = new XMLHttpRequest();
      xhr.open("POST", 'http://localhost:8080/values/');
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      var discountValuesJSON = JSON.stringify(discountValues);
      xhr.send(discountValues);

      xhr.onload = function (event) {
        var data = JSON.parse(event.target.response);

        if (Number(event.target.status) >= 200 && Number(event.target.status) < 400) {
          discountValues.Id = data.id;
          discountValues.Preschool = data.preschool;
          discountValues.Value = data.value;
        } else {
          console.log('error');
        }
      }; //window.location.reload();


      return discountValues;
    }
  }]);

  return DiscountManagementAPI;
}();

exports.DiscountManagementAPI = DiscountManagementAPI;
},{"./../data/Database":"ts-src/data/Database.ts"}],"ts-src/model/DiscountValues.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscountValues = void 0;

var DiscountValues = /*#__PURE__*/function () {
  function DiscountValues(id, preschool, value) {
    _classCallCheck(this, DiscountValues);

    this._id = id;
    this._preschool = preschool;
    this._value = value;
  }

  _createClass(DiscountValues, [{
    key: "Id",
    get: function get() {
      return this._id;
    },
    set: function set(id) {
      this._id = id;
    }
  }, {
    key: "Value",
    get: function get() {
      return this._value;
    },
    set: function set(value) {
      this._value = value;
    }
  }, {
    key: "Preschool",
    get: function get() {
      return this._preschool;
    },
    set: function set(preschool) {
      this._preschool = preschool;
    }
  }]);

  return DiscountValues;
}();

exports.DiscountValues = DiscountValues;
},{}],"ts-src/model/Preschool.ts":[function(require,module,exports) {
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
},{}],"ts-src/api/PreschoolManagementAPI.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreschoolManagementAPI = void 0;

var Database_1 = require("./../data/Database");
/**
*	Anaokulu ekleme, silme ve düzenleme işlemlerini API üzerinden yapan sınıftır.
*/


var PreschoolManagementAPI = /*#__PURE__*/function () {
  function PreschoolManagementAPI() {
    _classCallCheck(this, PreschoolManagementAPI);
  }

  _createClass(PreschoolManagementAPI, null, [{
    key: "createPreschoolWithAPI",

    /**
    *	Verilen IPreschool objesini HTTP POST metodu ile gönderen metod
    */
    value: function createPreschoolWithAPI(IPreschool) {
      var xhr = new XMLHttpRequest();
      xhr.open("POST", 'http://localhost:8080/preschools/', false);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(IPreschool);
      window.location.reload();
      if (!Number(event.target.status) >= 200 && Number(event.target.status) < 400) console.log('error');
      Database_1.Database.createPreschoolList();
    }
    /**
    *	Verilen IPreschool objesini HTTP PUT metodu ile düzenleyen sınıf,
    */

  }, {
    key: "editPreschoolWithAPI",
    value: function editPreschoolWithAPI(IPreschool, id) {
      var xhr = new XMLHttpRequest();
      xhr.open("PUT", 'http://localhost:8080/preschools/' + id);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send(IPreschool);
      window.location.reload();
      if (!Number(event.target.status) >= 200 && Number(event.target.status) < 400) console.log('error');
      Database_1.Database.createPreschoolList();
    }
    /**
    * Verilen id ile uygun IPreschool nesnesini silmek için HTTP DELETE metodunu çalıştırır.
    */

  }, {
    key: "deletePreschoolWithAPI",
    value: function deletePreschoolWithAPI(id) {
      var xhr = new XMLHttpRequest();
      xhr.open("DELETE", 'http://localhost:8080/preschools/' + id);
      xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
      xhr.send();
      window.location.reload();
      if (!Number(event.target.status) >= 200 && Number(event.target.status) < 400) console.log('error');
      Database_1.Database.createPreschoolList();
    }
  }]);

  return PreschoolManagementAPI;
}();

exports.PreschoolManagementAPI = PreschoolManagementAPI;
},{"./../data/Database":"ts-src/data/Database.ts"}],"ts-src/model/PreschoolHelper.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreschoolHelper = void 0;

var Database_1 = require("./../data/Database");

var Preschool_1 = require("./Preschool");

var PreschoolManagementAPI_1 = require("./../api/PreschoolManagementAPI");

var PreschoolHelper = /*#__PURE__*/function () {
  function PreschoolHelper() {
    _classCallCheck(this, PreschoolHelper);
  }

  _createClass(PreschoolHelper, null, [{
    key: "createPreschoolFromInput",
    value: function createPreschoolFromInput() {
      var preschoolName = document.getElementById("preschoolAppendName");
      var preschoolPrice = document.getElementById("preschoolAppendPrice");
      var preschoolRegistrationDate = document.getElementById("preschoolAppendDate");
      var newPreschool = new Preschool_1.Preschool(preschoolName.value, preschoolRegistrationDate.value, Number(preschoolPrice.value), Database_1.Database.preschools.length + 1);
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
      var indexOfPreschool = Database_1.Database.preschools.indexOf(preschool);
      var newPreschool = new Preschool_1.Preschool(preschoolName.value, preschoolRegistrationDate.value, Number(preschoolPrice.value), indexOfPreschool + 1);
      PreschoolManagementAPI_1.PreschoolManagementAPI.editPreschoolWithAPI(newPreschool, indexOfPreschool + 1);
      /* database.preschools[indexOfPreschool] = {
         PreschoolName: preschoolName.value,
         Price: Number(preschoolPrice.value),
         EndOfEarlyRegistrationDate: preschoolRegistrationDate.value
       };*/
    }
  }, {
    key: "getPreschoolNameWithId",
    value: function getPreschoolNameWithId(id) {
      var result = "";
      Database_1.Database.preschools.forEach(function (preschool) {
        if (preschool.Id === id) result = preschool.PreschoolName;
      });
      return result;
    }
  }, {
    key: "getPreschoolWithId",
    value: function getPreschoolWithId(id) {
      var result;
      Database_1.Database.preschools.forEach(function (preschool) {
        if (preschool.Id === id) result = preschool;
      });
      return result;
    }
  }]);

  return PreschoolHelper;
}();

exports.PreschoolHelper = PreschoolHelper;
},{"./../data/Database":"ts-src/data/Database.ts","./Preschool":"ts-src/model/Preschool.ts","./../api/PreschoolManagementAPI":"ts-src/api/PreschoolManagementAPI.ts"}],"ts-src/model/DiscountHelper.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscountHelper = void 0;

var Database_1 = require("./../data/Database");

var Types_1 = require("./../enum/Types");

var Discount_1 = require("./Discount");

var DiscountManagementAPI_1 = require("./../api/DiscountManagementAPI");

var DiscountValues_1 = require("./../model/DiscountValues");

var PreschoolHelper_1 = require("./PreschoolHelper");
/**
 * İndirim ekleme işleminin yapıldığı sınıftır.
 */


var DiscountHelper = /*#__PURE__*/function () {
  function DiscountHelper() {
    _classCallCheck(this, DiscountHelper);
  }

  _createClass(DiscountHelper, null, [{
    key: "createDiscountFromInput",

    /**
     *  Kullanıcının girdiği bilgiler ile yeni indirim tanımlar. Yeni indirimi databse'de tutulan Anaokulu Listesine ekler.
     */
    value: function createDiscountFromInput() {
      var discountName = DiscountHelper.getDiscountName("discountAppend-discountName");
      var discountType = DiscountHelper.getdiscountType("discount-append-percentage-radio");
      var organizationName = DiscountHelper.getOrganizationName("discountAppend");
      var newDiscount = new Discount_1.Discount(discountName.value, discountType, DiscountHelper.getUserTypes(), organizationName, DiscountHelper.getpreschoolNamesAndTheirDiscounts()); //DiscountManagementAPI.createDiscountWithAPI(newDiscount);
      //alert("İndirim başarılı bir şekilde eklendi.");

      document.getElementById("discountAppendForm").parentNode.removeChild(document.getElementById("discountAppendForm"));
      document.getElementById("discountAppendHeader").parentNode.removeChild(document.getElementById("discountAppendHeader"));
    }
  }, {
    key: "editDiscountFromInput",
    value: function editDiscountFromInput(discount) {
      var discountName = DiscountHelper.getDiscountName("discountEdit-discountName");
      var preschoolNamesAndTheirDiscounts = DiscountHelper.getpreschoolNamesAndTheirDiscounts();
      var discountType = DiscountHelper.getdiscountType("discount-Edit-percentage-radio");
      var userTypes = DiscountHelper.getUserTypes();
      var organizationName = DiscountHelper.getOrganizationName("discountEdit");
      var indexOfDiscount = Database_1.Database.discounts.indexOf(discount);
      /* Database.discounts[indexOfDiscount] = {
         DiscountName: discountName.value,
         DiscountType: discountType,
         UserTypes: userTypes,
         OrganizationName: organizationName,
         PreschoolNamesAndTheirDiscounts: preschoolNamesAndTheirDiscounts
       };
       */
    }
  }, {
    key: "getDiscountName",
    value: function getDiscountName(id) {
      return document.getElementById(id);
    }
  }, {
    key: "getpreschoolNamesAndTheirDiscounts",
    value: function getpreschoolNamesAndTheirDiscounts() {
      var discountValues = new Array();

      for (var i = 0; i < Database_1.Database.preschools.length; i++) {
        var checkbox = document.getElementById("discountAppendPreschoolCheckbox-" + i.toString());
        if (!checkbox.checked) continue;else {
          var text = document.getElementById("discountAppendPreschoolText-" + i.toString());
          var tempDiscountValue = new DiscountValues_1.DiscountValues(Database_1.Database.discountValues.length + 1, PreschoolHelper_1.PreschoolHelper.getPreschoolWithId(Number(checkbox.value)), Number(text.value));
          discountValues.push(DiscountManagementAPI_1.DiscountManagementAPI.createDiscountValuesAPI(tempDiscountValue));
        }
      }

      return discountValues;
    }
  }, {
    key: "getdiscountType",
    value: function getdiscountType(id) {
      var discountType;
      var discountTypeRadio = document.getElementById(id);

      if (discountTypeRadio.checked) {
        discountType = "PERCENTAGE";
      } else {
        discountType = "AMOUNT";
      }

      return discountType;
    }
  }, {
    key: "getUserTypes",
    value: function getUserTypes() {
      var userTypes = new Array();
      var option = document.getElementById("user-type-personel");
      if (option.checked) userTypes.push(Types_1.UserType.PERSONEL);
      option = document.getElementById("user-type-ihvan");
      if (option.checked) userTypes.push(Types_1.UserType.IHVAN);
      option = document.getElementById("user-type-standart");
      if (option.checked) userTypes.push(Types_1.UserType.IHVAN);
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
            organizationName = Types_1.OrganizationName.ANADOLU;
            break;
          }

        case "SAGLIK":
          {
            organizationName = Types_1.OrganizationName.SAGLIK;
            break;
          }

        default:
          {
            organizationName = Types_1.OrganizationName.NONE;
          }
      }

      return organizationName;
    }
  }]);

  return DiscountHelper;
}();

exports.DiscountHelper = DiscountHelper;
},{"./../data/Database":"ts-src/data/Database.ts","./../enum/Types":"ts-src/enum/Types.ts","./Discount":"ts-src/model/Discount.ts","./../api/DiscountManagementAPI":"ts-src/api/DiscountManagementAPI.ts","./../model/DiscountValues":"ts-src/model/DiscountValues.ts","./PreschoolHelper":"ts-src/model/PreschoolHelper.ts"}],"ts-src/form/PreschoolFormHelper.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.PreschoolFormHelper = void 0;

var PreschoolHelper_1 = require("./../model/PreschoolHelper");

var TableHelper_1 = require("./../table/TableHelper");

var PreschoolFormHelper = /*#__PURE__*/function () {
  function PreschoolFormHelper() {
    _classCallCheck(this, PreschoolFormHelper);
  }

  _createClass(PreschoolFormHelper, null, [{
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
        PreschoolHelper_1.PreschoolHelper.createPreschoolFromInput();
        document.getElementById("preschoolAppendForm").parentNode.removeChild(document.getElementById("preschoolAppendForm"));
        document.getElementById("preschoolAppendHeader").parentNode.removeChild(document.getElementById("preschoolAppendHeader"));
        alert("Anaokulu başarılı bir şekilde eklendi.");
        TableHelper_1.TableHelper.updatePreschoolTable();
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
        PreschoolHelper_1.PreschoolHelper.editPreschoolFromInput(preschool);
        document.getElementById("preschoolEditForm").parentNode.removeChild(document.getElementById("preschoolEditForm"));
        document.getElementById("preschoolEditHeader").parentNode.removeChild(document.getElementById("preschoolEditHeader"));
        alert("Anaokulu başarılı bir şekilde düzenlendi.");
        TableHelper_1.TableHelper.updatePreschoolTable();
      };
    }
  }]);

  return PreschoolFormHelper;
}();

exports.PreschoolFormHelper = PreschoolFormHelper;
},{"./../model/PreschoolHelper":"ts-src/model/PreschoolHelper.ts","./../table/TableHelper":"ts-src/table/TableHelper.ts"}],"ts-src/table/TableHelper.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TableHelper = void 0;

var Database_1 = require("./../data/Database");

var DiscountFormHelper_1 = require("./../form/DiscountFormHelper");

var PreschoolFormHelper_1 = require("./../form/PreschoolFormHelper");

var PreschoolManagementAPI_1 = require("./../api/PreschoolManagementAPI");
/**
 * Sistemde gözükecek olan tabloların oluşturulduğu sınıftır.
 */


var TableHelper = /*#__PURE__*/function () {
  function TableHelper() {
    _classCallCheck(this, TableHelper);
  }

  _createClass(TableHelper, null, [{
    key: "createDiscountTable",

    /**
     * İndirim tablosunun daha önceden sayfa olup-olmadığı kontrol eder.
     */
    value: function createDiscountTable() {
      if (!document.getElementById("discountTableId")) {
        TableHelper.printDiscountTable(Database_1.Database.discounts);
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

        for (var j = 0; j < discountList[i].DiscountValues.length; j++) {
          var preschool = discountList[i].DiscountValues[j].preschool;
          var _cellString = preschool.preschoolName;
          _cellString += "   ";
          _cellString += discountList[i].DiscountValues[j].value;
          if (discountList[i].DiscountType == "PERCENTAGE") _cellString += "% ";else _cellString += "TL ";
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
            case "PERSONEL":
              {
                cellString += "Personel- ";
                break;
              }

            case "IHVAN":
              {
                cellString += "Ihvan- ";
                break;
              }

            case "STANDART":
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
            Database_1.Database.discounts = Database_1.Database.discounts.filter(function (discount) {
              return discount.DiscountName != discountList[i].DiscountName;
            });
            TableHelper.updateDiscountTable();
          }

          return;
        });
        cell.appendChild(cellButtonDelete);
        row.appendChild(cell);
        var cellButtonEdit = document.createElement("button");
        cell = document.createElement("td");
        cellButtonEdit.innerHTML = "Düzenle";
        cellButtonEdit.addEventListener("click", function () {
          DiscountFormHelper_1.DiscountFormHelper.editDiscountForm(discountList[i]);
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
      TableHelper.createDiscountTable();
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

            TableHelper.updatePreschoolTable();
          }

          return;
        });
        cell.appendChild(cellButtonDelete);
        row.appendChild(cell);
        cell = document.createElement("td");
        var cellButtonEdit = document.createElement("button");
        cellButtonEdit.innerHTML = "Düzenle";
        cellButtonEdit.addEventListener("click", function () {
          PreschoolFormHelper_1.PreschoolFormHelper.createPreschoolEditForm(preschoolList[i]);
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
        TableHelper.printPreschoolTable(Database_1.Database.preschools);
      }
    }
    /**
     *
     */

  }, {
    key: "updatePreschoolTable",
    value: function updatePreschoolTable() {
      var element = document.getElementById("preschoolTableId");
      element.parentNode.removeChild(element);
      TableHelper.printPreschoolTable(Database_1.Database.preschools);
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

  return TableHelper;
}();

exports.TableHelper = TableHelper;
},{"./../data/Database":"ts-src/data/Database.ts","./../form/DiscountFormHelper":"ts-src/form/DiscountFormHelper.ts","./../form/PreschoolFormHelper":"ts-src/form/PreschoolFormHelper.ts","./../api/PreschoolManagementAPI":"ts-src/api/PreschoolManagementAPI.ts"}],"ts-src/form/DiscountFormHelper.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscountFormHelper = void 0;

var types_1 = require("./../enum/types");

var FormHelper_1 = require("./FormHelper");

var DiscountHelper_1 = require("./../model/DiscountHelper");

var TableHelper_1 = require("./../table/TableHelper");

var DiscountFormHelper = /*#__PURE__*/function () {
  function DiscountFormHelper() {
    _classCallCheck(this, DiscountFormHelper);
  }

  _createClass(DiscountFormHelper, null, [{
    key: "createAppendDiscountForm",

    /*
    * Yeni indirim ekleme için gerekli bilgilerin istendiği formunu oluşturur,
    * <form>
           <div class="fields">
         <div class="field"> ... html yapısını kullanır.
    */
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
      FormHelper_1.FormHelper.createPreschoolCheckboxAndDiscountInput(discountAppendFieldsDiv);
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
      FormHelper_1.FormHelper.createUserTypeCheckBox(discountAppendFieldsDiv);
      var discountOrganizationFieldDiv = document.createElement("div");
      discountOrganizationFieldDiv.className = "field";
      discountOrganizationFieldDiv.id = "discountOrganizationFieldDiv";
      FormHelper_1.FormHelper.createOrganizationNameSelectList(discountOrganizationFieldDiv, "discountAppend");
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
      FormHelper_1.FormHelper.createPreschoolCheckboxAndDiscountInput(discountEditFieldsDiv, discount);
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
      FormHelper_1.FormHelper.createUserTypeCheckBox(discountEditFieldsDiv, discount);
      var discountOrganizationFieldDiv = document.createElement("div");
      discountOrganizationFieldDiv.className = "field";
      discountOrganizationFieldDiv.id = "discountOrganizationFieldDiv";
      FormHelper_1.FormHelper.createOrganizationNameSelectList(discountOrganizationFieldDiv, "discountEdit", discount);
      discountEditFieldsDiv.appendChild(discountOrganizationFieldDiv);
      discountEditForm.appendChild(discountEditFieldsDiv);
      discountEditParent.appendChild(discountEditHeader);
      discountEditForm.innerHTML += "<div class=\"field \">\n\t\t\t\t\t\t\t\t\t<ul class=\"actions stacked \">\n\t\t\t\t\t\t\t\t\t\t<li><a class=\"button fit\" id=\"editDiscount\">\u0130ndirimi\n\t\t\t\t\t\t\t\t\t\t\tD\xFCzenle</a></li>\n\t\t\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t\t\t</div>";
      discountEditParent.appendChild(discountEditForm);
      var discountEditButton = document.getElementById("editDiscount");

      discountEditButton.onclick = function () {
        DiscountHelper_1.DiscountHelper.editDiscountFromInput(discount);
        TableHelper_1.TableHelper.updateDiscountTable();
        document.getElementById("discountEditForm").parentNode.removeChild(document.getElementById("discountEditForm"));
        document.getElementById("discountEditHeader").parentNode.removeChild(document.getElementById("discountEditHeader"));
        alert("İndirim başarılı bir şekilde güncellendi.");
      };
    }
  }]);

  return DiscountFormHelper;
}();

exports.DiscountFormHelper = DiscountFormHelper;
},{"./../enum/types":"ts-src/enum/types.ts","./FormHelper":"ts-src/form/FormHelper.ts","./../model/DiscountHelper":"ts-src/model/DiscountHelper.ts","./../table/TableHelper":"ts-src/table/TableHelper.ts"}],"ts-src/DiscountCalculator.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DiscountCalculator = void 0;

var Database_1 = require("./data/Database");

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
      Database_1.Database.discounts.forEach(function (value, index, array) {
        if (value.DiscountType == "PERCENTAGE") {
          percent += DiscountCalculator.executeCalculateMethods(user, preschool, value);
        }

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
      var result = 0;

      if (DiscountCalculator.calculateEarlyRegistration(preschool) && discount.DiscountName == "Erken Kayıt Indirimi") {
        discount.DiscountValues.forEach(function (discountValue) {
          if (discountValue.preschool.id == preschool.Id) result = Number(discountValue.value);
        });
      }

      return result;
    }
    /**
     * Kişi tip indirimni hesaplar, kişiye özel indirim çalışılan kurum seçilmeden ve tek bir kişi tipi seçilmiş olduğunda hesaplamaktadır.
     */

  }, {
    key: "calculateUserTypeDiscount",
    value: function calculateUserTypeDiscount(discount, user, preschool) {
      var result = 0;

      if (discount.UserTypes.length == 1 && discount.UserTypes.includes(user.TypeOfUser) && discount.OrganizationName == types_1.OrganizationName.NONE) {
        discount.DiscountValues.forEach(function (discountValue) {
          if (discountValue.preschool.id == preschool.Id) result = Number(discountValue.value);
        });
      }

      return result;
    }
    /**
     * Çalışılan kurum indirimini hesaplar, Kurumun NONE olmaması, kullanıcının girdiği kurum ile indirimin kurumunun aynı olması ve indirim listesinde kurumun bulunması kontrollerini sağlar.
     */

  }, {
    key: "calculateOrganizationDiscount",
    value: function calculateOrganizationDiscount(discount, user, preschool) {
      var result = 0;

      if (discount.OrganizationName != types_1.OrganizationName.NONE && discount.OrganizationName == user.OrganizationOfUser && discount.UserTypes.includes(user.TypeOfUser)) {
        discount.DiscountValues.forEach(function (discountValue) {
          if (discountValue.preschool.id == preschool.Id) result = Number(discountValue.value);
        });
      }

      return result;
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
},{"./data/Database":"ts-src/data/Database.ts","./enum/types":"ts-src/enum/types.ts"}],"ts-src/model/User.ts":[function(require,module,exports) {
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
},{}],"ts-src/model/UserHelper.ts":[function(require,module,exports) {
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UserHelper = void 0;

var Database_1 = require("./../data/Database");

var DiscountCalculator_1 = require("./../DiscountCalculator");

var Types_1 = require("./../enum/Types");

var User_1 = require("./User");

var UserHelper = /*#__PURE__*/function () {
  function UserHelper() {
    _classCallCheck(this, UserHelper);
  }

  _createClass(UserHelper, null, [{
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
            organizationChoose = Types_1.OrganizationName.ANADOLU;
            break;
          }

        case "SAGLIK":
          {
            organizationChoose = Types_1.OrganizationName.SAGLIK;
            break;
          }

        default:
          {
            organizationChoose = Types_1.OrganizationName.NONE;
          }
      }

      var userTypeChoose;
      var userPersonelRadio = document.getElementById("user-personel");
      if (userPersonelRadio.checked) userTypeChoose = Types_1.UserType.PERSONEL;
      userPersonelRadio = document.getElementById("user-ihvan");
      if (userPersonelRadio.checked) userTypeChoose = Types_1.UserType.IHVAN;
      userPersonelRadio = document.getElementById("user-standart");
      if (userPersonelRadio.checked) userTypeChoose = Types_1.UserType.STANDART;
      var user = new User_1.User(userName.value, userTypeChoose, organizationChoose);
      var preschool = Database_1.Database.preschools[preschoolChoose.value];
      var discount = DiscountCalculator_1.DiscountCalculator.calculateDiscount(user, preschool);
      var discountResult = document.getElementById("discount-result");

      if (discount == NaN || discount == null) {
        discountResult.innerHTML = "<p>" + preschool.PreschoolName + " Anaokulunun \xFCcreti " + preschool.Price + " TL'dir. Sizin \xF6demeniz gereken \xFCcret</p>\n                    <h3 >" + preschool.Price + " TL</h3>";
      } else discountResult.innerHTML = "<p>" + preschool.PreschoolName + " Anaokulunun \xFCcreti " + preschool.Price + " TL'dir. Sizin \xF6demeniz gereken \xFCcret</p>\n                    <h3 >" + discount + " TL</h3>";
    }
  }]);

  return UserHelper;
}();

exports.UserHelper = UserHelper;
},{"./../data/Database":"ts-src/data/Database.ts","./../DiscountCalculator":"ts-src/DiscountCalculator.ts","./../enum/Types":"ts-src/enum/Types.ts","./User":"ts-src/model/User.ts"}],"ts-src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var FormHelper_1 = require("./form/FormHelper");

var DiscountFormHelper_1 = require("./form/DiscountFormHelper");

var PreschoolFormHelper_1 = require("./form/PreschoolFormHelper");

var TableHelper_1 = require("./table/TableHelper");

var UserHelper_1 = require("./model/UserHelper");

var DiscountHelper_1 = require("./model/DiscountHelper");

var Database_1 = require("./data/Database");
/**
 * State, programın içerisde hangi bölümde işlem yaptığımız tutar.
 */


var state = 0;
/**
 * Sistem ilk açıldığında preschoolList ve discountList sistemde tanımlı olan anaokullarını ve indirimleri database'de bulunanan listelere aktarır.
 */

var preschoolList = Database_1.Database.createPreschoolList();
var discountList = Database_1.Database.createDiscountList();
var discountValuesList = Database_1.Database.createDiscountValuesList();
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
    FormHelper_1.FormHelper.createUserInputForm();
    TableHelper_1.TableHelper.printHomeButton(document.getElementById("discountCalculateButtonUl"));
    var myParent = document.getElementById("selectField");
    FormHelper_1.FormHelper.createPreschoolSelectList(myParent);
    FormHelper_1.FormHelper.createOrganizationNameSelectList(document.getElementById("selectOrganizationField"), "userInput");
  }

  var discountCalculateButton = document.getElementById("calculate");

  discountCalculateButton.onclick = function () {
    UserHelper_1.UserHelper.createUserFromUserInput();
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
  TableHelper_1.TableHelper.createDiscountTable();
  var discountAppendButton = document.getElementById("append-discount");

  discountAppendButton.onclick = function () {
    if (!document.getElementById("discountAppendForm")) DiscountFormHelper_1.DiscountFormHelper.createAppendDiscountForm();
    var discountAppend = document.getElementById("appendDiscount");

    discountAppend.onclick = function () {
      DiscountHelper_1.DiscountHelper.createDiscountFromInput();
      TableHelper_1.TableHelper.updateDiscountTable();
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
  TableHelper_1.TableHelper.createPreschoolTable();
  var preschoolAppendButton = document.getElementById("appendPreschoolForm");

  preschoolAppendButton.onclick = function () {
    if (!document.getElementById("preschoolAppendForm")) PreschoolFormHelper_1.PreschoolFormHelper.createPreschoolAppendForm();
  };
};

function removeState(id) {
  var element = document.getElementById(id);
  element.parentNode.removeChild(element);
}
},{"./form/FormHelper":"ts-src/form/FormHelper.ts","./form/DiscountFormHelper":"ts-src/form/DiscountFormHelper.ts","./form/PreschoolFormHelper":"ts-src/form/PreschoolFormHelper.ts","./table/TableHelper":"ts-src/table/TableHelper.ts","./model/UserHelper":"ts-src/model/UserHelper.ts","./model/DiscountHelper":"ts-src/model/DiscountHelper.ts","./data/Database":"ts-src/data/Database.ts"}],"../../AppData/Roaming/npm-cache/_npx/11580/node_modules/parcel/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "54621" + '/');

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
},{}]},{},["../../AppData/Roaming/npm-cache/_npx/11580/node_modules/parcel/src/builtins/hmr-runtime.js","ts-src/index.ts"], null)
//# sourceMappingURL=/ts-src.92bb75dc.js.map