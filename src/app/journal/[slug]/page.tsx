import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ReadingProgress } from "@/components/layout/ReadingProgress";
import { Callout, Highlight, Quote, Heading2, Heading3 } from "@/components/article/MdxComponents";
import { getArticleBySlug, getPossibleSlugs, getNextArticle } from "@/lib/articles";
import { getArticleJsonLd, getBreadcrumbJsonLd } from "@/lib/jsonld";
import { getAssetPath } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
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

  const siteUrl = "https://mist3rth.github.io/Reflex.io";
  const ogImage = article.coverImage || "/images/featured-article.png";
  
  const truncatedDescription = article.resume.length > 155 
    ? article.resume.substring(0, 152) + "..." 
    : article.resume;

  return {
    title: article.title,
    description: truncatedDescription,
    openGraph: {
      title: article.title,
      description: truncatedDescription,
      type: "article",
      url: `${siteUrl}/journal/${slug}`,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: truncatedDescription,
      images: [ogImage],
    },
    alternates: {
      canonical: `${siteUrl}/journal/${slug}`,
    },
  };
}

const components = { 
  Callout, 
  Highlight, 
  Quote,
  h2: Heading2,
  h3: Heading3
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const nextArticle = getNextArticle(slug);

  return (
    <>
      <ReadingProgress />

      <article className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-brand-text-muted mb-8 md:mb-10" aria-label="Fil d'Ariane">
          <Link href="/" className="hover:text-brand-accent-red transition-colors">ACCUEIL</Link>
          <span>/</span>
          <Link href="/journal" className="hover:text-brand-accent-red transition-colors">JOURNAL</Link>
          <span>/</span>
          <span className="text-brand-accent-red">{article.rubrique?.toUpperCase()}</span>
        </nav>

        {/* Header principal - Grid Layout */}
        <header className="mb-16 md:mb-24">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
            {/* Colonne Image (7/12) */}
            <div className="md:col-span-7 order-1">
              <div className="relative w-full aspect-[4/3] md:aspect-[16/10] bg-brand-bg-secondary overflow-hidden border border-brand-border group">
                {article.coverImage ? (
                  <Image
                    src={getAssetPath(article.coverImage)}
                    alt=""
                    fill
                    priority
                    className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 opacity-[0.04] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.5)_2px,rgba(255,255,255,0.5)_4px)]" aria-hidden="true" />
                )}
              </div>
            </div>

            {/* Colonne Texte (5/12) */}
            <div className="md:col-span-5 order-2 flex flex-col">
              <p className="font-mono text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-brand-text-muted mb-6 md:mb-8">
                <span className="text-brand-accent-red font-bold">{article.rubrique?.toUpperCase()}</span>
                {article.articleNumber && (
                  <span className="ml-3 pl-3 border-l border-brand-border">#{article.articleNumber}</span>
                )}
              </p>
              
              <h1 className="font-display font-black text-[30px] md:text-[34px] uppercase text-brand-text-primary leading-[1.1] tracking-tighter mb-8">
                {article.title}
              </h1>

              <div className="flex items-center gap-6 font-mono text-[10px] text-brand-text-muted uppercase tracking-[0.2em] pt-8 border-t border-brand-border/30">
                <time dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString("fr-FR", { day: '2-digit', month: '2-digit', year: 'numeric'})}
                </time>
                <span className="w-1.5 h-1.5 bg-brand-accent-red rounded-full" />
                <span className="font-bold text-brand-text-secondary">{article.readingTime} MIN</span>
              </div>
            </div>
          </div>

          {/* Resume / Intro - Ajusté pour être moins massif */}
          <div className="mt-12 md:mt-16 pt-10 border-t border-brand-border/50">
            <p className="text-lg md:text-xl text-brand-text-secondary leading-relaxed max-w-4xl italic font-serif opacity-80">
              {article.resume}
            </p>
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
                 href={`https://www.facebook.com/sharer/sharer.php?u=https://mist3rth.github.io/Reflex.io/journal/${slug}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-brand-text-muted hover:text-[#1877F2] transition-colors font-mono text-xs font-bold tracking-widest"
                 aria-label="Partager sur Facebook (s'ouvre dans un nouvel onglet)"
               >
                 FACEBOOK
               </a>
               <a 
                 href={`https://www.linkedin.com/sharing/share-offsite/?url=https://mist3rth.github.io/Reflex.io/journal/${slug}`}
                 target="_blank"
                 rel="noopener noreferrer"
                 className="text-brand-text-muted hover:text-[#0077b5] transition-colors font-mono text-xs font-bold tracking-widest"
                 aria-label="Partager sur LinkedIn (s'ouvre dans un nouvel onglet)"
               >
                 LINKEDIN
               </a>
            </div>
          </div>

          {/* Article suivant - Design immersif */}
          {nextArticle && (
            <div className="w-full md:w-1/2 mt-12 md:mt-0">
               <Link href={`/journal/${nextArticle.slug}`} className="group block w-full relative overflow-hidden bg-black aspect-video md:aspect-[21/9] border border-brand-border/50">
                  <Image 
                    src={getAssetPath(nextArticle.coverImage || "/images/featured-article.png")}
                    alt=""
                    fill
                    className="object-cover opacity-50 group-hover:scale-105 group-hover:opacity-70 transition-all duration-700 grayscale"
                  />
                  <div className="absolute inset-0 flex flex-col justify-center p-8 md:p-12">
                    <span className="font-mono text-[10px] text-brand-accent-red uppercase tracking-[0.4em] mb-3 font-bold">Lire la suite</span>
                    <h4 className="font-display font-black text-xl md:text-[26px] uppercase text-white leading-none tracking-tighter group-hover:text-brand-accent-red transition-colors">
                      {nextArticle.title}
                    </h4>
                  </div>
               </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
