require("./main.css");
import applyUpdate from "serviceworker-webpack-plugin/lib/browser/applyUpdate";
import runtime from "serviceworker-webpack-plugin/lib/runtime";
import registerEvents from "serviceworker-webpack-plugin/lib/browser/registerEvents";

if (
  "serviceWorker" in navigator &&
  (window.location.protocol === "https:" ||
    window.location.hostname === "localhost")
) {
  window.addEventListener("DOMContentLoaded", function() {
    // 调用 serviceWorker.register 注册，参数 /sw.js 为脚本文件所在的 URL 路径
    var registration = runtime.register();

    registerEvents(registration, {
      onInstalled: () => {
        pushLog("onInstalled");
      },
      onUpdateReady: () => {
        pushLog("onUpdateReady", true);
      },

      onUpdating: () => {
        pushLog("onUpdating");
      },
      onUpdateFailed: () => {
        pushLog("onUpdateFailed");
      },
      onUpdated: () => {
        pushLog("onUpdated");
      }
    });
  });
} else {
  pushLog("serviceWorker not available");
}

function pushLog(content, update) {
  console.log(content);
  window.document.getElementById(
    "app"
  ).innerText = `Hello,Webpack -- ${content}`;
  document.getElementById("btn").style.display = update ? "" : "none";
}

document.getElementById("btn").addEventListener("click", function() {
  event.preventDefault();

  // 更新后手动刷新
  applyUpdate().then(() => {
    window.location.reload();
  });
});
