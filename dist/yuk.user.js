// ==UserScript==
// @name         yuk
// @version      0.0.0
// @match        https://examination.xuetangx.com/exam/*
// @grant        GM.getValue
// @grant        GM.setValue
// @run-at       document-start
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Client": () => (/* binding */ Client)
/* harmony export */ });
/* harmony import */ var _xhr__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class Client {
    constructor(ws) {
        this.ws = ws;
    }
    static login(server, username, examId) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((ok, err) => {
                const ws = new WebSocket((0,_xhr__WEBPACK_IMPORTED_MODULE_0__.newURL)(`ws://${server}/login`, {
                    username: username,
                    exam_id: examId,
                }));
                const client = new Client(ws);
                ws.onopen = () => {
                    ok(client);
                };
                ws.onerror = err;
                ws.onclose = () => {
                    err(new Error("server has been closed"));
                };
            });
        });
    }
    send(msg) {
        this.ws.send(JSON.stringify(msg));
    }
    onmessage(cb) {
        this.ws.addEventListener("message", (ev) => cb(JSON.parse(ev.data)));
    }
}


/***/ }),
/* 2 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hookXHR": () => (/* binding */ hookXHR),
/* harmony export */   "newURL": () => (/* binding */ newURL)
/* harmony export */ });
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function newURL(url, params) {
    const url2 = new URL(url, self.location.origin);
    for (const [k, v] of Object.entries(params !== null && params !== void 0 ? params : {})) {
        url2.searchParams.set(k, v);
    }
    return url2;
}
function hookXHR(cb) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise((ok, err) => {
            const open = XMLHttpRequest.prototype.open;
            XMLHttpRequest.prototype.open = function (_method, url) {
                cb.call(this, newURL(url), new Promise((ok) => {
                    const send = this.send;
                    this.send = function (data) {
                        ok(data);
                        send.apply(this, arguments);
                        this.send = send;
                    };
                }))
                    .then((val) => {
                    ok(val);
                    XMLHttpRequest.prototype.open = open;
                })
                    .catch(err);
                open.apply(this, arguments);
            };
        });
    });
}


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProblemType": () => (/* binding */ ProblemType),
/* harmony export */   "isChoice": () => (/* binding */ isChoice)
/* harmony export */ });
var ProblemType;
(function (ProblemType) {
    /**
     * 单选题
     */
    ProblemType[ProblemType["SingleChoice"] = 1] = "SingleChoice";
    /**
     * 多选题
     */
    ProblemType[ProblemType["MultipleChoice"] = 2] = "MultipleChoice";
    /**
     * 投票题
     */
    ProblemType[ProblemType["Polling"] = 3] = "Polling";
    /**
     * 填空题
     */
    ProblemType[ProblemType["FillBlank"] = 4] = "FillBlank";
    /**
     * 主观题
     */
    ProblemType[ProblemType["ShortAnswer"] = 5] = "ShortAnswer";
    /**
     * 判断题
     */
    ProblemType[ProblemType["Judgement"] = 6] = "Judgement";
})(ProblemType || (ProblemType = {}));
function isChoice(ty) {
    return (ty === ProblemType.SingleChoice ||
        ty === ProblemType.MultipleChoice ||
        ty === ProblemType.Polling);
}


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SERVER": () => (/* binding */ SERVER),
/* harmony export */   "UI": () => (/* binding */ UI),
/* harmony export */   "USERNAME": () => (/* binding */ USERNAME)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(3);
/* harmony import */ var _style_module_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _gm_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(15);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};



class Map2 extends Map {
    constructor(def) {
        super();
        this.def = def;
    }
    setWith(key, op) {
        var _a;
        super.set(key, op((_a = super.get(key)) !== null && _a !== void 0 ? _a : this.def()));
    }
}
function percent(n) {
    return `${Math.floor(n * 100)}%`;
}
class Tooltip {
    constructor(ele) {
        const tooltip = document.createElement("div");
        tooltip.classList.add(_style_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].tooltip);
        ele.after(tooltip);
        this.tooltip = tooltip;
        const show = () => this.tooltip.setAttribute("data-show", "");
        const hide = () => this.tooltip.removeAttribute("data-show");
        ele.addEventListener("mouseover", show);
        ele.addEventListener("mouseout", hide);
        this.toggle(true);
    }
    toggle(enabled) {
        this.tooltip.style.visibility = enabled ? "" : "hidden";
    }
    set content(val) {
        this.tooltip.textContent = val;
    }
}
class ProblemCard {
    constructor(problem, subjectItem) {
        /**
         * Username => Result
         */
        this.results = new Map();
        const type = problem.ProblemType;
        const options = new Map();
        switch (type) {
            case _types__WEBPACK_IMPORTED_MODULE_0__.ProblemType.SingleChoice:
            case _types__WEBPACK_IMPORTED_MODULE_0__.ProblemType.MultipleChoice:
            case _types__WEBPACK_IMPORTED_MODULE_0__.ProblemType.Polling:
            case _types__WEBPACK_IMPORTED_MODULE_0__.ProblemType.Judgement:
                subjectItem
                    .querySelectorAll(".item-body div ul li")
                    .forEach((li, idx) => {
                    options.set(problem.Options[idx].key, new Tooltip(li));
                });
                break;
            case _types__WEBPACK_IMPORTED_MODULE_0__.ProblemType.FillBlank:
                subjectItem
                    .querySelectorAll(".item-body div span input")
                    .forEach((span, idx) => {
                    options.set(`${idx + 1}`, new Tooltip(span));
                });
                break;
        }
        this.type = type;
        this.options = options;
    }
    updateResult(username, result) {
        this.results.set(username, result);
    }
    updateUI() {
        // Reset tooltip of options.
        this.options.forEach((opt) => (opt.content = ""));
        switch (this.type) {
            // Tooltip show how many users have selected the option.
            case _types__WEBPACK_IMPORTED_MODULE_0__.ProblemType.SingleChoice:
            case _types__WEBPACK_IMPORTED_MODULE_0__.ProblemType.MultipleChoice:
            case _types__WEBPACK_IMPORTED_MODULE_0__.ProblemType.Polling:
            case _types__WEBPACK_IMPORTED_MODULE_0__.ProblemType.Judgement:
                const optCounter = new Map2(() => 0);
                this.results.forEach((res) => {
                    res.forEach((key) => {
                        optCounter.setWith(key, (n) => n + 1);
                    });
                });
                optCounter.forEach((num, key) => {
                    this.options.get(key).content = `[${percent(num / this.results.size)}]`;
                });
                break;
            // Tooltip show the most popular answers.
            case _types__WEBPACK_IMPORTED_MODULE_0__.ProblemType.FillBlank:
                const ansCounter = new Map2(() => new Map2(() => 0));
                this.results.forEach((res) => {
                    Object.entries(res).forEach(([key, text]) => {
                        ansCounter.setWith(key, (counter) => {
                            counter.setWith(text, (n) => n + 1);
                            return counter;
                        });
                    });
                });
                ansCounter.forEach((counter, key) => {
                    const [text, num] = [...counter.entries()]
                        .sort(([_1, a], [_2, b]) => a - b)
                        .pop();
                    this.options.get(key).content = `[${percent(num / this.results.size)}] ${text}`;
                });
                break;
        }
    }
}
class GMEntry {
    constructor(name, validator) {
        this.name = name;
        this.validator = validator !== null && validator !== void 0 ? validator : (() => true);
    }
    getValue() {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = (yield _gm_js__WEBPACK_IMPORTED_MODULE_2__["default"].getValue(this.name))) !== null && _a !== void 0 ? _a : (yield this.updateValue());
        });
    }
    updateValue() {
        return __awaiter(this, void 0, void 0, function* () {
            let val = yield _gm_js__WEBPACK_IMPORTED_MODULE_2__["default"].getValue(this.name);
            let newVal = null;
            while (true) {
                if (newVal === null || newVal === "") {
                    if (val !== undefined) {
                        newVal = prompt(`Value of "${this.name}" is "${val}"`);
                        // Do not need to update.
                        if (newVal === null || newVal === "") {
                            return val;
                        }
                    }
                    else {
                        newVal = prompt(`Input "${this.name}"`);
                    }
                }
                else if (!this.validator(newVal)) {
                    newVal = prompt(`Invalid value, input "${this.name}" again`);
                }
                else {
                    yield _gm_js__WEBPACK_IMPORTED_MODULE_2__["default"].setValue(this.name, newVal);
                    return newVal;
                }
            }
        });
    }
}
function createButtonText(text, onClick) {
    const ele = document.createElement("span");
    ele.classList.add(_style_module_css__WEBPACK_IMPORTED_MODULE_1__["default"].buttonText);
    ele.textContent = text;
    ele.addEventListener("click", onClick);
    return ele;
}
const USERNAME = new GMEntry("username", (val) => /[_\w][_\w\d]+/.test(val));
const SERVER = new GMEntry("server");
class UI {
    constructor(paper) {
        // Header.
        const header = document.querySelector(".header-title");
        header.appendChild(createButtonText("U", () => USERNAME.updateValue()));
        header.appendChild(createButtonText("S", () => SERVER.updateValue()));
        // Problem cards.
        const problems = new Map();
        document
            .querySelectorAll(".exam-main--body div .subject-item")
            .forEach((subjectItem, idx) => {
            const prob = paper.data.problems[idx];
            problems.set(prob.problem_id, new ProblemCard(prob, subjectItem));
        });
        this.problems = problems;
    }
    updateAnswer({ username, answers }) {
        answers.forEach(({ problem_id, result }) => {
            var _a;
            (_a = this.problems.get(problem_id)) === null || _a === void 0 ? void 0 : _a.updateResult(username, result);
        });
    }
    updateUI() {
        this.problems.forEach((card) => card.updateUI());
    }
}


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(9);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(10);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_teamsupercell_typings_for_css_modules_loader_src_index_js_ruleSet_1_rules_1_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_style_module_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(12);

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_teamsupercell_typings_for_css_modules_loader_src_index_js_ruleSet_1_rules_1_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_style_module_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_teamsupercell_typings_for_css_modules_loader_src_index_js_ruleSet_1_rules_1_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_style_module_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_teamsupercell_typings_for_css_modules_loader_src_index_js_ruleSet_1_rules_1_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_style_module_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_teamsupercell_typings_for_css_modules_loader_src_index_js_ruleSet_1_rules_1_use_1_node_modules_css_loader_dist_cjs_js_ruleSet_1_rules_1_use_2_style_module_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),
/* 6 */
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 7 */
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),
/* 8 */
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),
/* 9 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),
/* 10 */
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),
/* 11 */
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),
/* 12 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".__yuk_xrCwn7VvvG6kgp7rEzuu {\n  position: absolute;\n  visibility: hidden;\n  display: block;\n  z-index: 1;\n  color: rgba(0, 0, 0, 0.15);\n  background-color: white;\n  padding: 0.1rem;\n  border-radius: 0.3rem;\n  font-weight: bold;\n  font-size: 0.3rem;\n  left: 0;\n  bottom: 0;\n}\n\n.__yuk_xrCwn7VvvG6kgp7rEzuu[data-show] {\n  visibility: visible;\n}\n\n.__yuk_Pe8cc3UkSAB5IgoDkaOw {\n  cursor: pointer;\n  margin-left: 0.25rem;\n  text-decoration: underline;\n}\n", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"tooltip": "__yuk_xrCwn7VvvG6kgp7rEzuu",
	"buttonText": "__yuk_Pe8cc3UkSAB5IgoDkaOw"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 13 */
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 14 */
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";

      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }

      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }

      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }

      content += cssWithMappingToString(item);

      if (needLayer) {
        content += "}";
      }

      if (item[2]) {
        content += "}";
      }

      if (item[4]) {
        content += "}";
      }

      return content;
    }).join("");
  }; // import a list of modules into the list


  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }

      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }

      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }

      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  /**
   * @param {string} key
   * @returns {Promise<any>}
   */
  async getValue(key) {
    return await GM.getValue(key);
  },

  /**
   * @param {string} key
   * @param {any} val
   * @returns {Promise<void>}
   */
  async setValue(key, val) {
    return await GM.setValue(key, val);
  },
});


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sortPaper": () => (/* binding */ sortPaper)
/* harmony export */ });
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _xhr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(2);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(4);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};




function sortPaper(paper) {
    paper.data.problems.sort((a, b) => a.problem_id - b.problem_id);
    paper.data.problems.forEach((problem) => {
        if ((0,_types__WEBPACK_IMPORTED_MODULE_2__.isChoice)(problem.ProblemType)) {
            problem.Options.sort((a, b) => {
                return a.key < b.key ? -1 : 1;
            });
        }
    });
    return paper;
}
function login(server, username) {
    return __awaiter(this, void 0, void 0, function* () {
        return (0,_xhr__WEBPACK_IMPORTED_MODULE_1__.hookXHR)(function (url) {
            return new Promise((ok) => {
                if (url.pathname === "/exam_room/show_paper") {
                    this.addEventListener("readystatechange", () => {
                        if (this.readyState == XMLHttpRequest.DONE) {
                            // Sort problems.
                            const text = JSON.stringify(sortPaper(JSON.parse(this.responseText)));
                            // Modify response text.
                            Object.defineProperties(this, {
                                responseText: {
                                    get() {
                                        return text;
                                    },
                                },
                            });
                        }
                    });
                    this.addEventListener("load", () => {
                        // Login to server.
                        const examId = url.searchParams.get("exam_id");
                        ok(_client__WEBPACK_IMPORTED_MODULE_0__.Client.login(server, username, examId).then((client) => ({
                            client: client,
                            examId: examId,
                            paper: JSON.parse(this.responseText),
                        })));
                    });
                }
            });
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const username = yield _ui__WEBPACK_IMPORTED_MODULE_3__.USERNAME.getValue();
        const server = yield _ui__WEBPACK_IMPORTED_MODULE_3__.SERVER.getValue();
        const { client, examId, paper } = yield login(server, username);
        // Initialize UI.
        const ui = new _ui__WEBPACK_IMPORTED_MODULE_3__.UI(paper);
        console.log(paper);
        // Receive answers and update UI.
        client.onmessage((msg) => {
            console.log(msg);
            msg.forEach((ans) => {
                ui.updateAnswer(ans);
            });
            ui.updateUI();
        });
        // Upload cached results.
        const cacheResults = yield fetch((0,_xhr__WEBPACK_IMPORTED_MODULE_1__.newURL)("/exam_room/cache_results", { exam_id: examId }).toString()).then((res) => res.json());
        client.send(cacheResults.data.results);
        // Upload answers.
        yield (0,_xhr__WEBPACK_IMPORTED_MODULE_1__.hookXHR)(function (url, body) {
            return new Promise(() => __awaiter(this, void 0, void 0, function* () {
                if (url.pathname === "/exam_room/answer_problem") {
                    const data = JSON.parse(yield body);
                    client.send(data.results);
                }
            }));
        });
    });
}
main().catch(console.error);

})();

/******/ })()
;