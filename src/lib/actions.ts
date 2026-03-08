"use server";

import { getAllArticles } from "./articles";

export async function searchArticles(query: string) {
  if (!query || query.length < 2) return [];

  const articles = await getAllArticles();
  const lowerQuery = query.toLowerCase();

  return articles.filter((article) => {
    if (!article || article.status !== "published") return false;

    const title = article.title || "";
    const resume = article.resume || "";
    const rubrique = article.rubrique || "";
    const tags = Array.isArray(article.tags) ? article.tags : [];

    return (
      title.toLowerCase().includes(lowerQuery) ||
      resume.toLowerCase().includes(lowerQuery) ||
      rubrique.toLowerCase().includes(lowerQuery) ||
      tags.some((tag) => typeof tag === "string" && tag.toLowerCase().includes(lowerQuery))
    );
  }).slice(0, 8); // Limiter à 8 résultats pour l'overlay
}
