const fs = require("fs");
const path = require("path");
const dir = path.join(__dirname, "i18n");
const files = fs.readdirSync(dir).filter((f) => f.startsWith("tr-") && f.endsWith(".json"));
let n = 0;
const keys = new Set();
let bad = 0;
for (const f of files) {
  const arr = JSON.parse(fs.readFileSync(path.join(dir, f), "utf8"));
  console.log(f, arr.length);
  for (const row of arr) {
    if (!Array.isArray(row) || row.length !== 3 || row.some((x) => typeof x !== "string" || !x.trim())) bad++;
    else { keys.add(row[0]); n++; }
  }
}
console.log("rows", n, "unique", keys.size, "bad", bad);
const attrs = JSON.parse(fs.readFileSync(path.join(dir, "attrs.json"), "utf8"));
console.log("attrs", attrs.length, "attrs type", Array.isArray(attrs[0]) ? "triplet" : typeof attrs[0]);
