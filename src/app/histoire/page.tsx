import { getArticleBySlug } from "@/lib/articles";
import { MDXRemote } from "next-mdx-remote/rsc";
import { Callout, Highlight, Heading2 as h2, Heading3 as h3 } from "@/components/article/MdxComponents";
import { ReadingProgress } from "@/components/layout/ReadingProgress";
import { notFound } from "next/navigation";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Histoire de la Manipulation | Reflexe.io",
  description: "De Pavlov aux algorithmes : l'histoire secrète de la manipulation cognitive.",
  alternates: {
    canonical: "https://mist3rth.github.io/Reflex.io/histoire/",
  },
};

const components = { Callout, Highlight, h2, h3 };

export default async function HistoirePage() {
  const slug = "fabriquer-le-reflexe-histoire-manipulation-cognitive";
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  return (
    <>
      <ReadingProgress />
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-0 sm:py-10 flex flex-col">
        {/* 1. Banner Hero Immersive (Style Biais) */}
        <div className="relative w-full aspect-[21/9] md:aspect-video min-h-[250px] md:min-h-[400px] max-h-[700px] mb-8 md:mb-16 overflow-hidden border border-brand-border group flex items-center justify-center">
          <div className="absolute inset-0 bg-brand-bg-secondary">
            <Image 
              src={getAssetPath("/images/heritage/hero.webp")}
              alt={article.title}
              fill
              className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s] ease-out grayscale contrast-125"
              priority
              sizes="(max-width: 1024px) 100vw, 1400px"
            />
          </div>
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="absolute inset-0 p-4 md:p-12 flex flex-col items-center justify-center text-center">
            <div className="max-w-3xl">
              <p className="font-mono text-[8px] md:text-xs uppercase tracking-[0.3em] text-brand-text-muted mb-2 md:mb-4 pt-1">
                ARCHIVES_HÉRITAGE / #{article.articleNumber}
              </p>
              
              <h1 className="font-display font-black text-lg sm:text-4xl md:text-7xl uppercase text-brand-text-primary mb-4 md:mb-6 tracking-tight leading-tight sm:leading-[0.9] break-words drop-shadow-2xl">
                {article.shortTitle || article.title}
              </h1>
              
              <div className="flex items-center justify-center gap-3 md:gap-6 font-mono text-[8px] md:text-xs text-brand-accent-red uppercase tracking-[0.2em] font-bold">
                <span className="bg-brand-accent-red text-white px-2 py-0.5 whitespace-nowrap">THIERRY THIESSON</span>
                <span className="hidden sm:block w-1 h-1 bg-brand-accent-red rounded-full" />
                <span className="text-brand-text-primary underline decoration-brand-accent-red decoration-2 underline-offset-4 tracking-[0.3em]">{article.readingTime} MIN</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Layout Grille - Contenu + Sommaire */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 md:gap-16 items-start">
          {/* 3. Contenu MDX */}
          <div className="w-full order-2 lg:order-1">
            <article className="prose-container !max-w-none">
              <div className="mb-12 p-6 md:p-8 bg-brand-bg-secondary border-l-4 border-brand-accent-red italic font-serif text-base md:text-lg text-brand-text-secondary leading-relaxed">
                &ldquo;{article.resume}&rdquo;
              </div>
              
              <div className="max-w-[720px] mx-auto lg:mx-0">
                <MDXRemote source={article.content} components={components} />
              </div>
            </article>
          </div>

          {/* Sommaire Interactif (STICKY sur Desktop) */}
          <aside className="lg:sticky lg:top-28 w-full h-fit lg:self-start order-1 lg:order-2">
            <div className="border border-brand-border p-5 bg-brand-bg-card">
              <h3 className="font-display font-black text-[10px] uppercase tracking-widest text-brand-accent-red mb-4">SOMMAIRE</h3>
              <nav className="space-y-3">
                {[
                  { id: "i-les-fondations-scientifiques", label: "I. Fondations Scientifiques" },
                  { id: "ii-la-guerre-comme-laboratoire", label: "II. Guerre & État" },
                  { id: "iii-de-la-propagande-au-marketing", label: "III. Privatisation" },
                  { id: "iv-lere-numerique", label: "IV. Industrialisation Numérique" },
                  { id: "v-fil-rouge", label: "V. Thèse Centrale" }
                ].map((item) => (
                  <a 
                    key={item.id}
                    href={`#${item.id}`}
                    className="block font-mono text-[9px] uppercase tracking-wider text-brand-text-muted hover:text-brand-accent-red transition-colors flex items-center gap-3 group"
                  >
                    <span className="w-3 h-[1px] bg-brand-border group-hover:bg-brand-accent-red transition-all" />
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
