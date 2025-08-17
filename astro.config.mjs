import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  // Configuration de base
  output: "static",
  site: "https://mgnetworking.github.io/Blogy-Astro", // Remplace par ton URL
  base: "/Blogy-Astro", // Base path

  // Configuration Vite pour Tailwind CSS 4
  vite: {
    plugins: [tailwindcss()],
    // Configuration du serveur de développement
    server: {
      // Rechargement à chaud
      hmr: {
        port: 3001, // Port différent pour éviter les conflits
      },
      // Port du serveur de dev
      port: 3000,
      // Ouvrir automatiquement le navigateur
      open: true,
    },
    // Optimisation pour le développement
    css: {
      devSourcemap: true, // Source maps CSS en développement
    },
  },

  // Configuration du serveur de développement Astro
  server: {
    port: 3000,
    host: true, // Permet l'accès depuis d'autres appareils sur le réseau
  },

  // Configuration de build
  build: {
    // Optimisations pour la production
    inlineStylesheets: "auto",
  },

  // Intégrations additionnelles (à ajouter selon tes besoins)
  integrations: [
    // Exemple d'autres intégrations populaires
    // '@astrojs/react',
    // '@astrojs/vue',
    // '@astrojs/sitemap',
  ],

  // Configuration markdown (si tu utilises du contenu markdown)
  markdown: {
    shikiConfig: {
      theme: "dracula", // Thème de coloration syntaxique
      wrap: true,
    },
  },
});
