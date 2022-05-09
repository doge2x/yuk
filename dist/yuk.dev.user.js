// ==UserScript==
// @name         yuk-client
// @version      0.1.0
// @match        https://examination.xuetangx.com/exam/*
// @grant        GM.getValue
// @grant        GM.setValue
// @grant        GM.xmlHttpRequest
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
/* harmony import */ var _gm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(8);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(9);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(14);
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
            const url = _context__WEBPACK_IMPORTED_MODULE_3__.SERVER.value;
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
                        err(e);
                    });
                }, ms);
            });
        });
    }
    sendQueue() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.queue.size < 1 ||
                _context__WEBPACK_IMPORTED_MODULE_3__.USERNAME.value === null ||
                _context__WEBPACK_IMPORTED_MODULE_3__.SERVER.value === null ||
                _context__WEBPACK_IMPORTED_MODULE_3__.EXAM_ID.value === null) {
                return;
            }
            let answers = [...this.queue.values()];
            this.queue.clear();
            if (_context__WEBPACK_IMPORTED_MODULE_3__.TOKEN.value === null) {
                (0,_utils__WEBPACK_IMPORTED_MODULE_2__.devLog)(`login to server: ${_context__WEBPACK_IMPORTED_MODULE_3__.USERNAME.value}, ${_context__WEBPACK_IMPORTED_MODULE_3__.EXAM_ID.value}`);
                const token = yield this.client.request("login", [
                    _context__WEBPACK_IMPORTED_MODULE_3__.USERNAME.value,
                    _context__WEBPACK_IMPORTED_MODULE_3__.EXAM_ID.value,
                ]);
                (0,_utils__WEBPACK_IMPORTED_MODULE_2__.devLog)("got token", token);
                _context__WEBPACK_IMPORTED_MODULE_3__.TOKEN.value = token;
            }
            this.postAnswers(_context__WEBPACK_IMPORTED_MODULE_3__.TOKEN.value, answers);
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Map2": () => (/* binding */ Map2),
/* harmony export */   "devLog": () => (/* binding */ devLog),
/* harmony export */   "newURL": () => (/* binding */ newURL),
/* harmony export */   "openWin": () => (/* binding */ openWin),
/* harmony export */   "percent": () => (/* binding */ percent)
/* harmony export */ });
/* harmony import */ var _style_mod_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
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
    win.document.head.append(_recks__WEBPACK_IMPORTED_MODULE_1__["default"].createElement(_recks__WEBPACK_IMPORTED_MODULE_1__["default"].Fragment, null,
        _recks__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("title", null, title),
        _recks__WEBPACK_IMPORTED_MODULE_1__["default"].createElement("style", null, _style_mod_css__WEBPACK_IMPORTED_MODULE_0__["default"].toString())));
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
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(11);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(12);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".K7vQwtugDxkOfU77fg4J {\n  font-size: 0.5rem;\n  opacity: 0.5;\n}\n\n.C2I4DvlMSfimZfl_xPn0 p {\n  margin: 0;\n}\n\n.C2I4DvlMSfimZfl_xPn0 ul {\n  margin: 0;\n  padding-left: 1.5rem;\n}\n\n.C2I4DvlMSfimZfl_xPn0 .Njk3jLX2FgrdznVCqYh5 {\n  font-weight: bold;\n}\n\n.C2I4DvlMSfimZfl_xPn0 .yZIu6SlfivGi6blasrPS {\n  border-style: groove;\n  border-width: thin;\n  margin: 0.2rem;\n  padding: 0.2rem;\n}\n\n.mcfTbD5P0GwQwMJOmYD5 {\n  cursor: pointer;\n}\n\n.ogPrX91zgEreh2bN9mhh {\n  display: flex;\n  max-width: 15rem;\n  flex-direction: column;\n}\n\n.ogPrX91zgEreh2bN9mhh .jVC6DpTyv93BozsU0r_Q {\n  display: flex;\n  flex-direction: row;\n  margin-bottom: 0.5rem;\n  justify-content: space-between;\n}\n\n.ogPrX91zgEreh2bN9mhh .jVC6DpTyv93BozsU0r_Q label {\n  display: flex;\n  flex-direction: column;\n  justify-content: center;\n}\n\n.ogPrX91zgEreh2bN9mhh .jVC6DpTyv93BozsU0r_Q input {\n  text-align: right;\n}\n\n.ogPrX91zgEreh2bN9mhh .TGZ9H1pYsrQDZ5TLZZXX {\n  display: flex;\n  flex-direction: row;\n  justify-content: flex-end;\n}\n\n.ogPrX91zgEreh2bN9mhh .TGZ9H1pYsrQDZ5TLZZXX input {\n  cursor: pointer;\n}\n", ""]);
// Exports
___CSS_LOADER_EXPORT___.locals = {
	"mainBody": "K7vQwtugDxkOfU77fg4J",
	"answerDetail": "C2I4DvlMSfimZfl_xPn0",
	"title": "Njk3jLX2FgrdznVCqYh5",
	"shorAnswer": "yZIu6SlfivGi6blasrPS",
	"clickable": "mcfTbD5P0GwQwMJOmYD5",
	"settings": "ogPrX91zgEreh2bN9mhh",
	"settingsEntry": "jVC6DpTyv93BozsU0r_Q",
	"settingsSubmit": "TGZ9H1pYsrQDZ5TLZZXX"
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 11 */
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),
/* 12 */
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
/* 13 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EXAM_ID": () => (/* binding */ EXAM_ID),
/* harmony export */   "SERVER": () => (/* binding */ SERVER),
/* harmony export */   "TOKEN": () => (/* binding */ TOKEN),
/* harmony export */   "USERNAME": () => (/* binding */ USERNAME)
/* harmony export */ });
/* harmony import */ var _gm__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(8);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
var __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class GMEntry {
    constructor(name, onupdate) {
        this.name = name;
        this._value = new Optional(onupdate);
        _gm__WEBPACK_IMPORTED_MODULE_0__["default"].getValue(this.name)
            .then((val) => (this._value.value = val !== null && val !== void 0 ? val : null))
            .catch((e) => (0,_utils__WEBPACK_IMPORTED_MODULE_1__.devLog)(e));
    }
    get value() {
        return this._value.value;
    }
    setValue(newVal) {
        return __awaiter(this, void 0, void 0, function* () {
            yield _gm__WEBPACK_IMPORTED_MODULE_0__["default"].setValue(this.name, newVal);
            this._value.value = newVal;
        });
    }
}
class Optional {
    constructor(onupdate) {
        this._value = null;
        this.onupdate = onupdate !== null && onupdate !== void 0 ? onupdate : (() => undefined);
    }
    get value() {
        return this._value;
    }
    set value(newVal) {
        this.onupdate(newVal);
        this._value = newVal;
    }
}
const USERNAME = new GMEntry("username", () => (TOKEN.value = null));
const SERVER = new GMEntry("server", () => (TOKEN.value = null));
const TOKEN = new Optional();
const EXAM_ID = new Optional();


/***/ }),
/* 15 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hookXHR": () => (/* binding */ hookXHR)
/* harmony export */ });
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);

function hookXHR(cb) {
    const open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function (_method, url) {
        const onSend = cb.call(this, (0,_utils__WEBPACK_IMPORTED_MODULE_0__.newURL)(url));
        if (onSend === false) {
            // Dont send request.
            this.send = () => undefined;
        }
        else if (typeof onSend === "function") {
            // Modify post data.
            const send = this.send;
            this.send = function (data) {
                onSend(data)
                    .then((data) => {
                    send.call(this, data);
                    this.send = send;
                })
                    .catch(_utils__WEBPACK_IMPORTED_MODULE_0__.devLog);
            };
        }
        open.apply(this, arguments);
    };
}


/***/ }),
/* 16 */
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
/* 17 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "UI": () => (/* binding */ UI)
/* harmony export */ });
/* harmony import */ var _style_mod_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(10);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _card__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(18);
/* harmony import */ var _recks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(14);





const style = _style_mod_css__WEBPACK_IMPORTED_MODULE_0__["default"].locals;
class UI {
    constructor(paper) {
        // Header.
        document.head.append(_recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("style", null, _style_mod_css__WEBPACK_IMPORTED_MODULE_0__["default"].toString()));
        const header = document.body.querySelector(".header-title");
        header.classList.add(style.clickable);
        header.addEventListener("click", () => {
            var _a, _b;
            const win = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.openWin)("Settings", { height: 200, width: 200 });
            function SettingsEntry(props) {
                return (_recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("div", { classList: [style.settingsEntry] },
                    _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("label", { htmlFor: props.name }, props.title),
                    _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("input", { type: "text", required: true, name: props.name, title: props.title, pattern: props.pattern, size: props.size, value: props.value })));
            }
            win.document.body.append(_recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("form", { onsubmit: () => false, "on-submit": function () {
                    const form = new FormData(this);
                    _context__WEBPACK_IMPORTED_MODULE_4__.USERNAME.setValue(form.get("username")).catch(_utils__WEBPACK_IMPORTED_MODULE_1__.devLog);
                    _context__WEBPACK_IMPORTED_MODULE_4__.SERVER.setValue(form.get("server")).catch(_utils__WEBPACK_IMPORTED_MODULE_1__.devLog);
                    for (const v of form) {
                        console.log(v);
                    }
                }, classList: [style.mainBody, style.settings] },
                _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement(SettingsEntry, { name: "username", title: "\u7528\u6237\u540D", pattern: "[_a-z][_a-z0-9]*", size: 10, value: (_a = _context__WEBPACK_IMPORTED_MODULE_4__.USERNAME.value) !== null && _a !== void 0 ? _a : undefined }),
                _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement(SettingsEntry, { name: "server", title: "\u670D\u52A1\u5668\u5730\u5740", pattern: ".*", size: 15, value: (_b = _context__WEBPACK_IMPORTED_MODULE_4__.SERVER.value) !== null && _b !== void 0 ? _b : undefined }),
                _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("div", { classList: [style.settingsSubmit] },
                    _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("input", { type: "submit", value: "\u63D0\u4EA4", size: 10 }))));
        });
        // Problem cards.
        const problems = new Map();
        document.body
            .querySelectorAll(".exam-main--body div .subject-item")
            .forEach((subjectItem, idx) => {
            const prob = paper.data.problems[idx];
            problems.set(prob.problem_id, new _card__WEBPACK_IMPORTED_MODULE_2__.ProblemCard(prob, subjectItem));
        });
        this.problems = problems;
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

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProblemCard": () => (/* binding */ ProblemCard)
/* harmony export */ });
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(16);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _style_mod_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(10);
/* harmony import */ var _recks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(13);




const style = _style_mod_css__WEBPACK_IMPORTED_MODULE_2__["default"].locals;
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
        const itemTypeStatus = subjectItem.querySelector(".item-type .status");
        itemTypeStatus.classList.add(style.clickable);
        itemTypeStatus.addEventListener("click", () => this.showAll(itemTypeStatus.getBoundingClientRect()));
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
        const win = (0,_utils__WEBPACK_IMPORTED_MODULE_1__.openWin)("Answer Details", {
            height: 150,
            width: 200,
            left: left,
            top: top,
        });
        const mainBody = _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("div", { classList: [style.mainBody, style.answerDetail] });
        win.document.body.append(mainBody);
        function Text(props) {
            return (_recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("p", { className: props.title === true ? style.title : "" }, props.children));
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
                            _recks__WEBPACK_IMPORTED_MODULE_3__["default"].createElement("div", { className: style.shorAnswer, dangerouslySetInnerHTML: { __html: res.content } }),
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
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "sortPaper": () => (/* binding */ sortPaper)
/* harmony export */ });
/* harmony import */ var _client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _xhr__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(15);
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(16);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(17);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(14);
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
        const toDataURL = HTMLCanvasElement.prototype.toDataURL;
        HTMLCanvasElement.prototype.toDataURL = function (type, quality) {
            console.log(type, quality, this.height, this.width);
            return toDataURL.call(this, type, quality);
        };
        removeVisibilityListener();
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
                        // Login to server.
                        const ui = new _ui__WEBPACK_IMPORTED_MODULE_3__.UI(JSON.parse(this.responseText));
                        // Receive answers and update UI.
                        client.onmessage((msg) => {
                            msg.forEach((res) => ui.updateAnswer(res));
                            ui.updateUI();
                        });
                        (() => __awaiter(this, void 0, void 0, function* () {
                            // Fetch cached results.
                            _context__WEBPACK_IMPORTED_MODULE_5__.EXAM_ID.value = parseInt(url.searchParams.get("exam_id"));
                            const cacheResults = yield fetch((0,_utils__WEBPACK_IMPORTED_MODULE_4__.newURL)("/exam_room/cache_results", {
                                exam_id: _context__WEBPACK_IMPORTED_MODULE_5__.EXAM_ID.value.toString(),
                            }).toString()).then((res) => res.json());
                            client.answerProblem(cacheResults.data.results);
                        }))().catch(_utils__WEBPACK_IMPORTED_MODULE_4__.devLog);
                    });
                    return true;
                case "/exam_room/answer_problem":
                    return (body) => __awaiter(this, void 0, void 0, function* () {
                        var _a;
                        // Upload answers.
                        if (typeof body === "string") {
                            const data = JSON.parse(body);
                            client.answerProblem((_a = data.results) !== null && _a !== void 0 ? _a : []).catch(_utils__WEBPACK_IMPORTED_MODULE_4__.devLog);
                        }
                        return body;
                    });
                default:
                    if (url.hostname === "upload-z1.qiniup.com") {
                        // Fake screenshot.
                        return (body) => __awaiter(this, void 0, void 0, function* () {
                            if (body instanceof FormData && body.get("file") instanceof File) {
                                console.log(body.get("file"));
                            }
                            return body;
                        });
                    }
                    else {
                        return true;
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