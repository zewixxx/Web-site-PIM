const fs = require("fs");
const files = fs.readdirSync(".").filter((f) => f.endsWith(".html"));
const set = new Set();
for (const f of files) {
  let t = fs.readFileSync(f, "utf8");
  t = t.replace(/<script[\s\S]*?<\/script>/gi, "").replace(/<style[\s\S]*?<\/style>/gi, "");
  const re = />([^<]+)</g;
  let m;
  while ((m = re.exec(t))) {
    const s = m[1].replace(/\s+/g, " ").trim();
    if (s && /[A-Za-zÀ-ÿ]/.test(s) && s.length > 1) set.add(s);
  }
}
const arr = [...set].sort((a, b) => b.length - a.length);
fs.writeFileSync("_strings.txt", arr.join("\n---\n"), "utf8");
console.log("text", set.size, "chars", arr.join("").length);
