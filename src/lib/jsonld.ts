import { ArticleMetadata } from "./types";

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Reflexe.io",
    "url": "https://reflexe.io",
    "description": "Décryptage des biais cognitifs et de leur exploitation par les industries du digital.",
    "publisher": {
      "@type": "Organization",
      "name": "Reflexe.io",
      "logo": {
        "@type": "ImageObject",
        "url": "https://reflexe.io/images/logo.png"
      }
    }
  };
}

export function getArticleJsonLd(article: ArticleMetadata) {
  const url = `https://reflexe.io/journal/${article.slug}`;
  const imageUrl = `https://reflexe.io/images/${article.slug}_hero.png`;

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": url
    },
    "headline": article.title,
    "description": article.resume,
    "image": [imageUrl],
    "datePublished": article.date,
    "dateModified": article.date,
    "author": {
      "@type": "Person",
      "name": "Thierry Thiesson",
      "url": "https://www.linkedin.com/in/thierry-thiesson-7887501"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Reflexe.io",
      "logo": {
        "@type": "ImageObject",
        "url": "https://reflexe.io/images/logo.png"
      }
    }
  };
}

export function getBreadcrumbJsonLd(items: { name: string; item: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.item.startsWith("http") ? item.item : `https://reflexe.io${item.item}`
    }))
  };
}
