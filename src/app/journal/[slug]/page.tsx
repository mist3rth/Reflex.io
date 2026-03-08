import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ReadingProgress } from "@/components/layout/ReadingProgress";
import { Callout, Highlight } from "@/components/article/MdxComponents";
import { getArticleBySlug, getPossibleSlugs } from "@/lib/articles";
import { getArticleJsonLd, getBreadcrumbJsonLd } from "@/lib/jsonld";
import Link from "next/link";
import type { Metadata } from "next";

export async function generateStaticParams() {
  const slugs = getPossibleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};

  const images = [];
  if (slug === "biais-autorite-blouse-blanche-desarme") images.push("/images/biais_hero.png");
  else if (slug === "journee-ordinaire-consommateur-manipule-biais") images.push("/images/thomas_hero.png");
  else if (slug === "guerre-cognitive-cinq-objectifs") images.push("/images/guerre_cognitive_hero.png");
  else if (slug === "apple-smartphone-addiction-deliberee-manipulation-cognitive") images.push("/images/apple_hero.png");
  else images.push("/images/featured-article.png");

  return {
    title: `${article.title} | Reflexe.io`,
    description: article.resume,
    openGraph: {
      title: article.title,
      description: article.resume,
      type: "article",
      url: `https://reflexe.io/journal/${slug}`,
      images: images,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.resume,
      images: images,
    },
    alternates: {
      canonical: `https://reflexe.io/journal/${slug}`,
    },
  };
}

const components = { Callout, Highlight };

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <ReadingProgress />

      <article className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand-text-muted mb-10" aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-brand-accent-red transition-colors">ACCUEIL</Link>
          <span>/</span>
          <Link href="/journal" className="hover:text-brand-accent-red transition-colors">JOURNAL</Link>
          <span>/</span>
          <span className="text-brand-accent-red">{article.rubrique?.toUpperCase()}</span>
        </nav>

        {/* Header principal */}
        <header className="mb-12">
          {/* Image / bloc visuel full-width */}
          <div className="relative w-full min-h-[280px] md:min-h-[400px] bg-gradient-to-br from-brand-bg-secondary via-[#1a0505] to-brand-bg-primary flex items-center justify-center mb-10 overflow-hidden border border-brand-border">
            <div className="absolute inset-0 opacity-[0.04] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.5)_2px,rgba(255,255,255,0.5)_4px)]" aria-hidden="true" />
            <div className="relative text-center px-8">
              <p className="font-mono text-[10px] uppercase tracking-widest text-brand-text-muted mb-6">
                <span className="text-brand-accent-red">{article.rubrique?.toUpperCase()}</span>
                {article.articleNumber && (
                  <> / #{article.articleNumber}</>
                )}
              </p>
              <h1 className="font-display font-black text-xl sm:text-4xl md:text-5xl lg:text-6xl uppercase text-brand-text-primary leading-tight max-w-4xl mx-auto break-words">
                {article.title}
              </h1>
            </div>
          </div>

          {/* Meta sous le titre */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-t border-b border-brand-border py-4 mb-8">
            <p className="text-brand-text-secondary text-sm leading-relaxed max-w-2xl italic">
              {article.resume}
            </p>
            <div className="flex items-center gap-5 font-mono text-xs text-brand-text-muted flex-shrink-0">
              <time dateTime={article.date}>
                {new Date(article.date).toLocaleDateString("fr-FR")}
              </time>
              <span>·</span>
              <span>{article.readingTime} MIN</span>
            </div>
          </div>
        </header>

        {/* Contenu MDX */}
        <div className="prose-container">
          <MDXRemote source={article.content} components={components} />
        </div>

        {/* JSON-LD SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getArticleJsonLd(article)),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(getBreadcrumbJsonLd([
              { name: "Accueil", item: "/" },
              { name: "Journal", item: "/journal" },
              { name: article.title, item: `/journal/${slug}` }
            ])),
          }}
        />
      </article>

      {/* Article suivant / auteur */}
      <div className="border-t border-brand-border bg-brand-bg-secondary">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">

          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-brand-text-muted mb-2">PARTAGER L&apos;ARTICLE</p>
            <div className="flex items-center gap-6">
               <a 
                 href={`https://www.facebook.com/sharer/sharer.php?u=https://reflexe.io/journal/${slug}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-brand-text-muted hover:text-[#1877F2] transition-colors font-mono text-xs font-bold tracking-widest"
                 aria-label="Partager sur Facebook (s'ouvre dans un nouvel onglet)"
               >
                 FACEBOOK
               </a>
               <a 
                 href={`https://www.linkedin.com/sharing/share-offsite/?url=https://reflexe.io/journal/${slug}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-brand-text-muted hover:text-[#0077b5] transition-colors font-mono text-xs font-bold tracking-widest"
                 aria-label="Partager sur LinkedIn (s'ouvre dans un nouvel onglet)"
               >
                 LINKEDIN
               </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
