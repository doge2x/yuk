// ==UserScript==
// @name         yuk
// @version      0.1.0
// @match        https://examination.xuetangx.com/exam/*
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// ==/UserScript==

(() => {
  // yuk-client/src/paper.ts
  function sortProblems(paper) {
    paper.data.problems.sort((a, b) => a.problem_id - b.problem_id);
    return paper;
  }

  // yuk-client/src/xhr.ts
  function listenPostAnswer(callback) {
    const xhrOpen = XMLHttpRequest.prototype.open;
    const xhrSend = XMLHttpRequest.prototype.send;
    XMLHttpRequest.prototype.open = function(_method, openUrl) {
      this._$openUrl = new URL(openUrl, self.location.href);
      xhrOpen.apply(this, arguments);
    };
    XMLHttpRequest.prototype.send = function(body) {
      const url = new URL(this._$openUrl);
      if (url.pathname === "/exam_room/answer_problem") {
        callback.call(this, JSON.parse(body));
      }
      xhrSend.apply(this, arguments);
    };
  }
  function getPaper() {
    return new Promise((resolve, reject) => {
      const xhrOpen = XMLHttpRequest.prototype.open;
      XMLHttpRequest.prototype.open = function(_method, openUrl) {
        const url = new URL(openUrl, self.location.href);
        if (url.pathname == "/exam_room/show_paper") {
          XMLHttpRequest.prototype.open = xhrOpen;
          const examId = url.searchParams.get("exam_id");
          if (examId === null) {
            reject(new Error("no `exam_id` in url"));
          } else {
            this.addEventListener("readystatechange", () => {
              if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
                const paper = sortProblems(JSON.parse(this.responseText));
                this._$paper = paper;
                const responseText = JSON.stringify(paper);
                Object.defineProperty(this, "responseText", {
                  get() {
                    return responseText;
                  }
                });
              }
            });
            this.addEventListener("load", () => {
              resolve({
                id: parseInt(examId),
                paper: this._$paper
              });
            });
          }
        }
        xhrOpen.apply(this, arguments);
      };
    });
  }

  // yuk-client/src/gm.js
  function getValue(name) {
    return GM_getValue(name, null);
  }
  function setValue(name, val) {
    GM_setValue(name, val);
  }

  // yuk-client/src/utils.ts
  var GMOpt = class {
    constructor(name, show, hint, check) {
      this.name = name;
      this.show = show;
      this.hint = hint;
      this.check = check;
    }
    getOrSet() {
      let val = getValue(this.name);
      if (val === null) {
        val = requirePrompt(this.show, this.hint, this.check);
        setValue(this.name, val);
      }
      return val;
    }
  };
  function requirePrompt(show, hint, check) {
    let val = self.prompt(`\u8BF7\u8F93\u5165${show}\uFF08${hint}\uFF09`);
    while (true) {
      if (val !== null && (check === void 0 || check(val))) {
        return val;
      }
      val = self.prompt(`\u65E0\u6548\u7684${show}\uFF0C\u8BF7\u91CD\u65B0\u8F93\u5165`);
    }
  }

  // yuk-client/src/inject.ts
  function injectLoginButton(onClick) {
    document.querySelectorAll(".header-title").forEach((header) => {
      const button = document.createElement("a");
      button.href = "javascript:void(0);";
      button.onclick = onClick;
      button.innerHTML = header.innerHTML;
      header.innerHTML = "";
      header.appendChild(button);
    });
  }

  // yuk-client/src/ws.ts
  var Connection = class {
    constructor(ws) {
      this.ws = ws;
    }
    static connect(addr) {
      return new Promise((resolve, reject) => {
        const ws = new WebSocket(addr);
        ws.onerror = (e) => reject(e);
        ws.onclose = () => reject(new Error("\u670D\u52A1\u5668\u5173\u95ED"));
        ws.onopen = () => resolve(new Connection(ws));
      });
    }
    set onmessage(handler) {
      this.ws.onmessage = (e) => {
        handler(JSON.parse(e.data));
      };
    }
    send(msg) {
      this.ws.send(JSON.stringify(msg));
    }
  };

  // yuk-client/src/main.ts
  var LOGIN = false;
  var USERNAME_OPT = new GMOpt("username", "\u7528\u6237\u540D", "\u7531\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u4E0B\u5212\u7EBF\u7EC4\u6210", (val) => {
    return val.length > 0 && val.length < 32 && /^[_a-zA-Z]\w+$/.test(val);
  });
  var SERVER_ADDR_OPT = new GMOpt("server_addr", "\u670D\u52A1\u5668\u5730\u5740", "\u4F8B\u5982\uFF1Alocalhost:9009");
  getPaper().then((exam) => {
    injectLoginButton(() => {
      if (LOGIN) {
      } else {
        const username = USERNAME_OPT.getOrSet();
        const serverAddr = SERVER_ADDR_OPT.getOrSet();
        const wsAddr = `ws://${serverAddr}/login?username=${username}&exam_id=${exam.id}`;
        console.log(`Login: ${wsAddr}`);
        Connection.connect(wsAddr).then((conn) => {
          LOGIN = true;
          conn.onmessage = (answers) => answers.forEach((ans) => console.log(ans.username, JSON.stringify(ans.answers)));
          listenPostAnswer(function(answer) {
            conn.send(answer.results);
          });
        }).catch((e) => self.alert(`\u4E0E\u670D\u52A1\u5668\u901A\u4FE1\u65F6\u53D1\u751F\u9519\u8BEF\uFF1A${e}`));
      }
    });
  });
})();
