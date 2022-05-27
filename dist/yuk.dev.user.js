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
    var isJSONRPCID = function(id) {
      return typeof id === "string" || typeof id === "number" || id === null;
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
    var createJSONRPCErrorResponse = function(id, code, message, data) {
      var error = { code, message };
      if (data) {
        error.data = data;
      }
      return {
        jsonrpc: exports.JSONRPC,
        id,
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
        } catch (e2) {
          reject(e2);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e2) {
          reject(e2);
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
      if (t2[0] & 1)
        throw t2[1];
      return t2[1];
    }, trys: [], ops: [] }, f2, y2, t2, g2;
    return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
      return this;
    }), g2;
    function verb(n2) {
      return function(v2) {
        return step([n2, v2]);
      };
    }
    function step(op) {
      if (f2)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f2 = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done)
            return t2;
          if (y2 = 0, t2)
            op = [op[0] & 2, t2.value];
          switch (op[0]) {
            case 0:
            case 1:
              t2 = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y2 = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t2 = _.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t2[1]) {
                _.label = t2[1];
                t2 = op;
                break;
              }
              if (t2 && _.label < t2[2]) {
                _.label = t2[2];
                _.ops.push(op);
                break;
              }
              if (t2[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e2) {
          op = [6, e2];
          y2 = 0;
        } finally {
          f2 = t2 = 0;
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
        overrideCreateJSONRPCErrorResponse = function(id) {
          return (0, models_1$2.createJSONRPCErrorResponse)(id, internal_1$1.DefaultErrorCode, "Request timeout");
        };
      }
      var timeoutRequest = function(ids, request) {
        var timeoutID = setTimeout(function() {
          ids.forEach(function(id) {
            var resolve = _this.idToResolveMap.get(id);
            if (resolve) {
              _this.idToResolveMap.delete(id);
              resolve(overrideCreateJSONRPCErrorResponse(id));
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
          var id = _this._createID();
          return timeoutRequest([id], function() {
            return _this.requestWithID(method, params, clientParams, id);
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
    JSONRPCClient2.prototype.requestWithID = function(method, params, clientParams, id) {
      return __awaiter$2(this, void 0, void 0, function() {
        var request, response;
        return __generator$2(this, function(_a) {
          switch (_a.label) {
            case 0:
              request = {
                jsonrpc: models_1$2.JSONRPC,
                method,
                params,
                id
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
      this.idToResolveMap.forEach(function(resolve, id) {
        return resolve((0, models_1$2.createJSONRPCErrorResponse)(id, internal_1$1.DefaultErrorCode, message));
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
    __assign = Object.assign || function(t2) {
      for (var s2, i2 = 1, n2 = arguments.length; i2 < n2; i2++) {
        s2 = arguments[i2];
        for (var p2 in s2)
          if (Object.prototype.hasOwnProperty.call(s2, p2))
            t2[p2] = s2[p2];
      }
      return t2;
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
        } catch (e2) {
          reject(e2);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e2) {
          reject(e2);
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
      if (t2[0] & 1)
        throw t2[1];
      return t2[1];
    }, trys: [], ops: [] }, f2, y2, t2, g2;
    return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
      return this;
    }), g2;
    function verb(n2) {
      return function(v2) {
        return step([n2, v2]);
      };
    }
    function step(op) {
      if (f2)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f2 = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done)
            return t2;
          if (y2 = 0, t2)
            op = [op[0] & 2, t2.value];
          switch (op[0]) {
            case 0:
            case 1:
              t2 = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y2 = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t2 = _.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t2[1]) {
                _.label = t2[1];
                t2 = op;
                break;
              }
              if (t2 && _.label < t2[2]) {
                _.label = t2[2];
                _.ops.push(op);
                break;
              }
              if (t2[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e2) {
          op = [6, e2];
          y2 = 0;
        } finally {
          f2 = t2 = 0;
        }
      if (op[0] & 5)
        throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
  var __spreadArray = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from, pack) {
    if (pack || arguments.length === 2)
      for (var i2 = 0, l2 = from.length, ar; i2 < l2; i2++) {
        if (ar || !(i2 in from)) {
          if (!ar)
            ar = Array.prototype.slice.call(from, 0, i2);
          ar[i2] = from[i2];
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
  var createMethodNotFoundResponse = function(id) {
    return (0, models_1$1.createJSONRPCErrorResponse)(id, models_1$1.JSONRPCErrorCode.MethodNotFound, "Method not found");
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
    JSONRPCServer2.prototype.addMethod = function(name, method) {
      this.addMethodAdvanced(name, this.toJSONRPCMethod(method));
    };
    JSONRPCServer2.prototype.toJSONRPCMethod = function(method) {
      return function(request, serverParams) {
        var response = method(request.params, serverParams);
        return Promise.resolve(response).then(function(result) {
          return mapResultToJSONRPCResponse(request.id, result);
        });
      };
    };
    JSONRPCServer2.prototype.addMethodAdvanced = function(name, method) {
      var _a;
      this.nameToMethodDictionary = __assign(__assign({}, this.nameToMethodDictionary), (_a = {}, _a[name] = method, _a));
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
    JSONRPCServer2.prototype.mapErrorToJSONRPCErrorResponseIfNecessary = function(id, error) {
      if (id !== void 0) {
        return this.mapErrorToJSONRPCErrorResponse(id, error);
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
  var mapResultToJSONRPCResponse = function(id, result) {
    if (id !== void 0) {
      return {
        jsonrpc: models_1$1.JSONRPC,
        id,
        result: result === void 0 ? null : result
      };
    } else {
      return null;
    }
  };
  var defaultMapErrorToJSONRPCErrorResponse = function(id, error) {
    return (0, models_1$1.createJSONRPCErrorResponse)(id, internal_1.DefaultErrorCode, error && error.message || "An unexpected error occurred");
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
        } catch (e2) {
          reject(e2);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e2) {
          reject(e2);
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
      if (t2[0] & 1)
        throw t2[1];
      return t2[1];
    }, trys: [], ops: [] }, f2, y2, t2, g2;
    return g2 = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g2[Symbol.iterator] = function() {
      return this;
    }), g2;
    function verb(n2) {
      return function(v2) {
        return step([n2, v2]);
      };
    }
    function step(op) {
      if (f2)
        throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (f2 = 1, y2 && (t2 = op[0] & 2 ? y2["return"] : op[0] ? y2["throw"] || ((t2 = y2["return"]) && t2.call(y2), 0) : y2.next) && !(t2 = t2.call(y2, op[1])).done)
            return t2;
          if (y2 = 0, t2)
            op = [op[0] & 2, t2.value];
          switch (op[0]) {
            case 0:
            case 1:
              t2 = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y2 = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (!(t2 = _.trys, t2 = t2.length > 0 && t2[t2.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t2 || op[1] > t2[0] && op[1] < t2[3])) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t2[1]) {
                _.label = t2[1];
                t2 = op;
                break;
              }
              if (t2 && _.label < t2[2]) {
                _.label = t2[2];
                _.ops.push(op);
                break;
              }
              if (t2[2])
                _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e2) {
          op = [6, e2];
          y2 = 0;
        } finally {
          f2 = t2 = 0;
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
    JSONRPCServerAndClient2.prototype.addMethod = function(name, method) {
      this.server.addMethod(name, method);
    };
    JSONRPCServerAndClient2.prototype.addMethodAdvanced = function(name, method) {
      this.server.addMethodAdvanced(name, method);
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
    var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o2, m2, k, k2) {
      if (k2 === void 0)
        k2 = k;
      Object.defineProperty(o2, k2, { enumerable: true, get: function() {
        return m2[k];
      } });
    } : function(o2, m2, k, k2) {
      if (k2 === void 0)
        k2 = k;
      o2[k2] = m2[k];
    });
    var __exportStar = commonjsGlobal && commonjsGlobal.__exportStar || function(m2, exports2) {
      for (var p2 in m2)
        if (p2 !== "default" && !Object.prototype.hasOwnProperty.call(exports2, p2))
          __createBinding(exports2, m2, p2);
    };
    Object.defineProperty(exports, "__esModule", { value: true });
    __exportStar(client, exports);
    __exportStar(models, exports);
    __exportStar(server, exports);
    __exportStar(serverAndClient, exports);
  })(dist);
  const sharedConfig = {};
  const $DEVCOMP = Symbol("solid-dev-component");
  let runEffects = runQueue;
  const NOTPENDING = {};
  const STALE = 1;
  const PENDING = 2;
  const UNOWNED = {
    owned: null,
    cleanups: null,
    context: null,
    owner: null
  };
  var Owner = null;
  let Transition = null;
  let Listener = null;
  let Pending = null;
  let Updates = null;
  let Effects = null;
  let ExecCount = 0;
  let rootCount = 0;
  function createRoot(fn, detachedOwner) {
    const listener = Listener, owner = Owner, root = fn.length === 0 && false ? UNOWNED : {
      owned: null,
      cleanups: null,
      context: null,
      owner: detachedOwner || owner
    };
    if (owner)
      root.name = `${owner.name}-r${rootCount++}`;
    Owner = root;
    Listener = null;
    try {
      return runUpdates(() => fn(() => cleanNode(root)), true);
    } finally {
      Listener = listener;
      Owner = owner;
    }
  }
  function createRenderEffect(fn, value, options) {
    const c2 = createComputation(fn, value, false, STALE, options);
    updateComputation(c2);
  }
  function batch(fn) {
    if (Pending)
      return fn();
    let result;
    const q = Pending = [];
    try {
      result = fn();
    } finally {
      Pending = null;
    }
    runUpdates(() => {
      for (let i2 = 0; i2 < q.length; i2 += 1) {
        const data = q[i2];
        if (data.pending !== NOTPENDING) {
          const pending = data.pending;
          data.pending = NOTPENDING;
          writeSignal(data, pending);
        }
      }
    }, false);
    return result;
  }
  function untrack(fn) {
    let result, listener = Listener;
    Listener = null;
    result = fn();
    Listener = listener;
    return result;
  }
  function devComponent(Comp, props) {
    const c2 = createComputation(() => untrack(() => {
      Object.assign(Comp, {
        [$DEVCOMP]: true
      });
      return Comp(props);
    }), void 0, true);
    c2.pending = NOTPENDING;
    c2.observers = null;
    c2.observerSlots = null;
    c2.state = 0;
    c2.componentName = Comp.name;
    updateComputation(c2);
    return c2.tValue !== void 0 ? c2.tValue : c2.value;
  }
  function writeSignal(node, value, isComp) {
    if (Pending) {
      if (node.pending === NOTPENDING)
        Pending.push(node);
      node.pending = value;
      return value;
    }
    if (node.comparator) {
      if (node.comparator(node.value, value))
        return value;
    }
    let TransitionRunning = false;
    node.value = value;
    if (node.observers && node.observers.length) {
      runUpdates(() => {
        for (let i2 = 0; i2 < node.observers.length; i2 += 1) {
          const o2 = node.observers[i2];
          if (TransitionRunning && Transition.disposed.has(o2))
            ;
          if (TransitionRunning && !o2.tState || !TransitionRunning && !o2.state) {
            if (o2.pure)
              Updates.push(o2);
            else
              Effects.push(o2);
            if (o2.observers)
              markDownstream(o2);
          }
          if (TransitionRunning)
            ;
          else
            o2.state = STALE;
        }
        if (Updates.length > 1e6) {
          Updates = [];
          if ("_SOLID_DEV_")
            throw new Error("Potential Infinite Loop Detected.");
          throw new Error();
        }
      }, false);
    }
    return value;
  }
  function updateComputation(node) {
    if (!node.fn)
      return;
    cleanNode(node);
    const owner = Owner, listener = Listener, time = ExecCount;
    Listener = Owner = node;
    runComputation(node, node.value, time);
    Listener = listener;
    Owner = owner;
  }
  function runComputation(node, value, time) {
    let nextValue;
    try {
      nextValue = node.fn(value);
    } catch (err) {
      handleError(err);
    }
    if (!node.updatedAt || node.updatedAt <= time) {
      if (node.observers && node.observers.length) {
        writeSignal(node, nextValue);
      } else
        node.value = nextValue;
      node.updatedAt = time;
    }
  }
  function createComputation(fn, init, pure, state = STALE, options) {
    const c2 = {
      fn,
      state,
      updatedAt: null,
      owned: null,
      sources: null,
      sourceSlots: null,
      cleanups: null,
      value: init,
      owner: Owner,
      context: null,
      pure
    };
    if (Owner === null)
      console.warn("computations created outside a `createRoot` or `render` will never be disposed");
    else if (Owner !== UNOWNED) {
      {
        if (!Owner.owned)
          Owner.owned = [c2];
        else
          Owner.owned.push(c2);
      }
      c2.name = options && options.name || `${Owner.name || "c"}-${(Owner.owned || Owner.tOwned).length}`;
    }
    return c2;
  }
  function runTop(node) {
    const runningTransition = Transition;
    if (node.state === 0 || runningTransition)
      return;
    if (node.state === PENDING || runningTransition)
      return lookUpstream(node);
    if (node.suspense && untrack(node.suspense.inFallback))
      return node.suspense.effects.push(node);
    const ancestors = [node];
    while ((node = node.owner) && (!node.updatedAt || node.updatedAt < ExecCount)) {
      if (node.state || runningTransition)
        ancestors.push(node);
    }
    for (let i2 = ancestors.length - 1; i2 >= 0; i2--) {
      node = ancestors[i2];
      if (node.state === STALE || runningTransition) {
        updateComputation(node);
      } else if (node.state === PENDING || runningTransition) {
        const updates = Updates;
        Updates = null;
        lookUpstream(node, ancestors[0]);
        Updates = updates;
      }
    }
  }
  function runUpdates(fn, init) {
    if (Updates)
      return fn();
    let wait = false;
    if (!init)
      Updates = [];
    if (Effects)
      wait = true;
    else
      Effects = [];
    ExecCount++;
    try {
      const res = fn();
      completeUpdates(wait);
      return res;
    } catch (err) {
      handleError(err);
    } finally {
      Updates = null;
      if (!wait)
        Effects = null;
    }
  }
  function completeUpdates(wait) {
    if (Updates) {
      runQueue(Updates);
      Updates = null;
    }
    if (wait)
      return;
    if (Effects.length)
      batch(() => {
        runEffects(Effects);
        Effects = null;
      });
    else {
      Effects = null;
      globalThis._$afterUpdate && globalThis._$afterUpdate();
    }
  }
  function runQueue(queue) {
    for (let i2 = 0; i2 < queue.length; i2++)
      runTop(queue[i2]);
  }
  function lookUpstream(node, ignore) {
    const runningTransition = Transition;
    node.state = 0;
    for (let i2 = 0; i2 < node.sources.length; i2 += 1) {
      const source = node.sources[i2];
      if (source.sources) {
        if (source.state === STALE || runningTransition) {
          if (source !== ignore)
            runTop(source);
        } else if (source.state === PENDING || runningTransition)
          lookUpstream(source, ignore);
      }
    }
  }
  function markDownstream(node) {
    const runningTransition = Transition;
    for (let i2 = 0; i2 < node.observers.length; i2 += 1) {
      const o2 = node.observers[i2];
      if (!o2.state || runningTransition) {
        o2.state = PENDING;
        if (o2.pure)
          Updates.push(o2);
        else
          Effects.push(o2);
        o2.observers && markDownstream(o2);
      }
    }
  }
  function cleanNode(node) {
    let i2;
    if (node.sources) {
      while (node.sources.length) {
        const source = node.sources.pop(), index = node.sourceSlots.pop(), obs = source.observers;
        if (obs && obs.length) {
          const n2 = obs.pop(), s2 = source.observerSlots.pop();
          if (index < obs.length) {
            n2.sourceSlots[s2] = index;
            obs[index] = n2;
            source.observerSlots[index] = s2;
          }
        }
      }
    }
    if (node.owned) {
      for (i2 = 0; i2 < node.owned.length; i2++)
        cleanNode(node.owned[i2]);
      node.owned = null;
    }
    if (node.cleanups) {
      for (i2 = 0; i2 < node.cleanups.length; i2++)
        node.cleanups[i2]();
      node.cleanups = null;
    }
    node.state = 0;
    node.context = null;
  }
  function handleError(err) {
    throw err;
  }
  function createComponent(Comp, props) {
    return devComponent(Comp, props || {});
  }
  if (globalThis) {
    if (!globalThis.Solid$$)
      globalThis.Solid$$ = true;
    else
      console.warn("You appear to have multiple instances of Solid. This can lead to unexpected behavior.");
  }
  const booleans = ["allowfullscreen", "async", "autofocus", "autoplay", "checked", "controls", "default", "disabled", "formnovalidate", "hidden", "indeterminate", "ismap", "loop", "multiple", "muted", "nomodule", "novalidate", "open", "playsinline", "readonly", "required", "reversed", "seamless", "selected"];
  const Properties = /* @__PURE__ */ new Set(["className", "value", "readOnly", "formNoValidate", "isMap", "noModule", "playsInline", ...booleans]);
  const ChildProperties = /* @__PURE__ */ new Set(["innerHTML", "textContent", "innerText", "children"]);
  const Aliases = {
    className: "class",
    htmlFor: "for"
  };
  const PropAliases = {
    class: "className",
    formnovalidate: "formNoValidate",
    ismap: "isMap",
    nomodule: "noModule",
    playsinline: "playsInline",
    readonly: "readOnly"
  };
  const DelegatedEvents = /* @__PURE__ */ new Set(["beforeinput", "click", "dblclick", "contextmenu", "focusin", "focusout", "input", "keydown", "keyup", "mousedown", "mousemove", "mouseout", "mouseover", "mouseup", "pointerdown", "pointermove", "pointerout", "pointerover", "pointerup", "touchend", "touchmove", "touchstart"]);
  const SVGNamespace = {
    xlink: "http://www.w3.org/1999/xlink",
    xml: "http://www.w3.org/XML/1998/namespace"
  };
  function reconcileArrays(parentNode, a2, b2) {
    let bLength = b2.length, aEnd = a2.length, bEnd = bLength, aStart = 0, bStart = 0, after = a2[aEnd - 1].nextSibling, map2 = null;
    while (aStart < aEnd || bStart < bEnd) {
      if (a2[aStart] === b2[bStart]) {
        aStart++;
        bStart++;
        continue;
      }
      while (a2[aEnd - 1] === b2[bEnd - 1]) {
        aEnd--;
        bEnd--;
      }
      if (aEnd === aStart) {
        const node = bEnd < bLength ? bStart ? b2[bStart - 1].nextSibling : b2[bEnd - bStart] : after;
        while (bStart < bEnd)
          parentNode.insertBefore(b2[bStart++], node);
      } else if (bEnd === bStart) {
        while (aStart < aEnd) {
          if (!map2 || !map2.has(a2[aStart]))
            a2[aStart].remove();
          aStart++;
        }
      } else if (a2[aStart] === b2[bEnd - 1] && b2[bStart] === a2[aEnd - 1]) {
        const node = a2[--aEnd].nextSibling;
        parentNode.insertBefore(b2[bStart++], a2[aStart++].nextSibling);
        parentNode.insertBefore(b2[--bEnd], node);
        a2[aEnd] = b2[bEnd];
      } else {
        if (!map2) {
          map2 = /* @__PURE__ */ new Map();
          let i2 = bStart;
          while (i2 < bEnd)
            map2.set(b2[i2], i2++);
        }
        const index = map2.get(a2[aStart]);
        if (index != null) {
          if (bStart < index && index < bEnd) {
            let i2 = aStart, sequence = 1, t2;
            while (++i2 < aEnd && i2 < bEnd) {
              if ((t2 = map2.get(a2[i2])) == null || t2 !== index + sequence)
                break;
              sequence++;
            }
            if (sequence > index - bStart) {
              const node = a2[aStart];
              while (bStart < index)
                parentNode.insertBefore(b2[bStart++], node);
            } else
              parentNode.replaceChild(b2[bStart++], a2[aStart++]);
          } else
            aStart++;
        } else
          a2[aStart++].remove();
      }
    }
  }
  const $$EVENTS = "_$DX_DELEGATE";
  function render(code, element, init) {
    let disposer;
    createRoot((dispose) => {
      disposer = dispose;
      element === document ? code() : insert(element, code(), element.firstChild ? null : void 0, init);
    });
    return () => {
      disposer();
      element.textContent = "";
    };
  }
  function template(html, check, isSVG) {
    const t2 = document.createElement("template");
    t2.innerHTML = html;
    if (check && t2.innerHTML.split("<").length - 1 !== check)
      throw `The browser resolved template HTML does not match JSX input:
${t2.innerHTML}

${html}. Is your HTML properly formed?`;
    let node = t2.content.firstChild;
    if (isSVG)
      node = node.firstChild;
    return node;
  }
  function delegateEvents(eventNames, document2 = window.document) {
    const e2 = document2[$$EVENTS] || (document2[$$EVENTS] = /* @__PURE__ */ new Set());
    for (let i2 = 0, l2 = eventNames.length; i2 < l2; i2++) {
      const name = eventNames[i2];
      if (!e2.has(name)) {
        e2.add(name);
        document2.addEventListener(name, eventHandler);
      }
    }
  }
  function setAttribute(node, name, value) {
    if (value == null)
      node.removeAttribute(name);
    else
      node.setAttribute(name, value);
  }
  function setAttributeNS(node, namespace, name, value) {
    if (value == null)
      node.removeAttributeNS(namespace, name);
    else
      node.setAttributeNS(namespace, name, value);
  }
  function className(node, value) {
    if (value == null)
      node.removeAttribute("class");
    else
      node.className = value;
  }
  function addEventListener(node, name, handler, delegate) {
    if (delegate) {
      if (Array.isArray(handler)) {
        node[`$$${name}`] = handler[0];
        node[`$$${name}Data`] = handler[1];
      } else
        node[`$$${name}`] = handler;
    } else if (Array.isArray(handler)) {
      node.addEventListener(name, (e2) => handler[0](handler[1], e2));
    } else
      node.addEventListener(name, handler);
  }
  function classList(node, value, prev = {}) {
    const classKeys = Object.keys(value || {}), prevKeys = Object.keys(prev);
    let i2, len;
    for (i2 = 0, len = prevKeys.length; i2 < len; i2++) {
      const key = prevKeys[i2];
      if (!key || key === "undefined" || value[key])
        continue;
      toggleClassKey(node, key, false);
      delete prev[key];
    }
    for (i2 = 0, len = classKeys.length; i2 < len; i2++) {
      const key = classKeys[i2], classValue = !!value[key];
      if (!key || key === "undefined" || prev[key] === classValue || !classValue)
        continue;
      toggleClassKey(node, key, true);
      prev[key] = classValue;
    }
    return prev;
  }
  function style$1(node, value, prev = {}) {
    const nodeStyle = node.style;
    const prevString = typeof prev === "string";
    if (value == null && prevString || typeof value === "string")
      return nodeStyle.cssText = value;
    prevString && (nodeStyle.cssText = void 0, prev = {});
    value || (value = {});
    let v2, s2;
    for (s2 in prev) {
      value[s2] == null && nodeStyle.removeProperty(s2);
      delete prev[s2];
    }
    for (s2 in value) {
      v2 = value[s2];
      if (v2 !== prev[s2]) {
        nodeStyle.setProperty(s2, v2);
        prev[s2] = v2;
      }
    }
    return prev;
  }
  function spread(node, accessor, isSVG, skipChildren) {
    if (typeof accessor === "function") {
      createRenderEffect((current) => spreadExpression(node, accessor(), current, isSVG, skipChildren));
    } else
      spreadExpression(node, accessor, void 0, isSVG, skipChildren);
  }
  function insert(parent, accessor, marker, initial) {
    if (marker !== void 0 && !initial)
      initial = [];
    if (typeof accessor !== "function")
      return insertExpression(parent, accessor, initial, marker);
    createRenderEffect((current) => insertExpression(parent, accessor(), current, marker), initial);
  }
  function assign(node, props, isSVG, skipChildren, prevProps = {}, skipRef = false) {
    props || (props = {});
    for (const prop in prevProps) {
      if (!(prop in props)) {
        if (prop === "children")
          continue;
        assignProp(node, prop, null, prevProps[prop], isSVG, skipRef);
      }
    }
    for (const prop in props) {
      if (prop === "children") {
        if (!skipChildren)
          insertExpression(node, props.children);
        continue;
      }
      const value = props[prop];
      prevProps[prop] = assignProp(node, prop, value, prevProps[prop], isSVG, skipRef);
    }
  }
  function toPropertyName(name) {
    return name.toLowerCase().replace(/-([a-z])/g, (_, w2) => w2.toUpperCase());
  }
  function toggleClassKey(node, key, value) {
    const classNames = key.trim().split(/\s+/);
    for (let i2 = 0, nameLen = classNames.length; i2 < nameLen; i2++)
      node.classList.toggle(classNames[i2], value);
  }
  function assignProp(node, prop, value, prev, isSVG, skipRef) {
    let isCE, isProp, isChildProp;
    if (prop === "style")
      return style$1(node, value, prev);
    if (prop === "classList")
      return classList(node, value, prev);
    if (value === prev)
      return prev;
    if (prop === "ref") {
      if (!skipRef) {
        value(node);
      }
    } else if (prop.slice(0, 3) === "on:") {
      node.addEventListener(prop.slice(3), value);
    } else if (prop.slice(0, 10) === "oncapture:") {
      node.addEventListener(prop.slice(10), value, true);
    } else if (prop.slice(0, 2) === "on") {
      const name = prop.slice(2).toLowerCase();
      const delegate = DelegatedEvents.has(name);
      addEventListener(node, name, value, delegate);
      delegate && delegateEvents([name]);
    } else if ((isChildProp = ChildProperties.has(prop)) || !isSVG && (PropAliases[prop] || (isProp = Properties.has(prop))) || (isCE = node.nodeName.includes("-"))) {
      if (prop === "class" || prop === "className")
        className(node, value);
      else if (isCE && !isProp && !isChildProp)
        node[toPropertyName(prop)] = value;
      else
        node[PropAliases[prop] || prop] = value;
    } else {
      const ns = isSVG && prop.indexOf(":") > -1 && SVGNamespace[prop.split(":")[0]];
      if (ns)
        setAttributeNS(node, ns, prop, value);
      else
        setAttribute(node, Aliases[prop] || prop, value);
    }
    return value;
  }
  function eventHandler(e2) {
    const key = `$$${e2.type}`;
    let node = e2.composedPath && e2.composedPath()[0] || e2.target;
    if (e2.target !== node) {
      Object.defineProperty(e2, "target", {
        configurable: true,
        value: node
      });
    }
    Object.defineProperty(e2, "currentTarget", {
      configurable: true,
      get() {
        return node || document;
      }
    });
    if (sharedConfig.registry && !sharedConfig.done) {
      sharedConfig.done = true;
      document.querySelectorAll("[id^=pl-]").forEach((elem) => elem.remove());
    }
    while (node !== null) {
      const handler = node[key];
      if (handler && !node.disabled) {
        const data = node[`${key}Data`];
        data !== void 0 ? handler(data, e2) : handler(e2);
        if (e2.cancelBubble)
          return;
      }
      node = node.host && node.host !== node && node.host instanceof Node ? node.host : node.parentNode;
    }
  }
  function spreadExpression(node, props, prevProps = {}, isSVG, skipChildren) {
    props || (props = {});
    if (!skipChildren && "children" in props) {
      createRenderEffect(() => prevProps.children = insertExpression(node, props.children, prevProps.children));
    }
    props.ref && props.ref(node);
    createRenderEffect(() => assign(node, props, isSVG, true, prevProps, true));
    return prevProps;
  }
  function insertExpression(parent, value, current, marker, unwrapArray) {
    if (sharedConfig.context && !current)
      current = [...parent.childNodes];
    while (typeof current === "function")
      current = current();
    if (value === current)
      return current;
    const t2 = typeof value, multi = marker !== void 0;
    parent = multi && current[0] && current[0].parentNode || parent;
    if (t2 === "string" || t2 === "number") {
      if (sharedConfig.context)
        return current;
      if (t2 === "number")
        value = value.toString();
      if (multi) {
        let node = current[0];
        if (node && node.nodeType === 3) {
          node.data = value;
        } else
          node = document.createTextNode(value);
        current = cleanChildren(parent, current, marker, node);
      } else {
        if (current !== "" && typeof current === "string") {
          current = parent.firstChild.data = value;
        } else
          current = parent.textContent = value;
      }
    } else if (value == null || t2 === "boolean") {
      if (sharedConfig.context)
        return current;
      current = cleanChildren(parent, current, marker);
    } else if (t2 === "function") {
      createRenderEffect(() => {
        let v2 = value();
        while (typeof v2 === "function")
          v2 = v2();
        current = insertExpression(parent, v2, current, marker);
      });
      return () => current;
    } else if (Array.isArray(value)) {
      const array = [];
      if (normalizeIncomingArray(array, value, unwrapArray)) {
        createRenderEffect(() => current = insertExpression(parent, array, current, marker, true));
        return () => current;
      }
      if (sharedConfig.context) {
        for (let i2 = 0; i2 < array.length; i2++) {
          if (array[i2].parentNode)
            return current = array;
        }
      }
      if (array.length === 0) {
        current = cleanChildren(parent, current, marker);
        if (multi)
          return current;
      } else if (Array.isArray(current)) {
        if (current.length === 0) {
          appendNodes(parent, array, marker);
        } else
          reconcileArrays(parent, current, array);
      } else {
        current && cleanChildren(parent);
        appendNodes(parent, array);
      }
      current = array;
    } else if (value instanceof Node) {
      if (sharedConfig.context && value.parentNode)
        return current = multi ? [value] : value;
      if (Array.isArray(current)) {
        if (multi)
          return current = cleanChildren(parent, current, marker, value);
        cleanChildren(parent, current, null, value);
      } else if (current == null || current === "" || !parent.firstChild) {
        parent.appendChild(value);
      } else
        parent.replaceChild(value, parent.firstChild);
      current = value;
    } else
      console.warn(`Unrecognized value. Skipped inserting`, value);
    return current;
  }
  function normalizeIncomingArray(normalized, array, unwrap) {
    let dynamic = false;
    for (let i2 = 0, len = array.length; i2 < len; i2++) {
      let item = array[i2], t2;
      if (item instanceof Node) {
        normalized.push(item);
      } else if (item == null || item === true || item === false)
        ;
      else if (Array.isArray(item)) {
        dynamic = normalizeIncomingArray(normalized, item) || dynamic;
      } else if ((t2 = typeof item) === "string") {
        normalized.push(document.createTextNode(item));
      } else if (t2 === "function") {
        if (unwrap) {
          while (typeof item === "function")
            item = item();
          dynamic = normalizeIncomingArray(normalized, Array.isArray(item) ? item : [item]) || dynamic;
        } else {
          normalized.push(item);
          dynamic = true;
        }
      } else
        normalized.push(document.createTextNode(item.toString()));
    }
    return dynamic;
  }
  function appendNodes(parent, array, marker) {
    for (let i2 = 0, len = array.length; i2 < len; i2++)
      parent.insertBefore(array[i2], marker);
  }
  function cleanChildren(parent, current, marker, replacement) {
    if (marker === void 0)
      return parent.textContent = "";
    const node = replacement || document.createTextNode("");
    if (current.length) {
      let inserted = false;
      for (let i2 = current.length - 1; i2 >= 0; i2--) {
        const el = current[i2];
        if (node !== el) {
          const isParent = el.parentNode === parent;
          if (!inserted && !i2)
            isParent ? parent.replaceChild(node, el) : parent.insertBefore(node, marker);
          else
            isParent && el.remove();
        } else
          inserted = true;
      }
    } else
      parent.insertBefore(node, marker);
    return [node];
  }
  var styleCss = "._mainBody_8f6zw_1 {\n  opacity: 0.5;\n}\n._mainBody_8f6zw_1 * {\n  font-size: 0.75rem;\n  margin: 0;\n}\n._mainBody_8f6zw_1 button {\n  cursor: pointer;\n}\n._clickable_8f6zw_11 {\n  cursor: pointer;\n}\n._stateWorkingOn_8f6zw_14 {\n  color: blue;\n}\n._stateSure_8f6zw_17 {\n  color: green;\n}\n._stateNotSure_8f6zw_20 {\n  color: red;\n}\n._answerMsg_8f6zw_23 {\n  border-style: groove;\n  border-width: thin;\n  opacity: 0.75;\n  margin-bottom: 0.5rem;\n}\n._answerMsg_8f6zw_23 ul {\n  padding-left: 1rem;\n}\n._answerMsgName_8f6zw_32 {\n  font-weight: bold;\n}\n._answerMark_8f6zw_35 {\n  display: flex;\n  justify-content: end;\n  align-items: center;\n  border-style: groove;\n  border-width: thin;\n  margin-bottom: 0.5rem;\n  opacity: 0.75;\n}\n._answerMark_8f6zw_35 button {\n  padding: 0;\n  margin-left: 0.5rem;\n  white-space: nowrap;\n}\n._answerMark_8f6zw_35 input {\n  height: max-content;\n  width: 100%;\n}\n._answerDetail_8f6zw_53 ._stateWorkingOn_8f6zw_14,\n._answerDetail_8f6zw_53 ._stateSure_8f6zw_17,\n._answerDetail_8f6zw_53 ._stateNotSure_8f6zw_20 {\n  font-weight: bold;\n}\n._answerDetail_8f6zw_53 ul {\n  padding-left: 1.5rem;\n}\n._answerDetail_8f6zw_53 img {\n  height: auto;\n  width: 80%;\n}\n._answerDetailShortAnswer_8f6zw_65 {\n  border-style: groove;\n  border-width: thin;\n  margin: 0.2rem;\n  padding: 0.2rem;\n}\n._settings_8f6zw_71 {\n  border-style: groove;\n  border-width: thin;\n  display: flex;\n  flex-direction: column;\n  padding: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n._settingsEntry_8f6zw_79 {\n  display: flex;\n  flex-direction: row;\n  margin-bottom: 0.5rem;\n  justify-content: space-between;\n  align-items: center;\n}\n._settingsEntry_8f6zw_79 label {\n  font-weight: bold;\n}\n._settingsEntry_8f6zw_79 input {\n  height: max-content;\n  text-align: right;\n}\n._settingsSubmit_8f6zw_93 {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: end;\n}\n._settingsSubmitTip_8f6zw_99 {\n  margin-right: 0.5rem;\n}\n._about_8f6zw_102 p {\n  margin-bottom: 0.25rem;\n}\n._about_8f6zw_102 ul {\n  padding-left: 1.5rem;\n  margin-bottom: 0.25rem;\n}\n._about_8f6zw_102 ul li {\n  margin-bottom: 0.25rem;\n}\n._uploadImg_8f6zw_112 {\n  display: flex;\n  flex-direction: column;\n}\n._uploadImg_8f6zw_112 img {\n  width: 100%;\n  height: auto;\n}\n._uploadImgImage_8f6zw_120 {\n  border-style: groove;\n  border-width: thin;\n  padding: 0.5rem;\n}\n._uploadImgConfirm_8f6zw_125 {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n}\n";
  const _tmpl$$3 = /* @__PURE__ */ template(`<title> </title>`, 2), _tmpl$2$3 = /* @__PURE__ */ template(`<style></style>`, 2);
  function assertNonNull(value, msg) {
    assert(value !== void 0 && value !== null, msg != null ? msg : "null value");
  }
  function assertIs(ty, value, msg) {
    assert(value instanceof ty, msg != null ? msg : "not HTMLElement");
  }
  function assert(value, msg) {
    if (value !== true) {
      throw Error(msg != null ? msg : "assertion failed");
    }
  }
  function tuple(...t2) {
    return t2;
  }
  function openWin(opts) {
    const win = window.open("", "", Object.entries(opts).map(([k, v2]) => `${k}=${v2}`).join(","));
    assertNonNull(win);
    const close = () => win.close();
    window.addEventListener("unload", close);
    win.addEventListener("close", () => window.removeEventListener("unload", close));
    render(() => [(() => {
      const _el$ = _tmpl$$3.cloneNode(true), _el$2 = _el$.firstChild;
      createRenderEffect(() => _el$2.data = opts.title);
      return _el$;
    })(), (() => {
      const _el$3 = _tmpl$2$3.cloneNode(true);
      _el$3.textContent = styleCss;
      return _el$3;
    })()], win.document.head);
    return win;
  }
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
    for (const { name, idx } of db_migrations) {
      if (!(name === migrations[idx].name)) {
        throw new Error("bad migrations");
      }
    }
    for (const { name, up } of migrations.slice(db_migrations.length)) {
      devLog(`apply migration: ${name}`);
      up();
    }
    setValue("migrations", migrations.map((v2, i2) => ({ name: v2.name, idx: i2 })));
  }
  class GMEntry {
    constructor(name, init) {
      __publicField(this, "_name");
      __publicField(this, "_init");
      __publicField(this, "inited", false);
      __publicField(this, "_cached");
      this._name = name;
      this._init = init;
    }
    get() {
      if (!this.inited) {
        const val = getValue(this._name);
        if (val === void 0 && this._init !== void 0) {
          setValue(this._name, this._init);
        }
        this._cached = val != null ? val : this._init;
        this.inited = true;
      }
      return this._cached;
    }
    set(val) {
      if (val === void 0) {
        return;
      }
      setValue(this._name, val);
      this._cached = val;
    }
  }
  const USERNAME = new GMEntry("username");
  const SERVER = new GMEntry("server");
  const SYNC_ANSWERS = new GMEntry("sync_answers", true);
  const SORT_PROBLEMS = new GMEntry("sort_problems", false);
  const NO_LEAVE_CHECK = new GMEntry("no_leave_check", true);
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
    updateQueue(id, f2) {
      let val = this.queue.get(id);
      if (val !== void 0) {
        f2(val);
      } else {
        val = {};
        f2(val);
        this.queue.set(id, val);
      }
    }
    updateAnswer(id, result) {
      this.updateQueue(id, (v2) => v2.result = result);
    }
    updateState(id, state) {
      this.updateQueue(id, (v2) => {
        var _a;
        v2.context = (_a = v2.context) != null ? _a : {};
        v2.context.state = state;
      });
    }
    updateMsg(id, msg) {
      this.updateQueue(id, (v2) => {
        var _a;
        v2.context = (_a = v2.context) != null ? _a : {};
        v2.context.msg = msg;
      });
    }
    async watch(ms) {
      return new Promise((_, err) => {
        const timer = setInterval(() => {
          this.sendQueue().catch((e2) => {
            clearInterval(timer);
            alert("\u4E0E\u670D\u52A1\u5668\u901A\u4FE1\u5F02\u5E38");
            err(e2);
          });
        }, ms);
      });
    }
    async login(examId, paper) {
      this.examId = examId;
      this.paper = paper;
    }
    async sendQueue() {
      const syncAnswers = SYNC_ANSWERS.get();
      const server2 = SERVER.get();
      const username = USERNAME.get();
      if (syncAnswers !== true || this.queue.size < 1 || server2 === void 0 || username === void 0 || this.examId === void 0 || this.paper === void 0) {
        return;
      }
      let answers = [...this.queue.entries()];
      this.queue.clear();
      if (this.client === void 0) {
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
        devLog(`login to server: ${username}, ${this.examId}`);
        const token = await this.client.request("login", [
          username,
          this.examId,
          this.paper
        ]);
        devLog("got token", token);
        this.token = token;
      }
      devLog("send answers", answers);
      const rcev = await this.client.request("answer_problem", [
        this.token,
        answers.map(([id, { result: answer, context }]) => ({
          problem_id: id,
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
  var AnswerState = /* @__PURE__ */ ((AnswerState2) => {
    AnswerState2[AnswerState2["WorkingOn"] = 0] = "WorkingOn";
    AnswerState2[AnswerState2["Sure"] = 1] = "Sure";
    AnswerState2[AnswerState2["NotSure"] = 2] = "NotSure";
    return AnswerState2;
  })(AnswerState || {});
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
  var style = {
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
  const e = Symbol("@ts-pattern/matcher"), t = "@ts-pattern/anonymous-select-key", n = (e2) => Boolean(e2 && typeof e2 == "object"), r = (t2) => t2 && !!t2[e], o = (t2, c2, a2) => {
    if (n(t2)) {
      if (r(t2)) {
        const n2 = t2[e](), { matched: r2, selections: o2 } = n2.match(c2);
        return r2 && o2 && Object.keys(o2).forEach((e2) => a2(e2, o2[e2])), r2;
      }
      if (!n(c2))
        return false;
      if (Array.isArray(t2))
        return !!Array.isArray(c2) && t2.length === c2.length && t2.every((e2, t3) => o(e2, c2[t3], a2));
      if (t2 instanceof Map)
        return c2 instanceof Map && Array.from(t2.keys()).every((e2) => o(t2.get(e2), c2.get(e2), a2));
      if (t2 instanceof Set) {
        if (!(c2 instanceof Set))
          return false;
        if (t2.size === 0)
          return c2.size === 0;
        if (t2.size === 1) {
          const [e2] = Array.from(t2.values());
          return r(e2) ? Array.from(c2.values()).every((t3) => o(e2, t3, a2)) : c2.has(e2);
        }
        return Array.from(t2.values()).every((e2) => c2.has(e2));
      }
      return Object.keys(t2).every((n2) => {
        const s2 = t2[n2];
        return (n2 in c2 || r(i2 = s2) && i2[e]().matcherType === "optional") && o(s2, c2[n2], a2);
        var i2;
      });
    }
    return Object.is(c2, t2);
  }, c = (t2) => {
    var o2, s2, i2;
    return n(t2) ? r(t2) ? (o2 = (s2 = (i2 = t2[e]()).getSelectionKeys) == null ? void 0 : s2.call(i2)) != null ? o2 : [] : Array.isArray(t2) ? a(t2, c) : a(Object.values(t2), c) : [];
  }, a = (e2, t2) => e2.reduce((e3, n2) => e3.concat(t2(n2)), []);
  function s(t2) {
    return { [e]: () => ({ match: (e2) => {
      let n2 = {};
      const r2 = (e3, t3) => {
        n2[e3] = t3;
      };
      return e2 === void 0 ? (c(t2).forEach((e3) => r2(e3, void 0)), { matched: true, selections: n2 }) : { matched: o(t2, e2, r2), selections: n2 };
    }, getSelectionKeys: () => c(t2), matcherType: "optional" }) };
  }
  function i(t2) {
    return { [e]: () => ({ match: (e2) => {
      if (!Array.isArray(e2))
        return { matched: false };
      let n2 = {};
      const r2 = (e3, t3) => {
        n2[e3] = (n2[e3] || []).concat([t3]);
      };
      return { matched: e2.every((e3) => o(t2, e3, r2)), selections: n2 };
    }, getSelectionKeys: () => c(t2) }) };
  }
  function u(...t2) {
    return { [e]: () => ({ match: (e2) => {
      let n2 = {};
      const r2 = (e3, t3) => {
        n2[e3] = t3;
      };
      return { matched: t2.every((t3) => o(t3, e2, r2)), selections: n2 };
    }, getSelectionKeys: () => a(t2, c), matcherType: "and" }) };
  }
  function l(...t2) {
    return { [e]: () => ({ match: (e2) => {
      let n2 = {};
      const r2 = (e3, t3) => {
        n2[e3] = t3;
      };
      return a(t2, c).forEach((e3) => r2(e3, void 0)), { matched: t2.some((t3) => o(t3, e2, r2)), selections: n2 };
    }, getSelectionKeys: () => a(t2, c), matcherType: "or" }) };
  }
  function h(t2) {
    return { [e]: () => ({ match: (e2) => ({ matched: !o(t2, e2, () => {
    }) }), getSelectionKeys: () => [], matcherType: "not" }) };
  }
  function f(t2) {
    return { [e]: () => ({ match: (e2) => ({ matched: Boolean(t2(e2)) }) }) };
  }
  function y(...n2) {
    const r2 = typeof n2[0] == "string" ? n2[0] : void 0, a2 = n2.length === 2 ? n2[1] : typeof n2[0] == "string" ? void 0 : n2[0];
    return { [e]: () => ({ match: (e2) => {
      let n3 = { [r2 != null ? r2 : t]: e2 };
      return { matched: a2 === void 0 || o(a2, e2, (e3, t2) => {
        n3[e3] = t2;
      }), selections: n3 };
    }, getSelectionKeys: () => [r2 != null ? r2 : t].concat(a2 === void 0 ? [] : c(a2)) }) };
  }
  const m = f(function(e2) {
    return true;
  }), v = m, d = f(function(e2) {
    return typeof e2 == "string";
  }), g = f(function(e2) {
    return typeof e2 == "number";
  }), p = f(function(e2) {
    return typeof e2 == "boolean";
  }), b = f(function(e2) {
    return typeof e2 == "bigint";
  }), w = f(function(e2) {
    return typeof e2 == "symbol";
  }), A = f(function(e2) {
    return e2 == null;
  });
  var S = { __proto__: null, optional: s, array: i, intersection: u, union: l, not: h, when: f, select: y, any: m, _: v, string: d, number: g, boolean: p, bigint: b, symbol: w, nullish: A, instanceOf: function(e2) {
    return f(function(e3) {
      return (t2) => t2 instanceof e3;
    }(e2));
  }, typed: function() {
    return { array: i, optional: s, intersection: u, union: l, not: h, select: y, when: f };
  } };
  const K = (e2) => new O(e2, []);
  class O {
    constructor(e2, t2) {
      this.value = void 0, this.cases = void 0, this.value = e2, this.cases = t2;
    }
    with(...e2) {
      const n2 = e2[e2.length - 1], r2 = [e2[0]], c2 = [];
      return e2.length === 3 && typeof e2[1] == "function" ? (r2.push(e2[0]), c2.push(e2[1])) : e2.length > 2 && r2.push(...e2.slice(1, e2.length - 1)), new O(this.value, this.cases.concat([{ match: (e3) => {
        let n3 = {};
        const a2 = Boolean(r2.some((t2) => o(t2, e3, (e4, t3) => {
          n3[e4] = t3;
        })) && c2.every((t2) => t2(e3)));
        return { matched: a2, value: a2 && Object.keys(n3).length ? t in n3 ? n3[t] : n3 : e3 };
      }, handler: n2 }]));
    }
    when(e2, t2) {
      return new O(this.value, this.cases.concat([{ match: (t3) => ({ matched: Boolean(e2(t3)), value: t3 }), handler: t2 }]));
    }
    otherwise(e2) {
      return new O(this.value, this.cases.concat([{ match: (e3) => ({ matched: true, value: e3 }), handler: e2 }])).run();
    }
    exhaustive() {
      return this.run();
    }
    run() {
      let e2, t2 = this.value;
      for (const n2 of this.cases) {
        const r2 = n2.match(this.value);
        if (r2.matched) {
          t2 = r2.value, e2 = n2.handler;
          break;
        }
      }
      if (!e2) {
        let e3;
        try {
          e3 = JSON.stringify(this.value);
        } catch (t3) {
          e3 = this.value;
        }
        throw new Error(`Pattern matching error: no pattern matches value ${e3}`);
      }
      return e2(t2, this.value);
    }
  }
  class Pipe {
    constructor(t2) {
      __publicField(this, "t");
      this.t = t2;
    }
    then(f2) {
      return new Pipe(f2(this.t));
    }
  }
  function then(t2) {
    return new Pipe(t2);
  }
  function map(op) {
    return function* (it) {
      for (const a2 of it) {
        yield op(a2);
      }
    };
  }
  function* enumerate(it) {
    let i2 = 0;
    for (const a2 of it) {
      yield [i2++, a2];
    }
  }
  function filter(p2) {
    return function* (it) {
      for (const a2 of it) {
        if (p2(a2)) {
          yield a2;
        }
      }
    };
  }
  function filterMap(f2) {
    return function* (it) {
      for (const a2 of it) {
        const t2 = f2(a2);
        if (t2 !== void 0) {
          yield t2;
        }
      }
    };
  }
  function zip(b2) {
    return function* (a2) {
      const it1 = a2[Symbol.iterator]();
      const it2 = b2[Symbol.iterator]();
      while (true) {
        const t1 = it1.next();
        const t2 = it2.next();
        if (t1.done !== true && t2.done !== true) {
          yield [t1.value, t2.value];
        } else {
          return;
        }
      }
    };
  }
  function sort(by) {
    return function(it) {
      return Array.from(it).sort(by);
    };
  }
  function first(it) {
    for (const t2 of it) {
      return t2;
    }
    return;
  }
  function fold(init, f2) {
    return function(it) {
      let b2 = init;
      for (const a2 of it) {
        b2 = f2(b2, a2);
      }
      return b2;
    };
  }
  function collectArray(it) {
    return Array.from(it);
  }
  function forEach(f2) {
    return function(it) {
      for (const t2 of it) {
        f2(t2);
      }
    };
  }
  const _tmpl$$2 = /* @__PURE__ */ template(`<div><fieldset><legend>\u6807\u8BB0</legend><input type="text" placeholder="\u7559\u8A00"><button type="button">\u6211\u6B63\u5728\u505A</button><button type="button">\u6211\u5F88\u786E\u5B9A</button><button type="button">\u6211\u4E0D\u786E\u5B9A</button></fieldset><div><fieldset><legend> \u7559\u8A00 </legend><ul></ul></fieldset><div></div></div></div>`, 23), _tmpl$2$2 = /* @__PURE__ */ template(`<li><span></span></li>`, 4), _tmpl$3$1 = /* @__PURE__ */ template(`<div><p><strong></strong></p><ul></ul></div>`, 8), _tmpl$4$1 = /* @__PURE__ */ template(`<li></li>`, 2), _tmpl$5 = /* @__PURE__ */ template(`<li><pre></pre><ul></ul></li>`, 6), _tmpl$6 = /* @__PURE__ */ template(`<div></div>`, 2), _tmpl$7 = /* @__PURE__ */ template(`<ul></ul>`, 2), _tmpl$8 = /* @__PURE__ */ template(`<li><a></a></li>`, 4), _tmpl$9 = /* @__PURE__ */ template(`<p><strong></strong></p>`, 4);
  function stateToPriv(state) {
    switch (state) {
      case AnswerState.Sure:
        return 0;
      case AnswerState.WorkingOn:
        return 1;
      case AnswerState.NotSure:
        return 2;
    }
  }
  function cmpNameWithState([aName, aState], [bName, bState]) {
    return K(tuple(aState, bState)).with(tuple(void 0, void 0), () => aName.localeCompare(bName)).with(tuple(void 0, S.not(void 0)), () => 1).with(tuple(S.not(void 0), void 0), () => -1).with(tuple(S.not(void 0), S.not(void 0)), ([aState2, bState2]) => stateToPriv(bState2) - stateToPriv(aState2)).exhaustive();
  }
  function cmpNameWithAnswerAndCtx([aName, aCtx], [bName, bCtx]) {
    var _a, _b;
    return cmpNameWithState(tuple(aName, (_a = aCtx.context) == null ? void 0 : _a.state), tuple(bName, (_b = bCtx.context) == null ? void 0 : _b.state));
  }
  function cmpNameWithCtx([aName, aCtx], [bName, bCtx]) {
    return cmpNameWithState(tuple(aName, aCtx == null ? void 0 : aCtx.state), tuple(bName, bCtx == null ? void 0 : bCtx.state));
  }
  function stateToClass(state) {
    if (state === void 0) {
      return;
    }
    switch (state) {
      case AnswerState.WorkingOn:
        return style.stateWorkingOn;
      case AnswerState.NotSure:
        return style.stateNotSure;
      case AnswerState.Sure:
        return style.stateSure;
    }
  }
  function percent(a2, b2) {
    return `${Math.floor(a2 * 100 / b2)}%`;
  }
  function sortByKey([a2], [b2]) {
    return a2.localeCompare(b2);
  }
  class Details {
    constructor(id, subjectItem) {
      __publicField(this, "_details", /* @__PURE__ */ new Map());
      __publicField(this, "_renderUI", () => void 0);
      this._id = id;
      let itemType = subjectItem.querySelector(".item-type");
      assertIs(HTMLElement, itemType);
      itemType.classList.add(style.clickable);
      itemType.addEventListener("click", () => {
        let rect = itemType == null ? void 0 : itemType.getBoundingClientRect();
        this.showDetail({
          top: rect == null ? void 0 : rect.top,
          left: rect == null ? void 0 : rect.left
        });
      });
    }
    get details() {
      return this._details;
    }
    showDetail(opts) {
      const win = openWin(__spreadValues({
        title: "\u8BE6\u7EC6\u7B54\u6848",
        height: 200,
        width: 300
      }, opts));
      const _self$ = this;
      render(() => (() => {
        const _el$ = _tmpl$$2.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, _el$5 = _el$4.nextSibling, _el$6 = _el$5.nextSibling, _el$7 = _el$6.nextSibling, _el$8 = _el$2.nextSibling, _el$9 = _el$8.firstChild, _el$10 = _el$9.firstChild, _el$11 = _el$10.nextSibling, _el$12 = _el$9.nextSibling;
        _el$4.addEventListener("change", (ev) => CLIENT.updateMsg(_self$._id, ev.currentTarget.value));
        _el$5.addEventListener("click", () => CLIENT.updateState(_self$._id, AnswerState.WorkingOn));
        _el$6.addEventListener("click", () => CLIENT.updateState(_self$._id, AnswerState.Sure));
        _el$7.addEventListener("click", () => CLIENT.updateState(_self$._id, AnswerState.NotSure));
        insert(_el$11, () => then(_self$.details).then(sort(cmpNameWithAnswerAndCtx)).then(filterMap(([user, {
          context
        }]) => {
          if (context === void 0) {
            return;
          }
          let msg = context.msg;
          if (context.state === AnswerState.WorkingOn) {
            msg = msg != null ? msg : "\u6211\u6B63\u5728\u505A";
          }
          if (msg === void 0) {
            return;
          }
          return (() => {
            const _el$13 = _tmpl$2$2.cloneNode(true), _el$14 = _el$13.firstChild;
            insert(_el$14, `${user}: `);
            insert(_el$13, msg, null);
            createRenderEffect((_p$) => {
              const _v$8 = stateToClass(context.state), _v$9 = style.answerMsgName;
              _v$8 !== _p$._v$8 && className(_el$13, _p$._v$8 = _v$8);
              _v$9 !== _p$._v$9 && className(_el$14, _p$._v$9 = _v$9);
              return _p$;
            }, {
              _v$8: void 0,
              _v$9: void 0
            });
            return _el$13;
          })();
        })).then(collectArray).t);
        insert(_el$12, () => _self$._renderUI());
        createRenderEffect((_p$) => {
          const _v$ = style.mainBody, _v$2 = style.answerMark, _v$3 = style.stateWorkingOn, _v$4 = style.stateSure, _v$5 = style.stateNotSure, _v$6 = {
            [style.answerMsg]: true
          }, _v$7 = {
            [style.answerDetail]: true
          };
          _v$ !== _p$._v$ && className(_el$, _p$._v$ = _v$);
          _v$2 !== _p$._v$2 && className(_el$2, _p$._v$2 = _v$2);
          _v$3 !== _p$._v$3 && className(_el$5, _p$._v$3 = _v$3);
          _v$4 !== _p$._v$4 && className(_el$6, _p$._v$4 = _v$4);
          _v$5 !== _p$._v$5 && className(_el$7, _p$._v$5 = _v$5);
          _p$._v$6 = classList(_el$9, _v$6, _p$._v$6);
          _p$._v$7 = classList(_el$12, _v$7, _p$._v$7);
          return _p$;
        }, {
          _v$: void 0,
          _v$2: void 0,
          _v$3: void 0,
          _v$4: void 0,
          _v$5: void 0,
          _v$6: void 0,
          _v$7: void 0
        });
        return _el$;
      })(), win.document.body);
    }
    updateUI() {
      this._renderUI = this.renderUI();
    }
    updateAnswer(username, data) {
      this._details.set(username, data);
    }
  }
  class Tooltip {
    constructor(ele) {
      this._ele = ele;
    }
    setContent(txt) {
      this._ele.setAttribute("title", txt);
    }
  }
  class Choice extends Details {
    constructor(id, subjectItem, choiceMap) {
      super(id, subjectItem);
      this._choiceMap = choiceMap;
      this._tooltips = then(subjectItem.querySelectorAll(".item-body .checkboxInput, .item-body .radioInput")).then((t2) => Array.from(t2)).then(enumerate).then(fold(/* @__PURE__ */ new Map(), (tooltips, [idx, ele]) => tooltips.set(String.fromCharCode(idx + 65), new Tooltip(ele)))).t;
    }
    renderUI() {
      const choiceToUsers = then(this.details).then(fold(/* @__PURE__ */ new Map(), (choiceToUsers2, [user, {
        answer,
        context
      }]) => {
        var _a;
        if (answer !== void 0) {
          for (let choice of answer) {
            choice = this._choiceMap(choice);
            const users = (_a = choiceToUsers2.get(choice)) != null ? _a : [];
            users.push([user, context]);
            return choiceToUsers2.set(choice, users);
          }
        }
        return choiceToUsers2;
      })).then(collectArray).t.sort(sortByKey);
      then(choiceToUsers).then(forEach(([choice, users]) => {
        var _a;
        (_a = this._tooltips.get(choice)) == null ? void 0 : _a.setContent(percent(users.length, this.details.size));
      }));
      return () => then(choiceToUsers).then(map(([choice, users]) => (() => {
        const _el$15 = _tmpl$3$1.cloneNode(true), _el$16 = _el$15.firstChild, _el$17 = _el$16.firstChild, _el$18 = _el$16.nextSibling;
        insert(_el$17, choice);
        insert(_el$18, () => then(users).then(sort(cmpNameWithCtx)).then(map(([user, ctx]) => (() => {
          const _el$19 = _tmpl$4$1.cloneNode(true);
          insert(_el$19, user);
          createRenderEffect(() => className(_el$19, stateToClass(ctx == null ? void 0 : ctx.state)));
          return _el$19;
        })())).then(collectArray).t);
        return _el$15;
      })())).then(collectArray).t;
    }
  }
  class Blank extends Details {
    constructor(id, subjectItem) {
      super(id, subjectItem);
      this._tooltips = then(subjectItem.querySelectorAll(".item-body .blank-item-dynamic")).then(Array.from).then(enumerate).then(fold(/* @__PURE__ */ new Map(), (tooltips, [idx, ele]) => tooltips.set(String.fromCharCode(idx + 49), new Tooltip(ele)))).t;
    }
    renderUI() {
      const blankToFillAndUsers = then(this.details).then(fold(/* @__PURE__ */ new Map(), (blankToFillToUsers, [user, {
        answer,
        context
      }]) => {
        if (answer === void 0) {
          return blankToFillToUsers;
        }
        return then(answer).then(Object.entries).then(fold(blankToFillToUsers, (blankToFillToUsers2, [blank, fill]) => {
          var _a, _b;
          fill = fill.trim();
          const fillToUsers = (_a = blankToFillToUsers2.get(blank)) != null ? _a : /* @__PURE__ */ new Map();
          const users = (_b = fillToUsers.get(fill)) != null ? _b : [];
          users.push([user, context]);
          return blankToFillToUsers2.set(blank, fillToUsers.set(fill, users));
        })).t;
      })).then(map(([blank, fillToUsers]) => tuple(blank, then(fillToUsers).then(sort(sortByKey)).t))).then(collectArray).t.sort(sortByKey);
      then(blankToFillAndUsers).then(forEach(([blank, fillAndUsers]) => {
        var _a;
        const most = then(fillAndUsers).then(map(([fill, users]) => tuple(fill, users.length))).then(sort(([_1, a2], [_2, b2]) => b2 - a2)).then(first).t;
        (_a = this._tooltips.get(blank)) == null ? void 0 : _a.setContent(most === void 0 ? "" : `(${percent(most[1], this.details.size)}) ${most[0]}`);
      }));
      return () => then(blankToFillAndUsers).then(map(([blank, fillAndUsers]) => (() => {
        const _el$20 = _tmpl$3$1.cloneNode(true), _el$21 = _el$20.firstChild, _el$22 = _el$21.firstChild, _el$23 = _el$21.nextSibling;
        insert(_el$22, `#${blank}`);
        insert(_el$23, () => then(fillAndUsers).then(map(([fill, users]) => (() => {
          const _el$24 = _tmpl$5.cloneNode(true), _el$25 = _el$24.firstChild, _el$26 = _el$25.nextSibling;
          insert(_el$25, fill);
          insert(_el$26, () => then(users).then(sort(cmpNameWithCtx)).then(map(([user, ctx]) => (() => {
            const _el$27 = _tmpl$4$1.cloneNode(true);
            insert(_el$27, user);
            createRenderEffect(() => className(_el$27, stateToClass(ctx == null ? void 0 : ctx.state)));
            return _el$27;
          })())).then(collectArray).t);
          return _el$24;
        })())).then(collectArray).t);
        return _el$20;
      })())).then(collectArray).t;
    }
  }
  class ShortAnswer extends Details {
    renderUI() {
      return () => then(this.details).then(sort(cmpNameWithAnswerAndCtx)).then(map(([user, {
        answer,
        context
      }]) => {
        var _a;
        const content = answer == null ? void 0 : answer.content;
        const filelist = (_a = answer == null ? void 0 : answer.attachments) == null ? void 0 : _a.filelist;
        let contentHtml;
        let filelistHtml;
        if (content !== void 0) {
          contentHtml = (() => {
            const _el$28 = _tmpl$6.cloneNode(true);
            _el$28.innerHTML = content;
            createRenderEffect(() => className(_el$28, style.answerDetailShortAnswer));
            return _el$28;
          })();
        }
        if (filelist !== void 0) {
          filelistHtml = (() => {
            const _el$29 = _tmpl$7.cloneNode(true);
            insert(_el$29, () => then(filelist).then(map(({
              fileUrl,
              fileName
            }) => (() => {
              const _el$30 = _tmpl$8.cloneNode(true), _el$31 = _el$30.firstChild;
              setAttribute(_el$31, "href", fileUrl);
              insert(_el$31, fileName);
              return _el$30;
            })())).then(collectArray).t);
            return _el$29;
          })();
        }
        if (contentHtml === void 0 && filelistHtml === void 0) {
          return;
        }
        return [(() => {
          const _el$32 = _tmpl$9.cloneNode(true), _el$33 = _el$32.firstChild;
          insert(_el$33, user);
          createRenderEffect(() => className(_el$32, stateToClass(context == null ? void 0 : context.state)));
          return _el$32;
        })(), contentHtml, filelistHtml];
      })).then(collectArray).t;
    }
  }
  const _tmpl$$1 = /* @__PURE__ */ template(`<div><label></label><input></div>`, 5), _tmpl$2$1 = /* @__PURE__ */ template(`<div><form><div><p><i> *\u66F4\u6539\u8BBE\u7F6E\u540E\u8BF7\u5237\u65B0\u9875\u9762 </i></p><button type="submit"> \u63D0\u4EA4 </button></div></form><div><p><strong> \u529F\u80FD\u7279\u6027\uFF1A </strong></p><ul></ul></div></div>`, 20), _tmpl$3 = /* @__PURE__ */ template(`<li><strong></strong></li>`, 4), _tmpl$4 = /* @__PURE__ */ template(`<div></div>`, 2);
  function Entry(props) {
    const extra = __spreadProps(__spreadValues({}, props.extra), {
      name: props.name
    });
    return (() => {
      const _el$ = _tmpl$$1.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.nextSibling;
      insert(_el$2, () => props.title);
      spread(_el$3, extra, false, false);
      createRenderEffect((_p$) => {
        const _v$ = style.settingsEntry, _v$2 = props.name;
        _v$ !== _p$._v$ && className(_el$, _p$._v$ = _v$);
        _v$2 !== _p$._v$2 && setAttribute(_el$2, "for", _p$._v$2 = _v$2);
        return _p$;
      }, {
        _v$: void 0,
        _v$2: void 0
      });
      return _el$;
    })();
  }
  function Settings(props) {
    const form = {};
    function setFormValue(k) {
      return (ev) => form[k] = ev.currentTarget.value;
    }
    function setFormChecked(k) {
      return (ev) => form[k] = ev.currentTarget.checked;
    }
    return (() => {
      const _el$4 = _tmpl$2$1.cloneNode(true), _el$5 = _el$4.firstChild, _el$6 = _el$5.firstChild, _el$7 = _el$6.firstChild, _el$8 = _el$5.nextSibling, _el$9 = _el$8.firstChild, _el$10 = _el$9.nextSibling;
      _el$5.addEventListener("submit", (ev) => {
        ev.preventDefault();
        USERNAME.set(form.username);
        SERVER.set(form.server);
        SYNC_ANSWERS.set(form.syncAnswers);
        SORT_PROBLEMS.set(form.sortProblems);
        NO_LEAVE_CHECK.set(form.noLeaveCheck);
        props.onSubmit();
      });
      insert(_el$5, createComponent(Entry, {
        name: "username",
        title: "\u7528\u6237\u540D",
        get extra() {
          return {
            type: "text",
            pattern: "^[a-z][a-z0-9_]*$",
            title: "\u5C0F\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u4E0B\u5212\u7EBF",
            required: true,
            value: USERNAME.get(),
            onChange: setFormValue("username")
          };
        }
      }), _el$6);
      insert(_el$5, createComponent(Entry, {
        name: "server",
        title: "\u670D\u52A1\u5668",
        get extra() {
          return {
            type: "url",
            required: true,
            value: SERVER.get(),
            onChange: setFormValue("server")
          };
        }
      }), _el$6);
      insert(_el$5, createComponent(Entry, {
        name: "sync_answers",
        title: "\u540C\u6B65\u7B54\u6848",
        get extra() {
          return {
            type: "checkbox",
            checked: SYNC_ANSWERS.get(),
            onChange: setFormChecked("syncAnswers")
          };
        }
      }), _el$6);
      insert(_el$5, createComponent(Entry, {
        name: "sort_problems",
        title: "\u6392\u5E8F\u9898\u76EE",
        get extra() {
          return {
            type: "checkbox",
            checked: SORT_PROBLEMS.get(),
            onChange: setFormChecked("sortProblems")
          };
        }
      }), _el$6);
      insert(_el$5, createComponent(Entry, {
        name: "no_leave_check",
        title: "\u62E6\u622A\u5207\u5C4F\u68C0\u6D4B",
        get extra() {
          return {
            type: "checkbox",
            checked: NO_LEAVE_CHECK.get(),
            onChange: setFormChecked("noLeaveCheck")
          };
        }
      }), _el$6);
      insert(_el$10, () => [["\u540C\u6B65\u7B54\u6848\uFF1A", "\u70B9\u51FB\u9898\u76EE\u663E\u793A\u8BE6\u7EC6\u7B54\u6848\uFF0C\u5728\u9009\u9879/\u586B\u7A7A\u5904\u60AC\u505C\u663E\u793A\u7B80\u7565\u7B54\u6848"], ["\u6392\u5E8F\u9898\u76EE\uFF1A", "\u6839\u636E ID \u5BF9\u9898\u76EE\u548C\u9009\u9879\u8FDB\u884C\u91CD\u65B0\u6392\u5E8F"], ["\u62E6\u622A\u5207\u5C4F\u68C0\u6D4B\uFF1A", "\u968F\u610F\u5207\u6362\u9875\u9762\u3001\u7A97\u53E3\u4E0D\u4F1A\u88AB\u53D1\u73B0"], ["\u62E6\u622A\u4E0A\u4F20\u622A\u56FE\uFF1A", "\u4EC5\u5F53\u7528\u6237\u786E\u8BA4\u540E\uFF0C\u624D\u4F1A\u4E0A\u4F20\u622A\u56FE"], ["\u62E6\u622A\u5F02\u5E38\u72B6\u6001\uFF1A", "\u5373\u4F7F\u672C\u5730\u663E\u793A\u5F02\u5E38\u4E5F\u4E0D\u4F1A\u63A8\u9001\u5230\u670D\u52A1\u5668"]].map(([title, content]) => (() => {
        const _el$11 = _tmpl$3.cloneNode(true), _el$12 = _el$11.firstChild;
        insert(_el$12, title);
        insert(_el$11, content, null);
        return _el$11;
      })()));
      createRenderEffect((_p$) => {
        const _v$3 = style.settingsSubmit, _v$4 = style.settingsSubmitTip, _v$5 = style.about;
        _v$3 !== _p$._v$3 && className(_el$6, _p$._v$3 = _v$3);
        _v$4 !== _p$._v$4 && className(_el$7, _p$._v$4 = _v$4);
        _v$5 !== _p$._v$5 && className(_el$8, _p$._v$5 = _v$5);
        return _p$;
      }, {
        _v$3: void 0,
        _v$4: void 0,
        _v$5: void 0
      });
      return _el$4;
    })();
  }
  function showSettings() {
    const win = openWin({
      title: "\u8BBE\u7F6E",
      width: 400,
      height: 300
    });
    render(() => (() => {
      const _el$13 = _tmpl$4.cloneNode(true);
      insert(_el$13, createComponent(Settings, {
        onSubmit: () => win.close()
      }));
      createRenderEffect(() => className(_el$13, style.mainBody));
      return _el$13;
    })(), win.document.body);
  }
  const _tmpl$ = /* @__PURE__ */ template(`<style></style>`, 2), _tmpl$2 = /* @__PURE__ */ template(`<div><div><button type="button">\u786E\u8BA4\u4E0A\u4F20</button><span><i>*\u5173\u95ED\u7A97\u53E3\u4EE5\u53D6\u6D88\u4E0A\u4F20</i></span></div><div><img></div></div>`, 13);
  class UI {
    constructor(problems) {
      render(() => (() => {
        const _el$ = _tmpl$.cloneNode(true);
        _el$.textContent = styleCss;
        return _el$;
      })(), document.head);
      const header = document.body.querySelector(".header-title");
      assertIs(HTMLElement, header);
      header.classList.add(style.clickable);
      header.addEventListener("click", () => showSettings());
      let subjectItems = Array.from(document.body.querySelectorAll(".exam-main--body .subject-item"));
      assert(subjectItems.length === problems.length, "number subject items mismatches problems");
      this._details = then(subjectItems).then(zip(problems)).then(fold(/* @__PURE__ */ new Map(), (details, [subjectItem, prob]) => {
        let detail;
        switch (prob.ProblemType) {
          case ProblemType.SingleChoice:
          case ProblemType.MultipleChoice:
          case ProblemType.Judgement:
          case ProblemType.Polling:
            assertNonNull(prob.Options, "null choices");
            const choiceMap = then(prob.Options).then(enumerate).then(fold(/* @__PURE__ */ new Map(), (choiceMap2, [idx, {
              key
            }]) => choiceMap2.set(key, String.fromCharCode(65 + idx)))).t;
            detail = new Choice(prob.ProblemID, subjectItem, (s2) => {
              var _a;
              return (_a = choiceMap.get(s2)) != null ? _a : s2;
            });
            break;
          case ProblemType.FillBlank:
            detail = new Blank(prob.ProblemID, subjectItem);
            break;
          case ProblemType.ShortAnswer:
            detail = new ShortAnswer(prob.ProblemID, subjectItem);
            break;
        }
        return details.set(prob.ProblemID, detail);
      })).t;
    }
    updateAnswer({
      username,
      problem_id,
      result,
      context
    }) {
      var _a;
      (_a = this._details.get(problem_id)) == null ? void 0 : _a.updateAnswer(username, {
        answer: result,
        context
      });
    }
    updateUI() {
      this._details.forEach((d2) => d2.updateUI());
    }
  }
  function showConfirmUpload(dataURL, cb) {
    const win = openWin({
      title: "\u4E0A\u4F20\u56FE\u7247",
      width: 400,
      height: 300
    });
    render(() => (() => {
      const _el$2 = _tmpl$2.cloneNode(true), _el$3 = _el$2.firstChild, _el$4 = _el$3.firstChild, _el$5 = _el$3.nextSibling, _el$6 = _el$5.firstChild;
      _el$4.addEventListener("click", () => {
        win.close();
        cb();
      });
      setAttribute(_el$6, "src", dataURL);
      createRenderEffect((_p$) => {
        const _v$ = {
          [style.mainBody]: true,
          [style.uploadImg]: true
        }, _v$2 = style.uploadImgConfirm, _v$3 = style.uploadImgImage;
        _p$._v$ = classList(_el$2, _v$, _p$._v$);
        _v$2 !== _p$._v$2 && className(_el$3, _p$._v$2 = _v$2);
        _v$3 !== _p$._v$3 && className(_el$5, _p$._v$3 = _v$3);
        return _p$;
      }, {
        _v$: void 0,
        _v$2: void 0,
        _v$3: void 0
      });
      return _el$2;
    })(), win.document.body);
  }
  function sortProblems(problems) {
    problems.forEach((problem) => {
      switch (problem.ProblemType) {
        case ProblemType.SingleChoice:
        case ProblemType.MultipleChoice:
        case ProblemType.Polling: {
          const options = problem.Options;
          options.sort((a2, b2) => {
            return a2.key < b2.key ? -1 : 1;
          });
          break;
        }
      }
    });
    problems.sort((a2, b2) => a2.ProblemID - b2.ProblemID);
    return problems;
  }
  function sortPaper(paper) {
    if (SORT_PROBLEMS.get() === true) {
      if (paper.data.has_problem_dict === true) {
        paper.data.problems = paper.data.problems.sort((a2, b2) => a2.id - b2.id).map((d2) => {
          d2.problems = sortProblems(d2.problems);
          return d2;
        });
      } else {
        paper.data.problems = sortProblems(paper.data.problems);
      }
    }
    return paper;
  }
  function removeVisibilityListener() {
    document.addEventListener("visibilitychange", (e2) => {
      e2.preventDefault();
      e2.stopImmediatePropagation();
    }, true);
    window.addEventListener("visibilitychange", (e2) => {
      e2.preventDefault();
      e2.stopImmediatePropagation();
    }, true);
  }
  async function main() {
    then([1, 2, 3, 4, 5, 6]).then(filter((x) => x > 2)).then(forEach(console.log));
    DelegatedEvents.clear();
    migrate();
    if (NO_LEAVE_CHECK.get() === true) {
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
                  const f2 = new FileReader();
                  f2.onload = () => showConfirmUpload(f2.result, () => ok(body));
                  f2.readAsDataURL(body.get("file"));
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
