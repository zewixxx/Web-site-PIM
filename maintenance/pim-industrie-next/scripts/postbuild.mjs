// Nettoyage après "next build" : on retire les pages d'erreur par défaut de Next.js
// (le site utilise public/erreur-404.html, déclarée dans .htaccess).
import { rmSync } from "node:fs";

for (const chemin of ["out/404.html", "out/404", "out/_not-found"]) {
  rmSync(chemin, { recursive: true, force: true });
}
console.log("Dossier out/ prêt à être déposé chez OVH.");
