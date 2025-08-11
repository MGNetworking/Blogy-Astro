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
  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents`,
    { headers }
  );

  const files = await response.json();

  if (!Array.isArray(files)) {
    console.error("Erreur GitHub:", files);
    throw new Error(`Erreur GitHub: ${files.message || "Réponse invalide"}`);
  }

  const mdFiles = files.filter((file) => file.name.endsWith(".md"));

  console.log("Articles trouvés:", mdFiles.length);

  return mdFiles;
}

export async function getGithubArticle(slug) {
  const fileResponse = await fetch(
    `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${slug}.md`,
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

export function parseMarkdown(rawContent) {
  const frontmatterMatch = rawContent.match(
    /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  );

  if (!frontmatterMatch) {
    return { frontmatter: {}, content: marked(rawContent) };
  }

  const frontmatterText = frontmatterMatch[1];
  const markdownContent = frontmatterMatch[2];

  // Parse frontmatter
  const frontmatter = {};
  frontmatterText.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split(":");
    if (key && valueParts.length) {
      frontmatter[key.trim()] = valueParts.join(":").trim().replace(/"/g, "");
    }
  });

  // MARKED gère TOUT le Markdown !
  const htmlContent = marked(markdownContent);

  return { frontmatter, content: htmlContent };
}
