import { getAllArticles } from "@/lib/articles";

export const dynamic = "force-static";

export async function GET() {
  const articles = getAllArticles()
    .filter(a => a.status === "published")
    .map(a => ({
      slug: a.slug,
      title: a.title,
      resume: a.resume,
      rubrique: a.rubrique,
      articleNumber: a.articleNumber,
      tags: a.tags,
      date: a.date
    }));

  return Response.json(articles);
}
