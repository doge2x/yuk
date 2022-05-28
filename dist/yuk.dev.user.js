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
  function setHydrateContext(context) {
    sharedConfig.context = context;
  }
  const equalFn = (a2, b2) => a2 === b2;
  const $TRACK = Symbol("solid-track");
  const $DEVCOMP = Symbol("solid-dev-component");
  const signalOptions = {
    equals: equalFn
  };
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
  function createSignal(value, options) {
    options = options ? Object.assign({}, signalOptions, options) : signalOptions;
    const s2 = {
      value,
      observers: null,
      observerSlots: null,
      pending: NOTPENDING,
      comparator: options.equals || void 0
    };
    if (!options.internal)
      s2.name = registerGraph(options.name || hashValue(value), s2);
    const setter = (value2) => {
      if (typeof value2 === "function") {
        value2 = value2(s2.pending !== NOTPENDING ? s2.pending : s2.value);
      }
      return writeSignal(s2, value2);
    };
    return [readSignal.bind(s2), setter];
  }
  function createRenderEffect(fn, value, options) {
    const c2 = createComputation(fn, value, false, STALE, options);
    updateComputation(c2);
  }
  function createEffect(fn, value, options) {
    runEffects = runUserEffects;
    const c2 = createComputation(fn, value, false, STALE, options);
    c2.user = true;
    Effects ? Effects.push(c2) : updateComputation(c2);
  }
  function createMemo(fn, value, options) {
    options = options ? Object.assign({}, signalOptions, options) : signalOptions;
    const c2 = createComputation(fn, value, true, 0, options);
    c2.pending = NOTPENDING;
    c2.observers = null;
    c2.observerSlots = null;
    c2.comparator = options.equals || void 0;
    updateComputation(c2);
    return readSignal.bind(c2);
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
  function onCleanup(fn) {
    if (Owner === null)
      console.warn("cleanups created outside a `createRoot` or `render` will never be run");
    else if (Owner.cleanups === null)
      Owner.cleanups = [fn];
    else
      Owner.cleanups.push(fn);
    return fn;
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
  function hashValue(v2) {
    const s2 = /* @__PURE__ */ new Set();
    return `s${typeof v2 === "string" ? hash$1(v2) : hash$1(JSON.stringify(v2, (k, v3) => {
      if (typeof v3 === "object" && v3 != null) {
        if (s2.has(v3))
          return;
        s2.add(v3);
        const keys = Object.keys(v3);
        const desc = Object.getOwnPropertyDescriptors(v3);
        const newDesc = keys.reduce((memo, key) => {
          const value = desc[key];
          if (!value.get)
            memo[key] = value;
          return memo;
        }, {});
        v3 = Object.create({}, newDesc);
      }
      if (typeof v3 === "bigint") {
        return `${v3.toString()}n`;
      }
      return v3;
    }) || "")}`;
  }
  function registerGraph(name, value) {
    let tryName = name;
    if (Owner) {
      let i2 = 0;
      Owner.sourceMap || (Owner.sourceMap = {});
      while (Owner.sourceMap[tryName])
        tryName = `${name}-${++i2}`;
      Owner.sourceMap[tryName] = value;
    }
    return tryName;
  }
  function readSignal() {
    const runningTransition = Transition;
    if (this.sources && (this.state || runningTransition)) {
      const updates = Updates;
      Updates = null;
      this.state === STALE || runningTransition ? updateComputation(this) : lookUpstream(this);
      Updates = updates;
    }
    if (Listener) {
      const sSlot = this.observers ? this.observers.length : 0;
      if (!Listener.sources) {
        Listener.sources = [this];
        Listener.sourceSlots = [sSlot];
      } else {
        Listener.sources.push(this);
        Listener.sourceSlots.push(sSlot);
      }
      if (!this.observers) {
        this.observers = [Listener];
        this.observerSlots = [Listener.sources.length - 1];
      } else {
        this.observers.push(Listener);
        this.observerSlots.push(Listener.sources.length - 1);
      }
    }
    return this.value;
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
  function runUserEffects(queue) {
    let i2, userLength = 0;
    for (i2 = 0; i2 < queue.length; i2++) {
      const e2 = queue[i2];
      if (!e2.user)
        runTop(e2);
      else
        queue[userLength++] = e2;
    }
    if (sharedConfig.context)
      setHydrateContext();
    const resume = queue.length;
    for (i2 = 0; i2 < userLength; i2++)
      runTop(queue[i2]);
    for (i2 = resume; i2 < queue.length; i2++)
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
  function hash$1(s2) {
    for (var i2 = 0, h2 = 9; i2 < s2.length; )
      h2 = Math.imul(h2 ^ s2.charCodeAt(i2++), 9 ** 9);
    return `${h2 ^ h2 >>> 9}`;
  }
  const FALLBACK = Symbol("fallback");
  function dispose(d2) {
    for (let i2 = 0; i2 < d2.length; i2++)
      d2[i2]();
  }
  function mapArray(list, mapFn, options = {}) {
    let items = [], mapped = [], disposers = [], len = 0, indexes = mapFn.length > 1 ? [] : null;
    onCleanup(() => dispose(disposers));
    return () => {
      let newItems = list() || [], i2, j;
      newItems[$TRACK];
      return untrack(() => {
        let newLen = newItems.length, newIndices, newIndicesNext, temp, tempdisposers, tempIndexes, start, end, newEnd, item;
        if (newLen === 0) {
          if (len !== 0) {
            dispose(disposers);
            disposers = [];
            items = [];
            mapped = [];
            len = 0;
            indexes && (indexes = []);
          }
          if (options.fallback) {
            items = [FALLBACK];
            mapped[0] = createRoot((disposer) => {
              disposers[0] = disposer;
              return options.fallback();
            });
            len = 1;
          }
        } else if (len === 0) {
          mapped = new Array(newLen);
          for (j = 0; j < newLen; j++) {
            items[j] = newItems[j];
            mapped[j] = createRoot(mapper);
          }
          len = newLen;
        } else {
          temp = new Array(newLen);
          tempdisposers = new Array(newLen);
          indexes && (tempIndexes = new Array(newLen));
          for (start = 0, end = Math.min(len, newLen); start < end && items[start] === newItems[start]; start++)
            ;
          for (end = len - 1, newEnd = newLen - 1; end >= start && newEnd >= start && items[end] === newItems[newEnd]; end--, newEnd--) {
            temp[newEnd] = mapped[end];
            tempdisposers[newEnd] = disposers[end];
            indexes && (tempIndexes[newEnd] = indexes[end]);
          }
          newIndices = /* @__PURE__ */ new Map();
          newIndicesNext = new Array(newEnd + 1);
          for (j = newEnd; j >= start; j--) {
            item = newItems[j];
            i2 = newIndices.get(item);
            newIndicesNext[j] = i2 === void 0 ? -1 : i2;
            newIndices.set(item, j);
          }
          for (i2 = start; i2 <= end; i2++) {
            item = items[i2];
            j = newIndices.get(item);
            if (j !== void 0 && j !== -1) {
              temp[j] = mapped[i2];
              tempdisposers[j] = disposers[i2];
              indexes && (tempIndexes[j] = indexes[i2]);
              j = newIndicesNext[j];
              newIndices.set(item, j);
            } else
              disposers[i2]();
          }
          for (j = start; j < newLen; j++) {
            if (j in temp) {
              mapped[j] = temp[j];
              disposers[j] = tempdisposers[j];
              if (indexes) {
                indexes[j] = tempIndexes[j];
                indexes[j](j);
              }
            } else
              mapped[j] = createRoot(mapper);
          }
          mapped = mapped.slice(0, len = newLen);
          items = newItems.slice(0);
        }
        return mapped;
      });
      function mapper(disposer) {
        disposers[j] = disposer;
        if (indexes) {
          const [s2, set2] = createSignal(j);
          indexes[j] = set2;
          return mapFn(newItems[j], s2);
        }
        return mapFn(newItems[j]);
      }
    };
  }
  function createComponent(Comp, props) {
    return devComponent(Comp, props || {});
  }
  function For(props) {
    const fallback = "fallback" in props && {
      fallback: () => props.fallback
    };
    return createMemo(mapArray(() => props.each, props.children, fallback ? fallback : void 0));
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
    createRoot((dispose2) => {
      disposer = dispose2;
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
  var styleCss = "._mainBody_o6t0e_1 {\n  opacity: 0.5;\n}\n._mainBody_o6t0e_1 * {\n  font-size: 0.75rem;\n  margin: 0;\n}\n._mainBody_o6t0e_1 button {\n  cursor: pointer;\n}\n._clickable_o6t0e_11 {\n  cursor: pointer;\n}\n._stateWorkingOn_o6t0e_14 {\n  color: blue;\n}\n._stateSure_o6t0e_17 {\n  color: green;\n}\n._stateNotSure_o6t0e_20 {\n  color: red;\n}\n._answerMsg_o6t0e_23 {\n  border-style: groove;\n  border-width: thin;\n  opacity: 0.75;\n  margin-bottom: 0.5rem;\n}\n._answerMsg_o6t0e_23 ul {\n  padding-left: 1rem;\n}\n._answerMsgName_o6t0e_32 {\n  font-weight: bold;\n}\n._answerMark_o6t0e_35 {\n  display: flex;\n  justify-content: end;\n  align-items: center;\n  border-style: groove;\n  border-width: thin;\n  margin-bottom: 0.5rem;\n  opacity: 0.75;\n}\n._answerMark_o6t0e_35 button {\n  padding: 0;\n  margin-left: 0.5rem;\n  white-space: nowrap;\n}\n._answerMark_o6t0e_35 input {\n  height: max-content;\n  width: 100%;\n}\n._answerDetail_o6t0e_53 ._stateWorkingOn_o6t0e_14,\n._answerDetail_o6t0e_53 ._stateSure_o6t0e_17,\n._answerDetail_o6t0e_53 ._stateNotSure_o6t0e_20 {\n  font-weight: bold;\n}\n._answerDetail_o6t0e_53 ul {\n  padding-left: 1.5rem;\n}\n._answerDetail_o6t0e_53 img {\n  height: auto;\n  width: 80%;\n}\n._answerDetailShortAnswer_o6t0e_65 {\n  border-style: groove;\n  border-width: thin;\n  margin: 0.2rem;\n  padding: 0.2rem;\n}\n._answerDetailFill_o6t0e_71 {\n  white-space: pre;\n}\n._settings_o6t0e_74 {\n  border-style: groove;\n  border-width: thin;\n  display: flex;\n  flex-direction: column;\n  padding: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n._settingsEntry_o6t0e_82 {\n  display: flex;\n  flex-direction: row;\n  margin-bottom: 0.5rem;\n  justify-content: space-between;\n  align-items: center;\n}\n._settingsEntry_o6t0e_82 label {\n  font-weight: bold;\n}\n._settingsEntry_o6t0e_82 input {\n  height: max-content;\n  text-align: right;\n}\n._settingsSubmit_o6t0e_96 {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: end;\n}\n._settingsSubmitTip_o6t0e_102 {\n  margin-right: 0.5rem;\n}\n._about_o6t0e_105 p {\n  margin-bottom: 0.25rem;\n}\n._about_o6t0e_105 ul {\n  padding-left: 1.5rem;\n  margin-bottom: 0.25rem;\n}\n._about_o6t0e_105 ul li {\n  margin-bottom: 0.25rem;\n}\n._uploadImg_o6t0e_115 {\n  display: flex;\n  flex-direction: column;\n}\n._uploadImg_o6t0e_115 img {\n  width: 100%;\n  height: auto;\n}\n._uploadImgImage_o6t0e_123 {\n  border-style: groove;\n  border-width: thin;\n  padding: 0.5rem;\n}\n._uploadImgConfirm_o6t0e_128 {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n}\n";
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
  const mainBody = "_mainBody_o6t0e_1";
  const clickable = "_clickable_o6t0e_11";
  const stateWorkingOn = "_stateWorkingOn_o6t0e_14";
  const stateSure = "_stateSure_o6t0e_17";
  const stateNotSure = "_stateNotSure_o6t0e_20";
  const answerMsg = "_answerMsg_o6t0e_23";
  const answerMsgName = "_answerMsgName_o6t0e_32";
  const answerMark = "_answerMark_o6t0e_35";
  const answerDetail = "_answerDetail_o6t0e_53";
  const answerDetailShortAnswer = "_answerDetailShortAnswer_o6t0e_65";
  const answerDetailFill = "_answerDetailFill_o6t0e_71";
  const settings = "_settings_o6t0e_74";
  const settingsEntry = "_settingsEntry_o6t0e_82";
  const settingsSubmit = "_settingsSubmit_o6t0e_96";
  const settingsSubmitTip = "_settingsSubmitTip_o6t0e_102";
  const about = "_about_o6t0e_105";
  const uploadImg = "_uploadImg_o6t0e_115";
  const uploadImgImage = "_uploadImgImage_o6t0e_123";
  const uploadImgConfirm = "_uploadImgConfirm_o6t0e_128";
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
    answerDetailFill,
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
    constructor(lazy) {
      __publicField(this, "_lazy");
      this._lazy = lazy;
    }
    static from(t2) {
      return new Pipe(() => t2);
    }
    then(f2) {
      return new Pipe(() => f2(this.exec()));
    }
    exec() {
      return this._lazy();
    }
  }
  function pipe(t2) {
    return Pipe.from(t2);
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
  var DELETE = "delete";
  var SHIFT = 5;
  var SIZE = 1 << SHIFT;
  var MASK = SIZE - 1;
  var NOT_SET = {};
  function MakeRef() {
    return { value: false };
  }
  function SetRef(ref) {
    if (ref) {
      ref.value = true;
    }
  }
  function OwnerID() {
  }
  function ensureSize(iter) {
    if (iter.size === void 0) {
      iter.size = iter.__iterate(returnTrue);
    }
    return iter.size;
  }
  function wrapIndex(iter, index) {
    if (typeof index !== "number") {
      var uint32Index = index >>> 0;
      if ("" + uint32Index !== index || uint32Index === 4294967295) {
        return NaN;
      }
      index = uint32Index;
    }
    return index < 0 ? ensureSize(iter) + index : index;
  }
  function returnTrue() {
    return true;
  }
  function wholeSlice(begin, end, size) {
    return (begin === 0 && !isNeg(begin) || size !== void 0 && begin <= -size) && (end === void 0 || size !== void 0 && end >= size);
  }
  function resolveBegin(begin, size) {
    return resolveIndex(begin, size, 0);
  }
  function resolveEnd(end, size) {
    return resolveIndex(end, size, size);
  }
  function resolveIndex(index, size, defaultIndex) {
    return index === void 0 ? defaultIndex : isNeg(index) ? size === Infinity ? size : Math.max(0, size + index) | 0 : size === void 0 || size === index ? index : Math.min(size, index) | 0;
  }
  function isNeg(value) {
    return value < 0 || value === 0 && 1 / value === -Infinity;
  }
  var IS_COLLECTION_SYMBOL = "@@__IMMUTABLE_ITERABLE__@@";
  function isCollection(maybeCollection) {
    return Boolean(maybeCollection && maybeCollection[IS_COLLECTION_SYMBOL]);
  }
  var IS_KEYED_SYMBOL = "@@__IMMUTABLE_KEYED__@@";
  function isKeyed(maybeKeyed) {
    return Boolean(maybeKeyed && maybeKeyed[IS_KEYED_SYMBOL]);
  }
  var IS_INDEXED_SYMBOL = "@@__IMMUTABLE_INDEXED__@@";
  function isIndexed(maybeIndexed) {
    return Boolean(maybeIndexed && maybeIndexed[IS_INDEXED_SYMBOL]);
  }
  function isAssociative(maybeAssociative) {
    return isKeyed(maybeAssociative) || isIndexed(maybeAssociative);
  }
  var Collection = function Collection2(value) {
    return isCollection(value) ? value : Seq(value);
  };
  var KeyedCollection = /* @__PURE__ */ function(Collection2) {
    function KeyedCollection2(value) {
      return isKeyed(value) ? value : KeyedSeq(value);
    }
    if (Collection2)
      KeyedCollection2.__proto__ = Collection2;
    KeyedCollection2.prototype = Object.create(Collection2 && Collection2.prototype);
    KeyedCollection2.prototype.constructor = KeyedCollection2;
    return KeyedCollection2;
  }(Collection);
  var IndexedCollection = /* @__PURE__ */ function(Collection2) {
    function IndexedCollection2(value) {
      return isIndexed(value) ? value : IndexedSeq(value);
    }
    if (Collection2)
      IndexedCollection2.__proto__ = Collection2;
    IndexedCollection2.prototype = Object.create(Collection2 && Collection2.prototype);
    IndexedCollection2.prototype.constructor = IndexedCollection2;
    return IndexedCollection2;
  }(Collection);
  var SetCollection = /* @__PURE__ */ function(Collection2) {
    function SetCollection2(value) {
      return isCollection(value) && !isAssociative(value) ? value : SetSeq(value);
    }
    if (Collection2)
      SetCollection2.__proto__ = Collection2;
    SetCollection2.prototype = Object.create(Collection2 && Collection2.prototype);
    SetCollection2.prototype.constructor = SetCollection2;
    return SetCollection2;
  }(Collection);
  Collection.Keyed = KeyedCollection;
  Collection.Indexed = IndexedCollection;
  Collection.Set = SetCollection;
  var IS_SEQ_SYMBOL = "@@__IMMUTABLE_SEQ__@@";
  function isSeq(maybeSeq) {
    return Boolean(maybeSeq && maybeSeq[IS_SEQ_SYMBOL]);
  }
  var IS_RECORD_SYMBOL = "@@__IMMUTABLE_RECORD__@@";
  function isRecord(maybeRecord) {
    return Boolean(maybeRecord && maybeRecord[IS_RECORD_SYMBOL]);
  }
  function isImmutable(maybeImmutable) {
    return isCollection(maybeImmutable) || isRecord(maybeImmutable);
  }
  var IS_ORDERED_SYMBOL = "@@__IMMUTABLE_ORDERED__@@";
  function isOrdered(maybeOrdered) {
    return Boolean(maybeOrdered && maybeOrdered[IS_ORDERED_SYMBOL]);
  }
  var ITERATE_KEYS = 0;
  var ITERATE_VALUES = 1;
  var ITERATE_ENTRIES = 2;
  var REAL_ITERATOR_SYMBOL = typeof Symbol === "function" && Symbol.iterator;
  var FAUX_ITERATOR_SYMBOL = "@@iterator";
  var ITERATOR_SYMBOL = REAL_ITERATOR_SYMBOL || FAUX_ITERATOR_SYMBOL;
  var Iterator = function Iterator2(next) {
    this.next = next;
  };
  Iterator.prototype.toString = function toString2() {
    return "[Iterator]";
  };
  Iterator.KEYS = ITERATE_KEYS;
  Iterator.VALUES = ITERATE_VALUES;
  Iterator.ENTRIES = ITERATE_ENTRIES;
  Iterator.prototype.inspect = Iterator.prototype.toSource = function() {
    return this.toString();
  };
  Iterator.prototype[ITERATOR_SYMBOL] = function() {
    return this;
  };
  function iteratorValue(type, k, v2, iteratorResult) {
    var value = type === 0 ? k : type === 1 ? v2 : [k, v2];
    iteratorResult ? iteratorResult.value = value : iteratorResult = {
      value,
      done: false
    };
    return iteratorResult;
  }
  function iteratorDone() {
    return { value: void 0, done: true };
  }
  function hasIterator(maybeIterable) {
    if (Array.isArray(maybeIterable)) {
      return true;
    }
    return !!getIteratorFn(maybeIterable);
  }
  function isIterator(maybeIterator) {
    return maybeIterator && typeof maybeIterator.next === "function";
  }
  function getIterator(iterable) {
    var iteratorFn = getIteratorFn(iterable);
    return iteratorFn && iteratorFn.call(iterable);
  }
  function getIteratorFn(iterable) {
    var iteratorFn = iterable && (REAL_ITERATOR_SYMBOL && iterable[REAL_ITERATOR_SYMBOL] || iterable[FAUX_ITERATOR_SYMBOL]);
    if (typeof iteratorFn === "function") {
      return iteratorFn;
    }
  }
  function isEntriesIterable(maybeIterable) {
    var iteratorFn = getIteratorFn(maybeIterable);
    return iteratorFn && iteratorFn === maybeIterable.entries;
  }
  function isKeysIterable(maybeIterable) {
    var iteratorFn = getIteratorFn(maybeIterable);
    return iteratorFn && iteratorFn === maybeIterable.keys;
  }
  var hasOwnProperty = Object.prototype.hasOwnProperty;
  function isArrayLike(value) {
    if (Array.isArray(value) || typeof value === "string") {
      return true;
    }
    return value && typeof value === "object" && Number.isInteger(value.length) && value.length >= 0 && (value.length === 0 ? Object.keys(value).length === 1 : value.hasOwnProperty(value.length - 1));
  }
  var Seq = /* @__PURE__ */ function(Collection2) {
    function Seq2(value) {
      return value === void 0 || value === null ? emptySequence() : isImmutable(value) ? value.toSeq() : seqFromValue(value);
    }
    if (Collection2)
      Seq2.__proto__ = Collection2;
    Seq2.prototype = Object.create(Collection2 && Collection2.prototype);
    Seq2.prototype.constructor = Seq2;
    Seq2.prototype.toSeq = function toSeq() {
      return this;
    };
    Seq2.prototype.toString = function toString2() {
      return this.__toString("Seq {", "}");
    };
    Seq2.prototype.cacheResult = function cacheResult() {
      if (!this._cache && this.__iterateUncached) {
        this._cache = this.entrySeq().toArray();
        this.size = this._cache.length;
      }
      return this;
    };
    Seq2.prototype.__iterate = function __iterate(fn, reverse) {
      var cache = this._cache;
      if (cache) {
        var size = cache.length;
        var i2 = 0;
        while (i2 !== size) {
          var entry = cache[reverse ? size - ++i2 : i2++];
          if (fn(entry[1], entry[0], this) === false) {
            break;
          }
        }
        return i2;
      }
      return this.__iterateUncached(fn, reverse);
    };
    Seq2.prototype.__iterator = function __iterator(type, reverse) {
      var cache = this._cache;
      if (cache) {
        var size = cache.length;
        var i2 = 0;
        return new Iterator(function() {
          if (i2 === size) {
            return iteratorDone();
          }
          var entry = cache[reverse ? size - ++i2 : i2++];
          return iteratorValue(type, entry[0], entry[1]);
        });
      }
      return this.__iteratorUncached(type, reverse);
    };
    return Seq2;
  }(Collection);
  var KeyedSeq = /* @__PURE__ */ function(Seq2) {
    function KeyedSeq2(value) {
      return value === void 0 || value === null ? emptySequence().toKeyedSeq() : isCollection(value) ? isKeyed(value) ? value.toSeq() : value.fromEntrySeq() : isRecord(value) ? value.toSeq() : keyedSeqFromValue(value);
    }
    if (Seq2)
      KeyedSeq2.__proto__ = Seq2;
    KeyedSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
    KeyedSeq2.prototype.constructor = KeyedSeq2;
    KeyedSeq2.prototype.toKeyedSeq = function toKeyedSeq() {
      return this;
    };
    return KeyedSeq2;
  }(Seq);
  var IndexedSeq = /* @__PURE__ */ function(Seq2) {
    function IndexedSeq2(value) {
      return value === void 0 || value === null ? emptySequence() : isCollection(value) ? isKeyed(value) ? value.entrySeq() : value.toIndexedSeq() : isRecord(value) ? value.toSeq().entrySeq() : indexedSeqFromValue(value);
    }
    if (Seq2)
      IndexedSeq2.__proto__ = Seq2;
    IndexedSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
    IndexedSeq2.prototype.constructor = IndexedSeq2;
    IndexedSeq2.of = function of() {
      return IndexedSeq2(arguments);
    };
    IndexedSeq2.prototype.toIndexedSeq = function toIndexedSeq() {
      return this;
    };
    IndexedSeq2.prototype.toString = function toString2() {
      return this.__toString("Seq [", "]");
    };
    return IndexedSeq2;
  }(Seq);
  var SetSeq = /* @__PURE__ */ function(Seq2) {
    function SetSeq2(value) {
      return (isCollection(value) && !isAssociative(value) ? value : IndexedSeq(value)).toSetSeq();
    }
    if (Seq2)
      SetSeq2.__proto__ = Seq2;
    SetSeq2.prototype = Object.create(Seq2 && Seq2.prototype);
    SetSeq2.prototype.constructor = SetSeq2;
    SetSeq2.of = function of() {
      return SetSeq2(arguments);
    };
    SetSeq2.prototype.toSetSeq = function toSetSeq() {
      return this;
    };
    return SetSeq2;
  }(Seq);
  Seq.isSeq = isSeq;
  Seq.Keyed = KeyedSeq;
  Seq.Set = SetSeq;
  Seq.Indexed = IndexedSeq;
  Seq.prototype[IS_SEQ_SYMBOL] = true;
  var ArraySeq = /* @__PURE__ */ function(IndexedSeq2) {
    function ArraySeq2(array) {
      this._array = array;
      this.size = array.length;
    }
    if (IndexedSeq2)
      ArraySeq2.__proto__ = IndexedSeq2;
    ArraySeq2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
    ArraySeq2.prototype.constructor = ArraySeq2;
    ArraySeq2.prototype.get = function get2(index, notSetValue) {
      return this.has(index) ? this._array[wrapIndex(this, index)] : notSetValue;
    };
    ArraySeq2.prototype.__iterate = function __iterate(fn, reverse) {
      var array = this._array;
      var size = array.length;
      var i2 = 0;
      while (i2 !== size) {
        var ii = reverse ? size - ++i2 : i2++;
        if (fn(array[ii], ii, this) === false) {
          break;
        }
      }
      return i2;
    };
    ArraySeq2.prototype.__iterator = function __iterator(type, reverse) {
      var array = this._array;
      var size = array.length;
      var i2 = 0;
      return new Iterator(function() {
        if (i2 === size) {
          return iteratorDone();
        }
        var ii = reverse ? size - ++i2 : i2++;
        return iteratorValue(type, ii, array[ii]);
      });
    };
    return ArraySeq2;
  }(IndexedSeq);
  var ObjectSeq = /* @__PURE__ */ function(KeyedSeq2) {
    function ObjectSeq2(object) {
      var keys = Object.keys(object).concat(Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(object) : []);
      this._object = object;
      this._keys = keys;
      this.size = keys.length;
    }
    if (KeyedSeq2)
      ObjectSeq2.__proto__ = KeyedSeq2;
    ObjectSeq2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
    ObjectSeq2.prototype.constructor = ObjectSeq2;
    ObjectSeq2.prototype.get = function get2(key, notSetValue) {
      if (notSetValue !== void 0 && !this.has(key)) {
        return notSetValue;
      }
      return this._object[key];
    };
    ObjectSeq2.prototype.has = function has2(key) {
      return hasOwnProperty.call(this._object, key);
    };
    ObjectSeq2.prototype.__iterate = function __iterate(fn, reverse) {
      var object = this._object;
      var keys = this._keys;
      var size = keys.length;
      var i2 = 0;
      while (i2 !== size) {
        var key = keys[reverse ? size - ++i2 : i2++];
        if (fn(object[key], key, this) === false) {
          break;
        }
      }
      return i2;
    };
    ObjectSeq2.prototype.__iterator = function __iterator(type, reverse) {
      var object = this._object;
      var keys = this._keys;
      var size = keys.length;
      var i2 = 0;
      return new Iterator(function() {
        if (i2 === size) {
          return iteratorDone();
        }
        var key = keys[reverse ? size - ++i2 : i2++];
        return iteratorValue(type, key, object[key]);
      });
    };
    return ObjectSeq2;
  }(KeyedSeq);
  ObjectSeq.prototype[IS_ORDERED_SYMBOL] = true;
  var CollectionSeq = /* @__PURE__ */ function(IndexedSeq2) {
    function CollectionSeq2(collection) {
      this._collection = collection;
      this.size = collection.length || collection.size;
    }
    if (IndexedSeq2)
      CollectionSeq2.__proto__ = IndexedSeq2;
    CollectionSeq2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
    CollectionSeq2.prototype.constructor = CollectionSeq2;
    CollectionSeq2.prototype.__iterateUncached = function __iterateUncached(fn, reverse) {
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var collection = this._collection;
      var iterator = getIterator(collection);
      var iterations = 0;
      if (isIterator(iterator)) {
        var step;
        while (!(step = iterator.next()).done) {
          if (fn(step.value, iterations++, this) === false) {
            break;
          }
        }
      }
      return iterations;
    };
    CollectionSeq2.prototype.__iteratorUncached = function __iteratorUncached(type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var collection = this._collection;
      var iterator = getIterator(collection);
      if (!isIterator(iterator)) {
        return new Iterator(iteratorDone);
      }
      var iterations = 0;
      return new Iterator(function() {
        var step = iterator.next();
        return step.done ? step : iteratorValue(type, iterations++, step.value);
      });
    };
    return CollectionSeq2;
  }(IndexedSeq);
  var EMPTY_SEQ;
  function emptySequence() {
    return EMPTY_SEQ || (EMPTY_SEQ = new ArraySeq([]));
  }
  function keyedSeqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value);
    if (seq) {
      return seq.fromEntrySeq();
    }
    if (typeof value === "object") {
      return new ObjectSeq(value);
    }
    throw new TypeError("Expected Array or collection object of [k, v] entries, or keyed object: " + value);
  }
  function indexedSeqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value);
    if (seq) {
      return seq;
    }
    throw new TypeError("Expected Array or collection object of values: " + value);
  }
  function seqFromValue(value) {
    var seq = maybeIndexedSeqFromValue(value);
    if (seq) {
      return isEntriesIterable(value) ? seq.fromEntrySeq() : isKeysIterable(value) ? seq.toSetSeq() : seq;
    }
    if (typeof value === "object") {
      return new ObjectSeq(value);
    }
    throw new TypeError("Expected Array or collection object of values, or keyed object: " + value);
  }
  function maybeIndexedSeqFromValue(value) {
    return isArrayLike(value) ? new ArraySeq(value) : hasIterator(value) ? new CollectionSeq(value) : void 0;
  }
  var IS_MAP_SYMBOL = "@@__IMMUTABLE_MAP__@@";
  function isMap(maybeMap) {
    return Boolean(maybeMap && maybeMap[IS_MAP_SYMBOL]);
  }
  function isOrderedMap(maybeOrderedMap) {
    return isMap(maybeOrderedMap) && isOrdered(maybeOrderedMap);
  }
  function isValueObject(maybeValue) {
    return Boolean(maybeValue && typeof maybeValue.equals === "function" && typeof maybeValue.hashCode === "function");
  }
  function is(valueA, valueB) {
    if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
      return true;
    }
    if (!valueA || !valueB) {
      return false;
    }
    if (typeof valueA.valueOf === "function" && typeof valueB.valueOf === "function") {
      valueA = valueA.valueOf();
      valueB = valueB.valueOf();
      if (valueA === valueB || valueA !== valueA && valueB !== valueB) {
        return true;
      }
      if (!valueA || !valueB) {
        return false;
      }
    }
    return !!(isValueObject(valueA) && isValueObject(valueB) && valueA.equals(valueB));
  }
  var imul = typeof Math.imul === "function" && Math.imul(4294967295, 2) === -2 ? Math.imul : function imul2(a2, b2) {
    a2 |= 0;
    b2 |= 0;
    var c2 = a2 & 65535;
    var d2 = b2 & 65535;
    return c2 * d2 + ((a2 >>> 16) * d2 + c2 * (b2 >>> 16) << 16 >>> 0) | 0;
  };
  function smi(i32) {
    return i32 >>> 1 & 1073741824 | i32 & 3221225471;
  }
  var defaultValueOf = Object.prototype.valueOf;
  function hash(o2) {
    if (o2 == null) {
      return hashNullish(o2);
    }
    if (typeof o2.hashCode === "function") {
      return smi(o2.hashCode(o2));
    }
    var v2 = valueOf(o2);
    if (v2 == null) {
      return hashNullish(v2);
    }
    switch (typeof v2) {
      case "boolean":
        return v2 ? 1108378657 : 1108378656;
      case "number":
        return hashNumber(v2);
      case "string":
        return v2.length > STRING_HASH_CACHE_MIN_STRLEN ? cachedHashString(v2) : hashString(v2);
      case "object":
      case "function":
        return hashJSObj(v2);
      case "symbol":
        return hashSymbol(v2);
      default:
        if (typeof v2.toString === "function") {
          return hashString(v2.toString());
        }
        throw new Error("Value type " + typeof v2 + " cannot be hashed.");
    }
  }
  function hashNullish(nullish) {
    return nullish === null ? 1108378658 : 1108378659;
  }
  function hashNumber(n2) {
    if (n2 !== n2 || n2 === Infinity) {
      return 0;
    }
    var hash2 = n2 | 0;
    if (hash2 !== n2) {
      hash2 ^= n2 * 4294967295;
    }
    while (n2 > 4294967295) {
      n2 /= 4294967295;
      hash2 ^= n2;
    }
    return smi(hash2);
  }
  function cachedHashString(string) {
    var hashed = stringHashCache[string];
    if (hashed === void 0) {
      hashed = hashString(string);
      if (STRING_HASH_CACHE_SIZE === STRING_HASH_CACHE_MAX_SIZE) {
        STRING_HASH_CACHE_SIZE = 0;
        stringHashCache = {};
      }
      STRING_HASH_CACHE_SIZE++;
      stringHashCache[string] = hashed;
    }
    return hashed;
  }
  function hashString(string) {
    var hashed = 0;
    for (var ii = 0; ii < string.length; ii++) {
      hashed = 31 * hashed + string.charCodeAt(ii) | 0;
    }
    return smi(hashed);
  }
  function hashSymbol(sym) {
    var hashed = symbolMap[sym];
    if (hashed !== void 0) {
      return hashed;
    }
    hashed = nextHash();
    symbolMap[sym] = hashed;
    return hashed;
  }
  function hashJSObj(obj) {
    var hashed;
    if (usingWeakMap) {
      hashed = weakMap.get(obj);
      if (hashed !== void 0) {
        return hashed;
      }
    }
    hashed = obj[UID_HASH_KEY];
    if (hashed !== void 0) {
      return hashed;
    }
    if (!canDefineProperty) {
      hashed = obj.propertyIsEnumerable && obj.propertyIsEnumerable[UID_HASH_KEY];
      if (hashed !== void 0) {
        return hashed;
      }
      hashed = getIENodeHash(obj);
      if (hashed !== void 0) {
        return hashed;
      }
    }
    hashed = nextHash();
    if (usingWeakMap) {
      weakMap.set(obj, hashed);
    } else if (isExtensible !== void 0 && isExtensible(obj) === false) {
      throw new Error("Non-extensible objects are not allowed as keys.");
    } else if (canDefineProperty) {
      Object.defineProperty(obj, UID_HASH_KEY, {
        enumerable: false,
        configurable: false,
        writable: false,
        value: hashed
      });
    } else if (obj.propertyIsEnumerable !== void 0 && obj.propertyIsEnumerable === obj.constructor.prototype.propertyIsEnumerable) {
      obj.propertyIsEnumerable = function() {
        return this.constructor.prototype.propertyIsEnumerable.apply(this, arguments);
      };
      obj.propertyIsEnumerable[UID_HASH_KEY] = hashed;
    } else if (obj.nodeType !== void 0) {
      obj[UID_HASH_KEY] = hashed;
    } else {
      throw new Error("Unable to set a non-enumerable property on object.");
    }
    return hashed;
  }
  var isExtensible = Object.isExtensible;
  var canDefineProperty = function() {
    try {
      Object.defineProperty({}, "@", {});
      return true;
    } catch (e2) {
      return false;
    }
  }();
  function getIENodeHash(node) {
    if (node && node.nodeType > 0) {
      switch (node.nodeType) {
        case 1:
          return node.uniqueID;
        case 9:
          return node.documentElement && node.documentElement.uniqueID;
      }
    }
  }
  function valueOf(obj) {
    return obj.valueOf !== defaultValueOf && typeof obj.valueOf === "function" ? obj.valueOf(obj) : obj;
  }
  function nextHash() {
    var nextHash2 = ++_objHashUID;
    if (_objHashUID & 1073741824) {
      _objHashUID = 0;
    }
    return nextHash2;
  }
  var usingWeakMap = typeof WeakMap === "function";
  var weakMap;
  if (usingWeakMap) {
    weakMap = /* @__PURE__ */ new WeakMap();
  }
  var symbolMap = /* @__PURE__ */ Object.create(null);
  var _objHashUID = 0;
  var UID_HASH_KEY = "__immutablehash__";
  if (typeof Symbol === "function") {
    UID_HASH_KEY = Symbol(UID_HASH_KEY);
  }
  var STRING_HASH_CACHE_MIN_STRLEN = 16;
  var STRING_HASH_CACHE_MAX_SIZE = 255;
  var STRING_HASH_CACHE_SIZE = 0;
  var stringHashCache = {};
  var ToKeyedSequence = /* @__PURE__ */ function(KeyedSeq2) {
    function ToKeyedSequence2(indexed, useKeys) {
      this._iter = indexed;
      this._useKeys = useKeys;
      this.size = indexed.size;
    }
    if (KeyedSeq2)
      ToKeyedSequence2.__proto__ = KeyedSeq2;
    ToKeyedSequence2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
    ToKeyedSequence2.prototype.constructor = ToKeyedSequence2;
    ToKeyedSequence2.prototype.get = function get2(key, notSetValue) {
      return this._iter.get(key, notSetValue);
    };
    ToKeyedSequence2.prototype.has = function has2(key) {
      return this._iter.has(key);
    };
    ToKeyedSequence2.prototype.valueSeq = function valueSeq() {
      return this._iter.valueSeq();
    };
    ToKeyedSequence2.prototype.reverse = function reverse() {
      var this$1$1 = this;
      var reversedSequence = reverseFactory(this, true);
      if (!this._useKeys) {
        reversedSequence.valueSeq = function() {
          return this$1$1._iter.toSeq().reverse();
        };
      }
      return reversedSequence;
    };
    ToKeyedSequence2.prototype.map = function map2(mapper, context) {
      var this$1$1 = this;
      var mappedSequence = mapFactory(this, mapper, context);
      if (!this._useKeys) {
        mappedSequence.valueSeq = function() {
          return this$1$1._iter.toSeq().map(mapper, context);
        };
      }
      return mappedSequence;
    };
    ToKeyedSequence2.prototype.__iterate = function __iterate(fn, reverse) {
      var this$1$1 = this;
      return this._iter.__iterate(function(v2, k) {
        return fn(v2, k, this$1$1);
      }, reverse);
    };
    ToKeyedSequence2.prototype.__iterator = function __iterator(type, reverse) {
      return this._iter.__iterator(type, reverse);
    };
    return ToKeyedSequence2;
  }(KeyedSeq);
  ToKeyedSequence.prototype[IS_ORDERED_SYMBOL] = true;
  var ToIndexedSequence = /* @__PURE__ */ function(IndexedSeq2) {
    function ToIndexedSequence2(iter) {
      this._iter = iter;
      this.size = iter.size;
    }
    if (IndexedSeq2)
      ToIndexedSequence2.__proto__ = IndexedSeq2;
    ToIndexedSequence2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
    ToIndexedSequence2.prototype.constructor = ToIndexedSequence2;
    ToIndexedSequence2.prototype.includes = function includes(value) {
      return this._iter.includes(value);
    };
    ToIndexedSequence2.prototype.__iterate = function __iterate(fn, reverse) {
      var this$1$1 = this;
      var i2 = 0;
      reverse && ensureSize(this);
      return this._iter.__iterate(function(v2) {
        return fn(v2, reverse ? this$1$1.size - ++i2 : i2++, this$1$1);
      }, reverse);
    };
    ToIndexedSequence2.prototype.__iterator = function __iterator(type, reverse) {
      var this$1$1 = this;
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      var i2 = 0;
      reverse && ensureSize(this);
      return new Iterator(function() {
        var step = iterator.next();
        return step.done ? step : iteratorValue(type, reverse ? this$1$1.size - ++i2 : i2++, step.value, step);
      });
    };
    return ToIndexedSequence2;
  }(IndexedSeq);
  var ToSetSequence = /* @__PURE__ */ function(SetSeq2) {
    function ToSetSequence2(iter) {
      this._iter = iter;
      this.size = iter.size;
    }
    if (SetSeq2)
      ToSetSequence2.__proto__ = SetSeq2;
    ToSetSequence2.prototype = Object.create(SetSeq2 && SetSeq2.prototype);
    ToSetSequence2.prototype.constructor = ToSetSequence2;
    ToSetSequence2.prototype.has = function has2(key) {
      return this._iter.includes(key);
    };
    ToSetSequence2.prototype.__iterate = function __iterate(fn, reverse) {
      var this$1$1 = this;
      return this._iter.__iterate(function(v2) {
        return fn(v2, v2, this$1$1);
      }, reverse);
    };
    ToSetSequence2.prototype.__iterator = function __iterator(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function() {
        var step = iterator.next();
        return step.done ? step : iteratorValue(type, step.value, step.value, step);
      });
    };
    return ToSetSequence2;
  }(SetSeq);
  var FromEntriesSequence = /* @__PURE__ */ function(KeyedSeq2) {
    function FromEntriesSequence2(entries) {
      this._iter = entries;
      this.size = entries.size;
    }
    if (KeyedSeq2)
      FromEntriesSequence2.__proto__ = KeyedSeq2;
    FromEntriesSequence2.prototype = Object.create(KeyedSeq2 && KeyedSeq2.prototype);
    FromEntriesSequence2.prototype.constructor = FromEntriesSequence2;
    FromEntriesSequence2.prototype.entrySeq = function entrySeq() {
      return this._iter.toSeq();
    };
    FromEntriesSequence2.prototype.__iterate = function __iterate(fn, reverse) {
      var this$1$1 = this;
      return this._iter.__iterate(function(entry) {
        if (entry) {
          validateEntry(entry);
          var indexedCollection = isCollection(entry);
          return fn(indexedCollection ? entry.get(1) : entry[1], indexedCollection ? entry.get(0) : entry[0], this$1$1);
        }
      }, reverse);
    };
    FromEntriesSequence2.prototype.__iterator = function __iterator(type, reverse) {
      var iterator = this._iter.__iterator(ITERATE_VALUES, reverse);
      return new Iterator(function() {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          if (entry) {
            validateEntry(entry);
            var indexedCollection = isCollection(entry);
            return iteratorValue(type, indexedCollection ? entry.get(0) : entry[0], indexedCollection ? entry.get(1) : entry[1], step);
          }
        }
      });
    };
    return FromEntriesSequence2;
  }(KeyedSeq);
  ToIndexedSequence.prototype.cacheResult = ToKeyedSequence.prototype.cacheResult = ToSetSequence.prototype.cacheResult = FromEntriesSequence.prototype.cacheResult = cacheResultThrough;
  function flipFactory(collection) {
    var flipSequence = makeSequence(collection);
    flipSequence._iter = collection;
    flipSequence.size = collection.size;
    flipSequence.flip = function() {
      return collection;
    };
    flipSequence.reverse = function() {
      var reversedSequence = collection.reverse.apply(this);
      reversedSequence.flip = function() {
        return collection.reverse();
      };
      return reversedSequence;
    };
    flipSequence.has = function(key) {
      return collection.includes(key);
    };
    flipSequence.includes = function(key) {
      return collection.has(key);
    };
    flipSequence.cacheResult = cacheResultThrough;
    flipSequence.__iterateUncached = function(fn, reverse) {
      var this$1$1 = this;
      return collection.__iterate(function(v2, k) {
        return fn(k, v2, this$1$1) !== false;
      }, reverse);
    };
    flipSequence.__iteratorUncached = function(type, reverse) {
      if (type === ITERATE_ENTRIES) {
        var iterator = collection.__iterator(type, reverse);
        return new Iterator(function() {
          var step = iterator.next();
          if (!step.done) {
            var k = step.value[0];
            step.value[0] = step.value[1];
            step.value[1] = k;
          }
          return step;
        });
      }
      return collection.__iterator(type === ITERATE_VALUES ? ITERATE_KEYS : ITERATE_VALUES, reverse);
    };
    return flipSequence;
  }
  function mapFactory(collection, mapper, context) {
    var mappedSequence = makeSequence(collection);
    mappedSequence.size = collection.size;
    mappedSequence.has = function(key) {
      return collection.has(key);
    };
    mappedSequence.get = function(key, notSetValue) {
      var v2 = collection.get(key, NOT_SET);
      return v2 === NOT_SET ? notSetValue : mapper.call(context, v2, key, collection);
    };
    mappedSequence.__iterateUncached = function(fn, reverse) {
      var this$1$1 = this;
      return collection.__iterate(function(v2, k, c2) {
        return fn(mapper.call(context, v2, k, c2), k, this$1$1) !== false;
      }, reverse);
    };
    mappedSequence.__iteratorUncached = function(type, reverse) {
      var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
      return new Iterator(function() {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var key = entry[0];
        return iteratorValue(type, key, mapper.call(context, entry[1], key, collection), step);
      });
    };
    return mappedSequence;
  }
  function reverseFactory(collection, useKeys) {
    var this$1$1 = this;
    var reversedSequence = makeSequence(collection);
    reversedSequence._iter = collection;
    reversedSequence.size = collection.size;
    reversedSequence.reverse = function() {
      return collection;
    };
    if (collection.flip) {
      reversedSequence.flip = function() {
        var flipSequence = flipFactory(collection);
        flipSequence.reverse = function() {
          return collection.flip();
        };
        return flipSequence;
      };
    }
    reversedSequence.get = function(key, notSetValue) {
      return collection.get(useKeys ? key : -1 - key, notSetValue);
    };
    reversedSequence.has = function(key) {
      return collection.has(useKeys ? key : -1 - key);
    };
    reversedSequence.includes = function(value) {
      return collection.includes(value);
    };
    reversedSequence.cacheResult = cacheResultThrough;
    reversedSequence.__iterate = function(fn, reverse) {
      var this$1$12 = this;
      var i2 = 0;
      reverse && ensureSize(collection);
      return collection.__iterate(function(v2, k) {
        return fn(v2, useKeys ? k : reverse ? this$1$12.size - ++i2 : i2++, this$1$12);
      }, !reverse);
    };
    reversedSequence.__iterator = function(type, reverse) {
      var i2 = 0;
      reverse && ensureSize(collection);
      var iterator = collection.__iterator(ITERATE_ENTRIES, !reverse);
      return new Iterator(function() {
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        return iteratorValue(type, useKeys ? entry[0] : reverse ? this$1$1.size - ++i2 : i2++, entry[1], step);
      });
    };
    return reversedSequence;
  }
  function filterFactory(collection, predicate, context, useKeys) {
    var filterSequence = makeSequence(collection);
    if (useKeys) {
      filterSequence.has = function(key) {
        var v2 = collection.get(key, NOT_SET);
        return v2 !== NOT_SET && !!predicate.call(context, v2, key, collection);
      };
      filterSequence.get = function(key, notSetValue) {
        var v2 = collection.get(key, NOT_SET);
        return v2 !== NOT_SET && predicate.call(context, v2, key, collection) ? v2 : notSetValue;
      };
    }
    filterSequence.__iterateUncached = function(fn, reverse) {
      var this$1$1 = this;
      var iterations = 0;
      collection.__iterate(function(v2, k, c2) {
        if (predicate.call(context, v2, k, c2)) {
          iterations++;
          return fn(v2, useKeys ? k : iterations - 1, this$1$1);
        }
      }, reverse);
      return iterations;
    };
    filterSequence.__iteratorUncached = function(type, reverse) {
      var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
      var iterations = 0;
      return new Iterator(function() {
        while (true) {
          var step = iterator.next();
          if (step.done) {
            return step;
          }
          var entry = step.value;
          var key = entry[0];
          var value = entry[1];
          if (predicate.call(context, value, key, collection)) {
            return iteratorValue(type, useKeys ? key : iterations++, value, step);
          }
        }
      });
    };
    return filterSequence;
  }
  function countByFactory(collection, grouper, context) {
    var groups = Map$1().asMutable();
    collection.__iterate(function(v2, k) {
      groups.update(grouper.call(context, v2, k, collection), 0, function(a2) {
        return a2 + 1;
      });
    });
    return groups.asImmutable();
  }
  function groupByFactory(collection, grouper, context) {
    var isKeyedIter = isKeyed(collection);
    var groups = (isOrdered(collection) ? OrderedMap() : Map$1()).asMutable();
    collection.__iterate(function(v2, k) {
      groups.update(grouper.call(context, v2, k, collection), function(a2) {
        return a2 = a2 || [], a2.push(isKeyedIter ? [k, v2] : v2), a2;
      });
    });
    var coerce = collectionClass(collection);
    return groups.map(function(arr) {
      return reify(collection, coerce(arr));
    }).asImmutable();
  }
  function sliceFactory(collection, begin, end, useKeys) {
    var originalSize = collection.size;
    if (wholeSlice(begin, end, originalSize)) {
      return collection;
    }
    var resolvedBegin = resolveBegin(begin, originalSize);
    var resolvedEnd = resolveEnd(end, originalSize);
    if (resolvedBegin !== resolvedBegin || resolvedEnd !== resolvedEnd) {
      return sliceFactory(collection.toSeq().cacheResult(), begin, end, useKeys);
    }
    var resolvedSize = resolvedEnd - resolvedBegin;
    var sliceSize;
    if (resolvedSize === resolvedSize) {
      sliceSize = resolvedSize < 0 ? 0 : resolvedSize;
    }
    var sliceSeq = makeSequence(collection);
    sliceSeq.size = sliceSize === 0 ? sliceSize : collection.size && sliceSize || void 0;
    if (!useKeys && isSeq(collection) && sliceSize >= 0) {
      sliceSeq.get = function(index, notSetValue) {
        index = wrapIndex(this, index);
        return index >= 0 && index < sliceSize ? collection.get(index + resolvedBegin, notSetValue) : notSetValue;
      };
    }
    sliceSeq.__iterateUncached = function(fn, reverse) {
      var this$1$1 = this;
      if (sliceSize === 0) {
        return 0;
      }
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var skipped = 0;
      var isSkipping = true;
      var iterations = 0;
      collection.__iterate(function(v2, k) {
        if (!(isSkipping && (isSkipping = skipped++ < resolvedBegin))) {
          iterations++;
          return fn(v2, useKeys ? k : iterations - 1, this$1$1) !== false && iterations !== sliceSize;
        }
      });
      return iterations;
    };
    sliceSeq.__iteratorUncached = function(type, reverse) {
      if (sliceSize !== 0 && reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      if (sliceSize === 0) {
        return new Iterator(iteratorDone);
      }
      var iterator = collection.__iterator(type, reverse);
      var skipped = 0;
      var iterations = 0;
      return new Iterator(function() {
        while (skipped++ < resolvedBegin) {
          iterator.next();
        }
        if (++iterations > sliceSize) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (useKeys || type === ITERATE_VALUES || step.done) {
          return step;
        }
        if (type === ITERATE_KEYS) {
          return iteratorValue(type, iterations - 1, void 0, step);
        }
        return iteratorValue(type, iterations - 1, step.value[1], step);
      });
    };
    return sliceSeq;
  }
  function takeWhileFactory(collection, predicate, context) {
    var takeSequence = makeSequence(collection);
    takeSequence.__iterateUncached = function(fn, reverse) {
      var this$1$1 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterations = 0;
      collection.__iterate(function(v2, k, c2) {
        return predicate.call(context, v2, k, c2) && ++iterations && fn(v2, k, this$1$1);
      });
      return iterations;
    };
    takeSequence.__iteratorUncached = function(type, reverse) {
      var this$1$1 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
      var iterating = true;
      return new Iterator(function() {
        if (!iterating) {
          return iteratorDone();
        }
        var step = iterator.next();
        if (step.done) {
          return step;
        }
        var entry = step.value;
        var k = entry[0];
        var v2 = entry[1];
        if (!predicate.call(context, v2, k, this$1$1)) {
          iterating = false;
          return iteratorDone();
        }
        return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v2, step);
      });
    };
    return takeSequence;
  }
  function skipWhileFactory(collection, predicate, context, useKeys) {
    var skipSequence = makeSequence(collection);
    skipSequence.__iterateUncached = function(fn, reverse) {
      var this$1$1 = this;
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var isSkipping = true;
      var iterations = 0;
      collection.__iterate(function(v2, k, c2) {
        if (!(isSkipping && (isSkipping = predicate.call(context, v2, k, c2)))) {
          iterations++;
          return fn(v2, useKeys ? k : iterations - 1, this$1$1);
        }
      });
      return iterations;
    };
    skipSequence.__iteratorUncached = function(type, reverse) {
      var this$1$1 = this;
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = collection.__iterator(ITERATE_ENTRIES, reverse);
      var skipping = true;
      var iterations = 0;
      return new Iterator(function() {
        var step;
        var k;
        var v2;
        do {
          step = iterator.next();
          if (step.done) {
            if (useKeys || type === ITERATE_VALUES) {
              return step;
            }
            if (type === ITERATE_KEYS) {
              return iteratorValue(type, iterations++, void 0, step);
            }
            return iteratorValue(type, iterations++, step.value[1], step);
          }
          var entry = step.value;
          k = entry[0];
          v2 = entry[1];
          skipping && (skipping = predicate.call(context, v2, k, this$1$1));
        } while (skipping);
        return type === ITERATE_ENTRIES ? step : iteratorValue(type, k, v2, step);
      });
    };
    return skipSequence;
  }
  function concatFactory(collection, values) {
    var isKeyedCollection = isKeyed(collection);
    var iters = [collection].concat(values).map(function(v2) {
      if (!isCollection(v2)) {
        v2 = isKeyedCollection ? keyedSeqFromValue(v2) : indexedSeqFromValue(Array.isArray(v2) ? v2 : [v2]);
      } else if (isKeyedCollection) {
        v2 = KeyedCollection(v2);
      }
      return v2;
    }).filter(function(v2) {
      return v2.size !== 0;
    });
    if (iters.length === 0) {
      return collection;
    }
    if (iters.length === 1) {
      var singleton = iters[0];
      if (singleton === collection || isKeyedCollection && isKeyed(singleton) || isIndexed(collection) && isIndexed(singleton)) {
        return singleton;
      }
    }
    var concatSeq = new ArraySeq(iters);
    if (isKeyedCollection) {
      concatSeq = concatSeq.toKeyedSeq();
    } else if (!isIndexed(collection)) {
      concatSeq = concatSeq.toSetSeq();
    }
    concatSeq = concatSeq.flatten(true);
    concatSeq.size = iters.reduce(function(sum, seq) {
      if (sum !== void 0) {
        var size = seq.size;
        if (size !== void 0) {
          return sum + size;
        }
      }
    }, 0);
    return concatSeq;
  }
  function flattenFactory(collection, depth, useKeys) {
    var flatSequence = makeSequence(collection);
    flatSequence.__iterateUncached = function(fn, reverse) {
      if (reverse) {
        return this.cacheResult().__iterate(fn, reverse);
      }
      var iterations = 0;
      var stopped = false;
      function flatDeep(iter, currentDepth) {
        iter.__iterate(function(v2, k) {
          if ((!depth || currentDepth < depth) && isCollection(v2)) {
            flatDeep(v2, currentDepth + 1);
          } else {
            iterations++;
            if (fn(v2, useKeys ? k : iterations - 1, flatSequence) === false) {
              stopped = true;
            }
          }
          return !stopped;
        }, reverse);
      }
      flatDeep(collection, 0);
      return iterations;
    };
    flatSequence.__iteratorUncached = function(type, reverse) {
      if (reverse) {
        return this.cacheResult().__iterator(type, reverse);
      }
      var iterator = collection.__iterator(type, reverse);
      var stack = [];
      var iterations = 0;
      return new Iterator(function() {
        while (iterator) {
          var step = iterator.next();
          if (step.done !== false) {
            iterator = stack.pop();
            continue;
          }
          var v2 = step.value;
          if (type === ITERATE_ENTRIES) {
            v2 = v2[1];
          }
          if ((!depth || stack.length < depth) && isCollection(v2)) {
            stack.push(iterator);
            iterator = v2.__iterator(type, reverse);
          } else {
            return useKeys ? step : iteratorValue(type, iterations++, v2, step);
          }
        }
        return iteratorDone();
      });
    };
    return flatSequence;
  }
  function flatMapFactory(collection, mapper, context) {
    var coerce = collectionClass(collection);
    return collection.toSeq().map(function(v2, k) {
      return coerce(mapper.call(context, v2, k, collection));
    }).flatten(true);
  }
  function interposeFactory(collection, separator) {
    var interposedSequence = makeSequence(collection);
    interposedSequence.size = collection.size && collection.size * 2 - 1;
    interposedSequence.__iterateUncached = function(fn, reverse) {
      var this$1$1 = this;
      var iterations = 0;
      collection.__iterate(function(v2) {
        return (!iterations || fn(separator, iterations++, this$1$1) !== false) && fn(v2, iterations++, this$1$1) !== false;
      }, reverse);
      return iterations;
    };
    interposedSequence.__iteratorUncached = function(type, reverse) {
      var iterator = collection.__iterator(ITERATE_VALUES, reverse);
      var iterations = 0;
      var step;
      return new Iterator(function() {
        if (!step || iterations % 2) {
          step = iterator.next();
          if (step.done) {
            return step;
          }
        }
        return iterations % 2 ? iteratorValue(type, iterations++, separator) : iteratorValue(type, iterations++, step.value, step);
      });
    };
    return interposedSequence;
  }
  function sortFactory(collection, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    var isKeyedCollection = isKeyed(collection);
    var index = 0;
    var entries = collection.toSeq().map(function(v2, k) {
      return [k, v2, index++, mapper ? mapper(v2, k, collection) : v2];
    }).valueSeq().toArray();
    entries.sort(function(a2, b2) {
      return comparator(a2[3], b2[3]) || a2[2] - b2[2];
    }).forEach(isKeyedCollection ? function(v2, i2) {
      entries[i2].length = 2;
    } : function(v2, i2) {
      entries[i2] = v2[1];
    });
    return isKeyedCollection ? KeyedSeq(entries) : isIndexed(collection) ? IndexedSeq(entries) : SetSeq(entries);
  }
  function maxFactory(collection, comparator, mapper) {
    if (!comparator) {
      comparator = defaultComparator;
    }
    if (mapper) {
      var entry = collection.toSeq().map(function(v2, k) {
        return [v2, mapper(v2, k, collection)];
      }).reduce(function(a2, b2) {
        return maxCompare(comparator, a2[1], b2[1]) ? b2 : a2;
      });
      return entry && entry[0];
    }
    return collection.reduce(function(a2, b2) {
      return maxCompare(comparator, a2, b2) ? b2 : a2;
    });
  }
  function maxCompare(comparator, a2, b2) {
    var comp = comparator(b2, a2);
    return comp === 0 && b2 !== a2 && (b2 === void 0 || b2 === null || b2 !== b2) || comp > 0;
  }
  function zipWithFactory(keyIter, zipper, iters, zipAll) {
    var zipSequence = makeSequence(keyIter);
    var sizes = new ArraySeq(iters).map(function(i2) {
      return i2.size;
    });
    zipSequence.size = zipAll ? sizes.max() : sizes.min();
    zipSequence.__iterate = function(fn, reverse) {
      var iterator = this.__iterator(ITERATE_VALUES, reverse);
      var step;
      var iterations = 0;
      while (!(step = iterator.next()).done) {
        if (fn(step.value, iterations++, this) === false) {
          break;
        }
      }
      return iterations;
    };
    zipSequence.__iteratorUncached = function(type, reverse) {
      var iterators = iters.map(function(i2) {
        return i2 = Collection(i2), getIterator(reverse ? i2.reverse() : i2);
      });
      var iterations = 0;
      var isDone = false;
      return new Iterator(function() {
        var steps;
        if (!isDone) {
          steps = iterators.map(function(i2) {
            return i2.next();
          });
          isDone = zipAll ? steps.every(function(s2) {
            return s2.done;
          }) : steps.some(function(s2) {
            return s2.done;
          });
        }
        if (isDone) {
          return iteratorDone();
        }
        return iteratorValue(type, iterations++, zipper.apply(null, steps.map(function(s2) {
          return s2.value;
        })));
      });
    };
    return zipSequence;
  }
  function reify(iter, seq) {
    return iter === seq ? iter : isSeq(iter) ? seq : iter.constructor(seq);
  }
  function validateEntry(entry) {
    if (entry !== Object(entry)) {
      throw new TypeError("Expected [K, V] tuple: " + entry);
    }
  }
  function collectionClass(collection) {
    return isKeyed(collection) ? KeyedCollection : isIndexed(collection) ? IndexedCollection : SetCollection;
  }
  function makeSequence(collection) {
    return Object.create((isKeyed(collection) ? KeyedSeq : isIndexed(collection) ? IndexedSeq : SetSeq).prototype);
  }
  function cacheResultThrough() {
    if (this._iter.cacheResult) {
      this._iter.cacheResult();
      this.size = this._iter.size;
      return this;
    }
    return Seq.prototype.cacheResult.call(this);
  }
  function defaultComparator(a2, b2) {
    if (a2 === void 0 && b2 === void 0) {
      return 0;
    }
    if (a2 === void 0) {
      return 1;
    }
    if (b2 === void 0) {
      return -1;
    }
    return a2 > b2 ? 1 : a2 < b2 ? -1 : 0;
  }
  function arrCopy(arr, offset) {
    offset = offset || 0;
    var len = Math.max(0, arr.length - offset);
    var newArr = new Array(len);
    for (var ii = 0; ii < len; ii++) {
      newArr[ii] = arr[ii + offset];
    }
    return newArr;
  }
  function invariant(condition, error) {
    if (!condition) {
      throw new Error(error);
    }
  }
  function assertNotInfinite(size) {
    invariant(size !== Infinity, "Cannot perform this action with an infinite size.");
  }
  function coerceKeyPath(keyPath) {
    if (isArrayLike(keyPath) && typeof keyPath !== "string") {
      return keyPath;
    }
    if (isOrdered(keyPath)) {
      return keyPath.toArray();
    }
    throw new TypeError("Invalid keyPath: expected Ordered Collection or Array: " + keyPath);
  }
  var toString = Object.prototype.toString;
  function isPlainObject(value) {
    if (!value || typeof value !== "object" || toString.call(value) !== "[object Object]") {
      return false;
    }
    var proto = Object.getPrototypeOf(value);
    if (proto === null) {
      return true;
    }
    var parentProto = proto;
    var nextProto = Object.getPrototypeOf(proto);
    while (nextProto !== null) {
      parentProto = nextProto;
      nextProto = Object.getPrototypeOf(parentProto);
    }
    return parentProto === proto;
  }
  function isDataStructure(value) {
    return typeof value === "object" && (isImmutable(value) || Array.isArray(value) || isPlainObject(value));
  }
  function quoteString(value) {
    try {
      return typeof value === "string" ? JSON.stringify(value) : String(value);
    } catch (_ignoreError) {
      return JSON.stringify(value);
    }
  }
  function has(collection, key) {
    return isImmutable(collection) ? collection.has(key) : isDataStructure(collection) && hasOwnProperty.call(collection, key);
  }
  function get(collection, key, notSetValue) {
    return isImmutable(collection) ? collection.get(key, notSetValue) : !has(collection, key) ? notSetValue : typeof collection.get === "function" ? collection.get(key) : collection[key];
  }
  function shallowCopy(from) {
    if (Array.isArray(from)) {
      return arrCopy(from);
    }
    var to = {};
    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key];
      }
    }
    return to;
  }
  function remove(collection, key) {
    if (!isDataStructure(collection)) {
      throw new TypeError("Cannot update non-data-structure value: " + collection);
    }
    if (isImmutable(collection)) {
      if (!collection.remove) {
        throw new TypeError("Cannot update immutable value without .remove() method: " + collection);
      }
      return collection.remove(key);
    }
    if (!hasOwnProperty.call(collection, key)) {
      return collection;
    }
    var collectionCopy = shallowCopy(collection);
    if (Array.isArray(collectionCopy)) {
      collectionCopy.splice(key, 1);
    } else {
      delete collectionCopy[key];
    }
    return collectionCopy;
  }
  function set(collection, key, value) {
    if (!isDataStructure(collection)) {
      throw new TypeError("Cannot update non-data-structure value: " + collection);
    }
    if (isImmutable(collection)) {
      if (!collection.set) {
        throw new TypeError("Cannot update immutable value without .set() method: " + collection);
      }
      return collection.set(key, value);
    }
    if (hasOwnProperty.call(collection, key) && value === collection[key]) {
      return collection;
    }
    var collectionCopy = shallowCopy(collection);
    collectionCopy[key] = value;
    return collectionCopy;
  }
  function updateIn$1(collection, keyPath, notSetValue, updater) {
    if (!updater) {
      updater = notSetValue;
      notSetValue = void 0;
    }
    var updatedValue = updateInDeeply(isImmutable(collection), collection, coerceKeyPath(keyPath), 0, notSetValue, updater);
    return updatedValue === NOT_SET ? notSetValue : updatedValue;
  }
  function updateInDeeply(inImmutable, existing, keyPath, i2, notSetValue, updater) {
    var wasNotSet = existing === NOT_SET;
    if (i2 === keyPath.length) {
      var existingValue = wasNotSet ? notSetValue : existing;
      var newValue = updater(existingValue);
      return newValue === existingValue ? existing : newValue;
    }
    if (!wasNotSet && !isDataStructure(existing)) {
      throw new TypeError("Cannot update within non-data-structure value in path [" + keyPath.slice(0, i2).map(quoteString) + "]: " + existing);
    }
    var key = keyPath[i2];
    var nextExisting = wasNotSet ? NOT_SET : get(existing, key, NOT_SET);
    var nextUpdated = updateInDeeply(nextExisting === NOT_SET ? inImmutable : isImmutable(nextExisting), nextExisting, keyPath, i2 + 1, notSetValue, updater);
    return nextUpdated === nextExisting ? existing : nextUpdated === NOT_SET ? remove(existing, key) : set(wasNotSet ? inImmutable ? emptyMap() : {} : existing, key, nextUpdated);
  }
  function setIn$1(collection, keyPath, value) {
    return updateIn$1(collection, keyPath, NOT_SET, function() {
      return value;
    });
  }
  function setIn(keyPath, v2) {
    return setIn$1(this, keyPath, v2);
  }
  function removeIn(collection, keyPath) {
    return updateIn$1(collection, keyPath, function() {
      return NOT_SET;
    });
  }
  function deleteIn(keyPath) {
    return removeIn(this, keyPath);
  }
  function update$1(collection, key, notSetValue, updater) {
    return updateIn$1(collection, [key], notSetValue, updater);
  }
  function update(key, notSetValue, updater) {
    return arguments.length === 1 ? key(this) : update$1(this, key, notSetValue, updater);
  }
  function updateIn(keyPath, notSetValue, updater) {
    return updateIn$1(this, keyPath, notSetValue, updater);
  }
  function merge$1() {
    var iters = [], len = arguments.length;
    while (len--)
      iters[len] = arguments[len];
    return mergeIntoKeyedWith(this, iters);
  }
  function mergeWith$1(merger) {
    var iters = [], len = arguments.length - 1;
    while (len-- > 0)
      iters[len] = arguments[len + 1];
    if (typeof merger !== "function") {
      throw new TypeError("Invalid merger function: " + merger);
    }
    return mergeIntoKeyedWith(this, iters, merger);
  }
  function mergeIntoKeyedWith(collection, collections, merger) {
    var iters = [];
    for (var ii = 0; ii < collections.length; ii++) {
      var collection$1 = KeyedCollection(collections[ii]);
      if (collection$1.size !== 0) {
        iters.push(collection$1);
      }
    }
    if (iters.length === 0) {
      return collection;
    }
    if (collection.toSeq().size === 0 && !collection.__ownerID && iters.length === 1) {
      return collection.constructor(iters[0]);
    }
    return collection.withMutations(function(collection2) {
      var mergeIntoCollection = merger ? function(value, key) {
        update$1(collection2, key, NOT_SET, function(oldVal) {
          return oldVal === NOT_SET ? value : merger(oldVal, value, key);
        });
      } : function(value, key) {
        collection2.set(key, value);
      };
      for (var ii2 = 0; ii2 < iters.length; ii2++) {
        iters[ii2].forEach(mergeIntoCollection);
      }
    });
  }
  function mergeDeepWithSources(collection, sources, merger) {
    return mergeWithSources(collection, sources, deepMergerWith(merger));
  }
  function mergeWithSources(collection, sources, merger) {
    if (!isDataStructure(collection)) {
      throw new TypeError("Cannot merge into non-data-structure value: " + collection);
    }
    if (isImmutable(collection)) {
      return typeof merger === "function" && collection.mergeWith ? collection.mergeWith.apply(collection, [merger].concat(sources)) : collection.merge ? collection.merge.apply(collection, sources) : collection.concat.apply(collection, sources);
    }
    var isArray = Array.isArray(collection);
    var merged = collection;
    var Collection2 = isArray ? IndexedCollection : KeyedCollection;
    var mergeItem = isArray ? function(value) {
      if (merged === collection) {
        merged = shallowCopy(merged);
      }
      merged.push(value);
    } : function(value, key) {
      var hasVal = hasOwnProperty.call(merged, key);
      var nextVal = hasVal && merger ? merger(merged[key], value, key) : value;
      if (!hasVal || nextVal !== merged[key]) {
        if (merged === collection) {
          merged = shallowCopy(merged);
        }
        merged[key] = nextVal;
      }
    };
    for (var i2 = 0; i2 < sources.length; i2++) {
      Collection2(sources[i2]).forEach(mergeItem);
    }
    return merged;
  }
  function deepMergerWith(merger) {
    function deepMerger(oldValue, newValue, key) {
      return isDataStructure(oldValue) && isDataStructure(newValue) && areMergeable(oldValue, newValue) ? mergeWithSources(oldValue, [newValue], deepMerger) : merger ? merger(oldValue, newValue, key) : newValue;
    }
    return deepMerger;
  }
  function areMergeable(oldDataStructure, newDataStructure) {
    var oldSeq = Seq(oldDataStructure);
    var newSeq = Seq(newDataStructure);
    return isIndexed(oldSeq) === isIndexed(newSeq) && isKeyed(oldSeq) === isKeyed(newSeq);
  }
  function mergeDeep() {
    var iters = [], len = arguments.length;
    while (len--)
      iters[len] = arguments[len];
    return mergeDeepWithSources(this, iters);
  }
  function mergeDeepWith(merger) {
    var iters = [], len = arguments.length - 1;
    while (len-- > 0)
      iters[len] = arguments[len + 1];
    return mergeDeepWithSources(this, iters, merger);
  }
  function mergeIn(keyPath) {
    var iters = [], len = arguments.length - 1;
    while (len-- > 0)
      iters[len] = arguments[len + 1];
    return updateIn$1(this, keyPath, emptyMap(), function(m2) {
      return mergeWithSources(m2, iters);
    });
  }
  function mergeDeepIn(keyPath) {
    var iters = [], len = arguments.length - 1;
    while (len-- > 0)
      iters[len] = arguments[len + 1];
    return updateIn$1(this, keyPath, emptyMap(), function(m2) {
      return mergeDeepWithSources(m2, iters);
    });
  }
  function withMutations(fn) {
    var mutable = this.asMutable();
    fn(mutable);
    return mutable.wasAltered() ? mutable.__ensureOwner(this.__ownerID) : this;
  }
  function asMutable() {
    return this.__ownerID ? this : this.__ensureOwner(new OwnerID());
  }
  function asImmutable() {
    return this.__ensureOwner();
  }
  function wasAltered() {
    return this.__altered;
  }
  var Map$1 = /* @__PURE__ */ function(KeyedCollection2) {
    function Map2(value) {
      return value === void 0 || value === null ? emptyMap() : isMap(value) && !isOrdered(value) ? value : emptyMap().withMutations(function(map2) {
        var iter = KeyedCollection2(value);
        assertNotInfinite(iter.size);
        iter.forEach(function(v2, k) {
          return map2.set(k, v2);
        });
      });
    }
    if (KeyedCollection2)
      Map2.__proto__ = KeyedCollection2;
    Map2.prototype = Object.create(KeyedCollection2 && KeyedCollection2.prototype);
    Map2.prototype.constructor = Map2;
    Map2.of = function of() {
      var keyValues = [], len = arguments.length;
      while (len--)
        keyValues[len] = arguments[len];
      return emptyMap().withMutations(function(map2) {
        for (var i2 = 0; i2 < keyValues.length; i2 += 2) {
          if (i2 + 1 >= keyValues.length) {
            throw new Error("Missing value for key: " + keyValues[i2]);
          }
          map2.set(keyValues[i2], keyValues[i2 + 1]);
        }
      });
    };
    Map2.prototype.toString = function toString2() {
      return this.__toString("Map {", "}");
    };
    Map2.prototype.get = function get2(k, notSetValue) {
      return this._root ? this._root.get(0, void 0, k, notSetValue) : notSetValue;
    };
    Map2.prototype.set = function set2(k, v2) {
      return updateMap(this, k, v2);
    };
    Map2.prototype.remove = function remove2(k) {
      return updateMap(this, k, NOT_SET);
    };
    Map2.prototype.deleteAll = function deleteAll(keys) {
      var collection = Collection(keys);
      if (collection.size === 0) {
        return this;
      }
      return this.withMutations(function(map2) {
        collection.forEach(function(key) {
          return map2.remove(key);
        });
      });
    };
    Map2.prototype.clear = function clear() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._root = null;
        this.__hash = void 0;
        this.__altered = true;
        return this;
      }
      return emptyMap();
    };
    Map2.prototype.sort = function sort2(comparator) {
      return OrderedMap(sortFactory(this, comparator));
    };
    Map2.prototype.sortBy = function sortBy(mapper, comparator) {
      return OrderedMap(sortFactory(this, comparator, mapper));
    };
    Map2.prototype.map = function map2(mapper, context) {
      var this$1$1 = this;
      return this.withMutations(function(map3) {
        map3.forEach(function(value, key) {
          map3.set(key, mapper.call(context, value, key, this$1$1));
        });
      });
    };
    Map2.prototype.__iterator = function __iterator(type, reverse) {
      return new MapIterator(this, type, reverse);
    };
    Map2.prototype.__iterate = function __iterate(fn, reverse) {
      var this$1$1 = this;
      var iterations = 0;
      this._root && this._root.iterate(function(entry) {
        iterations++;
        return fn(entry[1], entry[0], this$1$1);
      }, reverse);
      return iterations;
    };
    Map2.prototype.__ensureOwner = function __ensureOwner(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        if (this.size === 0) {
          return emptyMap();
        }
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeMap(this.size, this._root, ownerID, this.__hash);
    };
    return Map2;
  }(KeyedCollection);
  Map$1.isMap = isMap;
  var MapPrototype = Map$1.prototype;
  MapPrototype[IS_MAP_SYMBOL] = true;
  MapPrototype[DELETE] = MapPrototype.remove;
  MapPrototype.removeAll = MapPrototype.deleteAll;
  MapPrototype.setIn = setIn;
  MapPrototype.removeIn = MapPrototype.deleteIn = deleteIn;
  MapPrototype.update = update;
  MapPrototype.updateIn = updateIn;
  MapPrototype.merge = MapPrototype.concat = merge$1;
  MapPrototype.mergeWith = mergeWith$1;
  MapPrototype.mergeDeep = mergeDeep;
  MapPrototype.mergeDeepWith = mergeDeepWith;
  MapPrototype.mergeIn = mergeIn;
  MapPrototype.mergeDeepIn = mergeDeepIn;
  MapPrototype.withMutations = withMutations;
  MapPrototype.wasAltered = wasAltered;
  MapPrototype.asImmutable = asImmutable;
  MapPrototype["@@transducer/init"] = MapPrototype.asMutable = asMutable;
  MapPrototype["@@transducer/step"] = function(result, arr) {
    return result.set(arr[0], arr[1]);
  };
  MapPrototype["@@transducer/result"] = function(obj) {
    return obj.asImmutable();
  };
  var ArrayMapNode = function ArrayMapNode2(ownerID, entries) {
    this.ownerID = ownerID;
    this.entries = entries;
  };
  ArrayMapNode.prototype.get = function get2(shift, keyHash, key, notSetValue) {
    var entries = this.entries;
    for (var ii = 0, len = entries.length; ii < len; ii++) {
      if (is(key, entries[ii][0])) {
        return entries[ii][1];
      }
    }
    return notSetValue;
  };
  ArrayMapNode.prototype.update = function update2(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    var removed = value === NOT_SET;
    var entries = this.entries;
    var idx = 0;
    var len = entries.length;
    for (; idx < len; idx++) {
      if (is(key, entries[idx][0])) {
        break;
      }
    }
    var exists = idx < len;
    if (exists ? entries[idx][1] === value : removed) {
      return this;
    }
    SetRef(didAlter);
    (removed || !exists) && SetRef(didChangeSize);
    if (removed && entries.length === 1) {
      return;
    }
    if (!exists && !removed && entries.length >= MAX_ARRAY_MAP_SIZE) {
      return createNodes(ownerID, entries, key, value);
    }
    var isEditable = ownerID && ownerID === this.ownerID;
    var newEntries = isEditable ? entries : arrCopy(entries);
    if (exists) {
      if (removed) {
        idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
      } else {
        newEntries[idx] = [key, value];
      }
    } else {
      newEntries.push([key, value]);
    }
    if (isEditable) {
      this.entries = newEntries;
      return this;
    }
    return new ArrayMapNode(ownerID, newEntries);
  };
  var BitmapIndexedNode = function BitmapIndexedNode2(ownerID, bitmap, nodes) {
    this.ownerID = ownerID;
    this.bitmap = bitmap;
    this.nodes = nodes;
  };
  BitmapIndexedNode.prototype.get = function get2(shift, keyHash, key, notSetValue) {
    if (keyHash === void 0) {
      keyHash = hash(key);
    }
    var bit = 1 << ((shift === 0 ? keyHash : keyHash >>> shift) & MASK);
    var bitmap = this.bitmap;
    return (bitmap & bit) === 0 ? notSetValue : this.nodes[popCount(bitmap & bit - 1)].get(shift + SHIFT, keyHash, key, notSetValue);
  };
  BitmapIndexedNode.prototype.update = function update2(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (keyHash === void 0) {
      keyHash = hash(key);
    }
    var keyHashFrag = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
    var bit = 1 << keyHashFrag;
    var bitmap = this.bitmap;
    var exists = (bitmap & bit) !== 0;
    if (!exists && value === NOT_SET) {
      return this;
    }
    var idx = popCount(bitmap & bit - 1);
    var nodes = this.nodes;
    var node = exists ? nodes[idx] : void 0;
    var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
    if (newNode === node) {
      return this;
    }
    if (!exists && newNode && nodes.length >= MAX_BITMAP_INDEXED_SIZE) {
      return expandNodes(ownerID, nodes, bitmap, keyHashFrag, newNode);
    }
    if (exists && !newNode && nodes.length === 2 && isLeafNode(nodes[idx ^ 1])) {
      return nodes[idx ^ 1];
    }
    if (exists && newNode && nodes.length === 1 && isLeafNode(newNode)) {
      return newNode;
    }
    var isEditable = ownerID && ownerID === this.ownerID;
    var newBitmap = exists ? newNode ? bitmap : bitmap ^ bit : bitmap | bit;
    var newNodes = exists ? newNode ? setAt(nodes, idx, newNode, isEditable) : spliceOut(nodes, idx, isEditable) : spliceIn(nodes, idx, newNode, isEditable);
    if (isEditable) {
      this.bitmap = newBitmap;
      this.nodes = newNodes;
      return this;
    }
    return new BitmapIndexedNode(ownerID, newBitmap, newNodes);
  };
  var HashArrayMapNode = function HashArrayMapNode2(ownerID, count, nodes) {
    this.ownerID = ownerID;
    this.count = count;
    this.nodes = nodes;
  };
  HashArrayMapNode.prototype.get = function get2(shift, keyHash, key, notSetValue) {
    if (keyHash === void 0) {
      keyHash = hash(key);
    }
    var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
    var node = this.nodes[idx];
    return node ? node.get(shift + SHIFT, keyHash, key, notSetValue) : notSetValue;
  };
  HashArrayMapNode.prototype.update = function update2(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (keyHash === void 0) {
      keyHash = hash(key);
    }
    var idx = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
    var removed = value === NOT_SET;
    var nodes = this.nodes;
    var node = nodes[idx];
    if (removed && !node) {
      return this;
    }
    var newNode = updateNode(node, ownerID, shift + SHIFT, keyHash, key, value, didChangeSize, didAlter);
    if (newNode === node) {
      return this;
    }
    var newCount = this.count;
    if (!node) {
      newCount++;
    } else if (!newNode) {
      newCount--;
      if (newCount < MIN_HASH_ARRAY_MAP_SIZE) {
        return packNodes(ownerID, nodes, newCount, idx);
      }
    }
    var isEditable = ownerID && ownerID === this.ownerID;
    var newNodes = setAt(nodes, idx, newNode, isEditable);
    if (isEditable) {
      this.count = newCount;
      this.nodes = newNodes;
      return this;
    }
    return new HashArrayMapNode(ownerID, newCount, newNodes);
  };
  var HashCollisionNode = function HashCollisionNode2(ownerID, keyHash, entries) {
    this.ownerID = ownerID;
    this.keyHash = keyHash;
    this.entries = entries;
  };
  HashCollisionNode.prototype.get = function get2(shift, keyHash, key, notSetValue) {
    var entries = this.entries;
    for (var ii = 0, len = entries.length; ii < len; ii++) {
      if (is(key, entries[ii][0])) {
        return entries[ii][1];
      }
    }
    return notSetValue;
  };
  HashCollisionNode.prototype.update = function update2(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (keyHash === void 0) {
      keyHash = hash(key);
    }
    var removed = value === NOT_SET;
    if (keyHash !== this.keyHash) {
      if (removed) {
        return this;
      }
      SetRef(didAlter);
      SetRef(didChangeSize);
      return mergeIntoNode(this, ownerID, shift, keyHash, [key, value]);
    }
    var entries = this.entries;
    var idx = 0;
    var len = entries.length;
    for (; idx < len; idx++) {
      if (is(key, entries[idx][0])) {
        break;
      }
    }
    var exists = idx < len;
    if (exists ? entries[idx][1] === value : removed) {
      return this;
    }
    SetRef(didAlter);
    (removed || !exists) && SetRef(didChangeSize);
    if (removed && len === 2) {
      return new ValueNode(ownerID, this.keyHash, entries[idx ^ 1]);
    }
    var isEditable = ownerID && ownerID === this.ownerID;
    var newEntries = isEditable ? entries : arrCopy(entries);
    if (exists) {
      if (removed) {
        idx === len - 1 ? newEntries.pop() : newEntries[idx] = newEntries.pop();
      } else {
        newEntries[idx] = [key, value];
      }
    } else {
      newEntries.push([key, value]);
    }
    if (isEditable) {
      this.entries = newEntries;
      return this;
    }
    return new HashCollisionNode(ownerID, this.keyHash, newEntries);
  };
  var ValueNode = function ValueNode2(ownerID, keyHash, entry) {
    this.ownerID = ownerID;
    this.keyHash = keyHash;
    this.entry = entry;
  };
  ValueNode.prototype.get = function get2(shift, keyHash, key, notSetValue) {
    return is(key, this.entry[0]) ? this.entry[1] : notSetValue;
  };
  ValueNode.prototype.update = function update2(ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    var removed = value === NOT_SET;
    var keyMatch = is(key, this.entry[0]);
    if (keyMatch ? value === this.entry[1] : removed) {
      return this;
    }
    SetRef(didAlter);
    if (removed) {
      SetRef(didChangeSize);
      return;
    }
    if (keyMatch) {
      if (ownerID && ownerID === this.ownerID) {
        this.entry[1] = value;
        return this;
      }
      return new ValueNode(ownerID, this.keyHash, [key, value]);
    }
    SetRef(didChangeSize);
    return mergeIntoNode(this, ownerID, shift, hash(key), [key, value]);
  };
  ArrayMapNode.prototype.iterate = HashCollisionNode.prototype.iterate = function(fn, reverse) {
    var entries = this.entries;
    for (var ii = 0, maxIndex = entries.length - 1; ii <= maxIndex; ii++) {
      if (fn(entries[reverse ? maxIndex - ii : ii]) === false) {
        return false;
      }
    }
  };
  BitmapIndexedNode.prototype.iterate = HashArrayMapNode.prototype.iterate = function(fn, reverse) {
    var nodes = this.nodes;
    for (var ii = 0, maxIndex = nodes.length - 1; ii <= maxIndex; ii++) {
      var node = nodes[reverse ? maxIndex - ii : ii];
      if (node && node.iterate(fn, reverse) === false) {
        return false;
      }
    }
  };
  ValueNode.prototype.iterate = function(fn, reverse) {
    return fn(this.entry);
  };
  var MapIterator = /* @__PURE__ */ function(Iterator2) {
    function MapIterator2(map2, type, reverse) {
      this._type = type;
      this._reverse = reverse;
      this._stack = map2._root && mapIteratorFrame(map2._root);
    }
    if (Iterator2)
      MapIterator2.__proto__ = Iterator2;
    MapIterator2.prototype = Object.create(Iterator2 && Iterator2.prototype);
    MapIterator2.prototype.constructor = MapIterator2;
    MapIterator2.prototype.next = function next() {
      var type = this._type;
      var stack = this._stack;
      while (stack) {
        var node = stack.node;
        var index = stack.index++;
        var maxIndex = void 0;
        if (node.entry) {
          if (index === 0) {
            return mapIteratorValue(type, node.entry);
          }
        } else if (node.entries) {
          maxIndex = node.entries.length - 1;
          if (index <= maxIndex) {
            return mapIteratorValue(type, node.entries[this._reverse ? maxIndex - index : index]);
          }
        } else {
          maxIndex = node.nodes.length - 1;
          if (index <= maxIndex) {
            var subNode = node.nodes[this._reverse ? maxIndex - index : index];
            if (subNode) {
              if (subNode.entry) {
                return mapIteratorValue(type, subNode.entry);
              }
              stack = this._stack = mapIteratorFrame(subNode, stack);
            }
            continue;
          }
        }
        stack = this._stack = this._stack.__prev;
      }
      return iteratorDone();
    };
    return MapIterator2;
  }(Iterator);
  function mapIteratorValue(type, entry) {
    return iteratorValue(type, entry[0], entry[1]);
  }
  function mapIteratorFrame(node, prev) {
    return {
      node,
      index: 0,
      __prev: prev
    };
  }
  function makeMap(size, root, ownerID, hash2) {
    var map2 = Object.create(MapPrototype);
    map2.size = size;
    map2._root = root;
    map2.__ownerID = ownerID;
    map2.__hash = hash2;
    map2.__altered = false;
    return map2;
  }
  var EMPTY_MAP;
  function emptyMap() {
    return EMPTY_MAP || (EMPTY_MAP = makeMap(0));
  }
  function updateMap(map2, k, v2) {
    var newRoot;
    var newSize;
    if (!map2._root) {
      if (v2 === NOT_SET) {
        return map2;
      }
      newSize = 1;
      newRoot = new ArrayMapNode(map2.__ownerID, [[k, v2]]);
    } else {
      var didChangeSize = MakeRef();
      var didAlter = MakeRef();
      newRoot = updateNode(map2._root, map2.__ownerID, 0, void 0, k, v2, didChangeSize, didAlter);
      if (!didAlter.value) {
        return map2;
      }
      newSize = map2.size + (didChangeSize.value ? v2 === NOT_SET ? -1 : 1 : 0);
    }
    if (map2.__ownerID) {
      map2.size = newSize;
      map2._root = newRoot;
      map2.__hash = void 0;
      map2.__altered = true;
      return map2;
    }
    return newRoot ? makeMap(newSize, newRoot) : emptyMap();
  }
  function updateNode(node, ownerID, shift, keyHash, key, value, didChangeSize, didAlter) {
    if (!node) {
      if (value === NOT_SET) {
        return node;
      }
      SetRef(didAlter);
      SetRef(didChangeSize);
      return new ValueNode(ownerID, keyHash, [key, value]);
    }
    return node.update(ownerID, shift, keyHash, key, value, didChangeSize, didAlter);
  }
  function isLeafNode(node) {
    return node.constructor === ValueNode || node.constructor === HashCollisionNode;
  }
  function mergeIntoNode(node, ownerID, shift, keyHash, entry) {
    if (node.keyHash === keyHash) {
      return new HashCollisionNode(ownerID, keyHash, [node.entry, entry]);
    }
    var idx1 = (shift === 0 ? node.keyHash : node.keyHash >>> shift) & MASK;
    var idx2 = (shift === 0 ? keyHash : keyHash >>> shift) & MASK;
    var newNode;
    var nodes = idx1 === idx2 ? [mergeIntoNode(node, ownerID, shift + SHIFT, keyHash, entry)] : (newNode = new ValueNode(ownerID, keyHash, entry), idx1 < idx2 ? [node, newNode] : [newNode, node]);
    return new BitmapIndexedNode(ownerID, 1 << idx1 | 1 << idx2, nodes);
  }
  function createNodes(ownerID, entries, key, value) {
    if (!ownerID) {
      ownerID = new OwnerID();
    }
    var node = new ValueNode(ownerID, hash(key), [key, value]);
    for (var ii = 0; ii < entries.length; ii++) {
      var entry = entries[ii];
      node = node.update(ownerID, 0, void 0, entry[0], entry[1]);
    }
    return node;
  }
  function packNodes(ownerID, nodes, count, excluding) {
    var bitmap = 0;
    var packedII = 0;
    var packedNodes = new Array(count);
    for (var ii = 0, bit = 1, len = nodes.length; ii < len; ii++, bit <<= 1) {
      var node = nodes[ii];
      if (node !== void 0 && ii !== excluding) {
        bitmap |= bit;
        packedNodes[packedII++] = node;
      }
    }
    return new BitmapIndexedNode(ownerID, bitmap, packedNodes);
  }
  function expandNodes(ownerID, nodes, bitmap, including, node) {
    var count = 0;
    var expandedNodes = new Array(SIZE);
    for (var ii = 0; bitmap !== 0; ii++, bitmap >>>= 1) {
      expandedNodes[ii] = bitmap & 1 ? nodes[count++] : void 0;
    }
    expandedNodes[including] = node;
    return new HashArrayMapNode(ownerID, count + 1, expandedNodes);
  }
  function popCount(x) {
    x -= x >> 1 & 1431655765;
    x = (x & 858993459) + (x >> 2 & 858993459);
    x = x + (x >> 4) & 252645135;
    x += x >> 8;
    x += x >> 16;
    return x & 127;
  }
  function setAt(array, idx, val, canEdit) {
    var newArray = canEdit ? array : arrCopy(array);
    newArray[idx] = val;
    return newArray;
  }
  function spliceIn(array, idx, val, canEdit) {
    var newLen = array.length + 1;
    if (canEdit && idx + 1 === newLen) {
      array[idx] = val;
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        newArray[ii] = val;
        after = -1;
      } else {
        newArray[ii] = array[ii + after];
      }
    }
    return newArray;
  }
  function spliceOut(array, idx, canEdit) {
    var newLen = array.length - 1;
    if (canEdit && idx === newLen) {
      array.pop();
      return array;
    }
    var newArray = new Array(newLen);
    var after = 0;
    for (var ii = 0; ii < newLen; ii++) {
      if (ii === idx) {
        after = 1;
      }
      newArray[ii] = array[ii + after];
    }
    return newArray;
  }
  var MAX_ARRAY_MAP_SIZE = SIZE / 4;
  var MAX_BITMAP_INDEXED_SIZE = SIZE / 2;
  var MIN_HASH_ARRAY_MAP_SIZE = SIZE / 4;
  var IS_LIST_SYMBOL = "@@__IMMUTABLE_LIST__@@";
  function isList(maybeList) {
    return Boolean(maybeList && maybeList[IS_LIST_SYMBOL]);
  }
  var List = /* @__PURE__ */ function(IndexedCollection2) {
    function List2(value) {
      var empty = emptyList();
      if (value === void 0 || value === null) {
        return empty;
      }
      if (isList(value)) {
        return value;
      }
      var iter = IndexedCollection2(value);
      var size = iter.size;
      if (size === 0) {
        return empty;
      }
      assertNotInfinite(size);
      if (size > 0 && size < SIZE) {
        return makeList(0, size, SHIFT, null, new VNode(iter.toArray()));
      }
      return empty.withMutations(function(list) {
        list.setSize(size);
        iter.forEach(function(v2, i2) {
          return list.set(i2, v2);
        });
      });
    }
    if (IndexedCollection2)
      List2.__proto__ = IndexedCollection2;
    List2.prototype = Object.create(IndexedCollection2 && IndexedCollection2.prototype);
    List2.prototype.constructor = List2;
    List2.of = function of() {
      return this(arguments);
    };
    List2.prototype.toString = function toString2() {
      return this.__toString("List [", "]");
    };
    List2.prototype.get = function get2(index, notSetValue) {
      index = wrapIndex(this, index);
      if (index >= 0 && index < this.size) {
        index += this._origin;
        var node = listNodeFor(this, index);
        return node && node.array[index & MASK];
      }
      return notSetValue;
    };
    List2.prototype.set = function set2(index, value) {
      return updateList(this, index, value);
    };
    List2.prototype.remove = function remove2(index) {
      return !this.has(index) ? this : index === 0 ? this.shift() : index === this.size - 1 ? this.pop() : this.splice(index, 1);
    };
    List2.prototype.insert = function insert2(index, value) {
      return this.splice(index, 0, value);
    };
    List2.prototype.clear = function clear() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = this._origin = this._capacity = 0;
        this._level = SHIFT;
        this._root = this._tail = this.__hash = void 0;
        this.__altered = true;
        return this;
      }
      return emptyList();
    };
    List2.prototype.push = function push() {
      var values = arguments;
      var oldSize = this.size;
      return this.withMutations(function(list) {
        setListBounds(list, 0, oldSize + values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(oldSize + ii, values[ii]);
        }
      });
    };
    List2.prototype.pop = function pop() {
      return setListBounds(this, 0, -1);
    };
    List2.prototype.unshift = function unshift() {
      var values = arguments;
      return this.withMutations(function(list) {
        setListBounds(list, -values.length);
        for (var ii = 0; ii < values.length; ii++) {
          list.set(ii, values[ii]);
        }
      });
    };
    List2.prototype.shift = function shift() {
      return setListBounds(this, 1);
    };
    List2.prototype.concat = function concat() {
      var arguments$1 = arguments;
      var seqs = [];
      for (var i2 = 0; i2 < arguments.length; i2++) {
        var argument = arguments$1[i2];
        var seq = IndexedCollection2(typeof argument !== "string" && hasIterator(argument) ? argument : [argument]);
        if (seq.size !== 0) {
          seqs.push(seq);
        }
      }
      if (seqs.length === 0) {
        return this;
      }
      if (this.size === 0 && !this.__ownerID && seqs.length === 1) {
        return this.constructor(seqs[0]);
      }
      return this.withMutations(function(list) {
        seqs.forEach(function(seq2) {
          return seq2.forEach(function(value) {
            return list.push(value);
          });
        });
      });
    };
    List2.prototype.setSize = function setSize(size) {
      return setListBounds(this, 0, size);
    };
    List2.prototype.map = function map2(mapper, context) {
      var this$1$1 = this;
      return this.withMutations(function(list) {
        for (var i2 = 0; i2 < this$1$1.size; i2++) {
          list.set(i2, mapper.call(context, list.get(i2), i2, this$1$1));
        }
      });
    };
    List2.prototype.slice = function slice(begin, end) {
      var size = this.size;
      if (wholeSlice(begin, end, size)) {
        return this;
      }
      return setListBounds(this, resolveBegin(begin, size), resolveEnd(end, size));
    };
    List2.prototype.__iterator = function __iterator(type, reverse) {
      var index = reverse ? this.size : 0;
      var values = iterateList(this, reverse);
      return new Iterator(function() {
        var value = values();
        return value === DONE ? iteratorDone() : iteratorValue(type, reverse ? --index : index++, value);
      });
    };
    List2.prototype.__iterate = function __iterate(fn, reverse) {
      var index = reverse ? this.size : 0;
      var values = iterateList(this, reverse);
      var value;
      while ((value = values()) !== DONE) {
        if (fn(value, reverse ? --index : index++, this) === false) {
          break;
        }
      }
      return index;
    };
    List2.prototype.__ensureOwner = function __ensureOwner(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        if (this.size === 0) {
          return emptyList();
        }
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeList(this._origin, this._capacity, this._level, this._root, this._tail, ownerID, this.__hash);
    };
    return List2;
  }(IndexedCollection);
  List.isList = isList;
  var ListPrototype = List.prototype;
  ListPrototype[IS_LIST_SYMBOL] = true;
  ListPrototype[DELETE] = ListPrototype.remove;
  ListPrototype.merge = ListPrototype.concat;
  ListPrototype.setIn = setIn;
  ListPrototype.deleteIn = ListPrototype.removeIn = deleteIn;
  ListPrototype.update = update;
  ListPrototype.updateIn = updateIn;
  ListPrototype.mergeIn = mergeIn;
  ListPrototype.mergeDeepIn = mergeDeepIn;
  ListPrototype.withMutations = withMutations;
  ListPrototype.wasAltered = wasAltered;
  ListPrototype.asImmutable = asImmutable;
  ListPrototype["@@transducer/init"] = ListPrototype.asMutable = asMutable;
  ListPrototype["@@transducer/step"] = function(result, arr) {
    return result.push(arr);
  };
  ListPrototype["@@transducer/result"] = function(obj) {
    return obj.asImmutable();
  };
  var VNode = function VNode2(array, ownerID) {
    this.array = array;
    this.ownerID = ownerID;
  };
  VNode.prototype.removeBefore = function removeBefore(ownerID, level, index) {
    if (index === level ? 1 << level : this.array.length === 0) {
      return this;
    }
    var originIndex = index >>> level & MASK;
    if (originIndex >= this.array.length) {
      return new VNode([], ownerID);
    }
    var removingFirst = originIndex === 0;
    var newChild;
    if (level > 0) {
      var oldChild = this.array[originIndex];
      newChild = oldChild && oldChild.removeBefore(ownerID, level - SHIFT, index);
      if (newChild === oldChild && removingFirst) {
        return this;
      }
    }
    if (removingFirst && !newChild) {
      return this;
    }
    var editable = editableVNode(this, ownerID);
    if (!removingFirst) {
      for (var ii = 0; ii < originIndex; ii++) {
        editable.array[ii] = void 0;
      }
    }
    if (newChild) {
      editable.array[originIndex] = newChild;
    }
    return editable;
  };
  VNode.prototype.removeAfter = function removeAfter(ownerID, level, index) {
    if (index === (level ? 1 << level : 0) || this.array.length === 0) {
      return this;
    }
    var sizeIndex = index - 1 >>> level & MASK;
    if (sizeIndex >= this.array.length) {
      return this;
    }
    var newChild;
    if (level > 0) {
      var oldChild = this.array[sizeIndex];
      newChild = oldChild && oldChild.removeAfter(ownerID, level - SHIFT, index);
      if (newChild === oldChild && sizeIndex === this.array.length - 1) {
        return this;
      }
    }
    var editable = editableVNode(this, ownerID);
    editable.array.splice(sizeIndex + 1);
    if (newChild) {
      editable.array[sizeIndex] = newChild;
    }
    return editable;
  };
  var DONE = {};
  function iterateList(list, reverse) {
    var left = list._origin;
    var right = list._capacity;
    var tailPos = getTailOffset(right);
    var tail = list._tail;
    return iterateNodeOrLeaf(list._root, list._level, 0);
    function iterateNodeOrLeaf(node, level, offset) {
      return level === 0 ? iterateLeaf(node, offset) : iterateNode(node, level, offset);
    }
    function iterateLeaf(node, offset) {
      var array = offset === tailPos ? tail && tail.array : node && node.array;
      var from = offset > left ? 0 : left - offset;
      var to = right - offset;
      if (to > SIZE) {
        to = SIZE;
      }
      return function() {
        if (from === to) {
          return DONE;
        }
        var idx = reverse ? --to : from++;
        return array && array[idx];
      };
    }
    function iterateNode(node, level, offset) {
      var values;
      var array = node && node.array;
      var from = offset > left ? 0 : left - offset >> level;
      var to = (right - offset >> level) + 1;
      if (to > SIZE) {
        to = SIZE;
      }
      return function() {
        while (true) {
          if (values) {
            var value = values();
            if (value !== DONE) {
              return value;
            }
            values = null;
          }
          if (from === to) {
            return DONE;
          }
          var idx = reverse ? --to : from++;
          values = iterateNodeOrLeaf(array && array[idx], level - SHIFT, offset + (idx << level));
        }
      };
    }
  }
  function makeList(origin, capacity, level, root, tail, ownerID, hash2) {
    var list = Object.create(ListPrototype);
    list.size = capacity - origin;
    list._origin = origin;
    list._capacity = capacity;
    list._level = level;
    list._root = root;
    list._tail = tail;
    list.__ownerID = ownerID;
    list.__hash = hash2;
    list.__altered = false;
    return list;
  }
  var EMPTY_LIST;
  function emptyList() {
    return EMPTY_LIST || (EMPTY_LIST = makeList(0, 0, SHIFT));
  }
  function updateList(list, index, value) {
    index = wrapIndex(list, index);
    if (index !== index) {
      return list;
    }
    if (index >= list.size || index < 0) {
      return list.withMutations(function(list2) {
        index < 0 ? setListBounds(list2, index).set(0, value) : setListBounds(list2, 0, index + 1).set(index, value);
      });
    }
    index += list._origin;
    var newTail = list._tail;
    var newRoot = list._root;
    var didAlter = MakeRef();
    if (index >= getTailOffset(list._capacity)) {
      newTail = updateVNode(newTail, list.__ownerID, 0, index, value, didAlter);
    } else {
      newRoot = updateVNode(newRoot, list.__ownerID, list._level, index, value, didAlter);
    }
    if (!didAlter.value) {
      return list;
    }
    if (list.__ownerID) {
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = void 0;
      list.__altered = true;
      return list;
    }
    return makeList(list._origin, list._capacity, list._level, newRoot, newTail);
  }
  function updateVNode(node, ownerID, level, index, value, didAlter) {
    var idx = index >>> level & MASK;
    var nodeHas = node && idx < node.array.length;
    if (!nodeHas && value === void 0) {
      return node;
    }
    var newNode;
    if (level > 0) {
      var lowerNode = node && node.array[idx];
      var newLowerNode = updateVNode(lowerNode, ownerID, level - SHIFT, index, value, didAlter);
      if (newLowerNode === lowerNode) {
        return node;
      }
      newNode = editableVNode(node, ownerID);
      newNode.array[idx] = newLowerNode;
      return newNode;
    }
    if (nodeHas && node.array[idx] === value) {
      return node;
    }
    if (didAlter) {
      SetRef(didAlter);
    }
    newNode = editableVNode(node, ownerID);
    if (value === void 0 && idx === newNode.array.length - 1) {
      newNode.array.pop();
    } else {
      newNode.array[idx] = value;
    }
    return newNode;
  }
  function editableVNode(node, ownerID) {
    if (ownerID && node && ownerID === node.ownerID) {
      return node;
    }
    return new VNode(node ? node.array.slice() : [], ownerID);
  }
  function listNodeFor(list, rawIndex) {
    if (rawIndex >= getTailOffset(list._capacity)) {
      return list._tail;
    }
    if (rawIndex < 1 << list._level + SHIFT) {
      var node = list._root;
      var level = list._level;
      while (node && level > 0) {
        node = node.array[rawIndex >>> level & MASK];
        level -= SHIFT;
      }
      return node;
    }
  }
  function setListBounds(list, begin, end) {
    if (begin !== void 0) {
      begin |= 0;
    }
    if (end !== void 0) {
      end |= 0;
    }
    var owner = list.__ownerID || new OwnerID();
    var oldOrigin = list._origin;
    var oldCapacity = list._capacity;
    var newOrigin = oldOrigin + begin;
    var newCapacity = end === void 0 ? oldCapacity : end < 0 ? oldCapacity + end : oldOrigin + end;
    if (newOrigin === oldOrigin && newCapacity === oldCapacity) {
      return list;
    }
    if (newOrigin >= newCapacity) {
      return list.clear();
    }
    var newLevel = list._level;
    var newRoot = list._root;
    var offsetShift = 0;
    while (newOrigin + offsetShift < 0) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [void 0, newRoot] : [], owner);
      newLevel += SHIFT;
      offsetShift += 1 << newLevel;
    }
    if (offsetShift) {
      newOrigin += offsetShift;
      oldOrigin += offsetShift;
      newCapacity += offsetShift;
      oldCapacity += offsetShift;
    }
    var oldTailOffset = getTailOffset(oldCapacity);
    var newTailOffset = getTailOffset(newCapacity);
    while (newTailOffset >= 1 << newLevel + SHIFT) {
      newRoot = new VNode(newRoot && newRoot.array.length ? [newRoot] : [], owner);
      newLevel += SHIFT;
    }
    var oldTail = list._tail;
    var newTail = newTailOffset < oldTailOffset ? listNodeFor(list, newCapacity - 1) : newTailOffset > oldTailOffset ? new VNode([], owner) : oldTail;
    if (oldTail && newTailOffset > oldTailOffset && newOrigin < oldCapacity && oldTail.array.length) {
      newRoot = editableVNode(newRoot, owner);
      var node = newRoot;
      for (var level = newLevel; level > SHIFT; level -= SHIFT) {
        var idx = oldTailOffset >>> level & MASK;
        node = node.array[idx] = editableVNode(node.array[idx], owner);
      }
      node.array[oldTailOffset >>> SHIFT & MASK] = oldTail;
    }
    if (newCapacity < oldCapacity) {
      newTail = newTail && newTail.removeAfter(owner, 0, newCapacity);
    }
    if (newOrigin >= newTailOffset) {
      newOrigin -= newTailOffset;
      newCapacity -= newTailOffset;
      newLevel = SHIFT;
      newRoot = null;
      newTail = newTail && newTail.removeBefore(owner, 0, newOrigin);
    } else if (newOrigin > oldOrigin || newTailOffset < oldTailOffset) {
      offsetShift = 0;
      while (newRoot) {
        var beginIndex = newOrigin >>> newLevel & MASK;
        if (beginIndex !== newTailOffset >>> newLevel & MASK) {
          break;
        }
        if (beginIndex) {
          offsetShift += (1 << newLevel) * beginIndex;
        }
        newLevel -= SHIFT;
        newRoot = newRoot.array[beginIndex];
      }
      if (newRoot && newOrigin > oldOrigin) {
        newRoot = newRoot.removeBefore(owner, newLevel, newOrigin - offsetShift);
      }
      if (newRoot && newTailOffset < oldTailOffset) {
        newRoot = newRoot.removeAfter(owner, newLevel, newTailOffset - offsetShift);
      }
      if (offsetShift) {
        newOrigin -= offsetShift;
        newCapacity -= offsetShift;
      }
    }
    if (list.__ownerID) {
      list.size = newCapacity - newOrigin;
      list._origin = newOrigin;
      list._capacity = newCapacity;
      list._level = newLevel;
      list._root = newRoot;
      list._tail = newTail;
      list.__hash = void 0;
      list.__altered = true;
      return list;
    }
    return makeList(newOrigin, newCapacity, newLevel, newRoot, newTail);
  }
  function getTailOffset(size) {
    return size < SIZE ? 0 : size - 1 >>> SHIFT << SHIFT;
  }
  var OrderedMap = /* @__PURE__ */ function(Map2) {
    function OrderedMap2(value) {
      return value === void 0 || value === null ? emptyOrderedMap() : isOrderedMap(value) ? value : emptyOrderedMap().withMutations(function(map2) {
        var iter = KeyedCollection(value);
        assertNotInfinite(iter.size);
        iter.forEach(function(v2, k) {
          return map2.set(k, v2);
        });
      });
    }
    if (Map2)
      OrderedMap2.__proto__ = Map2;
    OrderedMap2.prototype = Object.create(Map2 && Map2.prototype);
    OrderedMap2.prototype.constructor = OrderedMap2;
    OrderedMap2.of = function of() {
      return this(arguments);
    };
    OrderedMap2.prototype.toString = function toString2() {
      return this.__toString("OrderedMap {", "}");
    };
    OrderedMap2.prototype.get = function get2(k, notSetValue) {
      var index = this._map.get(k);
      return index !== void 0 ? this._list.get(index)[1] : notSetValue;
    };
    OrderedMap2.prototype.clear = function clear() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._map.clear();
        this._list.clear();
        this.__altered = true;
        return this;
      }
      return emptyOrderedMap();
    };
    OrderedMap2.prototype.set = function set2(k, v2) {
      return updateOrderedMap(this, k, v2);
    };
    OrderedMap2.prototype.remove = function remove2(k) {
      return updateOrderedMap(this, k, NOT_SET);
    };
    OrderedMap2.prototype.__iterate = function __iterate(fn, reverse) {
      var this$1$1 = this;
      return this._list.__iterate(function(entry) {
        return entry && fn(entry[1], entry[0], this$1$1);
      }, reverse);
    };
    OrderedMap2.prototype.__iterator = function __iterator(type, reverse) {
      return this._list.fromEntrySeq().__iterator(type, reverse);
    };
    OrderedMap2.prototype.__ensureOwner = function __ensureOwner(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      var newList = this._list.__ensureOwner(ownerID);
      if (!ownerID) {
        if (this.size === 0) {
          return emptyOrderedMap();
        }
        this.__ownerID = ownerID;
        this.__altered = false;
        this._map = newMap;
        this._list = newList;
        return this;
      }
      return makeOrderedMap(newMap, newList, ownerID, this.__hash);
    };
    return OrderedMap2;
  }(Map$1);
  OrderedMap.isOrderedMap = isOrderedMap;
  OrderedMap.prototype[IS_ORDERED_SYMBOL] = true;
  OrderedMap.prototype[DELETE] = OrderedMap.prototype.remove;
  function makeOrderedMap(map2, list, ownerID, hash2) {
    var omap = Object.create(OrderedMap.prototype);
    omap.size = map2 ? map2.size : 0;
    omap._map = map2;
    omap._list = list;
    omap.__ownerID = ownerID;
    omap.__hash = hash2;
    omap.__altered = false;
    return omap;
  }
  var EMPTY_ORDERED_MAP;
  function emptyOrderedMap() {
    return EMPTY_ORDERED_MAP || (EMPTY_ORDERED_MAP = makeOrderedMap(emptyMap(), emptyList()));
  }
  function updateOrderedMap(omap, k, v2) {
    var map2 = omap._map;
    var list = omap._list;
    var i2 = map2.get(k);
    var has2 = i2 !== void 0;
    var newMap;
    var newList;
    if (v2 === NOT_SET) {
      if (!has2) {
        return omap;
      }
      if (list.size >= SIZE && list.size >= map2.size * 2) {
        newList = list.filter(function(entry, idx) {
          return entry !== void 0 && i2 !== idx;
        });
        newMap = newList.toKeyedSeq().map(function(entry) {
          return entry[0];
        }).flip().toMap();
        if (omap.__ownerID) {
          newMap.__ownerID = newList.__ownerID = omap.__ownerID;
        }
      } else {
        newMap = map2.remove(k);
        newList = i2 === list.size - 1 ? list.pop() : list.set(i2, void 0);
      }
    } else if (has2) {
      if (v2 === list.get(i2)[1]) {
        return omap;
      }
      newMap = map2;
      newList = list.set(i2, [k, v2]);
    } else {
      newMap = map2.set(k, list.size);
      newList = list.set(list.size, [k, v2]);
    }
    if (omap.__ownerID) {
      omap.size = newMap.size;
      omap._map = newMap;
      omap._list = newList;
      omap.__hash = void 0;
      omap.__altered = true;
      return omap;
    }
    return makeOrderedMap(newMap, newList);
  }
  var IS_STACK_SYMBOL = "@@__IMMUTABLE_STACK__@@";
  function isStack(maybeStack) {
    return Boolean(maybeStack && maybeStack[IS_STACK_SYMBOL]);
  }
  var Stack = /* @__PURE__ */ function(IndexedCollection2) {
    function Stack2(value) {
      return value === void 0 || value === null ? emptyStack() : isStack(value) ? value : emptyStack().pushAll(value);
    }
    if (IndexedCollection2)
      Stack2.__proto__ = IndexedCollection2;
    Stack2.prototype = Object.create(IndexedCollection2 && IndexedCollection2.prototype);
    Stack2.prototype.constructor = Stack2;
    Stack2.of = function of() {
      return this(arguments);
    };
    Stack2.prototype.toString = function toString2() {
      return this.__toString("Stack [", "]");
    };
    Stack2.prototype.get = function get2(index, notSetValue) {
      var head = this._head;
      index = wrapIndex(this, index);
      while (head && index--) {
        head = head.next;
      }
      return head ? head.value : notSetValue;
    };
    Stack2.prototype.peek = function peek() {
      return this._head && this._head.value;
    };
    Stack2.prototype.push = function push() {
      var arguments$1 = arguments;
      if (arguments.length === 0) {
        return this;
      }
      var newSize = this.size + arguments.length;
      var head = this._head;
      for (var ii = arguments.length - 1; ii >= 0; ii--) {
        head = {
          value: arguments$1[ii],
          next: head
        };
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = void 0;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };
    Stack2.prototype.pushAll = function pushAll(iter) {
      iter = IndexedCollection2(iter);
      if (iter.size === 0) {
        return this;
      }
      if (this.size === 0 && isStack(iter)) {
        return iter;
      }
      assertNotInfinite(iter.size);
      var newSize = this.size;
      var head = this._head;
      iter.__iterate(function(value) {
        newSize++;
        head = {
          value,
          next: head
        };
      }, true);
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = void 0;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };
    Stack2.prototype.pop = function pop() {
      return this.slice(1);
    };
    Stack2.prototype.clear = function clear() {
      if (this.size === 0) {
        return this;
      }
      if (this.__ownerID) {
        this.size = 0;
        this._head = void 0;
        this.__hash = void 0;
        this.__altered = true;
        return this;
      }
      return emptyStack();
    };
    Stack2.prototype.slice = function slice(begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      var resolvedBegin = resolveBegin(begin, this.size);
      var resolvedEnd = resolveEnd(end, this.size);
      if (resolvedEnd !== this.size) {
        return IndexedCollection2.prototype.slice.call(this, begin, end);
      }
      var newSize = this.size - resolvedBegin;
      var head = this._head;
      while (resolvedBegin--) {
        head = head.next;
      }
      if (this.__ownerID) {
        this.size = newSize;
        this._head = head;
        this.__hash = void 0;
        this.__altered = true;
        return this;
      }
      return makeStack(newSize, head);
    };
    Stack2.prototype.__ensureOwner = function __ensureOwner(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      if (!ownerID) {
        if (this.size === 0) {
          return emptyStack();
        }
        this.__ownerID = ownerID;
        this.__altered = false;
        return this;
      }
      return makeStack(this.size, this._head, ownerID, this.__hash);
    };
    Stack2.prototype.__iterate = function __iterate(fn, reverse) {
      var this$1$1 = this;
      if (reverse) {
        return new ArraySeq(this.toArray()).__iterate(function(v2, k) {
          return fn(v2, k, this$1$1);
        }, reverse);
      }
      var iterations = 0;
      var node = this._head;
      while (node) {
        if (fn(node.value, iterations++, this) === false) {
          break;
        }
        node = node.next;
      }
      return iterations;
    };
    Stack2.prototype.__iterator = function __iterator(type, reverse) {
      if (reverse) {
        return new ArraySeq(this.toArray()).__iterator(type, reverse);
      }
      var iterations = 0;
      var node = this._head;
      return new Iterator(function() {
        if (node) {
          var value = node.value;
          node = node.next;
          return iteratorValue(type, iterations++, value);
        }
        return iteratorDone();
      });
    };
    return Stack2;
  }(IndexedCollection);
  Stack.isStack = isStack;
  var StackPrototype = Stack.prototype;
  StackPrototype[IS_STACK_SYMBOL] = true;
  StackPrototype.shift = StackPrototype.pop;
  StackPrototype.unshift = StackPrototype.push;
  StackPrototype.unshiftAll = StackPrototype.pushAll;
  StackPrototype.withMutations = withMutations;
  StackPrototype.wasAltered = wasAltered;
  StackPrototype.asImmutable = asImmutable;
  StackPrototype["@@transducer/init"] = StackPrototype.asMutable = asMutable;
  StackPrototype["@@transducer/step"] = function(result, arr) {
    return result.unshift(arr);
  };
  StackPrototype["@@transducer/result"] = function(obj) {
    return obj.asImmutable();
  };
  function makeStack(size, head, ownerID, hash2) {
    var map2 = Object.create(StackPrototype);
    map2.size = size;
    map2._head = head;
    map2.__ownerID = ownerID;
    map2.__hash = hash2;
    map2.__altered = false;
    return map2;
  }
  var EMPTY_STACK;
  function emptyStack() {
    return EMPTY_STACK || (EMPTY_STACK = makeStack(0));
  }
  var IS_SET_SYMBOL = "@@__IMMUTABLE_SET__@@";
  function isSet(maybeSet) {
    return Boolean(maybeSet && maybeSet[IS_SET_SYMBOL]);
  }
  function isOrderedSet(maybeOrderedSet) {
    return isSet(maybeOrderedSet) && isOrdered(maybeOrderedSet);
  }
  function deepEqual(a2, b2) {
    if (a2 === b2) {
      return true;
    }
    if (!isCollection(b2) || a2.size !== void 0 && b2.size !== void 0 && a2.size !== b2.size || a2.__hash !== void 0 && b2.__hash !== void 0 && a2.__hash !== b2.__hash || isKeyed(a2) !== isKeyed(b2) || isIndexed(a2) !== isIndexed(b2) || isOrdered(a2) !== isOrdered(b2)) {
      return false;
    }
    if (a2.size === 0 && b2.size === 0) {
      return true;
    }
    var notAssociative = !isAssociative(a2);
    if (isOrdered(a2)) {
      var entries = a2.entries();
      return b2.every(function(v2, k) {
        var entry = entries.next().value;
        return entry && is(entry[1], v2) && (notAssociative || is(entry[0], k));
      }) && entries.next().done;
    }
    var flipped = false;
    if (a2.size === void 0) {
      if (b2.size === void 0) {
        if (typeof a2.cacheResult === "function") {
          a2.cacheResult();
        }
      } else {
        flipped = true;
        var _ = a2;
        a2 = b2;
        b2 = _;
      }
    }
    var allEqual = true;
    var bSize = b2.__iterate(function(v2, k) {
      if (notAssociative ? !a2.has(v2) : flipped ? !is(v2, a2.get(k, NOT_SET)) : !is(a2.get(k, NOT_SET), v2)) {
        allEqual = false;
        return false;
      }
    });
    return allEqual && a2.size === bSize;
  }
  function mixin(ctor, methods) {
    var keyCopier = function(key) {
      ctor.prototype[key] = methods[key];
    };
    Object.keys(methods).forEach(keyCopier);
    Object.getOwnPropertySymbols && Object.getOwnPropertySymbols(methods).forEach(keyCopier);
    return ctor;
  }
  function toJS(value) {
    if (!value || typeof value !== "object") {
      return value;
    }
    if (!isCollection(value)) {
      if (!isDataStructure(value)) {
        return value;
      }
      value = Seq(value);
    }
    if (isKeyed(value)) {
      var result$1 = {};
      value.__iterate(function(v2, k) {
        result$1[k] = toJS(v2);
      });
      return result$1;
    }
    var result = [];
    value.__iterate(function(v2) {
      result.push(toJS(v2));
    });
    return result;
  }
  var Set$1 = /* @__PURE__ */ function(SetCollection2) {
    function Set2(value) {
      return value === void 0 || value === null ? emptySet() : isSet(value) && !isOrdered(value) ? value : emptySet().withMutations(function(set2) {
        var iter = SetCollection2(value);
        assertNotInfinite(iter.size);
        iter.forEach(function(v2) {
          return set2.add(v2);
        });
      });
    }
    if (SetCollection2)
      Set2.__proto__ = SetCollection2;
    Set2.prototype = Object.create(SetCollection2 && SetCollection2.prototype);
    Set2.prototype.constructor = Set2;
    Set2.of = function of() {
      return this(arguments);
    };
    Set2.fromKeys = function fromKeys(value) {
      return this(KeyedCollection(value).keySeq());
    };
    Set2.intersect = function intersect(sets) {
      sets = Collection(sets).toArray();
      return sets.length ? SetPrototype.intersect.apply(Set2(sets.pop()), sets) : emptySet();
    };
    Set2.union = function union(sets) {
      sets = Collection(sets).toArray();
      return sets.length ? SetPrototype.union.apply(Set2(sets.pop()), sets) : emptySet();
    };
    Set2.prototype.toString = function toString2() {
      return this.__toString("Set {", "}");
    };
    Set2.prototype.has = function has2(value) {
      return this._map.has(value);
    };
    Set2.prototype.add = function add(value) {
      return updateSet(this, this._map.set(value, value));
    };
    Set2.prototype.remove = function remove2(value) {
      return updateSet(this, this._map.remove(value));
    };
    Set2.prototype.clear = function clear() {
      return updateSet(this, this._map.clear());
    };
    Set2.prototype.map = function map2(mapper, context) {
      var this$1$1 = this;
      var didChanges = false;
      var newMap = updateSet(this, this._map.mapEntries(function(ref) {
        var v2 = ref[1];
        var mapped = mapper.call(context, v2, v2, this$1$1);
        if (mapped !== v2) {
          didChanges = true;
        }
        return [mapped, mapped];
      }, context));
      return didChanges ? newMap : this;
    };
    Set2.prototype.union = function union() {
      var iters = [], len = arguments.length;
      while (len--)
        iters[len] = arguments[len];
      iters = iters.filter(function(x) {
        return x.size !== 0;
      });
      if (iters.length === 0) {
        return this;
      }
      if (this.size === 0 && !this.__ownerID && iters.length === 1) {
        return this.constructor(iters[0]);
      }
      return this.withMutations(function(set2) {
        for (var ii = 0; ii < iters.length; ii++) {
          SetCollection2(iters[ii]).forEach(function(value) {
            return set2.add(value);
          });
        }
      });
    };
    Set2.prototype.intersect = function intersect() {
      var iters = [], len = arguments.length;
      while (len--)
        iters[len] = arguments[len];
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function(iter) {
        return SetCollection2(iter);
      });
      var toRemove = [];
      this.forEach(function(value) {
        if (!iters.every(function(iter) {
          return iter.includes(value);
        })) {
          toRemove.push(value);
        }
      });
      return this.withMutations(function(set2) {
        toRemove.forEach(function(value) {
          set2.remove(value);
        });
      });
    };
    Set2.prototype.subtract = function subtract() {
      var iters = [], len = arguments.length;
      while (len--)
        iters[len] = arguments[len];
      if (iters.length === 0) {
        return this;
      }
      iters = iters.map(function(iter) {
        return SetCollection2(iter);
      });
      var toRemove = [];
      this.forEach(function(value) {
        if (iters.some(function(iter) {
          return iter.includes(value);
        })) {
          toRemove.push(value);
        }
      });
      return this.withMutations(function(set2) {
        toRemove.forEach(function(value) {
          set2.remove(value);
        });
      });
    };
    Set2.prototype.sort = function sort2(comparator) {
      return OrderedSet(sortFactory(this, comparator));
    };
    Set2.prototype.sortBy = function sortBy(mapper, comparator) {
      return OrderedSet(sortFactory(this, comparator, mapper));
    };
    Set2.prototype.wasAltered = function wasAltered2() {
      return this._map.wasAltered();
    };
    Set2.prototype.__iterate = function __iterate(fn, reverse) {
      var this$1$1 = this;
      return this._map.__iterate(function(k) {
        return fn(k, k, this$1$1);
      }, reverse);
    };
    Set2.prototype.__iterator = function __iterator(type, reverse) {
      return this._map.__iterator(type, reverse);
    };
    Set2.prototype.__ensureOwner = function __ensureOwner(ownerID) {
      if (ownerID === this.__ownerID) {
        return this;
      }
      var newMap = this._map.__ensureOwner(ownerID);
      if (!ownerID) {
        if (this.size === 0) {
          return this.__empty();
        }
        this.__ownerID = ownerID;
        this._map = newMap;
        return this;
      }
      return this.__make(newMap, ownerID);
    };
    return Set2;
  }(SetCollection);
  Set$1.isSet = isSet;
  var SetPrototype = Set$1.prototype;
  SetPrototype[IS_SET_SYMBOL] = true;
  SetPrototype[DELETE] = SetPrototype.remove;
  SetPrototype.merge = SetPrototype.concat = SetPrototype.union;
  SetPrototype.withMutations = withMutations;
  SetPrototype.asImmutable = asImmutable;
  SetPrototype["@@transducer/init"] = SetPrototype.asMutable = asMutable;
  SetPrototype["@@transducer/step"] = function(result, arr) {
    return result.add(arr);
  };
  SetPrototype["@@transducer/result"] = function(obj) {
    return obj.asImmutable();
  };
  SetPrototype.__empty = emptySet;
  SetPrototype.__make = makeSet;
  function updateSet(set2, newMap) {
    if (set2.__ownerID) {
      set2.size = newMap.size;
      set2._map = newMap;
      return set2;
    }
    return newMap === set2._map ? set2 : newMap.size === 0 ? set2.__empty() : set2.__make(newMap);
  }
  function makeSet(map2, ownerID) {
    var set2 = Object.create(SetPrototype);
    set2.size = map2 ? map2.size : 0;
    set2._map = map2;
    set2.__ownerID = ownerID;
    return set2;
  }
  var EMPTY_SET;
  function emptySet() {
    return EMPTY_SET || (EMPTY_SET = makeSet(emptyMap()));
  }
  var Range = /* @__PURE__ */ function(IndexedSeq2) {
    function Range2(start, end, step) {
      if (!(this instanceof Range2)) {
        return new Range2(start, end, step);
      }
      invariant(step !== 0, "Cannot step a Range by 0");
      start = start || 0;
      if (end === void 0) {
        end = Infinity;
      }
      step = step === void 0 ? 1 : Math.abs(step);
      if (end < start) {
        step = -step;
      }
      this._start = start;
      this._end = end;
      this._step = step;
      this.size = Math.max(0, Math.ceil((end - start) / step - 1) + 1);
      if (this.size === 0) {
        if (EMPTY_RANGE) {
          return EMPTY_RANGE;
        }
        EMPTY_RANGE = this;
      }
    }
    if (IndexedSeq2)
      Range2.__proto__ = IndexedSeq2;
    Range2.prototype = Object.create(IndexedSeq2 && IndexedSeq2.prototype);
    Range2.prototype.constructor = Range2;
    Range2.prototype.toString = function toString2() {
      if (this.size === 0) {
        return "Range []";
      }
      return "Range [ " + this._start + "..." + this._end + (this._step !== 1 ? " by " + this._step : "") + " ]";
    };
    Range2.prototype.get = function get2(index, notSetValue) {
      return this.has(index) ? this._start + wrapIndex(this, index) * this._step : notSetValue;
    };
    Range2.prototype.includes = function includes(searchValue) {
      var possibleIndex = (searchValue - this._start) / this._step;
      return possibleIndex >= 0 && possibleIndex < this.size && possibleIndex === Math.floor(possibleIndex);
    };
    Range2.prototype.slice = function slice(begin, end) {
      if (wholeSlice(begin, end, this.size)) {
        return this;
      }
      begin = resolveBegin(begin, this.size);
      end = resolveEnd(end, this.size);
      if (end <= begin) {
        return new Range2(0, 0);
      }
      return new Range2(this.get(begin, this._end), this.get(end, this._end), this._step);
    };
    Range2.prototype.indexOf = function indexOf(searchValue) {
      var offsetValue = searchValue - this._start;
      if (offsetValue % this._step === 0) {
        var index = offsetValue / this._step;
        if (index >= 0 && index < this.size) {
          return index;
        }
      }
      return -1;
    };
    Range2.prototype.lastIndexOf = function lastIndexOf(searchValue) {
      return this.indexOf(searchValue);
    };
    Range2.prototype.__iterate = function __iterate(fn, reverse) {
      var size = this.size;
      var step = this._step;
      var value = reverse ? this._start + (size - 1) * step : this._start;
      var i2 = 0;
      while (i2 !== size) {
        if (fn(value, reverse ? size - ++i2 : i2++, this) === false) {
          break;
        }
        value += reverse ? -step : step;
      }
      return i2;
    };
    Range2.prototype.__iterator = function __iterator(type, reverse) {
      var size = this.size;
      var step = this._step;
      var value = reverse ? this._start + (size - 1) * step : this._start;
      var i2 = 0;
      return new Iterator(function() {
        if (i2 === size) {
          return iteratorDone();
        }
        var v2 = value;
        value += reverse ? -step : step;
        return iteratorValue(type, reverse ? size - ++i2 : i2++, v2);
      });
    };
    Range2.prototype.equals = function equals(other) {
      return other instanceof Range2 ? this._start === other._start && this._end === other._end && this._step === other._step : deepEqual(this, other);
    };
    return Range2;
  }(IndexedSeq);
  var EMPTY_RANGE;
  function getIn$1(collection, searchKeyPath, notSetValue) {
    var keyPath = coerceKeyPath(searchKeyPath);
    var i2 = 0;
    while (i2 !== keyPath.length) {
      collection = get(collection, keyPath[i2++], NOT_SET);
      if (collection === NOT_SET) {
        return notSetValue;
      }
    }
    return collection;
  }
  function getIn(searchKeyPath, notSetValue) {
    return getIn$1(this, searchKeyPath, notSetValue);
  }
  function hasIn$1(collection, keyPath) {
    return getIn$1(collection, keyPath, NOT_SET) !== NOT_SET;
  }
  function hasIn(searchKeyPath) {
    return hasIn$1(this, searchKeyPath);
  }
  function toObject() {
    assertNotInfinite(this.size);
    var object = {};
    this.__iterate(function(v2, k) {
      object[k] = v2;
    });
    return object;
  }
  Collection.isIterable = isCollection;
  Collection.isKeyed = isKeyed;
  Collection.isIndexed = isIndexed;
  Collection.isAssociative = isAssociative;
  Collection.isOrdered = isOrdered;
  Collection.Iterator = Iterator;
  mixin(Collection, {
    toArray: function toArray() {
      assertNotInfinite(this.size);
      var array = new Array(this.size || 0);
      var useTuples = isKeyed(this);
      var i2 = 0;
      this.__iterate(function(v2, k) {
        array[i2++] = useTuples ? [k, v2] : v2;
      });
      return array;
    },
    toIndexedSeq: function toIndexedSeq() {
      return new ToIndexedSequence(this);
    },
    toJS: function toJS$1() {
      return toJS(this);
    },
    toKeyedSeq: function toKeyedSeq() {
      return new ToKeyedSequence(this, true);
    },
    toMap: function toMap() {
      return Map$1(this.toKeyedSeq());
    },
    toObject,
    toOrderedMap: function toOrderedMap() {
      return OrderedMap(this.toKeyedSeq());
    },
    toOrderedSet: function toOrderedSet() {
      return OrderedSet(isKeyed(this) ? this.valueSeq() : this);
    },
    toSet: function toSet() {
      return Set$1(isKeyed(this) ? this.valueSeq() : this);
    },
    toSetSeq: function toSetSeq() {
      return new ToSetSequence(this);
    },
    toSeq: function toSeq() {
      return isIndexed(this) ? this.toIndexedSeq() : isKeyed(this) ? this.toKeyedSeq() : this.toSetSeq();
    },
    toStack: function toStack() {
      return Stack(isKeyed(this) ? this.valueSeq() : this);
    },
    toList: function toList() {
      return List(isKeyed(this) ? this.valueSeq() : this);
    },
    toString: function toString2() {
      return "[Collection]";
    },
    __toString: function __toString(head, tail) {
      if (this.size === 0) {
        return head + tail;
      }
      return head + " " + this.toSeq().map(this.__toStringMapper).join(", ") + " " + tail;
    },
    concat: function concat() {
      var values = [], len = arguments.length;
      while (len--)
        values[len] = arguments[len];
      return reify(this, concatFactory(this, values));
    },
    includes: function includes(searchValue) {
      return this.some(function(value) {
        return is(value, searchValue);
      });
    },
    entries: function entries() {
      return this.__iterator(ITERATE_ENTRIES);
    },
    every: function every(predicate, context) {
      assertNotInfinite(this.size);
      var returnValue = true;
      this.__iterate(function(v2, k, c2) {
        if (!predicate.call(context, v2, k, c2)) {
          returnValue = false;
          return false;
        }
      });
      return returnValue;
    },
    filter: function filter(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, true));
    },
    find: function find(predicate, context, notSetValue) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[1] : notSetValue;
    },
    forEach: function forEach2(sideEffect, context) {
      assertNotInfinite(this.size);
      return this.__iterate(context ? sideEffect.bind(context) : sideEffect);
    },
    join: function join(separator) {
      assertNotInfinite(this.size);
      separator = separator !== void 0 ? "" + separator : ",";
      var joined = "";
      var isFirst = true;
      this.__iterate(function(v2) {
        isFirst ? isFirst = false : joined += separator;
        joined += v2 !== null && v2 !== void 0 ? v2.toString() : "";
      });
      return joined;
    },
    keys: function keys() {
      return this.__iterator(ITERATE_KEYS);
    },
    map: function map2(mapper, context) {
      return reify(this, mapFactory(this, mapper, context));
    },
    reduce: function reduce$1(reducer, initialReduction, context) {
      return reduce(this, reducer, initialReduction, context, arguments.length < 2, false);
    },
    reduceRight: function reduceRight(reducer, initialReduction, context) {
      return reduce(this, reducer, initialReduction, context, arguments.length < 2, true);
    },
    reverse: function reverse() {
      return reify(this, reverseFactory(this, true));
    },
    slice: function slice(begin, end) {
      return reify(this, sliceFactory(this, begin, end, true));
    },
    some: function some(predicate, context) {
      return !this.every(not(predicate), context);
    },
    sort: function sort2(comparator) {
      return reify(this, sortFactory(this, comparator));
    },
    values: function values() {
      return this.__iterator(ITERATE_VALUES);
    },
    butLast: function butLast() {
      return this.slice(0, -1);
    },
    isEmpty: function isEmpty() {
      return this.size !== void 0 ? this.size === 0 : !this.some(function() {
        return true;
      });
    },
    count: function count(predicate, context) {
      return ensureSize(predicate ? this.toSeq().filter(predicate, context) : this);
    },
    countBy: function countBy(grouper, context) {
      return countByFactory(this, grouper, context);
    },
    equals: function equals(other) {
      return deepEqual(this, other);
    },
    entrySeq: function entrySeq() {
      var collection = this;
      if (collection._cache) {
        return new ArraySeq(collection._cache);
      }
      var entriesSequence = collection.toSeq().map(entryMapper).toIndexedSeq();
      entriesSequence.fromEntrySeq = function() {
        return collection.toSeq();
      };
      return entriesSequence;
    },
    filterNot: function filterNot(predicate, context) {
      return this.filter(not(predicate), context);
    },
    findEntry: function findEntry(predicate, context, notSetValue) {
      var found = notSetValue;
      this.__iterate(function(v2, k, c2) {
        if (predicate.call(context, v2, k, c2)) {
          found = [k, v2];
          return false;
        }
      });
      return found;
    },
    findKey: function findKey(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry && entry[0];
    },
    findLast: function findLast(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().find(predicate, context, notSetValue);
    },
    findLastEntry: function findLastEntry(predicate, context, notSetValue) {
      return this.toKeyedSeq().reverse().findEntry(predicate, context, notSetValue);
    },
    findLastKey: function findLastKey(predicate, context) {
      return this.toKeyedSeq().reverse().findKey(predicate, context);
    },
    first: function first2(notSetValue) {
      return this.find(returnTrue, null, notSetValue);
    },
    flatMap: function flatMap(mapper, context) {
      return reify(this, flatMapFactory(this, mapper, context));
    },
    flatten: function flatten(depth) {
      return reify(this, flattenFactory(this, depth, true));
    },
    fromEntrySeq: function fromEntrySeq() {
      return new FromEntriesSequence(this);
    },
    get: function get2(searchKey, notSetValue) {
      return this.find(function(_, key) {
        return is(key, searchKey);
      }, void 0, notSetValue);
    },
    getIn,
    groupBy: function groupBy(grouper, context) {
      return groupByFactory(this, grouper, context);
    },
    has: function has2(searchKey) {
      return this.get(searchKey, NOT_SET) !== NOT_SET;
    },
    hasIn,
    isSubset: function isSubset(iter) {
      iter = typeof iter.includes === "function" ? iter : Collection(iter);
      return this.every(function(value) {
        return iter.includes(value);
      });
    },
    isSuperset: function isSuperset(iter) {
      iter = typeof iter.isSubset === "function" ? iter : Collection(iter);
      return iter.isSubset(this);
    },
    keyOf: function keyOf(searchValue) {
      return this.findKey(function(value) {
        return is(value, searchValue);
      });
    },
    keySeq: function keySeq() {
      return this.toSeq().map(keyMapper).toIndexedSeq();
    },
    last: function last(notSetValue) {
      return this.toSeq().reverse().first(notSetValue);
    },
    lastKeyOf: function lastKeyOf(searchValue) {
      return this.toKeyedSeq().reverse().keyOf(searchValue);
    },
    max: function max(comparator) {
      return maxFactory(this, comparator);
    },
    maxBy: function maxBy(mapper, comparator) {
      return maxFactory(this, comparator, mapper);
    },
    min: function min(comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator);
    },
    minBy: function minBy(mapper, comparator) {
      return maxFactory(this, comparator ? neg(comparator) : defaultNegComparator, mapper);
    },
    rest: function rest() {
      return this.slice(1);
    },
    skip: function skip(amount) {
      return amount === 0 ? this : this.slice(Math.max(0, amount));
    },
    skipLast: function skipLast(amount) {
      return amount === 0 ? this : this.slice(0, -Math.max(0, amount));
    },
    skipWhile: function skipWhile(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, true));
    },
    skipUntil: function skipUntil(predicate, context) {
      return this.skipWhile(not(predicate), context);
    },
    sortBy: function sortBy(mapper, comparator) {
      return reify(this, sortFactory(this, comparator, mapper));
    },
    take: function take(amount) {
      return this.slice(0, Math.max(0, amount));
    },
    takeLast: function takeLast(amount) {
      return this.slice(-Math.max(0, amount));
    },
    takeWhile: function takeWhile(predicate, context) {
      return reify(this, takeWhileFactory(this, predicate, context));
    },
    takeUntil: function takeUntil(predicate, context) {
      return this.takeWhile(not(predicate), context);
    },
    update: function update2(fn) {
      return fn(this);
    },
    valueSeq: function valueSeq() {
      return this.toIndexedSeq();
    },
    hashCode: function hashCode() {
      return this.__hash || (this.__hash = hashCollection(this));
    }
  });
  var CollectionPrototype = Collection.prototype;
  CollectionPrototype[IS_COLLECTION_SYMBOL] = true;
  CollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.values;
  CollectionPrototype.toJSON = CollectionPrototype.toArray;
  CollectionPrototype.__toStringMapper = quoteString;
  CollectionPrototype.inspect = CollectionPrototype.toSource = function() {
    return this.toString();
  };
  CollectionPrototype.chain = CollectionPrototype.flatMap;
  CollectionPrototype.contains = CollectionPrototype.includes;
  mixin(KeyedCollection, {
    flip: function flip() {
      return reify(this, flipFactory(this));
    },
    mapEntries: function mapEntries(mapper, context) {
      var this$1$1 = this;
      var iterations = 0;
      return reify(this, this.toSeq().map(function(v2, k) {
        return mapper.call(context, [k, v2], iterations++, this$1$1);
      }).fromEntrySeq());
    },
    mapKeys: function mapKeys(mapper, context) {
      var this$1$1 = this;
      return reify(this, this.toSeq().flip().map(function(k, v2) {
        return mapper.call(context, k, v2, this$1$1);
      }).flip());
    }
  });
  var KeyedCollectionPrototype = KeyedCollection.prototype;
  KeyedCollectionPrototype[IS_KEYED_SYMBOL] = true;
  KeyedCollectionPrototype[ITERATOR_SYMBOL] = CollectionPrototype.entries;
  KeyedCollectionPrototype.toJSON = toObject;
  KeyedCollectionPrototype.__toStringMapper = function(v2, k) {
    return quoteString(k) + ": " + quoteString(v2);
  };
  mixin(IndexedCollection, {
    toKeyedSeq: function toKeyedSeq() {
      return new ToKeyedSequence(this, false);
    },
    filter: function filter(predicate, context) {
      return reify(this, filterFactory(this, predicate, context, false));
    },
    findIndex: function findIndex(predicate, context) {
      var entry = this.findEntry(predicate, context);
      return entry ? entry[0] : -1;
    },
    indexOf: function indexOf(searchValue) {
      var key = this.keyOf(searchValue);
      return key === void 0 ? -1 : key;
    },
    lastIndexOf: function lastIndexOf(searchValue) {
      var key = this.lastKeyOf(searchValue);
      return key === void 0 ? -1 : key;
    },
    reverse: function reverse() {
      return reify(this, reverseFactory(this, false));
    },
    slice: function slice(begin, end) {
      return reify(this, sliceFactory(this, begin, end, false));
    },
    splice: function splice(index, removeNum) {
      var numArgs = arguments.length;
      removeNum = Math.max(removeNum || 0, 0);
      if (numArgs === 0 || numArgs === 2 && !removeNum) {
        return this;
      }
      index = resolveBegin(index, index < 0 ? this.count() : this.size);
      var spliced = this.slice(0, index);
      return reify(this, numArgs === 1 ? spliced : spliced.concat(arrCopy(arguments, 2), this.slice(index + removeNum)));
    },
    findLastIndex: function findLastIndex(predicate, context) {
      var entry = this.findLastEntry(predicate, context);
      return entry ? entry[0] : -1;
    },
    first: function first2(notSetValue) {
      return this.get(0, notSetValue);
    },
    flatten: function flatten(depth) {
      return reify(this, flattenFactory(this, depth, false));
    },
    get: function get2(index, notSetValue) {
      index = wrapIndex(this, index);
      return index < 0 || this.size === Infinity || this.size !== void 0 && index > this.size ? notSetValue : this.find(function(_, key) {
        return key === index;
      }, void 0, notSetValue);
    },
    has: function has2(index) {
      index = wrapIndex(this, index);
      return index >= 0 && (this.size !== void 0 ? this.size === Infinity || index < this.size : this.indexOf(index) !== -1);
    },
    interpose: function interpose(separator) {
      return reify(this, interposeFactory(this, separator));
    },
    interleave: function interleave() {
      var collections = [this].concat(arrCopy(arguments));
      var zipped = zipWithFactory(this.toSeq(), IndexedSeq.of, collections);
      var interleaved = zipped.flatten(true);
      if (zipped.size) {
        interleaved.size = zipped.size * collections.length;
      }
      return reify(this, interleaved);
    },
    keySeq: function keySeq() {
      return Range(0, this.size);
    },
    last: function last(notSetValue) {
      return this.get(-1, notSetValue);
    },
    skipWhile: function skipWhile(predicate, context) {
      return reify(this, skipWhileFactory(this, predicate, context, false));
    },
    zip: function zip2() {
      var collections = [this].concat(arrCopy(arguments));
      return reify(this, zipWithFactory(this, defaultZipper, collections));
    },
    zipAll: function zipAll() {
      var collections = [this].concat(arrCopy(arguments));
      return reify(this, zipWithFactory(this, defaultZipper, collections, true));
    },
    zipWith: function zipWith(zipper) {
      var collections = arrCopy(arguments);
      collections[0] = this;
      return reify(this, zipWithFactory(this, zipper, collections));
    }
  });
  var IndexedCollectionPrototype = IndexedCollection.prototype;
  IndexedCollectionPrototype[IS_INDEXED_SYMBOL] = true;
  IndexedCollectionPrototype[IS_ORDERED_SYMBOL] = true;
  mixin(SetCollection, {
    get: function get2(value, notSetValue) {
      return this.has(value) ? value : notSetValue;
    },
    includes: function includes(value) {
      return this.has(value);
    },
    keySeq: function keySeq() {
      return this.valueSeq();
    }
  });
  var SetCollectionPrototype = SetCollection.prototype;
  SetCollectionPrototype.has = CollectionPrototype.includes;
  SetCollectionPrototype.contains = SetCollectionPrototype.includes;
  SetCollectionPrototype.keys = SetCollectionPrototype.values;
  mixin(KeyedSeq, KeyedCollectionPrototype);
  mixin(IndexedSeq, IndexedCollectionPrototype);
  mixin(SetSeq, SetCollectionPrototype);
  function reduce(collection, reducer, reduction, context, useFirst, reverse) {
    assertNotInfinite(collection.size);
    collection.__iterate(function(v2, k, c2) {
      if (useFirst) {
        useFirst = false;
        reduction = v2;
      } else {
        reduction = reducer.call(context, reduction, v2, k, c2);
      }
    }, reverse);
    return reduction;
  }
  function keyMapper(v2, k) {
    return k;
  }
  function entryMapper(v2, k) {
    return [k, v2];
  }
  function not(predicate) {
    return function() {
      return !predicate.apply(this, arguments);
    };
  }
  function neg(predicate) {
    return function() {
      return -predicate.apply(this, arguments);
    };
  }
  function defaultZipper() {
    return arrCopy(arguments);
  }
  function defaultNegComparator(a2, b2) {
    return a2 < b2 ? 1 : a2 > b2 ? -1 : 0;
  }
  function hashCollection(collection) {
    if (collection.size === Infinity) {
      return 0;
    }
    var ordered = isOrdered(collection);
    var keyed = isKeyed(collection);
    var h2 = ordered ? 1 : 0;
    var size = collection.__iterate(keyed ? ordered ? function(v2, k) {
      h2 = 31 * h2 + hashMerge(hash(v2), hash(k)) | 0;
    } : function(v2, k) {
      h2 = h2 + hashMerge(hash(v2), hash(k)) | 0;
    } : ordered ? function(v2) {
      h2 = 31 * h2 + hash(v2) | 0;
    } : function(v2) {
      h2 = h2 + hash(v2) | 0;
    });
    return murmurHashOfSize(size, h2);
  }
  function murmurHashOfSize(size, h2) {
    h2 = imul(h2, 3432918353);
    h2 = imul(h2 << 15 | h2 >>> -15, 461845907);
    h2 = imul(h2 << 13 | h2 >>> -13, 5);
    h2 = (h2 + 3864292196 | 0) ^ size;
    h2 = imul(h2 ^ h2 >>> 16, 2246822507);
    h2 = imul(h2 ^ h2 >>> 13, 3266489909);
    h2 = smi(h2 ^ h2 >>> 16);
    return h2;
  }
  function hashMerge(a2, b2) {
    return a2 ^ b2 + 2654435769 + (a2 << 6) + (a2 >> 2) | 0;
  }
  var OrderedSet = /* @__PURE__ */ function(Set2) {
    function OrderedSet2(value) {
      return value === void 0 || value === null ? emptyOrderedSet() : isOrderedSet(value) ? value : emptyOrderedSet().withMutations(function(set2) {
        var iter = SetCollection(value);
        assertNotInfinite(iter.size);
        iter.forEach(function(v2) {
          return set2.add(v2);
        });
      });
    }
    if (Set2)
      OrderedSet2.__proto__ = Set2;
    OrderedSet2.prototype = Object.create(Set2 && Set2.prototype);
    OrderedSet2.prototype.constructor = OrderedSet2;
    OrderedSet2.of = function of() {
      return this(arguments);
    };
    OrderedSet2.fromKeys = function fromKeys(value) {
      return this(KeyedCollection(value).keySeq());
    };
    OrderedSet2.prototype.toString = function toString2() {
      return this.__toString("OrderedSet {", "}");
    };
    return OrderedSet2;
  }(Set$1);
  OrderedSet.isOrderedSet = isOrderedSet;
  var OrderedSetPrototype = OrderedSet.prototype;
  OrderedSetPrototype[IS_ORDERED_SYMBOL] = true;
  OrderedSetPrototype.zip = IndexedCollectionPrototype.zip;
  OrderedSetPrototype.zipWith = IndexedCollectionPrototype.zipWith;
  OrderedSetPrototype.zipAll = IndexedCollectionPrototype.zipAll;
  OrderedSetPrototype.__empty = emptyOrderedSet;
  OrderedSetPrototype.__make = makeOrderedSet;
  function makeOrderedSet(map2, ownerID) {
    var set2 = Object.create(OrderedSetPrototype);
    set2.size = map2 ? map2.size : 0;
    set2._map = map2;
    set2.__ownerID = ownerID;
    return set2;
  }
  var EMPTY_ORDERED_SET;
  function emptyOrderedSet() {
    return EMPTY_ORDERED_SET || (EMPTY_ORDERED_SET = makeOrderedSet(emptyOrderedMap()));
  }
  function throwOnInvalidDefaultValues(defaultValues) {
    if (isRecord(defaultValues)) {
      throw new Error("Can not call `Record` with an immutable Record as default values. Use a plain javascript object instead.");
    }
    if (isImmutable(defaultValues)) {
      throw new Error("Can not call `Record` with an immutable Collection as default values. Use a plain javascript object instead.");
    }
    if (defaultValues === null || typeof defaultValues !== "object") {
      throw new Error("Can not call `Record` with a non-object as default values. Use a plain javascript object instead.");
    }
  }
  var Record = function Record2(defaultValues, name) {
    var hasInitialized;
    throwOnInvalidDefaultValues(defaultValues);
    var RecordType = function Record3(values) {
      var this$1$1 = this;
      if (values instanceof RecordType) {
        return values;
      }
      if (!(this instanceof RecordType)) {
        return new RecordType(values);
      }
      if (!hasInitialized) {
        hasInitialized = true;
        var keys = Object.keys(defaultValues);
        var indices = RecordTypePrototype._indices = {};
        RecordTypePrototype._name = name;
        RecordTypePrototype._keys = keys;
        RecordTypePrototype._defaultValues = defaultValues;
        for (var i2 = 0; i2 < keys.length; i2++) {
          var propName = keys[i2];
          indices[propName] = i2;
          if (RecordTypePrototype[propName]) {
            typeof console === "object" && console.warn && console.warn("Cannot define " + recordName(this) + ' with property "' + propName + '" since that property name is part of the Record API.');
          } else {
            setProp(RecordTypePrototype, propName);
          }
        }
      }
      this.__ownerID = void 0;
      this._values = List().withMutations(function(l2) {
        l2.setSize(this$1$1._keys.length);
        KeyedCollection(values).forEach(function(v2, k) {
          l2.set(this$1$1._indices[k], v2 === this$1$1._defaultValues[k] ? void 0 : v2);
        });
      });
      return this;
    };
    var RecordTypePrototype = RecordType.prototype = Object.create(RecordPrototype);
    RecordTypePrototype.constructor = RecordType;
    if (name) {
      RecordType.displayName = name;
    }
    return RecordType;
  };
  Record.prototype.toString = function toString2() {
    var str = recordName(this) + " { ";
    var keys = this._keys;
    var k;
    for (var i2 = 0, l2 = keys.length; i2 !== l2; i2++) {
      k = keys[i2];
      str += (i2 ? ", " : "") + k + ": " + quoteString(this.get(k));
    }
    return str + " }";
  };
  Record.prototype.equals = function equals(other) {
    return this === other || isRecord(other) && recordSeq(this).equals(recordSeq(other));
  };
  Record.prototype.hashCode = function hashCode() {
    return recordSeq(this).hashCode();
  };
  Record.prototype.has = function has2(k) {
    return this._indices.hasOwnProperty(k);
  };
  Record.prototype.get = function get2(k, notSetValue) {
    if (!this.has(k)) {
      return notSetValue;
    }
    var index = this._indices[k];
    var value = this._values.get(index);
    return value === void 0 ? this._defaultValues[k] : value;
  };
  Record.prototype.set = function set2(k, v2) {
    if (this.has(k)) {
      var newValues = this._values.set(this._indices[k], v2 === this._defaultValues[k] ? void 0 : v2);
      if (newValues !== this._values && !this.__ownerID) {
        return makeRecord(this, newValues);
      }
    }
    return this;
  };
  Record.prototype.remove = function remove2(k) {
    return this.set(k);
  };
  Record.prototype.clear = function clear() {
    var newValues = this._values.clear().setSize(this._keys.length);
    return this.__ownerID ? this : makeRecord(this, newValues);
  };
  Record.prototype.wasAltered = function wasAltered2() {
    return this._values.wasAltered();
  };
  Record.prototype.toSeq = function toSeq() {
    return recordSeq(this);
  };
  Record.prototype.toJS = function toJS$1() {
    return toJS(this);
  };
  Record.prototype.entries = function entries() {
    return this.__iterator(ITERATE_ENTRIES);
  };
  Record.prototype.__iterator = function __iterator(type, reverse) {
    return recordSeq(this).__iterator(type, reverse);
  };
  Record.prototype.__iterate = function __iterate(fn, reverse) {
    return recordSeq(this).__iterate(fn, reverse);
  };
  Record.prototype.__ensureOwner = function __ensureOwner(ownerID) {
    if (ownerID === this.__ownerID) {
      return this;
    }
    var newValues = this._values.__ensureOwner(ownerID);
    if (!ownerID) {
      this.__ownerID = ownerID;
      this._values = newValues;
      return this;
    }
    return makeRecord(this, newValues, ownerID);
  };
  Record.isRecord = isRecord;
  Record.getDescriptiveName = recordName;
  var RecordPrototype = Record.prototype;
  RecordPrototype[IS_RECORD_SYMBOL] = true;
  RecordPrototype[DELETE] = RecordPrototype.remove;
  RecordPrototype.deleteIn = RecordPrototype.removeIn = deleteIn;
  RecordPrototype.getIn = getIn;
  RecordPrototype.hasIn = CollectionPrototype.hasIn;
  RecordPrototype.merge = merge$1;
  RecordPrototype.mergeWith = mergeWith$1;
  RecordPrototype.mergeIn = mergeIn;
  RecordPrototype.mergeDeep = mergeDeep;
  RecordPrototype.mergeDeepWith = mergeDeepWith;
  RecordPrototype.mergeDeepIn = mergeDeepIn;
  RecordPrototype.setIn = setIn;
  RecordPrototype.update = update;
  RecordPrototype.updateIn = updateIn;
  RecordPrototype.withMutations = withMutations;
  RecordPrototype.asMutable = asMutable;
  RecordPrototype.asImmutable = asImmutable;
  RecordPrototype[ITERATOR_SYMBOL] = RecordPrototype.entries;
  RecordPrototype.toJSON = RecordPrototype.toObject = CollectionPrototype.toObject;
  RecordPrototype.inspect = RecordPrototype.toSource = function() {
    return this.toString();
  };
  function makeRecord(likeRecord, values, ownerID) {
    var record = Object.create(Object.getPrototypeOf(likeRecord));
    record._values = values;
    record.__ownerID = ownerID;
    return record;
  }
  function recordName(record) {
    return record.constructor.displayName || record.constructor.name || "Record";
  }
  function recordSeq(record) {
    return keyedSeqFromValue(record._keys.map(function(k) {
      return [k, record.get(k)];
    }));
  }
  function setProp(prototype, name) {
    try {
      Object.defineProperty(prototype, name, {
        get: function() {
          return this.get(name);
        },
        set: function(value) {
          invariant(this.__ownerID, "Cannot set on an immutable record.");
          this.set(name, value);
        }
      });
    } catch (error) {
    }
  }
  const _tmpl$$2 = /* @__PURE__ */ template(`<div><fieldset><legend>\u6807\u8BB0</legend><input type="text" placeholder="\u7559\u8A00"><button type="button">\u6211\u6B63\u5728\u505A</button><button type="button">\u6211\u5F88\u786E\u5B9A</button><button type="button">\u6211\u4E0D\u786E\u5B9A</button></fieldset><div><fieldset><legend> \u7559\u8A00 </legend><ul></ul></fieldset><div></div></div></div>`, 23), _tmpl$2$2 = /* @__PURE__ */ template(`<li><span></span></li>`, 4), _tmpl$3$1 = /* @__PURE__ */ template(`<div><p><strong></strong></p><ul></ul></div>`, 8), _tmpl$4$1 = /* @__PURE__ */ template(`<li></li>`, 2), _tmpl$5 = /* @__PURE__ */ template(`<li><p></p><ul></ul></li>`, 6), _tmpl$6 = /* @__PURE__ */ template(`<div></div>`, 2), _tmpl$7 = /* @__PURE__ */ template(`<ul></ul>`, 2), _tmpl$8 = /* @__PURE__ */ template(`<li><a></a></li>`, 4), _tmpl$9 = /* @__PURE__ */ template(`<p><strong></strong></p>`, 4);
  function strCmp(a2, b2) {
    if (a2 === b2) {
      return 0;
    } else if (a2 < b2) {
      return -1;
    } else {
      return 1;
    }
  }
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
    return K(tuple(aState, bState)).with(tuple(void 0, void 0), () => strCmp(aName, bName)).with(tuple(void 0, S.not(void 0)), () => 1).with(tuple(S.not(void 0), void 0), () => -1).with(tuple(S.not(void 0), S.not(void 0)), ([aState2, bState2]) => {
      const ord = stateToPriv(bState2) - stateToPriv(aState2);
      return ord === 0 ? strCmp(aName, bName) : ord;
    }).exhaustive();
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
  function cmpByKey([a2], [b2]) {
    return strCmp(a2, b2);
  }
  class Details {
    constructor(id, subjectItem, makeRender) {
      __publicField(this, "_details", Map$1());
      this.updateUI = createRoot(() => {
        const [details, setDetails] = createSignal(Map$1(), {});
        const updateUI = () => setDetails(this._details);
        const DetailsRender = makeRender(details);
        let itemType = subjectItem.querySelector(".item-type");
        assertIs(HTMLElement, itemType);
        itemType.classList.add(style.clickable);
        itemType.addEventListener("click", () => {
          let rect = itemType == null ? void 0 : itemType.getBoundingClientRect();
          const win = openWin({
            title: "\u8BE6\u7EC6\u7B54\u6848",
            height: 200,
            width: 300,
            top: rect == null ? void 0 : rect.top,
            left: rect == null ? void 0 : rect.left
          });
          render(() => (() => {
            const _el$ = _tmpl$$2.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, _el$5 = _el$4.nextSibling, _el$6 = _el$5.nextSibling, _el$7 = _el$6.nextSibling, _el$8 = _el$2.nextSibling, _el$9 = _el$8.firstChild, _el$10 = _el$9.firstChild, _el$11 = _el$10.nextSibling, _el$12 = _el$9.nextSibling;
            _el$4.addEventListener("change", (ev) => CLIENT.updateMsg(id, ev.currentTarget.value));
            _el$5.addEventListener("click", () => CLIENT.updateState(id, AnswerState.WorkingOn));
            _el$6.addEventListener("click", () => CLIENT.updateState(id, AnswerState.Sure));
            _el$7.addEventListener("click", () => CLIENT.updateState(id, AnswerState.NotSure));
            insert(_el$11, createComponent(For, {
              get each() {
                return pipe(details()).then(sort(cmpNameWithAnswerAndCtx)).then(collectArray).exec();
              },
              children: ([user, {
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
              }
            }));
            insert(_el$12, createComponent(DetailsRender, {}));
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
        });
        return updateUI;
      });
    }
    updateAnswer(username, data) {
      this._details = this._details.set(username, data);
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
      const tooltips = pipe(subjectItem.querySelectorAll(".item-body .checkboxInput, .item-body .radioInput")).then((t2) => Array.from(t2)).then(enumerate).then(fold(/* @__PURE__ */ new Map(), (tooltips2, [idx, ele]) => tooltips2.set(String.fromCharCode(idx + 65), new Tooltip(ele)))).exec();
      super(id, subjectItem, (details) => {
        const choiceToUsers = createMemo(() => pipe(details()).then(fold(/* @__PURE__ */ new Map(), (choiceToUsers2, [user, {
          answer,
          context
        }]) => {
          var _a;
          if (answer !== void 0) {
            for (let choice of answer) {
              choice = choiceMap(choice);
              const users = (_a = choiceToUsers2.get(choice)) != null ? _a : [];
              users.push([user, context]);
              choiceToUsers2.set(choice, users);
            }
          }
          return choiceToUsers2;
        })).then(sort(cmpByKey)).then(collectArray).exec());
        createEffect(() => {
          pipe(choiceToUsers()).then(forEach(([choice, users]) => {
            var _a;
            (_a = tooltips.get(choice)) == null ? void 0 : _a.setContent(percent(users.length, details().size));
          }));
        });
        return () => createComponent(For, {
          get each() {
            return choiceToUsers();
          },
          children: ([choice, users]) => (() => {
            const _el$15 = _tmpl$3$1.cloneNode(true), _el$16 = _el$15.firstChild, _el$17 = _el$16.firstChild, _el$18 = _el$16.nextSibling;
            insert(_el$17, choice);
            insert(_el$18, createComponent(For, {
              get each() {
                return users.sort(cmpNameWithCtx);
              },
              children: ([user, ctx]) => (() => {
                const _el$19 = _tmpl$4$1.cloneNode(true);
                insert(_el$19, user);
                createRenderEffect(() => className(_el$19, stateToClass(ctx == null ? void 0 : ctx.state)));
                return _el$19;
              })()
            }));
            return _el$15;
          })()
        });
      });
    }
  }
  class Blank extends Details {
    constructor(id, subjectItem) {
      const tooltips = pipe(subjectItem.querySelectorAll(".item-body .blank-item-dynamic")).then(Array.from).then(enumerate).then(fold(/* @__PURE__ */ new Map(), (tooltips2, [idx, ele]) => tooltips2.set(String.fromCharCode(idx + 49), new Tooltip(ele)))).exec();
      super(id, subjectItem, (details) => {
        const blankToFillToUsers = () => pipe(details()).then(fold(/* @__PURE__ */ new Map(), (blankToFillToUsers2, [user, {
          answer,
          context
        }]) => {
          if (answer === void 0) {
            return blankToFillToUsers2;
          }
          return pipe(answer).then(Object.entries).then(fold(blankToFillToUsers2, (blankToFillToUsers3, [blank, fill]) => {
            var _a, _b;
            fill = fill.trim();
            const fillToUsers = (_a = blankToFillToUsers3.get(blank)) != null ? _a : /* @__PURE__ */ new Map();
            const users = (_b = fillToUsers.get(fill)) != null ? _b : [];
            users.push([user, context]);
            return blankToFillToUsers3.set(blank, fillToUsers.set(fill, users));
          })).exec();
        })).then(map(([blank, fillToUsers]) => tuple(blank, pipe(fillToUsers).then(sort(cmpByKey)).then(collectArray).exec()))).then(sort(cmpByKey)).then(collectArray).exec();
        createEffect(() => {
          pipe(blankToFillToUsers()).then(forEach(([blank, fillToUsers]) => {
            var _a;
            const most = pipe(fillToUsers).then(map(([fill, users]) => tuple(fill, users.length))).then(sort(([_1, a2], [_2, b2]) => b2 - a2)).then(first).exec();
            (_a = tooltips.get(blank)) == null ? void 0 : _a.setContent(most === void 0 ? "" : `(${percent(most[1], details().size)}) ${most[0]}`);
          }));
        });
        return () => createComponent(For, {
          get each() {
            return blankToFillToUsers();
          },
          children: ([blank, fillToUsers]) => (() => {
            const _el$20 = _tmpl$3$1.cloneNode(true), _el$21 = _el$20.firstChild, _el$22 = _el$21.firstChild, _el$23 = _el$21.nextSibling;
            insert(_el$22, `#${blank}`);
            insert(_el$23, createComponent(For, {
              each: fillToUsers,
              children: ([fill, users]) => {
                if (fill === "") {
                  return;
                }
                return (() => {
                  const _el$24 = _tmpl$5.cloneNode(true), _el$25 = _el$24.firstChild, _el$26 = _el$25.nextSibling;
                  insert(_el$25, fill);
                  insert(_el$26, createComponent(For, {
                    get each() {
                      return users.sort(cmpNameWithCtx);
                    },
                    children: ([user, ctx]) => (() => {
                      const _el$27 = _tmpl$4$1.cloneNode(true);
                      insert(_el$27, user);
                      createRenderEffect(() => className(_el$27, stateToClass(ctx == null ? void 0 : ctx.state)));
                      return _el$27;
                    })()
                  }));
                  createRenderEffect(() => className(_el$25, style.answerDetailFill));
                  return _el$24;
                })();
              }
            }));
            return _el$20;
          })()
        });
      });
    }
  }
  class ShortAnswer extends Details {
    constructor(id, subjectItem) {
      super(id, subjectItem, (details) => {
        const userToAnswers = createMemo(() => pipe(details()).then(sort(cmpNameWithAnswerAndCtx)).then(collectArray).exec());
        return () => createComponent(For, {
          get each() {
            return userToAnswers();
          },
          children: ([user, {
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
                insert(_el$29, createComponent(For, {
                  each: filelist,
                  children: ({
                    fileUrl,
                    fileName
                  }) => (() => {
                    const _el$30 = _tmpl$8.cloneNode(true), _el$31 = _el$30.firstChild;
                    setAttribute(_el$31, "href", fileUrl);
                    insert(_el$31, fileName);
                    return _el$30;
                  })()
                }));
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
          }
        });
      });
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
      this._details = pipe(subjectItems).then(zip(problems)).then(fold(/* @__PURE__ */ new Map(), (details, [subjectItem, prob]) => {
        let detail;
        switch (prob.ProblemType) {
          case ProblemType.SingleChoice:
          case ProblemType.MultipleChoice:
          case ProblemType.Polling:
          case ProblemType.Judgement:
            assertNonNull(prob.Options, "null choices");
            const choiceMap = prob.ProblemType === ProblemType.Judgement ? /* @__PURE__ */ new Map([["true", "\u6B63\u786E"], ["false", "\u9519\u8BEF"]]) : pipe(prob.Options).then(enumerate).then(fold(/* @__PURE__ */ new Map(), (choiceMap2, [idx, {
              key
            }]) => choiceMap2.set(key, String.fromCharCode(65 + idx)))).exec();
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
      })).exec();
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
