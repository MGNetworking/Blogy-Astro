// ===== SERVICE CENTRALISÉ POUR LA GESTION DES TAGS =====

/**
 * Configuration des couleurs des tags
 * Utilisé partout dans l'application pour une cohérence visuelle
 */
const TAG_CLASSES = {
  // 🔵 PERFORMANCE & MONITORING (tech-blue)
  performance: "tech-blue",

  // 🟢 FRAMEWORKS FRONTEND (tech-green)
  astro: "tech-green",
  react: "tech-green",
  vue: "tech-green",
  vuejs: "tech-green",
  angular: "tech-green",
  web: "tech-green",

  // 🟡 LANGAGES SCRIPT/DYNAMIQUES (tech-yellow)
  typescript: "tech-yellow",
  javascript: "tech-yellow",
  bash: "tech-yellow",
  sh: "tech-yellow",
  groovy: "tech-yellow",

  // 🔴 LANGAGES WEB DE BASE (tech-red)
  html: "tech-red",
  css: "tech-red",
  markdown: "tech-red",

  // 🟣 LANGAGES BACKEND/COMPILÉS (tech-purple)
  java: "tech-purple",
  "c#": "tech-purple",
  spring: "tech-purple",
  ".net": "tech-purple",
  nodejs: "tech-purple",

  // 🟠 DEVOPS & INFRASTRUCTURE (tech-orange)
  docker: "tech-orange",
  "docker swarm": "tech-orange",
  kubernetes: "tech-orange",
  jenkins: "tech-orange",
  nginx: "tech-orange",
  "github actions": "tech-orange",

  // ⚫ SYSTÈMES & OS (tech-gray)
  ubuntu: "tech-gray",
  linux: "tech-gray",
  esxi: "tech-gray",

  // 🔷 OUTILS & PLATEFORMES (tech-cyan - nouvelle couleur)
  github: "tech-cyan",
  keycloak: "tech-cyan",
};

/**
 * Couleur par défaut pour les tags non définis
 */
const DEFAULT_TAG_CLASS = "tech-gray";

/**
 * Retourne la classe CSS pour un tag donné
 * @param {string} tag - Le nom du tag
 * @returns {string} - La classe CSS correspondante
 */
export function getTagClass(tag) {
  if (!tag) return DEFAULT_TAG_CLASS;
  return TAG_CLASSES[tag.toLowerCase()] || DEFAULT_TAG_CLASS;
}

/**
 * Extrait tous les tags uniques d'une liste d'articles
 * @param {Array} articles - Liste des articles
 * @returns {Array} - Liste des tags uniques triés alphabétiquement
 */
export function extractUniqueTagsFromArticles(articles) {
  const allTags = new Set();

  articles.forEach((article) => {
    if (article.tags && Array.isArray(article.tags)) {
      article.tags.forEach((tag) => {
        if (tag && tag.trim()) {
          allTags.add(tag.toLowerCase().trim());
        }
      });
    }
  });

  return Array.from(allTags).sort();
}

/**
 * Filtre les articles par tag
 * @param {Array} articles - Liste des articles
 * @param {string} selectedTag - Tag sélectionné ("all" pour tous)
 * @returns {Array} - Articles filtrés
 */
export function filterArticlesByTag(articles, selectedTag) {
  if (!selectedTag || selectedTag === "all") {
    return articles;
  }

  return articles.filter((article) => {
    if (!article.tags || !Array.isArray(article.tags)) {
      return false;
    }

    return article.tags.some(
      (tag) => tag.toLowerCase().trim() === selectedTag.toLowerCase().trim()
    );
  });
}

/**
 * Retourne la liste complète des classes CSS disponibles
 * Utile pour la documentation ou le debug
 * @returns {Object} - Objet contenant toutes les classes de tags
 */
export function getAllTagClasses() {
  return { ...TAG_CLASSES, default: DEFAULT_TAG_CLASS };
}

/**
 * Ajoute un nouveau tag à la configuration (pour extension future)
 * @param {string} tagName - Nom du tag
 * @param {string} className - Classe CSS associée
 */
export function addTagClass(tagName, className) {
  TAG_CLASSES[tagName.toLowerCase()] = className;
}
