import { marked } from "marked";

const GITHUB_USER = "MGNetworking";
const GITHUB_REPO = "MD-Article";

const headers = {
  Authorization: `token ${import.meta.env.GITHUB_TOKEN}`,
};

// Configuration de marked pour GitHub Flavored Markdown
marked.setOptions({
  gfm: true, // GitHub Flavored Markdown
  breaks: true, // \n devient <br>
  pedantic: false, // Pas trop strict
  sanitize: false, // Autorise HTML
  smartLists: true, // Listes intelligentes
  smartypants: false, // Pas de conversion de quotes
});

export async function getGithubArticles() {
  // Récupération SEULEMENT de l'index JSON (léger)
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

  // Décoder le contenu Base64 du fichier
  const jsonContent = atob(fileData.content);
  const articlesIndex = JSON.parse(jsonContent);

  console.log("Articles trouvés dans l'index:", articlesIndex.articles.length);

  // Retourner les articles avec métadonnées
  return articlesIndex.articles.map((article) => ({
    metadata: {
      name: article.filename,
      title: article.title,
      author: article.author,
      date: article.date,
      description: article.description,
      tags: article.tags,
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
