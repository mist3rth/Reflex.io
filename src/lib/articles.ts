import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { Article } from "./types";

const CONTENT_DIR = path.join(process.cwd(), "content");

export function getPossibleSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  const slugs: string[] = [];
  const walkSync = (dir: string) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        walkSync(filePath);
      } else if (file.endsWith(".mdx")) {
        slugs.push(file.replace(/\.mdx$/, ""));
      }
    }
  };
  walkSync(CONTENT_DIR);
  return slugs;
}

export function getArticleBySlug(slug: string): Article | null {
  const walkSync = (dir: string): string | null => {
    if (!fs.existsSync(dir)) return null;
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        const found = walkSync(filePath);
        if (found) return found;
      } else if (file === `${slug}.mdx`) {
        return filePath;
      }
    }
    return null;
  };

  const filePath = walkSync(CONTENT_DIR);
  if (!filePath) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  
  const estimatedReadingTime = Math.ceil(readingTime(content).minutes);

  return {
    ...data,
    slug,
    readingTime: estimatedReadingTime,
    content,
  } as Article;
}

export function getAllArticles(): Article[] {
  const slugs = getPossibleSlugs();
  const articles = slugs
    .map((slug) => getArticleBySlug(slug))
    .filter((article): article is Article => article !== null)
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      if (dateB !== dateA) return dateB - dateA;
      // Tri secondaire par numéro d'article (décroissant)
      return parseInt(b.articleNumber) - parseInt(a.articleNumber);
    });

  return articles;
}

export function getNextArticle(currentSlug: string): Article | null {
  const articles = getAllArticles();
  const currentIndex = articles.findIndex((a) => a.slug === currentSlug);
  
  if (currentIndex === -1) return null;
  
  // L'article "suivant" pour l'utilisateur est l'article chronologiquement précédent (plus ancien)
  // car nous trions par date décroissante (plus récent d'abord).
  // Si on est sur le dernier (le plus ancien), on renvoie null ou on boucle sur le premier (plus récent).
  // On va boucler sur le premier pour maintenir l'engagement.
  
  if (currentIndex === articles.length - 1) {
    return articles[0]; // Boucle sur le plus récent
  }
  
  return articles[currentIndex + 1];
}
