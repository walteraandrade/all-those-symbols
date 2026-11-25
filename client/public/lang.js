// Runs before first paint. The prerendered HTML is English; a Portuguese
// reader gets the real pt text once the app loads, so stop the browser from
// machine-translating the English underneath it (which also breaks React's
// switch to pt).
(function () {
  var stored = null;
  try { stored = localStorage.getItem("blogLang"); } catch (e) {}
  var langs = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || ""];
  var pt = stored ? stored === "pt" : String(langs[0]).toLowerCase().indexOf("pt") === 0;
  if (!pt) return;
  var html = document.documentElement;
  html.lang = "pt-BR";
  html.setAttribute("translate", "no");
  var meta = document.createElement("meta");
  meta.name = "google";
  meta.content = "notranslate";
  document.head.appendChild(meta);
})();
