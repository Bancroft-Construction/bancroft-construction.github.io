/* Bancroft Construction: shared top bar for every tool.
   Add to a page's <head>:  <script src="/nav.js" defer></script>
   To add or rename a tool, edit LINKS below; every page picks it up on its next load.
   Plain ES5 on purpose, so it runs alongside any page's own code. */
(function () {
  "use strict";
  if (document.getElementById("bc-nav")) return;

  var LINKS = [
    { href: "/jobsite-schedule/", label: "Jobsite Schedule" },
    { href: "/bd-directory/", label: "Business Development" },
    { href: "/staffing-planner/", label: "Staffing Planner" }
  ];

  var here = location.pathname.replace(/index\.html$/, "");
  if (here.charAt(here.length - 1) !== "/") here += "/";

  var css =
    "#bc-nav{all:initial;display:block;position:relative;z-index:60;background:#252928;color:#f3eeea;" +
    "font:500 14px/1 system-ui,-apple-system,'Segoe UI',Roboto,sans-serif;border-bottom:1px solid #000}" +
    "#bc-nav *{box-sizing:border-box;font:inherit;color:inherit;margin:0}" +
    "#bc-nav .bcn-in{max-width:1500px;margin:0 auto;padding:0 16px;height:46px;display:flex;align-items:center;gap:20px}" +
    "#bc-nav a{text-decoration:none}" +
    "#bc-nav .bcn-home{display:flex;align-items:center;gap:10px;font-weight:700;letter-spacing:.02em;white-space:nowrap}" +
    "#bc-nav .bcn-mark{width:10px;height:22px;border-radius:2px;background:#c08a5f;flex:none}" +
    "#bc-nav .bcn-links{display:flex;align-items:stretch;gap:2px;height:100%;list-style:none;padding:0}" +
    "#bc-nav .bcn-links a{display:flex;align-items:center;height:100%;padding:0 12px;color:#c9c3be;border-bottom:3px solid transparent;border-top:3px solid transparent}" +
    "#bc-nav .bcn-links a:hover{color:#fff}" +
    "#bc-nav .bcn-links a[aria-current=page]{color:#fff;border-bottom-color:#c08a5f}" +
    "#bc-nav a:focus-visible,#bc-nav button:focus-visible{outline:2px solid #c08a5f;outline-offset:2px;border-radius:3px}" +
    "#bc-nav .bcn-btn{display:none;margin-left:auto;background:transparent;border:1px solid #4a4f4e;border-radius:6px;padding:7px 12px;cursor:pointer;align-items:center;gap:8px}" +
    "#bc-nav .bcn-btn svg{width:16px;height:16px;stroke:currentColor}" +
    "#bc-nav .bcn-menu{display:none;position:absolute;top:100%;left:0;right:0;background:#252928;border-bottom:1px solid #000;padding:6px 8px 10px;box-shadow:0 14px 30px rgba(0,0,0,.35)}" +
    "#bc-nav .bcn-menu a{display:block;padding:12px 10px;border-radius:6px;color:#c9c3be}" +
    "#bc-nav .bcn-menu a:hover{background:#2f3433;color:#fff}" +
    "#bc-nav .bcn-menu a[aria-current=page]{color:#fff;box-shadow:inset 3px 0 0 #c08a5f;background:#2c302f}" +
    "#bc-nav.bcn-open .bcn-menu{display:block}" +
    "@media (max-width:720px){#bc-nav .bcn-links{display:none}#bc-nav .bcn-btn{display:inline-flex}}" +
    "@media print{#bc-nav{display:none!important}}";

  function link(l, cls) {
    var cur = here === l.href ? ' aria-current="page"' : "";
    return '<a href="' + l.href + '"' + cur + (cls ? ' class="' + cls + '"' : "") + ">" + l.label + "</a>";
  }

  function build() {
    if (document.getElementById("bc-nav")) return;
    var style = document.createElement("style");
    style.id = "bc-nav-style";
    style.textContent = css;
    document.head.appendChild(style);

    var nav = document.createElement("nav");
    nav.id = "bc-nav";
    nav.setAttribute("aria-label", "Bancroft tools");
    var items = "";
    for (var i = 0; i < LINKS.length; i++) items += "<li>" + link(LINKS[i]) + "</li>";
    var menu = '<a href="/"' + (here === "/" ? ' aria-current="page"' : "") + ">Home</a>";
    for (var j = 0; j < LINKS.length; j++) menu += link(LINKS[j]);
    nav.innerHTML =
      '<div class="bcn-in">' +
      '<a class="bcn-home" href="/"><span class="bcn-mark" aria-hidden="true"></span>Bancroft Construction</a>' +
      '<ul class="bcn-links">' + items + "</ul>" +
      '<button type="button" class="bcn-btn" aria-expanded="false" aria-controls="bcn-menu">' +
      '<svg viewBox="0 0 16 16" fill="none" stroke-width="1.6" aria-hidden="true"><path d="M2 4h12M2 8h12M2 12h12"/></svg>Menu</button>' +
      "</div>" +
      '<div class="bcn-menu" id="bcn-menu">' + menu + "</div>";
    document.body.insertBefore(nav, document.body.firstChild);

    var btn = nav.querySelector(".bcn-btn");
    function setOpen(open) {
      nav.className = open ? "bcn-open" : "";
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    }
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      setOpen(nav.className !== "bcn-open");
    });
    document.addEventListener("click", function (e) {
      if (!nav.contains(e.target)) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.className === "bcn-open") { setOpen(false); btn.focus(); }
    });
  }

  if (document.body) build();
  else document.addEventListener("DOMContentLoaded", build);
})();
