/** @type {import('tailwindcss').Config} */
export default {
  // Chemins vers tous les fichiers de templates
  content: [
    "./src/**/*.{astro,html,js,jsx,ts,tsx,vue,svelte,md,mdx}",
    "./public/**/*.html",
  ],

  // Configuration du thème (minimal, juste les bases)
  theme: {
    extend: {},
  },

  // Mode sombre
  darkMode: "class",

  // Plugins
  plugins: [require("@tailwindcss/typography")],
};
