import { ArticleMetadata } from "./types";

const BASE_URL = "https://mist3rth.github.io/Reflex.io";

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Reflexe.io",
    "url": BASE_URL,
    "description": "Décryptage des biais cognitifs et de leur exploitation par les industries du digital.",
    "publisher": {
      "@type": "Organization",
      "name": "Reflexe.io",
      "logo": {
        "@type": "ImageObject",
        "url": `${BASE_URL}/icon.png`
      }
    }
  };
}

export function getArticleJsonLd(article: ArticleMetadata) {
  const url = `${BASE_URL}/journal/${article.slug}`;
  const imageUrl = article.coverImage 
    ? (article.coverImage.startsWith('http') ? article.coverImage : `${BASE_URL}${article.coverImage}`)
    : `${BASE_URL}/images/featured-article.png`;

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
        "url": `${BASE_URL}/icon.png`
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
      "item": item.item.startsWith("http") ? item.item : `${BASE_URL}${item.item}`
    }))
  };
}
