/** @type {import('next').NextConfig} */
const nextConfig = {
  // Export statique : le dossier "out" se dépose tel quel chez OVH (hébergement PHP mutualisé).
  output: "export",
  trailingSlash: true,
  poweredByHeader: false,
  reactStrictMode: true,
  images: { unoptimized: true },
  // Évite le fichier AGENTS.md généré au démarrage du serveur de développement.
  agentRules: false,
};

export default nextConfig;
