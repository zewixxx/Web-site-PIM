const fs = require("fs");
const path = require("path");

const root = __dirname;
const dict = {};
for (let i = 0; i < 8; i++) {
  const p = path.join(root, "_dict" + i + ".json");
  if (!fs.existsSync(p)) continue;
  const part = JSON.parse(fs.readFileSync(p, "utf8"));
  for (const [k, v] of Object.entries(part)) {
    if (!v || typeof v.en !== "string" || typeof v.de !== "string") {
      throw new Error("Entrée incomplète: " + k.slice(0, 80));
    }
    dict[k] = v;
  }
}

const files = fs.readdirSync(root).filter((f) => f.endsWith(".html"));
// SEO (nov. 2026) : domaine officiel = www.pim-industrie.com (pas de migration). fr -> racine du .com.
// EN et DE : emplacement À DÉCIDER plus tard. Hypothèse retenue ici : en -> .com/en/ (dossier en/ créé par ce script),
// de -> www.pim-industrie.de (ou .com/de/ : changer la ligne). x-default -> fr tant que l'anglais n'existe pas.
const DOMAINS = { fr: "https://www.pim-industrie.com", en: "https://www.pim-industrie.com/en", de: "https://www.pim-industrie.de" };
const X_DEFAULT = "fr"; // passer à "en" quand la version anglaise sera publiée
const BASE = DOMAINS.fr;

function keyOf(s) {
  return s.replace(/[ \t\r\n]+/g, " ").trim();
}

function tr(html, lang) {
  if (lang === "fr") return html;
  html = html.replace(/>([^<]+)</g, (full, text) => {
    const k = keyOf(text);
    if (!Object.prototype.hasOwnProperty.call(dict, k)) return full;
    const lead = text.match(/^\s*/)[0];
    const trail = text.match(/\s*$/)[0];
    return ">" + lead + dict[k][lang] + trail + "<";
  });
  html = html.replace(/\b(alt|placeholder|aria-label|content|title)="([^"]*)"/g, (full, attr, val) => {
    const k = keyOf(val);
    if (!Object.prototype.hasOwnProperty.call(dict, k)) return full;
    return attr + '="' + dict[k][lang].replace(/"/g, "&quot;") + '"';
  });
  return html;
}

function pageUrl(lang, file) {
  const slug = file === "index.html" ? "" : file;
  return DOMAINS[lang] + "/" + slug;
}

function langsNav(lang, file) {
  const fr = lang === "fr" ? file : pageUrl("fr", file);
  const en = lang === "en" ? file : pageUrl("en", file);
  const de = lang === "de" ? file : pageUrl("de", file);
  const a = (href, code, current) =>
    '<a href="' + href + '" lang="' + code + '" hreflang="' + code + '"' +
    (current ? ' class="on" aria-current="true"' : "") + ">" + code.toUpperCase() + "</a>";
  return '<nav class="langs" aria-label="' +
    (lang === "fr" ? "Langue" : lang === "en" ? "Language" : "Sprache") + '">' +
    a(fr, "fr", lang === "fr") + a(en, "en", lang === "en") + a(de, "de", lang === "de") +
    "</nav>";
}

function fixHead(html, lang, file) {
  const canon = pageUrl(lang, file);
  const fr = pageUrl("fr", file);
  const en = pageUrl("en", file);
  const de = pageUrl("de", file);
  const locale = lang === "fr" ? "fr_FR" : lang === "en" ? "en_GB" : "de_DE";
  const inLang = lang === "fr" ? "fr-FR" : lang === "en" ? "en-GB" : "de-DE";
  html = html.replace(/<html lang="[^"]*">/, '<html lang="' + lang + '">');
  html = html.replace(/<link rel="canonical" href="[^"]*">/, '<link rel="canonical" href="' + canon + '">');
  html = html.replace(/<!-- TODO hreflang[\s\S]*?-->\n?/, "");
  html = html.replace(/<link rel="alternate" hreflang="fr" href="[^"]*">\s*<link rel="alternate" hreflang="x-default" href="[^"]*">/,
    '<link rel="alternate" hreflang="fr" href="' + fr + '">\n' +
    '<link rel="alternate" hreflang="en" href="' + en + '">\n' +
    '<link rel="alternate" hreflang="de" href="' + de + '">\n' +
    '<link rel="alternate" hreflang="x-default" href="' + pageUrl(X_DEFAULT, file) + '">');
  html = html.replace(/<meta property="og:locale" content="[^"]*">/, '<meta property="og:locale" content="' + locale + '">');
  html = html.replace(/<meta property="og:url" content="[^"]*">/, '<meta property="og:url" content="' + canon + '">');
  html = html.replace(/"inLanguage":"fr-FR"/g, '"inLanguage":"' + inLang + '"');
  if (lang !== "fr") {
    html = html.replace(/https:\/\/www\.pim-industrie\.com\/(?!img\/|en\/|de\/)([a-z0-9\-]*\.html)?/g, (full, filePart) => {
      return DOMAINS[lang] + "/" + (filePart || "");
    });
  }
  html = html.replace(/<script type="application\/ld\+json">\s*([\s\S]*?)\s*<\/script>/, (full, json) => {
    let data;
    try { data = JSON.parse(json); } catch (e) { return full; }
    const walk = (node) => {
      if (typeof node === "string") {
        const k = keyOf(node);
        if (lang !== "fr" && Object.prototype.hasOwnProperty.call(dict, k)) return dict[k][lang];
        return node;
      }
      if (Array.isArray(node)) return node.map(walk);
      if (node && typeof node === "object") {
        for (const key of Object.keys(node)) node[key] = walk(node[key]);
      }
      return node;
    };
    data = walk(data);
    return '<script type="application/ld+json">\n' + JSON.stringify(data) + "\n</script>";
  });
  return html;
}

function prefixAssets(html) {
  return html
    .replace(/(href|src|poster)="(?!https?:|mailto:|tel:|#|\.\.\/|\/)([^"]+)"/g, '$1="../$2"')
    .replace(/(srcset|imagesrcset)="([^"]+)"/g, (full, attr, val) => {
      const next = val.replace(/(^|,\s*)(?!https?:)(img\/)/g, "$1../$2");
      return attr + '="' + next + '"';
    });
}

function injectLangs(html, lang, file) {
  if (html.includes('class="langs"')) return html;
  const nav = langsNav(lang, file);
  return html.replace(
    /<a class="top-tel" href="tel:\+33388586200">[^<]*<\/a>/,
    (m) => m + nav
  );
}

const missing = new Map();
function noteMissing(html, file) {
  const re = />([^<]+)</g;
  let m;
  while ((m = re.exec(html))) {
    const k = keyOf(m[1]);
    if (k.length < 2 || !/[A-Za-zÀ-ÿ]/.test(k)) continue;
    if (!Object.prototype.hasOwnProperty.call(dict, k)) {
      if (!missing.has(k)) missing.set(k, file);
    }
  }
}

fs.mkdirSync(path.join(root, "en"), { recursive: true });
fs.mkdirSync(path.join(root, "de"), { recursive: true });

for (const file of files) {
  const src = fs.readFileSync(path.join(root, file), "utf8");
  noteMissing(src, file);
  for (const lang of ["fr", "en", "de"]) {
    let html = tr(src, lang);
    html = fixHead(html, lang, file);
    html = injectLangs(html, lang, file);
    // Chaque domaine a sa propre racine : copier img/, css/, js/, favicon.ico dans en/ et de/ au déploiement (pas de préfixe ../).
    const dest = lang === "fr" ? path.join(root, file) : path.join(root, lang, file);
    fs.writeFileSync(dest, html, "utf8");
  }
}

const urls = [];
for (const lang of ["fr", "en", "de"]) {
  for (const file of files) urls.push(pageUrl(lang, file));
}
let xml = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
for (const url of urls) {
  let prio = "0.6";
  if (/\/(en|de)?\/?$/.test(url.replace(BASE, ""))) prio = "1.0";
  else if (/\/(industrie|luxe|prestations|contact|clavier-membrane|references)\.html$/.test(url)) prio = "0.9";
  else if (/\/(mentions-legales|confidentialite|cgv|cga|plan-du-site)\.html$/.test(url)) prio = "0.2";
  else prio = "0.7";
  xml += "  <url><loc>" + url + "</loc><lastmod>2026-11-10</lastmod><priority>" + prio + "</priority></url>\n";
}
xml += "</urlset>\n";
fs.writeFileSync(path.join(root, "sitemap.xml"), xml, "utf8");

const missArr = [...missing.keys()];
fs.writeFileSync(path.join(root, "_missing.txt"), missArr.join("\n---\n"), "utf8");
console.log("pages", files.length, "dict", Object.keys(dict).length, "missing", missArr.length);
