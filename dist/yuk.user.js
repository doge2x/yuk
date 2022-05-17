// ==UserScript==
// @name         yuk-client
// @version      0.3.3
// @author       doge2x
// @icon         https://www.yuketang.cn/static/images/favicon.ico
// @match        https://examination.xuetangx.com/*
// @grant        GM.xmlHttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
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
/* harmony import */ var json_rpc_2_0__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var json_rpc_2_0__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(json_rpc_2_0__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
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
            const server = _config__WEBPACK_IMPORTED_MODULE_2__.SERVER.value;
            if (server !== undefined) {
                yield new Promise((ok, err) => __awaiter(this, void 0, void 0, function* () {
                    GM.xmlHttpRequest({
                        url: server,
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
                _config__WEBPACK_IMPORTED_MODULE_2__.USERNAME.value === undefined ||
                _config__WEBPACK_IMPORTED_MODULE_2__.SERVER.value === undefined ||
                _config__WEBPACK_IMPORTED_MODULE_2__.EXAM_ID.value === undefined ||
                _config__WEBPACK_IMPORTED_MODULE_2__.SYNC_ANSWERS.value === false) {
                return;
            }
            let answers = [...this.queue.values()];
            this.queue.clear();
            if (_config__WEBPACK_IMPORTED_MODULE_2__.TOKEN.value === undefined) {
                (0,_utils__WEBPACK_IMPORTED_MODULE_1__.devLog)(`login to server: ${_config__WEBPACK_IMPORTED_MODULE_2__.USERNAME.value}, ${_config__WEBPACK_IMPORTED_MODULE_2__.EXAM_ID.value}`);
                const token = yield this.client.request("login", [
                    _config__WEBPACK_IMPORTED_MODULE_2__.USERNAME.value,
                    _config__WEBPACK_IMPORTED_MODULE_2__.EXAM_ID.value,
                ]);
                (0,_utils__WEBPACK_IMPORTED_MODULE_1__.devLog)("got token", token);
                _config__WEBPACK_IMPORTED_MODULE_2__.TOKEN.value = token;
            }
            this.postAnswers(_config__WEBPACK_IMPORTED_MODULE_2__.TOKEN.value, answers);
        });
    }
    postAnswers(token, answers) {
        return __awaiter(this, void 0, void 0, function* () {
            (0,_utils__WEBPACK_IMPORTED_MODULE_1__.devLog)("send answers", answers);
            const rcev = yield this.client.request("answer_problem", [token, answers]);
            (0,_utils__WEBPACK_IMPORTED_MODULE_1__.devLog)("receive answers", rcev);
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


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.DefaultErrorCode = void 0;
exports.DefaultErrorCode = 0;


/***/ }),
/* 6 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "devLog": () => (/* binding */ devLog),
/* harmony export */   "newURL": () => (/* binding */ newURL)
/* harmony export */ });
function devLog(msg, ...params) {
    if (false) {}
}
function newURL(url, params) {
    const url2 = new URL(url, self.location.origin);
    for (const [k, v] of Object.entries(params !== null && params !== void 0 ? params : {})) {
        url2.searchParams.set(k, v);
    }
    return url2;
}


/***/ }),
/* 9 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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
/* harmony import */ var _Config_bs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);

class ReValue {
    constructor(value) {
        this._value = value;
    }
    get value() {
        return this._value.get();
    }
    set value(newVal) {
        this._value.set(newVal);
    }
}
const USERNAME = new ReValue(_Config_bs__WEBPACK_IMPORTED_MODULE_0__.Username);
const SERVER = new ReValue(_Config_bs__WEBPACK_IMPORTED_MODULE_0__.Server);
const SYNC_ANSWERS = new ReValue(_Config_bs__WEBPACK_IMPORTED_MODULE_0__.SyncAnswers);
const SORT_PROBLEMS = new ReValue(_Config_bs__WEBPACK_IMPORTED_MODULE_0__.SortProblems);
const NO_LEAVE_CHECK = new ReValue(_Config_bs__WEBPACK_IMPORTED_MODULE_0__.NoLeaveCheck);
const TOKEN = new ReValue(_Config_bs__WEBPACK_IMPORTED_MODULE_0__.Token);
const EXAM_ID = new ReValue(_Config_bs__WEBPACK_IMPORTED_MODULE_0__.ExamId);


/***/ }),
/* 10 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ExamId": () => (/* binding */ ExamId),
/* harmony export */   "GM": () => (/* binding */ GM),
/* harmony export */   "GMEntry": () => (/* binding */ GMEntry),
/* harmony export */   "NoLeaveCheck": () => (/* binding */ NoLeaveCheck),
/* harmony export */   "Option2": () => (/* binding */ Option2),
/* harmony export */   "Server": () => (/* binding */ Server),
/* harmony export */   "SortProblems": () => (/* binding */ SortProblems),
/* harmony export */   "SyncAnswers": () => (/* binding */ SyncAnswers),
/* harmony export */   "Token": () => (/* binding */ Token),
/* harmony export */   "Username": () => (/* binding */ Username)
/* harmony export */ });
/* harmony import */ var _gm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var rescript_lib_es6_lazy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var rescript_lib_es6_camlinternalLazy_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
// Generated by ReScript, PLEASE EDIT WITH CARE






function getValue(prim) {
  return rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_2__.nullable_to_opt(_gm__WEBPACK_IMPORTED_MODULE_0__.getValue(prim));
}

function setValue(prim0, prim1) {
  _gm__WEBPACK_IMPORTED_MODULE_0__.setValue(prim0, prim1);
  
}

var GM = {
  getValue: getValue,
  setValue: setValue
};

function Make(T) {
  var v = {
    contents: {
      LAZY_DONE: false,
      VAL: (function () {
          var cached = _gm__WEBPACK_IMPORTED_MODULE_0__.getValue(T.name);
          if (cached == null) {
            _gm__WEBPACK_IMPORTED_MODULE_0__.setValue(T.name, T.init);
            return T.init;
          } else {
            return rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_2__.some(cached);
          }
        })
    }
  };
  var get = function (param) {
    return rescript_lib_es6_camlinternalLazy_js__WEBPACK_IMPORTED_MODULE_3__.force(v.contents);
  };
  var set = function (newVal) {
    v.contents = rescript_lib_es6_lazy_js__WEBPACK_IMPORTED_MODULE_1__.from_val(newVal);
    _gm__WEBPACK_IMPORTED_MODULE_0__.setValue(T.name, newVal);
    
  };
  return {
          v: v,
          get: get,
          set: set
        };
}

var GMEntry = {
  Make: Make
};

function Make$1(T) {
  var v = {
    contents: undefined
  };
  var get = function (param) {
    return v.contents;
  };
  var set = function (newVal) {
    v.contents = newVal;
    
  };
  return {
          v: v,
          get: get,
          set: set
        };
}

var Option2 = {
  Make: Make$1
};

var name = "username";

var v = {
  contents: {
    LAZY_DONE: false,
    VAL: (function () {
        var cached = _gm__WEBPACK_IMPORTED_MODULE_0__.getValue(name);
        if (cached == null) {
          _gm__WEBPACK_IMPORTED_MODULE_0__.setValue(name, undefined);
          return ;
        } else {
          return rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_2__.some(cached);
        }
      })
  }
};

function get(param) {
  return rescript_lib_es6_camlinternalLazy_js__WEBPACK_IMPORTED_MODULE_3__.force(v.contents);
}

function set(newVal) {
  v.contents = rescript_lib_es6_lazy_js__WEBPACK_IMPORTED_MODULE_1__.from_val(newVal);
  _gm__WEBPACK_IMPORTED_MODULE_0__.setValue(name, newVal);
  
}

var Username = {
  v: v,
  get: get,
  set: set
};

var name$1 = "server";

var v$1 = {
  contents: {
    LAZY_DONE: false,
    VAL: (function () {
        var cached = _gm__WEBPACK_IMPORTED_MODULE_0__.getValue(name$1);
        if (cached == null) {
          _gm__WEBPACK_IMPORTED_MODULE_0__.setValue(name$1, undefined);
          return ;
        } else {
          return rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_2__.some(cached);
        }
      })
  }
};

function get$1(param) {
  return rescript_lib_es6_camlinternalLazy_js__WEBPACK_IMPORTED_MODULE_3__.force(v$1.contents);
}

function set$1(newVal) {
  v$1.contents = rescript_lib_es6_lazy_js__WEBPACK_IMPORTED_MODULE_1__.from_val(newVal);
  _gm__WEBPACK_IMPORTED_MODULE_0__.setValue(name$1, newVal);
  
}

var Server = {
  v: v$1,
  get: get$1,
  set: set$1
};

var name$2 = "sync_answers";

var init = true;

var v$2 = {
  contents: {
    LAZY_DONE: false,
    VAL: (function () {
        var cached = _gm__WEBPACK_IMPORTED_MODULE_0__.getValue(name$2);
        if (cached == null) {
          _gm__WEBPACK_IMPORTED_MODULE_0__.setValue(name$2, init);
          return init;
        } else {
          return rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_2__.some(cached);
        }
      })
  }
};

function get$2(param) {
  return rescript_lib_es6_camlinternalLazy_js__WEBPACK_IMPORTED_MODULE_3__.force(v$2.contents);
}

function set$2(newVal) {
  v$2.contents = rescript_lib_es6_lazy_js__WEBPACK_IMPORTED_MODULE_1__.from_val(newVal);
  _gm__WEBPACK_IMPORTED_MODULE_0__.setValue(name$2, newVal);
  
}

var SyncAnswers = {
  v: v$2,
  get: get$2,
  set: set$2
};

var name$3 = "nol_eavecheck";

var init$1 = true;

var v$3 = {
  contents: {
    LAZY_DONE: false,
    VAL: (function () {
        var cached = _gm__WEBPACK_IMPORTED_MODULE_0__.getValue(name$3);
        if (cached == null) {
          _gm__WEBPACK_IMPORTED_MODULE_0__.setValue(name$3, init$1);
          return init$1;
        } else {
          return rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_2__.some(cached);
        }
      })
  }
};

function get$3(param) {
  return rescript_lib_es6_camlinternalLazy_js__WEBPACK_IMPORTED_MODULE_3__.force(v$3.contents);
}

function set$3(newVal) {
  v$3.contents = rescript_lib_es6_lazy_js__WEBPACK_IMPORTED_MODULE_1__.from_val(newVal);
  _gm__WEBPACK_IMPORTED_MODULE_0__.setValue(name$3, newVal);
  
}

var NoLeaveCheck = {
  v: v$3,
  get: get$3,
  set: set$3
};

var name$4 = "sort_problems";

var init$2 = false;

var v$4 = {
  contents: {
    LAZY_DONE: false,
    VAL: (function () {
        var cached = _gm__WEBPACK_IMPORTED_MODULE_0__.getValue(name$4);
        if (cached == null) {
          _gm__WEBPACK_IMPORTED_MODULE_0__.setValue(name$4, init$2);
          return init$2;
        } else {
          return rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_2__.some(cached);
        }
      })
  }
};

function get$4(param) {
  return rescript_lib_es6_camlinternalLazy_js__WEBPACK_IMPORTED_MODULE_3__.force(v$4.contents);
}

function set$4(newVal) {
  v$4.contents = rescript_lib_es6_lazy_js__WEBPACK_IMPORTED_MODULE_1__.from_val(newVal);
  _gm__WEBPACK_IMPORTED_MODULE_0__.setValue(name$4, newVal);
  
}

var SortProblems = {
  v: v$4,
  get: get$4,
  set: set$4
};

var v$5 = {
  contents: undefined
};

function get$5(param) {
  return v$5.contents;
}

function set$5(newVal) {
  v$5.contents = newVal;
  
}

var Token = {
  v: v$5,
  get: get$5,
  set: set$5
};

var v$6 = {
  contents: undefined
};

function get$6(param) {
  return v$6.contents;
}

function set$6(newVal) {
  v$6.contents = newVal;
  
}

var ExamId = {
  v: v$6,
  get: get$6,
  set: set$6
};


/* ./gm Not a pure module */


/***/ }),
/* 11 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getValue": () => (/* binding */ getValue),
/* harmony export */   "setValue": () => (/* binding */ setValue)
/* harmony export */ });
function getValue(key) {
    return GM_getValue(key);
}
function setValue(key, val) {
    GM_setValue(key, val);
}


/***/ }),
/* 12 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Undefined": () => (/* binding */ Undefined),
/* harmony export */   "force_val": () => (/* binding */ force_val),
/* harmony export */   "from_fun": () => (/* binding */ from_fun),
/* harmony export */   "from_val": () => (/* binding */ from_val),
/* harmony export */   "is_val": () => (/* binding */ is_val),
/* harmony export */   "lazy_from_fun": () => (/* binding */ lazy_from_fun),
/* harmony export */   "lazy_from_val": () => (/* binding */ lazy_from_val),
/* harmony export */   "lazy_is_val": () => (/* binding */ lazy_is_val)
/* harmony export */ });
/* harmony import */ var _curry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _camlinternalLazy_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);





function from_fun(f) {
  return {
          LAZY_DONE: false,
          VAL: (function () {
              return _curry_js__WEBPACK_IMPORTED_MODULE_0__._1(f, undefined);
            })
        };
}

function from_val(v) {
  return {
          LAZY_DONE: true,
          VAL: v
        };
}

var Undefined = _camlinternalLazy_js__WEBPACK_IMPORTED_MODULE_1__.Undefined;

var force_val = _camlinternalLazy_js__WEBPACK_IMPORTED_MODULE_1__.force_val;

var is_val = _camlinternalLazy_js__WEBPACK_IMPORTED_MODULE_1__.is_val;

var lazy_from_fun = from_fun;

var lazy_from_val = from_val;

var lazy_is_val = _camlinternalLazy_js__WEBPACK_IMPORTED_MODULE_1__.is_val;


/* No side effect */


/***/ }),
/* 13 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "_1": () => (/* binding */ _1),
/* harmony export */   "_2": () => (/* binding */ _2),
/* harmony export */   "_3": () => (/* binding */ _3),
/* harmony export */   "_4": () => (/* binding */ _4),
/* harmony export */   "_5": () => (/* binding */ _5),
/* harmony export */   "_6": () => (/* binding */ _6),
/* harmony export */   "_7": () => (/* binding */ _7),
/* harmony export */   "_8": () => (/* binding */ _8),
/* harmony export */   "__1": () => (/* binding */ __1),
/* harmony export */   "__2": () => (/* binding */ __2),
/* harmony export */   "__3": () => (/* binding */ __3),
/* harmony export */   "__4": () => (/* binding */ __4),
/* harmony export */   "__5": () => (/* binding */ __5),
/* harmony export */   "__6": () => (/* binding */ __6),
/* harmony export */   "__7": () => (/* binding */ __7),
/* harmony export */   "__8": () => (/* binding */ __8),
/* harmony export */   "app": () => (/* binding */ app)
/* harmony export */ });
/* harmony import */ var _caml_array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);




function app(_f, _args) {
  while(true) {
    var args = _args;
    var f = _f;
    var init_arity = f.length;
    var arity = init_arity === 0 ? 1 : init_arity;
    var len = args.length;
    var d = arity - len | 0;
    if (d === 0) {
      return f.apply(null, args);
    }
    if (d >= 0) {
      return (function(f,args){
      return function (x) {
        return app(f, args.concat([x]));
      }
      }(f,args));
    }
    _args = _caml_array_js__WEBPACK_IMPORTED_MODULE_0__.sub(args, arity, -d | 0);
    _f = f.apply(null, _caml_array_js__WEBPACK_IMPORTED_MODULE_0__.sub(args, 0, arity));
    continue ;
  };
}

function _1(o, a0) {
  var arity = o.length;
  if (arity === 1) {
    return o(a0);
  } else {
    switch (arity) {
      case 1 :
          return o(a0);
      case 2 :
          return function (param) {
            return o(a0, param);
          };
      case 3 :
          return function (param, param$1) {
            return o(a0, param, param$1);
          };
      case 4 :
          return function (param, param$1, param$2) {
            return o(a0, param, param$1, param$2);
          };
      case 5 :
          return function (param, param$1, param$2, param$3) {
            return o(a0, param, param$1, param$2, param$3);
          };
      case 6 :
          return function (param, param$1, param$2, param$3, param$4) {
            return o(a0, param, param$1, param$2, param$3, param$4);
          };
      case 7 :
          return function (param, param$1, param$2, param$3, param$4, param$5) {
            return o(a0, param, param$1, param$2, param$3, param$4, param$5);
          };
      default:
        return app(o, [a0]);
    }
  }
}

function __1(o) {
  var arity = o.length;
  if (arity === 1) {
    return o;
  } else {
    return function (a0) {
      return _1(o, a0);
    };
  }
}

function _2(o, a0, a1) {
  var arity = o.length;
  if (arity === 2) {
    return o(a0, a1);
  } else {
    switch (arity) {
      case 1 :
          return app(o(a0), [a1]);
      case 2 :
          return o(a0, a1);
      case 3 :
          return function (param) {
            return o(a0, a1, param);
          };
      case 4 :
          return function (param, param$1) {
            return o(a0, a1, param, param$1);
          };
      case 5 :
          return function (param, param$1, param$2) {
            return o(a0, a1, param, param$1, param$2);
          };
      case 6 :
          return function (param, param$1, param$2, param$3) {
            return o(a0, a1, param, param$1, param$2, param$3);
          };
      case 7 :
          return function (param, param$1, param$2, param$3, param$4) {
            return o(a0, a1, param, param$1, param$2, param$3, param$4);
          };
      default:
        return app(o, [
                    a0,
                    a1
                  ]);
    }
  }
}

function __2(o) {
  var arity = o.length;
  if (arity === 2) {
    return o;
  } else {
    return function (a0, a1) {
      return _2(o, a0, a1);
    };
  }
}

function _3(o, a0, a1, a2) {
  var arity = o.length;
  if (arity === 3) {
    return o(a0, a1, a2);
  } else {
    switch (arity) {
      case 1 :
          return app(o(a0), [
                      a1,
                      a2
                    ]);
      case 2 :
          return app(o(a0, a1), [a2]);
      case 3 :
          return o(a0, a1, a2);
      case 4 :
          return function (param) {
            return o(a0, a1, a2, param);
          };
      case 5 :
          return function (param, param$1) {
            return o(a0, a1, a2, param, param$1);
          };
      case 6 :
          return function (param, param$1, param$2) {
            return o(a0, a1, a2, param, param$1, param$2);
          };
      case 7 :
          return function (param, param$1, param$2, param$3) {
            return o(a0, a1, a2, param, param$1, param$2, param$3);
          };
      default:
        return app(o, [
                    a0,
                    a1,
                    a2
                  ]);
    }
  }
}

function __3(o) {
  var arity = o.length;
  if (arity === 3) {
    return o;
  } else {
    return function (a0, a1, a2) {
      return _3(o, a0, a1, a2);
    };
  }
}

function _4(o, a0, a1, a2, a3) {
  var arity = o.length;
  if (arity === 4) {
    return o(a0, a1, a2, a3);
  } else {
    switch (arity) {
      case 1 :
          return app(o(a0), [
                      a1,
                      a2,
                      a3
                    ]);
      case 2 :
          return app(o(a0, a1), [
                      a2,
                      a3
                    ]);
      case 3 :
          return app(o(a0, a1, a2), [a3]);
      case 4 :
          return o(a0, a1, a2, a3);
      case 5 :
          return function (param) {
            return o(a0, a1, a2, a3, param);
          };
      case 6 :
          return function (param, param$1) {
            return o(a0, a1, a2, a3, param, param$1);
          };
      case 7 :
          return function (param, param$1, param$2) {
            return o(a0, a1, a2, a3, param, param$1, param$2);
          };
      default:
        return app(o, [
                    a0,
                    a1,
                    a2,
                    a3
                  ]);
    }
  }
}

function __4(o) {
  var arity = o.length;
  if (arity === 4) {
    return o;
  } else {
    return function (a0, a1, a2, a3) {
      return _4(o, a0, a1, a2, a3);
    };
  }
}

function _5(o, a0, a1, a2, a3, a4) {
  var arity = o.length;
  if (arity === 5) {
    return o(a0, a1, a2, a3, a4);
  } else {
    switch (arity) {
      case 1 :
          return app(o(a0), [
                      a1,
                      a2,
                      a3,
                      a4
                    ]);
      case 2 :
          return app(o(a0, a1), [
                      a2,
                      a3,
                      a4
                    ]);
      case 3 :
          return app(o(a0, a1, a2), [
                      a3,
                      a4
                    ]);
      case 4 :
          return app(o(a0, a1, a2, a3), [a4]);
      case 5 :
          return o(a0, a1, a2, a3, a4);
      case 6 :
          return function (param) {
            return o(a0, a1, a2, a3, a4, param);
          };
      case 7 :
          return function (param, param$1) {
            return o(a0, a1, a2, a3, a4, param, param$1);
          };
      default:
        return app(o, [
                    a0,
                    a1,
                    a2,
                    a3,
                    a4
                  ]);
    }
  }
}

function __5(o) {
  var arity = o.length;
  if (arity === 5) {
    return o;
  } else {
    return function (a0, a1, a2, a3, a4) {
      return _5(o, a0, a1, a2, a3, a4);
    };
  }
}

function _6(o, a0, a1, a2, a3, a4, a5) {
  var arity = o.length;
  if (arity === 6) {
    return o(a0, a1, a2, a3, a4, a5);
  } else {
    switch (arity) {
      case 1 :
          return app(o(a0), [
                      a1,
                      a2,
                      a3,
                      a4,
                      a5
                    ]);
      case 2 :
          return app(o(a0, a1), [
                      a2,
                      a3,
                      a4,
                      a5
                    ]);
      case 3 :
          return app(o(a0, a1, a2), [
                      a3,
                      a4,
                      a5
                    ]);
      case 4 :
          return app(o(a0, a1, a2, a3), [
                      a4,
                      a5
                    ]);
      case 5 :
          return app(o(a0, a1, a2, a3, a4), [a5]);
      case 6 :
          return o(a0, a1, a2, a3, a4, a5);
      case 7 :
          return function (param) {
            return o(a0, a1, a2, a3, a4, a5, param);
          };
      default:
        return app(o, [
                    a0,
                    a1,
                    a2,
                    a3,
                    a4,
                    a5
                  ]);
    }
  }
}

function __6(o) {
  var arity = o.length;
  if (arity === 6) {
    return o;
  } else {
    return function (a0, a1, a2, a3, a4, a5) {
      return _6(o, a0, a1, a2, a3, a4, a5);
    };
  }
}

function _7(o, a0, a1, a2, a3, a4, a5, a6) {
  var arity = o.length;
  if (arity === 7) {
    return o(a0, a1, a2, a3, a4, a5, a6);
  } else {
    switch (arity) {
      case 1 :
          return app(o(a0), [
                      a1,
                      a2,
                      a3,
                      a4,
                      a5,
                      a6
                    ]);
      case 2 :
          return app(o(a0, a1), [
                      a2,
                      a3,
                      a4,
                      a5,
                      a6
                    ]);
      case 3 :
          return app(o(a0, a1, a2), [
                      a3,
                      a4,
                      a5,
                      a6
                    ]);
      case 4 :
          return app(o(a0, a1, a2, a3), [
                      a4,
                      a5,
                      a6
                    ]);
      case 5 :
          return app(o(a0, a1, a2, a3, a4), [
                      a5,
                      a6
                    ]);
      case 6 :
          return app(o(a0, a1, a2, a3, a4, a5), [a6]);
      case 7 :
          return o(a0, a1, a2, a3, a4, a5, a6);
      default:
        return app(o, [
                    a0,
                    a1,
                    a2,
                    a3,
                    a4,
                    a5,
                    a6
                  ]);
    }
  }
}

function __7(o) {
  var arity = o.length;
  if (arity === 7) {
    return o;
  } else {
    return function (a0, a1, a2, a3, a4, a5, a6) {
      return _7(o, a0, a1, a2, a3, a4, a5, a6);
    };
  }
}

function _8(o, a0, a1, a2, a3, a4, a5, a6, a7) {
  var arity = o.length;
  if (arity === 8) {
    return o(a0, a1, a2, a3, a4, a5, a6, a7);
  } else {
    switch (arity) {
      case 1 :
          return app(o(a0), [
                      a1,
                      a2,
                      a3,
                      a4,
                      a5,
                      a6,
                      a7
                    ]);
      case 2 :
          return app(o(a0, a1), [
                      a2,
                      a3,
                      a4,
                      a5,
                      a6,
                      a7
                    ]);
      case 3 :
          return app(o(a0, a1, a2), [
                      a3,
                      a4,
                      a5,
                      a6,
                      a7
                    ]);
      case 4 :
          return app(o(a0, a1, a2, a3), [
                      a4,
                      a5,
                      a6,
                      a7
                    ]);
      case 5 :
          return app(o(a0, a1, a2, a3, a4), [
                      a5,
                      a6,
                      a7
                    ]);
      case 6 :
          return app(o(a0, a1, a2, a3, a4, a5), [
                      a6,
                      a7
                    ]);
      case 7 :
          return app(o(a0, a1, a2, a3, a4, a5, a6), [a7]);
      default:
        return app(o, [
                    a0,
                    a1,
                    a2,
                    a3,
                    a4,
                    a5,
                    a6,
                    a7
                  ]);
    }
  }
}

function __8(o) {
  var arity = o.length;
  if (arity === 8) {
    return o;
  } else {
    return function (a0, a1, a2, a3, a4, a5, a6, a7) {
      return _8(o, a0, a1, a2, a3, a4, a5, a6, a7);
    };
  }
}


/* No side effect */


/***/ }),
/* 14 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "blit": () => (/* binding */ blit),
/* harmony export */   "concat": () => (/* binding */ concat),
/* harmony export */   "dup": () => (/* binding */ dup),
/* harmony export */   "get": () => (/* binding */ get),
/* harmony export */   "make": () => (/* binding */ make),
/* harmony export */   "make_float": () => (/* binding */ make_float),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "sub": () => (/* binding */ sub)
/* harmony export */ });



function sub(x, offset, len) {
  var result = new Array(len);
  var j = 0;
  var i = offset;
  while(j < len) {
    result[j] = x[i];
    j = j + 1 | 0;
    i = i + 1 | 0;
  };
  return result;
}

function len(_acc, _l) {
  while(true) {
    var l = _l;
    var acc = _acc;
    if (!l) {
      return acc;
    }
    _l = l.tl;
    _acc = l.hd.length + acc | 0;
    continue ;
  };
}

function fill(arr, _i, _l) {
  while(true) {
    var l = _l;
    var i = _i;
    if (!l) {
      return ;
    }
    var x = l.hd;
    var l$1 = x.length;
    var k = i;
    var j = 0;
    while(j < l$1) {
      arr[k] = x[j];
      k = k + 1 | 0;
      j = j + 1 | 0;
    };
    _l = l.tl;
    _i = k;
    continue ;
  };
}

function concat(l) {
  var v = len(0, l);
  var result = new Array(v);
  fill(result, 0, l);
  return result;
}

function set(xs, index, newval) {
  if (index < 0 || index >= xs.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
  }
  xs[index] = newval;
  
}

function get(xs, index) {
  if (index < 0 || index >= xs.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
  }
  return xs[index];
}

function make(len, init) {
  var b = new Array(len);
  for(var i = 0; i < len; ++i){
    b[i] = init;
  }
  return b;
}

function make_float(len) {
  var b = new Array(len);
  for(var i = 0; i < len; ++i){
    b[i] = 0;
  }
  return b;
}

function blit(a1, i1, a2, i2, len) {
  if (i2 <= i1) {
    for(var j = 0; j < len; ++j){
      a2[j + i2 | 0] = a1[j + i1 | 0];
    }
    return ;
  }
  for(var j$1 = len - 1 | 0; j$1 >= 0; --j$1){
    a2[j$1 + i2 | 0] = a1[j$1 + i1 | 0];
  }
  
}

function dup(prim) {
  return prim.slice(0);
}


/* No side effect */


/***/ }),
/* 15 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Undefined": () => (/* binding */ Undefined),
/* harmony export */   "force": () => (/* binding */ force),
/* harmony export */   "force_val": () => (/* binding */ force_val),
/* harmony export */   "is_val": () => (/* binding */ is_val)
/* harmony export */ });
/* harmony import */ var _caml_exceptions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);




function is_val(l) {
  return l.LAZY_DONE;
}

var Undefined = /* @__PURE__ */_caml_exceptions_js__WEBPACK_IMPORTED_MODULE_0__.create("CamlinternalLazy.Undefined");

function forward_with_closure(blk, closure) {
  var result = closure();
  blk.VAL = result;
  blk.LAZY_DONE = true;
  return result;
}

function raise_undefined() {
  throw {
        RE_EXN_ID: Undefined,
        Error: new Error()
      };
}

function force(lzv) {
  if (lzv.LAZY_DONE) {
    return lzv.VAL;
  } else {
    var closure = lzv.VAL;
    lzv.VAL = raise_undefined;
    try {
      return forward_with_closure(lzv, closure);
    }
    catch (e){
      lzv.VAL = (function () {
          throw e;
        });
      throw e;
    }
  }
}

function force_val(lzv) {
  if (lzv.LAZY_DONE) {
    return lzv.VAL;
  } else {
    var closure = lzv.VAL;
    lzv.VAL = raise_undefined;
    return forward_with_closure(lzv, closure);
  }
}


/* No side effect */


/***/ }),
/* 16 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "caml_exn_slot_name": () => (/* binding */ caml_exn_slot_name),
/* harmony export */   "caml_is_extension": () => (/* binding */ caml_is_extension),
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "id": () => (/* binding */ id)
/* harmony export */ });



var id = {
  contents: 0
};

function create(str) {
  id.contents = id.contents + 1 | 0;
  return str + ("/" + id.contents);
}

function caml_is_extension(e) {
  if (e == null) {
    return false;
  } else {
    return typeof e.RE_EXN_ID === "string";
  }
}

function caml_exn_slot_name(x) {
  return x.RE_EXN_ID;
}


/* No side effect */


/***/ }),
/* 17 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isNested": () => (/* binding */ isNested),
/* harmony export */   "null_to_opt": () => (/* binding */ null_to_opt),
/* harmony export */   "nullable_to_opt": () => (/* binding */ nullable_to_opt),
/* harmony export */   "option_get": () => (/* binding */ option_get),
/* harmony export */   "option_unwrap": () => (/* binding */ option_unwrap),
/* harmony export */   "some": () => (/* binding */ some),
/* harmony export */   "undefined_to_opt": () => (/* binding */ undefined_to_opt),
/* harmony export */   "valFromOption": () => (/* binding */ valFromOption)
/* harmony export */ });



function isNested(x) {
  return x.BS_PRIVATE_NESTED_SOME_NONE !== undefined;
}

function some(x) {
  if (x === undefined) {
    return {
            BS_PRIVATE_NESTED_SOME_NONE: 0
          };
  } else if (x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== undefined) {
    return {
            BS_PRIVATE_NESTED_SOME_NONE: x.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
          };
  } else {
    return x;
  }
}

function nullable_to_opt(x) {
  if (x == null) {
    return ;
  } else {
    return some(x);
  }
}

function undefined_to_opt(x) {
  if (x === undefined) {
    return ;
  } else {
    return some(x);
  }
}

function null_to_opt(x) {
  if (x === null) {
    return ;
  } else {
    return some(x);
  }
}

function valFromOption(x) {
  if (!(x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== undefined)) {
    return x;
  }
  var depth = x.BS_PRIVATE_NESTED_SOME_NONE;
  if (depth === 0) {
    return ;
  } else {
    return {
            BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
          };
  }
}

function option_get(x) {
  if (x === undefined) {
    return ;
  } else {
    return valFromOption(x);
  }
}

function option_unwrap(x) {
  if (x !== undefined) {
    return x.VAL;
  } else {
    return x;
  }
}


/* No side effect */


/***/ }),
/* 18 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hookXHR": () => (/* binding */ hookXHR)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);

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
/* 19 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProblemType": () => (/* binding */ ProblemType)
/* harmony export */ });
var ProblemType;
(function (ProblemType) {
    ProblemType[ProblemType["SingleChoice"] = 1] = "SingleChoice";
    ProblemType[ProblemType["MultipleChoice"] = 2] = "MultipleChoice";
    ProblemType[ProblemType["Polling"] = 3] = "Polling";
    ProblemType[ProblemType["FillBlank"] = 4] = "FillBlank";
    ProblemType[ProblemType["ShortAnswer"] = 5] = "ShortAnswer";
    ProblemType[ProblemType["Judgement"] = 6] = "Judgement";
})(ProblemType || (ProblemType = {}));


/***/ }),
/* 20 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UI": () => (/* binding */ UI),
/* harmony export */   "showConfirmUpload": () => (/* binding */ showConfirmUpload)
/* harmony export */ });
/* harmony import */ var _UI_bs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);

class UI {
    constructor(paper) {
        // Collect problems.
        let problems = [];
        if (paper.data.has_problem_dict === true) {
            paper.data.problems.forEach((dict) => {
                problems = problems.concat(dict.problems);
            });
        }
        else {
            problems = paper.data.problems;
        }
        this.inner = _UI_bs__WEBPACK_IMPORTED_MODULE_0__.UI.make(problems);
    }
    updateAnswer({ username, problem_id, result }) {
        _UI_bs__WEBPACK_IMPORTED_MODULE_0__.UI.updateAnswer(this.inner, problem_id, username, result);
    }
    updateUI() {
        _UI_bs__WEBPACK_IMPORTED_MODULE_0__.UI.updateUI(this.inner);
    }
}
function showConfirmUpload(dataURL, cb) {
    _UI_bs__WEBPACK_IMPORTED_MODULE_0__.showConfirmUpload(dataURL, cb);
}


/***/ }),
/* 21 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Problem": () => (/* binding */ Problem),
/* harmony export */   "React": () => (/* binding */ React),
/* harmony export */   "ReactDOMRe": () => (/* binding */ ReactDOMRe),
/* harmony export */   "UI": () => (/* binding */ UI),
/* harmony export */   "showConfirmUpload": () => (/* binding */ showConfirmUpload),
/* harmony export */   "style": () => (/* binding */ style),
/* harmony export */   "styleCss": () => (/* binding */ styleCss)
/* harmony export */ });
/* harmony import */ var rescript_lib_es6_curry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _Utils_bs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(25);
/* harmony import */ var _Detail_bs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(45);
/* harmony import */ var rescript_lib_es6_js_exn_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(59);
/* harmony import */ var _Settings_bs_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(60);
/* harmony import */ var rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(26);
/* harmony import */ var rescript_lib_es6_belt_MapInt_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(62);
/* harmony import */ var rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(30);
/* harmony import */ var rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(17);
/* harmony import */ var rescript_lib_es6_belt_MapString_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(54);
/* harmony import */ var _style_mod_less__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(31);
/* harmony import */ var rescript_webapi_src_Webapi_Dom_Webapi_Dom_Element_bs_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(34);
/* harmony import */ var rescript_webapi_src_Webapi_Dom_Webapi_Dom_Document_bs_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(43);
/* harmony import */ var rescript_webapi_src_Webapi_Dom_Webapi_Dom_HtmlElement_bs_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(61);
// Generated by ReScript, PLEASE EDIT WITH CARE


















var styleCss = _style_mod_less__WEBPACK_IMPORTED_MODULE_11__["default"];

var style = _style_mod_less__WEBPACK_IMPORTED_MODULE_11__;

function showConfirmUpload(dataURL, cb) {
  var match = _Utils_bs_js__WEBPACK_IMPORTED_MODULE_2__.openWin("上传图片", 200, 300, undefined, undefined, undefined);
  var win = match[0];
  match[1].appendChild(rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_8__.getExn(_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.toNode(_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("div", {
                    className: _Utils_bs_js__WEBPACK_IMPORTED_MODULE_2__.joinStrings([
                          style.mainBody,
                          style.uploadImg
                        ], " ")
                  }, [
                    _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("div", {
                          className: style.uploadImgConfirm
                        }, [
                          _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("button", {
                                className: style.clickable,
                                onClick: (function (param) {
                                    rescript_lib_es6_curry_js__WEBPACK_IMPORTED_MODULE_0__._1(cb, undefined);
                                    win.close();
                                    
                                  })
                              }, ["确认上传"]),
                          _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("span", undefined, [_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("i", undefined, ["*关闭窗口以取消上传"])])
                        ]),
                    _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("div", {
                          className: style.uploadImgImage
                        }, [_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("img", {
                                src: dataURL
                              }, [])])
                  ]))));
  
}

function probelmTypeToJs(param) {
  return param + 1 | 0;
}

function probelmTypeFromJs(param) {
  if (param <= 6 && 1 <= param) {
    return param - 1 | 0;
  }
  
}

var Problem = {
  probelmTypeToJs: probelmTypeToJs,
  probelmTypeFromJs: probelmTypeFromJs
};

function make(problems) {
  var match = rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_8__.getExn(rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_8__.flatMap(rescript_webapi_src_Webapi_Dom_Webapi_Dom_Document_bs_js__WEBPACK_IMPORTED_MODULE_13__.asHtmlDocument(document), (function (doc) {
              return rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_8__.map(rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_9__.nullable_to_opt(doc.body), (function (body) {
                            return [
                                    doc.head,
                                    body
                                  ];
                          }));
            })));
  var body = match[1];
  match[0].appendChild(rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_8__.getExn(_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.toNode(_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("style", undefined, [styleCss.toString()]))));
  var header = rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_8__.getExn(rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_8__.flatMap(rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_9__.nullable_to_opt(body.querySelector(".header-title")), rescript_webapi_src_Webapi_Dom_Webapi_Dom_HtmlElement_bs_js__WEBPACK_IMPORTED_MODULE_14__.ofElement));
  header.classList.add(style.clickable);
  header.addEventListener("click", (function (param) {
          return _Settings_bs_js__WEBPACK_IMPORTED_MODULE_5__.showSettings(undefined);
        }));
  var subjectItems = rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_6__.map(Array.prototype.slice.call(body.querySelectorAll(".exam-main--body .subject-item")), (function (node) {
          return rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_8__.getExn(rescript_webapi_src_Webapi_Dom_Webapi_Dom_Element_bs_js__WEBPACK_IMPORTED_MODULE_12__.ofNode(node));
        }));
  if (subjectItems.length !== problems.length) {
    rescript_lib_es6_js_exn_js__WEBPACK_IMPORTED_MODULE_4__.raiseError("wrong number of subject items");
  }
  var detials = rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_6__.reduce(rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_6__.zip(problems, subjectItems), undefined, (function (details, param) {
          var subjectItem = param[1];
          var prob = param[0];
          var ty = rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_8__.getExn(probelmTypeFromJs(prob.ProblemType));
          var detail;
          var exit = 0;
          if (ty >= 3) {
            switch (ty) {
              case /* FillBlank */3 :
                  var detail$1 = _Detail_bs_js__WEBPACK_IMPORTED_MODULE_3__.Blank.make(subjectItem, undefined);
                  detail = {
                    updateUI: (function (param) {
                        return _Detail_bs_js__WEBPACK_IMPORTED_MODULE_3__.Blank.updateUI(detail$1);
                      }),
                    updateAnswer: (function (username, answer) {
                        return _Detail_bs_js__WEBPACK_IMPORTED_MODULE_3__.Blank.updateAnswer(detail$1, username, answer);
                      })
                  };
                  break;
              case /* ShortAnswer */4 :
                  var detail$2 = _Detail_bs_js__WEBPACK_IMPORTED_MODULE_3__.ShortAnswer.make(subjectItem, undefined);
                  detail = {
                    updateUI: (function (param) {
                        return _Detail_bs_js__WEBPACK_IMPORTED_MODULE_3__.ShortAnswer.updateUI(detail$2);
                      }),
                    updateAnswer: (function (username, answer) {
                        return _Detail_bs_js__WEBPACK_IMPORTED_MODULE_3__.ShortAnswer.updateAnswer(detail$2, username, answer);
                      })
                  };
                  break;
              case /* Judgement */5 :
                  exit = 1;
                  break;
              
            }
          } else {
            exit = 1;
          }
          if (exit === 1) {
            var choiceMap = rescript_lib_es6_belt_MapString_js__WEBPACK_IMPORTED_MODULE_10__.fromArray(rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_6__.mapWithIndex(rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_8__.getExn(prob.Options), (function (i, o) {
                        return [
                                o.key,
                                String.fromCharCode(65 + i | 0)
                              ];
                      })));
            var detail$3 = _Detail_bs_js__WEBPACK_IMPORTED_MODULE_3__.Choice.make(subjectItem, (function (s) {
                    return rescript_lib_es6_belt_MapString_js__WEBPACK_IMPORTED_MODULE_10__.getExn(choiceMap, s);
                  }));
            detail = {
              updateUI: (function (param) {
                  return _Detail_bs_js__WEBPACK_IMPORTED_MODULE_3__.Choice.updateUI(detail$3);
                }),
              updateAnswer: (function (username, answer) {
                  return _Detail_bs_js__WEBPACK_IMPORTED_MODULE_3__.Choice.updateAnswer(detail$3, username, answer);
                })
            };
          }
          return rescript_lib_es6_belt_MapInt_js__WEBPACK_IMPORTED_MODULE_7__.set(details, prob.problem_id, detail);
        }));
  return {
          details: detials
        };
}

function updateAnswer($$this, problemId, username, answer) {
  return rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_8__.forEach(rescript_lib_es6_belt_MapInt_js__WEBPACK_IMPORTED_MODULE_7__.get($$this.details, problemId), (function (d) {
                return rescript_lib_es6_curry_js__WEBPACK_IMPORTED_MODULE_0__._2(d.updateAnswer, username, answer);
              }));
}

function updateUI($$this) {
  return rescript_lib_es6_belt_MapInt_js__WEBPACK_IMPORTED_MODULE_7__.forEach($$this.details, (function (param, d) {
                return rescript_lib_es6_curry_js__WEBPACK_IMPORTED_MODULE_0__._1(d.updateUI, undefined);
              }));
}

var UI = {
  make: make,
  updateAnswer: updateAnswer,
  updateUI: updateUI
};

var React;

var ReactDOMRe;


/* styleCss Not a pure module */


/***/ }),
/* 22 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Children": () => (/* binding */ Children),
/* harmony export */   "DOMRe": () => (/* binding */ DOMRe),
/* harmony export */   "Props": () => (/* binding */ Props),
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "createElementVariadic": () => (/* binding */ createElementVariadic),
/* harmony export */   "toNode": () => (/* binding */ toNode)
/* harmony export */ });
/* harmony import */ var _recks__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(23);
/* harmony import */ var rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var rescript_lib_es6_caml_splice_call_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(24);
// Generated by ReScript, PLEASE EDIT WITH CARE





function toNode(prim) {
  return rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_1__.nullable_to_opt(_recks__WEBPACK_IMPORTED_MODULE_0__.toNode(prim));
}

function toArray(prim) {
  return _recks__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(prim);
}

var Children = {
  toArray: toArray
};

function createElementVariadic(prim0, prim1, prim2) {
  return rescript_lib_es6_caml_splice_call_js__WEBPACK_IMPORTED_MODULE_2__.spliceApply(_recks__WEBPACK_IMPORTED_MODULE_0__.createElement, [
              prim0,
              prim1,
              prim2
            ]);
}

function createElement(prim0, prim1) {
  return _recks__WEBPACK_IMPORTED_MODULE_0__.createElement(prim0, prim1);
}

function createDOMElementVariadic(prim0, prim1, prim2) {
  return rescript_lib_es6_caml_splice_call_js__WEBPACK_IMPORTED_MODULE_2__.spliceApply(_recks__WEBPACK_IMPORTED_MODULE_0__.createElement, [
              prim0,
              prim1 !== undefined ? rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_1__.valFromOption(prim1) : undefined,
              prim2
            ]);
}

function createElement$1(prim0, prim1, prim2) {
  return rescript_lib_es6_caml_splice_call_js__WEBPACK_IMPORTED_MODULE_2__.spliceApply(_recks__WEBPACK_IMPORTED_MODULE_0__.createElement, [
              prim0,
              prim1 !== undefined ? rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_1__.valFromOption(prim1) : undefined,
              prim2
            ]);
}

var DOMRe = {
  createDOMElementVariadic: createDOMElementVariadic,
  createElement: createElement$1
};

var Props;


/* ./recks Not a pure module */


/***/ }),
/* 23 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Children": () => (/* binding */ Children),
/* harmony export */   "Fragment": () => (/* binding */ Fragment),
/* harmony export */   "createElement": () => (/* binding */ createElement),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "toNode": () => (/* binding */ toNode)
/* harmony export */ });
function childrenToArray(children) {
    if (Array.isArray(children)) {
        return new Array().concat(...children.map(childrenToArray));
    }
    else if (children instanceof Node) {
        return [children];
    }
    else if (children === null || children === undefined) {
        return [];
    }
    else {
        return [document.createTextNode(String(children))];
    }
}
function addChildren(parent, children) {
    for (const child of children) {
        parent.appendChild(child);
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
function setDOMProps(ele, props) {
    for (const [name, value] of Object.entries(props)) {
        if (value === undefined) {
            continue;
        }
        switch (name) {
            case "class":
            case "className":
                ele.setAttribute("class", value);
                break;
            case "style":
                setCSSProps(ele, value);
                break;
            case "dangerouslySetInnerHTML":
                ele.innerHTML = value.__html;
                break;
            default:
                if (name.startsWith("on")) {
                    ele.addEventListener(name.slice(2).toLowerCase(), value);
                }
                else if (name in ele) {
                    ele[name] = value;
                }
                else {
                    ele.setAttribute(name, value);
                }
        }
    }
}
function createElement(t, props, ...children) {
    props = props !== null && props !== void 0 ? props : {};
    let nodeArray = childrenToArray(children).concat(childrenToArray(props.children));
    if (typeof t === "function") {
        return t(Object.assign(Object.assign({}, props), { children: nodeArray }));
    }
    else {
        const ele = document.createElement(t);
        addChildren(ele, nodeArray);
        setDOMProps(ele, props !== null && props !== void 0 ? props : {});
        return ele;
    }
}
function Fragment(props) {
    let frag = document.createDocumentFragment();
    addChildren(frag, childrenToArray(props.children));
    return frag;
}
function toNode(element) {
    if (element instanceof Node) {
        return element;
    }
    else {
        return null;
    }
}
const Children = {
    toArray: childrenToArray,
};
const Recks = {
    createElement: createElement,
    Fragment: Fragment,
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Recks);


/***/ }),
/* 24 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "spliceApply": () => (/* binding */ spliceApply),
/* harmony export */   "spliceObjApply": () => (/* binding */ spliceObjApply)
/* harmony export */ });



var spliceApply = (function(fn,args){
  var i, argLen; 
  argLen = args.length
  var applied = []
  for(i = 0; i < argLen - 1; ++i){
    applied.push(args[i])
  }
  var lastOne = args[argLen - 1]
  for(i = 0; i < lastOne.length; ++i ){
    applied.push(lastOne[i])
  }
  return fn.apply(null,applied)
});

var spliceObjApply = (function(obj,name,args){
  var i, argLen; 
  argLen = args.length
  var applied = []
  for(i = 0; i < argLen - 1; ++i){
    applied.push(args[i])
  }
  var lastOne = args[argLen - 1]
  for(i = 0; i < lastOne.length; ++i ){
    applied.push(lastOne[i])
  }
  return (obj[name]).apply(obj,applied)
});


/* No side effect */


/***/ }),
/* 25 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "React": () => (/* binding */ React),
/* harmony export */   "ReactDOMRe": () => (/* binding */ ReactDOMRe),
/* harmony export */   "UList": () => (/* binding */ UList),
/* harmony export */   "joinStrings": () => (/* binding */ joinStrings),
/* harmony export */   "openWin": () => (/* binding */ openWin),
/* harmony export */   "querySelectorAllElements": () => (/* binding */ querySelectorAllElements),
/* harmony export */   "styleCss": () => (/* binding */ styleCss)
/* harmony export */ });
/* harmony import */ var _Recks_bs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(22);
/* harmony import */ var rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);
/* harmony import */ var rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(30);
/* harmony import */ var rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);
/* harmony import */ var _style_mod_less__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(31);
/* harmony import */ var rescript_webapi_src_Webapi_Dom_Webapi_Dom_Element_bs_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(34);
/* harmony import */ var rescript_webapi_src_Webapi_Dom_Webapi_Dom_Document_bs_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(43);
// Generated by ReScript, PLEASE EDIT WITH CARE









var styleCss = _style_mod_less__WEBPACK_IMPORTED_MODULE_4__["default"];

function joinStrings(s, sep) {
  return rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_1__.joinWith(s, sep, (function (s) {
                return s;
              }));
}

function querySelectorAllElements(t, q) {
  return rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_1__.keepMap(Array.prototype.slice.call(t.querySelectorAll(q)), rescript_webapi_src_Webapi_Dom_Webapi_Dom_Element_bs_js__WEBPACK_IMPORTED_MODULE_5__.ofNode);
}

function Utils$UList(Props) {
  var children = Props.children;
  return _Recks_bs_js__WEBPACK_IMPORTED_MODULE_0__.DOMRe.createDOMElementVariadic("ul", undefined, [_Recks_bs_js__WEBPACK_IMPORTED_MODULE_0__.Children.toArray(children).map(function (item) {
                    return _Recks_bs_js__WEBPACK_IMPORTED_MODULE_0__.DOMRe.createDOMElementVariadic("li", undefined, [item]);
                  })]);
}

var UList = {
  make: Utils$UList
};

function openWin(title, height, width, left, top, param) {
  var win = rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_2__.getExn(rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_3__.nullable_to_opt(window.open("", "", rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_1__.joinWith([
                    [
                      "location",
                      "no"
                    ],
                    [
                      "height",
                      String(height)
                    ],
                    [
                      "width",
                      String(width)
                    ],
                    [
                      "left",
                      rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_2__.mapWithDefault(left, "0", (function (prim) {
                              return String(prim);
                            }))
                    ],
                    [
                      "top",
                      rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_2__.mapWithDefault(top, "0", (function (prim) {
                              return String(prim);
                            }))
                    ]
                  ], ",", (function (param) {
                      return param[0] + "=" + param[1];
                    })))));
  var html = rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_2__.getExn(rescript_webapi_src_Webapi_Dom_Webapi_Dom_Document_bs_js__WEBPACK_IMPORTED_MODULE_6__.asHtmlDocument(win.document));
  html.head.appendChild(rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_2__.getExn(_Recks_bs_js__WEBPACK_IMPORTED_MODULE_0__.toNode(_Recks_bs_js__WEBPACK_IMPORTED_MODULE_0__.DOMRe.createDOMElementVariadic("title", undefined, [title]))));
  html.head.appendChild(rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_2__.getExn(_Recks_bs_js__WEBPACK_IMPORTED_MODULE_0__.toNode(_Recks_bs_js__WEBPACK_IMPORTED_MODULE_0__.DOMRe.createDOMElementVariadic("style", undefined, [styleCss.toString()]))));
  return [
          win,
          rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_2__.getExn(rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_3__.nullable_to_opt(html.body))
        ];
}

var React;

var ReactDOMRe;


/* styleCss Not a pure module */


/***/ }),
/* 26 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "blit": () => (/* binding */ blit),
/* harmony export */   "blitUnsafe": () => (/* binding */ blitUnsafe),
/* harmony export */   "cmp": () => (/* binding */ cmp),
/* harmony export */   "cmpU": () => (/* binding */ cmpU),
/* harmony export */   "concat": () => (/* binding */ concat),
/* harmony export */   "concatMany": () => (/* binding */ concatMany),
/* harmony export */   "eq": () => (/* binding */ eq),
/* harmony export */   "eqU": () => (/* binding */ eqU),
/* harmony export */   "every": () => (/* binding */ every),
/* harmony export */   "every2": () => (/* binding */ every2),
/* harmony export */   "every2U": () => (/* binding */ every2U),
/* harmony export */   "everyU": () => (/* binding */ everyU),
/* harmony export */   "fill": () => (/* binding */ fill),
/* harmony export */   "forEach": () => (/* binding */ forEach),
/* harmony export */   "forEachU": () => (/* binding */ forEachU),
/* harmony export */   "forEachWithIndex": () => (/* binding */ forEachWithIndex),
/* harmony export */   "forEachWithIndexU": () => (/* binding */ forEachWithIndexU),
/* harmony export */   "get": () => (/* binding */ get),
/* harmony export */   "getBy": () => (/* binding */ getBy),
/* harmony export */   "getByU": () => (/* binding */ getByU),
/* harmony export */   "getExn": () => (/* binding */ getExn),
/* harmony export */   "getIndexBy": () => (/* binding */ getIndexBy),
/* harmony export */   "getIndexByU": () => (/* binding */ getIndexByU),
/* harmony export */   "joinWith": () => (/* binding */ joinWith),
/* harmony export */   "joinWithU": () => (/* binding */ joinWithU),
/* harmony export */   "keep": () => (/* binding */ keep),
/* harmony export */   "keepMap": () => (/* binding */ keepMap),
/* harmony export */   "keepMapU": () => (/* binding */ keepMapU),
/* harmony export */   "keepU": () => (/* binding */ keepU),
/* harmony export */   "keepWithIndex": () => (/* binding */ keepWithIndex),
/* harmony export */   "keepWithIndexU": () => (/* binding */ keepWithIndexU),
/* harmony export */   "make": () => (/* binding */ make),
/* harmony export */   "makeBy": () => (/* binding */ makeBy),
/* harmony export */   "makeByAndShuffle": () => (/* binding */ makeByAndShuffle),
/* harmony export */   "makeByAndShuffleU": () => (/* binding */ makeByAndShuffleU),
/* harmony export */   "makeByU": () => (/* binding */ makeByU),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "mapU": () => (/* binding */ mapU),
/* harmony export */   "mapWithIndex": () => (/* binding */ mapWithIndex),
/* harmony export */   "mapWithIndexU": () => (/* binding */ mapWithIndexU),
/* harmony export */   "partition": () => (/* binding */ partition),
/* harmony export */   "partitionU": () => (/* binding */ partitionU),
/* harmony export */   "range": () => (/* binding */ range),
/* harmony export */   "rangeBy": () => (/* binding */ rangeBy),
/* harmony export */   "reduce": () => (/* binding */ reduce),
/* harmony export */   "reduceReverse": () => (/* binding */ reduceReverse),
/* harmony export */   "reduceReverse2": () => (/* binding */ reduceReverse2),
/* harmony export */   "reduceReverse2U": () => (/* binding */ reduceReverse2U),
/* harmony export */   "reduceReverseU": () => (/* binding */ reduceReverseU),
/* harmony export */   "reduceU": () => (/* binding */ reduceU),
/* harmony export */   "reduceWithIndex": () => (/* binding */ reduceWithIndex),
/* harmony export */   "reduceWithIndexU": () => (/* binding */ reduceWithIndexU),
/* harmony export */   "reverse": () => (/* binding */ reverse),
/* harmony export */   "reverseInPlace": () => (/* binding */ reverseInPlace),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "setExn": () => (/* binding */ setExn),
/* harmony export */   "shuffle": () => (/* binding */ shuffle),
/* harmony export */   "shuffleInPlace": () => (/* binding */ shuffleInPlace),
/* harmony export */   "slice": () => (/* binding */ slice),
/* harmony export */   "sliceToEnd": () => (/* binding */ sliceToEnd),
/* harmony export */   "some": () => (/* binding */ some),
/* harmony export */   "some2": () => (/* binding */ some2),
/* harmony export */   "some2U": () => (/* binding */ some2U),
/* harmony export */   "someU": () => (/* binding */ someU),
/* harmony export */   "unzip": () => (/* binding */ unzip),
/* harmony export */   "zip": () => (/* binding */ zip),
/* harmony export */   "zipBy": () => (/* binding */ zipBy),
/* harmony export */   "zipByU": () => (/* binding */ zipByU)
/* harmony export */ });
/* harmony import */ var _caml_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27);
/* harmony import */ var _curry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _js_math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(28);
/* harmony import */ var _caml_option_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);







function get(arr, i) {
  if (i >= 0 && i < arr.length) {
    return _caml_option_js__WEBPACK_IMPORTED_MODULE_3__.some(arr[i]);
  }
  
}

function getExn(arr, i) {
  if (!(i >= 0 && i < arr.length)) {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "belt_Array.ml",
            27,
            4
          ],
          Error: new Error()
        };
  }
  return arr[i];
}

function set(arr, i, v) {
  if (i >= 0 && i < arr.length) {
    arr[i] = v;
    return true;
  } else {
    return false;
  }
}

function setExn(arr, i, v) {
  if (!(i >= 0 && i < arr.length)) {
    throw {
          RE_EXN_ID: "Assert_failure",
          _1: [
            "belt_Array.ml",
            33,
            2
          ],
          Error: new Error()
        };
  }
  arr[i] = v;
  
}

function swapUnsafe(xs, i, j) {
  var tmp = xs[i];
  xs[i] = xs[j];
  xs[j] = tmp;
  
}

function shuffleInPlace(xs) {
  var len = xs.length;
  for(var i = 0; i < len; ++i){
    swapUnsafe(xs, i, _js_math_js__WEBPACK_IMPORTED_MODULE_2__.random_int(i, len));
  }
  
}

function shuffle(xs) {
  var result = xs.slice(0);
  shuffleInPlace(result);
  return result;
}

function reverseInPlace(xs) {
  var len = xs.length;
  var ofs = 0;
  for(var i = 0 ,i_finish = len / 2 | 0; i < i_finish; ++i){
    swapUnsafe(xs, ofs + i | 0, ((ofs + len | 0) - i | 0) - 1 | 0);
  }
  
}

function reverse(xs) {
  var len = xs.length;
  var result = new Array(len);
  for(var i = 0; i < len; ++i){
    result[i] = xs[(len - 1 | 0) - i | 0];
  }
  return result;
}

function make(l, f) {
  if (l <= 0) {
    return [];
  }
  var res = new Array(l);
  for(var i = 0; i < l; ++i){
    res[i] = f;
  }
  return res;
}

function makeByU(l, f) {
  if (l <= 0) {
    return [];
  }
  var res = new Array(l);
  for(var i = 0; i < l; ++i){
    res[i] = f(i);
  }
  return res;
}

function makeBy(l, f) {
  return makeByU(l, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__1(f));
}

function makeByAndShuffleU(l, f) {
  var u = makeByU(l, f);
  shuffleInPlace(u);
  return u;
}

function makeByAndShuffle(l, f) {
  return makeByAndShuffleU(l, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__1(f));
}

function range(start, finish) {
  var cut = finish - start | 0;
  if (cut < 0) {
    return [];
  }
  var arr = new Array(cut + 1 | 0);
  for(var i = 0; i <= cut; ++i){
    arr[i] = start + i | 0;
  }
  return arr;
}

function rangeBy(start, finish, step) {
  var cut = finish - start | 0;
  if (cut < 0 || step <= 0) {
    return [];
  }
  var nb = (cut / step | 0) + 1 | 0;
  var arr = new Array(nb);
  var cur = start;
  for(var i = 0; i < nb; ++i){
    arr[i] = cur;
    cur = cur + step | 0;
  }
  return arr;
}

function zip(xs, ys) {
  var lenx = xs.length;
  var leny = ys.length;
  var len = lenx < leny ? lenx : leny;
  var s = new Array(len);
  for(var i = 0; i < len; ++i){
    s[i] = [
      xs[i],
      ys[i]
    ];
  }
  return s;
}

function zipByU(xs, ys, f) {
  var lenx = xs.length;
  var leny = ys.length;
  var len = lenx < leny ? lenx : leny;
  var s = new Array(len);
  for(var i = 0; i < len; ++i){
    s[i] = f(xs[i], ys[i]);
  }
  return s;
}

function zipBy(xs, ys, f) {
  return zipByU(xs, ys, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__2(f));
}

function concat(a1, a2) {
  var l1 = a1.length;
  var l2 = a2.length;
  var a1a2 = new Array(l1 + l2 | 0);
  for(var i = 0; i < l1; ++i){
    a1a2[i] = a1[i];
  }
  for(var i$1 = 0; i$1 < l2; ++i$1){
    a1a2[l1 + i$1 | 0] = a2[i$1];
  }
  return a1a2;
}

function concatMany(arrs) {
  var lenArrs = arrs.length;
  var totalLen = 0;
  for(var i = 0; i < lenArrs; ++i){
    totalLen = totalLen + arrs[i].length | 0;
  }
  var result = new Array(totalLen);
  totalLen = 0;
  for(var j = 0; j < lenArrs; ++j){
    var cur = arrs[j];
    for(var k = 0 ,k_finish = cur.length; k < k_finish; ++k){
      result[totalLen] = cur[k];
      totalLen = totalLen + 1 | 0;
    }
  }
  return result;
}

function slice(a, offset, len) {
  if (len <= 0) {
    return [];
  }
  var lena = a.length;
  var ofs = offset < 0 ? _caml_js__WEBPACK_IMPORTED_MODULE_0__.caml_int_max(lena + offset | 0, 0) : offset;
  var hasLen = lena - ofs | 0;
  var copyLength = hasLen < len ? hasLen : len;
  if (copyLength <= 0) {
    return [];
  }
  var result = new Array(copyLength);
  for(var i = 0; i < copyLength; ++i){
    result[i] = a[ofs + i | 0];
  }
  return result;
}

function sliceToEnd(a, offset) {
  var lena = a.length;
  var ofs = offset < 0 ? _caml_js__WEBPACK_IMPORTED_MODULE_0__.caml_int_max(lena + offset | 0, 0) : offset;
  var len = lena - ofs | 0;
  var result = new Array(len);
  for(var i = 0; i < len; ++i){
    result[i] = a[ofs + i | 0];
  }
  return result;
}

function fill(a, offset, len, v) {
  if (len <= 0) {
    return ;
  }
  var lena = a.length;
  var ofs = offset < 0 ? _caml_js__WEBPACK_IMPORTED_MODULE_0__.caml_int_max(lena + offset | 0, 0) : offset;
  var hasLen = lena - ofs | 0;
  var fillLength = hasLen < len ? hasLen : len;
  if (fillLength <= 0) {
    return ;
  }
  for(var i = ofs ,i_finish = ofs + fillLength | 0; i < i_finish; ++i){
    a[i] = v;
  }
  
}

function blitUnsafe(a1, srcofs1, a2, srcofs2, blitLength) {
  if (srcofs2 <= srcofs1) {
    for(var j = 0; j < blitLength; ++j){
      a2[j + srcofs2 | 0] = a1[j + srcofs1 | 0];
    }
    return ;
  }
  for(var j$1 = blitLength - 1 | 0; j$1 >= 0; --j$1){
    a2[j$1 + srcofs2 | 0] = a1[j$1 + srcofs1 | 0];
  }
  
}

function blit(a1, ofs1, a2, ofs2, len) {
  var lena1 = a1.length;
  var lena2 = a2.length;
  var srcofs1 = ofs1 < 0 ? _caml_js__WEBPACK_IMPORTED_MODULE_0__.caml_int_max(lena1 + ofs1 | 0, 0) : ofs1;
  var srcofs2 = ofs2 < 0 ? _caml_js__WEBPACK_IMPORTED_MODULE_0__.caml_int_max(lena2 + ofs2 | 0, 0) : ofs2;
  var blitLength = _caml_js__WEBPACK_IMPORTED_MODULE_0__.caml_int_min(len, _caml_js__WEBPACK_IMPORTED_MODULE_0__.caml_int_min(lena1 - srcofs1 | 0, lena2 - srcofs2 | 0));
  if (srcofs2 <= srcofs1) {
    for(var j = 0; j < blitLength; ++j){
      a2[j + srcofs2 | 0] = a1[j + srcofs1 | 0];
    }
    return ;
  }
  for(var j$1 = blitLength - 1 | 0; j$1 >= 0; --j$1){
    a2[j$1 + srcofs2 | 0] = a1[j$1 + srcofs1 | 0];
  }
  
}

function forEachU(a, f) {
  for(var i = 0 ,i_finish = a.length; i < i_finish; ++i){
    f(a[i]);
  }
  
}

function forEach(a, f) {
  return forEachU(a, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__1(f));
}

function mapU(a, f) {
  var l = a.length;
  var r = new Array(l);
  for(var i = 0; i < l; ++i){
    r[i] = f(a[i]);
  }
  return r;
}

function map(a, f) {
  return mapU(a, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__1(f));
}

function getByU(a, p) {
  var l = a.length;
  var i = 0;
  var r;
  while(r === undefined && i < l) {
    var v = a[i];
    if (p(v)) {
      r = _caml_option_js__WEBPACK_IMPORTED_MODULE_3__.some(v);
    }
    i = i + 1 | 0;
  };
  return r;
}

function getBy(a, p) {
  return getByU(a, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__1(p));
}

function getIndexByU(a, p) {
  var l = a.length;
  var i = 0;
  var r;
  while(r === undefined && i < l) {
    var v = a[i];
    if (p(v)) {
      r = i;
    }
    i = i + 1 | 0;
  };
  return r;
}

function getIndexBy(a, p) {
  return getIndexByU(a, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__1(p));
}

function keepU(a, f) {
  var l = a.length;
  var r = new Array(l);
  var j = 0;
  for(var i = 0; i < l; ++i){
    var v = a[i];
    if (f(v)) {
      r[j] = v;
      j = j + 1 | 0;
    }
    
  }
  r.length = j;
  return r;
}

function keep(a, f) {
  return keepU(a, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__1(f));
}

function keepWithIndexU(a, f) {
  var l = a.length;
  var r = new Array(l);
  var j = 0;
  for(var i = 0; i < l; ++i){
    var v = a[i];
    if (f(v, i)) {
      r[j] = v;
      j = j + 1 | 0;
    }
    
  }
  r.length = j;
  return r;
}

function keepWithIndex(a, f) {
  return keepWithIndexU(a, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__2(f));
}

function keepMapU(a, f) {
  var l = a.length;
  var r = new Array(l);
  var j = 0;
  for(var i = 0; i < l; ++i){
    var v = a[i];
    var v$1 = f(v);
    if (v$1 !== undefined) {
      r[j] = _caml_option_js__WEBPACK_IMPORTED_MODULE_3__.valFromOption(v$1);
      j = j + 1 | 0;
    }
    
  }
  r.length = j;
  return r;
}

function keepMap(a, f) {
  return keepMapU(a, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__1(f));
}

function forEachWithIndexU(a, f) {
  for(var i = 0 ,i_finish = a.length; i < i_finish; ++i){
    f(i, a[i]);
  }
  
}

function forEachWithIndex(a, f) {
  return forEachWithIndexU(a, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__2(f));
}

function mapWithIndexU(a, f) {
  var l = a.length;
  var r = new Array(l);
  for(var i = 0; i < l; ++i){
    r[i] = f(i, a[i]);
  }
  return r;
}

function mapWithIndex(a, f) {
  return mapWithIndexU(a, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__2(f));
}

function reduceU(a, x, f) {
  var r = x;
  for(var i = 0 ,i_finish = a.length; i < i_finish; ++i){
    r = f(r, a[i]);
  }
  return r;
}

function reduce(a, x, f) {
  return reduceU(a, x, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__2(f));
}

function reduceReverseU(a, x, f) {
  var r = x;
  for(var i = a.length - 1 | 0; i >= 0; --i){
    r = f(r, a[i]);
  }
  return r;
}

function reduceReverse(a, x, f) {
  return reduceReverseU(a, x, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__2(f));
}

function reduceReverse2U(a, b, x, f) {
  var r = x;
  var len = _caml_js__WEBPACK_IMPORTED_MODULE_0__.caml_int_min(a.length, b.length);
  for(var i = len - 1 | 0; i >= 0; --i){
    r = f(r, a[i], b[i]);
  }
  return r;
}

function reduceReverse2(a, b, x, f) {
  return reduceReverse2U(a, b, x, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__3(f));
}

function reduceWithIndexU(a, x, f) {
  var r = x;
  for(var i = 0 ,i_finish = a.length; i < i_finish; ++i){
    r = f(r, a[i], i);
  }
  return r;
}

function reduceWithIndex(a, x, f) {
  return reduceWithIndexU(a, x, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__3(f));
}

function everyU(arr, b) {
  var len = arr.length;
  var _i = 0;
  while(true) {
    var i = _i;
    if (i === len) {
      return true;
    }
    if (!b(arr[i])) {
      return false;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function every(arr, f) {
  return everyU(arr, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__1(f));
}

function someU(arr, b) {
  var len = arr.length;
  var _i = 0;
  while(true) {
    var i = _i;
    if (i === len) {
      return false;
    }
    if (b(arr[i])) {
      return true;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function some(arr, f) {
  return someU(arr, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__1(f));
}

function everyAux2(arr1, arr2, _i, b, len) {
  while(true) {
    var i = _i;
    if (i === len) {
      return true;
    }
    if (!b(arr1[i], arr2[i])) {
      return false;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function every2U(a, b, p) {
  return everyAux2(a, b, 0, p, _caml_js__WEBPACK_IMPORTED_MODULE_0__.caml_int_min(a.length, b.length));
}

function every2(a, b, p) {
  return every2U(a, b, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__2(p));
}

function some2U(a, b, p) {
  var _i = 0;
  var len = _caml_js__WEBPACK_IMPORTED_MODULE_0__.caml_int_min(a.length, b.length);
  while(true) {
    var i = _i;
    if (i === len) {
      return false;
    }
    if (p(a[i], b[i])) {
      return true;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function some2(a, b, p) {
  return some2U(a, b, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__2(p));
}

function eqU(a, b, p) {
  var lena = a.length;
  var lenb = b.length;
  if (lena === lenb) {
    return everyAux2(a, b, 0, p, lena);
  } else {
    return false;
  }
}

function eq(a, b, p) {
  return eqU(a, b, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__2(p));
}

function cmpU(a, b, p) {
  var lena = a.length;
  var lenb = b.length;
  if (lena > lenb) {
    return 1;
  } else if (lena < lenb) {
    return -1;
  } else {
    var _i = 0;
    while(true) {
      var i = _i;
      if (i === lena) {
        return 0;
      }
      var c = p(a[i], b[i]);
      if (c !== 0) {
        return c;
      }
      _i = i + 1 | 0;
      continue ;
    };
  }
}

function cmp(a, b, p) {
  return cmpU(a, b, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__2(p));
}

function partitionU(a, f) {
  var l = a.length;
  var i = 0;
  var j = 0;
  var a1 = new Array(l);
  var a2 = new Array(l);
  for(var ii = 0; ii < l; ++ii){
    var v = a[ii];
    if (f(v)) {
      a1[i] = v;
      i = i + 1 | 0;
    } else {
      a2[j] = v;
      j = j + 1 | 0;
    }
  }
  a1.length = i;
  a2.length = j;
  return [
          a1,
          a2
        ];
}

function partition(a, f) {
  return partitionU(a, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__1(f));
}

function unzip(a) {
  var l = a.length;
  var a1 = new Array(l);
  var a2 = new Array(l);
  for(var i = 0; i < l; ++i){
    var match = a[i];
    a1[i] = match[0];
    a2[i] = match[1];
  }
  return [
          a1,
          a2
        ];
}

function joinWithU(a, sep, toString) {
  var l = a.length;
  if (l === 0) {
    return "";
  }
  var lastIndex = l - 1 | 0;
  var _i = 0;
  var _res = "";
  while(true) {
    var res = _res;
    var i = _i;
    if (i === lastIndex) {
      return res + toString(a[i]);
    }
    _res = res + (toString(a[i]) + sep);
    _i = i + 1 | 0;
    continue ;
  };
}

function joinWith(a, sep, toString) {
  return joinWithU(a, sep, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__1(toString));
}


/* No side effect */


/***/ }),
/* 27 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "caml_bool_compare": () => (/* binding */ caml_bool_compare),
/* harmony export */   "caml_bool_max": () => (/* binding */ caml_bool_max),
/* harmony export */   "caml_bool_min": () => (/* binding */ caml_bool_min),
/* harmony export */   "caml_float_compare": () => (/* binding */ caml_float_compare),
/* harmony export */   "caml_float_max": () => (/* binding */ caml_float_max),
/* harmony export */   "caml_float_min": () => (/* binding */ caml_float_min),
/* harmony export */   "caml_int32_max": () => (/* binding */ caml_int32_max),
/* harmony export */   "caml_int32_min": () => (/* binding */ caml_int32_min),
/* harmony export */   "caml_int_compare": () => (/* binding */ caml_int_compare),
/* harmony export */   "caml_int_max": () => (/* binding */ caml_int_max),
/* harmony export */   "caml_int_min": () => (/* binding */ caml_int_min),
/* harmony export */   "caml_string_compare": () => (/* binding */ caml_string_compare),
/* harmony export */   "caml_string_max": () => (/* binding */ caml_string_max),
/* harmony export */   "caml_string_min": () => (/* binding */ caml_string_min),
/* harmony export */   "i64_eq": () => (/* binding */ i64_eq),
/* harmony export */   "i64_ge": () => (/* binding */ i64_ge),
/* harmony export */   "i64_gt": () => (/* binding */ i64_gt),
/* harmony export */   "i64_le": () => (/* binding */ i64_le),
/* harmony export */   "i64_lt": () => (/* binding */ i64_lt),
/* harmony export */   "i64_max": () => (/* binding */ i64_max),
/* harmony export */   "i64_min": () => (/* binding */ i64_min),
/* harmony export */   "i64_neq": () => (/* binding */ i64_neq)
/* harmony export */ });



function caml_int_compare(x, y) {
  if (x < y) {
    return -1;
  } else if (x === y) {
    return 0;
  } else {
    return 1;
  }
}

function caml_bool_compare(x, y) {
  if (x) {
    if (y) {
      return 0;
    } else {
      return 1;
    }
  } else if (y) {
    return -1;
  } else {
    return 0;
  }
}

function caml_float_compare(x, y) {
  if (x === y) {
    return 0;
  } else if (x < y) {
    return -1;
  } else if (x > y || x === x) {
    return 1;
  } else if (y === y) {
    return -1;
  } else {
    return 0;
  }
}

function caml_string_compare(s1, s2) {
  if (s1 === s2) {
    return 0;
  } else if (s1 < s2) {
    return -1;
  } else {
    return 1;
  }
}

function caml_bool_min(x, y) {
  if (x) {
    return y;
  } else {
    return x;
  }
}

function caml_int_min(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}

function caml_float_min(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}

function caml_string_min(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}

function caml_int32_min(x, y) {
  if (x < y) {
    return x;
  } else {
    return y;
  }
}

function caml_bool_max(x, y) {
  if (x) {
    return x;
  } else {
    return y;
  }
}

function caml_int_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

function caml_float_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

function caml_string_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

function caml_int32_max(x, y) {
  if (x > y) {
    return x;
  } else {
    return y;
  }
}

function i64_eq(x, y) {
  if (x[1] === y[1]) {
    return x[0] === y[0];
  } else {
    return false;
  }
}

function i64_ge(param, param$1) {
  var other_hi = param$1[0];
  var hi = param[0];
  if (hi > other_hi) {
    return true;
  } else if (hi < other_hi) {
    return false;
  } else {
    return param[1] >= param$1[1];
  }
}

function i64_neq(x, y) {
  return !i64_eq(x, y);
}

function i64_lt(x, y) {
  return !i64_ge(x, y);
}

function i64_gt(x, y) {
  if (x[0] > y[0]) {
    return true;
  } else if (x[0] < y[0]) {
    return false;
  } else {
    return x[1] > y[1];
  }
}

function i64_le(x, y) {
  return !i64_gt(x, y);
}

function i64_min(x, y) {
  if (i64_ge(x, y)) {
    return y;
  } else {
    return x;
  }
}

function i64_max(x, y) {
  if (i64_gt(x, y)) {
    return x;
  } else {
    return y;
  }
}


/* No side effect */


/***/ }),
/* 28 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ceil": () => (/* binding */ ceil),
/* harmony export */   "ceil_int": () => (/* binding */ ceil_int),
/* harmony export */   "floor": () => (/* binding */ floor),
/* harmony export */   "floor_int": () => (/* binding */ floor_int),
/* harmony export */   "random_int": () => (/* binding */ random_int),
/* harmony export */   "unsafe_ceil": () => (/* binding */ unsafe_ceil),
/* harmony export */   "unsafe_floor": () => (/* binding */ unsafe_floor)
/* harmony export */ });
/* harmony import */ var _js_int_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(29);




function unsafe_ceil(prim) {
  return Math.ceil(prim);
}

function ceil_int(f) {
  if (f > _js_int_js__WEBPACK_IMPORTED_MODULE_0__.max) {
    return _js_int_js__WEBPACK_IMPORTED_MODULE_0__.max;
  } else if (f < _js_int_js__WEBPACK_IMPORTED_MODULE_0__.min) {
    return _js_int_js__WEBPACK_IMPORTED_MODULE_0__.min;
  } else {
    return Math.ceil(f);
  }
}

function unsafe_floor(prim) {
  return Math.floor(prim);
}

function floor_int(f) {
  if (f > _js_int_js__WEBPACK_IMPORTED_MODULE_0__.max) {
    return _js_int_js__WEBPACK_IMPORTED_MODULE_0__.max;
  } else if (f < _js_int_js__WEBPACK_IMPORTED_MODULE_0__.min) {
    return _js_int_js__WEBPACK_IMPORTED_MODULE_0__.min;
  } else {
    return Math.floor(f);
  }
}

function random_int(min, max) {
  return floor_int(Math.random() * (max - min | 0)) + min | 0;
}

var ceil = ceil_int;

var floor = floor_int;


/* No side effect */


/***/ }),
/* 29 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "equal": () => (/* binding */ equal),
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "min": () => (/* binding */ min)
/* harmony export */ });



function equal(x, y) {
  return x === y;
}

var max = 2147483647;

var min = -2147483648;


/* No side effect */


/***/ }),
/* 30 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "cmp": () => (/* binding */ cmp),
/* harmony export */   "cmpU": () => (/* binding */ cmpU),
/* harmony export */   "eq": () => (/* binding */ eq),
/* harmony export */   "eqU": () => (/* binding */ eqU),
/* harmony export */   "flatMap": () => (/* binding */ flatMap),
/* harmony export */   "flatMapU": () => (/* binding */ flatMapU),
/* harmony export */   "forEach": () => (/* binding */ forEach),
/* harmony export */   "forEachU": () => (/* binding */ forEachU),
/* harmony export */   "getExn": () => (/* binding */ getExn),
/* harmony export */   "getWithDefault": () => (/* binding */ getWithDefault),
/* harmony export */   "isNone": () => (/* binding */ isNone),
/* harmony export */   "isSome": () => (/* binding */ isSome),
/* harmony export */   "keep": () => (/* binding */ keep),
/* harmony export */   "keepU": () => (/* binding */ keepU),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "mapU": () => (/* binding */ mapU),
/* harmony export */   "mapWithDefault": () => (/* binding */ mapWithDefault),
/* harmony export */   "mapWithDefaultU": () => (/* binding */ mapWithDefaultU)
/* harmony export */ });
/* harmony import */ var _curry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _caml_option_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);





function keepU(opt, p) {
  if (opt !== undefined && p(_caml_option_js__WEBPACK_IMPORTED_MODULE_1__.valFromOption(opt))) {
    return opt;
  }
  
}

function keep(opt, p) {
  return keepU(opt, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__1(p));
}

function forEachU(opt, f) {
  if (opt !== undefined) {
    return f(_caml_option_js__WEBPACK_IMPORTED_MODULE_1__.valFromOption(opt));
  }
  
}

function forEach(opt, f) {
  return forEachU(opt, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__1(f));
}

function getExn(x) {
  if (x !== undefined) {
    return _caml_option_js__WEBPACK_IMPORTED_MODULE_1__.valFromOption(x);
  }
  throw {
        RE_EXN_ID: "Not_found",
        Error: new Error()
      };
}

function mapWithDefaultU(opt, $$default, f) {
  if (opt !== undefined) {
    return f(_caml_option_js__WEBPACK_IMPORTED_MODULE_1__.valFromOption(opt));
  } else {
    return $$default;
  }
}

function mapWithDefault(opt, $$default, f) {
  return mapWithDefaultU(opt, $$default, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__1(f));
}

function mapU(opt, f) {
  if (opt !== undefined) {
    return _caml_option_js__WEBPACK_IMPORTED_MODULE_1__.some(f(_caml_option_js__WEBPACK_IMPORTED_MODULE_1__.valFromOption(opt)));
  }
  
}

function map(opt, f) {
  return mapU(opt, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__1(f));
}

function flatMapU(opt, f) {
  if (opt !== undefined) {
    return f(_caml_option_js__WEBPACK_IMPORTED_MODULE_1__.valFromOption(opt));
  }
  
}

function flatMap(opt, f) {
  return flatMapU(opt, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__1(f));
}

function getWithDefault(opt, $$default) {
  if (opt !== undefined) {
    return _caml_option_js__WEBPACK_IMPORTED_MODULE_1__.valFromOption(opt);
  } else {
    return $$default;
  }
}

function isSome(param) {
  return param !== undefined;
}

function isNone(x) {
  return x === undefined;
}

function eqU(a, b, f) {
  if (a !== undefined) {
    if (b !== undefined) {
      return f(_caml_option_js__WEBPACK_IMPORTED_MODULE_1__.valFromOption(a), _caml_option_js__WEBPACK_IMPORTED_MODULE_1__.valFromOption(b));
    } else {
      return false;
    }
  } else {
    return b === undefined;
  }
}

function eq(a, b, f) {
  return eqU(a, b, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__2(f));
}

function cmpU(a, b, f) {
  if (a !== undefined) {
    if (b !== undefined) {
      return f(_caml_option_js__WEBPACK_IMPORTED_MODULE_1__.valFromOption(a), _caml_option_js__WEBPACK_IMPORTED_MODULE_1__.valFromOption(b));
    } else {
      return 1;
    }
  } else if (b !== undefined) {
    return -1;
  } else {
    return 0;
  }
}

function cmp(a, b, f) {
  return cmpU(a, b, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__2(f));
}


/* No side effect */


/***/ }),
/* 31 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "about": () => (/* binding */ about),
/* harmony export */   "answerDetail": () => (/* binding */ answerDetail),
/* harmony export */   "answerDetailShortAnswer": () => (/* binding */ answerDetailShortAnswer),
/* harmony export */   "clickable": () => (/* binding */ clickable),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "mainBody": () => (/* binding */ mainBody),
/* harmony export */   "settings": () => (/* binding */ settings),
/* harmony export */   "settingsEntry": () => (/* binding */ settingsEntry),
/* harmony export */   "settingsSubmit": () => (/* binding */ settingsSubmit),
/* harmony export */   "settingsSubmitTip": () => (/* binding */ settingsSubmitTip),
/* harmony export */   "uploadImg": () => (/* binding */ uploadImg),
/* harmony export */   "uploadImgConfirm": () => (/* binding */ uploadImgConfirm),
/* harmony export */   "uploadImgImage": () => (/* binding */ uploadImgImage)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(32);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(33);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".KtSQfh45DkzY1g4GTjHG {\n  font-size: 0.75rem;\n  opacity: 0.5;\n}\n.nl0fbl1STsJ1E_ijRd86 {\n  cursor: pointer;\n}\n.E2WC5WHEPccqZwiUT6nE p {\n  margin: 0;\n}\n.E2WC5WHEPccqZwiUT6nE ul {\n  margin: 0;\n  padding-left: 1.5rem;\n}\n.E2WC5WHEPccqZwiUT6nE img {\n  height: auto;\n  width: 80%;\n}\n.yZjHuTE6p_FgmbomqPFx {\n  border-style: groove;\n  border-width: thin;\n  margin: 0.2rem;\n  padding: 0.2rem;\n}\n._o1gebpEn7x9Td7Hes6g {\n  display: flex;\n  flex-direction: column;\n}\n.YalNJJWiNdYPl5FzO1a_ {\n  display: flex;\n  flex-direction: row;\n  margin-bottom: 0.5rem;\n  justify-content: space-between;\n  align-items: center;\n}\n.YalNJJWiNdYPl5FzO1a_ label {\n  font-weight: bold;\n}\n.YalNJJWiNdYPl5FzO1a_ input {\n  height: fit-content;\n  text-align: right;\n}\n.GkQ9CK5Dl58odGzSBLOP {\n  display: flex;\n  flex-direction: column;\n  justify-content: end;\n  align-items: end;\n}\n.CY2oPnMnonyamRy15TxZ {\n  margin-bottom: 0.5rem;\n}\n.GkQ9CK5Dl58odGzSBLOP button {\n  cursor: pointer;\n}\n.ssrv8ndZGNgvTL1Osr92 p {\n  margin-bottom: 0.25rem;\n}\n.ssrv8ndZGNgvTL1Osr92 ul {\n  padding-left: 1.5rem;\n  margin: 0 0 0.25rem 0;\n}\n.ssrv8ndZGNgvTL1Osr92 ul li {\n  margin-bottom: 0.25rem;\n}\n.UJVcq5yyVfeOtVL0dWlT {\n  display: flex;\n  flex-direction: column;\n}\n.UJVcq5yyVfeOtVL0dWlT img {\n  width: 100%;\n  height: auto;\n}\n.SB_KxqWR3Sju8ih5VCQj {\n  border-style: groove;\n  border-width: thin;\n  padding: 0.5rem;\n}\n.YM_eQySt5C11IITqy_br {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n}\n", ""]);
// Exports
var mainBody = "KtSQfh45DkzY1g4GTjHG";
var clickable = "nl0fbl1STsJ1E_ijRd86";
var answerDetail = "E2WC5WHEPccqZwiUT6nE";
var answerDetailShortAnswer = "yZjHuTE6p_FgmbomqPFx";
var settings = "_o1gebpEn7x9Td7Hes6g";
var settingsEntry = "YalNJJWiNdYPl5FzO1a_";
var settingsSubmit = "GkQ9CK5Dl58odGzSBLOP";
var settingsSubmitTip = "CY2oPnMnonyamRy15TxZ";
var about = "ssrv8ndZGNgvTL1Osr92";
var uploadImg = "UJVcq5yyVfeOtVL0dWlT";
var uploadImgImage = "SB_KxqWR3Sju8ih5VCQj";
var uploadImgConfirm = "YM_eQySt5C11IITqy_br";
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 32 */
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 33 */
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
/* 34 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Impl": () => (/* binding */ Impl),
/* harmony export */   "asHtmlElement": () => (/* binding */ asHtmlElement),
/* harmony export */   "insertAdjacentElement": () => (/* binding */ insertAdjacentElement),
/* harmony export */   "insertAdjacentHTML": () => (/* binding */ insertAdjacentHTML),
/* harmony export */   "insertAdjacentText": () => (/* binding */ insertAdjacentText),
/* harmony export */   "nodeType": () => (/* binding */ nodeType),
/* harmony export */   "ofNode": () => (/* binding */ ofNode)
/* harmony export */ });
/* harmony import */ var rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var _Webapi_Dom_Node_bs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(35);
/* harmony import */ var _Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(36);
/* harmony import */ var _Webapi_Dom_Slotable_bs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(38);
/* harmony import */ var _Webapi_Dom_ChildNode_bs_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(39);
/* harmony import */ var _Webapi_Dom_ParentNode_bs_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(40);
/* harmony import */ var _Webapi_Dom_EventTarget_bs_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(37);
/* harmony import */ var _Webapi_Dom_GlobalEventHandlers_bs_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(41);
/* harmony import */ var _Webapi_Dom_NonDocumentTypeChildNode_bs_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(42);












function ofNode(node) {
  if (_Webapi_Dom_Node_bs_js__WEBPACK_IMPORTED_MODULE_1__.nodeType(node) === /* Element */0) {
    return rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_0__.some(node);
  }
  
}

var asHtmlElement = (function(element) {
      if ((window.constructor.name !== undefined && /^HTML\w*Element$/.test(element.constructor.name))
          || (/^\[object HTML\w*Element\]$/.test(element.constructor.toString()))) {
        return element;
      }
    });

function Impl(T) {
  var insertAdjacentElement = function (self, position, element) {
    self.insertAdjacentElement(_Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_2__.encodeInsertPosition(position), element);
    
  };
  var insertAdjacentHTML = function (self, position, text) {
    self.insertAdjacentHTML(_Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_2__.encodeInsertPosition(position), text);
    
  };
  var insertAdjacentText = function (self, position, text) {
    self.insertAdjacentText(_Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_2__.encodeInsertPosition(position), text);
    
  };
  return {
          asHtmlElement: asHtmlElement,
          ofNode: ofNode,
          insertAdjacentElement: insertAdjacentElement,
          insertAdjacentHTML: insertAdjacentHTML,
          insertAdjacentText: insertAdjacentText
        };
}

var include = _Webapi_Dom_Node_bs_js__WEBPACK_IMPORTED_MODULE_1__.Impl({});

_Webapi_Dom_EventTarget_bs_js__WEBPACK_IMPORTED_MODULE_6__.Impl({});

_Webapi_Dom_GlobalEventHandlers_bs_js__WEBPACK_IMPORTED_MODULE_7__.Impl({});

_Webapi_Dom_ParentNode_bs_js__WEBPACK_IMPORTED_MODULE_5__.Impl({});

_Webapi_Dom_NonDocumentTypeChildNode_bs_js__WEBPACK_IMPORTED_MODULE_8__.Impl({});

_Webapi_Dom_ChildNode_bs_js__WEBPACK_IMPORTED_MODULE_4__.Impl({});

_Webapi_Dom_Slotable_bs_js__WEBPACK_IMPORTED_MODULE_3__.Impl({});

function insertAdjacentElement(self, position, element) {
  self.insertAdjacentElement(_Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_2__.encodeInsertPosition(position), element);
  
}

function insertAdjacentHTML(self, position, text) {
  self.insertAdjacentHTML(_Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_2__.encodeInsertPosition(position), text);
  
}

function insertAdjacentText(self, position, text) {
  self.insertAdjacentText(_Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_2__.encodeInsertPosition(position), text);
  
}

var nodeType = include.nodeType;


/* include Not a pure module */


/***/ }),
/* 35 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Impl": () => (/* binding */ Impl),
/* harmony export */   "nodeType": () => (/* binding */ nodeType)
/* harmony export */ });
/* harmony import */ var _Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(36);
/* harmony import */ var _Webapi_Dom_EventTarget_bs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(37);





function Impl(T) {
  var nodeType = function (self) {
    return _Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_0__.decodeNodeType(self.nodeType);
  };
  return {
          nodeType: nodeType
        };
}

_Webapi_Dom_EventTarget_bs_js__WEBPACK_IMPORTED_MODULE_1__.Impl({});

function nodeType(self) {
  return _Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_0__.decodeNodeType(self.nodeType);
}


/*  Not a pure module */


/***/ }),
/* 36 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventPhase": () => (/* binding */ EventPhase),
/* harmony export */   "WhatToShow": () => (/* binding */ WhatToShow),
/* harmony export */   "decodeCompareResult": () => (/* binding */ decodeCompareResult),
/* harmony export */   "decodeCompatMode": () => (/* binding */ decodeCompatMode),
/* harmony export */   "decodeContentEditable": () => (/* binding */ decodeContentEditable),
/* harmony export */   "decodeDeltaMode": () => (/* binding */ decodeDeltaMode),
/* harmony export */   "decodeDesignMode": () => (/* binding */ decodeDesignMode),
/* harmony export */   "decodeDir": () => (/* binding */ decodeDir),
/* harmony export */   "decodeNodeType": () => (/* binding */ decodeNodeType),
/* harmony export */   "decodePointerType": () => (/* binding */ decodePointerType),
/* harmony export */   "decodeReadyState": () => (/* binding */ decodeReadyState),
/* harmony export */   "decodeShadowRootMode": () => (/* binding */ decodeShadowRootMode),
/* harmony export */   "decodeVisibilityState": () => (/* binding */ decodeVisibilityState),
/* harmony export */   "encodeCompareHow": () => (/* binding */ encodeCompareHow),
/* harmony export */   "encodeContentEditable": () => (/* binding */ encodeContentEditable),
/* harmony export */   "encodeDesignMode": () => (/* binding */ encodeDesignMode),
/* harmony export */   "encodeDir": () => (/* binding */ encodeDir),
/* harmony export */   "encodeFilterAction": () => (/* binding */ encodeFilterAction),
/* harmony export */   "encodeInsertPosition": () => (/* binding */ encodeInsertPosition),
/* harmony export */   "encodeModifierKey": () => (/* binding */ encodeModifierKey)
/* harmony export */ });



function encodeCompareHow(x) {
  return x;
}

function decodeCompareResult(x) {
  if ((x + 1 >>> 0) > 2) {
    return /* Unknown */3;
  } else {
    return x + 1 | 0;
  }
}

function decodeCompatMode(x) {
  switch (x) {
    case "BackCompat" :
        return /* BackCompat */0;
    case "CSS1Compat" :
        return /* CSS1Compat */1;
    default:
      return /* Unknown */2;
  }
}

function encodeContentEditable(x) {
  switch (x) {
    case /* True */0 :
        return "true";
    case /* False */1 :
        return "false";
    case /* Inherit */2 :
        return "inherit";
    case /* Unknown */3 :
        return "";
    
  }
}

function decodeContentEditable(x) {
  switch (x) {
    case "false" :
        return /* False */1;
    case "inherit" :
        return /* Inherit */2;
    case "true" :
        return /* True */0;
    default:
      return /* Unknown */3;
  }
}

function decodeDeltaMode(x) {
  if (x > 2 || x < 0) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "invalid deltaMode",
          Error: new Error()
        };
  }
  return x;
}

function encodeDesignMode(x) {
  switch (x) {
    case /* On */0 :
        return "on";
    case /* Off */1 :
        return "off";
    case /* Unknown */2 :
        return "";
    
  }
}

function decodeDesignMode(x) {
  switch (x) {
    case "off" :
        return /* Off */1;
    case "on" :
        return /* On */0;
    default:
      return /* Unknown */2;
  }
}

function encodeDir(x) {
  switch (x) {
    case /* Ltr */0 :
        return "ltr";
    case /* Rtl */1 :
        return "rtl";
    case /* Unknown */2 :
        return "";
    
  }
}

function decodeDir(x) {
  switch (x) {
    case "ltr" :
        return /* Ltr */0;
    case "rtl" :
        return /* Rtl */1;
    default:
      return /* Unknown */2;
  }
}

function decode(x) {
  if (x > 3 || x < 0) {
    return /* Unknown */4;
  } else {
    return x;
  }
}

var EventPhase = {
  decode: decode
};

function encodeFilterAction(x) {
  return x + 1 | 0;
}

function encodeInsertPosition(x) {
  switch (x) {
    case /* BeforeBegin */0 :
        return "beforebegin";
    case /* AfterBegin */1 :
        return "afterbegin";
    case /* BeforeEnd */2 :
        return "beforeend";
    case /* AfterEnd */3 :
        return "afterend";
    
  }
}

function encodeModifierKey(x) {
  switch (x) {
    case /* Alt */0 :
        return "Alt";
    case /* AltGraph */1 :
        return "AltGraph";
    case /* CapsLock */2 :
        return "CapsLock";
    case /* Control */3 :
        return "Control";
    case /* Fn */4 :
        return "Fn";
    case /* FnLock */5 :
        return "FnLock";
    case /* Hyper */6 :
        return "Hyper";
    case /* Meta */7 :
        return "Meta";
    case /* NumLock */8 :
        return "NumLock";
    case /* ScrollLock */9 :
        return "ScrollLock";
    case /* Shift */10 :
        return "Shift";
    case /* Super */11 :
        return "Super";
    case /* Symbol */12 :
        return "Symbol";
    case /* SymbolLock */13 :
        return "SymbolLock";
    
  }
}

function decodeNodeType(x) {
  if (x > 12 || x < 1) {
    return /* Unknown */12;
  } else {
    return x - 1 | 0;
  }
}

function decodePointerType(x) {
  switch (x) {
    case "mouse" :
        return /* Mouse */0;
    case "pen" :
        return /* Pen */1;
    case "touch|" :
        return /* Touch */2;
    default:
      return /* Unknown */3;
  }
}

function decodeReadyState(x) {
  switch (x) {
    case "complete" :
        return /* Complete */2;
    case "interactive" :
        return /* Interactive */1;
    case "loading" :
        return /* Loading */0;
    default:
      return /* Unknown */3;
  }
}

function decodeShadowRootMode(x) {
  switch (x) {
    case "closed" :
        return /* Closed */1;
    case "open" :
        return /* Open */0;
    default:
      throw {
            RE_EXN_ID: "Invalid_argument",
            _1: "Unknown shadowRootMode",
            Error: new Error()
          };
  }
}

function decodeVisibilityState(x) {
  switch (x) {
    case "hidden" :
        return /* Hidden */1;
    case "prerender" :
        return /* Prerender */2;
    case "unloaded" :
        return /* Unloaded */3;
    case "visible" :
        return /* Visible */0;
    default:
      return /* Unknown */4;
  }
}

function many(x) {
  if (x) {
    return x.hd | many(x.tl);
  } else {
    return 0;
  }
}

var WhatToShow = {
  _All: -1,
  _Element: 1,
  _Attribute: 2,
  _Text: 4,
  _CDATASection: 8,
  _EntityReference: 16,
  _Entity: 32,
  _ProcessingInstruction: 64,
  _Comment: 128,
  _Document: 256,
  _DocumentType: 512,
  _DocumentFragment: 1024,
  _Notation: 2048,
  many: many
};


/* No side effect */


/***/ }),
/* 37 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Impl": () => (/* binding */ Impl)
/* harmony export */ });



function Impl(T) {
  return {};
}


/* No side effect */


/***/ }),
/* 38 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Impl": () => (/* binding */ Impl)
/* harmony export */ });



function Impl(T) {
  return {};
}


/* No side effect */


/***/ }),
/* 39 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Impl": () => (/* binding */ Impl)
/* harmony export */ });



function Impl(T) {
  return {};
}


/* No side effect */


/***/ }),
/* 40 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Impl": () => (/* binding */ Impl)
/* harmony export */ });



function Impl(T) {
  return {};
}


/* No side effect */


/***/ }),
/* 41 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Impl": () => (/* binding */ Impl)
/* harmony export */ });



function Impl(T) {
  return {};
}


/* No side effect */


/***/ }),
/* 42 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Impl": () => (/* binding */ Impl)
/* harmony export */ });



function Impl(T) {
  return {};
}


/* No side effect */


/***/ }),
/* 43 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Impl": () => (/* binding */ Impl),
/* harmony export */   "asHtmlDocument": () => (/* binding */ asHtmlDocument),
/* harmony export */   "compatMode": () => (/* binding */ compatMode),
/* harmony export */   "nodeType": () => (/* binding */ nodeType),
/* harmony export */   "ofNode": () => (/* binding */ ofNode),
/* harmony export */   "visibilityState": () => (/* binding */ visibilityState)
/* harmony export */ });
/* harmony import */ var rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var _Webapi_Dom_Node_bs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(35);
/* harmony import */ var _Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(36);
/* harmony import */ var _Webapi_Dom_ParentNode_bs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(40);
/* harmony import */ var _Webapi_Dom_EventTarget_bs_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(37);
/* harmony import */ var _Webapi_Dom_NonElementParentNode_bs_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(44);









function Impl(T) {
  var asHtmlDocument = (function(document) {
      var defaultView = document.defaultView;

      if (defaultView != null) {
        var HTMLDocument = defaultView.HTMLDocument;

        if (HTMLDocument != null && document instanceof HTMLDocument) {
          return document;
        }
      }
    });
  var ofNode = function (node) {
    if (_Webapi_Dom_Node_bs_js__WEBPACK_IMPORTED_MODULE_1__.nodeType(node) === /* Document */8) {
      return rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_0__.some(node);
    }
    
  };
  var compatMode = function (self) {
    return _Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_2__.decodeCompatMode(self.compatMode);
  };
  var visibilityState = function (self) {
    return _Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_2__.decodeVisibilityState(self.visibilityState);
  };
  return {
          asHtmlDocument: asHtmlDocument,
          ofNode: ofNode,
          compatMode: compatMode,
          visibilityState: visibilityState
        };
}

var include = _Webapi_Dom_Node_bs_js__WEBPACK_IMPORTED_MODULE_1__.Impl({});

_Webapi_Dom_EventTarget_bs_js__WEBPACK_IMPORTED_MODULE_4__.Impl({});

_Webapi_Dom_NonElementParentNode_bs_js__WEBPACK_IMPORTED_MODULE_5__.Impl({});

_Webapi_Dom_ParentNode_bs_js__WEBPACK_IMPORTED_MODULE_3__.Impl({});

var asHtmlDocument = (function(document) {
      var defaultView = document.defaultView;

      if (defaultView != null) {
        var HTMLDocument = defaultView.HTMLDocument;

        if (HTMLDocument != null && document instanceof HTMLDocument) {
          return document;
        }
      }
    });

function ofNode(node) {
  if (_Webapi_Dom_Node_bs_js__WEBPACK_IMPORTED_MODULE_1__.nodeType(node) === /* Document */8) {
    return rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_0__.some(node);
  }
  
}

function compatMode(self) {
  return _Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_2__.decodeCompatMode(self.compatMode);
}

function visibilityState(self) {
  return _Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_2__.decodeVisibilityState(self.visibilityState);
}

var nodeType = include.nodeType;


/* include Not a pure module */


/***/ }),
/* 44 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Impl": () => (/* binding */ Impl)
/* harmony export */ });



function Impl(T) {
  return {};
}


/* No side effect */


/***/ }),
/* 45 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Answer": () => (/* binding */ Answer),
/* harmony export */   "Blank": () => (/* binding */ Blank),
/* harmony export */   "Choice": () => (/* binding */ Choice),
/* harmony export */   "Detail": () => (/* binding */ Detail),
/* harmony export */   "React": () => (/* binding */ React),
/* harmony export */   "ReactDOMRe": () => (/* binding */ ReactDOMRe),
/* harmony export */   "ShortAnswer": () => (/* binding */ ShortAnswer),
/* harmony export */   "Tooltip": () => (/* binding */ Tooltip),
/* harmony export */   "percent": () => (/* binding */ percent),
/* harmony export */   "sortByKey": () => (/* binding */ sortByKey),
/* harmony export */   "style": () => (/* binding */ style)
/* harmony export */ });
/* harmony import */ var rescript_lib_es6_curry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _Utils_bs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(25);
/* harmony import */ var rescript_lib_es6_string_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(46);
/* harmony import */ var rescript_lib_es6_js_dict_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(52);
/* harmony import */ var rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(26);
/* harmony import */ var rescript_lib_es6_caml_int32_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(53);
/* harmony import */ var rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(30);
/* harmony import */ var rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(17);
/* harmony import */ var rescript_lib_es6_belt_MapString_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(54);
/* harmony import */ var rescript_lib_es6_belt_SortArray_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(56);
/* harmony import */ var _style_mod_less__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(31);
/* harmony import */ var rescript_lib_es6_belt_SortArrayString_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(58);
// Generated by ReScript, PLEASE EDIT WITH CARE















var style = _style_mod_less__WEBPACK_IMPORTED_MODULE_11__;

var Answer = {};

function make(ele) {
  return {
          ele: ele
        };
}

function setContent($$this, text) {
  $$this.ele.setAttribute("title", text);
  
}

var Tooltip = {
  make: make,
  setContent: setContent
};

function Make(T) {
  var showDetail = function ($$this, top, left) {
    var match = _Utils_bs_js__WEBPACK_IMPORTED_MODULE_2__.openWin("详细答案", 200, 300, left, top, undefined);
    match[1].appendChild(rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_7__.getExn(_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.toNode(_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("div", {
                      className: _Utils_bs_js__WEBPACK_IMPORTED_MODULE_2__.joinStrings([
                            style.mainBody,
                            style.answerDetail
                          ], " ")
                    }, [$$this.detailHtml]))));
    
  };
  var make = function (subjectItem, extra) {
    var $$this = {
      detail: undefined,
      detailHtml: null,
      context: rescript_lib_es6_curry_js__WEBPACK_IMPORTED_MODULE_0__._2(T.make, subjectItem, extra)
    };
    var itemType = rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_7__.getExn(rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_8__.nullable_to_opt(subjectItem.querySelector(".item-type")));
    itemType.classList.add(style.clickable);
    itemType.addEventListener("click", (function (param) {
            var rect = itemType.getBoundingClientRect();
            return showDetail($$this, rect.top | 0, rect.left | 0);
          }));
    return $$this;
  };
  var updateAnswer = function ($$this, username, answer) {
    $$this.detail = rescript_lib_es6_belt_MapString_js__WEBPACK_IMPORTED_MODULE_9__.set($$this.detail, username, answer);
    
  };
  var updateUI = function ($$this) {
    $$this.detailHtml = rescript_lib_es6_curry_js__WEBPACK_IMPORTED_MODULE_0__._2(T.updateUI, $$this.detail, $$this.context);
    
  };
  return {
          showDetail: showDetail,
          make: make,
          updateAnswer: updateAnswer,
          updateUI: updateUI
        };
}

var Detail = {
  Make: Make
};

function percent(a, b) {
  return String(rescript_lib_es6_caml_int32_js__WEBPACK_IMPORTED_MODULE_6__.div(Math.imul(a, 100), b)) + "%";
}

function sortByKey(arr) {
  return rescript_lib_es6_belt_SortArray_js__WEBPACK_IMPORTED_MODULE_10__.stableSortBy(arr, (function (param, param$1) {
                return rescript_lib_es6_string_js__WEBPACK_IMPORTED_MODULE_3__.compare(param[0], param$1[0]);
              }));
}

function make$1(subjectItem, extra) {
  return {
          tooltips: rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_5__.reduceWithIndex(_Utils_bs_js__WEBPACK_IMPORTED_MODULE_2__.querySelectorAllElements(subjectItem, ".item-body .checkboxInput, .item-body .radioInput"), undefined, (function (tooltips, ele, idx) {
                  return rescript_lib_es6_belt_MapString_js__WEBPACK_IMPORTED_MODULE_9__.set(tooltips, String.fromCharCode(idx + 65 | 0), {
                              ele: ele
                            });
                })),
          choiceMap: extra
        };
}

function updateUI(detail, context) {
  return rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_5__.map(sortByKey(rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_5__.map(rescript_lib_es6_belt_MapString_js__WEBPACK_IMPORTED_MODULE_9__.toArray(rescript_lib_es6_belt_MapString_js__WEBPACK_IMPORTED_MODULE_9__.reduce(detail, undefined, (function (choiceToUsers, user, choices) {
                                return rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_5__.reduce(choices, choiceToUsers, (function (choiceToUsers, choice) {
                                              return rescript_lib_es6_belt_MapString_js__WEBPACK_IMPORTED_MODULE_9__.update(choiceToUsers, choice, (function (users) {
                                                            return rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_5__.concat(rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_7__.getWithDefault(users, []), [user]);
                                                          }));
                                            }));
                              }))), (function (param) {
                        return [
                                rescript_lib_es6_curry_js__WEBPACK_IMPORTED_MODULE_0__._1(context.choiceMap, param[0]),
                                param[1]
                              ];
                      }))), (function (param) {
                var users = param[1];
                var choice = param[0];
                rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_7__.forEach(rescript_lib_es6_belt_MapString_js__WEBPACK_IMPORTED_MODULE_9__.get(context.tooltips, choice), (function (__x) {
                        return setContent(__x, percent(users.length, rescript_lib_es6_belt_MapString_js__WEBPACK_IMPORTED_MODULE_9__.size(detail)));
                      }));
                return _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("div", undefined, [
                            _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("p", undefined, [_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("strong", undefined, [choice])]),
                            _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.createElement(_Utils_bs_js__WEBPACK_IMPORTED_MODULE_2__.UList.make, {
                                  children: rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_5__.map(rescript_lib_es6_belt_SortArrayString_js__WEBPACK_IMPORTED_MODULE_12__.stableSort(users), (function (user) {
                                          return _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("p", undefined, [user]);
                                        }))
                                })
                          ]);
              }));
}

function showDetail($$this, top, left) {
  var match = _Utils_bs_js__WEBPACK_IMPORTED_MODULE_2__.openWin("详细答案", 200, 300, left, top, undefined);
  match[1].appendChild(rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_7__.getExn(_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.toNode(_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("div", {
                    className: _Utils_bs_js__WEBPACK_IMPORTED_MODULE_2__.joinStrings([
                          style.mainBody,
                          style.answerDetail
                        ], " ")
                  }, [$$this.detailHtml]))));
  
}

function make$2(subjectItem, extra) {
  var $$this = {
    detail: undefined,
    detailHtml: null,
    context: make$1(subjectItem, extra)
  };
  var itemType = rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_7__.getExn(rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_8__.nullable_to_opt(subjectItem.querySelector(".item-type")));
  itemType.classList.add(style.clickable);
  itemType.addEventListener("click", (function (param) {
          var rect = itemType.getBoundingClientRect();
          return showDetail($$this, rect.top | 0, rect.left | 0);
        }));
  return $$this;
}

function updateAnswer($$this, username, answer) {
  $$this.detail = rescript_lib_es6_belt_MapString_js__WEBPACK_IMPORTED_MODULE_9__.set($$this.detail, username, answer);
  
}

function updateUI$1($$this) {
  $$this.detailHtml = updateUI($$this.detail, $$this.context);
  
}

var Choice = {
  showDetail: showDetail,
  make: make$2,
  updateAnswer: updateAnswer,
  updateUI: updateUI$1
};

function make$3(subjectItem, param) {
  return {
          tooltips: rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_5__.reduceWithIndex(_Utils_bs_js__WEBPACK_IMPORTED_MODULE_2__.querySelectorAllElements(subjectItem, ".item-body .blank-item-dynamic"), undefined, (function (tooltips, ele, idx) {
                  return rescript_lib_es6_belt_MapString_js__WEBPACK_IMPORTED_MODULE_9__.set(tooltips, String.fromCharCode(49 + idx | 0), {
                              ele: ele
                            });
                }))
        };
}

function updateUI$2(detail, context) {
  return rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_5__.map(sortByKey(rescript_lib_es6_belt_MapString_js__WEBPACK_IMPORTED_MODULE_9__.toArray(rescript_lib_es6_belt_MapString_js__WEBPACK_IMPORTED_MODULE_9__.reduce(detail, undefined, (function (blankToFillToUsers, user, blankToFill) {
                            return rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_5__.reduce(sortByKey(rescript_lib_es6_js_dict_js__WEBPACK_IMPORTED_MODULE_4__.entries(blankToFill)), blankToFillToUsers, (function (blankToFillToUsers, param) {
                                          var fill = param[1];
                                          return rescript_lib_es6_belt_MapString_js__WEBPACK_IMPORTED_MODULE_9__.update(blankToFillToUsers, param[0], (function (fillToUsers) {
                                                        return rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_8__.some(rescript_lib_es6_belt_MapString_js__WEBPACK_IMPORTED_MODULE_9__.update(rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_7__.getWithDefault(fillToUsers, undefined), fill, (function (users) {
                                                                          return rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_5__.concat(rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_7__.getWithDefault(users, []), [user]);
                                                                        })));
                                                      }));
                                        }));
                          })))), (function (param) {
                var blank = param[0];
                var fillToUsers = sortByKey(rescript_lib_es6_belt_MapString_js__WEBPACK_IMPORTED_MODULE_9__.toArray(param[1]));
                rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_7__.forEach(rescript_lib_es6_belt_MapString_js__WEBPACK_IMPORTED_MODULE_9__.get(context.tooltips, blank), (function (__x) {
                        return setContent(__x, rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_7__.mapWithDefault(rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_5__.get(rescript_lib_es6_belt_SortArray_js__WEBPACK_IMPORTED_MODULE_10__.stableSortBy(rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_5__.map(fillToUsers, (function (param) {
                                                      return [
                                                              param[0],
                                                              param[1].length
                                                            ];
                                                    })), (function (param, param$1) {
                                                  return param$1[1] - param[1] | 0;
                                                })), 0), "", (function (param) {
                                          return "(" + percent(param[1], rescript_lib_es6_belt_MapString_js__WEBPACK_IMPORTED_MODULE_9__.size(detail)) + ") " + param[0];
                                        })));
                      }));
                return _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("div", undefined, [
                            _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("p", undefined, [_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("strong", undefined, ["#" + blank])]),
                            _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.createElement(_Utils_bs_js__WEBPACK_IMPORTED_MODULE_2__.UList.make, {
                                  children: rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_5__.map(fillToUsers, (function (param) {
                                          return _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("div", undefined, [
                                                      _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("p", undefined, [param[0]]),
                                                      _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.createElement(_Utils_bs_js__WEBPACK_IMPORTED_MODULE_2__.UList.make, {
                                                            children: rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_5__.map(rescript_lib_es6_belt_SortArrayString_js__WEBPACK_IMPORTED_MODULE_12__.stableSort(param[1]), (function (user) {
                                                                    return _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("p", undefined, [user]);
                                                                  }))
                                                          })
                                                    ]);
                                        }))
                                })
                          ]);
              }));
}

function showDetail$1($$this, top, left) {
  var match = _Utils_bs_js__WEBPACK_IMPORTED_MODULE_2__.openWin("详细答案", 200, 300, left, top, undefined);
  match[1].appendChild(rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_7__.getExn(_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.toNode(_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("div", {
                    className: _Utils_bs_js__WEBPACK_IMPORTED_MODULE_2__.joinStrings([
                          style.mainBody,
                          style.answerDetail
                        ], " ")
                  }, [$$this.detailHtml]))));
  
}

function make$4(subjectItem, extra) {
  var $$this = {
    detail: undefined,
    detailHtml: null,
    context: make$3(subjectItem, extra)
  };
  var itemType = rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_7__.getExn(rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_8__.nullable_to_opt(subjectItem.querySelector(".item-type")));
  itemType.classList.add(style.clickable);
  itemType.addEventListener("click", (function (param) {
          var rect = itemType.getBoundingClientRect();
          return showDetail$1($$this, rect.top | 0, rect.left | 0);
        }));
  return $$this;
}

function updateAnswer$1($$this, username, answer) {
  $$this.detail = rescript_lib_es6_belt_MapString_js__WEBPACK_IMPORTED_MODULE_9__.set($$this.detail, username, answer);
  
}

function updateUI$3($$this) {
  $$this.detailHtml = updateUI$2($$this.detail, $$this.context);
  
}

var Blank = {
  showDetail: showDetail$1,
  make: make$4,
  updateAnswer: updateAnswer$1,
  updateUI: updateUI$3
};

function make$5(param, param$1) {
  
}

function updateUI$4(detail, param) {
  return rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_5__.map(sortByKey(rescript_lib_es6_belt_MapString_js__WEBPACK_IMPORTED_MODULE_9__.toArray(detail)), (function (param) {
                var text = param[1];
                return _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("div", undefined, [
                            _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("p", undefined, [_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("strong", undefined, [param[0]])]),
                            rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_7__.mapWithDefault(text.content, null, (function (htm) {
                                    return _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("div", {
                                                className: style.answerDetailShortAnswer,
                                                dangerouslySetInnerHTML: {
                                                  __html: htm
                                                }
                                              }, []);
                                  })),
                            rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_7__.mapWithDefault(rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_7__.flatMap(text.attachments, (function (attachments) {
                                        return attachments.filelist;
                                      })), null, (function (attachments) {
                                    return _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.createElement(_Utils_bs_js__WEBPACK_IMPORTED_MODULE_2__.UList.make, {
                                                children: rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_5__.map(attachments, (function (atta) {
                                                        return _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("a", {
                                                                    href: atta.fileUrl
                                                                  }, [atta.fileName]);
                                                      }))
                                              });
                                  })),
                            _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("div", undefined, [])
                          ]);
              }));
}

function showDetail$2($$this, top, left) {
  var match = _Utils_bs_js__WEBPACK_IMPORTED_MODULE_2__.openWin("详细答案", 200, 300, left, top, undefined);
  match[1].appendChild(rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_7__.getExn(_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.toNode(_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("div", {
                    className: _Utils_bs_js__WEBPACK_IMPORTED_MODULE_2__.joinStrings([
                          style.mainBody,
                          style.answerDetail
                        ], " ")
                  }, [$$this.detailHtml]))));
  
}

function make$6(subjectItem, extra) {
  var $$this = {
    detail: undefined,
    detailHtml: null,
    context: make$5(subjectItem, extra)
  };
  var itemType = rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_7__.getExn(rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_8__.nullable_to_opt(subjectItem.querySelector(".item-type")));
  itemType.classList.add(style.clickable);
  itemType.addEventListener("click", (function (param) {
          var rect = itemType.getBoundingClientRect();
          return showDetail$2($$this, rect.top | 0, rect.left | 0);
        }));
  return $$this;
}

function updateAnswer$2($$this, username, answer) {
  $$this.detail = rescript_lib_es6_belt_MapString_js__WEBPACK_IMPORTED_MODULE_9__.set($$this.detail, username, answer);
  
}

function updateUI$5($$this) {
  $$this.detailHtml = updateUI$4($$this.detail, $$this.context);
  
}

var ShortAnswer = {
  showDetail: showDetail$2,
  make: make$6,
  updateAnswer: updateAnswer$2,
  updateUI: updateUI$5
};

var React;

var ReactDOMRe;


/* style Not a pure module */


/***/ }),
/* 46 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "blit": () => (/* binding */ blit),
/* harmony export */   "capitalize": () => (/* binding */ capitalize),
/* harmony export */   "capitalize_ascii": () => (/* binding */ capitalize_ascii),
/* harmony export */   "compare": () => (/* binding */ compare),
/* harmony export */   "concat": () => (/* binding */ concat),
/* harmony export */   "contains": () => (/* binding */ contains),
/* harmony export */   "contains_from": () => (/* binding */ contains_from),
/* harmony export */   "equal": () => (/* binding */ equal),
/* harmony export */   "escaped": () => (/* binding */ escaped),
/* harmony export */   "index": () => (/* binding */ index),
/* harmony export */   "index_from": () => (/* binding */ index_from),
/* harmony export */   "index_from_opt": () => (/* binding */ index_from_opt),
/* harmony export */   "index_opt": () => (/* binding */ index_opt),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "iter": () => (/* binding */ iter),
/* harmony export */   "iteri": () => (/* binding */ iteri),
/* harmony export */   "lowercase": () => (/* binding */ lowercase),
/* harmony export */   "lowercase_ascii": () => (/* binding */ lowercase_ascii),
/* harmony export */   "make": () => (/* binding */ make),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "mapi": () => (/* binding */ mapi),
/* harmony export */   "rcontains_from": () => (/* binding */ rcontains_from),
/* harmony export */   "rindex": () => (/* binding */ rindex),
/* harmony export */   "rindex_from": () => (/* binding */ rindex_from),
/* harmony export */   "rindex_from_opt": () => (/* binding */ rindex_from_opt),
/* harmony export */   "rindex_opt": () => (/* binding */ rindex_opt),
/* harmony export */   "split_on_char": () => (/* binding */ split_on_char),
/* harmony export */   "sub": () => (/* binding */ sub),
/* harmony export */   "trim": () => (/* binding */ trim),
/* harmony export */   "uncapitalize": () => (/* binding */ uncapitalize),
/* harmony export */   "uncapitalize_ascii": () => (/* binding */ uncapitalize_ascii),
/* harmony export */   "uppercase": () => (/* binding */ uppercase),
/* harmony export */   "uppercase_ascii": () => (/* binding */ uppercase_ascii)
/* harmony export */ });
/* harmony import */ var _caml_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27);
/* harmony import */ var _bytes_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(47);
/* harmony import */ var _curry_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(49);
/* harmony import */ var _caml_string_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(51);
/* harmony import */ var _caml_js_exceptions_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(50);









function init(n, f) {
  return _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_to_string(_bytes_js__WEBPACK_IMPORTED_MODULE_1__.init(n, f));
}

function sub(s, ofs, len) {
  return _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_to_string(_bytes_js__WEBPACK_IMPORTED_MODULE_1__.sub(_caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_of_string(s), ofs, len));
}

function ensure_ge(x, y) {
  if (x >= y) {
    return x;
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "String.concat",
        Error: new Error()
      };
}

function sum_lengths(_acc, seplen, _param) {
  while(true) {
    var param = _param;
    var acc = _acc;
    if (!param) {
      return acc;
    }
    var tl = param.tl;
    var hd = param.hd;
    if (!tl) {
      return hd.length + acc | 0;
    }
    _param = tl;
    _acc = ensure_ge((hd.length + seplen | 0) + acc | 0, acc);
    continue ;
  };
}

function unsafe_blits(dst, _pos, sep, seplen, _param) {
  while(true) {
    var param = _param;
    var pos = _pos;
    if (!param) {
      return dst;
    }
    var tl = param.tl;
    var hd = param.hd;
    if (tl) {
      _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_blit_string(hd, 0, dst, pos, hd.length);
      _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_blit_string(sep, 0, dst, pos + hd.length | 0, seplen);
      _param = tl;
      _pos = (pos + hd.length | 0) + seplen | 0;
      continue ;
    }
    _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_blit_string(hd, 0, dst, pos, hd.length);
    return dst;
  };
}

function concat(sep, l) {
  if (!l) {
    return "";
  }
  var seplen = sep.length;
  return _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_to_string(unsafe_blits(_caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_create_bytes(sum_lengths(0, seplen, l)), 0, sep, seplen, l));
}

function iter(f, s) {
  for(var i = 0 ,i_finish = s.length; i < i_finish; ++i){
    _curry_js__WEBPACK_IMPORTED_MODULE_2__._1(f, s.charCodeAt(i));
  }
  
}

function iteri(f, s) {
  for(var i = 0 ,i_finish = s.length; i < i_finish; ++i){
    _curry_js__WEBPACK_IMPORTED_MODULE_2__._2(f, i, s.charCodeAt(i));
  }
  
}

function map(f, s) {
  return _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_to_string(_bytes_js__WEBPACK_IMPORTED_MODULE_1__.map(f, _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_of_string(s)));
}

function mapi(f, s) {
  return _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_to_string(_bytes_js__WEBPACK_IMPORTED_MODULE_1__.mapi(f, _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_of_string(s)));
}

function is_space(param) {
  if (param > 13 || param < 9) {
    return param === 32;
  } else {
    return param !== 11;
  }
}

function trim(s) {
  if (s === "" || !(is_space(s.charCodeAt(0)) || is_space(s.charCodeAt(s.length - 1 | 0)))) {
    return s;
  } else {
    return _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_to_string(_bytes_js__WEBPACK_IMPORTED_MODULE_1__.trim(_caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_of_string(s)));
  }
}

function escaped(s) {
  var needs_escape = function (_i) {
    while(true) {
      var i = _i;
      if (i >= s.length) {
        return false;
      }
      var match = s.charCodeAt(i);
      if (match < 32) {
        return true;
      }
      if (match > 92 || match < 34) {
        if (match >= 127) {
          return true;
        }
        _i = i + 1 | 0;
        continue ;
      }
      if (match > 91 || match < 35) {
        return true;
      }
      _i = i + 1 | 0;
      continue ;
    };
  };
  if (needs_escape(0)) {
    return _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_to_string(_bytes_js__WEBPACK_IMPORTED_MODULE_1__.escaped(_caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_of_string(s)));
  } else {
    return s;
  }
}

function index_rec(s, lim, _i, c) {
  while(true) {
    var i = _i;
    if (i >= lim) {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }
    if (s.charCodeAt(i) === c) {
      return i;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function index(s, c) {
  return index_rec(s, s.length, 0, c);
}

function index_rec_opt(s, lim, _i, c) {
  while(true) {
    var i = _i;
    if (i >= lim) {
      return ;
    }
    if (s.charCodeAt(i) === c) {
      return i;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function index_opt(s, c) {
  return index_rec_opt(s, s.length, 0, c);
}

function index_from(s, i, c) {
  var l = s.length;
  if (i < 0 || i > l) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.index_from / Bytes.index_from",
          Error: new Error()
        };
  }
  return index_rec(s, l, i, c);
}

function index_from_opt(s, i, c) {
  var l = s.length;
  if (i < 0 || i > l) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.index_from_opt / Bytes.index_from_opt",
          Error: new Error()
        };
  }
  return index_rec_opt(s, l, i, c);
}

function rindex_rec(s, _i, c) {
  while(true) {
    var i = _i;
    if (i < 0) {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }
    if (s.charCodeAt(i) === c) {
      return i;
    }
    _i = i - 1 | 0;
    continue ;
  };
}

function rindex(s, c) {
  return rindex_rec(s, s.length - 1 | 0, c);
}

function rindex_from(s, i, c) {
  if (i < -1 || i >= s.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.rindex_from / Bytes.rindex_from",
          Error: new Error()
        };
  }
  return rindex_rec(s, i, c);
}

function rindex_rec_opt(s, _i, c) {
  while(true) {
    var i = _i;
    if (i < 0) {
      return ;
    }
    if (s.charCodeAt(i) === c) {
      return i;
    }
    _i = i - 1 | 0;
    continue ;
  };
}

function rindex_opt(s, c) {
  return rindex_rec_opt(s, s.length - 1 | 0, c);
}

function rindex_from_opt(s, i, c) {
  if (i < -1 || i >= s.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.rindex_from_opt / Bytes.rindex_from_opt",
          Error: new Error()
        };
  }
  return rindex_rec_opt(s, i, c);
}

function contains_from(s, i, c) {
  var l = s.length;
  if (i < 0 || i > l) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.contains_from / Bytes.contains_from",
          Error: new Error()
        };
  }
  try {
    index_rec(s, l, i, c);
    return true;
  }
  catch (raw_exn){
    var exn = _caml_js_exceptions_js__WEBPACK_IMPORTED_MODULE_5__.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Not_found") {
      return false;
    }
    throw exn;
  }
}

function contains(s, c) {
  return contains_from(s, 0, c);
}

function rcontains_from(s, i, c) {
  if (i < 0 || i >= s.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.rcontains_from / Bytes.rcontains_from",
          Error: new Error()
        };
  }
  try {
    rindex_rec(s, i, c);
    return true;
  }
  catch (raw_exn){
    var exn = _caml_js_exceptions_js__WEBPACK_IMPORTED_MODULE_5__.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Not_found") {
      return false;
    }
    throw exn;
  }
}

function uppercase_ascii(s) {
  return _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_to_string(_bytes_js__WEBPACK_IMPORTED_MODULE_1__.uppercase_ascii(_caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_of_string(s)));
}

function lowercase_ascii(s) {
  return _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_to_string(_bytes_js__WEBPACK_IMPORTED_MODULE_1__.lowercase_ascii(_caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_of_string(s)));
}

function capitalize_ascii(s) {
  return _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_to_string(_bytes_js__WEBPACK_IMPORTED_MODULE_1__.capitalize_ascii(_caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_of_string(s)));
}

function uncapitalize_ascii(s) {
  return _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_to_string(_bytes_js__WEBPACK_IMPORTED_MODULE_1__.uncapitalize_ascii(_caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_of_string(s)));
}

var compare = _caml_js__WEBPACK_IMPORTED_MODULE_0__.caml_string_compare;

function split_on_char(sep, s) {
  var r = /* [] */0;
  var j = s.length;
  for(var i = s.length - 1 | 0; i >= 0; --i){
    if (s.charCodeAt(i) === sep) {
      r = {
        hd: sub(s, i + 1 | 0, (j - i | 0) - 1 | 0),
        tl: r
      };
      j = i;
    }
    
  }
  return {
          hd: sub(s, 0, j),
          tl: r
        };
}

function uppercase(s) {
  return _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_to_string(_bytes_js__WEBPACK_IMPORTED_MODULE_1__.uppercase(_caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_of_string(s)));
}

function lowercase(s) {
  return _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_to_string(_bytes_js__WEBPACK_IMPORTED_MODULE_1__.lowercase(_caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_of_string(s)));
}

function capitalize(s) {
  return _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_to_string(_bytes_js__WEBPACK_IMPORTED_MODULE_1__.capitalize(_caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_of_string(s)));
}

function uncapitalize(s) {
  return _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_to_string(_bytes_js__WEBPACK_IMPORTED_MODULE_1__.uncapitalize(_caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_of_string(s)));
}

var make = _caml_string_js__WEBPACK_IMPORTED_MODULE_4__.make;

var blit = _bytes_js__WEBPACK_IMPORTED_MODULE_1__.blit_string;

function equal(prim0, prim1) {
  return prim0 === prim1;
}


/* No side effect */


/***/ }),
/* 47 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "blit": () => (/* binding */ blit),
/* harmony export */   "blit_string": () => (/* binding */ blit_string),
/* harmony export */   "capitalize": () => (/* binding */ capitalize),
/* harmony export */   "capitalize_ascii": () => (/* binding */ capitalize_ascii),
/* harmony export */   "cat": () => (/* binding */ cat),
/* harmony export */   "compare": () => (/* binding */ compare),
/* harmony export */   "concat": () => (/* binding */ concat),
/* harmony export */   "contains": () => (/* binding */ contains),
/* harmony export */   "contains_from": () => (/* binding */ contains_from),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "equal": () => (/* binding */ equal),
/* harmony export */   "escaped": () => (/* binding */ escaped),
/* harmony export */   "extend": () => (/* binding */ extend),
/* harmony export */   "fill": () => (/* binding */ fill),
/* harmony export */   "index": () => (/* binding */ index),
/* harmony export */   "index_from": () => (/* binding */ index_from),
/* harmony export */   "index_from_opt": () => (/* binding */ index_from_opt),
/* harmony export */   "index_opt": () => (/* binding */ index_opt),
/* harmony export */   "init": () => (/* binding */ init),
/* harmony export */   "iter": () => (/* binding */ iter),
/* harmony export */   "iteri": () => (/* binding */ iteri),
/* harmony export */   "lowercase": () => (/* binding */ lowercase),
/* harmony export */   "lowercase_ascii": () => (/* binding */ lowercase_ascii),
/* harmony export */   "make": () => (/* binding */ make),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "mapi": () => (/* binding */ mapi),
/* harmony export */   "of_string": () => (/* binding */ of_string),
/* harmony export */   "rcontains_from": () => (/* binding */ rcontains_from),
/* harmony export */   "rindex": () => (/* binding */ rindex),
/* harmony export */   "rindex_from": () => (/* binding */ rindex_from),
/* harmony export */   "rindex_from_opt": () => (/* binding */ rindex_from_opt),
/* harmony export */   "rindex_opt": () => (/* binding */ rindex_opt),
/* harmony export */   "sub": () => (/* binding */ sub),
/* harmony export */   "sub_string": () => (/* binding */ sub_string),
/* harmony export */   "to_string": () => (/* binding */ to_string),
/* harmony export */   "trim": () => (/* binding */ trim),
/* harmony export */   "uncapitalize": () => (/* binding */ uncapitalize),
/* harmony export */   "uncapitalize_ascii": () => (/* binding */ uncapitalize_ascii),
/* harmony export */   "unsafe_of_string": () => (/* binding */ unsafe_of_string),
/* harmony export */   "unsafe_to_string": () => (/* binding */ unsafe_to_string),
/* harmony export */   "uppercase": () => (/* binding */ uppercase),
/* harmony export */   "uppercase_ascii": () => (/* binding */ uppercase_ascii)
/* harmony export */ });
/* harmony import */ var _caml_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27);
/* harmony import */ var _char_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(48);
/* harmony import */ var _curry_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(13);
/* harmony import */ var _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(49);
/* harmony import */ var _caml_js_exceptions_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(50);








function make(n, c) {
  var s = _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_create_bytes(n);
  _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_fill_bytes(s, 0, n, c);
  return s;
}

function init(n, f) {
  var s = _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_create_bytes(n);
  for(var i = 0; i < n; ++i){
    s[i] = _curry_js__WEBPACK_IMPORTED_MODULE_2__._1(f, i);
  }
  return s;
}

var empty = [];

function copy(s) {
  var len = s.length;
  var r = _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_create_bytes(len);
  _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_blit_bytes(s, 0, r, 0, len);
  return r;
}

function to_string(b) {
  return _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_to_string(copy(b));
}

function of_string(s) {
  return copy(_caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_of_string(s));
}

function sub(s, ofs, len) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.sub / Bytes.sub",
          Error: new Error()
        };
  }
  var r = _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_create_bytes(len);
  _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_blit_bytes(s, ofs, r, 0, len);
  return r;
}

function sub_string(b, ofs, len) {
  return _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_to_string(sub(b, ofs, len));
}

function $plus$plus(a, b) {
  var c = a + b | 0;
  var match = a < 0;
  var match$1 = b < 0;
  var match$2 = c < 0;
  if (match) {
    if (!match$1) {
      return c;
    }
    if (match$2) {
      return c;
    }
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Bytes.extend",
          Error: new Error()
        };
  }
  if (match$1) {
    return c;
  }
  if (match$2) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Bytes.extend",
          Error: new Error()
        };
  }
  return c;
}

function extend(s, left, right) {
  var len = $plus$plus($plus$plus(s.length, left), right);
  var r = _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_create_bytes(len);
  var match = left < 0 ? [
      -left | 0,
      0
    ] : [
      0,
      left
    ];
  var dstoff = match[1];
  var srcoff = match[0];
  var cpylen = _caml_js__WEBPACK_IMPORTED_MODULE_0__.caml_int_min(s.length - srcoff | 0, len - dstoff | 0);
  if (cpylen > 0) {
    _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_blit_bytes(s, srcoff, r, dstoff, cpylen);
  }
  return r;
}

function fill(s, ofs, len, c) {
  if (ofs < 0 || len < 0 || ofs > (s.length - len | 0)) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.fill / Bytes.fill",
          Error: new Error()
        };
  }
  return _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_fill_bytes(s, ofs, len, c);
}

function blit(s1, ofs1, s2, ofs2, len) {
  if (len < 0 || ofs1 < 0 || ofs1 > (s1.length - len | 0) || ofs2 < 0 || ofs2 > (s2.length - len | 0)) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Bytes.blit",
          Error: new Error()
        };
  }
  return _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_blit_bytes(s1, ofs1, s2, ofs2, len);
}

function blit_string(s1, ofs1, s2, ofs2, len) {
  if (len < 0 || ofs1 < 0 || ofs1 > (s1.length - len | 0) || ofs2 < 0 || ofs2 > (s2.length - len | 0)) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.blit / Bytes.blit_string",
          Error: new Error()
        };
  }
  return _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_blit_string(s1, ofs1, s2, ofs2, len);
}

function iter(f, a) {
  for(var i = 0 ,i_finish = a.length; i < i_finish; ++i){
    _curry_js__WEBPACK_IMPORTED_MODULE_2__._1(f, a[i]);
  }
  
}

function iteri(f, a) {
  for(var i = 0 ,i_finish = a.length; i < i_finish; ++i){
    _curry_js__WEBPACK_IMPORTED_MODULE_2__._2(f, i, a[i]);
  }
  
}

function ensure_ge(x, y) {
  if (x >= y) {
    return x;
  }
  throw {
        RE_EXN_ID: "Invalid_argument",
        _1: "Bytes.concat",
        Error: new Error()
      };
}

function sum_lengths(_acc, seplen, _param) {
  while(true) {
    var param = _param;
    var acc = _acc;
    if (!param) {
      return acc;
    }
    var tl = param.tl;
    var hd = param.hd;
    if (!tl) {
      return hd.length + acc | 0;
    }
    _param = tl;
    _acc = ensure_ge((hd.length + seplen | 0) + acc | 0, acc);
    continue ;
  };
}

function concat(sep, l) {
  if (!l) {
    return empty;
  }
  var seplen = sep.length;
  var dst = _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_create_bytes(sum_lengths(0, seplen, l));
  var _pos = 0;
  var _param = l;
  while(true) {
    var param = _param;
    var pos = _pos;
    if (!param) {
      return dst;
    }
    var tl = param.tl;
    var hd = param.hd;
    if (tl) {
      _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_blit_bytes(hd, 0, dst, pos, hd.length);
      _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_blit_bytes(sep, 0, dst, pos + hd.length | 0, seplen);
      _param = tl;
      _pos = (pos + hd.length | 0) + seplen | 0;
      continue ;
    }
    _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_blit_bytes(hd, 0, dst, pos, hd.length);
    return dst;
  };
}

function cat(s1, s2) {
  var l1 = s1.length;
  var l2 = s2.length;
  var r = _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_create_bytes(l1 + l2 | 0);
  _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_blit_bytes(s1, 0, r, 0, l1);
  _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_blit_bytes(s2, 0, r, l1, l2);
  return r;
}

function is_space(param) {
  if (param > 13 || param < 9) {
    return param === 32;
  } else {
    return param !== 11;
  }
}

function trim(s) {
  var len = s.length;
  var i = 0;
  while(i < len && is_space(s[i])) {
    i = i + 1 | 0;
  };
  var j = len - 1 | 0;
  while(j >= i && is_space(s[j])) {
    j = j - 1 | 0;
  };
  if (j >= i) {
    return sub(s, i, (j - i | 0) + 1 | 0);
  } else {
    return empty;
  }
}

function escaped(s) {
  var n = 0;
  for(var i = 0 ,i_finish = s.length; i < i_finish; ++i){
    var match = s[i];
    n = n + (
      match >= 32 ? (
          match > 92 || match < 34 ? (
              match >= 127 ? 4 : 1
            ) : (
              match > 91 || match < 35 ? 2 : 1
            )
        ) : (
          match >= 11 ? (
              match !== 13 ? 4 : 2
            ) : (
              match >= 8 ? 2 : 4
            )
        )
    ) | 0;
  }
  if (n === s.length) {
    return copy(s);
  }
  var s$p = _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_create_bytes(n);
  n = 0;
  for(var i$1 = 0 ,i_finish$1 = s.length; i$1 < i_finish$1; ++i$1){
    var c = s[i$1];
    var exit = 0;
    if (c >= 35) {
      if (c !== 92) {
        if (c >= 127) {
          exit = 1;
        } else {
          s$p[n] = c;
        }
      } else {
        exit = 2;
      }
    } else if (c >= 32) {
      if (c >= 34) {
        exit = 2;
      } else {
        s$p[n] = c;
      }
    } else if (c >= 14) {
      exit = 1;
    } else {
      switch (c) {
        case 8 :
            s$p[n] = /* '\\' */92;
            n = n + 1 | 0;
            s$p[n] = /* 'b' */98;
            break;
        case 9 :
            s$p[n] = /* '\\' */92;
            n = n + 1 | 0;
            s$p[n] = /* 't' */116;
            break;
        case 10 :
            s$p[n] = /* '\\' */92;
            n = n + 1 | 0;
            s$p[n] = /* 'n' */110;
            break;
        case 0 :
        case 1 :
        case 2 :
        case 3 :
        case 4 :
        case 5 :
        case 6 :
        case 7 :
        case 11 :
        case 12 :
            exit = 1;
            break;
        case 13 :
            s$p[n] = /* '\\' */92;
            n = n + 1 | 0;
            s$p[n] = /* 'r' */114;
            break;
        
      }
    }
    switch (exit) {
      case 1 :
          s$p[n] = /* '\\' */92;
          n = n + 1 | 0;
          s$p[n] = 48 + (c / 100 | 0) | 0;
          n = n + 1 | 0;
          s$p[n] = 48 + (c / 10 | 0) % 10 | 0;
          n = n + 1 | 0;
          s$p[n] = 48 + c % 10 | 0;
          break;
      case 2 :
          s$p[n] = /* '\\' */92;
          n = n + 1 | 0;
          s$p[n] = c;
          break;
      
    }
    n = n + 1 | 0;
  }
  return s$p;
}

function map(f, s) {
  var l = s.length;
  if (l === 0) {
    return s;
  }
  var r = _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_create_bytes(l);
  for(var i = 0; i < l; ++i){
    r[i] = _curry_js__WEBPACK_IMPORTED_MODULE_2__._1(f, s[i]);
  }
  return r;
}

function mapi(f, s) {
  var l = s.length;
  if (l === 0) {
    return s;
  }
  var r = _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_create_bytes(l);
  for(var i = 0; i < l; ++i){
    r[i] = _curry_js__WEBPACK_IMPORTED_MODULE_2__._2(f, i, s[i]);
  }
  return r;
}

function uppercase_ascii(s) {
  return map(_char_js__WEBPACK_IMPORTED_MODULE_1__.uppercase_ascii, s);
}

function lowercase_ascii(s) {
  return map(_char_js__WEBPACK_IMPORTED_MODULE_1__.lowercase_ascii, s);
}

function apply1(f, s) {
  if (s.length === 0) {
    return s;
  }
  var r = copy(s);
  r[0] = _curry_js__WEBPACK_IMPORTED_MODULE_2__._1(f, s[0]);
  return r;
}

function capitalize_ascii(s) {
  return apply1(_char_js__WEBPACK_IMPORTED_MODULE_1__.uppercase_ascii, s);
}

function uncapitalize_ascii(s) {
  return apply1(_char_js__WEBPACK_IMPORTED_MODULE_1__.lowercase_ascii, s);
}

function index_rec(s, lim, _i, c) {
  while(true) {
    var i = _i;
    if (i >= lim) {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }
    if (s[i] === c) {
      return i;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function index(s, c) {
  return index_rec(s, s.length, 0, c);
}

function index_rec_opt(s, lim, _i, c) {
  while(true) {
    var i = _i;
    if (i >= lim) {
      return ;
    }
    if (s[i] === c) {
      return i;
    }
    _i = i + 1 | 0;
    continue ;
  };
}

function index_opt(s, c) {
  return index_rec_opt(s, s.length, 0, c);
}

function index_from(s, i, c) {
  var l = s.length;
  if (i < 0 || i > l) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.index_from / Bytes.index_from",
          Error: new Error()
        };
  }
  return index_rec(s, l, i, c);
}

function index_from_opt(s, i, c) {
  var l = s.length;
  if (i < 0 || i > l) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.index_from_opt / Bytes.index_from_opt",
          Error: new Error()
        };
  }
  return index_rec_opt(s, l, i, c);
}

function rindex_rec(s, _i, c) {
  while(true) {
    var i = _i;
    if (i < 0) {
      throw {
            RE_EXN_ID: "Not_found",
            Error: new Error()
          };
    }
    if (s[i] === c) {
      return i;
    }
    _i = i - 1 | 0;
    continue ;
  };
}

function rindex(s, c) {
  return rindex_rec(s, s.length - 1 | 0, c);
}

function rindex_from(s, i, c) {
  if (i < -1 || i >= s.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.rindex_from / Bytes.rindex_from",
          Error: new Error()
        };
  }
  return rindex_rec(s, i, c);
}

function rindex_rec_opt(s, _i, c) {
  while(true) {
    var i = _i;
    if (i < 0) {
      return ;
    }
    if (s[i] === c) {
      return i;
    }
    _i = i - 1 | 0;
    continue ;
  };
}

function rindex_opt(s, c) {
  return rindex_rec_opt(s, s.length - 1 | 0, c);
}

function rindex_from_opt(s, i, c) {
  if (i < -1 || i >= s.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.rindex_from_opt / Bytes.rindex_from_opt",
          Error: new Error()
        };
  }
  return rindex_rec_opt(s, i, c);
}

function contains_from(s, i, c) {
  var l = s.length;
  if (i < 0 || i > l) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.contains_from / Bytes.contains_from",
          Error: new Error()
        };
  }
  try {
    index_rec(s, l, i, c);
    return true;
  }
  catch (raw_exn){
    var exn = _caml_js_exceptions_js__WEBPACK_IMPORTED_MODULE_4__.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Not_found") {
      return false;
    }
    throw exn;
  }
}

function contains(s, c) {
  return contains_from(s, 0, c);
}

function rcontains_from(s, i, c) {
  if (i < 0 || i >= s.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.rcontains_from / Bytes.rcontains_from",
          Error: new Error()
        };
  }
  try {
    rindex_rec(s, i, c);
    return true;
  }
  catch (raw_exn){
    var exn = _caml_js_exceptions_js__WEBPACK_IMPORTED_MODULE_4__.internalToOCamlException(raw_exn);
    if (exn.RE_EXN_ID === "Not_found") {
      return false;
    }
    throw exn;
  }
}

var compare = _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_bytes_compare;

function uppercase(s) {
  return map(_char_js__WEBPACK_IMPORTED_MODULE_1__.uppercase, s);
}

function lowercase(s) {
  return map(_char_js__WEBPACK_IMPORTED_MODULE_1__.lowercase, s);
}

function capitalize(s) {
  return apply1(_char_js__WEBPACK_IMPORTED_MODULE_1__.uppercase, s);
}

function uncapitalize(s) {
  return apply1(_char_js__WEBPACK_IMPORTED_MODULE_1__.lowercase, s);
}

var equal = _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.caml_bytes_equal;

var unsafe_to_string = _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_to_string;

var unsafe_of_string = _caml_bytes_js__WEBPACK_IMPORTED_MODULE_3__.bytes_of_string;


/* No side effect */


/***/ }),
/* 48 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "chr": () => (/* binding */ chr),
/* harmony export */   "compare": () => (/* binding */ compare),
/* harmony export */   "equal": () => (/* binding */ equal),
/* harmony export */   "escaped": () => (/* binding */ escaped),
/* harmony export */   "lowercase": () => (/* binding */ lowercase),
/* harmony export */   "lowercase_ascii": () => (/* binding */ lowercase_ascii),
/* harmony export */   "uppercase": () => (/* binding */ uppercase),
/* harmony export */   "uppercase_ascii": () => (/* binding */ uppercase_ascii)
/* harmony export */ });
/* harmony import */ var _caml_bytes_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(49);




function chr(n) {
  if (n < 0 || n > 255) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "Char.chr",
          Error: new Error()
        };
  }
  return n;
}

function escaped(c) {
  var exit = 0;
  if (c >= 40) {
    if (c === 92) {
      return "\\\\";
    }
    exit = c >= 127 ? 1 : 2;
  } else if (c >= 32) {
    if (c >= 39) {
      return "\\'";
    }
    exit = 2;
  } else if (c >= 14) {
    exit = 1;
  } else {
    switch (c) {
      case 8 :
          return "\\b";
      case 9 :
          return "\\t";
      case 10 :
          return "\\n";
      case 0 :
      case 1 :
      case 2 :
      case 3 :
      case 4 :
      case 5 :
      case 6 :
      case 7 :
      case 11 :
      case 12 :
          exit = 1;
          break;
      case 13 :
          return "\\r";
      
    }
  }
  switch (exit) {
    case 1 :
        var s = [
          0,
          0,
          0,
          0
        ];
        s[0] = /* '\\' */92;
        s[1] = 48 + (c / 100 | 0) | 0;
        s[2] = 48 + (c / 10 | 0) % 10 | 0;
        s[3] = 48 + c % 10 | 0;
        return _caml_bytes_js__WEBPACK_IMPORTED_MODULE_0__.bytes_to_string(s);
    case 2 :
        var s$1 = [0];
        s$1[0] = c;
        return _caml_bytes_js__WEBPACK_IMPORTED_MODULE_0__.bytes_to_string(s$1);
    
  }
}

function lowercase(c) {
  if (c >= /* 'A' */65 && c <= /* 'Z' */90 || c >= /* '\192' */192 && c <= /* '\214' */214 || c >= /* '\216' */216 && c <= /* '\222' */222) {
    return c + 32 | 0;
  } else {
    return c;
  }
}

function uppercase(c) {
  if (c >= /* 'a' */97 && c <= /* 'z' */122 || c >= /* '\224' */224 && c <= /* '\246' */246 || c >= /* '\248' */248 && c <= /* '\254' */254) {
    return c - 32 | 0;
  } else {
    return c;
  }
}

function lowercase_ascii(c) {
  if (c >= /* 'A' */65 && c <= /* 'Z' */90) {
    return c + 32 | 0;
  } else {
    return c;
  }
}

function uppercase_ascii(c) {
  if (c >= /* 'a' */97 && c <= /* 'z' */122) {
    return c - 32 | 0;
  } else {
    return c;
  }
}

function compare(c1, c2) {
  return c1 - c2 | 0;
}

function equal(c1, c2) {
  return (c1 - c2 | 0) === 0;
}


/* No side effect */


/***/ }),
/* 49 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bytes_of_string": () => (/* binding */ bytes_of_string),
/* harmony export */   "bytes_to_string": () => (/* binding */ bytes_to_string),
/* harmony export */   "caml_blit_bytes": () => (/* binding */ caml_blit_bytes),
/* harmony export */   "caml_blit_string": () => (/* binding */ caml_blit_string),
/* harmony export */   "caml_bytes_compare": () => (/* binding */ caml_bytes_compare),
/* harmony export */   "caml_bytes_equal": () => (/* binding */ caml_bytes_equal),
/* harmony export */   "caml_bytes_greaterequal": () => (/* binding */ caml_bytes_greaterequal),
/* harmony export */   "caml_bytes_greaterthan": () => (/* binding */ caml_bytes_greaterthan),
/* harmony export */   "caml_bytes_lessequal": () => (/* binding */ caml_bytes_lessequal),
/* harmony export */   "caml_bytes_lessthan": () => (/* binding */ caml_bytes_lessthan),
/* harmony export */   "caml_create_bytes": () => (/* binding */ caml_create_bytes),
/* harmony export */   "caml_fill_bytes": () => (/* binding */ caml_fill_bytes),
/* harmony export */   "get": () => (/* binding */ get),
/* harmony export */   "set": () => (/* binding */ set)
/* harmony export */ });



function set(s, i, ch) {
  if (i < 0 || i >= s.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
  }
  s[i] = ch;
  
}

function get(s, i) {
  if (i < 0 || i >= s.length) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
  }
  return s[i];
}

function caml_fill_bytes(s, i, l, c) {
  if (l <= 0) {
    return ;
  }
  for(var k = i ,k_finish = l + i | 0; k < k_finish; ++k){
    s[k] = c;
  }
  
}

function caml_create_bytes(len) {
  if (len < 0) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "String.create",
          Error: new Error()
        };
  }
  var result = new Array(len);
  for(var i = 0; i < len; ++i){
    result[i] = /* '\000' */0;
  }
  return result;
}

function caml_blit_bytes(s1, i1, s2, i2, len) {
  if (len <= 0) {
    return ;
  }
  if (s1 === s2) {
    if (i1 < i2) {
      var range_a = (s1.length - i2 | 0) - 1 | 0;
      var range_b = len - 1 | 0;
      var range = range_a > range_b ? range_b : range_a;
      for(var j = range; j >= 0; --j){
        s1[i2 + j | 0] = s1[i1 + j | 0];
      }
      return ;
    }
    if (i1 <= i2) {
      return ;
    }
    var range_a$1 = (s1.length - i1 | 0) - 1 | 0;
    var range_b$1 = len - 1 | 0;
    var range$1 = range_a$1 > range_b$1 ? range_b$1 : range_a$1;
    for(var k = 0; k <= range$1; ++k){
      s1[i2 + k | 0] = s1[i1 + k | 0];
    }
    return ;
  }
  var off1 = s1.length - i1 | 0;
  if (len <= off1) {
    for(var i = 0; i < len; ++i){
      s2[i2 + i | 0] = s1[i1 + i | 0];
    }
    return ;
  }
  for(var i$1 = 0; i$1 < off1; ++i$1){
    s2[i2 + i$1 | 0] = s1[i1 + i$1 | 0];
  }
  for(var i$2 = off1; i$2 < len; ++i$2){
    s2[i2 + i$2 | 0] = /* '\000' */0;
  }
  
}

function bytes_to_string(a) {
  var i = 0;
  var len = a.length;
  var s = "";
  var s_len = len;
  if (i === 0 && len <= 4096 && len === a.length) {
    return String.fromCharCode.apply(null, a);
  }
  var offset = 0;
  while(s_len > 0) {
    var next = s_len < 1024 ? s_len : 1024;
    var tmp_bytes = new Array(next);
    for(var k = 0; k < next; ++k){
      tmp_bytes[k] = a[k + offset | 0];
    }
    s = s + String.fromCharCode.apply(null, tmp_bytes);
    s_len = s_len - next | 0;
    offset = offset + next | 0;
  };
  return s;
}

function caml_blit_string(s1, i1, s2, i2, len) {
  if (len <= 0) {
    return ;
  }
  var off1 = s1.length - i1 | 0;
  if (len <= off1) {
    for(var i = 0; i < len; ++i){
      s2[i2 + i | 0] = s1.charCodeAt(i1 + i | 0);
    }
    return ;
  }
  for(var i$1 = 0; i$1 < off1; ++i$1){
    s2[i2 + i$1 | 0] = s1.charCodeAt(i1 + i$1 | 0);
  }
  for(var i$2 = off1; i$2 < len; ++i$2){
    s2[i2 + i$2 | 0] = /* '\000' */0;
  }
  
}

function bytes_of_string(s) {
  var len = s.length;
  var res = new Array(len);
  for(var i = 0; i < len; ++i){
    res[i] = s.charCodeAt(i);
  }
  return res;
}

function caml_bytes_compare_aux(s1, s2, _off, len, def) {
  while(true) {
    var off = _off;
    if (off >= len) {
      return def;
    }
    var a = s1[off];
    var b = s2[off];
    if (a > b) {
      return 1;
    }
    if (a < b) {
      return -1;
    }
    _off = off + 1 | 0;
    continue ;
  };
}

function caml_bytes_compare(s1, s2) {
  var len1 = s1.length;
  var len2 = s2.length;
  if (len1 === len2) {
    return caml_bytes_compare_aux(s1, s2, 0, len1, 0);
  } else if (len1 < len2) {
    return caml_bytes_compare_aux(s1, s2, 0, len1, -1);
  } else {
    return caml_bytes_compare_aux(s1, s2, 0, len2, 1);
  }
}

function caml_bytes_equal(s1, s2) {
  var len1 = s1.length;
  var len2 = s2.length;
  if (len1 === len2) {
    var _off = 0;
    while(true) {
      var off = _off;
      if (off === len1) {
        return true;
      }
      var a = s1[off];
      var b = s2[off];
      if (a !== b) {
        return false;
      }
      _off = off + 1 | 0;
      continue ;
    };
  } else {
    return false;
  }
}

function caml_bytes_greaterthan(s1, s2) {
  return caml_bytes_compare(s1, s2) > 0;
}

function caml_bytes_greaterequal(s1, s2) {
  return caml_bytes_compare(s1, s2) >= 0;
}

function caml_bytes_lessthan(s1, s2) {
  return caml_bytes_compare(s1, s2) < 0;
}

function caml_bytes_lessequal(s1, s2) {
  return caml_bytes_compare(s1, s2) <= 0;
}


/* No side effect */


/***/ }),
/* 50 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$$Error": () => (/* binding */ $$Error),
/* harmony export */   "caml_as_js_exn": () => (/* binding */ caml_as_js_exn),
/* harmony export */   "internalToOCamlException": () => (/* binding */ internalToOCamlException)
/* harmony export */ });
/* harmony import */ var _caml_option_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);
/* harmony import */ var _caml_exceptions_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(16);





var $$Error = /* @__PURE__ */_caml_exceptions_js__WEBPACK_IMPORTED_MODULE_1__.create("Caml_js_exceptions.Error");

function internalToOCamlException(e) {
  if (_caml_exceptions_js__WEBPACK_IMPORTED_MODULE_1__.caml_is_extension(e)) {
    return e;
  } else {
    return {
            RE_EXN_ID: $$Error,
            _1: e
          };
  }
}

function caml_as_js_exn(exn) {
  if (exn.RE_EXN_ID === $$Error) {
    return _caml_option_js__WEBPACK_IMPORTED_MODULE_0__.some(exn._1);
  }
  
}


/* No side effect */


/***/ }),
/* 51 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "get": () => (/* binding */ get),
/* harmony export */   "make": () => (/* binding */ make)
/* harmony export */ });



function get(s, i) {
  if (i >= s.length || i < 0) {
    throw {
          RE_EXN_ID: "Invalid_argument",
          _1: "index out of bounds",
          Error: new Error()
        };
  }
  return s.charCodeAt(i);
}

function make(n, ch) {
  return String.fromCharCode(ch).repeat(n);
}


/* No side effect */


/***/ }),
/* 52 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "entries": () => (/* binding */ entries),
/* harmony export */   "fromArray": () => (/* binding */ fromArray),
/* harmony export */   "fromList": () => (/* binding */ fromList),
/* harmony export */   "get": () => (/* binding */ get),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "unsafeDeleteKey": () => (/* binding */ unsafeDeleteKey),
/* harmony export */   "values": () => (/* binding */ values)
/* harmony export */ });
/* harmony import */ var _caml_option_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(17);




function get(dict, k) {
  if ((k in dict)) {
    return _caml_option_js__WEBPACK_IMPORTED_MODULE_0__.some(dict[k]);
  }
  
}

var unsafeDeleteKey = (function (dict,key){
      delete dict[key];
     });

function entries(dict) {
  var keys = Object.keys(dict);
  var l = keys.length;
  var values = new Array(l);
  for(var i = 0; i < l; ++i){
    var key = keys[i];
    values[i] = [
      key,
      dict[key]
    ];
  }
  return values;
}

function values(dict) {
  var keys = Object.keys(dict);
  var l = keys.length;
  var values$1 = new Array(l);
  for(var i = 0; i < l; ++i){
    values$1[i] = dict[keys[i]];
  }
  return values$1;
}

function fromList(entries) {
  var dict = {};
  var _param = entries;
  while(true) {
    var param = _param;
    if (!param) {
      return dict;
    }
    var match = param.hd;
    dict[match[0]] = match[1];
    _param = param.tl;
    continue ;
  };
}

function fromArray(entries) {
  var dict = {};
  var l = entries.length;
  for(var i = 0; i < l; ++i){
    var match = entries[i];
    dict[match[0]] = match[1];
  }
  return dict;
}

function map(f, source) {
  var target = {};
  var keys = Object.keys(source);
  var l = keys.length;
  for(var i = 0; i < l; ++i){
    var key = keys[i];
    target[key] = f(source[key]);
  }
  return target;
}


/* No side effect */


/***/ }),
/* 53 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "div": () => (/* binding */ div),
/* harmony export */   "mod_": () => (/* binding */ mod_)
/* harmony export */ });



function div(x, y) {
  if (y === 0) {
    throw {
          RE_EXN_ID: "Division_by_zero",
          Error: new Error()
        };
  }
  return x / y | 0;
}

function mod_(x, y) {
  if (y === 0) {
    throw {
          RE_EXN_ID: "Division_by_zero",
          Error: new Error()
        };
  }
  return x % y;
}


/* No side effect */


/***/ }),
/* 54 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkInvariantInternal": () => (/* binding */ checkInvariantInternal),
/* harmony export */   "cmp": () => (/* binding */ cmp),
/* harmony export */   "cmpU": () => (/* binding */ cmpU),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "eq": () => (/* binding */ eq),
/* harmony export */   "eqU": () => (/* binding */ eqU),
/* harmony export */   "every": () => (/* binding */ every),
/* harmony export */   "everyU": () => (/* binding */ everyU),
/* harmony export */   "findFirstBy": () => (/* binding */ findFirstBy),
/* harmony export */   "findFirstByU": () => (/* binding */ findFirstByU),
/* harmony export */   "forEach": () => (/* binding */ forEach),
/* harmony export */   "forEachU": () => (/* binding */ forEachU),
/* harmony export */   "fromArray": () => (/* binding */ fromArray),
/* harmony export */   "get": () => (/* binding */ get),
/* harmony export */   "getExn": () => (/* binding */ getExn),
/* harmony export */   "getUndefined": () => (/* binding */ getUndefined),
/* harmony export */   "getWithDefault": () => (/* binding */ getWithDefault),
/* harmony export */   "has": () => (/* binding */ has),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "keep": () => (/* binding */ keep),
/* harmony export */   "keepU": () => (/* binding */ keepU),
/* harmony export */   "keysToArray": () => (/* binding */ keysToArray),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "mapU": () => (/* binding */ mapU),
/* harmony export */   "mapWithKey": () => (/* binding */ mapWithKey),
/* harmony export */   "mapWithKeyU": () => (/* binding */ mapWithKeyU),
/* harmony export */   "maxKey": () => (/* binding */ maxKey),
/* harmony export */   "maxKeyUndefined": () => (/* binding */ maxKeyUndefined),
/* harmony export */   "maxUndefined": () => (/* binding */ maxUndefined),
/* harmony export */   "maximum": () => (/* binding */ maximum),
/* harmony export */   "merge": () => (/* binding */ merge),
/* harmony export */   "mergeMany": () => (/* binding */ mergeMany),
/* harmony export */   "mergeU": () => (/* binding */ mergeU),
/* harmony export */   "minKey": () => (/* binding */ minKey),
/* harmony export */   "minKeyUndefined": () => (/* binding */ minKeyUndefined),
/* harmony export */   "minUndefined": () => (/* binding */ minUndefined),
/* harmony export */   "minimum": () => (/* binding */ minimum),
/* harmony export */   "partition": () => (/* binding */ partition),
/* harmony export */   "partitionU": () => (/* binding */ partitionU),
/* harmony export */   "reduce": () => (/* binding */ reduce),
/* harmony export */   "reduceU": () => (/* binding */ reduceU),
/* harmony export */   "remove": () => (/* binding */ remove),
/* harmony export */   "removeMany": () => (/* binding */ removeMany),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "size": () => (/* binding */ size),
/* harmony export */   "some": () => (/* binding */ some),
/* harmony export */   "someU": () => (/* binding */ someU),
/* harmony export */   "split": () => (/* binding */ split),
/* harmony export */   "toArray": () => (/* binding */ toArray),
/* harmony export */   "toList": () => (/* binding */ toList),
/* harmony export */   "update": () => (/* binding */ update),
/* harmony export */   "updateU": () => (/* binding */ updateU),
/* harmony export */   "valuesToArray": () => (/* binding */ valuesToArray)
/* harmony export */ });
/* harmony import */ var _curry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _caml_option_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(55);
/* harmony import */ var _belt_internalMapString_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(57);







function set(t, newK, newD) {
  if (t === undefined) {
    return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.singleton(newK, newD);
  }
  var k = t.k;
  if (newK === k) {
    return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.updateValue(t, newD);
  }
  var v = t.v;
  if (newK < k) {
    return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.bal(set(t.l, newK, newD), k, v, t.r);
  } else {
    return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.bal(t.l, k, v, set(t.r, newK, newD));
  }
}

function updateU(t, x, f) {
  if (t !== undefined) {
    var k = t.k;
    if (x === k) {
      var data = f(_caml_option_js__WEBPACK_IMPORTED_MODULE_1__.some(t.v));
      if (data !== undefined) {
        return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.updateValue(t, _caml_option_js__WEBPACK_IMPORTED_MODULE_1__.valFromOption(data));
      }
      var l = t.l;
      var r = t.r;
      if (l === undefined) {
        return r;
      }
      if (r === undefined) {
        return l;
      }
      var kr = {
        contents: r.k
      };
      var vr = {
        contents: r.v
      };
      var r$1 = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.removeMinAuxWithRef(r, kr, vr);
      return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.bal(l, kr.contents, vr.contents, r$1);
    }
    var v = t.v;
    var l$1 = t.l;
    var r$2 = t.r;
    if (x < k) {
      var ll = updateU(l$1, x, f);
      if (l$1 === ll) {
        return t;
      } else {
        return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.bal(ll, k, v, r$2);
      }
    }
    var rr = updateU(r$2, x, f);
    if (r$2 === rr) {
      return t;
    } else {
      return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.bal(l$1, k, v, rr);
    }
  }
  var data$1 = f(undefined);
  if (data$1 !== undefined) {
    return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.singleton(x, _caml_option_js__WEBPACK_IMPORTED_MODULE_1__.valFromOption(data$1));
  } else {
    return t;
  }
}

function update(t, x, f) {
  return updateU(t, x, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__1(f));
}

function removeAux(n, x) {
  var v = n.k;
  var l = n.l;
  var r = n.r;
  if (x === v) {
    if (l === undefined) {
      return r;
    }
    if (r === undefined) {
      return l;
    }
    var kr = {
      contents: r.k
    };
    var vr = {
      contents: r.v
    };
    var r$1 = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.removeMinAuxWithRef(r, kr, vr);
    return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.bal(l, kr.contents, vr.contents, r$1);
  }
  if (x < v) {
    if (l === undefined) {
      return n;
    }
    var ll = removeAux(l, x);
    if (ll === l) {
      return n;
    } else {
      return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.bal(ll, v, n.v, r);
    }
  }
  if (r === undefined) {
    return n;
  }
  var rr = removeAux(r, x);
  return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.bal(l, v, n.v, rr);
}

function remove(n, x) {
  if (n !== undefined) {
    return removeAux(n, x);
  }
  
}

function removeMany(t, keys) {
  var len = keys.length;
  if (t !== undefined) {
    var _t = t;
    var _i = 0;
    while(true) {
      var i = _i;
      var t$1 = _t;
      if (i >= len) {
        return t$1;
      }
      var ele = keys[i];
      var u = removeAux(t$1, ele);
      if (u === undefined) {
        return u;
      }
      _i = i + 1 | 0;
      _t = u;
      continue ;
    };
  }
  
}

function mergeMany(h, arr) {
  var len = arr.length;
  var v = h;
  for(var i = 0; i < len; ++i){
    var match = arr[i];
    v = set(v, match[0], match[1]);
  }
  return v;
}

var empty;

var isEmpty = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.isEmpty;

var has = _belt_internalMapString_js__WEBPACK_IMPORTED_MODULE_3__.has;

var cmpU = _belt_internalMapString_js__WEBPACK_IMPORTED_MODULE_3__.cmpU;

var cmp = _belt_internalMapString_js__WEBPACK_IMPORTED_MODULE_3__.cmp;

var eqU = _belt_internalMapString_js__WEBPACK_IMPORTED_MODULE_3__.eqU;

var eq = _belt_internalMapString_js__WEBPACK_IMPORTED_MODULE_3__.eq;

var findFirstByU = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.findFirstByU;

var findFirstBy = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.findFirstBy;

var forEachU = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.forEachU;

var forEach = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.forEach;

var reduceU = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.reduceU;

var reduce = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.reduce;

var everyU = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.everyU;

var every = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.every;

var someU = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.someU;

var some = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.some;

var size = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.size;

var toList = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.toList;

var toArray = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.toArray;

var fromArray = _belt_internalMapString_js__WEBPACK_IMPORTED_MODULE_3__.fromArray;

var keysToArray = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.keysToArray;

var valuesToArray = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.valuesToArray;

var minKey = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.minKey;

var minKeyUndefined = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.minKeyUndefined;

var maxKey = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.maxKey;

var maxKeyUndefined = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.maxKeyUndefined;

var minimum = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.minimum;

var minUndefined = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.minUndefined;

var maximum = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.maximum;

var maxUndefined = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.maxUndefined;

var get = _belt_internalMapString_js__WEBPACK_IMPORTED_MODULE_3__.get;

var getUndefined = _belt_internalMapString_js__WEBPACK_IMPORTED_MODULE_3__.getUndefined;

var getWithDefault = _belt_internalMapString_js__WEBPACK_IMPORTED_MODULE_3__.getWithDefault;

var getExn = _belt_internalMapString_js__WEBPACK_IMPORTED_MODULE_3__.getExn;

var checkInvariantInternal = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.checkInvariantInternal;

var mergeU = _belt_internalMapString_js__WEBPACK_IMPORTED_MODULE_3__.mergeU;

var merge = _belt_internalMapString_js__WEBPACK_IMPORTED_MODULE_3__.merge;

var keepU = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.keepSharedU;

var keep = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.keepShared;

var partitionU = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.partitionSharedU;

var partition = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.partitionShared;

var split = _belt_internalMapString_js__WEBPACK_IMPORTED_MODULE_3__.split;

var mapU = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.mapU;

var map = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.map;

var mapWithKeyU = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.mapWithKeyU;

var mapWithKey = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_2__.mapWithKey;


/* No side effect */


/***/ }),
/* 55 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bal": () => (/* binding */ bal),
/* harmony export */   "balMutate": () => (/* binding */ balMutate),
/* harmony export */   "checkInvariantInternal": () => (/* binding */ checkInvariantInternal),
/* harmony export */   "cmp": () => (/* binding */ cmp),
/* harmony export */   "cmpU": () => (/* binding */ cmpU),
/* harmony export */   "concat": () => (/* binding */ concat),
/* harmony export */   "concatOrJoin": () => (/* binding */ concatOrJoin),
/* harmony export */   "copy": () => (/* binding */ copy),
/* harmony export */   "create": () => (/* binding */ create),
/* harmony export */   "eq": () => (/* binding */ eq),
/* harmony export */   "eqU": () => (/* binding */ eqU),
/* harmony export */   "every": () => (/* binding */ every),
/* harmony export */   "everyU": () => (/* binding */ everyU),
/* harmony export */   "fillArray": () => (/* binding */ fillArray),
/* harmony export */   "findFirstBy": () => (/* binding */ findFirstBy),
/* harmony export */   "findFirstByU": () => (/* binding */ findFirstByU),
/* harmony export */   "forEach": () => (/* binding */ forEach),
/* harmony export */   "forEachU": () => (/* binding */ forEachU),
/* harmony export */   "fromArray": () => (/* binding */ fromArray),
/* harmony export */   "fromSortedArrayAux": () => (/* binding */ fromSortedArrayAux),
/* harmony export */   "fromSortedArrayRevAux": () => (/* binding */ fromSortedArrayRevAux),
/* harmony export */   "fromSortedArrayUnsafe": () => (/* binding */ fromSortedArrayUnsafe),
/* harmony export */   "get": () => (/* binding */ get),
/* harmony export */   "getExn": () => (/* binding */ getExn),
/* harmony export */   "getUndefined": () => (/* binding */ getUndefined),
/* harmony export */   "getWithDefault": () => (/* binding */ getWithDefault),
/* harmony export */   "has": () => (/* binding */ has),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "join": () => (/* binding */ join),
/* harmony export */   "keepMap": () => (/* binding */ keepMap),
/* harmony export */   "keepMapU": () => (/* binding */ keepMapU),
/* harmony export */   "keepShared": () => (/* binding */ keepShared),
/* harmony export */   "keepSharedU": () => (/* binding */ keepSharedU),
/* harmony export */   "keysToArray": () => (/* binding */ keysToArray),
/* harmony export */   "lengthNode": () => (/* binding */ lengthNode),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "mapU": () => (/* binding */ mapU),
/* harmony export */   "mapWithKey": () => (/* binding */ mapWithKey),
/* harmony export */   "mapWithKeyU": () => (/* binding */ mapWithKeyU),
/* harmony export */   "maxKey": () => (/* binding */ maxKey),
/* harmony export */   "maxKeyUndefined": () => (/* binding */ maxKeyUndefined),
/* harmony export */   "maxUndefined": () => (/* binding */ maxUndefined),
/* harmony export */   "maximum": () => (/* binding */ maximum),
/* harmony export */   "minKey": () => (/* binding */ minKey),
/* harmony export */   "minKeyUndefined": () => (/* binding */ minKeyUndefined),
/* harmony export */   "minUndefined": () => (/* binding */ minUndefined),
/* harmony export */   "minimum": () => (/* binding */ minimum),
/* harmony export */   "partitionShared": () => (/* binding */ partitionShared),
/* harmony export */   "partitionSharedU": () => (/* binding */ partitionSharedU),
/* harmony export */   "reduce": () => (/* binding */ reduce),
/* harmony export */   "reduceU": () => (/* binding */ reduceU),
/* harmony export */   "removeMinAuxWithRef": () => (/* binding */ removeMinAuxWithRef),
/* harmony export */   "removeMinAuxWithRootMutate": () => (/* binding */ removeMinAuxWithRootMutate),
/* harmony export */   "singleton": () => (/* binding */ singleton),
/* harmony export */   "size": () => (/* binding */ size),
/* harmony export */   "some": () => (/* binding */ some),
/* harmony export */   "someU": () => (/* binding */ someU),
/* harmony export */   "stackAllLeft": () => (/* binding */ stackAllLeft),
/* harmony export */   "toArray": () => (/* binding */ toArray),
/* harmony export */   "toList": () => (/* binding */ toList),
/* harmony export */   "updateMutate": () => (/* binding */ updateMutate),
/* harmony export */   "updateValue": () => (/* binding */ updateValue),
/* harmony export */   "valuesToArray": () => (/* binding */ valuesToArray)
/* harmony export */ });
/* harmony import */ var _curry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _caml_option_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var _belt_SortArray_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(56);






function treeHeight(n) {
  if (n !== undefined) {
    return n.h;
  } else {
    return 0;
  }
}

function copy(n) {
  if (n !== undefined) {
    return {
            k: n.k,
            v: n.v,
            h: n.h,
            l: copy(n.l),
            r: copy(n.r)
          };
  } else {
    return n;
  }
}

function create(l, x, d, r) {
  var hl = treeHeight(l);
  var hr = treeHeight(r);
  return {
          k: x,
          v: d,
          h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0,
          l: l,
          r: r
        };
}

function singleton(x, d) {
  return {
          k: x,
          v: d,
          h: 1,
          l: undefined,
          r: undefined
        };
}

function heightGe(l, r) {
  if (r !== undefined) {
    if (l !== undefined) {
      return l.h >= r.h;
    } else {
      return false;
    }
  } else {
    return true;
  }
}

function updateValue(n, newValue) {
  if (n.v === newValue) {
    return n;
  } else {
    return {
            k: n.k,
            v: newValue,
            h: n.h,
            l: n.l,
            r: n.r
          };
  }
}

function bal(l, x, d, r) {
  var hl = l !== undefined ? l.h : 0;
  var hr = r !== undefined ? r.h : 0;
  if (hl > (hr + 2 | 0)) {
    var ll = l.l;
    var lr = l.r;
    if (treeHeight(ll) >= treeHeight(lr)) {
      return create(ll, l.k, l.v, create(lr, x, d, r));
    } else {
      return create(create(ll, l.k, l.v, lr.l), lr.k, lr.v, create(lr.r, x, d, r));
    }
  }
  if (hr <= (hl + 2 | 0)) {
    return {
            k: x,
            v: d,
            h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0,
            l: l,
            r: r
          };
  }
  var rl = r.l;
  var rr = r.r;
  if (treeHeight(rr) >= treeHeight(rl)) {
    return create(create(l, x, d, rl), r.k, r.v, rr);
  } else {
    return create(create(l, x, d, rl.l), rl.k, rl.v, create(rl.r, r.k, r.v, rr));
  }
}

function minKey0Aux(_n) {
  while(true) {
    var n = _n;
    var n$1 = n.l;
    if (n$1 === undefined) {
      return n.k;
    }
    _n = n$1;
    continue ;
  };
}

function minKey(n) {
  if (n !== undefined) {
    return _caml_option_js__WEBPACK_IMPORTED_MODULE_1__.some(minKey0Aux(n));
  }
  
}

function minKeyUndefined(n) {
  if (n !== undefined) {
    return minKey0Aux(n);
  }
  
}

function maxKey0Aux(_n) {
  while(true) {
    var n = _n;
    var n$1 = n.r;
    if (n$1 === undefined) {
      return n.k;
    }
    _n = n$1;
    continue ;
  };
}

function maxKey(n) {
  if (n !== undefined) {
    return _caml_option_js__WEBPACK_IMPORTED_MODULE_1__.some(maxKey0Aux(n));
  }
  
}

function maxKeyUndefined(n) {
  if (n !== undefined) {
    return maxKey0Aux(n);
  }
  
}

function minKV0Aux(_n) {
  while(true) {
    var n = _n;
    var n$1 = n.l;
    if (n$1 === undefined) {
      return [
              n.k,
              n.v
            ];
    }
    _n = n$1;
    continue ;
  };
}

function minimum(n) {
  if (n !== undefined) {
    return minKV0Aux(n);
  }
  
}

function minUndefined(n) {
  if (n !== undefined) {
    return minKV0Aux(n);
  }
  
}

function maxKV0Aux(_n) {
  while(true) {
    var n = _n;
    var n$1 = n.r;
    if (n$1 === undefined) {
      return [
              n.k,
              n.v
            ];
    }
    _n = n$1;
    continue ;
  };
}

function maximum(n) {
  if (n !== undefined) {
    return maxKV0Aux(n);
  }
  
}

function maxUndefined(n) {
  if (n !== undefined) {
    return maxKV0Aux(n);
  }
  
}

function removeMinAuxWithRef(n, kr, vr) {
  var ln = n.l;
  if (ln !== undefined) {
    return bal(removeMinAuxWithRef(ln, kr, vr), n.k, n.v, n.r);
  } else {
    kr.contents = n.k;
    vr.contents = n.v;
    return n.r;
  }
}

function isEmpty(x) {
  return x === undefined;
}

function stackAllLeft(_v, _s) {
  while(true) {
    var s = _s;
    var v = _v;
    if (v === undefined) {
      return s;
    }
    _s = {
      hd: v,
      tl: s
    };
    _v = v.l;
    continue ;
  };
}

function findFirstByU(n, p) {
  if (n === undefined) {
    return ;
  }
  var left = findFirstByU(n.l, p);
  if (left !== undefined) {
    return left;
  }
  var v = n.k;
  var d = n.v;
  var pvd = p(v, d);
  if (pvd) {
    return [
            v,
            d
          ];
  }
  var right = findFirstByU(n.r, p);
  if (right !== undefined) {
    return right;
  }
  
}

function findFirstBy(n, p) {
  return findFirstByU(n, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__2(p));
}

function forEachU(_n, f) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return ;
    }
    forEachU(n.l, f);
    f(n.k, n.v);
    _n = n.r;
    continue ;
  };
}

function forEach(n, f) {
  return forEachU(n, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__2(f));
}

function mapU(n, f) {
  if (n === undefined) {
    return ;
  }
  var newLeft = mapU(n.l, f);
  var newD = f(n.v);
  var newRight = mapU(n.r, f);
  return {
          k: n.k,
          v: newD,
          h: n.h,
          l: newLeft,
          r: newRight
        };
}

function map(n, f) {
  return mapU(n, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__1(f));
}

function mapWithKeyU(n, f) {
  if (n === undefined) {
    return ;
  }
  var key = n.k;
  var newLeft = mapWithKeyU(n.l, f);
  var newD = f(key, n.v);
  var newRight = mapWithKeyU(n.r, f);
  return {
          k: key,
          v: newD,
          h: n.h,
          l: newLeft,
          r: newRight
        };
}

function mapWithKey(n, f) {
  return mapWithKeyU(n, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__2(f));
}

function reduceU(_m, _accu, f) {
  while(true) {
    var accu = _accu;
    var m = _m;
    if (m === undefined) {
      return accu;
    }
    var v = m.k;
    var d = m.v;
    var l = m.l;
    var r = m.r;
    _accu = f(reduceU(l, accu, f), v, d);
    _m = r;
    continue ;
  };
}

function reduce(m, accu, f) {
  return reduceU(m, accu, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__3(f));
}

function everyU(_n, p) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return true;
    }
    if (!p(n.k, n.v)) {
      return false;
    }
    if (!everyU(n.l, p)) {
      return false;
    }
    _n = n.r;
    continue ;
  };
}

function every(n, p) {
  return everyU(n, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__2(p));
}

function someU(_n, p) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return false;
    }
    if (p(n.k, n.v)) {
      return true;
    }
    if (someU(n.l, p)) {
      return true;
    }
    _n = n.r;
    continue ;
  };
}

function some(n, p) {
  return someU(n, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__2(p));
}

function addMinElement(n, k, v) {
  if (n !== undefined) {
    return bal(addMinElement(n.l, k, v), n.k, n.v, n.r);
  } else {
    return singleton(k, v);
  }
}

function addMaxElement(n, k, v) {
  if (n !== undefined) {
    return bal(n.l, n.k, n.v, addMaxElement(n.r, k, v));
  } else {
    return singleton(k, v);
  }
}

function join(ln, v, d, rn) {
  if (ln === undefined) {
    return addMinElement(rn, v, d);
  }
  if (rn === undefined) {
    return addMaxElement(ln, v, d);
  }
  var lv = ln.k;
  var ld = ln.v;
  var lh = ln.h;
  var ll = ln.l;
  var lr = ln.r;
  var rv = rn.k;
  var rd = rn.v;
  var rh = rn.h;
  var rl = rn.l;
  var rr = rn.r;
  if (lh > (rh + 2 | 0)) {
    return bal(ll, lv, ld, join(lr, v, d, rn));
  } else if (rh > (lh + 2 | 0)) {
    return bal(join(ln, v, d, rl), rv, rd, rr);
  } else {
    return create(ln, v, d, rn);
  }
}

function concat(t1, t2) {
  if (t1 === undefined) {
    return t2;
  }
  if (t2 === undefined) {
    return t1;
  }
  var kr = {
    contents: t2.k
  };
  var vr = {
    contents: t2.v
  };
  var t2r = removeMinAuxWithRef(t2, kr, vr);
  return join(t1, kr.contents, vr.contents, t2r);
}

function concatOrJoin(t1, v, d, t2) {
  if (d !== undefined) {
    return join(t1, v, _caml_option_js__WEBPACK_IMPORTED_MODULE_1__.valFromOption(d), t2);
  } else {
    return concat(t1, t2);
  }
}

function keepSharedU(n, p) {
  if (n === undefined) {
    return ;
  }
  var v = n.k;
  var d = n.v;
  var newLeft = keepSharedU(n.l, p);
  var pvd = p(v, d);
  var newRight = keepSharedU(n.r, p);
  if (pvd) {
    return join(newLeft, v, d, newRight);
  } else {
    return concat(newLeft, newRight);
  }
}

function keepShared(n, p) {
  return keepSharedU(n, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__2(p));
}

function keepMapU(n, p) {
  if (n === undefined) {
    return ;
  }
  var v = n.k;
  var d = n.v;
  var newLeft = keepMapU(n.l, p);
  var pvd = p(v, d);
  var newRight = keepMapU(n.r, p);
  if (pvd !== undefined) {
    return join(newLeft, v, _caml_option_js__WEBPACK_IMPORTED_MODULE_1__.valFromOption(pvd), newRight);
  } else {
    return concat(newLeft, newRight);
  }
}

function keepMap(n, p) {
  return keepMapU(n, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__2(p));
}

function partitionSharedU(n, p) {
  if (n === undefined) {
    return [
            undefined,
            undefined
          ];
  }
  var key = n.k;
  var value = n.v;
  var match = partitionSharedU(n.l, p);
  var lf = match[1];
  var lt = match[0];
  var pvd = p(key, value);
  var match$1 = partitionSharedU(n.r, p);
  var rf = match$1[1];
  var rt = match$1[0];
  if (pvd) {
    return [
            join(lt, key, value, rt),
            concat(lf, rf)
          ];
  } else {
    return [
            concat(lt, rt),
            join(lf, key, value, rf)
          ];
  }
}

function partitionShared(n, p) {
  return partitionSharedU(n, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__2(p));
}

function lengthNode(n) {
  var l = n.l;
  var r = n.r;
  var sizeL = l !== undefined ? lengthNode(l) : 0;
  var sizeR = r !== undefined ? lengthNode(r) : 0;
  return (1 + sizeL | 0) + sizeR | 0;
}

function size(n) {
  if (n !== undefined) {
    return lengthNode(n);
  } else {
    return 0;
  }
}

function toListAux(_n, _accu) {
  while(true) {
    var accu = _accu;
    var n = _n;
    if (n === undefined) {
      return accu;
    }
    var k = n.k;
    var v = n.v;
    var l = n.l;
    var r = n.r;
    _accu = {
      hd: [
        k,
        v
      ],
      tl: toListAux(r, accu)
    };
    _n = l;
    continue ;
  };
}

function toList(s) {
  return toListAux(s, /* [] */0);
}

function checkInvariantInternal(_v) {
  while(true) {
    var v = _v;
    if (v === undefined) {
      return ;
    }
    var l = v.l;
    var r = v.r;
    var diff = treeHeight(l) - treeHeight(r) | 0;
    if (!(diff <= 2 && diff >= -2)) {
      throw {
            RE_EXN_ID: "Assert_failure",
            _1: [
              "belt_internalAVLtree.ml",
              373,
              4
            ],
            Error: new Error()
          };
    }
    checkInvariantInternal(l);
    _v = r;
    continue ;
  };
}

function fillArrayKey(_n, _i, arr) {
  while(true) {
    var i = _i;
    var n = _n;
    var v = n.k;
    var l = n.l;
    var r = n.r;
    var next = l !== undefined ? fillArrayKey(l, i, arr) : i;
    arr[next] = v;
    var rnext = next + 1 | 0;
    if (r === undefined) {
      return rnext;
    }
    _i = rnext;
    _n = r;
    continue ;
  };
}

function fillArrayValue(_n, _i, arr) {
  while(true) {
    var i = _i;
    var n = _n;
    var l = n.l;
    var r = n.r;
    var next = l !== undefined ? fillArrayValue(l, i, arr) : i;
    arr[next] = n.v;
    var rnext = next + 1 | 0;
    if (r === undefined) {
      return rnext;
    }
    _i = rnext;
    _n = r;
    continue ;
  };
}

function fillArray(_n, _i, arr) {
  while(true) {
    var i = _i;
    var n = _n;
    var l = n.l;
    var v = n.k;
    var r = n.r;
    var next = l !== undefined ? fillArray(l, i, arr) : i;
    arr[next] = [
      v,
      n.v
    ];
    var rnext = next + 1 | 0;
    if (r === undefined) {
      return rnext;
    }
    _i = rnext;
    _n = r;
    continue ;
  };
}

function toArray(n) {
  if (n === undefined) {
    return [];
  }
  var size = lengthNode(n);
  var v = new Array(size);
  fillArray(n, 0, v);
  return v;
}

function keysToArray(n) {
  if (n === undefined) {
    return [];
  }
  var size = lengthNode(n);
  var v = new Array(size);
  fillArrayKey(n, 0, v);
  return v;
}

function valuesToArray(n) {
  if (n === undefined) {
    return [];
  }
  var size = lengthNode(n);
  var v = new Array(size);
  fillArrayValue(n, 0, v);
  return v;
}

function fromSortedArrayRevAux(arr, off, len) {
  switch (len) {
    case 0 :
        return ;
    case 1 :
        var match = arr[off];
        return singleton(match[0], match[1]);
    case 2 :
        var match_0 = arr[off];
        var match_1 = arr[off - 1 | 0];
        var match$1 = match_1;
        var match$2 = match_0;
        return {
                k: match$1[0],
                v: match$1[1],
                h: 2,
                l: singleton(match$2[0], match$2[1]),
                r: undefined
              };
    case 3 :
        var match_0$1 = arr[off];
        var match_1$1 = arr[off - 1 | 0];
        var match_2 = arr[off - 2 | 0];
        var match$3 = match_2;
        var match$4 = match_1$1;
        var match$5 = match_0$1;
        return {
                k: match$4[0],
                v: match$4[1],
                h: 2,
                l: singleton(match$5[0], match$5[1]),
                r: singleton(match$3[0], match$3[1])
              };
    default:
      var nl = len / 2 | 0;
      var left = fromSortedArrayRevAux(arr, off, nl);
      var match$6 = arr[off - nl | 0];
      var right = fromSortedArrayRevAux(arr, (off - nl | 0) - 1 | 0, (len - nl | 0) - 1 | 0);
      return create(left, match$6[0], match$6[1], right);
  }
}

function fromSortedArrayAux(arr, off, len) {
  switch (len) {
    case 0 :
        return ;
    case 1 :
        var match = arr[off];
        return singleton(match[0], match[1]);
    case 2 :
        var match_0 = arr[off];
        var match_1 = arr[off + 1 | 0];
        var match$1 = match_1;
        var match$2 = match_0;
        return {
                k: match$1[0],
                v: match$1[1],
                h: 2,
                l: singleton(match$2[0], match$2[1]),
                r: undefined
              };
    case 3 :
        var match_0$1 = arr[off];
        var match_1$1 = arr[off + 1 | 0];
        var match_2 = arr[off + 2 | 0];
        var match$3 = match_2;
        var match$4 = match_1$1;
        var match$5 = match_0$1;
        return {
                k: match$4[0],
                v: match$4[1],
                h: 2,
                l: singleton(match$5[0], match$5[1]),
                r: singleton(match$3[0], match$3[1])
              };
    default:
      var nl = len / 2 | 0;
      var left = fromSortedArrayAux(arr, off, nl);
      var match$6 = arr[off + nl | 0];
      var right = fromSortedArrayAux(arr, (off + nl | 0) + 1 | 0, (len - nl | 0) - 1 | 0);
      return create(left, match$6[0], match$6[1], right);
  }
}

function fromSortedArrayUnsafe(arr) {
  return fromSortedArrayAux(arr, 0, arr.length);
}

function cmpU(s1, s2, kcmp, vcmp) {
  var len1 = size(s1);
  var len2 = size(s2);
  if (len1 === len2) {
    var _e1 = stackAllLeft(s1, /* [] */0);
    var _e2 = stackAllLeft(s2, /* [] */0);
    while(true) {
      var e2 = _e2;
      var e1 = _e1;
      if (!e1) {
        return 0;
      }
      if (!e2) {
        return 0;
      }
      var h2 = e2.hd;
      var h1 = e1.hd;
      var c = kcmp(h1.k, h2.k);
      if (c !== 0) {
        return c;
      }
      var cx = vcmp(h1.v, h2.v);
      if (cx !== 0) {
        return cx;
      }
      _e2 = stackAllLeft(h2.r, e2.tl);
      _e1 = stackAllLeft(h1.r, e1.tl);
      continue ;
    };
  } else if (len1 < len2) {
    return -1;
  } else {
    return 1;
  }
}

function cmp(s1, s2, kcmp, vcmp) {
  return cmpU(s1, s2, kcmp, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__2(vcmp));
}

function eqU(s1, s2, kcmp, veq) {
  var len1 = size(s1);
  var len2 = size(s2);
  if (len1 === len2) {
    var _e1 = stackAllLeft(s1, /* [] */0);
    var _e2 = stackAllLeft(s2, /* [] */0);
    while(true) {
      var e2 = _e2;
      var e1 = _e1;
      if (!e1) {
        return true;
      }
      if (!e2) {
        return true;
      }
      var h2 = e2.hd;
      var h1 = e1.hd;
      if (!(kcmp(h1.k, h2.k) === 0 && veq(h1.v, h2.v))) {
        return false;
      }
      _e2 = stackAllLeft(h2.r, e2.tl);
      _e1 = stackAllLeft(h1.r, e1.tl);
      continue ;
    };
  } else {
    return false;
  }
}

function eq(s1, s2, kcmp, veq) {
  return eqU(s1, s2, kcmp, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__2(veq));
}

function get(_n, x, cmp) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return ;
    }
    var v = n.k;
    var c = cmp(x, v);
    if (c === 0) {
      return _caml_option_js__WEBPACK_IMPORTED_MODULE_1__.some(n.v);
    }
    _n = c < 0 ? n.l : n.r;
    continue ;
  };
}

function getUndefined(_n, x, cmp) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return ;
    }
    var v = n.k;
    var c = cmp(x, v);
    if (c === 0) {
      return n.v;
    }
    _n = c < 0 ? n.l : n.r;
    continue ;
  };
}

function getExn(_n, x, cmp) {
  while(true) {
    var n = _n;
    if (n !== undefined) {
      var v = n.k;
      var c = cmp(x, v);
      if (c === 0) {
        return n.v;
      }
      _n = c < 0 ? n.l : n.r;
      continue ;
    }
    throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
  };
}

function getWithDefault(_n, x, def, cmp) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return def;
    }
    var v = n.k;
    var c = cmp(x, v);
    if (c === 0) {
      return n.v;
    }
    _n = c < 0 ? n.l : n.r;
    continue ;
  };
}

function has(_n, x, cmp) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return false;
    }
    var v = n.k;
    var c = cmp(x, v);
    if (c === 0) {
      return true;
    }
    _n = c < 0 ? n.l : n.r;
    continue ;
  };
}

function rotateWithLeftChild(k2) {
  var k1 = k2.l;
  k2.l = k1.r;
  k1.r = k2;
  var hlk2 = treeHeight(k2.l);
  var hrk2 = treeHeight(k2.r);
  k2.h = (
    hlk2 > hrk2 ? hlk2 : hrk2
  ) + 1 | 0;
  var hlk1 = treeHeight(k1.l);
  var hk2 = k2.h;
  k1.h = (
    hlk1 > hk2 ? hlk1 : hk2
  ) + 1 | 0;
  return k1;
}

function rotateWithRightChild(k1) {
  var k2 = k1.r;
  k1.r = k2.l;
  k2.l = k1;
  var hlk1 = treeHeight(k1.l);
  var hrk1 = treeHeight(k1.r);
  k1.h = (
    hlk1 > hrk1 ? hlk1 : hrk1
  ) + 1 | 0;
  var hrk2 = treeHeight(k2.r);
  var hk1 = k1.h;
  k2.h = (
    hrk2 > hk1 ? hrk2 : hk1
  ) + 1 | 0;
  return k2;
}

function doubleWithLeftChild(k3) {
  var x = k3.l;
  var v = rotateWithRightChild(x);
  k3.l = v;
  return rotateWithLeftChild(k3);
}

function doubleWithRightChild(k2) {
  var x = k2.r;
  var v = rotateWithLeftChild(x);
  k2.r = v;
  return rotateWithRightChild(k2);
}

function heightUpdateMutate(t) {
  var hlt = treeHeight(t.l);
  var hrt = treeHeight(t.r);
  t.h = (
    hlt > hrt ? hlt : hrt
  ) + 1 | 0;
  return t;
}

function balMutate(nt) {
  var l = nt.l;
  var r = nt.r;
  var hl = treeHeight(l);
  var hr = treeHeight(r);
  if (hl > (2 + hr | 0)) {
    var ll = l.l;
    var lr = l.r;
    if (heightGe(ll, lr)) {
      return heightUpdateMutate(rotateWithLeftChild(nt));
    } else {
      return heightUpdateMutate(doubleWithLeftChild(nt));
    }
  }
  if (hr > (2 + hl | 0)) {
    var rl = r.l;
    var rr = r.r;
    if (heightGe(rr, rl)) {
      return heightUpdateMutate(rotateWithRightChild(nt));
    } else {
      return heightUpdateMutate(doubleWithRightChild(nt));
    }
  }
  nt.h = (
    hl > hr ? hl : hr
  ) + 1 | 0;
  return nt;
}

function updateMutate(t, x, data, cmp) {
  if (t === undefined) {
    return singleton(x, data);
  }
  var k = t.k;
  var c = cmp(x, k);
  if (c === 0) {
    t.v = data;
    return t;
  }
  var l = t.l;
  var r = t.r;
  if (c < 0) {
    var ll = updateMutate(l, x, data, cmp);
    t.l = ll;
  } else {
    t.r = updateMutate(r, x, data, cmp);
  }
  return balMutate(t);
}

function fromArray(xs, cmp) {
  var len = xs.length;
  if (len === 0) {
    return ;
  }
  var next = _belt_SortArray_js__WEBPACK_IMPORTED_MODULE_2__.strictlySortedLengthU(xs, (function (param, param$1) {
          return cmp(param[0], param$1[0]) < 0;
        }));
  var result;
  if (next >= 0) {
    result = fromSortedArrayAux(xs, 0, next);
  } else {
    next = -next | 0;
    result = fromSortedArrayRevAux(xs, next - 1 | 0, next);
  }
  for(var i = next; i < len; ++i){
    var match = xs[i];
    result = updateMutate(result, match[0], match[1], cmp);
  }
  return result;
}

function removeMinAuxWithRootMutate(nt, n) {
  var rn = n.r;
  var ln = n.l;
  if (ln !== undefined) {
    n.l = removeMinAuxWithRootMutate(nt, ln);
    return balMutate(n);
  } else {
    nt.k = n.k;
    nt.v = n.v;
    return rn;
  }
}


/* No side effect */


/***/ }),
/* 56 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$$String": () => (/* binding */ $$String),
/* harmony export */   "Int": () => (/* binding */ Int),
/* harmony export */   "binarySearchBy": () => (/* binding */ binarySearchBy),
/* harmony export */   "binarySearchByU": () => (/* binding */ binarySearchByU),
/* harmony export */   "diff": () => (/* binding */ diff),
/* harmony export */   "diffU": () => (/* binding */ diffU),
/* harmony export */   "intersect": () => (/* binding */ intersect),
/* harmony export */   "intersectU": () => (/* binding */ intersectU),
/* harmony export */   "isSorted": () => (/* binding */ isSorted),
/* harmony export */   "isSortedU": () => (/* binding */ isSortedU),
/* harmony export */   "stableSortBy": () => (/* binding */ stableSortBy),
/* harmony export */   "stableSortByU": () => (/* binding */ stableSortByU),
/* harmony export */   "stableSortInPlaceBy": () => (/* binding */ stableSortInPlaceBy),
/* harmony export */   "stableSortInPlaceByU": () => (/* binding */ stableSortInPlaceByU),
/* harmony export */   "strictlySortedLength": () => (/* binding */ strictlySortedLength),
/* harmony export */   "strictlySortedLengthU": () => (/* binding */ strictlySortedLengthU),
/* harmony export */   "union": () => (/* binding */ union),
/* harmony export */   "unionU": () => (/* binding */ unionU)
/* harmony export */ });
/* harmony import */ var _curry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _belt_Array_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(26);





function sortedLengthAuxMore(xs, _prec, _acc, len, lt) {
  while(true) {
    var acc = _acc;
    var prec = _prec;
    if (acc >= len) {
      return acc;
    }
    var v = xs[acc];
    if (!lt(v, prec)) {
      return acc;
    }
    _acc = acc + 1 | 0;
    _prec = v;
    continue ;
  };
}

function strictlySortedLengthU(xs, lt) {
  var len = xs.length;
  if (len === 0 || len === 1) {
    return len;
  }
  var x0 = xs[0];
  var x1 = xs[1];
  if (lt(x0, x1)) {
    var _prec = x1;
    var _acc = 2;
    while(true) {
      var acc = _acc;
      var prec = _prec;
      if (acc >= len) {
        return acc;
      }
      var v = xs[acc];
      if (!lt(prec, v)) {
        return acc;
      }
      _acc = acc + 1 | 0;
      _prec = v;
      continue ;
    };
  } else if (lt(x1, x0)) {
    return -sortedLengthAuxMore(xs, x1, 2, len, lt) | 0;
  } else {
    return 1;
  }
}

function strictlySortedLength(xs, lt) {
  return strictlySortedLengthU(xs, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__2(lt));
}

function isSortedU(a, cmp) {
  var len = a.length;
  if (len === 0) {
    return true;
  } else {
    var _i = 0;
    var last_bound = len - 1 | 0;
    while(true) {
      var i = _i;
      if (i === last_bound) {
        return true;
      }
      if (cmp(a[i], a[i + 1 | 0]) > 0) {
        return false;
      }
      _i = i + 1 | 0;
      continue ;
    };
  }
}

function isSorted(a, cmp) {
  return isSortedU(a, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__2(cmp));
}

function merge(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
  var src1r = src1ofs + src1len | 0;
  var src2r = src2ofs + src2len | 0;
  var _i1 = src1ofs;
  var _s1 = src[src1ofs];
  var _i2 = src2ofs;
  var _s2 = src2[src2ofs];
  var _d = dstofs;
  while(true) {
    var d = _d;
    var s2 = _s2;
    var i2 = _i2;
    var s1 = _s1;
    var i1 = _i1;
    if (cmp(s1, s2) <= 0) {
      dst[d] = s1;
      var i1$1 = i1 + 1 | 0;
      if (i1$1 >= src1r) {
        return _belt_Array_js__WEBPACK_IMPORTED_MODULE_1__.blitUnsafe(src2, i2, dst, d + 1 | 0, src2r - i2 | 0);
      }
      _d = d + 1 | 0;
      _s1 = src[i1$1];
      _i1 = i1$1;
      continue ;
    }
    dst[d] = s2;
    var i2$1 = i2 + 1 | 0;
    if (i2$1 >= src2r) {
      return _belt_Array_js__WEBPACK_IMPORTED_MODULE_1__.blitUnsafe(src, i1, dst, d + 1 | 0, src1r - i1 | 0);
    }
    _d = d + 1 | 0;
    _s2 = src2[i2$1];
    _i2 = i2$1;
    continue ;
  };
}

function unionU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
  var src1r = src1ofs + src1len | 0;
  var src2r = src2ofs + src2len | 0;
  var _i1 = src1ofs;
  var _s1 = src[src1ofs];
  var _i2 = src2ofs;
  var _s2 = src2[src2ofs];
  var _d = dstofs;
  while(true) {
    var d = _d;
    var s2 = _s2;
    var i2 = _i2;
    var s1 = _s1;
    var i1 = _i1;
    var c = cmp(s1, s2);
    if (c < 0) {
      dst[d] = s1;
      var i1$1 = i1 + 1 | 0;
      var d$1 = d + 1 | 0;
      if (i1$1 < src1r) {
        _d = d$1;
        _s1 = src[i1$1];
        _i1 = i1$1;
        continue ;
      }
      _belt_Array_js__WEBPACK_IMPORTED_MODULE_1__.blitUnsafe(src2, i2, dst, d$1, src2r - i2 | 0);
      return (d$1 + src2r | 0) - i2 | 0;
    }
    if (c === 0) {
      dst[d] = s1;
      var i1$2 = i1 + 1 | 0;
      var i2$1 = i2 + 1 | 0;
      var d$2 = d + 1 | 0;
      if (!(i1$2 < src1r && i2$1 < src2r)) {
        if (i1$2 === src1r) {
          _belt_Array_js__WEBPACK_IMPORTED_MODULE_1__.blitUnsafe(src2, i2$1, dst, d$2, src2r - i2$1 | 0);
          return (d$2 + src2r | 0) - i2$1 | 0;
        } else {
          _belt_Array_js__WEBPACK_IMPORTED_MODULE_1__.blitUnsafe(src, i1$2, dst, d$2, src1r - i1$2 | 0);
          return (d$2 + src1r | 0) - i1$2 | 0;
        }
      }
      _d = d$2;
      _s2 = src2[i2$1];
      _i2 = i2$1;
      _s1 = src[i1$2];
      _i1 = i1$2;
      continue ;
    }
    dst[d] = s2;
    var i2$2 = i2 + 1 | 0;
    var d$3 = d + 1 | 0;
    if (i2$2 < src2r) {
      _d = d$3;
      _s2 = src2[i2$2];
      _i2 = i2$2;
      continue ;
    }
    _belt_Array_js__WEBPACK_IMPORTED_MODULE_1__.blitUnsafe(src, i1, dst, d$3, src1r - i1 | 0);
    return (d$3 + src1r | 0) - i1 | 0;
  };
}

function union(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
  return unionU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__2(cmp));
}

function intersectU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
  var src1r = src1ofs + src1len | 0;
  var src2r = src2ofs + src2len | 0;
  var _i1 = src1ofs;
  var _s1 = src[src1ofs];
  var _i2 = src2ofs;
  var _s2 = src2[src2ofs];
  var _d = dstofs;
  while(true) {
    var d = _d;
    var s2 = _s2;
    var i2 = _i2;
    var s1 = _s1;
    var i1 = _i1;
    var c = cmp(s1, s2);
    if (c < 0) {
      var i1$1 = i1 + 1 | 0;
      if (i1$1 >= src1r) {
        return d;
      }
      _s1 = src[i1$1];
      _i1 = i1$1;
      continue ;
    }
    if (c === 0) {
      dst[d] = s1;
      var i1$2 = i1 + 1 | 0;
      var i2$1 = i2 + 1 | 0;
      var d$1 = d + 1 | 0;
      if (!(i1$2 < src1r && i2$1 < src2r)) {
        return d$1;
      }
      _d = d$1;
      _s2 = src2[i2$1];
      _i2 = i2$1;
      _s1 = src[i1$2];
      _i1 = i1$2;
      continue ;
    }
    var i2$2 = i2 + 1 | 0;
    if (i2$2 >= src2r) {
      return d;
    }
    _s2 = src2[i2$2];
    _i2 = i2$2;
    continue ;
  };
}

function intersect(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
  return intersectU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__2(cmp));
}

function diffU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
  var src1r = src1ofs + src1len | 0;
  var src2r = src2ofs + src2len | 0;
  var _i1 = src1ofs;
  var _s1 = src[src1ofs];
  var _i2 = src2ofs;
  var _s2 = src2[src2ofs];
  var _d = dstofs;
  while(true) {
    var d = _d;
    var s2 = _s2;
    var i2 = _i2;
    var s1 = _s1;
    var i1 = _i1;
    var c = cmp(s1, s2);
    if (c < 0) {
      dst[d] = s1;
      var d$1 = d + 1 | 0;
      var i1$1 = i1 + 1 | 0;
      if (i1$1 >= src1r) {
        return d$1;
      }
      _d = d$1;
      _s1 = src[i1$1];
      _i1 = i1$1;
      continue ;
    }
    if (c === 0) {
      var i1$2 = i1 + 1 | 0;
      var i2$1 = i2 + 1 | 0;
      if (!(i1$2 < src1r && i2$1 < src2r)) {
        if (i1$2 === src1r) {
          return d;
        } else {
          _belt_Array_js__WEBPACK_IMPORTED_MODULE_1__.blitUnsafe(src, i1$2, dst, d, src1r - i1$2 | 0);
          return (d + src1r | 0) - i1$2 | 0;
        }
      }
      _s2 = src2[i2$1];
      _i2 = i2$1;
      _s1 = src[i1$2];
      _i1 = i1$2;
      continue ;
    }
    var i2$2 = i2 + 1 | 0;
    if (i2$2 < src2r) {
      _s2 = src2[i2$2];
      _i2 = i2$2;
      continue ;
    }
    _belt_Array_js__WEBPACK_IMPORTED_MODULE_1__.blitUnsafe(src, i1, dst, d, src1r - i1 | 0);
    return (d + src1r | 0) - i1 | 0;
  };
}

function diff(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
  return diffU(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__2(cmp));
}

function insertionSort(src, srcofs, dst, dstofs, len, cmp) {
  for(var i = 0; i < len; ++i){
    var e = src[srcofs + i | 0];
    var j = (dstofs + i | 0) - 1 | 0;
    while(j >= dstofs && cmp(dst[j], e) > 0) {
      dst[j + 1 | 0] = dst[j];
      j = j - 1 | 0;
    };
    dst[j + 1 | 0] = e;
  }
  
}

function sortTo(src, srcofs, dst, dstofs, len, cmp) {
  if (len <= 5) {
    return insertionSort(src, srcofs, dst, dstofs, len, cmp);
  }
  var l1 = len / 2 | 0;
  var l2 = len - l1 | 0;
  sortTo(src, srcofs + l1 | 0, dst, dstofs + l1 | 0, l2, cmp);
  sortTo(src, srcofs, src, srcofs + l2 | 0, l1, cmp);
  return merge(src, srcofs + l2 | 0, l1, dst, dstofs + l1 | 0, l2, dst, dstofs, cmp);
}

function stableSortInPlaceByU(a, cmp) {
  var l = a.length;
  if (l <= 5) {
    return insertionSort(a, 0, a, 0, l, cmp);
  }
  var l1 = l / 2 | 0;
  var l2 = l - l1 | 0;
  var t = new Array(l2);
  sortTo(a, l1, t, 0, l2, cmp);
  sortTo(a, 0, a, l2, l1, cmp);
  return merge(a, l2, l1, t, 0, l2, a, 0, cmp);
}

function stableSortInPlaceBy(a, cmp) {
  return stableSortInPlaceByU(a, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__2(cmp));
}

function stableSortByU(a, cmp) {
  var b = a.slice(0);
  stableSortInPlaceByU(b, cmp);
  return b;
}

function stableSortBy(a, cmp) {
  return stableSortByU(a, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__2(cmp));
}

function binarySearchByU(sorted, key, cmp) {
  var len = sorted.length;
  if (len === 0) {
    return -1;
  }
  var lo = sorted[0];
  var c = cmp(key, lo);
  if (c < 0) {
    return -1;
  }
  var hi = sorted[len - 1 | 0];
  var c2 = cmp(key, hi);
  if (c2 > 0) {
    return -(len + 1 | 0) | 0;
  } else {
    var _lo = 0;
    var _hi = len - 1 | 0;
    while(true) {
      var hi$1 = _hi;
      var lo$1 = _lo;
      var mid = (lo$1 + hi$1 | 0) / 2 | 0;
      var midVal = sorted[mid];
      var c$1 = cmp(key, midVal);
      if (c$1 === 0) {
        return mid;
      }
      if (c$1 < 0) {
        if (hi$1 === mid) {
          if (cmp(sorted[lo$1], key) === 0) {
            return lo$1;
          } else {
            return -(hi$1 + 1 | 0) | 0;
          }
        }
        _hi = mid;
        continue ;
      }
      if (lo$1 === mid) {
        if (cmp(sorted[hi$1], key) === 0) {
          return hi$1;
        } else {
          return -(hi$1 + 1 | 0) | 0;
        }
      }
      _lo = mid;
      continue ;
    };
  }
}

function binarySearchBy(sorted, key, cmp) {
  return binarySearchByU(sorted, key, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__2(cmp));
}

var Int;

var $$String;


/* No side effect */


/***/ }),
/* 57 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "A": () => (/* binding */ A),
/* harmony export */   "N": () => (/* binding */ N),
/* harmony export */   "S": () => (/* binding */ S),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "addMutate": () => (/* binding */ addMutate),
/* harmony export */   "cmp": () => (/* binding */ cmp),
/* harmony export */   "cmpU": () => (/* binding */ cmpU),
/* harmony export */   "compareAux": () => (/* binding */ compareAux),
/* harmony export */   "eq": () => (/* binding */ eq),
/* harmony export */   "eqAux": () => (/* binding */ eqAux),
/* harmony export */   "eqU": () => (/* binding */ eqU),
/* harmony export */   "fromArray": () => (/* binding */ fromArray),
/* harmony export */   "get": () => (/* binding */ get),
/* harmony export */   "getExn": () => (/* binding */ getExn),
/* harmony export */   "getUndefined": () => (/* binding */ getUndefined),
/* harmony export */   "getWithDefault": () => (/* binding */ getWithDefault),
/* harmony export */   "has": () => (/* binding */ has),
/* harmony export */   "merge": () => (/* binding */ merge),
/* harmony export */   "mergeU": () => (/* binding */ mergeU),
/* harmony export */   "remove": () => (/* binding */ remove),
/* harmony export */   "split": () => (/* binding */ split),
/* harmony export */   "splitAux": () => (/* binding */ splitAux)
/* harmony export */ });
/* harmony import */ var _caml_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27);
/* harmony import */ var _curry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _caml_option_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var _belt_SortArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56);
/* harmony import */ var _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(55);








function add(t, x, data) {
  if (t === undefined) {
    return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.singleton(x, data);
  }
  var k = t.k;
  if (x === k) {
    return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.updateValue(t, data);
  }
  var v = t.v;
  if (x < k) {
    return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.bal(add(t.l, x, data), k, v, t.r);
  } else {
    return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.bal(t.l, k, v, add(t.r, x, data));
  }
}

function get(_n, x) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return ;
    }
    var v = n.k;
    if (x === v) {
      return _caml_option_js__WEBPACK_IMPORTED_MODULE_2__.some(n.v);
    }
    _n = x < v ? n.l : n.r;
    continue ;
  };
}

function getUndefined(_n, x) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return ;
    }
    var v = n.k;
    if (x === v) {
      return n.v;
    }
    _n = x < v ? n.l : n.r;
    continue ;
  };
}

function getExn(_n, x) {
  while(true) {
    var n = _n;
    if (n !== undefined) {
      var v = n.k;
      if (x === v) {
        return n.v;
      }
      _n = x < v ? n.l : n.r;
      continue ;
    }
    throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
  };
}

function getWithDefault(_n, x, def) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return def;
    }
    var v = n.k;
    if (x === v) {
      return n.v;
    }
    _n = x < v ? n.l : n.r;
    continue ;
  };
}

function has(_n, x) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return false;
    }
    var v = n.k;
    if (x === v) {
      return true;
    }
    _n = x < v ? n.l : n.r;
    continue ;
  };
}

function remove(n, x) {
  if (n === undefined) {
    return n;
  }
  var v = n.k;
  var l = n.l;
  var r = n.r;
  if (x !== v) {
    if (x < v) {
      return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.bal(remove(l, x), v, n.v, r);
    } else {
      return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.bal(l, v, n.v, remove(r, x));
    }
  }
  if (l === undefined) {
    return r;
  }
  if (r === undefined) {
    return l;
  }
  var kr = {
    contents: r.k
  };
  var vr = {
    contents: r.v
  };
  var r$1 = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.removeMinAuxWithRef(r, kr, vr);
  return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.bal(l, kr.contents, vr.contents, r$1);
}

function splitAux(x, n) {
  var v = n.k;
  var d = n.v;
  var l = n.l;
  var r = n.r;
  if (x === v) {
    return [
            l,
            _caml_option_js__WEBPACK_IMPORTED_MODULE_2__.some(d),
            r
          ];
  }
  if (x < v) {
    if (l === undefined) {
      return [
              undefined,
              undefined,
              n
            ];
    }
    var match = splitAux(x, l);
    return [
            match[0],
            match[1],
            _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.join(match[2], v, d, r)
          ];
  }
  if (r === undefined) {
    return [
            n,
            undefined,
            undefined
          ];
  }
  var match$1 = splitAux(x, r);
  return [
          _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.join(l, v, d, match$1[0]),
          match$1[1],
          match$1[2]
        ];
}

function split(x, n) {
  if (n !== undefined) {
    return splitAux(x, n);
  } else {
    return [
            undefined,
            undefined,
            undefined
          ];
  }
}

function mergeU(s1, s2, f) {
  if (s1 !== undefined) {
    if (s1.h >= (
        s2 !== undefined ? s2.h : 0
      )) {
      var v1 = s1.k;
      var d1 = s1.v;
      var l1 = s1.l;
      var r1 = s1.r;
      var match = split(v1, s2);
      return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.concatOrJoin(mergeU(l1, match[0], f), v1, f(v1, _caml_option_js__WEBPACK_IMPORTED_MODULE_2__.some(d1), match[1]), mergeU(r1, match[2], f));
    }
    
  } else if (s2 === undefined) {
    return ;
  }
  var v2 = s2.k;
  var d2 = s2.v;
  var l2 = s2.l;
  var r2 = s2.r;
  var match$1 = split(v2, s1);
  return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.concatOrJoin(mergeU(match$1[0], l2, f), v2, f(v2, match$1[1], _caml_option_js__WEBPACK_IMPORTED_MODULE_2__.some(d2)), mergeU(match$1[2], r2, f));
}

function merge(s1, s2, f) {
  return mergeU(s1, s2, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__3(f));
}

function compareAux(_e1, _e2, vcmp) {
  while(true) {
    var e2 = _e2;
    var e1 = _e1;
    if (!e1) {
      return 0;
    }
    if (!e2) {
      return 0;
    }
    var h2 = e2.hd;
    var h1 = e1.hd;
    var c = _caml_js__WEBPACK_IMPORTED_MODULE_0__.caml_string_compare(h1.k, h2.k);
    if (c !== 0) {
      return c;
    }
    var cx = vcmp(h1.v, h2.v);
    if (cx !== 0) {
      return cx;
    }
    _e2 = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.stackAllLeft(h2.r, e2.tl);
    _e1 = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.stackAllLeft(h1.r, e1.tl);
    continue ;
  };
}

function cmpU(s1, s2, cmp) {
  var len1 = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.size(s1);
  var len2 = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.size(s2);
  if (len1 === len2) {
    return compareAux(_belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.stackAllLeft(s1, /* [] */0), _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.stackAllLeft(s2, /* [] */0), cmp);
  } else if (len1 < len2) {
    return -1;
  } else {
    return 1;
  }
}

function cmp(s1, s2, f) {
  return cmpU(s1, s2, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__2(f));
}

function eqAux(_e1, _e2, eq) {
  while(true) {
    var e2 = _e2;
    var e1 = _e1;
    if (!e1) {
      return true;
    }
    if (!e2) {
      return true;
    }
    var h2 = e2.hd;
    var h1 = e1.hd;
    if (!(h1.k === h2.k && eq(h1.v, h2.v))) {
      return false;
    }
    _e2 = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.stackAllLeft(h2.r, e2.tl);
    _e1 = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.stackAllLeft(h1.r, e1.tl);
    continue ;
  };
}

function eqU(s1, s2, eq) {
  var len1 = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.size(s1);
  var len2 = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.size(s2);
  if (len1 === len2) {
    return eqAux(_belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.stackAllLeft(s1, /* [] */0), _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.stackAllLeft(s2, /* [] */0), eq);
  } else {
    return false;
  }
}

function eq(s1, s2, f) {
  return eqU(s1, s2, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__2(f));
}

function addMutate(t, x, data) {
  if (t === undefined) {
    return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.singleton(x, data);
  }
  var k = t.k;
  if (x === k) {
    t.k = x;
    t.v = data;
    return t;
  }
  var l = t.l;
  var r = t.r;
  if (x < k) {
    var ll = addMutate(l, x, data);
    t.l = ll;
  } else {
    t.r = addMutate(r, x, data);
  }
  return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.balMutate(t);
}

function fromArray(xs) {
  var len = xs.length;
  if (len === 0) {
    return ;
  }
  var next = _belt_SortArray_js__WEBPACK_IMPORTED_MODULE_3__.strictlySortedLengthU(xs, (function (param, param$1) {
          return param[0] < param$1[0];
        }));
  var result;
  if (next >= 0) {
    result = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.fromSortedArrayAux(xs, 0, next);
  } else {
    next = -next | 0;
    result = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.fromSortedArrayRevAux(xs, next - 1 | 0, next);
  }
  for(var i = next; i < len; ++i){
    var match = xs[i];
    result = addMutate(result, match[0], match[1]);
  }
  return result;
}

var N;

var A;

var S;


/* No side effect */


/***/ }),
/* 58 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "binarySearch": () => (/* binding */ binarySearch),
/* harmony export */   "diff": () => (/* binding */ diff),
/* harmony export */   "intersect": () => (/* binding */ intersect),
/* harmony export */   "isSorted": () => (/* binding */ isSorted),
/* harmony export */   "stableSort": () => (/* binding */ stableSort),
/* harmony export */   "stableSortInPlace": () => (/* binding */ stableSortInPlace),
/* harmony export */   "strictlySortedLength": () => (/* binding */ strictlySortedLength),
/* harmony export */   "union": () => (/* binding */ union)
/* harmony export */ });
/* harmony import */ var _belt_Array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(26);




function sortedLengthAuxMore(xs, _prec, _acc, len) {
  while(true) {
    var acc = _acc;
    var prec = _prec;
    if (acc >= len) {
      return acc;
    }
    var v = xs[acc];
    if (prec <= v) {
      return acc;
    }
    _acc = acc + 1 | 0;
    _prec = v;
    continue ;
  };
}

function strictlySortedLength(xs) {
  var len = xs.length;
  if (len === 0 || len === 1) {
    return len;
  }
  var x0 = xs[0];
  var x1 = xs[1];
  if (x0 < x1) {
    var _prec = x1;
    var _acc = 2;
    while(true) {
      var acc = _acc;
      var prec = _prec;
      if (acc >= len) {
        return acc;
      }
      var v = xs[acc];
      if (prec >= v) {
        return acc;
      }
      _acc = acc + 1 | 0;
      _prec = v;
      continue ;
    };
  } else if (x0 > x1) {
    return -sortedLengthAuxMore(xs, x1, 2, len) | 0;
  } else {
    return 1;
  }
}

function isSorted(a) {
  var len = a.length;
  if (len === 0) {
    return true;
  } else {
    var _i = 0;
    var last_bound = len - 1 | 0;
    while(true) {
      var i = _i;
      if (i === last_bound) {
        return true;
      }
      if (a[i] > a[i + 1 | 0]) {
        return false;
      }
      _i = i + 1 | 0;
      continue ;
    };
  }
}

function merge(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs) {
  var src1r = src1ofs + src1len | 0;
  var src2r = src2ofs + src2len | 0;
  var _i1 = src1ofs;
  var _s1 = src[src1ofs];
  var _i2 = src2ofs;
  var _s2 = src2[src2ofs];
  var _d = dstofs;
  while(true) {
    var d = _d;
    var s2 = _s2;
    var i2 = _i2;
    var s1 = _s1;
    var i1 = _i1;
    if (s1 <= s2) {
      dst[d] = s1;
      var i1$1 = i1 + 1 | 0;
      if (i1$1 >= src1r) {
        return _belt_Array_js__WEBPACK_IMPORTED_MODULE_0__.blitUnsafe(src2, i2, dst, d + 1 | 0, src2r - i2 | 0);
      }
      _d = d + 1 | 0;
      _s1 = src[i1$1];
      _i1 = i1$1;
      continue ;
    }
    dst[d] = s2;
    var i2$1 = i2 + 1 | 0;
    if (i2$1 >= src2r) {
      return _belt_Array_js__WEBPACK_IMPORTED_MODULE_0__.blitUnsafe(src, i1, dst, d + 1 | 0, src1r - i1 | 0);
    }
    _d = d + 1 | 0;
    _s2 = src2[i2$1];
    _i2 = i2$1;
    continue ;
  };
}

function union(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs) {
  var src1r = src1ofs + src1len | 0;
  var src2r = src2ofs + src2len | 0;
  var _i1 = src1ofs;
  var _s1 = src[src1ofs];
  var _i2 = src2ofs;
  var _s2 = src2[src2ofs];
  var _d = dstofs;
  while(true) {
    var d = _d;
    var s2 = _s2;
    var i2 = _i2;
    var s1 = _s1;
    var i1 = _i1;
    if (s1 < s2) {
      dst[d] = s1;
      var i1$1 = i1 + 1 | 0;
      var d$1 = d + 1 | 0;
      if (i1$1 < src1r) {
        _d = d$1;
        _s1 = src[i1$1];
        _i1 = i1$1;
        continue ;
      }
      _belt_Array_js__WEBPACK_IMPORTED_MODULE_0__.blitUnsafe(src2, i2, dst, d$1, src2r - i2 | 0);
      return (d$1 + src2r | 0) - i2 | 0;
    }
    if (s1 === s2) {
      dst[d] = s1;
      var i1$2 = i1 + 1 | 0;
      var i2$1 = i2 + 1 | 0;
      var d$2 = d + 1 | 0;
      if (!(i1$2 < src1r && i2$1 < src2r)) {
        if (i1$2 === src1r) {
          _belt_Array_js__WEBPACK_IMPORTED_MODULE_0__.blitUnsafe(src2, i2$1, dst, d$2, src2r - i2$1 | 0);
          return (d$2 + src2r | 0) - i2$1 | 0;
        } else {
          _belt_Array_js__WEBPACK_IMPORTED_MODULE_0__.blitUnsafe(src, i1$2, dst, d$2, src1r - i1$2 | 0);
          return (d$2 + src1r | 0) - i1$2 | 0;
        }
      }
      _d = d$2;
      _s2 = src2[i2$1];
      _i2 = i2$1;
      _s1 = src[i1$2];
      _i1 = i1$2;
      continue ;
    }
    dst[d] = s2;
    var i2$2 = i2 + 1 | 0;
    var d$3 = d + 1 | 0;
    if (i2$2 < src2r) {
      _d = d$3;
      _s2 = src2[i2$2];
      _i2 = i2$2;
      continue ;
    }
    _belt_Array_js__WEBPACK_IMPORTED_MODULE_0__.blitUnsafe(src, i1, dst, d$3, src1r - i1 | 0);
    return (d$3 + src1r | 0) - i1 | 0;
  };
}

function intersect(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs) {
  var src1r = src1ofs + src1len | 0;
  var src2r = src2ofs + src2len | 0;
  var _i1 = src1ofs;
  var _s1 = src[src1ofs];
  var _i2 = src2ofs;
  var _s2 = src2[src2ofs];
  var _d = dstofs;
  while(true) {
    var d = _d;
    var s2 = _s2;
    var i2 = _i2;
    var s1 = _s1;
    var i1 = _i1;
    if (s1 < s2) {
      var i1$1 = i1 + 1 | 0;
      if (i1$1 >= src1r) {
        return d;
      }
      _s1 = src[i1$1];
      _i1 = i1$1;
      continue ;
    }
    if (s1 === s2) {
      dst[d] = s1;
      var i1$2 = i1 + 1 | 0;
      var i2$1 = i2 + 1 | 0;
      var d$1 = d + 1 | 0;
      if (!(i1$2 < src1r && i2$1 < src2r)) {
        return d$1;
      }
      _d = d$1;
      _s2 = src2[i2$1];
      _i2 = i2$1;
      _s1 = src[i1$2];
      _i1 = i1$2;
      continue ;
    }
    var i2$2 = i2 + 1 | 0;
    if (i2$2 >= src2r) {
      return d;
    }
    _s2 = src2[i2$2];
    _i2 = i2$2;
    continue ;
  };
}

function diff(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs) {
  var src1r = src1ofs + src1len | 0;
  var src2r = src2ofs + src2len | 0;
  var _i1 = src1ofs;
  var _s1 = src[src1ofs];
  var _i2 = src2ofs;
  var _s2 = src2[src2ofs];
  var _d = dstofs;
  while(true) {
    var d = _d;
    var s2 = _s2;
    var i2 = _i2;
    var s1 = _s1;
    var i1 = _i1;
    if (s1 < s2) {
      dst[d] = s1;
      var d$1 = d + 1 | 0;
      var i1$1 = i1 + 1 | 0;
      if (i1$1 >= src1r) {
        return d$1;
      }
      _d = d$1;
      _s1 = src[i1$1];
      _i1 = i1$1;
      continue ;
    }
    if (s1 === s2) {
      var i1$2 = i1 + 1 | 0;
      var i2$1 = i2 + 1 | 0;
      if (!(i1$2 < src1r && i2$1 < src2r)) {
        if (i1$2 === src1r) {
          return d;
        } else {
          _belt_Array_js__WEBPACK_IMPORTED_MODULE_0__.blitUnsafe(src, i1$2, dst, d, src1r - i1$2 | 0);
          return (d + src1r | 0) - i1$2 | 0;
        }
      }
      _s2 = src2[i2$1];
      _i2 = i2$1;
      _s1 = src[i1$2];
      _i1 = i1$2;
      continue ;
    }
    var i2$2 = i2 + 1 | 0;
    if (i2$2 < src2r) {
      _s2 = src2[i2$2];
      _i2 = i2$2;
      continue ;
    }
    _belt_Array_js__WEBPACK_IMPORTED_MODULE_0__.blitUnsafe(src, i1, dst, d, src1r - i1 | 0);
    return (d + src1r | 0) - i1 | 0;
  };
}

function insertionSort(src, srcofs, dst, dstofs, len) {
  for(var i = 0; i < len; ++i){
    var e = src[srcofs + i | 0];
    var j = (dstofs + i | 0) - 1 | 0;
    while(j >= dstofs && dst[j] > e) {
      dst[j + 1 | 0] = dst[j];
      j = j - 1 | 0;
    };
    dst[j + 1 | 0] = e;
  }
  
}

function sortTo(src, srcofs, dst, dstofs, len) {
  if (len <= 5) {
    return insertionSort(src, srcofs, dst, dstofs, len);
  }
  var l1 = len / 2 | 0;
  var l2 = len - l1 | 0;
  sortTo(src, srcofs + l1 | 0, dst, dstofs + l1 | 0, l2);
  sortTo(src, srcofs, src, srcofs + l2 | 0, l1);
  return merge(src, srcofs + l2 | 0, l1, dst, dstofs + l1 | 0, l2, dst, dstofs);
}

function stableSortInPlace(a) {
  var l = a.length;
  if (l <= 5) {
    return insertionSort(a, 0, a, 0, l);
  }
  var l1 = l / 2 | 0;
  var l2 = l - l1 | 0;
  var t = new Array(l2);
  sortTo(a, l1, t, 0, l2);
  sortTo(a, 0, a, l2, l1);
  return merge(a, l2, l1, t, 0, l2, a, 0);
}

function stableSort(a) {
  var b = a.slice(0);
  stableSortInPlace(b);
  return b;
}

function binarySearch(sorted, key) {
  var len = sorted.length;
  if (len === 0) {
    return -1;
  }
  var lo = sorted[0];
  if (key < lo) {
    return -1;
  }
  var hi = sorted[len - 1 | 0];
  if (key > hi) {
    return -(len + 1 | 0) | 0;
  } else {
    var _lo = 0;
    var _hi = len - 1 | 0;
    while(true) {
      var hi$1 = _hi;
      var lo$1 = _lo;
      var mid = (lo$1 + hi$1 | 0) / 2 | 0;
      var midVal = sorted[mid];
      if (key === midVal) {
        return mid;
      }
      if (key < midVal) {
        if (hi$1 === mid) {
          if (sorted[lo$1] === key) {
            return lo$1;
          } else {
            return -(hi$1 + 1 | 0) | 0;
          }
        }
        _hi = mid;
        continue ;
      }
      if (lo$1 === mid) {
        if (sorted[hi$1] === key) {
          return hi$1;
        } else {
          return -(hi$1 + 1 | 0) | 0;
        }
      }
      _lo = mid;
      continue ;
    };
  }
}


/* No side effect */


/***/ }),
/* 59 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$$Error": () => (/* binding */ $$Error$1),
/* harmony export */   "anyToExnInternal": () => (/* binding */ anyToExnInternal),
/* harmony export */   "raiseError": () => (/* binding */ raiseError),
/* harmony export */   "raiseEvalError": () => (/* binding */ raiseEvalError),
/* harmony export */   "raiseRangeError": () => (/* binding */ raiseRangeError),
/* harmony export */   "raiseReferenceError": () => (/* binding */ raiseReferenceError),
/* harmony export */   "raiseSyntaxError": () => (/* binding */ raiseSyntaxError),
/* harmony export */   "raiseTypeError": () => (/* binding */ raiseTypeError),
/* harmony export */   "raiseUriError": () => (/* binding */ raiseUriError)
/* harmony export */ });
/* harmony import */ var _caml_js_exceptions_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(50);




var anyToExnInternal = _caml_js_exceptions_js__WEBPACK_IMPORTED_MODULE_0__.internalToOCamlException;

function raiseError(str) {
  throw new Error(str);
}

function raiseEvalError(str) {
  throw new EvalError(str);
}

function raiseRangeError(str) {
  throw new RangeError(str);
}

function raiseReferenceError(str) {
  throw new ReferenceError(str);
}

function raiseSyntaxError(str) {
  throw new SyntaxError(str);
}

function raiseTypeError(str) {
  throw new TypeError(str);
}

function raiseUriError(str) {
  throw new URIError(str);
}

var $$Error$1 = _caml_js_exceptions_js__WEBPACK_IMPORTED_MODULE_0__.$$Error;


/* No side effect */


/***/ }),
/* 60 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Entries": () => (/* binding */ Entries),
/* harmony export */   "React": () => (/* binding */ React),
/* harmony export */   "ReactDOMRe": () => (/* binding */ ReactDOMRe),
/* harmony export */   "Settings": () => (/* binding */ Settings),
/* harmony export */   "showSettings": () => (/* binding */ showSettings),
/* harmony export */   "style": () => (/* binding */ style)
/* harmony export */ });
/* harmony import */ var rescript_lib_es6_curry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(22);
/* harmony import */ var _Utils_bs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(25);
/* harmony import */ var _Config_bs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(26);
/* harmony import */ var rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(30);
/* harmony import */ var rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(17);
/* harmony import */ var _style_mod_less__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(31);
/* harmony import */ var rescript_webapi_src_Webapi_Dom_Webapi_Dom_HtmlElement_bs_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(61);
// Generated by ReScript, PLEASE EDIT WITH CARE











var style = _style_mod_less__WEBPACK_IMPORTED_MODULE_7__;

function make(v) {
  var match = rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_4__.reduce(v, [
        [],
        []
      ], (function (param, param$1) {
          var ty = param$1.ty;
          var title = param$1.title;
          var name = param$1.name;
          var match;
          if (ty.TAG === /* Text */0) {
            var match$1 = ty._0;
            var onSubmit = match$1.onSubmit;
            match = [
              "text",
              match$1.value,
              undefined,
              match$1.pattern,
              true,
              (function (ele) {
                  return rescript_lib_es6_curry_js__WEBPACK_IMPORTED_MODULE_0__._1(onSubmit, ele.value);
                })
            ];
          } else {
            var match$2 = ty._0;
            var onSubmit$1 = match$2.onSubmit;
            match = [
              "checkbox",
              undefined,
              match$2.checked,
              undefined,
              false,
              (function (ele) {
                  return rescript_lib_es6_curry_js__WEBPACK_IMPORTED_MODULE_0__._1(onSubmit$1, ele.checked);
                })
            ];
          }
          var submit = match[5];
          var changed = {
            contents: false
          };
          var tmp = {
            title: title,
            name: name,
            required: match[4],
            type: match[0],
            onChange: (function (param) {
                changed.contents = true;
                
              })
          };
          var tmp$1 = match[2];
          if (tmp$1 !== undefined) {
            tmp.checked = rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_6__.valFromOption(tmp$1);
          }
          var tmp$2 = match[3];
          if (tmp$2 !== undefined) {
            tmp.pattern = rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_6__.valFromOption(tmp$2);
          }
          var tmp$3 = match[1];
          if (tmp$3 !== undefined) {
            tmp.value = rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_6__.valFromOption(tmp$3);
          }
          var input = _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("input", rescript_lib_es6_caml_option_js__WEBPACK_IMPORTED_MODULE_6__.some(tmp), []);
          return [
                  rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_4__.concat(param[0], [_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("div", {
                              className: style.settingsEntry
                            }, [
                              _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("label", {
                                    htmlFor: name
                                  }, [title]),
                              input
                            ])]),
                  rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_4__.concat(param[1], [(function (param) {
                            if (changed.contents) {
                              rescript_lib_es6_curry_js__WEBPACK_IMPORTED_MODULE_0__._1(submit, rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_5__.getExn(rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_5__.flatMap(_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.toNode(input), rescript_webapi_src_Webapi_Dom_Webapi_Dom_HtmlElement_bs_js__WEBPACK_IMPORTED_MODULE_8__.ofNode)));
                              changed.contents = false;
                              return ;
                            }
                            
                          })])
                ];
        }));
  var doSubmits = match[1];
  return [
          match[0],
          (function (param) {
              return rescript_lib_es6_belt_Array_js__WEBPACK_IMPORTED_MODULE_4__.forEach(doSubmits, (function (f) {
                            return rescript_lib_es6_curry_js__WEBPACK_IMPORTED_MODULE_0__._1(f, undefined);
                          }));
            })
        ];
}

var Entries = {
  make: make
};

function Settings$Settings(Props) {
  var onSubmit = Props.onSubmit;
  var match = make([
        {
          name: "username",
          title: "用户名",
          ty: {
            TAG: /* Text */0,
            _0: {
              value: _Config_bs_js__WEBPACK_IMPORTED_MODULE_3__.Username.get(undefined),
              pattern: "[a-z][_a-z0-9]*",
              onSubmit: (function (s) {
                  return _Config_bs_js__WEBPACK_IMPORTED_MODULE_3__.Username.set(s);
                })
            }
          }
        },
        {
          name: "server",
          title: "服务器",
          ty: {
            TAG: /* Text */0,
            _0: {
              value: _Config_bs_js__WEBPACK_IMPORTED_MODULE_3__.Server.get(undefined),
              pattern: "https?://.+",
              onSubmit: (function (s) {
                  return _Config_bs_js__WEBPACK_IMPORTED_MODULE_3__.Server.set(s);
                })
            }
          }
        },
        {
          name: "sync_answers",
          title: "同步答案",
          ty: {
            TAG: /* Checkbox */1,
            _0: {
              checked: _Config_bs_js__WEBPACK_IMPORTED_MODULE_3__.SyncAnswers.get(undefined),
              onSubmit: (function (c) {
                  return _Config_bs_js__WEBPACK_IMPORTED_MODULE_3__.SyncAnswers.set(c);
                })
            }
          }
        },
        {
          name: "sort_problems",
          title: "排序答案",
          ty: {
            TAG: /* Checkbox */1,
            _0: {
              checked: _Config_bs_js__WEBPACK_IMPORTED_MODULE_3__.SortProblems.get(undefined),
              onSubmit: (function (c) {
                  return _Config_bs_js__WEBPACK_IMPORTED_MODULE_3__.SortProblems.set(c);
                })
            }
          }
        },
        {
          name: "no_leave_check",
          title: "拦截切屏检测",
          ty: {
            TAG: /* Checkbox */1,
            _0: {
              checked: _Config_bs_js__WEBPACK_IMPORTED_MODULE_3__.NoLeaveCheck.get(undefined),
              onSubmit: (function (c) {
                  return _Config_bs_js__WEBPACK_IMPORTED_MODULE_3__.NoLeaveCheck.set(c);
                })
            }
          }
        }
      ]);
  var doSubmit = match[1];
  var Settings$Settings$1 = function (Props) {
    var title = Props.title;
    var content = Props.content;
    return _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("p", undefined, [
                _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("strong", undefined, [title]),
                content
              ]);
  };
  return _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("div", undefined, [
              _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("form", {
                    onSubmit: (function (ev) {
                        ev.preventDefault();
                        rescript_lib_es6_curry_js__WEBPACK_IMPORTED_MODULE_0__._1(onSubmit, undefined);
                        return rescript_lib_es6_curry_js__WEBPACK_IMPORTED_MODULE_0__._1(doSubmit, undefined);
                      })
                  }, [
                    _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("div", undefined, [match[0]]),
                    _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("div", {
                          className: style.settingsSubmit
                        }, [
                          _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("div", {
                                className: style.settingsSubmitTip
                              }, [_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("i", undefined, ["*更改设置后请刷新页面"])]),
                          _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("div", undefined, [_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("button", undefined, ["提交"])])
                        ])
                  ]),
              _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("div", {
                    className: style.about
                  }, [
                    _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("p", undefined, [_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("strong", undefined, ["功能特性："])]),
                    _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.createElementVariadic(_Utils_bs_js__WEBPACK_IMPORTED_MODULE_2__.UList.make, {
                          children: null
                        }, [
                          _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.createElement(Settings$Settings$1, {
                                title: "同步答案：",
                                content: "点击题目显示详细答案，在选项/填空处悬停显示简略答案"
                              }),
                          _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.createElement(Settings$Settings$1, {
                                title: "排序题目：",
                                content: "根据 ID 对题目和选项进行重新排序"
                              }),
                          _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.createElement(Settings$Settings$1, {
                                title: "拦截切屏检测：",
                                content: "随意切换页面、窗口不会被发现"
                              }),
                          _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.createElement(Settings$Settings$1, {
                                title: "拦截上传截图：",
                                content: "仅当用户确认后，才会上传截图"
                              }),
                          _Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.createElement(Settings$Settings$1, {
                                title: "拦截异常状态：",
                                content: "即使本地显示异常也不会推送到服务器"
                              })
                        ])
                  ])
            ]);
}

var Settings = {
  make: Settings$Settings
};

function showSettings(param) {
  var match = _Utils_bs_js__WEBPACK_IMPORTED_MODULE_2__.openWin("设置", 300, 400, undefined, undefined, undefined);
  var win = match[0];
  match[1].appendChild(rescript_lib_es6_belt_Option_js__WEBPACK_IMPORTED_MODULE_5__.getExn(_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.toNode(_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.DOMRe.createDOMElementVariadic("div", {
                    className: _Utils_bs_js__WEBPACK_IMPORTED_MODULE_2__.joinStrings([
                          style.mainBody,
                          style.settings
                        ], " ")
                  }, [_Recks_bs_js__WEBPACK_IMPORTED_MODULE_1__.createElement(Settings$Settings, {
                          onSubmit: (function (param) {
                              win.close();
                              
                            })
                        })]))));
  
}

var React;

var ReactDOMRe;


/* style Not a pure module */


/***/ }),
/* 61 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Impl": () => (/* binding */ Impl),
/* harmony export */   "asHtmlElement": () => (/* binding */ asHtmlElement),
/* harmony export */   "contentEditable": () => (/* binding */ contentEditable),
/* harmony export */   "dir": () => (/* binding */ dir),
/* harmony export */   "insertAdjacentElement": () => (/* binding */ insertAdjacentElement),
/* harmony export */   "insertAdjacentHTML": () => (/* binding */ insertAdjacentHTML),
/* harmony export */   "insertAdjacentText": () => (/* binding */ insertAdjacentText),
/* harmony export */   "nodeType": () => (/* binding */ nodeType),
/* harmony export */   "ofElement": () => (/* binding */ ofElement),
/* harmony export */   "ofNode": () => (/* binding */ ofNode),
/* harmony export */   "setContentEditable": () => (/* binding */ setContentEditable),
/* harmony export */   "setDir": () => (/* binding */ setDir)
/* harmony export */ });
/* harmony import */ var _Webapi_Dom_Node_bs_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(35);
/* harmony import */ var _Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(36);
/* harmony import */ var _Webapi_Dom_Element_bs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(34);
/* harmony import */ var _Webapi_Dom_EventTarget_bs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(37);
/* harmony import */ var _Webapi_Dom_GlobalEventHandlers_bs_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(41);








function Impl(T) {
  var contentEditable = function (self) {
    return _Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_1__.decodeContentEditable(self.contentEditable);
  };
  var setContentEditable = function (self, value) {
    self.contentEditable = _Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_1__.encodeContentEditable(value);
    
  };
  var dir = function (self) {
    return _Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_1__.decodeDir(self.dir);
  };
  var setDir = function (self, value) {
    self.dir = _Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_1__.encodeDir(value);
    
  };
  return {
          ofElement: _Webapi_Dom_Element_bs_js__WEBPACK_IMPORTED_MODULE_2__.asHtmlElement,
          contentEditable: contentEditable,
          setContentEditable: setContentEditable,
          dir: dir,
          setDir: setDir
        };
}

var include = _Webapi_Dom_Node_bs_js__WEBPACK_IMPORTED_MODULE_0__.Impl({});

_Webapi_Dom_EventTarget_bs_js__WEBPACK_IMPORTED_MODULE_3__.Impl({});

_Webapi_Dom_GlobalEventHandlers_bs_js__WEBPACK_IMPORTED_MODULE_4__.Impl({});

var include$1 = _Webapi_Dom_Element_bs_js__WEBPACK_IMPORTED_MODULE_2__.Impl({});

function contentEditable(self) {
  return _Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_1__.decodeContentEditable(self.contentEditable);
}

function setContentEditable(self, value) {
  self.contentEditable = _Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_1__.encodeContentEditable(value);
  
}

function dir(self) {
  return _Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_1__.decodeDir(self.dir);
}

function setDir(self, value) {
  self.dir = _Webapi_Dom_Types_bs_js__WEBPACK_IMPORTED_MODULE_1__.encodeDir(value);
  
}

var nodeType = include.nodeType;

var asHtmlElement = include$1.asHtmlElement;

var ofNode = include$1.ofNode;

var insertAdjacentElement = include$1.insertAdjacentElement;

var insertAdjacentHTML = include$1.insertAdjacentHTML;

var insertAdjacentText = include$1.insertAdjacentText;

var ofElement = _Webapi_Dom_Element_bs_js__WEBPACK_IMPORTED_MODULE_2__.asHtmlElement;


/* include Not a pure module */


/***/ }),
/* 62 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkInvariantInternal": () => (/* binding */ checkInvariantInternal),
/* harmony export */   "cmp": () => (/* binding */ cmp),
/* harmony export */   "cmpU": () => (/* binding */ cmpU),
/* harmony export */   "empty": () => (/* binding */ empty),
/* harmony export */   "eq": () => (/* binding */ eq),
/* harmony export */   "eqU": () => (/* binding */ eqU),
/* harmony export */   "every": () => (/* binding */ every),
/* harmony export */   "everyU": () => (/* binding */ everyU),
/* harmony export */   "findFirstBy": () => (/* binding */ findFirstBy),
/* harmony export */   "findFirstByU": () => (/* binding */ findFirstByU),
/* harmony export */   "forEach": () => (/* binding */ forEach),
/* harmony export */   "forEachU": () => (/* binding */ forEachU),
/* harmony export */   "fromArray": () => (/* binding */ fromArray),
/* harmony export */   "get": () => (/* binding */ get),
/* harmony export */   "getExn": () => (/* binding */ getExn),
/* harmony export */   "getUndefined": () => (/* binding */ getUndefined),
/* harmony export */   "getWithDefault": () => (/* binding */ getWithDefault),
/* harmony export */   "has": () => (/* binding */ has),
/* harmony export */   "isEmpty": () => (/* binding */ isEmpty),
/* harmony export */   "keep": () => (/* binding */ keep),
/* harmony export */   "keepU": () => (/* binding */ keepU),
/* harmony export */   "keysToArray": () => (/* binding */ keysToArray),
/* harmony export */   "map": () => (/* binding */ map),
/* harmony export */   "mapU": () => (/* binding */ mapU),
/* harmony export */   "mapWithKey": () => (/* binding */ mapWithKey),
/* harmony export */   "mapWithKeyU": () => (/* binding */ mapWithKeyU),
/* harmony export */   "maxKey": () => (/* binding */ maxKey),
/* harmony export */   "maxKeyUndefined": () => (/* binding */ maxKeyUndefined),
/* harmony export */   "maxUndefined": () => (/* binding */ maxUndefined),
/* harmony export */   "maximum": () => (/* binding */ maximum),
/* harmony export */   "merge": () => (/* binding */ merge),
/* harmony export */   "mergeMany": () => (/* binding */ mergeMany),
/* harmony export */   "mergeU": () => (/* binding */ mergeU),
/* harmony export */   "minKey": () => (/* binding */ minKey),
/* harmony export */   "minKeyUndefined": () => (/* binding */ minKeyUndefined),
/* harmony export */   "minUndefined": () => (/* binding */ minUndefined),
/* harmony export */   "minimum": () => (/* binding */ minimum),
/* harmony export */   "partition": () => (/* binding */ partition),
/* harmony export */   "partitionU": () => (/* binding */ partitionU),
/* harmony export */   "reduce": () => (/* binding */ reduce),
/* harmony export */   "reduceU": () => (/* binding */ reduceU),
/* harmony export */   "remove": () => (/* binding */ remove),
/* harmony export */   "removeMany": () => (/* binding */ removeMany),
/* harmony export */   "set": () => (/* binding */ set),
/* harmony export */   "size": () => (/* binding */ size),
/* harmony export */   "some": () => (/* binding */ some),
/* harmony export */   "someU": () => (/* binding */ someU),
/* harmony export */   "split": () => (/* binding */ split),
/* harmony export */   "toArray": () => (/* binding */ toArray),
/* harmony export */   "toList": () => (/* binding */ toList),
/* harmony export */   "update": () => (/* binding */ update),
/* harmony export */   "updateU": () => (/* binding */ updateU),
/* harmony export */   "valuesToArray": () => (/* binding */ valuesToArray)
/* harmony export */ });
/* harmony import */ var _curry_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(13);
/* harmony import */ var _caml_option_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var _belt_internalMapInt_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(63);
/* harmony import */ var _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(55);







function set(t, newK, newD) {
  if (t === undefined) {
    return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.singleton(newK, newD);
  }
  var k = t.k;
  if (newK === k) {
    return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.updateValue(t, newD);
  }
  var v = t.v;
  if (newK < k) {
    return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.bal(set(t.l, newK, newD), k, v, t.r);
  } else {
    return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.bal(t.l, k, v, set(t.r, newK, newD));
  }
}

function updateU(t, x, f) {
  if (t !== undefined) {
    var k = t.k;
    if (x === k) {
      var data = f(_caml_option_js__WEBPACK_IMPORTED_MODULE_1__.some(t.v));
      if (data !== undefined) {
        return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.updateValue(t, _caml_option_js__WEBPACK_IMPORTED_MODULE_1__.valFromOption(data));
      }
      var l = t.l;
      var r = t.r;
      if (l === undefined) {
        return r;
      }
      if (r === undefined) {
        return l;
      }
      var kr = {
        contents: r.k
      };
      var vr = {
        contents: r.v
      };
      var r$1 = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.removeMinAuxWithRef(r, kr, vr);
      return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.bal(l, kr.contents, vr.contents, r$1);
    }
    var v = t.v;
    var l$1 = t.l;
    var r$2 = t.r;
    if (x < k) {
      var ll = updateU(l$1, x, f);
      if (l$1 === ll) {
        return t;
      } else {
        return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.bal(ll, k, v, r$2);
      }
    }
    var rr = updateU(r$2, x, f);
    if (r$2 === rr) {
      return t;
    } else {
      return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.bal(l$1, k, v, rr);
    }
  }
  var data$1 = f(undefined);
  if (data$1 !== undefined) {
    return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.singleton(x, _caml_option_js__WEBPACK_IMPORTED_MODULE_1__.valFromOption(data$1));
  } else {
    return t;
  }
}

function update(t, x, f) {
  return updateU(t, x, _curry_js__WEBPACK_IMPORTED_MODULE_0__.__1(f));
}

function removeAux(n, x) {
  var v = n.k;
  var l = n.l;
  var r = n.r;
  if (x === v) {
    if (l === undefined) {
      return r;
    }
    if (r === undefined) {
      return l;
    }
    var kr = {
      contents: r.k
    };
    var vr = {
      contents: r.v
    };
    var r$1 = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.removeMinAuxWithRef(r, kr, vr);
    return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.bal(l, kr.contents, vr.contents, r$1);
  }
  if (x < v) {
    if (l === undefined) {
      return n;
    }
    var ll = removeAux(l, x);
    if (ll === l) {
      return n;
    } else {
      return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.bal(ll, v, n.v, r);
    }
  }
  if (r === undefined) {
    return n;
  }
  var rr = removeAux(r, x);
  return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.bal(l, v, n.v, rr);
}

function remove(n, x) {
  if (n !== undefined) {
    return removeAux(n, x);
  }
  
}

function removeMany(t, keys) {
  var len = keys.length;
  if (t !== undefined) {
    var _t = t;
    var _i = 0;
    while(true) {
      var i = _i;
      var t$1 = _t;
      if (i >= len) {
        return t$1;
      }
      var ele = keys[i];
      var u = removeAux(t$1, ele);
      if (u === undefined) {
        return u;
      }
      _i = i + 1 | 0;
      _t = u;
      continue ;
    };
  }
  
}

function mergeMany(h, arr) {
  var len = arr.length;
  var v = h;
  for(var i = 0; i < len; ++i){
    var match = arr[i];
    v = set(v, match[0], match[1]);
  }
  return v;
}

var empty;

var isEmpty = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.isEmpty;

var has = _belt_internalMapInt_js__WEBPACK_IMPORTED_MODULE_2__.has;

var cmpU = _belt_internalMapInt_js__WEBPACK_IMPORTED_MODULE_2__.cmpU;

var cmp = _belt_internalMapInt_js__WEBPACK_IMPORTED_MODULE_2__.cmp;

var eqU = _belt_internalMapInt_js__WEBPACK_IMPORTED_MODULE_2__.eqU;

var eq = _belt_internalMapInt_js__WEBPACK_IMPORTED_MODULE_2__.eq;

var findFirstByU = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.findFirstByU;

var findFirstBy = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.findFirstBy;

var forEachU = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.forEachU;

var forEach = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.forEach;

var reduceU = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.reduceU;

var reduce = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.reduce;

var everyU = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.everyU;

var every = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.every;

var someU = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.someU;

var some = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.some;

var size = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.size;

var toList = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.toList;

var toArray = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.toArray;

var fromArray = _belt_internalMapInt_js__WEBPACK_IMPORTED_MODULE_2__.fromArray;

var keysToArray = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.keysToArray;

var valuesToArray = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.valuesToArray;

var minKey = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.minKey;

var minKeyUndefined = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.minKeyUndefined;

var maxKey = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.maxKey;

var maxKeyUndefined = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.maxKeyUndefined;

var minimum = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.minimum;

var minUndefined = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.minUndefined;

var maximum = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.maximum;

var maxUndefined = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.maxUndefined;

var get = _belt_internalMapInt_js__WEBPACK_IMPORTED_MODULE_2__.get;

var getUndefined = _belt_internalMapInt_js__WEBPACK_IMPORTED_MODULE_2__.getUndefined;

var getWithDefault = _belt_internalMapInt_js__WEBPACK_IMPORTED_MODULE_2__.getWithDefault;

var getExn = _belt_internalMapInt_js__WEBPACK_IMPORTED_MODULE_2__.getExn;

var checkInvariantInternal = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.checkInvariantInternal;

var mergeU = _belt_internalMapInt_js__WEBPACK_IMPORTED_MODULE_2__.mergeU;

var merge = _belt_internalMapInt_js__WEBPACK_IMPORTED_MODULE_2__.merge;

var keepU = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.keepSharedU;

var keep = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.keepShared;

var partitionU = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.partitionSharedU;

var partition = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.partitionShared;

var split = _belt_internalMapInt_js__WEBPACK_IMPORTED_MODULE_2__.split;

var mapU = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.mapU;

var map = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.map;

var mapWithKeyU = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.mapWithKeyU;

var mapWithKey = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_3__.mapWithKey;


/* No side effect */


/***/ }),
/* 63 */
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "A": () => (/* binding */ A),
/* harmony export */   "N": () => (/* binding */ N),
/* harmony export */   "S": () => (/* binding */ S),
/* harmony export */   "add": () => (/* binding */ add),
/* harmony export */   "addMutate": () => (/* binding */ addMutate),
/* harmony export */   "cmp": () => (/* binding */ cmp),
/* harmony export */   "cmpU": () => (/* binding */ cmpU),
/* harmony export */   "compareAux": () => (/* binding */ compareAux),
/* harmony export */   "eq": () => (/* binding */ eq),
/* harmony export */   "eqAux": () => (/* binding */ eqAux),
/* harmony export */   "eqU": () => (/* binding */ eqU),
/* harmony export */   "fromArray": () => (/* binding */ fromArray),
/* harmony export */   "get": () => (/* binding */ get),
/* harmony export */   "getExn": () => (/* binding */ getExn),
/* harmony export */   "getUndefined": () => (/* binding */ getUndefined),
/* harmony export */   "getWithDefault": () => (/* binding */ getWithDefault),
/* harmony export */   "has": () => (/* binding */ has),
/* harmony export */   "merge": () => (/* binding */ merge),
/* harmony export */   "mergeU": () => (/* binding */ mergeU),
/* harmony export */   "remove": () => (/* binding */ remove),
/* harmony export */   "split": () => (/* binding */ split),
/* harmony export */   "splitAux": () => (/* binding */ splitAux)
/* harmony export */ });
/* harmony import */ var _caml_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(27);
/* harmony import */ var _curry_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(13);
/* harmony import */ var _caml_option_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(17);
/* harmony import */ var _belt_SortArray_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(56);
/* harmony import */ var _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(55);








function add(t, x, data) {
  if (t === undefined) {
    return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.singleton(x, data);
  }
  var k = t.k;
  if (x === k) {
    return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.updateValue(t, data);
  }
  var v = t.v;
  if (x < k) {
    return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.bal(add(t.l, x, data), k, v, t.r);
  } else {
    return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.bal(t.l, k, v, add(t.r, x, data));
  }
}

function get(_n, x) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return ;
    }
    var v = n.k;
    if (x === v) {
      return _caml_option_js__WEBPACK_IMPORTED_MODULE_2__.some(n.v);
    }
    _n = x < v ? n.l : n.r;
    continue ;
  };
}

function getUndefined(_n, x) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return ;
    }
    var v = n.k;
    if (x === v) {
      return n.v;
    }
    _n = x < v ? n.l : n.r;
    continue ;
  };
}

function getExn(_n, x) {
  while(true) {
    var n = _n;
    if (n !== undefined) {
      var v = n.k;
      if (x === v) {
        return n.v;
      }
      _n = x < v ? n.l : n.r;
      continue ;
    }
    throw {
          RE_EXN_ID: "Not_found",
          Error: new Error()
        };
  };
}

function getWithDefault(_n, x, def) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return def;
    }
    var v = n.k;
    if (x === v) {
      return n.v;
    }
    _n = x < v ? n.l : n.r;
    continue ;
  };
}

function has(_n, x) {
  while(true) {
    var n = _n;
    if (n === undefined) {
      return false;
    }
    var v = n.k;
    if (x === v) {
      return true;
    }
    _n = x < v ? n.l : n.r;
    continue ;
  };
}

function remove(n, x) {
  if (n === undefined) {
    return n;
  }
  var v = n.k;
  var l = n.l;
  var r = n.r;
  if (x !== v) {
    if (x < v) {
      return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.bal(remove(l, x), v, n.v, r);
    } else {
      return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.bal(l, v, n.v, remove(r, x));
    }
  }
  if (l === undefined) {
    return r;
  }
  if (r === undefined) {
    return l;
  }
  var kr = {
    contents: r.k
  };
  var vr = {
    contents: r.v
  };
  var r$1 = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.removeMinAuxWithRef(r, kr, vr);
  return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.bal(l, kr.contents, vr.contents, r$1);
}

function splitAux(x, n) {
  var v = n.k;
  var d = n.v;
  var l = n.l;
  var r = n.r;
  if (x === v) {
    return [
            l,
            _caml_option_js__WEBPACK_IMPORTED_MODULE_2__.some(d),
            r
          ];
  }
  if (x < v) {
    if (l === undefined) {
      return [
              undefined,
              undefined,
              n
            ];
    }
    var match = splitAux(x, l);
    return [
            match[0],
            match[1],
            _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.join(match[2], v, d, r)
          ];
  }
  if (r === undefined) {
    return [
            n,
            undefined,
            undefined
          ];
  }
  var match$1 = splitAux(x, r);
  return [
          _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.join(l, v, d, match$1[0]),
          match$1[1],
          match$1[2]
        ];
}

function split(x, n) {
  if (n !== undefined) {
    return splitAux(x, n);
  } else {
    return [
            undefined,
            undefined,
            undefined
          ];
  }
}

function mergeU(s1, s2, f) {
  if (s1 !== undefined) {
    if (s1.h >= (
        s2 !== undefined ? s2.h : 0
      )) {
      var v1 = s1.k;
      var d1 = s1.v;
      var l1 = s1.l;
      var r1 = s1.r;
      var match = split(v1, s2);
      return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.concatOrJoin(mergeU(l1, match[0], f), v1, f(v1, _caml_option_js__WEBPACK_IMPORTED_MODULE_2__.some(d1), match[1]), mergeU(r1, match[2], f));
    }
    
  } else if (s2 === undefined) {
    return ;
  }
  var v2 = s2.k;
  var d2 = s2.v;
  var l2 = s2.l;
  var r2 = s2.r;
  var match$1 = split(v2, s1);
  return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.concatOrJoin(mergeU(match$1[0], l2, f), v2, f(v2, match$1[1], _caml_option_js__WEBPACK_IMPORTED_MODULE_2__.some(d2)), mergeU(match$1[2], r2, f));
}

function merge(s1, s2, f) {
  return mergeU(s1, s2, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__3(f));
}

function compareAux(_e1, _e2, vcmp) {
  while(true) {
    var e2 = _e2;
    var e1 = _e1;
    if (!e1) {
      return 0;
    }
    if (!e2) {
      return 0;
    }
    var h2 = e2.hd;
    var h1 = e1.hd;
    var c = _caml_js__WEBPACK_IMPORTED_MODULE_0__.caml_int_compare(h1.k, h2.k);
    if (c !== 0) {
      return c;
    }
    var cx = vcmp(h1.v, h2.v);
    if (cx !== 0) {
      return cx;
    }
    _e2 = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.stackAllLeft(h2.r, e2.tl);
    _e1 = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.stackAllLeft(h1.r, e1.tl);
    continue ;
  };
}

function cmpU(s1, s2, cmp) {
  var len1 = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.size(s1);
  var len2 = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.size(s2);
  if (len1 === len2) {
    return compareAux(_belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.stackAllLeft(s1, /* [] */0), _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.stackAllLeft(s2, /* [] */0), cmp);
  } else if (len1 < len2) {
    return -1;
  } else {
    return 1;
  }
}

function cmp(s1, s2, f) {
  return cmpU(s1, s2, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__2(f));
}

function eqAux(_e1, _e2, eq) {
  while(true) {
    var e2 = _e2;
    var e1 = _e1;
    if (!e1) {
      return true;
    }
    if (!e2) {
      return true;
    }
    var h2 = e2.hd;
    var h1 = e1.hd;
    if (!(h1.k === h2.k && eq(h1.v, h2.v))) {
      return false;
    }
    _e2 = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.stackAllLeft(h2.r, e2.tl);
    _e1 = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.stackAllLeft(h1.r, e1.tl);
    continue ;
  };
}

function eqU(s1, s2, eq) {
  var len1 = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.size(s1);
  var len2 = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.size(s2);
  if (len1 === len2) {
    return eqAux(_belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.stackAllLeft(s1, /* [] */0), _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.stackAllLeft(s2, /* [] */0), eq);
  } else {
    return false;
  }
}

function eq(s1, s2, f) {
  return eqU(s1, s2, _curry_js__WEBPACK_IMPORTED_MODULE_1__.__2(f));
}

function addMutate(t, x, data) {
  if (t === undefined) {
    return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.singleton(x, data);
  }
  var k = t.k;
  if (x === k) {
    t.k = x;
    t.v = data;
    return t;
  }
  var l = t.l;
  var r = t.r;
  if (x < k) {
    var ll = addMutate(l, x, data);
    t.l = ll;
  } else {
    t.r = addMutate(r, x, data);
  }
  return _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.balMutate(t);
}

function fromArray(xs) {
  var len = xs.length;
  if (len === 0) {
    return ;
  }
  var next = _belt_SortArray_js__WEBPACK_IMPORTED_MODULE_3__.strictlySortedLengthU(xs, (function (param, param$1) {
          return param[0] < param$1[0];
        }));
  var result;
  if (next >= 0) {
    result = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.fromSortedArrayAux(xs, 0, next);
  } else {
    next = -next | 0;
    result = _belt_internalAVLtree_js__WEBPACK_IMPORTED_MODULE_4__.fromSortedArrayRevAux(xs, next - 1 | 0, next);
  }
  for(var i = next; i < len; ++i){
    var match = xs[i];
    result = addMutate(result, match[0], match[1]);
  }
  return result;
}

var N;

var A;

var S;


/* No side effect */


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
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _xhr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(18);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(19);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(20);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(8);
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(9);
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
    problems.forEach((problem) => {
        switch (problem.ProblemType) {
            case _types__WEBPACK_IMPORTED_MODULE_2__.ProblemType.SingleChoice:
            case _types__WEBPACK_IMPORTED_MODULE_2__.ProblemType.MultipleChoice:
            case _types__WEBPACK_IMPORTED_MODULE_2__.ProblemType.Polling: {
                const options = problem.Options;
                options.sort((a, b) => {
                    return a.key < b.key ? -1 : 1;
                });
                break;
            }
        }
    });
    problems.sort((a, b) => a.problem_id - b.problem_id);
    return problems;
}
function sortPaper(paper) {
    if (_config__WEBPACK_IMPORTED_MODULE_5__.SORT_PROBLEMS.value === true) {
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
                                    f.onload = () => (0,_ui__WEBPACK_IMPORTED_MODULE_3__.showConfirmUpload)(f.result, () => ok(body));
                                    f.readAsDataURL(body.get("file"));
                                });
                            }
                            return body;
                        });
                    }
            }
        });
        yield client.watch( false ? 0 : 1e4);
    });
}
if (false) {}
main().catch(console.error);

})();

/******/ })()
;