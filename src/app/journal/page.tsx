import { getAllArticles } from "@/lib/articles";
import { JournalClient } from "./JournalClient";
import { getBreadcrumbJsonLd } from "@/lib/jsonld";
import { Article } from "@/lib/types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Journal | Reflexe.io",
  description: "Tous les articles : biais cognitifs, manipulation et décryptage des mécanismes d'influence.",
  alternates: {
    canonical: "https://mist3rth.github.io/Reflex.io/journal/",
  },
};

export default function JournalPage() {
  const articles = getAllArticles().filter(
    (a: Article) => a.status === "published" && a.slug !== "fabriquer-le-reflexe-histoire-manipulation-cognitive" && a.slug !== "biais-cognitifs"
  );

  return (
    <div className="py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbJsonLd([
            { name: "Accueil", item: "/" },
            { name: "Journal", item: "/journal" }
          ])),
        }}
      />
      <JournalClient articles={articles} />
    </div>
  );
}
