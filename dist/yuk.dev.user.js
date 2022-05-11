// ==UserScript==
// @name         yuk-client
// @version      0.3.1
// @match        https://examination.xuetangx.com/*
// @grant        GM.xmlHttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Client": () => (/* binding */ Client)
/* harmony export */ });
/* harmony import */ var json_rpc_2_0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var json_rpc_2_0__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(json_rpc_2_0__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _gm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
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
    constructor() {
        this.onmsg = [];
        this.queue = new Map();
        const client = new json_rpc_2_0__WEBPACK_IMPORTED_MODULE_0__.JSONRPCClient((req) => __awaiter(this, void 0, void 0, function* () {
            const url = _config__WEBPACK_IMPORTED_MODULE_3__.SERVER.value;
            if (url !== null) {
                yield new Promise((ok, err) => __awaiter(this, void 0, void 0, function* () {
                    yield _gm__WEBPACK_IMPORTED_MODULE_1__["default"].xhr({
                        url: url,
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        data: JSON.stringify(req),
                        onload: (resp) => {
                            if (resp.status === 200) {
                                client.receive(JSON.parse(resp.responseText));
                                ok();
                            }
                            else {
                                err(new Error(resp.statusText));
                            }
                        },
                        onerror: (resp) => err(resp.statusText),
                    });
                }));
            }
        }));
        this.client = client;
    }
    watch(ms) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((_, err) => {
                const timer = setInterval(() => {
                    this.sendQueue().catch((e) => {
                        clearInterval(timer);
                        alert("与服务器通信异常");
                        err(e);
                    });
                }, ms);
            });
        });
    }
    sendQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.queue.size < 1 ||
                _config__WEBPACK_IMPORTED_MODULE_3__.USERNAME.value === null ||
                _config__WEBPACK_IMPORTED_MODULE_3__.SERVER.value === null ||
                _config__WEBPACK_IMPORTED_MODULE_3__.EXAM_ID.value === null ||
                _config__WEBPACK_IMPORTED_MODULE_3__.SYNC_ANSWERS.value === false) {
                return;
            }
            let answers = [...this.queue.values()];
            this.queue.clear();
            if (_config__WEBPACK_IMPORTED_MODULE_3__.TOKEN.value === null) {
                (0,_utils__WEBPACK_IMPORTED_MODULE_2__.devLog)(`login to server: ${_config__WEBPACK_IMPORTED_MODULE_3__.USERNAME.value}, ${_config__WEBPACK_IMPORTED_MODULE_3__.EXAM_ID.value}`);
                const token = yield this.client.request("login", [
                    _config__WEBPACK_IMPORTED_MODULE_3__.USERNAME.value,
                    _config__WEBPACK_IMPORTED_MODULE_3__.EXAM_ID.value,
                ]);
                (0,_utils__WEBPACK_IMPORTED_MODULE_2__.devLog)("got token", token);
                _config__WEBPACK_IMPORTED_MODULE_3__.TOKEN.value = token;
            }
            this.postAnswers(_config__WEBPACK_IMPORTED_MODULE_3__.TOKEN.value, answers);
        });
    }
    postAnswers(token, answers) {
        return __awaiter(this, void 0, void 0, function* () {
            (0,_utils__WEBPACK_IMPORTED_MODULE_2__.devLog)("send answers", answers);
            const rcev = yield this.client.request("answer_problem", [token, answers]);
            (0,_utils__WEBPACK_IMPORTED_MODULE_2__.devLog)("receive answers", rcev);
            this.onmsg.forEach((cb) => cb(rcev));
        });
    }
    answerProblem(answers) {
        return __awaiter(this, void 0, void 0, function* () {
            answers.forEach((ans) => {
                this.queue.set(ans.problem_id, ans);
            });
        });
    }
    onmessage(cb) {
        this.onmsg.push(cb);
    }
}


/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
__exportStar(__webpack_require__(3), exports);
__exportStar(__webpack_require__(4), exports);
__exportStar(__webpack_require__(6), exports);
__exportStar(__webpack_require__(7), exports);


/***/ }),
/* 3 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JSONRPCClient = void 0;
var models_1 = __webpack_require__(4);
var internal_1 = __webpack_require__(5);
var JSONRPCClient = /** @class */ (function () {
    function JSONRPCClient(_send, createID) {
        this._send = _send;
        this.createID = createID;
        this.idToResolveMap = new Map();
        this.id = 0;
    }
    JSONRPCClient.prototype._createID = function () {
        if (this.createID) {
            return this.createID();
        }
        else {
            return ++this.id;
        }
    };
    JSONRPCClient.prototype.timeout = function (delay, overrideCreateJSONRPCErrorResponse) {
        var _this = this;
        if (overrideCreateJSONRPCErrorResponse === void 0) { overrideCreateJSONRPCErrorResponse = function (id) {
            return (0, models_1.createJSONRPCErrorResponse)(id, internal_1.DefaultErrorCode, "Request timeout");
        }; }
        var timeoutRequest = function (ids, request) {
            var timeoutID = setTimeout(function () {
                ids.forEach(function (id) {
                    var resolve = _this.idToResolveMap.get(id);
                    if (resolve) {
                        _this.idToResolveMap.delete(id);
                        resolve(overrideCreateJSONRPCErrorResponse(id));
                    }
                });
            }, delay);
            return request().then(function (result) {
                clearTimeout(timeoutID);
                return result;
            }, function (error) {
                clearTimeout(timeoutID);
                return Promise.reject(error);
            });
        };
        var requestAdvanced = function (request, clientParams) {
            var ids = (!Array.isArray(request) ? [request] : request)
                .map(function (request) { return request.id; })
                .filter(isDefinedAndNonNull);
            return timeoutRequest(ids, function () {
                return _this.requestAdvanced(request, clientParams);
            });
        };
        return {
            request: function (method, params, clientParams) {
                var id = _this._createID();
                return timeoutRequest([id], function () {
                    return _this.requestWithID(method, params, clientParams, id);
                });
            },
            requestAdvanced: function (request, clientParams) { return requestAdvanced(request, clientParams); },
        };
    };
    JSONRPCClient.prototype.request = function (method, params, clientParams) {
        return this.requestWithID(method, params, clientParams, this._createID());
    };
    JSONRPCClient.prototype.requestWithID = function (method, params, clientParams, id) {
        return __awaiter(this, void 0, void 0, function () {
            var request, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        request = {
                            jsonrpc: models_1.JSONRPC,
                            method: method,
                            params: params,
                            id: id,
                        };
                        return [4 /*yield*/, this.requestAdvanced(request, clientParams)];
                    case 1:
                        response = _a.sent();
                        if (response.result !== undefined && !response.error) {
                            return [2 /*return*/, response.result];
                        }
                        else if (response.result === undefined && response.error) {
                            return [2 /*return*/, Promise.reject(new Error(response.error.message))];
                        }
                        else {
                            return [2 /*return*/, Promise.reject(new Error("An unexpected error occurred"))];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    JSONRPCClient.prototype.requestAdvanced = function (requests, clientParams) {
        var _this = this;
        var areRequestsOriginallyArray = Array.isArray(requests);
        if (!Array.isArray(requests)) {
            requests = [requests];
        }
        var requestsWithID = requests.filter(function (request) {
            return isDefinedAndNonNull(request.id);
        });
        var promises = requestsWithID.map(function (request) {
            return new Promise(function (resolve) { return _this.idToResolveMap.set(request.id, resolve); });
        });
        var promise = Promise.all(promises).then(function (responses) {
            if (areRequestsOriginallyArray || !responses.length) {
                return responses;
            }
            else {
                return responses[0];
            }
        });
        return this.send(areRequestsOriginallyArray ? requests : requests[0], clientParams).then(function () { return promise; }, function (error) {
            requestsWithID.forEach(function (request) {
                _this.receive((0, models_1.createJSONRPCErrorResponse)(request.id, internal_1.DefaultErrorCode, (error && error.message) || "Failed to send a request"));
            });
            return promise;
        });
    };
    JSONRPCClient.prototype.notify = function (method, params, clientParams) {
        this.send({
            jsonrpc: models_1.JSONRPC,
            method: method,
            params: params,
        }, clientParams).then(undefined, function () { return undefined; });
    };
    JSONRPCClient.prototype.send = function (payload, clientParams) {
        return this._send(payload, clientParams);
    };
    JSONRPCClient.prototype.rejectAllPendingRequests = function (message) {
        this.idToResolveMap.forEach(function (resolve, id) {
            return resolve((0, models_1.createJSONRPCErrorResponse)(id, internal_1.DefaultErrorCode, message));
        });
        this.idToResolveMap.clear();
    };
    JSONRPCClient.prototype.receive = function (responses) {
        var _this = this;
        if (!Array.isArray(responses)) {
            responses = [responses];
        }
        responses.forEach(function (response) {
            var resolve = _this.idToResolveMap.get(response.id);
            if (resolve) {
                _this.idToResolveMap.delete(response.id);
                resolve(response);
            }
        });
    };
    return JSONRPCClient;
}());
exports.JSONRPCClient = JSONRPCClient;
var isDefinedAndNonNull = function (value) {
    return value !== undefined && value !== null;
};


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.createJSONRPCErrorResponse = exports.JSONRPCErrorCode = exports.isJSONRPCResponses = exports.isJSONRPCResponse = exports.isJSONRPCRequests = exports.isJSONRPCRequest = exports.isJSONRPCID = exports.JSONRPC = void 0;
exports.JSONRPC = "2.0";
var isJSONRPCID = function (id) {
    return typeof id === "string" || typeof id === "number" || id === null;
};
exports.isJSONRPCID = isJSONRPCID;
var isJSONRPCRequest = function (payload) {
    return (payload.jsonrpc === exports.JSONRPC &&
        payload.method !== undefined &&
        payload.result === undefined &&
        payload.error === undefined);
};
exports.isJSONRPCRequest = isJSONRPCRequest;
var isJSONRPCRequests = function (payload) {
    return Array.isArray(payload) && payload.every(exports.isJSONRPCRequest);
};
exports.isJSONRPCRequests = isJSONRPCRequests;
var isJSONRPCResponse = function (payload) {
    return (payload.jsonrpc === exports.JSONRPC &&
        payload.id !== undefined &&
        (payload.result !== undefined || payload.error !== undefined));
};
exports.isJSONRPCResponse = isJSONRPCResponse;
var isJSONRPCResponses = function (payload) {
    return Array.isArray(payload) && payload.every(exports.isJSONRPCResponse);
};
exports.isJSONRPCResponses = isJSONRPCResponses;
var JSONRPCErrorCode;
(function (JSONRPCErrorCode) {
    JSONRPCErrorCode[JSONRPCErrorCode["ParseError"] = -32700] = "ParseError";
    JSONRPCErrorCode[JSONRPCErrorCode["InvalidRequest"] = -32600] = "InvalidRequest";
    JSONRPCErrorCode[JSONRPCErrorCode["MethodNotFound"] = -32601] = "MethodNotFound";
    JSONRPCErrorCode[JSONRPCErrorCode["InvalidParams"] = -32602] = "InvalidParams";
    JSONRPCErrorCode[JSONRPCErrorCode["InternalError"] = -32603] = "InternalError";
})(JSONRPCErrorCode = exports.JSONRPCErrorCode || (exports.JSONRPCErrorCode = {}));
var createJSONRPCErrorResponse = function (id, code, message, data) {
    var error = { code: code, message: message };
    if (data) {
        error.data = data;
    }
    return {
        jsonrpc: exports.JSONRPC,
        id: id,
        error: error,
    };
};
exports.createJSONRPCErrorResponse = createJSONRPCErrorResponse;


/***/ }),
/* 5 */
/***/ ((__unused_webpack_module, exports) => {

"use strict";

Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DefaultErrorCode = void 0;
exports.DefaultErrorCode = 0;


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JSONRPCServer = void 0;
var models_1 = __webpack_require__(4);
var internal_1 = __webpack_require__(5);
var createParseErrorResponse = function () {
    return (0, models_1.createJSONRPCErrorResponse)(null, models_1.JSONRPCErrorCode.ParseError, "Parse error");
};
var createInvalidRequestResponse = function (request) {
    return (0, models_1.createJSONRPCErrorResponse)((0, models_1.isJSONRPCID)(request.id) ? request.id : null, models_1.JSONRPCErrorCode.InvalidRequest, "Invalid Request");
};
var createMethodNotFoundResponse = function (id) {
    return (0, models_1.createJSONRPCErrorResponse)(id, models_1.JSONRPCErrorCode.MethodNotFound, "Method not found");
};
var JSONRPCServer = /** @class */ (function () {
    function JSONRPCServer(options) {
        if (options === void 0) { options = {}; }
        var _a;
        this.mapErrorToJSONRPCErrorResponse = defaultMapErrorToJSONRPCErrorResponse;
        this.nameToMethodDictionary = {};
        this.middleware = null;
        this.errorListener = (_a = options.errorListener) !== null && _a !== void 0 ? _a : console.warn;
    }
    JSONRPCServer.prototype.addMethod = function (name, method) {
        this.addMethodAdvanced(name, this.toJSONRPCMethod(method));
    };
    JSONRPCServer.prototype.toJSONRPCMethod = function (method) {
        return function (request, serverParams) {
            var response = method(request.params, serverParams);
            return Promise.resolve(response).then(function (result) {
                return mapResultToJSONRPCResponse(request.id, result);
            });
        };
    };
    JSONRPCServer.prototype.addMethodAdvanced = function (name, method) {
        var _a;
        this.nameToMethodDictionary = __assign(__assign({}, this.nameToMethodDictionary), (_a = {}, _a[name] = method, _a));
    };
    JSONRPCServer.prototype.receiveJSON = function (json, serverParams) {
        var request = this.tryParseRequestJSON(json);
        if (request) {
            return this.receive(request, serverParams);
        }
        else {
            return Promise.resolve(createParseErrorResponse());
        }
    };
    JSONRPCServer.prototype.tryParseRequestJSON = function (json) {
        try {
            return JSON.parse(json);
        }
        catch (_a) {
            return null;
        }
    };
    JSONRPCServer.prototype.receive = function (request, serverParams) {
        if (Array.isArray(request)) {
            return this.receiveMultiple(request, serverParams);
        }
        else {
            return this.receiveSingle(request, serverParams);
        }
    };
    JSONRPCServer.prototype.receiveMultiple = function (requests, serverParams) {
        return __awaiter(this, void 0, void 0, function () {
            var responses;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, Promise.all(requests.map(function (request) { return _this.receiveSingle(request, serverParams); }))];
                    case 1:
                        responses = (_a.sent()).filter(isNonNull);
                        if (responses.length === 1) {
                            return [2 /*return*/, responses[0]];
                        }
                        else if (responses.length) {
                            return [2 /*return*/, responses];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    JSONRPCServer.prototype.receiveSingle = function (request, serverParams) {
        return __awaiter(this, void 0, void 0, function () {
            var method, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        method = this.nameToMethodDictionary[request.method];
                        if (!!(0, models_1.isJSONRPCRequest)(request)) return [3 /*break*/, 1];
                        return [2 /*return*/, createInvalidRequestResponse(request)];
                    case 1:
                        if (!method) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.callMethod(method, request, serverParams)];
                    case 2:
                        response = _a.sent();
                        return [2 /*return*/, mapResponse(request, response)];
                    case 3:
                        if (request.id !== undefined) {
                            return [2 /*return*/, createMethodNotFoundResponse(request.id)];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    JSONRPCServer.prototype.applyMiddleware = function () {
        var middlewares = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            middlewares[_i] = arguments[_i];
        }
        if (this.middleware) {
            this.middleware = this.combineMiddlewares(__spreadArray([
                this.middleware
            ], middlewares, true));
        }
        else {
            this.middleware = this.combineMiddlewares(middlewares);
        }
    };
    JSONRPCServer.prototype.combineMiddlewares = function (middlewares) {
        if (!middlewares.length) {
            return null;
        }
        else {
            return middlewares.reduce(this.middlewareReducer);
        }
    };
    JSONRPCServer.prototype.middlewareReducer = function (prevMiddleware, nextMiddleware) {
        return function (next, request, serverParams) {
            return prevMiddleware(function (request, serverParams) { return nextMiddleware(next, request, serverParams); }, request, serverParams);
        };
    };
    JSONRPCServer.prototype.callMethod = function (method, request, serverParams) {
        var _this = this;
        var callMethod = function (request, serverParams) {
            return method(request, serverParams);
        };
        var onError = function (error) {
            _this.errorListener("An unexpected error occurred while executing \"".concat(request.method, "\" JSON-RPC method:"), error);
            return Promise.resolve(_this.mapErrorToJSONRPCErrorResponseIfNecessary(request.id, error));
        };
        try {
            return (this.middleware || noopMiddleware)(callMethod, request, serverParams).then(undefined, onError);
        }
        catch (error) {
            return onError(error);
        }
    };
    JSONRPCServer.prototype.mapErrorToJSONRPCErrorResponseIfNecessary = function (id, error) {
        if (id !== undefined) {
            return this.mapErrorToJSONRPCErrorResponse(id, error);
        }
        else {
            return null;
        }
    };
    return JSONRPCServer;
}());
exports.JSONRPCServer = JSONRPCServer;
var isNonNull = function (value) { return value !== null; };
var noopMiddleware = function (next, request, serverParams) { return next(request, serverParams); };
var mapResultToJSONRPCResponse = function (id, result) {
    if (id !== undefined) {
        return {
            jsonrpc: models_1.JSONRPC,
            id: id,
            result: result === undefined ? null : result,
        };
    }
    else {
        return null;
    }
};
var defaultMapErrorToJSONRPCErrorResponse = function (id, error) {
    return (0, models_1.createJSONRPCErrorResponse)(id, internal_1.DefaultErrorCode, (error && error.message) || "An unexpected error occurred");
};
var mapResponse = function (request, response) {
    if (response) {
        return response;
    }
    else if (request.id !== undefined) {
        return (0, models_1.createJSONRPCErrorResponse)(request.id, models_1.JSONRPCErrorCode.InternalError, "Internal error");
    }
    else {
        return null;
    }
};


/***/ }),
/* 7 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.JSONRPCServerAndClient = void 0;
var models_1 = __webpack_require__(4);
var JSONRPCServerAndClient = /** @class */ (function () {
    function JSONRPCServerAndClient(server, client, options) {
        if (options === void 0) { options = {}; }
        var _a;
        this.server = server;
        this.client = client;
        this.errorListener = (_a = options.errorListener) !== null && _a !== void 0 ? _a : console.warn;
    }
    JSONRPCServerAndClient.prototype.applyServerMiddleware = function () {
        var _a;
        var middlewares = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            middlewares[_i] = arguments[_i];
        }
        (_a = this.server).applyMiddleware.apply(_a, middlewares);
    };
    JSONRPCServerAndClient.prototype.addMethod = function (name, method) {
        this.server.addMethod(name, method);
    };
    JSONRPCServerAndClient.prototype.addMethodAdvanced = function (name, method) {
        this.server.addMethodAdvanced(name, method);
    };
    JSONRPCServerAndClient.prototype.timeout = function (delay) {
        return this.client.timeout(delay);
    };
    JSONRPCServerAndClient.prototype.request = function (method, params, clientParams) {
        return this.client.request(method, params, clientParams);
    };
    JSONRPCServerAndClient.prototype.requestAdvanced = function (jsonRPCRequest, clientParams) {
        return this.client.requestAdvanced(jsonRPCRequest, clientParams);
    };
    JSONRPCServerAndClient.prototype.notify = function (method, params, clientParams) {
        this.client.notify(method, params, clientParams);
    };
    JSONRPCServerAndClient.prototype.rejectAllPendingRequests = function (message) {
        this.client.rejectAllPendingRequests(message);
    };
    JSONRPCServerAndClient.prototype.receiveAndSend = function (payload, serverParams, clientParams) {
        return __awaiter(this, void 0, void 0, function () {
            var response, message;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!((0, models_1.isJSONRPCResponse)(payload) || (0, models_1.isJSONRPCResponses)(payload))) return [3 /*break*/, 1];
                        this.client.receive(payload);
                        return [3 /*break*/, 4];
                    case 1:
                        if (!((0, models_1.isJSONRPCRequest)(payload) || (0, models_1.isJSONRPCRequests)(payload))) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.server.receive(payload, serverParams)];
                    case 2:
                        response = _a.sent();
                        if (response) {
                            return [2 /*return*/, this.client.send(response, clientParams)];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        message = "Received an invalid JSON-RPC message";
                        this.errorListener(message, payload);
                        return [2 /*return*/, Promise.reject(new Error(message))];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return JSONRPCServerAndClient;
}());
exports.JSONRPCServerAndClient = JSONRPCServerAndClient;


/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/**
 * @typedef {object} XHRDetail
 * @property {string} url
 * @property {string} [method]
 * @property {string} [user]
 * @property {string} [password]
 * @property {string} [overrideMimeType]
 * @property {{[k:string]:string}} [headers]
 * @property {string} [responseType]
 * @property {number} [timeout]
 * @property {string|FormData|Blob} [data]
 * @property {boolean} [binary]
 * @property {any} [context]
 * @property {boolean} [anonymous]
 * @property {XHRCallback} [onabort]
 * @property {XHRCallback} [onerror]
 * @property {XHRCallback} [onload]
 * @property {XHRCallback} [onloadend]
 * @property {XHRCallback} [onloadstart]
 * @property {XHRCallback} [onprogress]
 * @property {XHRCallback} [onreadystatechange]
 * @property {XHRCallback} [ontimeout]
 */

/**
 * @callback XHRCallback
 * @param {XHRResponse} resp
 * @returns {void}
 */

/**
 * @typedef {object} XHRResponse
 * @property {number} status
 * @property {string} statusText
 * @property {number} readyState
 * @property {string} responseHeaders
 * @property {string|Blob|ArrayBuffer|Document|object|null} response
 * @property {string|undefined} responseText
 * @property {string} finalUrl
 * @property {any} context
 */

/**
 * @typedef {object} XHRControl
 * @property {() => void} abort
 */

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  /**
   * @param {string} key
   * @returns {any}
   */
  getValue(key) {
    return GM_getValue(key);
  },

  /**
   * @param {string} key
   * @param {any} val
   * @returns {void}
   */
  setValue(key, val) {
    return GM_setValue(key, val);
  },

  /**
   * @param {XHRDetail} details
   * @returns {Promise<XHRControl>}
   */
  async xhr(details) {
    return await GM.xmlHttpRequest(details);
  },
});


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Map2": () => (/* binding */ Map2),
/* harmony export */   "devLog": () => (/* binding */ devLog),
/* harmony export */   "newURL": () => (/* binding */ newURL),
/* harmony export */   "openWin": () => (/* binding */ openWin),
/* harmony export */   "percent": () => (/* binding */ percent)
/* harmony export */ });
/* harmony import */ var _style_mod_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _style_mod_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_mod_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _recks__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);


function devLog(msg, ...params) {
    if (true) {
        console.log(msg, ...params);
    }
}
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
function openWin(title, opt) {
    opt = opt !== null && opt !== void 0 ? opt : {};
    const win = window.open(undefined, undefined, Object.entries({
        location: "no",
        height: opt.height,
        width: opt.width,
        left: opt.left,
        top: opt.top,
        resizable: "yes",
        menubar: "no",
        scrollbars: "yes",
        status: "no",
        titlebar: "no",
        toolbar: "no",
    })
        .map(([k, v]) => `${k}=${v}`)
        .join(","));
    window.addEventListener("unload", () => win.close());
    win.document.head.append(_recks__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(_recks__WEBPACK_IMPORTED_MODULE_1__["default"].Fragment, null,
        _recks__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("title", null, title),
        _recks__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("style", null, _style_mod_css__WEBPACK_IMPORTED_MODULE_0___default().toString())));
    return win;
}
function newURL(url, params) {
    const url2 = new URL(url, self.location.origin);
    for (const [k, v] of Object.entries(params !== null && params !== void 0 ? params : {})) {
        url2.searchParams.set(k, v);
    }
    return url2;
}


/***/ }),
/* 10 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// Imports
var ___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___ = __webpack_require__(11);
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(12);
var ___CSS_LOADER_EXPORT___ = ___CSS_LOADER_API_IMPORT___(___CSS_LOADER_API_NO_SOURCEMAP_IMPORT___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".K7vQwtugDxkOfU77fg4J {\n  font-size: 0.75rem;\n  opacity: 0.5;\n}\n\n.C2I4DvlMSfimZfl_xPn0 p {\n  margin: 0;\n}\n\n.C2I4DvlMSfimZfl_xPn0 ul {\n  margin: 0;\n  padding-left: 1.5rem;\n}\n\n.C2I4DvlMSfimZfl_xPn0 img {\n  height: auto;\n  width: 80%;\n}\n\n.C2I4DvlMSfimZfl_xPn0 .Njk3jLX2FgrdznVCqYh5 {\n  font-weight: bold;\n}\n\n.C2I4DvlMSfimZfl_xPn0 .yZIu6SlfivGi6blasrPS {\n  border-style: groove;\n  border-width: thin;\n  margin: 0.2rem;\n  padding: 0.2rem;\n  min-height: fit-content;\n  min-width: fit-content;\n}\n\n.mcfTbD5P0GwQwMJOmYD5 {\n  cursor: pointer;\n}\n\n.ogPrX91zgEreh2bN9mhh {\n  display: flex;\n  flex-direction: column;\n}\n\n.ogPrX91zgEreh2bN9mhh .jVC6DpTyv93BozsU0r_Q {\n  display: flex;\n  flex-direction: row;\n  margin-bottom: 0.5rem;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.ogPrX91zgEreh2bN9mhh .jVC6DpTyv93BozsU0r_Q label {\n  font-weight: bold;\n}\n\n.ogPrX91zgEreh2bN9mhh .jVC6DpTyv93BozsU0r_Q input {\n  height: fit-content;\n  text-align: right;\n}\n\n.ogPrX91zgEreh2bN9mhh .TGZ9H1pYsrQDZ5TLZZXX {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n}\n\n.ogPrX91zgEreh2bN9mhh .TGZ9H1pYsrQDZ5TLZZXX input {\n  cursor: pointer;\n}\n\n.ogPrX91zgEreh2bN9mhh .UeVqvz4xIIdNv68ajZbg {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n  font-style: italic;\n}\n\n.Gu11L3zStV2T8FRx34Gu {\n  display: flex;\n  flex-direction: column;\n}\n\n.Gu11L3zStV2T8FRx34Gu img {\n  width: 100%;\n  height: auto;\n}\n\n.Gu11L3zStV2T8FRx34Gu .tw3KNVkLhuhtS7HuVpZm {\n  cursor: pointer;\n  margin-bottom: 0.5rem;\n}\n\n.Gu11L3zStV2T8FRx34Gu .pvyAMUVLQ5TZqHUQGRaz {\n  border-style: groove;\n  border-width: thin;\n  padding: 0.5rem;\n}\n\n.qN5pz3Z5naDIp60s9Di8 strong {\n  font-weight: bold;\n}\n\n.qN5pz3Z5naDIp60s9Di8 p {\n  margin-bottom: 0.25rem;\n}\n\n.qN5pz3Z5naDIp60s9Di8 ul {\n  padding-left: 1.5rem;\n  margin-bottom: 0.25rem;\n}\n\n.qN5pz3Z5naDIp60s9Di8 ul li {\n  margin-bottom: 0.25rem;\n}\n", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"mainBody": "K7vQwtugDxkOfU77fg4J",
	"answerDetail": "C2I4DvlMSfimZfl_xPn0",
	"title": "Njk3jLX2FgrdznVCqYh5",
	"shorAnswer": "yZIu6SlfivGi6blasrPS",
	"clickable": "mcfTbD5P0GwQwMJOmYD5",
	"settings": "ogPrX91zgEreh2bN9mhh",
	"settingsEntry": "jVC6DpTyv93BozsU0r_Q",
	"settingsSubmit": "TGZ9H1pYsrQDZ5TLZZXX",
	"submitTip": "UeVqvz4xIIdNv68ajZbg",
	"uploadImg": "Gu11L3zStV2T8FRx34Gu",
	"confirmUpload": "tw3KNVkLhuhtS7HuVpZm",
	"imageContainer": "pvyAMUVLQ5TZqHUQGRaz",
	"about": "qN5pz3Z5naDIp60s9Di8"
};
module.exports = ___CSS_LOADER_EXPORT___;


/***/ }),
/* 11 */
/***/ ((module) => {

"use strict";


module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 12 */
/***/ ((module) => {

"use strict";


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
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function addChildren(parent, children) {
    for (const child of children) {
        if (child instanceof Node) {
            parent.appendChild(child);
        }
        else {
            parent.appendChild(document.createTextNode(String(child)));
        }
    }
}
function setCSSProps(ele, style) {
    for (const [name, value] of Object.entries(style)) {
        if (name.startsWith("-")) {
            ele.style.setProperty(name, value);
        }
        else {
            ele.style[name] = value;
        }
    }
}
function flattenChildren(children) {
    let flatten = [];
    for (const ele of children) {
        if (Array.isArray(ele)) {
            flatten = flatten.concat(ele);
        }
        else {
            flatten.push(ele);
        }
    }
    return flatten;
}
const Recks = {
    createElement(t, props, ...children) {
        let flatten = flattenChildren(children);
        if (typeof t === "function") {
            return t(Object.assign(Object.assign({}, props), { children: flatten }));
        }
        else {
            const ele = document.createElement(t);
            addChildren(ele, flatten);
            for (const [name, value] of Object.entries(props !== null && props !== void 0 ? props : {})) {
                if (value === undefined) {
                    continue;
                }
                switch (name) {
                    case "classList":
                        ele.classList.add(...value);
                        break;
                    case "style":
                        setCSSProps(ele, value);
                        break;
                    case "dangerouslySetInnerHTML":
                        ele.innerHTML = value.__html;
                        break;
                    default:
                        if (name.startsWith("on-")) {
                            ele.addEventListener(name.slice(3), value);
                        }
                        else if (name in ele) {
                            ele[name] = value;
                        }
                }
            }
            return ele;
        }
    },
    Fragment(props) {
        let frag = document.createDocumentFragment();
        if (Array.isArray(props.children)) {
            addChildren(frag, props.children);
        }
        return frag;
    },
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Recks);


/***/ }),
/* 14 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EXAM_ID": () => (/* binding */ EXAM_ID),
/* harmony export */   "NO_LEAVE_CHECK": () => (/* binding */ NO_LEAVE_CHECK),
/* harmony export */   "SERVER": () => (/* binding */ SERVER),
/* harmony export */   "SORT_PROBLEMS": () => (/* binding */ SORT_PROBLEMS),
/* harmony export */   "SYNC_ANSWERS": () => (/* binding */ SYNC_ANSWERS),
/* harmony export */   "TOKEN": () => (/* binding */ TOKEN),
/* harmony export */   "USERNAME": () => (/* binding */ USERNAME)
/* harmony export */ });
/* harmony import */ var _gm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);

class Optional {
    constructor(init) {
        this._value = null;
        this._value = init !== null && init !== void 0 ? init : null;
    }
    get value() {
        return this._value;
    }
    set value(newVal) {
        this._value = newVal;
    }
}
class GMEntry extends Optional {
    constructor(name, init) {
        super();
        this.name = name;
        let val = _gm__WEBPACK_IMPORTED_MODULE_0__["default"].getValue(name);
        if (val === undefined) {
            val = init;
        }
        this.value = val !== null && val !== void 0 ? val : null;
    }
    get value() {
        return super.value;
    }
    set value(newVal) {
        _gm__WEBPACK_IMPORTED_MODULE_0__["default"].setValue(this.name, newVal);
        super.value = newVal;
    }
}
const USERNAME = new GMEntry("username");
const SERVER = new GMEntry("server");
const SYNC_ANSWERS = new GMEntry("sync_answers", true);
const SORT_PROBLEMS = new GMEntry("sort_problems", true);
const NO_LEAVE_CHECK = new GMEntry("no_leave_check", true);
const TOKEN = new Optional();
const EXAM_ID = new Optional();


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hookXHR": () => (/* binding */ hookXHR)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);

function hookXHR(cb) {
    const open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (_method, url) {
        const onSend = cb.call(this, (0,_utils__WEBPACK_IMPORTED_MODULE_0__.newURL)(url));
        // Modify post data.
        const send = this.send;
        this.send = function (data) {
            if (onSend !== undefined) {
                onSend(data)
                    .then((data) => {
                    send.call(this, data);
                    this.send = send;
                })
                    .catch(_utils__WEBPACK_IMPORTED_MODULE_0__.devLog);
            }
            else {
                send.call(this, data);
                this.send = send;
            }
        };
        open.apply(this, arguments);
    };
}


/***/ }),
/* 16 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
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
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UI": () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _style_mod_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _style_mod_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_mod_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _recks__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _settings__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19);




class UI {
    constructor(paper) {
        // Header.
        document.head.append(_recks__WEBPACK_IMPORTED_MODULE_2__["default"].createElement("style", null, _style_mod_css__WEBPACK_IMPORTED_MODULE_0___default().toString()));
        const header = document.body.querySelector(".header-title");
        header.classList.add(_style_mod_css__WEBPACK_IMPORTED_MODULE_0__.locals.clickable);
        header.addEventListener("click", () => {
            (0,_settings__WEBPACK_IMPORTED_MODULE_3__.showSettings)();
        });
        let problems = [];
        if (paper.data.has_problem_dict === true) {
            paper.data.problems.forEach((dict) => {
                problems = problems.concat(dict.problems);
            });
        }
        else {
            problems = paper.data.problems;
        }
        // Problem cards.
        const cards = new Map();
        document.body
            .querySelectorAll(".exam-main--body .subject-item")
            .forEach((subjectItem, idx) => {
            const prob = problems[idx];
            cards.set(prob.problem_id, new _card__WEBPACK_IMPORTED_MODULE_1__.ProblemCard(prob, subjectItem));
        });
        this.problems = cards;
    }
    updateAnswer({ username, problem_id, result }) {
        var _a;
        (_a = this.problems.get(problem_id)) === null || _a === void 0 ? void 0 : _a.updateResult(username, result);
    }
    updateUI() {
        this.problems.forEach((card) => card.updateUI());
    }
}


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProblemCard": () => (/* binding */ ProblemCard)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _style_mod_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _style_mod_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_mod_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _recks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);




class Tooltip {
    constructor(ele) {
        if (ele instanceof HTMLElement) {
            this.ele = ele;
        }
        else {
            throw new Error("not a html element");
        }
    }
    get content() {
        return this.ele.title;
    }
    set content(val) {
        this.ele.title = val;
    }
}
function percent(n) {
    return `${Math.floor(n * 100)}%`;
}
class ProblemCard {
    constructor(problem, subjectItem) {
        /**
         * Username => Result
         */
        this.results = new Map();
        const type = problem.ProblemType;
        const options = new Map();
        const itemType = subjectItem.querySelector(".item-type");
        itemType.classList.add(_style_mod_css__WEBPACK_IMPORTED_MODULE_2__.locals.clickable);
        itemType.addEventListener("click", () => this.showAll(itemType.getBoundingClientRect()));
        // Init UI.
        switch (type) {
            case _types__WEBPACK_IMPORTED_MODULE_0__.ProblemType.SingleChoice:
            case _types__WEBPACK_IMPORTED_MODULE_0__.ProblemType.MultipleChoice:
            case _types__WEBPACK_IMPORTED_MODULE_0__.ProblemType.Polling:
            case _types__WEBPACK_IMPORTED_MODULE_0__.ProblemType.Judgement:
                subjectItem
                    .querySelectorAll(".item-body .checkboxInput, .item-body .radioInput")
                    .forEach((ele, idx) => {
                    options.set(problem.Options[idx].key, new Tooltip(ele));
                });
                break;
            case _types__WEBPACK_IMPORTED_MODULE_0__.ProblemType.FillBlank:
                subjectItem
                    .querySelectorAll(".item-body .blank-item-dynamic")
                    .forEach((ele, idx) => {
                    options.set(`${idx + 1}`, new Tooltip(ele));
                });
                break;
        }
        this.type = type;
        this.options = options;
    }
    showAll({ left, top }) {
        const win = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.openWin)("详细答案", {
            height: 150,
            width: 200,
            left: left,
            top: top,
        });
        const mainBody = _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("div", { classList: [_style_mod_css__WEBPACK_IMPORTED_MODULE_2__.locals.mainBody, _style_mod_css__WEBPACK_IMPORTED_MODULE_2__.locals.answerDetail] });
        win.document.body.append(mainBody);
        function Text(props) {
            return (_recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("p", { className: props.title === true ? _style_mod_css__WEBPACK_IMPORTED_MODULE_2__.locals.title : "" }, props.children));
        }
        function UList(props) {
            return (_recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("ul", null, Array.isArray(props.children)
                ? props.children.map((ele) => _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("li", null, ele))
                : props.children));
        }
        switch (this.type) {
            case _types__WEBPACK_IMPORTED_MODULE_0__.ProblemType.SingleChoice:
            case _types__WEBPACK_IMPORTED_MODULE_0__.ProblemType.MultipleChoice:
            case _types__WEBPACK_IMPORTED_MODULE_0__.ProblemType.Polling:
            case _types__WEBPACK_IMPORTED_MODULE_0__.ProblemType.Judgement:
                // Choice
                //   - User1
                //   - User2
                const choiceToUsers = new _utils__WEBPACK_IMPORTED_MODULE_1__.Map2(() => []);
                this.results.forEach((res, username) => {
                    res.forEach((choice) => {
                        if (this.type === _types__WEBPACK_IMPORTED_MODULE_0__.ProblemType.Judgement) {
                            choice = choice === "true" ? "正确" : "错误";
                        }
                        choiceToUsers.setWith(choice, (users) => {
                            users.push(username);
                            return users;
                        });
                    });
                });
                [...choiceToUsers.entries()]
                    .sort(([a], [b]) => (a < b ? -1 : 1))
                    .forEach(([choice, users]) => {
                    mainBody.append(_recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("div", null,
                        _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement(Text, { title: true }, choice),
                        _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement(UList, null, users.sort().map((user) => (_recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement(Text, null, user))))));
                });
                break;
            case _types__WEBPACK_IMPORTED_MODULE_0__.ProblemType.FillBlank:
                // #Blank
                //   - result1
                //     - user1
                //     - user2
                const blankToResToUsers = new _utils__WEBPACK_IMPORTED_MODULE_1__.Map2(() => new _utils__WEBPACK_IMPORTED_MODULE_1__.Map2(() => []));
                this.results.forEach((res, username) => {
                    Object.entries(res).forEach(([key, ans]) => {
                        blankToResToUsers.setWith(key, (val) => {
                            val.setWith(ans, (users) => {
                                users.push(username);
                                return users;
                            });
                            return val;
                        });
                    });
                });
                [...blankToResToUsers.entries()]
                    .sort(([a], [b]) => (a < b ? -1 : 1))
                    .forEach(([blank, resToUsers]) => {
                    mainBody.append(_recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("div", null,
                        _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement(Text, { title: true }, `#${blank}`),
                        _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement(UList, null, [...resToUsers]
                            .sort(([a], [b]) => (a < b ? -1 : 1))
                            .map(([res, users]) => (_recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement(_recks__WEBPACK_IMPORTED_MODULE_3__["default"].Fragment, null,
                            _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement(Text, null, res),
                            _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement(UList, null, users.sort().map((user) => (_recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement(Text, null, user))))))))));
                });
                break;
            case _types__WEBPACK_IMPORTED_MODULE_0__.ProblemType.ShortAnswer:
                // - User1
                //   <content>
                //   - File1
                //   - File2
                mainBody.append(_recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement(UList, null, [...this.results.entries()]
                    .sort(([a], [b]) => (a < b ? -1 : 1))
                    .map(([username, res]) => {
                    var _a, _b;
                    return (_recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement(_recks__WEBPACK_IMPORTED_MODULE_3__["default"].Fragment, null,
                        _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement(Text, { title: true }, username),
                        _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("div", null,
                            _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("div", { className: _style_mod_css__WEBPACK_IMPORTED_MODULE_2__.locals.shorAnswer, dangerouslySetInnerHTML: { __html: res.content } }),
                            _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement(UList, null, ((_b = (_a = res.attachments) === null || _a === void 0 ? void 0 : _a.filelist) !== null && _b !== void 0 ? _b : []).map((atta) => (_recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("a", { href: atta.fileUrl }, atta.fileName)))))));
                })));
                break;
        }
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
                const optCounter = new _utils__WEBPACK_IMPORTED_MODULE_1__.Map2(() => 0);
                this.results.forEach((res) => {
                    res.forEach((key) => {
                        optCounter.setWith(key, (n) => n + 1);
                    });
                });
                optCounter.forEach((num, key) => {
                    this.options.get(key).content = `${percent(num / this.results.size)}`;
                });
                break;
            // Tooltip show the most popular answers.
            case _types__WEBPACK_IMPORTED_MODULE_0__.ProblemType.FillBlank:
                const ansCounter = new _utils__WEBPACK_IMPORTED_MODULE_1__.Map2(() => new _utils__WEBPACK_IMPORTED_MODULE_1__.Map2(() => 0));
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
                    this.options.get(key).content = `(${percent(num / this.results.size)}) ${text}`;
                });
                break;
        }
    }
}


/***/ }),
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "showSettings": () => (/* binding */ showSettings)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(14);
/* harmony import */ var _style_mod_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _style_mod_css__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_mod_css__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _recks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);




function showSettings() {
    var _a, _b;
    const win = (0,_utils__WEBPACK_IMPORTED_MODULE_0__.openWin)("设置", { height: 300, width: 400 });
    function SettingsEntry(props) {
        var _a;
        return (_recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("div", { classList: [_style_mod_css__WEBPACK_IMPORTED_MODULE_2__.locals.settingsEntry] },
            _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("label", { htmlFor: props.name }, props.title),
            _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("input", { name: props.name, title: props.title, size: props.size, type: (_a = props.type) !== null && _a !== void 0 ? _a : "text", required: props.required === true, pattern: props.pattern, value: props.value, checked: props.checked })));
    }
    win.document.body.append(_recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("div", { classList: [_style_mod_css__WEBPACK_IMPORTED_MODULE_2__.locals.mainBody, _style_mod_css__WEBPACK_IMPORTED_MODULE_2__.locals.settings] },
        _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("form", { onsubmit: () => false, "on-submit": function () {
                const form = new FormData(this);
                _config__WEBPACK_IMPORTED_MODULE_1__.USERNAME.value = form.get("username");
                _config__WEBPACK_IMPORTED_MODULE_1__.SERVER.value = form.get("server");
                _config__WEBPACK_IMPORTED_MODULE_1__.NO_LEAVE_CHECK.value = form.get("no_leave_check") === "on";
                _config__WEBPACK_IMPORTED_MODULE_1__.SORT_PROBLEMS.value = form.get("sort_problems") === "on";
                _config__WEBPACK_IMPORTED_MODULE_1__.SYNC_ANSWERS.value = form.get("sync_answers") === "on";
                win.close();
            } },
            _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement(SettingsEntry, { name: "username", title: "\u7528\u6237\u540D", pattern: "[_a-z][_a-z0-9]*", size: 10, value: (_a = _config__WEBPACK_IMPORTED_MODULE_1__.USERNAME.value) !== null && _a !== void 0 ? _a : undefined }),
            _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement(SettingsEntry, { name: "server", title: "\u670D\u52A1\u5668\u5730\u5740", pattern: "https?://.+", size: 20, value: (_b = _config__WEBPACK_IMPORTED_MODULE_1__.SERVER.value) !== null && _b !== void 0 ? _b : undefined }),
            _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement(SettingsEntry, { name: "sync_answers", title: "\u540C\u6B65\u7B54\u6848", checked: _config__WEBPACK_IMPORTED_MODULE_1__.SYNC_ANSWERS.value === true, type: "checkbox" }),
            _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement(SettingsEntry, { name: "sort_problems", title: "\u6392\u5E8F\u9898\u76EE", checked: _config__WEBPACK_IMPORTED_MODULE_1__.SORT_PROBLEMS.value === true, type: "checkbox" }),
            _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement(SettingsEntry, { name: "no_leave_check", title: "\u62E6\u622A\u5207\u5C4F\u68C0\u6D4B", checked: _config__WEBPACK_IMPORTED_MODULE_1__.NO_LEAVE_CHECK.value === true, type: "checkbox" }),
            _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("div", { classList: [_style_mod_css__WEBPACK_IMPORTED_MODULE_2__.locals.submitTip] },
                _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("p", null, "*更改设置后请刷新页面")),
            _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("div", { classList: [_style_mod_css__WEBPACK_IMPORTED_MODULE_2__.locals.settingsSubmit] },
                _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("input", { type: "submit", value: "\u63D0\u4EA4", size: 10 }))),
        _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("div", { classList: [_style_mod_css__WEBPACK_IMPORTED_MODULE_2__.locals.about] },
            _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("p", null,
                _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("strong", null, "功能特性：")),
            _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("ul", null,
                _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("li", null,
                    _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("strong", null, "同步答案："),
                    "点击题目显示详细答案，在选项/填空处悬停鼠标显示简略答案"),
                _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("li", null,
                    _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("strong", null, "排序题目："),
                    "根据 ID 对题目进行重新排序，每题的选项一定会被排序以保证每个人看到相同的答案"),
                _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("li", null,
                    _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("strong", null, "拦截切屏检测："),
                    "随意切换页面、窗口不会被发现"),
                _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("li", null,
                    _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("strong", null, "拦截上传截图："),
                    "仅当用户确认时，才会上传截图"),
                _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("li", null,
                    _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("strong", null, "拦截异常状态："),
                    "即使页面显示异常状态也不会被提交到服务器")))));
}


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
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _xhr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);
/* harmony import */ var _recks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(13);
/* harmony import */ var _style_mod_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(10);
/* harmony import */ var _style_mod_css__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_style_mod_css__WEBPACK_IMPORTED_MODULE_7__);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};








function sortProblems(problems) {
    if (_config__WEBPACK_IMPORTED_MODULE_5__.SORT_PROBLEMS.value === true) {
        problems = problems.sort((a, b) => a.problem_id - b.problem_id);
    }
    problems.forEach((problem) => {
        // Options must be sorted to ensure the answers users saw are the same.
        if ((0,_types__WEBPACK_IMPORTED_MODULE_2__.isChoice)(problem.ProblemType)) {
            problem.Options.sort((a, b) => {
                return a.key < b.key ? -1 : 1;
            });
        }
    });
    return problems;
}
function sortPaper(paper) {
    if (paper.data.has_problem_dict === true) {
        paper.data.problems = paper.data.problems
            .sort((a, b) => a.id - b.id)
            .map((d) => {
            d.problems = sortProblems(d.problems);
            return d;
        });
    }
    else {
        paper.data.problems = sortProblems(paper.data.problems);
    }
    return paper;
}
function removeVisibilityListener() {
    document.addEventListener("visibilitychange", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
    }, true);
    window.addEventListener("visibilitychange", (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
    }, true);
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        if (_config__WEBPACK_IMPORTED_MODULE_5__.NO_LEAVE_CHECK.value === true) {
            removeVisibilityListener();
        }
        const client = new _client__WEBPACK_IMPORTED_MODULE_0__.Client();
        (0,_xhr__WEBPACK_IMPORTED_MODULE_1__.hookXHR)(function (url) {
            switch (url.pathname) {
                case "/exam_room/show_paper":
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
                        const paper = JSON.parse(this.responseText);
                        (0,_utils__WEBPACK_IMPORTED_MODULE_4__.devLog)("intercept paper", paper);
                        // Login to server.
                        const ui = new _ui__WEBPACK_IMPORTED_MODULE_3__.UI(paper);
                        // Receive answers and update UI.
                        client.onmessage((msg) => {
                            msg.forEach((res) => ui.updateAnswer(res));
                            ui.updateUI();
                        });
                        (() => __awaiter(this, void 0, void 0, function* () {
                            // Fetch cached results.
                            _config__WEBPACK_IMPORTED_MODULE_5__.EXAM_ID.value = parseInt(url.searchParams.get("exam_id"));
                            const cacheResults = yield fetch((0,_utils__WEBPACK_IMPORTED_MODULE_4__.newURL)("/exam_room/cache_results", {
                                exam_id: _config__WEBPACK_IMPORTED_MODULE_5__.EXAM_ID.value.toString(),
                            }).toString()).then((res) => res.json());
                            client.answerProblem(cacheResults.data.results);
                        }))().catch(_utils__WEBPACK_IMPORTED_MODULE_4__.devLog);
                    });
                    break;
                case "/exam_room/answer_problem":
                    return (body) => __awaiter(this, void 0, void 0, function* () {
                        var _a;
                        // Upload answers.
                        if (typeof body === "string") {
                            const data = JSON.parse(body);
                            // Dont report abnormal behavior.
                            if ("action" in data) {
                                switch (data.action) {
                                    // 上传截图
                                    case 1:
                                    // 上传桌面截屏
                                    case 17:
                                        break;
                                    default:
                                        console.log("intercept action", data);
                                        return new Promise(() => undefined);
                                }
                            }
                            else if ("results" in data) {
                                (0,_utils__WEBPACK_IMPORTED_MODULE_4__.devLog)("intercept answers", data);
                                client.answerProblem((_a = data.results) !== null && _a !== void 0 ? _a : []).catch(_utils__WEBPACK_IMPORTED_MODULE_4__.devLog);
                            }
                        }
                        return body;
                    });
                default:
                    if (url.hostname === "upload-z1.qiniup.com") {
                        // Prevent upload screenshot.
                        return (body) => __awaiter(this, void 0, void 0, function* () {
                            if (body instanceof FormData && body.get("file") instanceof File) {
                                return new Promise((ok) => {
                                    const f = new FileReader();
                                    f.onload = () => {
                                        const win = (0,_utils__WEBPACK_IMPORTED_MODULE_4__.openWin)("上传图片", {
                                            width: 300,
                                            height: 200,
                                        });
                                        win.document.body.append(_recks__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("div", { classList: [_style_mod_css__WEBPACK_IMPORTED_MODULE_7__.locals.uploadImg, _style_mod_css__WEBPACK_IMPORTED_MODULE_7__.locals.mainBody] },
                                            _recks__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("div", null,
                                                _recks__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("button", { "on-click": () => {
                                                        ok(body);
                                                        win.close();
                                                    }, classList: [_style_mod_css__WEBPACK_IMPORTED_MODULE_7__.locals.confirmUpload], type: "button" }, "确认上传")),
                                            _recks__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("div", { classList: [_style_mod_css__WEBPACK_IMPORTED_MODULE_7__.locals.imageContainer] },
                                                _recks__WEBPACK_IMPORTED_MODULE_6__["default"].createElement("img", { src: f.result }))));
                                    };
                                    f.readAsDataURL(body.get("file"));
                                });
                            }
                            return body;
                        });
                    }
            }
        });
        yield client.watch( true ? 1 : 0);
    });
}
if (true) {
    console.warn("IN DEV_MODE");
}
main().catch(console.error);

})();

/******/ })()
;