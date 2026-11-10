/* PIM Industrie — maquette v4 : comportements uniquement (menu, formulaires, filtres). */
(function () {
  "use strict";

  /* Menu mobile */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("site-nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  /* Formulaires : sur la maquette, rien n'est envoyé */
  document.querySelectorAll("form[data-mock]").forEach(function (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      var ok = form.parentNode.querySelector(".form-ok");
      if (ok) { ok.hidden = false; ok.scrollIntoView({ block: "center" }); }
      form.reset();
    });
  });

  /* Réalisations : filtres par famille et par domaine */
  var folio = document.querySelector(".folio");
  if (folio) {
    var buttons = document.querySelectorAll(".filters button[data-filter]");
    var domain = document.getElementById("filter-domaine");
    var empty = document.querySelector(".empty");
    var current = "tout";

    function apply() {
      var dom = domain ? domain.value : "";
      var shown = 0;
      folio.querySelectorAll(".tile").forEach(function (card) {
        var cats = (card.dataset.cat || "").split(" ");
        var doms = (card.dataset.domaine || "").split(" ");
        var okCat = current === "tout" || cats.indexOf(current) >= 0;
        var okDom = !dom || doms.indexOf(dom) >= 0;
        card.hidden = !(okCat && okDom);
        if (!card.hidden) shown++;
      });
      if (empty) empty.style.display = shown ? "none" : "block";
    }

    buttons.forEach(function (button) {
      button.addEventListener("click", function () {
        buttons.forEach(function (b) { b.classList.remove("on"); b.setAttribute("aria-pressed", "false"); });
        button.classList.add("on");
        button.setAttribute("aria-pressed", "true");
        current = button.dataset.filter;
        apply();
      });
    });
    if (domain) domain.addEventListener("change", apply);

    /* Arrivée filtrée : references.html#luxe, #industrie, etc. */
    var start = (location.hash || "").replace("#", "");
    if (start) {
      var match = document.querySelector('.filters button[data-filter="' + start + '"]');
      if (match) match.click();
    }
  }
})();

/* Prestations : cartes = onglets (v4.4) */
(function () {
  "use strict";
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll("[data-tabs]").forEach(function (box) {
    var tabs = box.querySelectorAll('[role="tab"]'), panels = box.querySelectorAll('[role="tabpanel"]');
    box.classList.add("ready");
    function show(id, focusPanel) {
      var found = false;
      tabs.forEach(function (t) {
        var on = t.getAttribute("aria-controls") === id;
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        if (on) found = true;
      });
      if (!found) return false;
      panels.forEach(function (p) { p.classList.toggle("on", p.id === id); });
      if (focusPanel) {
        var p = document.getElementById(id), r = p.getBoundingClientRect();
        if (r.top < 70 || r.top > innerHeight * 0.6) p.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
      }
      return true;
    }
    tabs.forEach(function (t, i) {
      t.addEventListener("click", function (e) {
        e.preventDefault();
        var id = t.getAttribute("aria-controls");
        show(id, true);
        history.replaceState(null, "", "#" + id);
      });
      t.addEventListener("keydown", function (e) {
        var k = e.key, n = null;
        if (k === "ArrowRight" || k === "ArrowDown") n = (i + 1) % tabs.length;
        if (k === "ArrowLeft" || k === "ArrowUp") n = (i - 1 + tabs.length) % tabs.length;
        if (n !== null) { e.preventDefault(); tabs[n].focus(); tabs[n].click(); }
      });
    });
    var start = (location.hash || "").replace("#", "");
    if (!show(start, !!start)) show(tabs[0].getAttribute("aria-controls"), false);
    addEventListener("hashchange", function () { show(location.hash.replace("#", ""), true); });
  });
})();

/* Contact et devis : un seul formulaire, deux modes */
(function () {
  "use strict";
  document.querySelectorAll("form[data-modes]").forEach(function (form) {
    var radios = form.querySelectorAll('input[name="mode"]');
    var msg = form.querySelector("textarea[data-ph-devis]");
    var phQ = msg ? msg.placeholder : "";
    function apply() {
      var mode = form.querySelector('input[name="mode"]:checked').value;
      form.setAttribute("data-mode", mode);
      form.querySelectorAll("[data-only]").forEach(function (el) {
        var off = el.getAttribute("data-only") !== mode;
        el.querySelectorAll("input, select, textarea").forEach(function (i) { i.disabled = off; });
      });
      if (msg) msg.placeholder = mode === "devis" ? msg.getAttribute("data-ph-devis") : phQ;
    }
    function fromHash() {
      var h = (location.hash || "").replace("#", "");
      if (h === "devis" || h === "particulier") {
        form.querySelector('input[name="mode"][value="devis"]').checked = true;
        apply();
      }
    }
    radios.forEach(function (r) { r.addEventListener("change", apply); });
    form.addEventListener("reset", function () { setTimeout(function () { fromHash(); apply(); }, 0); });
    addEventListener("hashchange", fromHash);
    fromHash();
    apply();
  });
})();
