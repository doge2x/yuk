// ==UserScript==
// @name         yuk-client
// @version      0.6.1
// @author       doge2x
// @icon         https://www.yuketang.cn/static/images/favicon.ico
// @match        https://examination.xuetangx.com/*
// @grant        GM.xmlHttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// ==/UserScript==
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __publicField = (obj, key, value) => {
  __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
  return value;
};
(function(factory) {
  typeof define === "function" && define.amd ? define(factory) : factory();
})(function() {
  "use strict";
  var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
  var dist = {};
  var client = {};
  var models = {};
  (function(exports) {
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.createJSONRPCErrorResponse = exports.JSONRPCErrorCode = exports.isJSONRPCResponses = exports.isJSONRPCResponse = exports.isJSONRPCRequests = exports.isJSONRPCRequest = exports.isJSONRPCID = exports.JSONRPC = void 0;
    exports.JSONRPC = "2.0";
    var isJSONRPCID = function(id2) {
      return typeof id2 === "string" || typeof id2 === "number" || id2 === null;
    };
    exports.isJSONRPCID = isJSONRPCID;
    var isJSONRPCRequest = function(payload) {
      return payload.jsonrpc === exports.JSONRPC && payload.method !== void 0 && payload.result === void 0 && payload.error === void 0;
    };
    exports.isJSONRPCRequest = isJSONRPCRequest;
    var isJSONRPCRequests = function(payload) {
      return Array.isArray(payload) && payload.every(exports.isJSONRPCRequest);
    };
    exports.isJSONRPCRequests = isJSONRPCRequests;
    var isJSONRPCResponse = function(payload) {
      return payload.jsonrpc === exports.JSONRPC && payload.id !== void 0 && (payload.result !== void 0 || payload.error !== void 0);
    };
    exports.isJSONRPCResponse = isJSONRPCResponse;
    var isJSONRPCResponses = function(payload) {
      return Array.isArray(payload) && payload.every(exports.isJSONRPCResponse);
    };
    exports.isJSONRPCResponses = isJSONRPCResponses;
    (function(JSONRPCErrorCode) {
      JSONRPCErrorCode[JSONRPCErrorCode["ParseError"] = -32700] = "ParseError";
      JSONRPCErrorCode[JSONRPCErrorCode["InvalidRequest"] = -32600] = "InvalidRequest";
      JSONRPCErrorCode[JSONRPCErrorCode["MethodNotFound"] = -32601] = "MethodNotFound";
      JSONRPCErrorCode[JSONRPCErrorCode["InvalidParams"] = -32602] = "InvalidParams";
      JSONRPCErrorCode[JSONRPCErrorCode["InternalError"] = -32603] = "InternalError";
    })(exports.JSONRPCErrorCode || (exports.JSONRPCErrorCode = {}));
    var createJSONRPCErrorResponse = function(id2, code, message, data) {
      var error = { code, message };
      if (data) {
        error.data = data;
      }
      return {
        jsonrpc: exports.JSONRPC,
        id: id2,
        error
      };
    };
    exports.createJSONRPCErrorResponse = createJSONRPCErrorResponse;
  })(models);
  var internal = {};
  Object.defineProperty(internal, "__esModule", { value: true });
  internal.DefaultErrorCode = void 0;
  internal.DefaultErrorCode = 0;
  var __awaiter$2 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator$2 = commonjsGlobal && commonjsGlobal.__generator || function(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v2) {
        return step([n, v2]);
      };
    }
    function step(op) {
      if (f)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  Object.defineProperty(client, "__esModule", { value: true });
  client.JSONRPCClient = void 0;
  var models_1$2 = models;
  var internal_1$1 = internal;
  var JSONRPCClient = function() {
    function JSONRPCClient2(_send, createID) {
      this._send = _send;
      this.createID = createID;
      this.idToResolveMap = /* @__PURE__ */ new Map();
      this.id = 0;
    }
    JSONRPCClient2.prototype._createID = function() {
      if (this.createID) {
        return this.createID();
      } else {
        return ++this.id;
      }
    };
    JSONRPCClient2.prototype.timeout = function(delay, overrideCreateJSONRPCErrorResponse) {
      var _this = this;
      if (overrideCreateJSONRPCErrorResponse === void 0) {
        overrideCreateJSONRPCErrorResponse = function(id2) {
          return (0, models_1$2.createJSONRPCErrorResponse)(id2, internal_1$1.DefaultErrorCode, "Request timeout");
        };
      }
      var timeoutRequest = function(ids, request) {
        var timeoutID = setTimeout(function() {
          ids.forEach(function(id2) {
            var resolve = _this.idToResolveMap.get(id2);
            if (resolve) {
              _this.idToResolveMap.delete(id2);
              resolve(overrideCreateJSONRPCErrorResponse(id2));
            }
          });
        }, delay);
        return request().then(function(result) {
          clearTimeout(timeoutID);
          return result;
        }, function(error) {
          clearTimeout(timeoutID);
          return Promise.reject(error);
        });
      };
      var requestAdvanced = function(request, clientParams) {
        var ids = (!Array.isArray(request) ? [request] : request).map(function(request2) {
          return request2.id;
        }).filter(isDefinedAndNonNull);
        return timeoutRequest(ids, function() {
          return _this.requestAdvanced(request, clientParams);
        });
      };
      return {
        request: function(method, params, clientParams) {
          var id2 = _this._createID();
          return timeoutRequest([id2], function() {
            return _this.requestWithID(method, params, clientParams, id2);
          });
        },
        requestAdvanced: function(request, clientParams) {
          return requestAdvanced(request, clientParams);
        }
      };
    };
    JSONRPCClient2.prototype.request = function(method, params, clientParams) {
      return this.requestWithID(method, params, clientParams, this._createID());
    };
    JSONRPCClient2.prototype.requestWithID = function(method, params, clientParams, id2) {
      return __awaiter$2(this, void 0, void 0, function() {
        var request, response;
        return __generator$2(this, function(_a) {
          switch (_a.label) {
            case 0:
              request = {
                jsonrpc: models_1$2.JSONRPC,
                method,
                params,
                id: id2
              };
              return [4, this.requestAdvanced(request, clientParams)];
            case 1:
              response = _a.sent();
              if (response.result !== void 0 && !response.error) {
                return [2, response.result];
              } else if (response.result === void 0 && response.error) {
                return [2, Promise.reject(new Error(response.error.message))];
              } else {
                return [2, Promise.reject(new Error("An unexpected error occurred"))];
              }
          }
        });
      });
    };
    JSONRPCClient2.prototype.requestAdvanced = function(requests, clientParams) {
      var _this = this;
      var areRequestsOriginallyArray = Array.isArray(requests);
      if (!Array.isArray(requests)) {
        requests = [requests];
      }
      var requestsWithID = requests.filter(function(request) {
        return isDefinedAndNonNull(request.id);
      });
      var promises = requestsWithID.map(function(request) {
        return new Promise(function(resolve) {
          return _this.idToResolveMap.set(request.id, resolve);
        });
      });
      var promise = Promise.all(promises).then(function(responses) {
        if (areRequestsOriginallyArray || !responses.length) {
          return responses;
        } else {
          return responses[0];
        }
      });
      return this.send(areRequestsOriginallyArray ? requests : requests[0], clientParams).then(function() {
        return promise;
      }, function(error) {
        requestsWithID.forEach(function(request) {
          _this.receive((0, models_1$2.createJSONRPCErrorResponse)(request.id, internal_1$1.DefaultErrorCode, error && error.message || "Failed to send a request"));
        });
        return promise;
      });
    };
    JSONRPCClient2.prototype.notify = function(method, params, clientParams) {
      this.send({
        jsonrpc: models_1$2.JSONRPC,
        method,
        params
      }, clientParams).then(void 0, function() {
        return void 0;
      });
    };
    JSONRPCClient2.prototype.send = function(payload, clientParams) {
      return this._send(payload, clientParams);
    };
    JSONRPCClient2.prototype.rejectAllPendingRequests = function(message) {
      this.idToResolveMap.forEach(function(resolve, id2) {
        return resolve((0, models_1$2.createJSONRPCErrorResponse)(id2, internal_1$1.DefaultErrorCode, message));
      });
      this.idToResolveMap.clear();
    };
    JSONRPCClient2.prototype.receive = function(responses) {
      var _this = this;
      if (!Array.isArray(responses)) {
        responses = [responses];
      }
      responses.forEach(function(response) {
        var resolve = _this.idToResolveMap.get(response.id);
        if (resolve) {
          _this.idToResolveMap.delete(response.id);
          resolve(response);
        }
      });
    };
    return JSONRPCClient2;
  }();
  client.JSONRPCClient = JSONRPCClient;
  var isDefinedAndNonNull = function(value) {
    return value !== void 0 && value !== null;
  };
  var server = {};
  var __assign = commonjsGlobal && commonjsGlobal.__assign || function() {
    __assign = Object.assign || function(t) {
      for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s)
          if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
      }
      return t;
    };
    return __assign.apply(this, arguments);
  };
  var __awaiter$1 = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator$1 = commonjsGlobal && commonjsGlobal.__generator || function(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v2) {
        return step([n, v2]);
      };
    }
    function step(op) {
      if (f)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  var __spreadArray = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
          if (!ar)
            ar = Array.prototype.slice.call(from, 0, i);
          ar[i] = from[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from));
  };
  Object.defineProperty(server, "__esModule", { value: true });
  server.JSONRPCServer = void 0;
  var models_1$1 = models;
  var internal_1 = internal;
  var createParseErrorResponse = function() {
    return (0, models_1$1.createJSONRPCErrorResponse)(null, models_1$1.JSONRPCErrorCode.ParseError, "Parse error");
  };
  var createInvalidRequestResponse = function(request) {
    return (0, models_1$1.createJSONRPCErrorResponse)((0, models_1$1.isJSONRPCID)(request.id) ? request.id : null, models_1$1.JSONRPCErrorCode.InvalidRequest, "Invalid Request");
  };
  var createMethodNotFoundResponse = function(id2) {
    return (0, models_1$1.createJSONRPCErrorResponse)(id2, models_1$1.JSONRPCErrorCode.MethodNotFound, "Method not found");
  };
  var JSONRPCServer = function() {
    function JSONRPCServer2(options) {
      if (options === void 0) {
        options = {};
      }
      var _a;
      this.mapErrorToJSONRPCErrorResponse = defaultMapErrorToJSONRPCErrorResponse;
      this.nameToMethodDictionary = {};
      this.middleware = null;
      this.errorListener = (_a = options.errorListener) !== null && _a !== void 0 ? _a : console.warn;
    }
    JSONRPCServer2.prototype.addMethod = function(name2, method) {
      this.addMethodAdvanced(name2, this.toJSONRPCMethod(method));
    };
    JSONRPCServer2.prototype.toJSONRPCMethod = function(method) {
      return function(request, serverParams) {
        var response = method(request.params, serverParams);
        return Promise.resolve(response).then(function(result) {
          return mapResultToJSONRPCResponse(request.id, result);
        });
      };
    };
    JSONRPCServer2.prototype.addMethodAdvanced = function(name2, method) {
      var _a;
      this.nameToMethodDictionary = __assign(__assign({}, this.nameToMethodDictionary), (_a = {}, _a[name2] = method, _a));
    };
    JSONRPCServer2.prototype.receiveJSON = function(json, serverParams) {
      var request = this.tryParseRequestJSON(json);
      if (request) {
        return this.receive(request, serverParams);
      } else {
        return Promise.resolve(createParseErrorResponse());
      }
    };
    JSONRPCServer2.prototype.tryParseRequestJSON = function(json) {
      try {
        return JSON.parse(json);
      } catch (_a) {
        return null;
      }
    };
    JSONRPCServer2.prototype.receive = function(request, serverParams) {
      if (Array.isArray(request)) {
        return this.receiveMultiple(request, serverParams);
      } else {
        return this.receiveSingle(request, serverParams);
      }
    };
    JSONRPCServer2.prototype.receiveMultiple = function(requests, serverParams) {
      return __awaiter$1(this, void 0, void 0, function() {
        var responses;
        var _this = this;
        return __generator$1(this, function(_a) {
          switch (_a.label) {
            case 0:
              return [4, Promise.all(requests.map(function(request) {
                return _this.receiveSingle(request, serverParams);
              }))];
            case 1:
              responses = _a.sent().filter(isNonNull);
              if (responses.length === 1) {
                return [2, responses[0]];
              } else if (responses.length) {
                return [2, responses];
              } else {
                return [2, null];
              }
          }
        });
      });
    };
    JSONRPCServer2.prototype.receiveSingle = function(request, serverParams) {
      return __awaiter$1(this, void 0, void 0, function() {
        var method, response;
        return __generator$1(this, function(_a) {
          switch (_a.label) {
            case 0:
              method = this.nameToMethodDictionary[request.method];
              if (!!(0, models_1$1.isJSONRPCRequest)(request))
                return [3, 1];
              return [2, createInvalidRequestResponse(request)];
            case 1:
              if (!method)
                return [3, 3];
              return [4, this.callMethod(method, request, serverParams)];
            case 2:
              response = _a.sent();
              return [2, mapResponse(request, response)];
            case 3:
              if (request.id !== void 0) {
                return [2, createMethodNotFoundResponse(request.id)];
              } else {
                return [2, null];
              }
            case 4:
              return [2];
          }
        });
      });
    };
    JSONRPCServer2.prototype.applyMiddleware = function() {
      var middlewares = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        middlewares[_i] = arguments[_i];
      }
      if (this.middleware) {
        this.middleware = this.combineMiddlewares(__spreadArray([
          this.middleware
        ], middlewares, true));
      } else {
        this.middleware = this.combineMiddlewares(middlewares);
      }
    };
    JSONRPCServer2.prototype.combineMiddlewares = function(middlewares) {
      if (!middlewares.length) {
        return null;
      } else {
        return middlewares.reduce(this.middlewareReducer);
      }
    };
    JSONRPCServer2.prototype.middlewareReducer = function(prevMiddleware, nextMiddleware) {
      return function(next, request, serverParams) {
        return prevMiddleware(function(request2, serverParams2) {
          return nextMiddleware(next, request2, serverParams2);
        }, request, serverParams);
      };
    };
    JSONRPCServer2.prototype.callMethod = function(method, request, serverParams) {
      var _this = this;
      var callMethod = function(request2, serverParams2) {
        return method(request2, serverParams2);
      };
      var onError = function(error) {
        _this.errorListener('An unexpected error occurred while executing "'.concat(request.method, '" JSON-RPC method:'), error);
        return Promise.resolve(_this.mapErrorToJSONRPCErrorResponseIfNecessary(request.id, error));
      };
      try {
        return (this.middleware || noopMiddleware)(callMethod, request, serverParams).then(void 0, onError);
      } catch (error) {
        return onError(error);
      }
    };
    JSONRPCServer2.prototype.mapErrorToJSONRPCErrorResponseIfNecessary = function(id2, error) {
      if (id2 !== void 0) {
        return this.mapErrorToJSONRPCErrorResponse(id2, error);
      } else {
        return null;
      }
    };
    return JSONRPCServer2;
  }();
  server.JSONRPCServer = JSONRPCServer;
  var isNonNull = function(value) {
    return value !== null;
  };
  var noopMiddleware = function(next, request, serverParams) {
    return next(request, serverParams);
  };
  var mapResultToJSONRPCResponse = function(id2, result) {
    if (id2 !== void 0) {
      return {
        jsonrpc: models_1$1.JSONRPC,
        id: id2,
        result: result === void 0 ? null : result
      };
    } else {
      return null;
    }
  };
  var defaultMapErrorToJSONRPCErrorResponse = function(id2, error) {
    return (0, models_1$1.createJSONRPCErrorResponse)(id2, internal_1.DefaultErrorCode, error && error.message || "An unexpected error occurred");
  };
  var mapResponse = function(request, response) {
    if (response) {
      return response;
    } else if (request.id !== void 0) {
      return (0, models_1$1.createJSONRPCErrorResponse)(request.id, models_1$1.JSONRPCErrorCode.InternalError, "Internal error");
    } else {
      return null;
    }
  };
  var serverAndClient = {};
  var __awaiter = commonjsGlobal && commonjsGlobal.__awaiter || function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P ? value : new P(function(resolve) {
        resolve(value);
      });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
  var __generator = commonjsGlobal && commonjsGlobal.__generator || function(thisArg, body) {
    var _ = { label: 0, sent: function() {
      if (t[0] & 1)
        throw t[1];
      return t[1];
    }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() {
      return this;
    }), g;
    function verb(n) {
      return function(v2) {
        return step([n, v2]);
      };
    }
    function step(op) {
      if (f)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
            return t;
          if (y = 0, t)
            op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  Object.defineProperty(serverAndClient, "__esModule", { value: true });
  serverAndClient.JSONRPCServerAndClient = void 0;
  var models_1 = models;
  var JSONRPCServerAndClient = function() {
    function JSONRPCServerAndClient2(server2, client2, options) {
      if (options === void 0) {
        options = {};
      }
      var _a;
      this.server = server2;
      this.client = client2;
      this.errorListener = (_a = options.errorListener) !== null && _a !== void 0 ? _a : console.warn;
    }
    JSONRPCServerAndClient2.prototype.applyServerMiddleware = function() {
      var _a;
      var middlewares = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        middlewares[_i] = arguments[_i];
      }
      (_a = this.server).applyMiddleware.apply(_a, middlewares);
    };
    JSONRPCServerAndClient2.prototype.addMethod = function(name2, method) {
      this.server.addMethod(name2, method);
    };
    JSONRPCServerAndClient2.prototype.addMethodAdvanced = function(name2, method) {
      this.server.addMethodAdvanced(name2, method);
    };
    JSONRPCServerAndClient2.prototype.timeout = function(delay) {
      return this.client.timeout(delay);
    };
    JSONRPCServerAndClient2.prototype.request = function(method, params, clientParams) {
      return this.client.request(method, params, clientParams);
    };
    JSONRPCServerAndClient2.prototype.requestAdvanced = function(jsonRPCRequest, clientParams) {
      return this.client.requestAdvanced(jsonRPCRequest, clientParams);
    };
    JSONRPCServerAndClient2.prototype.notify = function(method, params, clientParams) {
      this.client.notify(method, params, clientParams);
    };
    JSONRPCServerAndClient2.prototype.rejectAllPendingRequests = function(message) {
      this.client.rejectAllPendingRequests(message);
    };
    JSONRPCServerAndClient2.prototype.receiveAndSend = function(payload, serverParams, clientParams) {
      return __awaiter(this, void 0, void 0, function() {
        var response, message;
        return __generator(this, function(_a) {
          switch (_a.label) {
            case 0:
              if (!((0, models_1.isJSONRPCResponse)(payload) || (0, models_1.isJSONRPCResponses)(payload)))
                return [3, 1];
              this.client.receive(payload);
              return [3, 4];
            case 1:
              if (!((0, models_1.isJSONRPCRequest)(payload) || (0, models_1.isJSONRPCRequests)(payload)))
                return [3, 3];
              return [4, this.server.receive(payload, serverParams)];
            case 2:
              response = _a.sent();
              if (response) {
                return [2, this.client.send(response, clientParams)];
              }
              return [3, 4];
            case 3:
              message = "Received an invalid JSON-RPC message";
              this.errorListener(message, payload);
              return [2, Promise.reject(new Error(message))];
            case 4:
              return [2];
          }
        });
      });
    };
    return JSONRPCServerAndClient2;
  }();
  serverAndClient.JSONRPCServerAndClient = JSONRPCServerAndClient;
  (function(exports) {
    var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o, k2, { enumerable: true, get: function() {
        return m[k];
      } });
    } : function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o[k2] = m[k];
    });
    var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m, exports2) {
      for (var p in m)
        if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p))
          __createBinding(exports2, m, p);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(client, exports);
    __exportStar(models, exports);
    __exportStar(server, exports);
    __exportStar(serverAndClient, exports);
  })(dist);
  function devLog(msg, ...params) {
    {
      console.log(msg, ...params);
    }
  }
  function newURL(url, params) {
    const url2 = new URL(url, self.location.origin);
    for (const [k, v2] of Object.entries(params != null ? params : {})) {
      url2.searchParams.set(k, v2);
    }
    return url2;
  }
  function getValue(key) {
    const val = GM_getValue(key);
    if (val !== void 0) {
      return val.contents;
    }
  }
  function setValue(key, val) {
    GM_setValue(key, { contents: val });
  }
  function migrate() {
    var _a;
    const migrations = [
      {
        name: "202205231915_gm_value",
        up() {
          setValue("no_leave_check", GM_getValue("nol_eavecheck"));
          GM_setValue("nol_eavecheck", void 0);
          for (const k of [
            "username",
            "server",
            "sync_answers",
            "sort_problems"
          ]) {
            setValue(k, GM_getValue(k));
          }
        }
      }
    ];
    const db_migrations = (_a = getValue("migrations")) != null ? _a : [];
    for (const { name: name2, idx } of db_migrations) {
      if (!(name2 === migrations[idx].name)) {
        throw new Error("bad migrations");
      }
    }
    for (const { name: name2, up } of migrations.slice(db_migrations.length)) {
      devLog(`apply migration: ${name2}`);
      up();
    }
    setValue("migrations", migrations.map((v2, i) => ({ name: v2.name, idx: i })));
  }
  function sub(x, offset, len) {
    var result = new Array(len);
    var j = 0;
    var i = offset;
    while (j < len) {
      result[j] = x[i];
      j = j + 1 | 0;
      i = i + 1 | 0;
    }
    return result;
  }
  function app(_f, _args) {
    while (true) {
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
        return function(f2, args2) {
          return function(x) {
            return app(f2, args2.concat([x]));
          };
        }(f, args);
      }
      _args = sub(args, arity, -d | 0);
      _f = f.apply(null, sub(args, 0, arity));
      continue;
    }
  }
  function _1(o, a0) {
    var arity = o.length;
    if (arity === 1) {
      return o(a0);
    } else {
      switch (arity) {
        case 1:
          return o(a0);
        case 2:
          return function(param) {
            return o(a0, param);
          };
        case 3:
          return function(param, param$1) {
            return o(a0, param, param$1);
          };
        case 4:
          return function(param, param$1, param$2) {
            return o(a0, param, param$1, param$2);
          };
        case 5:
          return function(param, param$1, param$2, param$3) {
            return o(a0, param, param$1, param$2, param$3);
          };
        case 6:
          return function(param, param$1, param$2, param$3, param$4) {
            return o(a0, param, param$1, param$2, param$3, param$4);
          };
        case 7:
          return function(param, param$1, param$2, param$3, param$4, param$5) {
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
      return function(a0) {
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
        case 1:
          return app(o(a0), [a1]);
        case 2:
          return o(a0, a1);
        case 3:
          return function(param) {
            return o(a0, a1, param);
          };
        case 4:
          return function(param, param$1) {
            return o(a0, a1, param, param$1);
          };
        case 5:
          return function(param, param$1, param$2) {
            return o(a0, a1, param, param$1, param$2);
          };
        case 6:
          return function(param, param$1, param$2, param$3) {
            return o(a0, a1, param, param$1, param$2, param$3);
          };
        case 7:
          return function(param, param$1, param$2, param$3, param$4) {
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
      return function(a0, a1) {
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
        case 1:
          return app(o(a0), [
            a1,
            a2
          ]);
        case 2:
          return app(o(a0, a1), [a2]);
        case 3:
          return o(a0, a1, a2);
        case 4:
          return function(param) {
            return o(a0, a1, a2, param);
          };
        case 5:
          return function(param, param$1) {
            return o(a0, a1, a2, param, param$1);
          };
        case 6:
          return function(param, param$1, param$2) {
            return o(a0, a1, a2, param, param$1, param$2);
          };
        case 7:
          return function(param, param$1, param$2, param$3) {
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
      return function(a0, a1, a2) {
        return _3(o, a0, a1, a2);
      };
    }
  }
  var id = {
    contents: 0
  };
  function create$1(str) {
    id.contents = id.contents + 1 | 0;
    return str + ("/" + id.contents);
  }
  var Undefined = /* @__PURE__ */ create$1("CamlinternalLazy.Undefined");
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
      } catch (e) {
        lzv.VAL = function() {
          throw e;
        };
        throw e;
      }
    }
  }
  function from_val(v2) {
    return {
      LAZY_DONE: true,
      VAL: v2
    };
  }
  function some(x) {
    if (x === void 0) {
      return {
        BS_PRIVATE_NESTED_SOME_NONE: 0
      };
    } else if (x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0) {
      return {
        BS_PRIVATE_NESTED_SOME_NONE: x.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
      };
    } else {
      return x;
    }
  }
  function nullable_to_opt(x) {
    if (x == null) {
      return;
    } else {
      return some(x);
    }
  }
  function undefined_to_opt(x) {
    if (x === void 0) {
      return;
    } else {
      return some(x);
    }
  }
  function valFromOption(x) {
    if (!(x !== null && x.BS_PRIVATE_NESTED_SOME_NONE !== void 0)) {
      return x;
    }
    var depth = x.BS_PRIVATE_NESTED_SOME_NONE;
    if (depth === 0) {
      return;
    } else {
      return {
        BS_PRIVATE_NESTED_SOME_NONE: depth - 1 | 0
      };
    }
  }
  var name = "username";
  var v = {
    contents: {
      LAZY_DONE: false,
      VAL: function() {
        var cached = getValue(name);
        if (cached == null) {
          setValue(name, void 0);
          return;
        } else {
          return some(cached);
        }
      }
    }
  };
  function get$5(param) {
    return force(v.contents);
  }
  function set$2(newVal) {
    var newVal$1 = some(newVal);
    v.contents = from_val(newVal$1);
    setValue(name, newVal$1);
  }
  var Username = {
    v,
    get: get$5,
    set: set$2
  };
  var name$1 = "server";
  var v$1 = {
    contents: {
      LAZY_DONE: false,
      VAL: function() {
        var cached = getValue(name$1);
        if (cached == null) {
          setValue(name$1, void 0);
          return;
        } else {
          return some(cached);
        }
      }
    }
  };
  function get$1$1(param) {
    return force(v$1.contents);
  }
  function set$1$1(newVal) {
    var newVal$1 = some(newVal);
    v$1.contents = from_val(newVal$1);
    setValue(name$1, newVal$1);
  }
  var Server = {
    v: v$1,
    get: get$1$1,
    set: set$1$1
  };
  var name$2 = "sync_answers";
  var init = true;
  var v$2 = {
    contents: {
      LAZY_DONE: false,
      VAL: function() {
        var cached = getValue(name$2);
        if (cached == null) {
          setValue(name$2, init);
          return init;
        } else {
          return some(cached);
        }
      }
    }
  };
  function get$2$1(param) {
    return force(v$2.contents);
  }
  function set$2$1(newVal) {
    var newVal$1 = some(newVal);
    v$2.contents = from_val(newVal$1);
    setValue(name$2, newVal$1);
  }
  var SyncAnswers = {
    v: v$2,
    get: get$2$1,
    set: set$2$1
  };
  var name$3 = "no_leave_check";
  var init$1 = true;
  var v$3 = {
    contents: {
      LAZY_DONE: false,
      VAL: function() {
        var cached = getValue(name$3);
        if (cached == null) {
          setValue(name$3, init$1);
          return init$1;
        } else {
          return some(cached);
        }
      }
    }
  };
  function get$3$1(param) {
    return force(v$3.contents);
  }
  function set$3(newVal) {
    var newVal$1 = some(newVal);
    v$3.contents = from_val(newVal$1);
    setValue(name$3, newVal$1);
  }
  var NoLeaveCheck = {
    v: v$3,
    get: get$3$1,
    set: set$3
  };
  var name$4 = "sort_problems";
  var init$2 = false;
  var v$4 = {
    contents: {
      LAZY_DONE: false,
      VAL: function() {
        var cached = getValue(name$4);
        if (cached == null) {
          setValue(name$4, init$2);
          return init$2;
        } else {
          return some(cached);
        }
      }
    }
  };
  function get$4$1(param) {
    return force(v$4.contents);
  }
  function set$4(newVal) {
    var newVal$1 = some(newVal);
    v$4.contents = from_val(newVal$1);
    setValue(name$4, newVal$1);
  }
  var SortProblems = {
    v: v$4,
    get: get$4$1,
    set: set$4
  };
  class ReValue {
    constructor(value) {
      __publicField(this, "_value");
      this._value = value;
    }
    get value() {
      return this._value.get();
    }
  }
  const USERNAME = new ReValue(Username);
  const SERVER = new ReValue(Server);
  const SYNC_ANSWERS = new ReValue(SyncAnswers);
  const SORT_PROBLEMS = new ReValue(SortProblems);
  const NO_LEAVE_CHECK = new ReValue(NoLeaveCheck);
  class Client {
    constructor() {
      __publicField(this, "token");
      __publicField(this, "client");
      __publicField(this, "examId");
      __publicField(this, "paper");
      __publicField(this, "queue", /* @__PURE__ */ new Map());
      __publicField(this, "onmsg", []);
    }
    onmessage(cb) {
      this.onmsg.push(cb);
    }
    updateQueue(id2, f) {
      let val = this.queue.get(id2);
      if (val !== void 0) {
        f(val);
      } else {
        val = {};
        f(val);
        this.queue.set(id2, val);
      }
    }
    updateAnswer(id2, result) {
      this.updateQueue(id2, (v2) => v2.result = result);
    }
    updateState(id2, state) {
      this.updateQueue(id2, (v2) => {
        var _a;
        v2.context = (_a = v2.context) != null ? _a : {};
        v2.context.state = state;
      });
    }
    updateMsg(id2, msg) {
      this.updateQueue(id2, (v2) => {
        var _a;
        v2.context = (_a = v2.context) != null ? _a : {};
        v2.context.msg = msg;
      });
    }
    async watch(ms) {
      return new Promise((_, err) => {
        const timer = setInterval(() => {
          this.sendQueue().catch((e) => {
            clearInterval(timer);
            alert("\u4E0E\u670D\u52A1\u5668\u901A\u4FE1\u5F02\u5E38");
            err(e);
          });
        }, ms);
      });
    }
    async login(examId, paper) {
      this.examId = examId;
      this.paper = paper;
    }
    async sendQueue() {
      if (SYNC_ANSWERS.value !== true || this.queue.size < 1 || SERVER.value === void 0 || USERNAME.value === void 0 || this.examId === void 0 || this.paper === void 0) {
        return;
      }
      let answers = [...this.queue.entries()];
      this.queue.clear();
      if (this.client === void 0) {
        const server2 = SERVER.value;
        const client2 = new dist.JSONRPCClient((req) => {
          return new Promise((ok, err) => {
            GM.xmlHttpRequest({
              url: server2,
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              data: JSON.stringify(req),
              onload: (resp) => {
                if (resp.status === 200) {
                  client2.receive(JSON.parse(resp.responseText));
                  ok();
                } else {
                  err(new Error(resp.statusText));
                }
              },
              onerror: (resp) => err(resp.statusText)
            });
          });
        });
        this.client = client2;
      }
      if (this.token === void 0) {
        devLog(`login to server: ${USERNAME.value}, ${this.examId}`);
        const token = await this.client.request("login", [
          USERNAME.value,
          this.examId,
          this.paper
        ]);
        devLog("got token", token);
        this.token = token;
      }
      devLog("send answers", answers);
      const rcev = await this.client.request("answer_problem", [
        this.token,
        answers.map(([id2, { result: answer, context }]) => ({
          problem_id: id2,
          result: answer,
          context
        }))
      ]);
      devLog("receive answers", rcev);
      this.onmsg.forEach((cb) => cb(rcev));
    }
  }
  const CLIENT = new Client();
  function hookXHR(cb) {
    const open = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(_method, url) {
      const onSend = cb.call(this, newURL(url));
      const send = this.send;
      this.send = function(data) {
        if (onSend !== void 0) {
          onSend(data).then((data2) => {
            send.call(this, data2);
            this.send = send;
          }).catch(devLog);
        } else {
          send.call(this, data);
          this.send = send;
        }
      };
      open.apply(this, arguments);
    };
  }
  var ProblemType = /* @__PURE__ */ ((ProblemType2) => {
    ProblemType2[ProblemType2["SingleChoice"] = 1] = "SingleChoice";
    ProblemType2[ProblemType2["MultipleChoice"] = 2] = "MultipleChoice";
    ProblemType2[ProblemType2["Polling"] = 3] = "Polling";
    ProblemType2[ProblemType2["FillBlank"] = 4] = "FillBlank";
    ProblemType2[ProblemType2["ShortAnswer"] = 5] = "ShortAnswer";
    ProblemType2[ProblemType2["Judgement"] = 6] = "Judgement";
    return ProblemType2;
  })(ProblemType || {});
  function childrenToArray(children) {
    if (Array.isArray(children)) {
      return new Array().concat(...children.map(childrenToArray));
    } else if (children instanceof Node) {
      return [children];
    } else if (children === null || children === void 0) {
      return [];
    } else {
      return [document.createTextNode(String(children))];
    }
  }
  function addChildren(parent, children) {
    for (const child of children) {
      parent.appendChild(child);
    }
  }
  function setCSSProps(ele, style2) {
    for (const [name2, value] of Object.entries(style2)) {
      if (name2.startsWith("-")) {
        ele.style.setProperty(name2, value);
      } else {
        ele.style[name2] = value;
      }
    }
  }
  function setDOMProps(ele, props) {
    for (const [name2, value] of Object.entries(props)) {
      if (value === void 0) {
        continue;
      }
      switch (name2) {
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
          if (name2.startsWith("on")) {
            ele.addEventListener(name2.slice(2).toLowerCase(), value);
          } else if (name2 in ele) {
            ele[name2] = value;
          } else {
            ele.setAttribute(name2, value);
          }
      }
    }
  }
  function createElement$2(t, props, ...children) {
    props = props != null ? props : {};
    let nodeArray = childrenToArray(children).concat(childrenToArray(props.children));
    if (typeof t === "function") {
      return t(__spreadProps(__spreadValues({}, props), { children: nodeArray }));
    } else {
      const ele = document.createElement(t);
      addChildren(ele, nodeArray);
      setDOMProps(ele, props != null ? props : {});
      return ele;
    }
  }
  function toNode$1(element) {
    if (element instanceof Node) {
      return element;
    } else {
      return null;
    }
  }
  const Children$1 = {
    toArray: childrenToArray
  };
  var spliceApply = function(fn, args) {
    var i, argLen;
    argLen = args.length;
    var applied = [];
    for (i = 0; i < argLen - 1; ++i) {
      applied.push(args[i]);
    }
    var lastOne = args[argLen - 1];
    for (i = 0; i < lastOne.length; ++i) {
      applied.push(lastOne[i]);
    }
    return fn.apply(null, applied);
  };
  function toNode(prim) {
    return nullable_to_opt(toNode$1(prim));
  }
  function toArray$2(prim) {
    return Children$1.toArray(prim);
  }
  var Children = {
    toArray: toArray$2
  };
  function createElementVariadic(prim0, prim1, prim2) {
    return spliceApply(createElement$2, [
      prim0,
      prim1,
      prim2
    ]);
  }
  function createElement(prim0, prim1) {
    return createElement$2(prim0, prim1);
  }
  function createDOMElementVariadic(prim0, prim1, prim2) {
    return spliceApply(createElement$2, [
      prim0,
      prim1 !== void 0 ? valFromOption(prim1) : void 0,
      prim2
    ]);
  }
  function createElement$1(prim0, prim1, prim2) {
    return spliceApply(createElement$2, [
      prim0,
      prim1 !== void 0 ? valFromOption(prim1) : void 0,
      prim2
    ]);
  }
  var DOMRe = {
    createDOMElementVariadic,
    createElement: createElement$1
  };
  function caml_string_compare(s1, s2) {
    if (s1 === s2) {
      return 0;
    } else if (s1 < s2) {
      return -1;
    } else {
      return 1;
    }
  }
  function get$4(arr, i) {
    if (i >= 0 && i < arr.length) {
      return some(arr[i]);
    }
  }
  function zip(xs, ys) {
    var lenx = xs.length;
    var leny = ys.length;
    var len = lenx < leny ? lenx : leny;
    var s = new Array(len);
    for (var i = 0; i < len; ++i) {
      s[i] = [
        xs[i],
        ys[i]
      ];
    }
    return s;
  }
  function concat(a1, a2) {
    var l1 = a1.length;
    var l2 = a2.length;
    var a1a2 = new Array(l1 + l2 | 0);
    for (var i = 0; i < l1; ++i) {
      a1a2[i] = a1[i];
    }
    for (var i$1 = 0; i$1 < l2; ++i$1) {
      a1a2[l1 + i$1 | 0] = a2[i$1];
    }
    return a1a2;
  }
  function blitUnsafe(a1, srcofs1, a2, srcofs2, blitLength) {
    if (srcofs2 <= srcofs1) {
      for (var j = 0; j < blitLength; ++j) {
        a2[j + srcofs2 | 0] = a1[j + srcofs1 | 0];
      }
      return;
    }
    for (var j$1 = blitLength - 1 | 0; j$1 >= 0; --j$1) {
      a2[j$1 + srcofs2 | 0] = a1[j$1 + srcofs1 | 0];
    }
  }
  function mapU$1(a, f) {
    var l = a.length;
    var r = new Array(l);
    for (var i = 0; i < l; ++i) {
      r[i] = f(a[i]);
    }
    return r;
  }
  function map$1(a, f) {
    return mapU$1(a, __1(f));
  }
  function keepMapU(a, f) {
    var l = a.length;
    var r = new Array(l);
    var j = 0;
    for (var i = 0; i < l; ++i) {
      var v2 = a[i];
      var v$12 = f(v2);
      if (v$12 !== void 0) {
        r[j] = valFromOption(v$12);
        j = j + 1 | 0;
      }
    }
    r.length = j;
    return r;
  }
  function keepMap(a, f) {
    return keepMapU(a, __1(f));
  }
  function mapWithIndexU(a, f) {
    var l = a.length;
    var r = new Array(l);
    for (var i = 0; i < l; ++i) {
      r[i] = f(i, a[i]);
    }
    return r;
  }
  function mapWithIndex(a, f) {
    return mapWithIndexU(a, __2(f));
  }
  function reduceU$1(a, x, f) {
    var r = x;
    for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
      r = f(r, a[i]);
    }
    return r;
  }
  function reduce$2(a, x, f) {
    return reduceU$1(a, x, __2(f));
  }
  function reduceWithIndexU(a, x, f) {
    var r = x;
    for (var i = 0, i_finish = a.length; i < i_finish; ++i) {
      r = f(r, a[i], i);
    }
    return r;
  }
  function reduceWithIndex(a, x, f) {
    return reduceWithIndexU(a, x, __3(f));
  }
  function joinWithU(a, sep, toString) {
    var l = a.length;
    if (l === 0) {
      return "";
    }
    var lastIndex = l - 1 | 0;
    var _i = 0;
    var _res = "";
    while (true) {
      var res = _res;
      var i = _i;
      if (i === lastIndex) {
        return res + toString(a[i]);
      }
      _res = res + (toString(a[i]) + sep);
      _i = i + 1 | 0;
      continue;
    }
  }
  function joinWith(a, sep, toString) {
    return joinWithU(a, sep, __1(toString));
  }
  function forEachU$1(opt, f) {
    if (opt !== void 0) {
      return f(valFromOption(opt));
    }
  }
  function forEach$2(opt, f) {
    return forEachU$1(opt, __1(f));
  }
  function getExn$2(x) {
    if (x !== void 0) {
      return valFromOption(x);
    }
    throw {
      RE_EXN_ID: "Not_found",
      Error: new Error()
    };
  }
  function mapWithDefaultU(opt, $$default, f) {
    if (opt !== void 0) {
      return f(valFromOption(opt));
    } else {
      return $$default;
    }
  }
  function mapWithDefault(opt, $$default, f) {
    return mapWithDefaultU(opt, $$default, __1(f));
  }
  function mapU(opt, f) {
    if (opt !== void 0) {
      return some(f(valFromOption(opt)));
    }
  }
  function map(opt, f) {
    return mapU(opt, __1(f));
  }
  function flatMapU(opt, f) {
    if (opt !== void 0) {
      return f(valFromOption(opt));
    }
  }
  function flatMap(opt, f) {
    return flatMapU(opt, __1(f));
  }
  function getWithDefault(opt, $$default) {
    if (opt !== void 0) {
      return valFromOption(opt);
    } else {
      return $$default;
    }
  }
  function decodeNodeType(x) {
    if (x > 12 || x < 1) {
      return 12;
    } else {
      return x - 1 | 0;
    }
  }
  function nodeType(self2) {
    return decodeNodeType(self2.nodeType);
  }
  function ofNode(node) {
    if (nodeType(node) === 0) {
      return some(node);
    }
  }
  var asHtmlElement = function(element) {
    if (window.constructor.name !== void 0 && /^HTML\w*Element$/.test(element.constructor.name) || /^\[object HTML\w*Element\]$/.test(element.constructor.toString())) {
      return element;
    }
  };
  var asHtmlDocument = function(document2) {
    var defaultView = document2.defaultView;
    if (defaultView != null) {
      var HTMLDocument = defaultView.HTMLDocument;
      if (HTMLDocument != null && document2 instanceof HTMLDocument) {
        return document2;
      }
    }
  };
  var StyleModuleLessinline = "._mainBody_8f6zw_1 {\n  opacity: 0.5;\n}\n._mainBody_8f6zw_1 * {\n  font-size: 0.75rem;\n  margin: 0;\n}\n._mainBody_8f6zw_1 button {\n  cursor: pointer;\n}\n._clickable_8f6zw_11 {\n  cursor: pointer;\n}\n._stateWorkingOn_8f6zw_14 {\n  color: blue;\n}\n._stateSure_8f6zw_17 {\n  color: green;\n}\n._stateNotSure_8f6zw_20 {\n  color: red;\n}\n._answerMsg_8f6zw_23 {\n  border-style: groove;\n  border-width: thin;\n  opacity: 0.75;\n  margin-bottom: 0.5rem;\n}\n._answerMsg_8f6zw_23 ul {\n  padding-left: 1rem;\n}\n._answerMsgName_8f6zw_32 {\n  font-weight: bold;\n}\n._answerMark_8f6zw_35 {\n  display: flex;\n  justify-content: end;\n  align-items: center;\n  border-style: groove;\n  border-width: thin;\n  margin-bottom: 0.5rem;\n  opacity: 0.75;\n}\n._answerMark_8f6zw_35 button {\n  padding: 0;\n  margin-left: 0.5rem;\n  white-space: nowrap;\n}\n._answerMark_8f6zw_35 input {\n  height: max-content;\n  width: 100%;\n}\n._answerDetail_8f6zw_53 ._stateWorkingOn_8f6zw_14,\n._answerDetail_8f6zw_53 ._stateSure_8f6zw_17,\n._answerDetail_8f6zw_53 ._stateNotSure_8f6zw_20 {\n  font-weight: bold;\n}\n._answerDetail_8f6zw_53 ul {\n  padding-left: 1.5rem;\n}\n._answerDetail_8f6zw_53 img {\n  height: auto;\n  width: 80%;\n}\n._answerDetailShortAnswer_8f6zw_65 {\n  border-style: groove;\n  border-width: thin;\n  margin: 0.2rem;\n  padding: 0.2rem;\n}\n._settings_8f6zw_71 {\n  border-style: groove;\n  border-width: thin;\n  display: flex;\n  flex-direction: column;\n  padding: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n._settingsEntry_8f6zw_79 {\n  display: flex;\n  flex-direction: row;\n  margin-bottom: 0.5rem;\n  justify-content: space-between;\n  align-items: center;\n}\n._settingsEntry_8f6zw_79 label {\n  font-weight: bold;\n}\n._settingsEntry_8f6zw_79 input {\n  height: max-content;\n  text-align: right;\n}\n._settingsSubmit_8f6zw_93 {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: end;\n}\n._settingsSubmitTip_8f6zw_99 {\n  margin-right: 0.5rem;\n}\n._about_8f6zw_102 p {\n  margin-bottom: 0.25rem;\n}\n._about_8f6zw_102 ul {\n  padding-left: 1.5rem;\n  margin-bottom: 0.25rem;\n}\n._about_8f6zw_102 ul li {\n  margin-bottom: 0.25rem;\n}\n._uploadImg_8f6zw_112 {\n  display: flex;\n  flex-direction: column;\n}\n._uploadImg_8f6zw_112 img {\n  width: 100%;\n  height: auto;\n}\n._uploadImgImage_8f6zw_120 {\n  border-style: groove;\n  border-width: thin;\n  padding: 0.5rem;\n}\n._uploadImgConfirm_8f6zw_125 {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n}\n";
  var styleCss$1 = StyleModuleLessinline;
  function joinStrings(s, sep) {
    return joinWith(s, sep, function(s2) {
      return s2;
    });
  }
  function querySelectorAllElements(t, q) {
    return keepMap(Array.prototype.slice.call(t.querySelectorAll(q)), ofNode);
  }
  function Utils$UList(Props) {
    var children = Props.children;
    return DOMRe.createDOMElementVariadic("ul", void 0, [Children.toArray(children).map(function(item) {
      return DOMRe.createDOMElementVariadic("li", void 0, [item]);
    })]);
  }
  var UList = {
    make: Utils$UList
  };
  function openWin(title, height, width, left, top, param) {
    var win = getExn$2(nullable_to_opt(window.open("", "", joinWith([
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
        mapWithDefault(left, "0", function(prim) {
          return String(prim);
        })
      ],
      [
        "top",
        mapWithDefault(top, "0", function(prim) {
          return String(prim);
        })
      ]
    ], ",", function(param2) {
      return param2[0] + "=" + param2[1];
    }))));
    window.addEventListener("unload", function(param2) {
      win.close();
    });
    var html = getExn$2(asHtmlDocument(win.document));
    html.head.appendChild(getExn$2(toNode(DOMRe.createDOMElementVariadic("title", void 0, [title]))));
    html.head.appendChild(getExn$2(toNode(DOMRe.createDOMElementVariadic("style", void 0, [styleCss$1]))));
    return [
      win,
      getExn$2(nullable_to_opt(html.body))
    ];
  }
  var compare = caml_string_compare;
  function entries(dict) {
    var keys = Object.keys(dict);
    var l = keys.length;
    var values = new Array(l);
    for (var i = 0; i < l; ++i) {
      var key = keys[i];
      values[i] = [
        key,
        dict[key]
      ];
    }
    return values;
  }
  function div(x, y) {
    if (y === 0) {
      throw {
        RE_EXN_ID: "Division_by_zero",
        Error: new Error()
      };
    }
    return x / y | 0;
  }
  function sortedLengthAuxMore(xs, _prec, _acc, len, lt) {
    while (true) {
      var acc = _acc;
      var prec = _prec;
      if (acc >= len) {
        return acc;
      }
      var v2 = xs[acc];
      if (!lt(v2, prec)) {
        return acc;
      }
      _acc = acc + 1 | 0;
      _prec = v2;
      continue;
    }
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
      while (true) {
        var acc = _acc;
        var prec = _prec;
        if (acc >= len) {
          return acc;
        }
        var v2 = xs[acc];
        if (!lt(prec, v2)) {
          return acc;
        }
        _acc = acc + 1 | 0;
        _prec = v2;
        continue;
      }
    } else if (lt(x1, x0)) {
      return -sortedLengthAuxMore(xs, x1, 2, len, lt) | 0;
    } else {
      return 1;
    }
  }
  function merge(src, src1ofs, src1len, src2, src2ofs, src2len, dst, dstofs, cmp) {
    var src1r = src1ofs + src1len | 0;
    var src2r = src2ofs + src2len | 0;
    var _i1 = src1ofs;
    var _s1 = src[src1ofs];
    var _i2 = src2ofs;
    var _s2 = src2[src2ofs];
    var _d = dstofs;
    while (true) {
      var d = _d;
      var s2 = _s2;
      var i2 = _i2;
      var s1 = _s1;
      var i1 = _i1;
      if (cmp(s1, s2) <= 0) {
        dst[d] = s1;
        var i1$1 = i1 + 1 | 0;
        if (i1$1 >= src1r) {
          return blitUnsafe(src2, i2, dst, d + 1 | 0, src2r - i2 | 0);
        }
        _d = d + 1 | 0;
        _s1 = src[i1$1];
        _i1 = i1$1;
        continue;
      }
      dst[d] = s2;
      var i2$1 = i2 + 1 | 0;
      if (i2$1 >= src2r) {
        return blitUnsafe(src, i1, dst, d + 1 | 0, src1r - i1 | 0);
      }
      _d = d + 1 | 0;
      _s2 = src2[i2$1];
      _i2 = i2$1;
      continue;
    }
  }
  function insertionSort(src, srcofs, dst, dstofs, len, cmp) {
    for (var i = 0; i < len; ++i) {
      var e = src[srcofs + i | 0];
      var j = (dstofs + i | 0) - 1 | 0;
      while (j >= dstofs && cmp(dst[j], e) > 0) {
        dst[j + 1 | 0] = dst[j];
        j = j - 1 | 0;
      }
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
  function stableSortByU(a, cmp) {
    var b = a.slice(0);
    stableSortInPlaceByU(b, cmp);
    return b;
  }
  function stableSortBy(a, cmp) {
    return stableSortByU(a, __2(cmp));
  }
  function treeHeight(n) {
    if (n !== void 0) {
      return n.h;
    } else {
      return 0;
    }
  }
  function create(l, x, d, r) {
    var hl = treeHeight(l);
    var hr = treeHeight(r);
    return {
      k: x,
      v: d,
      h: hl >= hr ? hl + 1 | 0 : hr + 1 | 0,
      l,
      r
    };
  }
  function singleton(x, d) {
    return {
      k: x,
      v: d,
      h: 1,
      l: void 0,
      r: void 0
    };
  }
  function heightGe(l, r) {
    if (r !== void 0) {
      if (l !== void 0) {
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
    var hl = l !== void 0 ? l.h : 0;
    var hr = r !== void 0 ? r.h : 0;
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
        l,
        r
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
  function removeMinAuxWithRef(n, kr, vr) {
    var ln = n.l;
    if (ln !== void 0) {
      return bal(removeMinAuxWithRef(ln, kr, vr), n.k, n.v, n.r);
    } else {
      kr.contents = n.k;
      vr.contents = n.v;
      return n.r;
    }
  }
  function forEachU(_n, f) {
    while (true) {
      var n = _n;
      if (n === void 0) {
        return;
      }
      forEachU(n.l, f);
      f(n.k, n.v);
      _n = n.r;
      continue;
    }
  }
  function forEach$1(n, f) {
    return forEachU(n, __2(f));
  }
  function reduceU(_m, _accu, f) {
    while (true) {
      var accu = _accu;
      var m = _m;
      if (m === void 0) {
        return accu;
      }
      var v2 = m.k;
      var d = m.v;
      var l = m.l;
      var r = m.r;
      _accu = f(reduceU(l, accu, f), v2, d);
      _m = r;
      continue;
    }
  }
  function reduce$1(m, accu, f) {
    return reduceU(m, accu, __3(f));
  }
  function lengthNode(n) {
    var l = n.l;
    var r = n.r;
    var sizeL = l !== void 0 ? lengthNode(l) : 0;
    var sizeR = r !== void 0 ? lengthNode(r) : 0;
    return (1 + sizeL | 0) + sizeR | 0;
  }
  function size$1(n) {
    if (n !== void 0) {
      return lengthNode(n);
    } else {
      return 0;
    }
  }
  function fillArray(_n, _i, arr) {
    while (true) {
      var i = _i;
      var n = _n;
      var l = n.l;
      var v2 = n.k;
      var r = n.r;
      var next = l !== void 0 ? fillArray(l, i, arr) : i;
      arr[next] = [
        v2,
        n.v
      ];
      var rnext = next + 1 | 0;
      if (r === void 0) {
        return rnext;
      }
      _i = rnext;
      _n = r;
      continue;
    }
  }
  function toArray$1(n) {
    if (n === void 0) {
      return [];
    }
    var size2 = lengthNode(n);
    var v2 = new Array(size2);
    fillArray(n, 0, v2);
    return v2;
  }
  function fromSortedArrayRevAux(arr, off, len) {
    switch (len) {
      case 0:
        return;
      case 1:
        var match = arr[off];
        return singleton(match[0], match[1]);
      case 2:
        var match_0 = arr[off];
        var match_1 = arr[off - 1 | 0];
        var match$1 = match_1;
        var match$2 = match_0;
        return {
          k: match$1[0],
          v: match$1[1],
          h: 2,
          l: singleton(match$2[0], match$2[1]),
          r: void 0
        };
      case 3:
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
      case 0:
        return;
      case 1:
        var match = arr[off];
        return singleton(match[0], match[1]);
      case 2:
        var match_0 = arr[off];
        var match_1 = arr[off + 1 | 0];
        var match$1 = match_1;
        var match$2 = match_0;
        return {
          k: match$1[0],
          v: match$1[1],
          h: 2,
          l: singleton(match$2[0], match$2[1]),
          r: void 0
        };
      case 3:
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
  function rotateWithLeftChild(k2) {
    var k1 = k2.l;
    k2.l = k1.r;
    k1.r = k2;
    var hlk2 = treeHeight(k2.l);
    var hrk2 = treeHeight(k2.r);
    k2.h = (hlk2 > hrk2 ? hlk2 : hrk2) + 1 | 0;
    var hlk1 = treeHeight(k1.l);
    var hk2 = k2.h;
    k1.h = (hlk1 > hk2 ? hlk1 : hk2) + 1 | 0;
    return k1;
  }
  function rotateWithRightChild(k1) {
    var k2 = k1.r;
    k1.r = k2.l;
    k2.l = k1;
    var hlk1 = treeHeight(k1.l);
    var hrk1 = treeHeight(k1.r);
    k1.h = (hlk1 > hrk1 ? hlk1 : hrk1) + 1 | 0;
    var hrk2 = treeHeight(k2.r);
    var hk1 = k1.h;
    k2.h = (hrk2 > hk1 ? hrk2 : hk1) + 1 | 0;
    return k2;
  }
  function doubleWithLeftChild(k3) {
    var x = k3.l;
    var v2 = rotateWithRightChild(x);
    k3.l = v2;
    return rotateWithLeftChild(k3);
  }
  function doubleWithRightChild(k2) {
    var x = k2.r;
    var v2 = rotateWithLeftChild(x);
    k2.r = v2;
    return rotateWithRightChild(k2);
  }
  function heightUpdateMutate(t) {
    var hlt = treeHeight(t.l);
    var hrt = treeHeight(t.r);
    t.h = (hlt > hrt ? hlt : hrt) + 1 | 0;
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
    nt.h = (hl > hr ? hl : hr) + 1 | 0;
    return nt;
  }
  function get$3(_n, x) {
    while (true) {
      var n = _n;
      if (n === void 0) {
        return;
      }
      var v2 = n.k;
      if (x === v2) {
        return some(n.v);
      }
      _n = x < v2 ? n.l : n.r;
      continue;
    }
  }
  function getExn$1(_n, x) {
    while (true) {
      var n = _n;
      if (n !== void 0) {
        var v2 = n.k;
        if (x === v2) {
          return n.v;
        }
        _n = x < v2 ? n.l : n.r;
        continue;
      }
      throw {
        RE_EXN_ID: "Not_found",
        Error: new Error()
      };
    }
  }
  function addMutate(t, x, data) {
    if (t === void 0) {
      return singleton(x, data);
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
    return balMutate(t);
  }
  function fromArray$1(xs) {
    var len = xs.length;
    if (len === 0) {
      return;
    }
    var next = strictlySortedLengthU(xs, function(param, param$1) {
      return param[0] < param$1[0];
    });
    var result;
    if (next >= 0) {
      result = fromSortedArrayAux(xs, 0, next);
    } else {
      next = -next | 0;
      result = fromSortedArrayRevAux(xs, next - 1 | 0, next);
    }
    for (var i = next; i < len; ++i) {
      var match = xs[i];
      result = addMutate(result, match[0], match[1]);
    }
    return result;
  }
  function set$1(t, newK, newD) {
    if (t === void 0) {
      return singleton(newK, newD);
    }
    var k = t.k;
    if (newK === k) {
      return updateValue(t, newD);
    }
    var v2 = t.v;
    if (newK < k) {
      return bal(set$1(t.l, newK, newD), k, v2, t.r);
    } else {
      return bal(t.l, k, v2, set$1(t.r, newK, newD));
    }
  }
  function updateU(t, x, f) {
    if (t !== void 0) {
      var k = t.k;
      if (x === k) {
        var data = f(some(t.v));
        if (data !== void 0) {
          return updateValue(t, valFromOption(data));
        }
        var l = t.l;
        var r = t.r;
        if (l === void 0) {
          return r;
        }
        if (r === void 0) {
          return l;
        }
        var kr = {
          contents: r.k
        };
        var vr = {
          contents: r.v
        };
        var r$1 = removeMinAuxWithRef(r, kr, vr);
        return bal(l, kr.contents, vr.contents, r$1);
      }
      var v2 = t.v;
      var l$1 = t.l;
      var r$2 = t.r;
      if (x < k) {
        var ll = updateU(l$1, x, f);
        if (l$1 === ll) {
          return t;
        } else {
          return bal(ll, k, v2, r$2);
        }
      }
      var rr = updateU(r$2, x, f);
      if (r$2 === rr) {
        return t;
      } else {
        return bal(l$1, k, v2, rr);
      }
    }
    var data$1 = f(void 0);
    if (data$1 !== void 0) {
      return singleton(x, valFromOption(data$1));
    } else {
      return t;
    }
  }
  function update(t, x, f) {
    return updateU(t, x, __1(f));
  }
  var reduce = reduce$1;
  var size = size$1;
  var toArray = toArray$1;
  var fromArray = fromArray$1;
  var get$2 = get$3;
  var getExn = getExn$1;
  const mainBody = "_mainBody_8f6zw_1";
  const clickable = "_clickable_8f6zw_11";
  const stateWorkingOn = "_stateWorkingOn_8f6zw_14";
  const stateSure = "_stateSure_8f6zw_17";
  const stateNotSure = "_stateNotSure_8f6zw_20";
  const answerMsg = "_answerMsg_8f6zw_23";
  const answerMsgName = "_answerMsgName_8f6zw_32";
  const answerMark = "_answerMark_8f6zw_35";
  const answerDetail = "_answerDetail_8f6zw_53";
  const answerDetailShortAnswer = "_answerDetailShortAnswer_8f6zw_65";
  const settings = "_settings_8f6zw_71";
  const settingsEntry = "_settingsEntry_8f6zw_79";
  const settingsSubmit = "_settingsSubmit_8f6zw_93";
  const settingsSubmitTip = "_settingsSubmitTip_8f6zw_99";
  const about = "_about_8f6zw_102";
  const uploadImg = "_uploadImg_8f6zw_112";
  const uploadImgImage = "_uploadImgImage_8f6zw_120";
  const uploadImgConfirm = "_uploadImgConfirm_8f6zw_125";
  var style_module = {
    mainBody,
    clickable,
    stateWorkingOn,
    stateSure,
    stateNotSure,
    answerMsg,
    answerMsgName,
    answerMark,
    answerDetail,
    answerDetailShortAnswer,
    settings,
    settingsEntry,
    settingsSubmit,
    settingsSubmitTip,
    about,
    uploadImg,
    uploadImgImage,
    uploadImgConfirm
  };
  var StyleModuleLess = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
    __proto__: null,
    mainBody,
    clickable,
    stateWorkingOn,
    stateSure,
    stateNotSure,
    answerMsg,
    answerMsgName,
    answerMark,
    answerDetail,
    answerDetailShortAnswer,
    settings,
    settingsEntry,
    settingsSubmit,
    settingsSubmitTip,
    about,
    uploadImg,
    uploadImgImage,
    uploadImgConfirm,
    "default": style_module
  }, Symbol.toStringTag, { value: "Module" }));
  var style$2 = StyleModuleLess;
  function percent(a, b) {
    return String(div(Math.imul(a, 100), b)) + "%";
  }
  function sortByKey(arr) {
    return stableSortBy(arr, function(param, param$1) {
      return compare(param[0], param$1[0]);
    });
  }
  function stateClass(state) {
    return map(state, function(state2) {
      switch (state2) {
        case 0:
          return style$2.stateWorkingOn;
        case 1:
          return style$2.stateSure;
        case 2:
          return style$2.stateNotSure;
      }
    });
  }
  function answerState(context) {
    return stateClass(flatMap(context, function(c) {
      return c.state;
    }));
  }
  function stateToPriv(state) {
    switch (state) {
      case 0:
        return 1;
      case 1:
        return 0;
      case 2:
        return 2;
    }
  }
  function cmpWithState(param, param$1) {
    var bState = param$1[1];
    var aState = param[1];
    if (aState !== void 0) {
      if (bState !== void 0) {
        return stateToPriv(bState) - stateToPriv(aState) | 0;
      } else {
        return -1;
      }
    } else if (bState !== void 0) {
      return 1;
    } else {
      return compare(param[0], param$1[0]);
    }
  }
  function sortByNameWithContext(arr) {
    return stableSortBy(arr, function(param, param$1) {
      return cmpWithState([
        param[0],
        flatMap(param[1], function(ctx) {
          return ctx.state;
        })
      ], [
        param$1[0],
        flatMap(param$1[1], function(ctx) {
          return ctx.state;
        })
      ]);
    });
  }
  function sortByNameWithAnswerContext(arr) {
    return stableSortBy(arr, function(param, param$1) {
      return cmpWithState([
        param[0],
        flatMap(param[1].context, function(ctx) {
          return ctx.state;
        })
      ], [
        param$1[0],
        flatMap(param$1[1].context, function(ctx) {
          return ctx.state;
        })
      ]);
    });
  }
  function setContent($$this, text) {
    $$this.ele.setAttribute("title", text);
  }
  function make$1(subjectItem, extra) {
    return {
      tooltips: reduceWithIndex(querySelectorAllElements(subjectItem, ".item-body .checkboxInput, .item-body .radioInput"), void 0, function(tooltips, ele, idx) {
        return set$1(tooltips, String.fromCharCode(idx + 65 | 0), {
          ele
        });
      }),
      choiceMap: extra
    };
  }
  function updateUI$1(detail, context) {
    return map$1(sortByKey(map$1(toArray(reduce(detail, void 0, function(choiceToUsers, user, param) {
      var context2 = param.context;
      return mapWithDefault(param.answer, choiceToUsers, function(choices) {
        return reduce$2(choices, choiceToUsers, function(choiceToUsers2, choice) {
          return update(choiceToUsers2, choice, function(users) {
            return concat(getWithDefault(users, []), [[
              user,
              context2
            ]]);
          });
        });
      });
    })), function(param) {
      return [
        _1(context.choiceMap, param[0]),
        param[1]
      ];
    })), function(param) {
      var users = param[1];
      var choice = param[0];
      forEach$2(get$2(context.tooltips, choice), function(__x) {
        return setContent(__x, percent(users.length, size(detail)));
      });
      return DOMRe.createDOMElementVariadic("div", void 0, [
        DOMRe.createDOMElementVariadic("p", void 0, [DOMRe.createDOMElementVariadic("strong", void 0, [choice])]),
        createElement(UList.make, {
          children: map$1(sortByNameWithContext(users), function(param2) {
            var tmp = {};
            var tmp$1 = answerState(param2[1]);
            if (tmp$1 !== void 0) {
              tmp.className = valFromOption(tmp$1);
            }
            return DOMRe.createDOMElementVariadic("p", some(tmp), [param2[0]]);
          })
        })
      ]);
    });
  }
  function showDetail($$this, top, left) {
    var match = openWin("\u8BE6\u7EC6\u7B54\u6848", 200, 300, left, top);
    match[1].appendChild(getExn$2(toNode(DOMRe.createDOMElementVariadic("div", {
      className: style$2.mainBody
    }, [
      DOMRe.createDOMElementVariadic("fieldset", {
        className: style$2.answerMark
      }, [
        DOMRe.createDOMElementVariadic("legend", void 0, ["\u6807\u8BB0"]),
        DOMRe.createDOMElementVariadic("input", {
          placeholder: "\u8F93\u5165\u7559\u8A00",
          type: "text",
          onChange: function(ev) {
            var prim1 = ev.target.value;
            CLIENT.updateMsg($$this.id, prim1);
          }
        }, []),
        DOMRe.createDOMElementVariadic("button", {
          className: style$2.stateWorkingOn,
          type: "button",
          onClick: function(param) {
            CLIENT.updateState($$this.id, 0);
          }
        }, ["\u6211\u6B63\u5728\u505A"]),
        DOMRe.createDOMElementVariadic("button", {
          className: style$2.stateSure,
          type: "button",
          onClick: function(param) {
            CLIENT.updateState($$this.id, 1);
          }
        }, ["\u6211\u5F88\u786E\u5B9A"]),
        DOMRe.createDOMElementVariadic("button", {
          className: style$2.stateNotSure,
          type: "button",
          onClick: function(param) {
            CLIENT.updateState($$this.id, 2);
          }
        }, ["\u6211\u4E0D\u786E\u5B9A"])
      ]),
      $$this.detailHtml
    ]))));
  }
  function make$2(id2, subjectItem, extra) {
    var $$this = {
      details: void 0,
      detailHtml: null,
      context: make$1(subjectItem, extra),
      id: id2
    };
    var itemType = getExn$2(nullable_to_opt(subjectItem.querySelector(".item-type")));
    itemType.classList.add(style$2.clickable);
    itemType.addEventListener("click", function(param) {
      var rect = itemType.getBoundingClientRect();
      return showDetail($$this, rect.top | 0, rect.left | 0);
    });
    return $$this;
  }
  function updateAnswer$1($$this, username, data) {
    $$this.details = set$1($$this.details, username, data);
  }
  function updateUI$1$1($$this) {
    $$this.detailHtml = DOMRe.createDOMElementVariadic("div", void 0, [
      DOMRe.createDOMElementVariadic("fieldset", {
        className: style$2.answerMsg
      }, [
        DOMRe.createDOMElementVariadic("legend", void 0, ["\u7559\u8A00"]),
        createElement(UList.make, {
          children: map$1(keepMap(sortByNameWithAnswerContext(toArray($$this.details)), function(param) {
            var user = param[0];
            return flatMap(param[1].context, function(ctx) {
              var match = ctx.state;
              var msg = match === 0 ? getWithDefault(ctx.msg, "\u6211\u6B63\u5728\u505A") : ctx.msg;
              return map(msg, function(msg2) {
                return [
                  user,
                  ctx.state,
                  msg2
                ];
              });
            });
          }), function(param) {
            var tmp = {};
            var tmp$1 = stateClass(param[1]);
            if (tmp$1 !== void 0) {
              tmp.className = valFromOption(tmp$1);
            }
            return DOMRe.createDOMElementVariadic("p", some(tmp), [
              DOMRe.createDOMElementVariadic("span", {
                className: style$2.answerMsgName
              }, [param[0] + ": "]),
              param[2]
            ]);
          })
        })
      ]),
      DOMRe.createDOMElementVariadic("div", {
        className: style$2.answerDetail
      }, [updateUI$1($$this.details, $$this.context)])
    ]);
  }
  var Choice = {
    showDetail,
    make: make$2,
    updateAnswer: updateAnswer$1,
    updateUI: updateUI$1$1
  };
  function make$3(subjectItem, param) {
    return {
      tooltips: reduceWithIndex(querySelectorAllElements(subjectItem, ".item-body .blank-item-dynamic"), void 0, function(tooltips, ele, idx) {
        return set$1(tooltips, String.fromCharCode(49 + idx | 0), {
          ele
        });
      })
    };
  }
  function updateUI$2(detail, context) {
    return map$1(sortByKey(toArray(reduce(detail, void 0, function(blankToFillToUsers, user, param) {
      var context2 = param.context;
      return mapWithDefault(param.answer, blankToFillToUsers, function(blankToFill) {
        return reduce$2(entries(blankToFill), blankToFillToUsers, function(blankToFillToUsers2, param2) {
          var fill = param2[1];
          return update(blankToFillToUsers2, param2[0], function(fillToUsers) {
            return some(update(getWithDefault(fillToUsers, void 0), fill, function(users) {
              return concat(getWithDefault(users, []), [[
                user,
                context2
              ]]);
            }));
          });
        });
      });
    }))), function(param) {
      var blank = param[0];
      var fillToUsers = sortByKey(toArray(param[1]));
      forEach$2(get$2(context.tooltips, blank), function(__x) {
        return setContent(__x, mapWithDefault(get$4(stableSortBy(map$1(fillToUsers, function(param2) {
          return [
            param2[0],
            param2[1].length
          ];
        }), function(param2, param$1) {
          return param$1[1] - param2[1] | 0;
        }), 0), "", function(param2) {
          return "(" + percent(param2[1], size(detail)) + ") " + param2[0];
        }));
      });
      return DOMRe.createDOMElementVariadic("div", void 0, [
        DOMRe.createDOMElementVariadic("p", void 0, [DOMRe.createDOMElementVariadic("strong", void 0, ["#" + blank])]),
        createElement(UList.make, {
          children: map$1(fillToUsers, function(param2) {
            return DOMRe.createDOMElementVariadic("div", void 0, [
              DOMRe.createDOMElementVariadic("p", void 0, [param2[0]]),
              createElement(UList.make, {
                children: map$1(sortByNameWithContext(param2[1]), function(param3) {
                  var tmp = {};
                  var tmp$1 = answerState(param3[1]);
                  if (tmp$1 !== void 0) {
                    tmp.className = valFromOption(tmp$1);
                  }
                  return DOMRe.createDOMElementVariadic("p", some(tmp), [param3[0]]);
                })
              })
            ]);
          })
        })
      ]);
    });
  }
  function showDetail$1($$this, top, left) {
    var match = openWin("\u8BE6\u7EC6\u7B54\u6848", 200, 300, left, top);
    match[1].appendChild(getExn$2(toNode(DOMRe.createDOMElementVariadic("div", {
      className: style$2.mainBody
    }, [
      DOMRe.createDOMElementVariadic("fieldset", {
        className: style$2.answerMark
      }, [
        DOMRe.createDOMElementVariadic("legend", void 0, ["\u6807\u8BB0"]),
        DOMRe.createDOMElementVariadic("input", {
          placeholder: "\u8F93\u5165\u7559\u8A00",
          type: "text",
          onChange: function(ev) {
            var prim1 = ev.target.value;
            CLIENT.updateMsg($$this.id, prim1);
          }
        }, []),
        DOMRe.createDOMElementVariadic("button", {
          className: style$2.stateWorkingOn,
          type: "button",
          onClick: function(param) {
            CLIENT.updateState($$this.id, 0);
          }
        }, ["\u6211\u6B63\u5728\u505A"]),
        DOMRe.createDOMElementVariadic("button", {
          className: style$2.stateSure,
          type: "button",
          onClick: function(param) {
            CLIENT.updateState($$this.id, 1);
          }
        }, ["\u6211\u5F88\u786E\u5B9A"]),
        DOMRe.createDOMElementVariadic("button", {
          className: style$2.stateNotSure,
          type: "button",
          onClick: function(param) {
            CLIENT.updateState($$this.id, 2);
          }
        }, ["\u6211\u4E0D\u786E\u5B9A"])
      ]),
      $$this.detailHtml
    ]))));
  }
  function make$4(id2, subjectItem, extra) {
    var $$this = {
      details: void 0,
      detailHtml: null,
      context: make$3(subjectItem),
      id: id2
    };
    var itemType = getExn$2(nullable_to_opt(subjectItem.querySelector(".item-type")));
    itemType.classList.add(style$2.clickable);
    itemType.addEventListener("click", function(param) {
      var rect = itemType.getBoundingClientRect();
      return showDetail$1($$this, rect.top | 0, rect.left | 0);
    });
    return $$this;
  }
  function updateAnswer$1$1($$this, username, data) {
    $$this.details = set$1($$this.details, username, data);
  }
  function updateUI$3($$this) {
    $$this.detailHtml = DOMRe.createDOMElementVariadic("div", void 0, [
      DOMRe.createDOMElementVariadic("fieldset", {
        className: style$2.answerMsg
      }, [
        DOMRe.createDOMElementVariadic("legend", void 0, ["\u7559\u8A00"]),
        createElement(UList.make, {
          children: map$1(keepMap(sortByNameWithAnswerContext(toArray($$this.details)), function(param) {
            var user = param[0];
            return flatMap(param[1].context, function(ctx) {
              var match = ctx.state;
              var msg = match === 0 ? getWithDefault(ctx.msg, "\u6211\u6B63\u5728\u505A") : ctx.msg;
              return map(msg, function(msg2) {
                return [
                  user,
                  ctx.state,
                  msg2
                ];
              });
            });
          }), function(param) {
            var tmp = {};
            var tmp$1 = stateClass(param[1]);
            if (tmp$1 !== void 0) {
              tmp.className = valFromOption(tmp$1);
            }
            return DOMRe.createDOMElementVariadic("p", some(tmp), [
              DOMRe.createDOMElementVariadic("span", {
                className: style$2.answerMsgName
              }, [param[0] + ": "]),
              param[2]
            ]);
          })
        })
      ]),
      DOMRe.createDOMElementVariadic("div", {
        className: style$2.answerDetail
      }, [updateUI$2($$this.details, $$this.context)])
    ]);
  }
  var Blank = {
    showDetail: showDetail$1,
    make: make$4,
    updateAnswer: updateAnswer$1$1,
    updateUI: updateUI$3
  };
  function make$5(param, param$1) {
  }
  function updateUI$4(detail, param) {
    return map$1(sortByNameWithAnswerContext(toArray(detail)), function(param2) {
      var match = param2[1];
      var text = match.answer;
      var tmp = {};
      var tmp$1 = answerState(match.context);
      if (tmp$1 !== void 0) {
        tmp.className = valFromOption(tmp$1);
      }
      return DOMRe.createDOMElementVariadic("div", void 0, [
        DOMRe.createDOMElementVariadic("p", some(tmp), [DOMRe.createDOMElementVariadic("strong", void 0, [param2[0]])]),
        DOMRe.createDOMElementVariadic("div", {
          className: style$2.answerDetailShortAnswer,
          dangerouslySetInnerHTML: {
            __html: getWithDefault(flatMap(text, function(text2) {
              return text2.content;
            }), "")
          }
        }, []),
        createElement(UList.make, {
          children: map$1(getWithDefault(flatMap(flatMap(text, function(text2) {
            return text2.attachments;
          }), function(atta) {
            return atta.filelist;
          }), []), function(atta) {
            return DOMRe.createDOMElementVariadic("a", {
              href: atta.fileUrl
            }, [atta.fileName]);
          })
        }),
        DOMRe.createDOMElementVariadic("div", void 0, [])
      ]);
    });
  }
  function showDetail$2($$this, top, left) {
    var match = openWin("\u8BE6\u7EC6\u7B54\u6848", 200, 300, left, top);
    match[1].appendChild(getExn$2(toNode(DOMRe.createDOMElementVariadic("div", {
      className: style$2.mainBody
    }, [
      DOMRe.createDOMElementVariadic("fieldset", {
        className: style$2.answerMark
      }, [
        DOMRe.createDOMElementVariadic("legend", void 0, ["\u6807\u8BB0"]),
        DOMRe.createDOMElementVariadic("input", {
          placeholder: "\u8F93\u5165\u7559\u8A00",
          type: "text",
          onChange: function(ev) {
            var prim1 = ev.target.value;
            CLIENT.updateMsg($$this.id, prim1);
          }
        }, []),
        DOMRe.createDOMElementVariadic("button", {
          className: style$2.stateWorkingOn,
          type: "button",
          onClick: function(param) {
            CLIENT.updateState($$this.id, 0);
          }
        }, ["\u6211\u6B63\u5728\u505A"]),
        DOMRe.createDOMElementVariadic("button", {
          className: style$2.stateSure,
          type: "button",
          onClick: function(param) {
            CLIENT.updateState($$this.id, 1);
          }
        }, ["\u6211\u5F88\u786E\u5B9A"]),
        DOMRe.createDOMElementVariadic("button", {
          className: style$2.stateNotSure,
          type: "button",
          onClick: function(param) {
            CLIENT.updateState($$this.id, 2);
          }
        }, ["\u6211\u4E0D\u786E\u5B9A"])
      ]),
      $$this.detailHtml
    ]))));
  }
  function make$6(id2, subjectItem, extra) {
    var $$this = {
      details: void 0,
      detailHtml: null,
      context: make$5(),
      id: id2
    };
    var itemType = getExn$2(nullable_to_opt(subjectItem.querySelector(".item-type")));
    itemType.classList.add(style$2.clickable);
    itemType.addEventListener("click", function(param) {
      var rect = itemType.getBoundingClientRect();
      return showDetail$2($$this, rect.top | 0, rect.left | 0);
    });
    return $$this;
  }
  function updateAnswer$2($$this, username, data) {
    $$this.details = set$1($$this.details, username, data);
  }
  function updateUI$5($$this) {
    $$this.detailHtml = DOMRe.createDOMElementVariadic("div", void 0, [
      DOMRe.createDOMElementVariadic("fieldset", {
        className: style$2.answerMsg
      }, [
        DOMRe.createDOMElementVariadic("legend", void 0, ["\u7559\u8A00"]),
        createElement(UList.make, {
          children: map$1(keepMap(sortByNameWithAnswerContext(toArray($$this.details)), function(param) {
            var user = param[0];
            return flatMap(param[1].context, function(ctx) {
              var match = ctx.state;
              var msg = match === 0 ? getWithDefault(ctx.msg, "\u6211\u6B63\u5728\u505A") : ctx.msg;
              return map(msg, function(msg2) {
                return [
                  user,
                  ctx.state,
                  msg2
                ];
              });
            });
          }), function(param) {
            var tmp = {};
            var tmp$1 = stateClass(param[1]);
            if (tmp$1 !== void 0) {
              tmp.className = valFromOption(tmp$1);
            }
            return DOMRe.createDOMElementVariadic("p", some(tmp), [
              DOMRe.createDOMElementVariadic("span", {
                className: style$2.answerMsgName
              }, [param[0] + ": "]),
              param[2]
            ]);
          })
        })
      ]),
      DOMRe.createDOMElementVariadic("div", {
        className: style$2.answerDetail
      }, [updateUI$4($$this.details, $$this.context)])
    ]);
  }
  var ShortAnswer = {
    showDetail: showDetail$2,
    make: make$6,
    updateAnswer: updateAnswer$2,
    updateUI: updateUI$5
  };
  function raiseError(str) {
    throw new Error(str);
  }
  var style$1 = StyleModuleLess;
  function Settings$Settings(Props) {
    var onSubmit = Props.onSubmit;
    var Settings$Settings$1 = function(Props2) {
      var name2 = Props2.name;
      var title = Props2.title;
      var props = Props2.props;
      var props$1 = Object.assign(props, {
        name: name2
      });
      return DOMRe.createDOMElementVariadic("div", {
        className: style$1.settingsEntry
      }, [
        DOMRe.createDOMElementVariadic("label", {
          htmlFor: name2
        }, [title]),
        DOMRe.createDOMElementVariadic("input", some(props$1), [])
      ]);
    };
    var Settings$Settings$2 = function(Props2) {
      var title = Props2.title;
      var content = Props2.content;
      return DOMRe.createDOMElementVariadic("p", void 0, [
        DOMRe.createDOMElementVariadic("strong", void 0, [title]),
        content
      ]);
    };
    var form = {};
    var tmp = {
      title: "\u5C0F\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u4E0B\u5212\u7EBF",
      pattern: "^[a-z][a-z0-9_]*$",
      required: true,
      type: "text",
      onChange: function(param) {
        var param$1 = param.target.value;
        form.username = param$1;
      }
    };
    var tmp$1 = Username.get(void 0);
    if (tmp$1 !== void 0) {
      tmp.value = valFromOption(tmp$1);
    }
    var tmp$2 = {
      required: true,
      type: "url",
      onChange: function(param) {
        var param$1 = param.target.value;
        form.server = param$1;
      }
    };
    var tmp$3 = Server.get(void 0);
    if (tmp$3 !== void 0) {
      tmp$2.value = valFromOption(tmp$3);
    }
    var tmp$4 = {
      type: "checkbox",
      onChange: function(param) {
        var param$1 = param.target.checked;
        form.syncAnswers = param$1;
      }
    };
    var tmp$5 = SyncAnswers.get(void 0);
    if (tmp$5 !== void 0) {
      tmp$4.checked = valFromOption(tmp$5);
    }
    var tmp$6 = {
      type: "checkbox",
      onChange: function(param) {
        var param$1 = param.target.checked;
        form.sortProblems = param$1;
      }
    };
    var tmp$7 = SortProblems.get(void 0);
    if (tmp$7 !== void 0) {
      tmp$6.checked = valFromOption(tmp$7);
    }
    var tmp$8 = {
      type: "checkbox",
      onChange: function(param) {
        var param$1 = param.target.checked;
        form.noLeaveCheck = param$1;
      }
    };
    var tmp$9 = NoLeaveCheck.get(void 0);
    if (tmp$9 !== void 0) {
      tmp$8.checked = valFromOption(tmp$9);
    }
    return DOMRe.createDOMElementVariadic("div", void 0, [
      DOMRe.createDOMElementVariadic("form", {
        className: style$1.settings,
        onSubmit: function(ev) {
          ev.preventDefault();
          forEach$2(undefined_to_opt(form.username), Username.set);
          forEach$2(undefined_to_opt(form.server), Server.set);
          forEach$2(undefined_to_opt(form.syncAnswers), SyncAnswers.set);
          forEach$2(undefined_to_opt(form.noLeaveCheck), NoLeaveCheck.set);
          forEach$2(undefined_to_opt(form.sortProblems), SortProblems.set);
          return _1(onSubmit, void 0);
        }
      }, [
        createElement(Settings$Settings$1, {
          name: "username",
          title: "\u7528\u6237\u540D",
          props: tmp
        }),
        createElement(Settings$Settings$1, {
          name: "server",
          title: "\u670D\u52A1\u5668",
          props: tmp$2
        }),
        createElement(Settings$Settings$1, {
          name: "sync_answers",
          title: "\u540C\u6B65\u7B54\u6848",
          props: tmp$4
        }),
        createElement(Settings$Settings$1, {
          name: "sort_problems",
          title: "\u6392\u5E8F\u9898\u76EE",
          props: tmp$6
        }),
        createElement(Settings$Settings$1, {
          name: "no_leave_check",
          title: "\u62E6\u622A\u5207\u5C4F\u68C0\u6D4B",
          props: tmp$8
        }),
        DOMRe.createDOMElementVariadic("div", {
          className: style$1.settingsSubmit
        }, [
          DOMRe.createDOMElementVariadic("p", {
            className: style$1.settingsSubmitTip
          }, [DOMRe.createDOMElementVariadic("i", void 0, ["*\u66F4\u6539\u8BBE\u7F6E\u540E\u8BF7\u5237\u65B0\u9875\u9762"])]),
          DOMRe.createDOMElementVariadic("button", {
            type: "submit"
          }, ["\u63D0\u4EA4"])
        ])
      ]),
      DOMRe.createDOMElementVariadic("div", {
        className: style$1.about
      }, [
        DOMRe.createDOMElementVariadic("p", void 0, [DOMRe.createDOMElementVariadic("strong", void 0, ["\u529F\u80FD\u7279\u6027\uFF1A"])]),
        createElementVariadic(UList.make, {
          children: null
        }, [
          createElement(Settings$Settings$2, {
            title: "\u540C\u6B65\u7B54\u6848\uFF1A",
            content: "\u70B9\u51FB\u9898\u76EE\u663E\u793A\u8BE6\u7EC6\u7B54\u6848\uFF0C\u5728\u9009\u9879/\u586B\u7A7A\u5904\u60AC\u505C\u663E\u793A\u7B80\u7565\u7B54\u6848"
          }),
          createElement(Settings$Settings$2, {
            title: "\u6392\u5E8F\u9898\u76EE\uFF1A",
            content: "\u6839\u636E ID \u5BF9\u9898\u76EE\u548C\u9009\u9879\u8FDB\u884C\u91CD\u65B0\u6392\u5E8F"
          }),
          createElement(Settings$Settings$2, {
            title: "\u62E6\u622A\u5207\u5C4F\u68C0\u6D4B\uFF1A",
            content: "\u968F\u610F\u5207\u6362\u9875\u9762\u3001\u7A97\u53E3\u4E0D\u4F1A\u88AB\u53D1\u73B0"
          }),
          createElement(Settings$Settings$2, {
            title: "\u62E6\u622A\u4E0A\u4F20\u622A\u56FE\uFF1A",
            content: "\u4EC5\u5F53\u7528\u6237\u786E\u8BA4\u540E\uFF0C\u624D\u4F1A\u4E0A\u4F20\u622A\u56FE"
          }),
          createElement(Settings$Settings$2, {
            title: "\u62E6\u622A\u5F02\u5E38\u72B6\u6001\uFF1A",
            content: "\u5373\u4F7F\u672C\u5730\u663E\u793A\u5F02\u5E38\u4E5F\u4E0D\u4F1A\u63A8\u9001\u5230\u670D\u52A1\u5668"
          })
        ])
      ])
    ]);
  }
  function showSettings(param) {
    var match = openWin("\u8BBE\u7F6E", 300, 400, void 0, void 0);
    var win = match[0];
    match[1].appendChild(getExn$2(toNode(DOMRe.createDOMElementVariadic("div", {
      className: style$1.mainBody
    }, [createElement(Settings$Settings, {
      onSubmit: function(param2) {
        win.close();
      }
    })]))));
  }
  function get$1(_n, x) {
    while (true) {
      var n = _n;
      if (n === void 0) {
        return;
      }
      var v2 = n.k;
      if (x === v2) {
        return some(n.v);
      }
      _n = x < v2 ? n.l : n.r;
      continue;
    }
  }
  function set(t, newK, newD) {
    if (t === void 0) {
      return singleton(newK, newD);
    }
    var k = t.k;
    if (newK === k) {
      return updateValue(t, newD);
    }
    var v2 = t.v;
    if (newK < k) {
      return bal(set(t.l, newK, newD), k, v2, t.r);
    } else {
      return bal(t.l, k, v2, set(t.r, newK, newD));
    }
  }
  var forEach = forEach$1;
  var get = get$1;
  var ofElement = asHtmlElement;
  var styleCss = StyleModuleLessinline;
  var style = StyleModuleLess;
  function showConfirmUpload$1(dataURL, cb) {
    var match = openWin("\u4E0A\u4F20\u56FE\u7247", 200, 300, void 0, void 0);
    var win = match[0];
    match[1].appendChild(getExn$2(toNode(DOMRe.createDOMElementVariadic("div", {
      className: joinStrings([
        style.mainBody,
        style.uploadImg
      ], " ")
    }, [
      DOMRe.createDOMElementVariadic("div", {
        className: style.uploadImgConfirm
      }, [
        DOMRe.createDOMElementVariadic("button", {
          className: style.clickable,
          onClick: function(param) {
            _1(cb, void 0);
            win.close();
          }
        }, ["\u786E\u8BA4\u4E0A\u4F20"]),
        DOMRe.createDOMElementVariadic("span", void 0, [DOMRe.createDOMElementVariadic("i", void 0, ["*\u5173\u95ED\u7A97\u53E3\u4EE5\u53D6\u6D88\u4E0A\u4F20"])])
      ]),
      DOMRe.createDOMElementVariadic("div", {
        className: style.uploadImgImage
      }, [DOMRe.createDOMElementVariadic("img", {
        src: dataURL
      }, [])])
    ]))));
  }
  function probelmTypeFromJs(param) {
    if (param <= 6 && 1 <= param) {
      return param - 1 | 0;
    }
  }
  function unsafeConvertUpdateDetail(t, d) {
    return {
      updateUI: function(param) {
        return _1(t.updateUI, d);
      },
      updateAnswer: function(username, data) {
        return _3(t.updateAnswer, d, username, {
          context: data.context,
          answer: map(data.answer, function(prim) {
            return prim;
          })
        });
      }
    };
  }
  function make(problems) {
    var match = getExn$2(flatMap(asHtmlDocument(document), function(doc) {
      return map(nullable_to_opt(doc.body), function(body2) {
        return [
          doc.head,
          body2
        ];
      });
    }));
    var body = match[1];
    match[0].appendChild(getExn$2(toNode(DOMRe.createDOMElementVariadic("style", void 0, [styleCss]))));
    var header = getExn$2(flatMap(nullable_to_opt(body.querySelector(".header-title")), ofElement));
    header.classList.add(style.clickable);
    header.addEventListener("click", function(param) {
      return showSettings();
    });
    var subjectItems = map$1(Array.prototype.slice.call(body.querySelectorAll(".exam-main--body .subject-item")), function(node) {
      return getExn$2(ofNode(node));
    });
    if (subjectItems.length !== problems.length) {
      raiseError("wrong number of subject items");
    }
    var detials = reduce$2(zip(problems, subjectItems), void 0, function(details, param) {
      var subjectItem = param[1];
      var prob = param[0];
      var ty = getExn$2(probelmTypeFromJs(prob.ProblemType));
      var detail;
      var exit = 0;
      if (ty >= 3) {
        switch (ty) {
          case 3:
            detail = unsafeConvertUpdateDetail({
              updateUI: Blank.updateUI,
              updateAnswer: Blank.updateAnswer
            }, Blank.make(prob.ProblemID, subjectItem, void 0));
            break;
          case 4:
            detail = unsafeConvertUpdateDetail({
              updateUI: ShortAnswer.updateUI,
              updateAnswer: ShortAnswer.updateAnswer
            }, ShortAnswer.make(prob.ProblemID, subjectItem, void 0));
            break;
          case 5:
            exit = 1;
            break;
        }
      } else {
        exit = 1;
      }
      if (exit === 1) {
        var choiceMap = fromArray(mapWithIndex(getExn$2(prob.Options), function(i, o) {
          return [
            o.key,
            String.fromCharCode(65 + i | 0)
          ];
        }));
        detail = unsafeConvertUpdateDetail({
          updateUI: Choice.updateUI,
          updateAnswer: Choice.updateAnswer
        }, Choice.make(prob.ProblemID, subjectItem, function(s) {
          return getExn(choiceMap, s);
        }));
      }
      return set(details, prob.ProblemID, detail);
    });
    return {
      details: detials
    };
  }
  function updateAnswer($$this, problemId, username, data) {
    return forEach$2(get($$this.details, problemId), function(d) {
      return _2(d.updateAnswer, username, data);
    });
  }
  function updateUI($$this) {
    return forEach($$this.details, function(param, d) {
      return _1(d.updateUI, void 0);
    });
  }
  var UI$1 = {
    unsafeConvertUpdateDetail,
    make,
    updateAnswer,
    updateUI
  };
  class UI {
    constructor(problems) {
      __publicField(this, "inner");
      this.inner = UI$1.make(problems);
    }
    updateAnswer({ username, problem_id, result, context }) {
      UI$1.updateAnswer(this.inner, problem_id, username, {
        answer: result,
        context
      });
    }
    updateUI() {
      UI$1.updateUI(this.inner);
    }
  }
  function showConfirmUpload(dataURL, cb) {
    showConfirmUpload$1(dataURL, cb);
  }
  function sortProblems(problems) {
    problems.forEach((problem) => {
      switch (problem.ProblemType) {
        case ProblemType.SingleChoice:
        case ProblemType.MultipleChoice:
        case ProblemType.Polling: {
          const options = problem.Options;
          options.sort((a, b) => {
            return a.key < b.key ? -1 : 1;
          });
          break;
        }
      }
    });
    problems.sort((a, b) => a.ProblemID - b.ProblemID);
    return problems;
  }
  function sortPaper(paper) {
    if (SORT_PROBLEMS.value === true) {
      if (paper.data.has_problem_dict === true) {
        paper.data.problems = paper.data.problems.sort((a, b) => a.id - b.id).map((d) => {
          d.problems = sortProblems(d.problems);
          return d;
        });
      } else {
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
  async function main() {
    migrate();
    if (NO_LEAVE_CHECK.value === true) {
      removeVisibilityListener();
    }
    hookXHR(function(url) {
      switch (url.pathname) {
        case "/exam_room/show_paper":
          this.addEventListener("readystatechange", () => {
            if (this.readyState == XMLHttpRequest.DONE) {
              const text = JSON.stringify(sortPaper(JSON.parse(this.responseText)));
              Object.defineProperties(this, {
                responseText: {
                  get() {
                    return text;
                  }
                }
              });
            }
          });
          this.addEventListener("load", () => {
            const paper = JSON.parse(this.responseText);
            devLog("intercept paper", paper);
            let problems = [];
            if (paper.data.has_problem_dict === true) {
              paper.data.problems.forEach((dict) => {
                problems = problems.concat(dict.problems);
              });
            } else {
              problems = paper.data.problems;
            }
            const ui = new UI(problems);
            CLIENT.onmessage((msg) => {
              msg.forEach((res) => ui.updateAnswer(res));
              ui.updateUI();
            });
            const examId = parseInt(url.searchParams.get("exam_id"));
            CLIENT.login(examId, { title: paper.data.title, problems });
            fetch(newURL("/exam_room/cache_results", {
              exam_id: examId.toString()
            }).toString()).then((res) => res.json()).then((cacheResults) => cacheResults.data.results.forEach(({ problem_id, result }) => CLIENT.updateAnswer(problem_id, result))).catch(devLog);
          });
          return;
        case "/exam_room/answer_problem":
          return async (body) => {
            var _a;
            if (typeof body === "string") {
              const data = JSON.parse(body);
              if ("action" in data) {
                switch (data.action) {
                  case 1:
                  case 17:
                    break;
                  default:
                    console.log("intercept action", data);
                    return new Promise(() => void 0);
                }
              } else if ("results" in data) {
                devLog("intercept answers", data);
                (_a = data.results) == null ? void 0 : _a.forEach(({ problem_id, result }) => CLIENT.updateAnswer(problem_id, result));
              }
            }
            return body;
          };
        default:
          if (url.hostname === "upload-z1.qiniup.com") {
            return async (body) => {
              if (body instanceof FormData && body.get("file") instanceof File) {
                return new Promise((ok) => {
                  const f = new FileReader();
                  f.onload = () => showConfirmUpload(f.result, () => ok(body));
                  f.readAsDataURL(body.get("file"));
                });
              }
              return body;
            };
          }
          return;
      }
    });
    await CLIENT.watch(0);
  }
  {
    console.warn("IN DEV_MODE");
  }
  main().catch(console.error);
});
