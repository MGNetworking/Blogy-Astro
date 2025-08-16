import { marked } from "marked";

const GITHUB_USER = "MGNetworking";
const GITHUB_REPO = "MD-Article";

const headers = {
  Authorization: `token ${import.meta.env.TOKEN_GITHUB}`,
};

// Configuration de marked pour GitHub Flavored Markdown
// stockage interne de la config
marked.setOptions({
  gfm: true, // Active GitHub Flavored Markdown
  breaks: true, // Les retours à la ligne simples deviennent des <br>
  pedantic: false, // Mode moins strict (plus permissif)
  sanitize: false, // Autorise le HTML dans le markdown
  smartLists: true, // Améliore le rendu des listes
  smartypants: false, // Désactive la conversion automatique des guillemets
});

/* Récupération des meta données en JSON (léger) */
export async function getGithubArticles() {
  // Récupération SEULEMENT de l'index JSON
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/index.json`,
    { headers }
  );

  if (!response.ok) {
    throw new Error(
      `GitHub API Error: ${response.status} ${response.statusText}`
    );
  }

  const fileData = await response.json();

  // Décodage des meta données au format UTF-8
  const jsonContent = new TextDecoder("utf-8").decode(
    Uint8Array.from(atob(fileData.content), (c) => c.charCodeAt(0))
  );

  const articlesIndex = JSON.parse(jsonContent);
  console.log("Nombre d'articles trouvés :", articlesIndex.articles.length);

  // Retourner les articles avec métadonnées
  return articlesIndex.articles.map((article) => ({
    metadata: {
      title: article.title,
      date: article.date,
      time: article.time,
      author: article.author,
      tags: article.tags,
      description: article.description,
      filename: article.filename,
      img: article.img,
    },
  }));
}

export async function getGithubArticle(slug) {
  const fileResponse = await fetch(
    `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/articles/${slug}.md`,
    { headers }
  );

  if (!fileResponse.ok) {
    throw new Error(`Article ${slug} non trouvé`);
  }

  const fileData = await fileResponse.json();
  const contentResponse = await fetch(fileData.download_url);
  const rawContent = await contentResponse.text();

  return rawContent;
}
