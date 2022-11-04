// ==UserScript==
// @name         yuk-client
// @version      0.8.0
// @author       doge2x
// @icon         https://www.yuketang.cn/static/images/favicon.ico
// @match        https://examination.xuetangx.com/*
// @grant        GM.xmlHttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// ==/UserScript==
var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
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
      return function(v) {
        return step([n, v]);
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
      return function(v) {
        return step([n, v]);
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
  var __spreadArray = commonjsGlobal && commonjsGlobal.__spreadArray || function(to, from2, pack) {
    if (pack || arguments.length === 2)
      for (var i = 0, l = from2.length, ar; i < l; i++) {
        if (ar || !(i in from2)) {
          if (!ar)
            ar = Array.prototype.slice.call(from2, 0, i);
          ar[i] = from2[i];
        }
      }
    return to.concat(ar || Array.prototype.slice.call(from2));
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
              return [4, this.callMethod(method, request, serverParams)];
            case 2:
              response = _a.sent();
              return [2, mapResponse(request, response)];
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
        if (method) {
          return method(request2, serverParams2);
        } else if (request2.id !== void 0) {
          return Promise.resolve(createMethodNotFoundResponse(request2.id));
        } else {
          return Promise.resolve(null);
        }
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
      return function(v) {
        return step([n, v]);
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
    var __createBinding = commonjsGlobal && commonjsGlobal.__createBinding || (Object.create ? function(o, m, k, k2) {
      if (k2 === void 0)
        k2 = k;
      var desc = Object.getOwnPropertyDescriptor(m, k);
      if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function() {
          return m[k];
        } };
      }
      Object.defineProperty(o, k2, desc);
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
  const sharedConfig = {};
  function setHydrateContext(context) {
    sharedConfig.context = context;
  }
  const equalFn = (a, b) => a === b;
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
    const listener = Listener, owner = Owner, unowned = fn.length === 0, root = unowned && false ? UNOWNED : {
      owned: null,
      cleanups: null,
      context: null,
      owner: detachedOwner || owner
    }, updateFn = unowned ? () => fn(() => {
      throw new Error("Dispose method must be an explicit argument to createRoot function");
    }) : () => fn(() => cleanNode(root));
    {
      if (owner)
        root.name = `${owner.name}-r${rootCount++}`;
      globalThis._$afterCreateRoot && globalThis._$afterCreateRoot(root);
    }
    Owner = root;
    Listener = null;
    try {
      return runUpdates(updateFn, true);
    } finally {
      Listener = listener;
      Owner = owner;
    }
  }
  function createSignal(value, options) {
    options = options ? Object.assign({}, signalOptions, options) : signalOptions;
    const s = {
      value,
      observers: null,
      observerSlots: null,
      pending: NOTPENDING,
      comparator: options.equals || void 0
    };
    if (!options.internal)
      s.name = registerGraph(options.name || hashValue(value), s);
    const setter = (value2) => {
      if (typeof value2 === "function") {
        value2 = value2(s.pending !== NOTPENDING ? s.pending : s.value);
      }
      return writeSignal(s, value2);
    };
    return [readSignal.bind(s), setter];
  }
  function createRenderEffect(fn, value, options) {
    const c = createComputation(fn, value, false, STALE, options);
    updateComputation(c);
  }
  function createEffect(fn, value, options) {
    runEffects = runUserEffects;
    const c = createComputation(fn, value, false, STALE, options);
    c.user = true;
    Effects ? Effects.push(c) : updateComputation(c);
  }
  function createMemo(fn, value, options) {
    options = options ? Object.assign({}, signalOptions, options) : signalOptions;
    const c = createComputation(fn, value, true, 0, options);
    c.pending = NOTPENDING;
    c.observers = null;
    c.observerSlots = null;
    c.comparator = options.equals || void 0;
    updateComputation(c);
    return readSignal.bind(c);
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
      for (let i = 0; i < q.length; i += 1) {
        const data = q[i];
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
    const c = createComputation(() => untrack(() => {
      Object.assign(Comp, {
        [$DEVCOMP]: true
      });
      return Comp(props);
    }), void 0, true);
    c.pending = NOTPENDING;
    c.observers = null;
    c.observerSlots = null;
    c.state = 0;
    c.componentName = Comp.name;
    updateComputation(c);
    return c.tValue !== void 0 ? c.tValue : c.value;
  }
  function hashValue(v) {
    const s = /* @__PURE__ */ new Set();
    return `s${typeof v === "string" ? hash(v) : hash(JSON.stringify(v, (k, v2) => {
      if (typeof v2 === "object" && v2 != null) {
        if (s.has(v2))
          return;
        s.add(v2);
        const keys = Object.keys(v2);
        const desc = Object.getOwnPropertyDescriptors(v2);
        const newDesc = keys.reduce((memo, key) => {
          const value = desc[key];
          if (!value.get)
            memo[key] = value;
          return memo;
        }, {});
        v2 = Object.create({}, newDesc);
      }
      if (typeof v2 === "bigint") {
        return `${v2.toString()}n`;
      }
      return v2;
    }) || "")}`;
  }
  function registerGraph(name, value) {
    let tryName = name;
    if (Owner) {
      let i = 0;
      Owner.sourceMap || (Owner.sourceMap = {});
      while (Owner.sourceMap[tryName])
        tryName = `${name}-${++i}`;
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
        for (let i = 0; i < node.observers.length; i += 1) {
          const o = node.observers[i];
          if (TransitionRunning && Transition.disposed.has(o))
            ;
          if (TransitionRunning && !o.tState || !TransitionRunning && !o.state) {
            if (o.pure)
              Updates.push(o);
            else
              Effects.push(o);
            if (o.observers)
              markDownstream(o);
          }
          if (TransitionRunning)
            ;
          else
            o.state = STALE;
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
    const c = {
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
          Owner.owned = [c];
        else
          Owner.owned.push(c);
      }
      c.name = options && options.name || `${Owner.name || "c"}-${(Owner.owned || Owner.tOwned).length}`;
    }
    return c;
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
    for (let i = ancestors.length - 1; i >= 0; i--) {
      node = ancestors[i];
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
      if (!Updates)
        Effects = null;
      handleError(err);
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
    for (let i = 0; i < queue.length; i++)
      runTop(queue[i]);
  }
  function runUserEffects(queue) {
    let i, userLength = 0;
    for (i = 0; i < queue.length; i++) {
      const e = queue[i];
      if (!e.user)
        runTop(e);
      else
        queue[userLength++] = e;
    }
    if (sharedConfig.context)
      setHydrateContext();
    const resume = queue.length;
    for (i = 0; i < userLength; i++)
      runTop(queue[i]);
    for (i = resume; i < queue.length; i++)
      runTop(queue[i]);
  }
  function lookUpstream(node, ignore) {
    const runningTransition = Transition;
    node.state = 0;
    for (let i = 0; i < node.sources.length; i += 1) {
      const source = node.sources[i];
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
    for (let i = 0; i < node.observers.length; i += 1) {
      const o = node.observers[i];
      if (!o.state || runningTransition) {
        o.state = PENDING;
        if (o.pure)
          Updates.push(o);
        else
          Effects.push(o);
        o.observers && markDownstream(o);
      }
    }
  }
  function cleanNode(node) {
    let i;
    if (node.sources) {
      while (node.sources.length) {
        const source = node.sources.pop(), index = node.sourceSlots.pop(), obs = source.observers;
        if (obs && obs.length) {
          const n = obs.pop(), s = source.observerSlots.pop();
          if (index < obs.length) {
            n.sourceSlots[s] = index;
            obs[index] = n;
            source.observerSlots[index] = s;
          }
        }
      }
    }
    if (node.owned) {
      for (i = 0; i < node.owned.length; i++)
        cleanNode(node.owned[i]);
      node.owned = null;
    }
    if (node.cleanups) {
      for (i = 0; i < node.cleanups.length; i++)
        node.cleanups[i]();
      node.cleanups = null;
    }
    node.state = 0;
    node.context = null;
    delete node.sourceMap;
  }
  function handleError(err) {
    throw err;
  }
  function hash(s) {
    for (var i = 0, h = 9; i < s.length; )
      h = Math.imul(h ^ s.charCodeAt(i++), 9 ** 9);
    return `${h ^ h >>> 9}`;
  }
  const FALLBACK = Symbol("fallback");
  function dispose(d) {
    for (let i = 0; i < d.length; i++)
      d[i]();
  }
  function mapArray(list, mapFn, options = {}) {
    let items = [], mapped = [], disposers = [], len = 0, indexes = mapFn.length > 1 ? [] : null;
    onCleanup(() => dispose(disposers));
    return () => {
      let newItems = list() || [], i, j;
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
            i = newIndices.get(item);
            newIndicesNext[j] = i === void 0 ? -1 : i;
            newIndices.set(item, j);
          }
          for (i = start; i <= end; i++) {
            item = items[i];
            j = newIndices.get(item);
            if (j !== void 0 && j !== -1) {
              temp[j] = mapped[i];
              tempdisposers[j] = disposers[i];
              indexes && (tempIndexes[j] = indexes[i]);
              j = newIndicesNext[j];
              newIndices.set(item, j);
            } else
              disposers[i]();
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
          const [s, set] = createSignal(j);
          indexes[j] = set;
          return mapFn(newItems[j], s);
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
  function Show(props) {
    let strictEqual = false;
    const condition = createMemo(() => props.when, void 0, {
      equals: (a, b) => strictEqual ? a === b : !a === !b
    });
    return createMemo(() => {
      const c = condition();
      if (c) {
        const child = props.children;
        return (strictEqual = typeof child === "function" && child.length > 0) ? untrack(() => child(c)) : child;
      }
      return props.fallback;
    });
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
  function reconcileArrays(parentNode, a, b) {
    let bLength = b.length, aEnd = a.length, bEnd = bLength, aStart = 0, bStart = 0, after = a[aEnd - 1].nextSibling, map2 = null;
    while (aStart < aEnd || bStart < bEnd) {
      if (a[aStart] === b[bStart]) {
        aStart++;
        bStart++;
        continue;
      }
      while (a[aEnd - 1] === b[bEnd - 1]) {
        aEnd--;
        bEnd--;
      }
      if (aEnd === aStart) {
        const node = bEnd < bLength ? bStart ? b[bStart - 1].nextSibling : b[bEnd - bStart] : after;
        while (bStart < bEnd)
          parentNode.insertBefore(b[bStart++], node);
      } else if (bEnd === bStart) {
        while (aStart < aEnd) {
          if (!map2 || !map2.has(a[aStart]))
            a[aStart].remove();
          aStart++;
        }
      } else if (a[aStart] === b[bEnd - 1] && b[bStart] === a[aEnd - 1]) {
        const node = a[--aEnd].nextSibling;
        parentNode.insertBefore(b[bStart++], a[aStart++].nextSibling);
        parentNode.insertBefore(b[--bEnd], node);
        a[aEnd] = b[bEnd];
      } else {
        if (!map2) {
          map2 = /* @__PURE__ */ new Map();
          let i = bStart;
          while (i < bEnd)
            map2.set(b[i], i++);
        }
        const index = map2.get(a[aStart]);
        if (index != null) {
          if (bStart < index && index < bEnd) {
            let i = aStart, sequence = 1, t;
            while (++i < aEnd && i < bEnd) {
              if ((t = map2.get(a[i])) == null || t !== index + sequence)
                break;
              sequence++;
            }
            if (sequence > index - bStart) {
              const node = a[aStart];
              while (bStart < index)
                parentNode.insertBefore(b[bStart++], node);
            } else
              parentNode.replaceChild(b[bStart++], a[aStart++]);
          } else
            aStart++;
        } else
          a[aStart++].remove();
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
    const t = document.createElement("template");
    t.innerHTML = html;
    if (check && t.innerHTML.split("<").length - 1 !== check)
      throw `The browser resolved template HTML does not match JSX input:
${t.innerHTML}

${html}. Is your HTML properly formed?`;
    let node = t.content.firstChild;
    if (isSVG)
      node = node.firstChild;
    return node;
  }
  function delegateEvents(eventNames, document2 = window.document) {
    const e = document2[$$EVENTS] || (document2[$$EVENTS] = /* @__PURE__ */ new Set());
    for (let i = 0, l = eventNames.length; i < l; i++) {
      const name = eventNames[i];
      if (!e.has(name)) {
        e.add(name);
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
      const handlerFn = handler[0];
      node.addEventListener(name, handler[0] = (e) => handlerFn.call(node, handler[1], e));
    } else
      node.addEventListener(name, handler);
  }
  function classList(node, value, prev = {}) {
    const classKeys = Object.keys(value || {}), prevKeys = Object.keys(prev);
    let i, len;
    for (i = 0, len = prevKeys.length; i < len; i++) {
      const key = prevKeys[i];
      if (!key || key === "undefined" || value[key])
        continue;
      toggleClassKey(node, key, false);
      delete prev[key];
    }
    for (i = 0, len = classKeys.length; i < len; i++) {
      const key = classKeys[i], classValue = !!value[key];
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
    let v, s;
    for (s in prev) {
      value[s] == null && nodeStyle.removeProperty(s);
      delete prev[s];
    }
    for (s in value) {
      v = value[s];
      if (v !== prev[s]) {
        nodeStyle.setProperty(s, v);
        prev[s] = v;
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
    return name.toLowerCase().replace(/-([a-z])/g, (_, w) => w.toUpperCase());
  }
  function toggleClassKey(node, key, value) {
    const classNames = key.trim().split(/\s+/);
    for (let i = 0, nameLen = classNames.length; i < nameLen; i++)
      node.classList.toggle(classNames[i], value);
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
      const e = prop.slice(3);
      prev && node.removeEventListener(e, prev);
      value && node.addEventListener(e, value);
    } else if (prop.slice(0, 10) === "oncapture:") {
      const e = prop.slice(10);
      prev && node.removeEventListener(e, prev, true);
      value && node.addEventListener(e, value, true);
    } else if (prop.slice(0, 2) === "on") {
      const name = prop.slice(2).toLowerCase();
      const delegate = DelegatedEvents.has(name);
      if (!delegate && prev) {
        const h = Array.isArray(prev) ? prev[0] : prev;
        node.removeEventListener(name, h);
      }
      if (delegate || value) {
        addEventListener(node, name, value, delegate);
        delegate && delegateEvents([name]);
      }
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
  function eventHandler(e) {
    const key = `$$${e.type}`;
    let node = e.composedPath && e.composedPath()[0] || e.target;
    if (e.target !== node) {
      Object.defineProperty(e, "target", {
        configurable: true,
        value: node
      });
    }
    Object.defineProperty(e, "currentTarget", {
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
        data !== void 0 ? handler.call(node, data, e) : handler.call(node, e);
        if (e.cancelBubble)
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
    const t = typeof value, multi = marker !== void 0;
    parent = multi && current[0] && current[0].parentNode || parent;
    if (t === "string" || t === "number") {
      if (sharedConfig.context)
        return current;
      if (t === "number")
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
    } else if (value == null || t === "boolean") {
      if (sharedConfig.context)
        return current;
      current = cleanChildren(parent, current, marker);
    } else if (t === "function") {
      createRenderEffect(() => {
        let v = value();
        while (typeof v === "function")
          v = v();
        current = insertExpression(parent, v, current, marker);
      });
      return () => current;
    } else if (Array.isArray(value)) {
      const array = [];
      const currentArray = current && Array.isArray(current);
      if (normalizeIncomingArray(array, value, current, unwrapArray)) {
        createRenderEffect(() => current = insertExpression(parent, array, current, marker, true));
        return () => current;
      }
      if (sharedConfig.context) {
        for (let i = 0; i < array.length; i++) {
          if (array[i].parentNode)
            return current = array;
        }
      }
      if (array.length === 0) {
        current = cleanChildren(parent, current, marker);
        if (multi)
          return current;
      } else if (currentArray) {
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
  function normalizeIncomingArray(normalized, array, current, unwrap) {
    let dynamic = false;
    for (let i = 0, len = array.length; i < len; i++) {
      let item = array[i], prev = current && current[i];
      if (item instanceof Node) {
        normalized.push(item);
      } else if (item == null || item === true || item === false)
        ;
      else if (Array.isArray(item)) {
        dynamic = normalizeIncomingArray(normalized, item, prev) || dynamic;
      } else if (typeof item === "function") {
        if (unwrap) {
          while (typeof item === "function")
            item = item();
          dynamic = normalizeIncomingArray(normalized, Array.isArray(item) ? item : [item], prev) || dynamic;
        } else {
          normalized.push(item);
          dynamic = true;
        }
      } else {
        const value = String(item);
        if (prev && prev.nodeType === 3 && prev.data === value) {
          normalized.push(prev);
        } else
          normalized.push(document.createTextNode(value));
      }
    }
    return dynamic;
  }
  function appendNodes(parent, array, marker) {
    for (let i = 0, len = array.length; i < len; i++)
      parent.insertBefore(array[i], marker);
  }
  function cleanChildren(parent, current, marker, replacement) {
    if (marker === void 0)
      return parent.textContent = "";
    const node = replacement || document.createTextNode("");
    if (current.length) {
      let inserted = false;
      for (let i = current.length - 1; i >= 0; i--) {
        const el = current[i];
        if (node !== el) {
          const isParent = el.parentNode === parent;
          if (!inserted && !i)
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
  function from(t) {
    if (t === null) {
      return;
    }
    return t;
  }
  function expect(msg) {
    return function(t) {
      if (t === void 0) {
        throw new Error(msg != null ? msg : "expect some value");
      }
      return t;
    };
  }
  function map$1(f) {
    return function(a) {
      return a !== void 0 ? f(a) : void 0;
    };
  }
  function or2(b) {
    return function(a) {
      return a !== void 0 || b !== void 0 ? [a, b] : void 0;
    };
  }
  function map(op) {
    return function* (it) {
      for (const a of it) {
        yield op(a);
      }
    };
  }
  function* enumerate(it) {
    let i = 0;
    for (const a of it) {
      yield [i++, a];
    }
  }
  function filter(p) {
    return function* (it) {
      for (const a of it) {
        if (p(a)) {
          yield a;
        }
      }
    };
  }
  function filterMap(f) {
    return function* (it) {
      for (const a of it) {
        const t = f(a);
        if (t !== void 0) {
          yield t;
        }
      }
    };
  }
  function zip(b) {
    return function* (a) {
      const it1 = a[Symbol.iterator]();
      const it2 = b[Symbol.iterator]();
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
    for (const t of it) {
      return t;
    }
    return;
  }
  function fold(init, f) {
    return function(it) {
      let b = init;
      for (const a of it) {
        b = f(b, a);
      }
      return b;
    };
  }
  function count(it) {
    let i = 0;
    for (const _ of it) {
      i++;
    }
    return i;
  }
  function collectArray(it) {
    return Array.from(it);
  }
  function forEach(f) {
    return function(it) {
      for (const t of it) {
        f(t);
      }
    };
  }
  class Ref {
    constructor(t) {
      __publicField(this, "t");
      this.t = t;
    }
    static from(t) {
      return new Ref(t);
    }
    static unwrap(t) {
      return t.t;
    }
  }
  class Lazy {
    constructor(init) {
      __publicField(this, "_init");
      __publicField(this, "_t");
      this._init = init;
    }
    static from(init) {
      return new Lazy(init);
    }
    force() {
      if (this._t === void 0) {
        this._t = Ref.from(this._init());
      }
      return this._t.t;
    }
  }
  class Pipe {
    constructor(t) {
      __publicField(this, "_t");
      this._t = t;
    }
    then(f) {
      return new Pipe(f(this._t));
    }
    static from(t) {
      return new Pipe(t);
    }
    unwrap() {
      return this._t;
    }
  }
  var styleCss = "._mainBody_bsm4g_1 {\n  opacity: 0.5;\n}\n._mainBody_bsm4g_1 * {\n  font-size: 0.75rem;\n  margin: 0;\n}\n._mainBody_bsm4g_1 button {\n  cursor: pointer;\n}\n._clickable_bsm4g_11 {\n  cursor: pointer;\n}\n._stateWorkingOn_bsm4g_14 {\n  color: blue;\n}\n._stateSure_bsm4g_17 {\n  color: green;\n}\n._stateNotSure_bsm4g_20 {\n  color: red;\n}\n._answerMsg_bsm4g_23 {\n  border-style: groove;\n  border-width: thin;\n  opacity: 0.75;\n  margin-bottom: 0.5rem;\n}\n._answerMsg_bsm4g_23 ul {\n  padding-left: 1rem;\n}\n._answerMsgName_bsm4g_32 {\n  font-weight: bold;\n}\n._answerMark_bsm4g_35 {\n  display: flex;\n  justify-content: end;\n  align-items: center;\n  border-style: groove;\n  border-width: thin;\n  margin-bottom: 0.5rem;\n  opacity: 0.75;\n}\n._answerMark_bsm4g_35 button {\n  padding: 0;\n  margin-left: 0.5rem;\n  white-space: nowrap;\n}\n._answerMark_bsm4g_35 input {\n  height: max-content;\n  width: 100%;\n}\n._answerDetail_bsm4g_53 ._stateWorkingOn_bsm4g_14,\n._answerDetail_bsm4g_53 ._stateSure_bsm4g_17,\n._answerDetail_bsm4g_53 ._stateNotSure_bsm4g_20 {\n  font-weight: bold;\n}\n._answerDetail_bsm4g_53 ul {\n  padding-left: 1.5rem;\n}\n._answerDetail_bsm4g_53 ul ul {\n  padding-left: 1rem;\n}\n._answerDetail_bsm4g_53 img {\n  height: auto;\n  width: 80%;\n}\n._answerDetailShortAnswer_bsm4g_68 {\n  border-style: groove;\n  border-width: thin;\n  margin: 0.2rem;\n  padding: 0.2rem;\n  min-width: min-content;\n}\n._answerDetailFill_bsm4g_75 {\n  white-space: pre;\n}\n._settings_bsm4g_78 {\n  border-style: groove;\n  border-width: thin;\n  display: flex;\n  flex-direction: column;\n  padding: 0.5rem;\n  margin-bottom: 0.5rem;\n}\n._settingsEntry_bsm4g_86 {\n  display: flex;\n  flex-direction: row;\n  margin-bottom: 0.5rem;\n  justify-content: space-between;\n  align-items: center;\n}\n._settingsEntry_bsm4g_86 label {\n  font-weight: bold;\n}\n._settingsEntry_bsm4g_86 input {\n  height: max-content;\n  text-align: right;\n}\n._settingsSubmit_bsm4g_100 {\n  display: flex;\n  flex-direction: row;\n  align-items: center;\n  justify-content: end;\n}\n._settingsSubmitTip_bsm4g_106 {\n  margin-right: 0.5rem;\n}\n._about_bsm4g_109 p {\n  margin-bottom: 0.25rem;\n}\n._about_bsm4g_109 ul {\n  padding-left: 1.5rem;\n  margin-bottom: 0.25rem;\n}\n._about_bsm4g_109 ul li {\n  margin-bottom: 0.25rem;\n}\n._uploadImg_bsm4g_119 {\n  display: flex;\n  flex-direction: column;\n}\n._uploadImg_bsm4g_119 img {\n  width: 100%;\n  height: auto;\n}\n._uploadImgImage_bsm4g_127 {\n  border-style: groove;\n  border-width: thin;\n  padding: 0.5rem;\n}\n._uploadImgConfirm_bsm4g_132 {\n  display: flex;\n  flex-direction: row;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 0.5rem;\n}\n";
  const _tmpl$$3 = /* @__PURE__ */ template(`<title> </title>`, 2), _tmpl$2$3 = /* @__PURE__ */ template(`<style></style>`, 2);
  function assertIs(ty, value, msg) {
    assert(value instanceof ty, msg != null ? msg : "not HTMLElement");
  }
  function assert(value, msg) {
    if (value !== true) {
      throw Error(msg != null ? msg : "assertion failed");
    }
  }
  function tuple(...t) {
    return t;
  }
  function openWin(opts) {
    const win = Pipe.from(window.open("", "", Object.entries(opts).map(([k, v]) => `${k}=${v}`).join(","))).then(from).then(expect("cannot open windows")).unwrap();
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
    for (const [k, v] of Object.entries(params != null ? params : {})) {
      url2.searchParams.set(k, v);
    }
    return url2;
  }
  function getValue(key) {
    const val = GM_getValue(key);
    if (val !== void 0) {
      return val.contents;
    }
    return;
  }
  function setValue(key, val) {
    GM_setValue(key, { contents: val });
    return val;
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
    setValue(
      "migrations",
      migrations.map((v, i) => ({ name: v.name, idx: i }))
    );
  }
  class GMEntry {
    constructor(name, init) {
      __publicField(this, "_name");
      __publicField(this, "_t");
      this._name = name;
      this._t = Lazy.from(() => {
        const val = getValue(this._name);
        if (val === void 0 && init !== void 0) {
          return setValue(this._name, init);
        }
        return val;
      });
    }
    get() {
      return this._t.force();
    }
    set(val) {
      if (val === void 0) {
        return;
      }
      setValue(this._name, val);
      this._t = Lazy.from(() => val);
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
    updateQueue(id, f) {
      let val = this.queue.get(id);
      if (val !== void 0) {
        f(val);
      } else {
        val = {};
        f(val);
        this.queue.set(id, val);
      }
    }
    updateAnswer(id, result) {
      this.updateQueue(id, (v) => v.result = result);
    }
    updateState(id, state) {
      this.updateQueue(id, (v) => {
        var _a;
        v.context = (_a = v.context) != null ? _a : {};
        v.context.state = state;
      });
    }
    updateMsg(id, msg) {
      this.updateQueue(id, (v) => {
        var _a;
        v.context = (_a = v.context) != null ? _a : {};
        v.context.msg = msg;
      });
    }
    async watch(ms) {
      return new Promise((_, err) => {
        const timer = setInterval(() => {
          this.sendQueue().catch((e) => {
            clearInterval(timer);
            alert(`\u4E0E\u670D\u52A1\u5668\u901A\u4FE1\u5F02\u5E38: ${e}`);
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
      const syncAnswers = SYNC_ANSWERS.get();
      const server2 = SERVER.get();
      const username = USERNAME.get();
      if (syncAnswers !== true || this.queue.size < 1 || server2 === void 0 || username === void 0 || this.examId === void 0 || this.paper === void 0) {
        return;
      }
      const answers = [...this.queue.entries()];
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
                  client2.receive(
                    Pipe.from(resp.responseText).then(expect("empty response")).then(JSON.parse).unwrap()
                  );
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
          this.paper,
          "0.8.0"
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
    XMLHttpRequest.prototype.open = function(_, url) {
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
  const mainBody = "_mainBody_bsm4g_1";
  const clickable = "_clickable_bsm4g_11";
  const stateWorkingOn = "_stateWorkingOn_bsm4g_14";
  const stateSure = "_stateSure_bsm4g_17";
  const stateNotSure = "_stateNotSure_bsm4g_20";
  const answerMsg = "_answerMsg_bsm4g_23";
  const answerMsgName = "_answerMsgName_bsm4g_32";
  const answerMark = "_answerMark_bsm4g_35";
  const answerDetail = "_answerDetail_bsm4g_53";
  const answerDetailShortAnswer = "_answerDetailShortAnswer_bsm4g_68";
  const answerDetailFill = "_answerDetailFill_bsm4g_75";
  const settings = "_settings_bsm4g_78";
  const settingsEntry = "_settingsEntry_bsm4g_86";
  const settingsSubmit = "_settingsSubmit_bsm4g_100";
  const settingsSubmitTip = "_settingsSubmitTip_bsm4g_106";
  const about = "_about_bsm4g_109";
  const uploadImg = "_uploadImg_bsm4g_119";
  const uploadImgImage = "_uploadImgImage_bsm4g_127";
  const uploadImgConfirm = "_uploadImgConfirm_bsm4g_132";
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
  const _tmpl$$2 = /* @__PURE__ */ template(`<div><fieldset><legend></legend><input type="text" placeholder="\u7559\u8A00"><button type="button">\u6211\u6B63\u5728\u505A</button><button type="button">\u6211\u5F88\u786E\u5B9A</button><button type="button">\u6211\u4E0D\u786E\u5B9A</button></fieldset><div><div></div></div></div>`, 17), _tmpl$2$2 = /* @__PURE__ */ template(`<fieldset><legend> \u7559\u8A00 </legend><ul></ul></fieldset>`, 6), _tmpl$3$1 = /* @__PURE__ */ template(`<li><span></span></li>`, 4), _tmpl$4$1 = /* @__PURE__ */ template(`<ul></ul>`, 2), _tmpl$5 = /* @__PURE__ */ template(`<li></li>`, 2), _tmpl$6 = /* @__PURE__ */ template(`<div><p><strong></strong></p></div>`, 6), _tmpl$7 = /* @__PURE__ */ template(`<div><p><strong></strong></p><ul></ul></div>`, 8), _tmpl$8 = /* @__PURE__ */ template(`<li><p></p></li>`, 4), _tmpl$9 = /* @__PURE__ */ template(`<p><strong></strong></p>`, 4), _tmpl$10 = /* @__PURE__ */ template(`<div></div>`, 2), _tmpl$11 = /* @__PURE__ */ template(`<li><a></a></li>`, 4);
  function strCmp(a, b) {
    if (a === b) {
      return 0;
    } else if (a < b) {
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
    if (aState === void 0) {
      if (bState === void 0) {
        return strCmp(aName, bName);
      }
      return 1;
    } else if (bState === void 0) {
      return -1;
    } else {
      const ord = stateToPriv(bState) - stateToPriv(aState);
      return ord === 0 ? strCmp(aName, bName) : ord;
    }
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
  function percent(a, b) {
    return `${Math.floor(a * 100 / b)}%`;
  }
  function cmpByKey([a], [b]) {
    return strCmp(a, b);
  }
  class Details {
    constructor(id, subjectItem, makeRender) {
      __publicField(this, "_details", /* @__PURE__ */ new Map());
      this.updateUI = createRoot(() => {
        const [details, setDetails] = createSignal(/* @__PURE__ */ new Map(), {
          equals: false
        });
        const updateUI = () => setDetails(this._details);
        const DetailsRender = makeRender(details);
        const itemType = subjectItem.querySelector(".item-type");
        assertIs(HTMLElement, itemType);
        itemType.classList.add(style.clickable);
        itemType.addEventListener("click", () => {
          const rect = itemType == null ? void 0 : itemType.getBoundingClientRect();
          const win = openWin({
            title: "\u8BE6\u7EC6\u7B54\u6848",
            height: 300,
            width: 350,
            top: rect == null ? void 0 : rect.top,
            left: rect == null ? void 0 : rect.left
          });
          render(() => (() => {
            const _el$ = _tmpl$$2.cloneNode(true), _el$2 = _el$.firstChild, _el$3 = _el$2.firstChild, _el$4 = _el$3.nextSibling, _el$5 = _el$4.nextSibling, _el$6 = _el$5.nextSibling, _el$7 = _el$6.nextSibling, _el$8 = _el$2.nextSibling, _el$9 = _el$8.firstChild;
            insert(_el$3, () => `\u6CE8\u518C\u4EBA\u6570: ${totalUser(details())}`);
            _el$4.addEventListener("change", (ev) => CLIENT.updateMsg(id, ev.currentTarget.value));
            _el$5.addEventListener("click", () => CLIENT.updateState(id, AnswerState.WorkingOn));
            _el$6.addEventListener("click", () => CLIENT.updateState(id, AnswerState.Sure));
            _el$7.addEventListener("click", () => CLIENT.updateState(id, AnswerState.NotSure));
            insert(_el$8, () => Pipe.from(details()).then(sort(cmpNameWithAnswerAndCtx)).then(filterMap(([user, {
              context
            }]) => Pipe.from(context == null ? void 0 : context.state).then(or2(context == null ? void 0 : context.msg)).then(map$1(([state, msg]) => {
              const m = state === AnswerState.WorkingOn ? msg != null ? msg : "\u6211\u6B63\u5728\u505A" : msg;
              return m === void 0 || m === "" ? void 0 : tuple(user, state, m);
            })).unwrap())).then(collectArray).then((messages) => createComponent(Show, {
              get when() {
                return messages.length > 0;
              },
              get children() {
                return (() => {
                  const _el$10 = _tmpl$2$2.cloneNode(true), _el$11 = _el$10.firstChild, _el$12 = _el$11.nextSibling;
                  insert(_el$12, createComponent(For, {
                    each: messages,
                    children: ([user, state, msg]) => (() => {
                      const _el$13 = _tmpl$3$1.cloneNode(true), _el$14 = _el$13.firstChild;
                      insert(_el$14, `${user}: `);
                      insert(_el$13, msg, null);
                      createRenderEffect((_p$) => {
                        const _v$7 = stateToClass(state), _v$8 = style.answerMsgName;
                        _v$7 !== _p$._v$7 && className(_el$13, _p$._v$7 = _v$7);
                        _v$8 !== _p$._v$8 && className(_el$14, _p$._v$8 = _v$8);
                        return _p$;
                      }, {
                        _v$7: void 0,
                        _v$8: void 0
                      });
                      return _el$13;
                    })()
                  }));
                  createRenderEffect(() => className(_el$10, style.answerMsg));
                  return _el$10;
                })();
              }
            })).unwrap(), _el$9);
            insert(_el$9, createComponent(DetailsRender, {}));
            createRenderEffect((_p$) => {
              const _v$ = style.mainBody, _v$2 = style.answerMark, _v$3 = style.stateWorkingOn, _v$4 = style.stateSure, _v$5 = style.stateNotSure, _v$6 = style.answerDetail;
              _v$ !== _p$._v$ && className(_el$, _p$._v$ = _v$);
              _v$2 !== _p$._v$2 && className(_el$2, _p$._v$2 = _v$2);
              _v$3 !== _p$._v$3 && className(_el$5, _p$._v$3 = _v$3);
              _v$4 !== _p$._v$4 && className(_el$6, _p$._v$4 = _v$4);
              _v$5 !== _p$._v$5 && className(_el$7, _p$._v$5 = _v$5);
              _v$6 !== _p$._v$6 && className(_el$9, _p$._v$6 = _v$6);
              return _p$;
            }, {
              _v$: void 0,
              _v$2: void 0,
              _v$3: void 0,
              _v$4: void 0,
              _v$5: void 0,
              _v$6: void 0
            });
            return _el$;
          })(), win.document.body);
        });
        return updateUI;
      });
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
  function clearTooltips(t) {
    t.forEach((t2) => t2.setContent(""));
  }
  function totalUser(t) {
    return Pipe.from(t).then(filter(([, x]) => x.answer !== void 0)).then(count).unwrap();
  }
  function Users({
    children
  }) {
    return (() => {
      const _el$15 = _tmpl$4$1.cloneNode(true);
      insert(_el$15, createComponent(For, {
        get each() {
          return children.sort(cmpNameWithCtx);
        },
        children: ([user, ctx]) => (() => {
          const _el$16 = _tmpl$5.cloneNode(true);
          insert(_el$16, user);
          createRenderEffect(() => className(_el$16, stateToClass(ctx == null ? void 0 : ctx.state)));
          return _el$16;
        })()
      }));
      return _el$15;
    })();
  }
  class Choice extends Details {
    constructor(id, subjectItem, index2choice, choiceMap) {
      const tooltips = Pipe.from(subjectItem.querySelectorAll(".item-body .checkboxInput, .item-body .radioInput")).then((t) => Array.from(t).entries()).then(fold(/* @__PURE__ */ new Map(), (tooltips2, [idx, ele]) => tooltips2.set(index2choice(idx), new Tooltip(ele)))).unwrap();
      super(id, subjectItem, (details) => {
        const choiceToUsers = createMemo(() => Pipe.from(details()).then(fold(/* @__PURE__ */ new Map(), (choiceToUsers2, [user, {
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
        })).then(sort(cmpByKey)).then(collectArray).unwrap());
        createEffect(() => {
          const total = totalUser(details());
          clearTooltips(tooltips);
          Pipe.from(choiceToUsers()).then(forEach(([choice, users]) => {
            var _a;
            (_a = tooltips.get(choice)) == null ? void 0 : _a.setContent(percent(users.length, total));
          })).unwrap();
        });
        return () => createComponent(For, {
          get each() {
            return choiceToUsers();
          },
          children: ([choice, users]) => (() => {
            const _el$17 = _tmpl$6.cloneNode(true), _el$18 = _el$17.firstChild, _el$19 = _el$18.firstChild;
            insert(_el$19, choice);
            insert(_el$17, createComponent(Users, {
              children: users
            }), null);
            return _el$17;
          })()
        });
      });
    }
  }
  class Blank extends Details {
    constructor(id, subjectItem) {
      const tooltips = Pipe.from(subjectItem.querySelectorAll(".item-body .blank-item-dynamic")).then(Array.from).then(enumerate).then(fold(/* @__PURE__ */ new Map(), (tooltips2, [idx, ele]) => tooltips2.set(String.fromCharCode(idx + 49), new Tooltip(ele)))).unwrap();
      super(id, subjectItem, (details) => {
        const blankToFillToUsers = () => Pipe.from(details()).then(fold(/* @__PURE__ */ new Map(), (blankToFillToUsers2, [user, {
          answer,
          context
        }]) => {
          if (answer === void 0) {
            return blankToFillToUsers2;
          }
          return Pipe.from(answer).then(Object.entries).then(fold(blankToFillToUsers2, (blankToFillToUsers3, [blank, fill]) => {
            var _a, _b;
            fill = fill.trim();
            const fillToUsers = (_a = blankToFillToUsers3.get(blank)) != null ? _a : /* @__PURE__ */ new Map();
            const users = (_b = fillToUsers.get(fill)) != null ? _b : [];
            users.push([user, context]);
            return blankToFillToUsers3.set(blank, fillToUsers.set(fill, users));
          })).unwrap();
        })).then(map(([blank, fillToUsers]) => tuple(
          blank,
          Pipe.from(fillToUsers).then(sort(cmpByKey)).then(collectArray).unwrap()
        ))).then(sort(cmpByKey)).then(collectArray).unwrap();
        createEffect(() => {
          const total = totalUser(details());
          clearTooltips(tooltips);
          Pipe.from(blankToFillToUsers()).then(forEach(([blank, fillToUsers]) => {
            var _a;
            const most = Pipe.from(fillToUsers).then(map(([fill, users]) => tuple(fill, users.length))).then(sort(([, a], [, b]) => b - a)).then(first).unwrap();
            (_a = tooltips.get(blank)) == null ? void 0 : _a.setContent(most === void 0 ? "" : `(${percent(most[1], total)}) ${most[0]}`);
          })).unwrap();
        });
        return () => createComponent(For, {
          get each() {
            return blankToFillToUsers();
          },
          children: ([blank, fillToUsers]) => (() => {
            const _el$20 = _tmpl$7.cloneNode(true), _el$21 = _el$20.firstChild, _el$22 = _el$21.firstChild, _el$23 = _el$21.nextSibling;
            insert(_el$22, `#${blank}`);
            insert(_el$23, createComponent(For, {
              each: fillToUsers,
              children: ([fill, users]) => createComponent(Show, {
                when: fill !== "",
                get children() {
                  const _el$24 = _tmpl$8.cloneNode(true), _el$25 = _el$24.firstChild;
                  insert(_el$25, fill);
                  insert(_el$24, createComponent(Users, {
                    children: users
                  }), null);
                  createRenderEffect(() => className(_el$25, style.answerDetailFill));
                  return _el$24;
                }
              })
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
        const userToAnswers = createMemo(() => Pipe.from(details()).then(sort(cmpNameWithAnswerAndCtx)).then(collectArray).unwrap());
        return () => createComponent(For, {
          get each() {
            return Pipe.from(userToAnswers()).then(filterMap(([user, {
              answer,
              context
            }]) => {
              var _a;
              return Pipe.from(answer == null ? void 0 : answer.content).then(or2((_a = answer == null ? void 0 : answer.attachments) == null ? void 0 : _a.filelist)).then(map$1(([c, f]) => tuple(user, c, f, context == null ? void 0 : context.state))).unwrap();
            })).then(collectArray).unwrap();
          },
          children: ([user, content, filelist, state]) => [(() => {
            const _el$26 = _tmpl$9.cloneNode(true), _el$27 = _el$26.firstChild;
            insert(_el$27, user);
            createRenderEffect(() => className(_el$26, stateToClass(state)));
            return _el$26;
          })(), createComponent(Show, {
            when: content,
            children: (content2) => (() => {
              const _el$28 = _tmpl$10.cloneNode(true);
              _el$28.innerHTML = content2;
              createRenderEffect(() => className(_el$28, style.answerDetailShortAnswer));
              return _el$28;
            })()
          }), createComponent(Show, {
            when: filelist,
            children: (filelist2) => (() => {
              const _el$29 = _tmpl$4$1.cloneNode(true);
              insert(_el$29, createComponent(For, {
                each: filelist2,
                children: ({
                  fileUrl,
                  fileName
                }) => (() => {
                  const _el$30 = _tmpl$11.cloneNode(true), _el$31 = _el$30.firstChild;
                  setAttribute(_el$31, "href", fileUrl);
                  insert(_el$31, fileName);
                  return _el$30;
                })()
              }));
              return _el$29;
            })()
          })]
        });
      });
    }
  }
  const _tmpl$$1 = /* @__PURE__ */ template(`<div><label></label><input></div>`, 5), _tmpl$2$1 = /* @__PURE__ */ template(`<div><form><div><p><i> *\u66F4\u6539\u8BBE\u7F6E\u540E\u8BF7\u5237\u65B0\u9875\u9762 </i></p><button type="submit"> \u63D0\u4EA4 </button></div></form><div><p><strong> \u529F\u80FD\u7279\u6027\uFF1A </strong></p><ul></ul></div></div>`, 20), _tmpl$3 = /* @__PURE__ */ template(`<li><strong></strong></li>`, 4), _tmpl$4 = /* @__PURE__ */ template(`<div></div>`, 2);
  function Entry(props) {
    const extra = {
      ...props.extra,
      name: props.name
    };
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
      width: 350,
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
      const subjectItems = Array.from(document.body.querySelectorAll(".exam-main--body .subject-item"));
      assert(subjectItems.length === problems.length, "number subject items mismatches problems");
      this._details = Pipe.from(subjectItems).then(zip(problems)).then(fold(/* @__PURE__ */ new Map(), (details, [subjectItem, prob]) => {
        let detail;
        switch (prob.ProblemType) {
          case ProblemType.SingleChoice:
          case ProblemType.MultipleChoice:
          case ProblemType.Polling:
          case ProblemType.Judgement: {
            const index2choice = prob.ProblemType === ProblemType.Judgement ? (i) => ["\u6B63\u786E", "\u9519\u8BEF"][i] : (i) => String.fromCharCode(65 + i);
            const choiceMap = prob.ProblemType === ProblemType.Judgement ? /* @__PURE__ */ new Map([["true", "\u6B63\u786E"], ["false", "\u9519\u8BEF"]]) : Pipe.from(prob.Options).then(expect("no Options")).then(enumerate).then(fold(/* @__PURE__ */ new Map(), (choiceMap2, [idx, {
              key
            }]) => choiceMap2.set(key, String.fromCharCode(65 + idx)))).unwrap();
            detail = new Choice(prob.ProblemID, subjectItem, index2choice, (s) => {
              var _a;
              return (_a = choiceMap.get(s)) != null ? _a : s;
            });
            break;
          }
          case ProblemType.FillBlank:
            detail = new Blank(prob.ProblemID, subjectItem);
            break;
          case ProblemType.ShortAnswer:
            detail = new ShortAnswer(prob.ProblemID, subjectItem);
            break;
        }
        return details.set(prob.ProblemID, detail);
      })).unwrap();
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
      this._details.forEach((d) => d.updateUI());
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
    if (SORT_PROBLEMS.get() === true) {
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
    document.addEventListener(
      "visibilitychange",
      (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
      },
      true
    );
    window.addEventListener(
      "visibilitychange",
      (e) => {
        e.preventDefault();
        e.stopImmediatePropagation();
      },
      true
    );
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
              const text = JSON.stringify(
                sortPaper(JSON.parse(this.responseText))
              );
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
            const examId = parseInt(
              Pipe.from(url.searchParams.get("exam_id")).then(from).then(expect("cannot found exam_id")).unwrap()
            );
            CLIENT.login(examId, { title: paper.data.title, problems });
            fetch(
              newURL("/exam_room/cache_results", {
                exam_id: examId.toString()
              }).toString()
            ).then((res) => res.json()).then(
              (cacheResults) => cacheResults.data.results.forEach(
                ({ problem_id, result }) => CLIENT.updateAnswer(problem_id, result)
              )
            ).catch(devLog);
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
                (_a = data.results) == null ? void 0 : _a.forEach(
                  ({ problem_id, result }) => CLIENT.updateAnswer(problem_id, result)
                );
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
