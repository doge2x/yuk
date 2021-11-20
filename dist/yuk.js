// ==UserScript==
// @name         yuk
// @version      0.1.0
// @match        https://examination.xuetangx.com/exam/*
// @grant        GM_getValue
// @grant        GM_setValue
// @run-at       document-start
// ==/UserScript==

(() => {
  // yuk-client/src/xhr.js
  function listenXhrOnLoad(callback) {
    ((xhrSend) => {
      XMLHttpRequest.prototype.send = function(body) {
        this.addEventListener("load", () => {
          if (callback.call(this, body)) {
            XMLHttpRequest.prototype.send = xhrSend;
          }
        });
        xhrSend.apply(this, arguments);
      };
    })(XMLHttpRequest.prototype.send);
  }

  // yuk-client/src/gm.js
  var gm_default = {
    getValue: GM_getValue,
    setValue: GM_setValue
  };

  // yuk-client/src/utils.ts
  function getOpt(name, show, hint, check) {
    let val = gm_default.getValue(name, null);
    if (val === null) {
      val = self.prompt(`\u8BF7\u8F93\u5165${show}\uFF08${hint}\uFF09`);
      while (true) {
        if (val !== null && check(val)) {
          break;
        }
        val = self.prompt(`\u65E0\u6548\u7684${show}\uFF0C\u8BF7\u91CD\u65B0\u8F93\u5165`);
      }
      gm_default.setValue(name, val);
    }
    return val;
  }

  // yuk-client/src/inject.ts
  function injectLoginButton(onClick) {
    document.querySelectorAll("div.header-title").forEach((header) => {
      const button = document.createElement("a");
      button.href = "javascript:void(0);";
      button.onclick = onClick;
      button.innerHTML = header.innerHTML;
      header.innerHTML = "";
      header.appendChild(button);
    });
  }

  // yuk-client/src/main.ts
  function getExam() {
    return new Promise((resolve) => {
      listenXhrOnLoad(function() {
        const url = new URL(this.responseURL);
        if (url.pathname == "/exam_room/show_paper") {
          const examId = url.searchParams.get("exam_id");
          if (examId === null) {
            throw new Error("no `exam_id` in url");
          }
          resolve({
            id: parseInt(examId),
            paper: JSON.parse(this.responseText)
          });
          return true;
        }
        return false;
      });
    });
  }
  getExam().then((exam) => {
    injectLoginButton(() => {
      const username = getOpt("username", "\u7528\u6237\u540D", "\u7531\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u4E0B\u5212\u7EBF\u7EC4\u6210", (val) => {
        return val.length > 0 && val.length < 32;
      });
      console.log(username, exam.id, exam.paper.data.title);
      listenXhrOnLoad(function(data) {
        const url = new URL(this.responseURL);
        if (url.pathname === "/exam_room/answer_problem") {
          const answer = JSON.parse(data);
          answer.results.forEach((ans) => {
            console.log(ans.problem_id, ans.result);
          });
        }
        return false;
      });
    });
  });
})();
