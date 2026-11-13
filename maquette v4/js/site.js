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

  /* Formulaire de contact : jeton anti-robot + envoi sécurisé (contact-envoi.php) */
  document.querySelectorAll("form[data-contact]").forEach(function (form) {
    var box = form.parentNode;
    var ok = box.querySelector(".form-ok");
    var ko = box.querySelector(".form-err[role=alert]");
    var btn = form.querySelector("button[type=submit]");
    var jeton = form.querySelector("input[name=jeton]");
    var MAX = 5 * 1024 * 1024;
    var EXT = /\.(pdf|dxf|dwg|ai|jpe?g|png)$/i;

    function charger() {
      return fetch(form.getAttribute("action") + "?jeton=1", { credentials: "same-origin", cache: "no-store" })
        .then(function (r) { if (!r.ok) throw new Error(); return r.json(); })
        .then(function (d) { jeton.value = d.jeton || ""; })
        .catch(function () { jeton.value = ""; });
    }
    function erreur(msg, champ) {
      if (ok) ok.hidden = true;
      if (ko) { ko.textContent = msg; ko.hidden = false; ko.scrollIntoView({ block: "center" }); }
      form.querySelectorAll("[aria-invalid]").forEach(function (el) { el.removeAttribute("aria-invalid"); });
      if (champ && form.elements[champ] && form.elements[champ].focus) {
        form.elements[champ].setAttribute("aria-invalid", "true");
        form.elements[champ].focus();
      }
    }
    var nomFichier = form.querySelector(".filepick-name");
    if (form.elements.file && nomFichier) {
      form.elements.file.addEventListener("change", function () {
        var choisi = form.elements.file.files && form.elements.file.files[0];
        nomFichier.textContent = choisi ? choisi.name : "Aucun fichier choisi";
      });
    }
    charger();

    form.addEventListener("submit", function (event) {
      if (!window.fetch || !window.FormData) return; /* envoi classique : la page merci/erreur s'affichera */
      event.preventDefault();
      var fichier = form.elements.file && form.elements.file.files[0];
      if (fichier && fichier.size > MAX) return erreur("Le fichier dépasse 5 Mo. Envoyez-le plutôt par e-mail à info@pim-industrie.com.", "file");
      if (fichier && !EXT.test(fichier.name)) return erreur("Type de fichier non accepté (PDF, DXF, DWG, AI, JPG ou PNG).", "file");
      btn.disabled = true;
      var envoi = function () {
        return fetch(form.getAttribute("action"), {
          method: "POST", body: new FormData(form), credentials: "same-origin",
          headers: { "X-Requested-With": "fetch", "Accept": "application/json" }
        }).then(function (r) {
          return r.json().then(function (d) { d = d || {}; d.statut = r.status; return d; });
        });
      };
      (jeton.value ? Promise.resolve() : charger())
        .then(envoi)
        .then(function (d) {
          if (d && d.ok) {
            if (ko) ko.hidden = true;
            if (ok) { ok.hidden = false; ok.scrollIntoView({ block: "center" }); }
            form.reset();
            if (nomFichier) nomFichier.textContent = "Aucun fichier choisi";
            form.querySelectorAll("[aria-invalid]").forEach(function (el) { el.removeAttribute("aria-invalid"); });
            jeton.value = ""; return charger(); /* jeton à usage unique : on en reprend un */
          } else {
            if (d && (d.statut === 400 || d.statut === 403)) { jeton.value = ""; charger(); } /* jeton expiré ou refusé */
            erreur((d && d.message) || "Le message n’a pas pu être envoyé. Réessayez ou écrivez à info@pim-industrie.com.", d && d.champ);
          }
        })
        .catch(function () {
          erreur("Le message n’a pas pu être envoyé. Vérifiez votre connexion, ou écrivez-nous à info@pim-industrie.com.");
        })
        .then(function () { btn.disabled = false; });
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
