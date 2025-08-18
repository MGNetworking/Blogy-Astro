import { marked } from "marked";

const GITHUB_USER = "MGNetworking";
const GITHUB_REPO_ARTICLE = "MD-Article";
const GITHUB_REPO_PROJET = "MD-Projet";

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

/**
 * Récupération des meta données en JSON (léger)
 * @param {boolean} [repo:true] - Si true: récupère les articles, si false: récupère les projets
 * @returns {GitHubFile[]} La réponse de l'API GitHub contenant l'index JSON
 * @throws {Error} Erreur si la requête échoue
 */
export async function getGithubArticles(repo = true) {
  let response;

  // Récupération SEULEMENT de l'index JSON
  if (repo) {
    response = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO_ARTICLE}/contents/index.json`,
      { headers }
    );
  } else {
    response = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO_PROJET}/contents/index.json`,
      { headers }
    );
  }

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

export async function getGithubArticle(slug, repo = true) {
  let fileResponse;

  console.log(`repo ${repo}`);
  if (repo) {
    fileResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO_ARTICLE}/contents/articles/${slug}.md`,
      { headers }
    );
  } else {
    fileResponse = await fetch(
      `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO_PROJET}/contents/articles/${slug}.md`,
      { headers }
    );
  }

  if (!fileResponse.ok) {
    throw new Error(`Article ou projet : ${slug} non trouvé`);
  }

  const fileData = await fileResponse.json();
  const contentResponse = await fetch(fileData.download_url);
  const rawContent = await contentResponse.text();

  return rawContent;
}
