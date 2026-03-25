import Link from "next/link";
import Image from "next/image";
import { getAllArticles } from "@/lib/articles";
import DataLog from "@/components/home/DataLog";
import { getAssetPath } from "@/lib/utils";

export default function Home() {
  const articles = getAllArticles().filter((a) => a.status === "published" && a.slug !== "biais-cognitifs");
  const featuredArticle = articles[0] || null;
  const latestArticles = articles.slice(1, 6); // 5 derniers en liste compacte

  return (
    <div className="w-full min-h-screen">
      {/* ── HERO IMMERSIF ────────────────────────────────────────── */}
      <section className="relative w-full min-h-[50vh] lg:min-h-[85vh] flex items-center overflow-hidden border-b border-brand-border">
        {/* Image de fond avec overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src={getAssetPath("/images/hero-bg.png")}
            alt="Abstrait technologique"
            fill
            className="object-cover opacity-60 scale-105"
            priority
            sizes="100vw"
            quality={90}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-bg-primary/20 via-brand-bg-primary/60 to-brand-bg-primary" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-bg-primary/80 via-transparent to-brand-bg-primary/20" />
        </div>

        {/* Contenu Hero */}
        <div className="relative z-10 max-w-[1400px] mx-auto px-6 lg:px-12 py-8 lg:py-20 w-full min-h-[50vh] lg:min-h-[85vh] flex items-center">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
            {/* Texte Principal - Occupation 7/12 */}
            <div className="lg:col-span-7 xl:col-span-8">
              <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-brand-accent-red mb-8 flex items-center gap-3">
                <span className="w-8 h-[1px] bg-brand-accent-red" />
                TERMINAL DE VEILLE ANALYTIQUE
              </p>
              <h1 className="font-display font-black text-[6.5vw] sm:text-5xl md:text-6xl lg:text-8xl leading-[0.9] uppercase tracking-tighter text-brand-text-primary mb-6 animate-fade-up">
                L&apos;ARCHITECTURE<br />
                DES <span className="text-brand-accent-red italic">BIAIS</span><br />
                ET DU <span className="text-brand-text-primary">CONTRÔLE</span>.
              </h1>
              <div className="flex flex-wrap gap-4 mt-8 lg:mt-12">
                <Link
                  href="/journal"
                  className="group relative inline-flex items-center gap-3 font-mono text-xs font-black uppercase tracking-widest bg-brand-accent-red text-white px-8 py-4 hover:bg-brand-accent-red-dark transition-all"
                >
                  EXPLORER LE JOURNAL
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </Link>
              </div>
            </div>

            {/* Description Secondaire - Occupation 5/12 */}
            <div className="lg:col-span-5 xl:col-span-4 lg:pl-12 lg:border-l border-brand-accent-red/30 py-6">
              <div className="max-w-sm">
                <p className="text-brand-text-secondary text-base lg:text-xl leading-relaxed mb-0 font-serif italic opacity-90 break-words">
                  &ldquo;L&apos;exploitation systématique des biais cognitifs par les industries du digital et les ingénieries d&apos;influence.&rdquo;
                </p>
                <p className="font-mono text-[9px] uppercase tracking-widest text-brand-text-muted mt-8">
                  REFLEXE.IO | v0.1.0_BETA
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Décoration : scanline effect */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.5)_2px,rgba(255,255,255,0.5)_4px)]" aria-hidden="true" />
      </section>

      {/* ── ARTICLE FONDATEUR ─────────────────────────────────────── */}
      {featuredArticle && (
        <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-16">
          <Link href={`/journal/${featuredArticle.slug}`} className="group block">
            <div className="relative bg-brand-bg-card border border-brand-border overflow-hidden hover:border-brand-accent-red transition-colors">
              {/* Image placeholder (dégradé sombre style wireframe) */}
              <div className="grid grid-cols-1 md:grid-cols-[1fr_1.6fr]">
                <div className="relative min-h-[280px] md:min-h-[380px] bg-brand-bg-secondary flex items-end p-6 overflow-hidden">
                  <Image
                    src={getAssetPath(featuredArticle.coverImage || "/images/featured-article.png")}
                    alt=""
                    fill
                    className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 500px"
                    priority
                  />
                  {/* Numéro en filigrane */}
                  <span className="absolute top-4 left-6 font-mono font-black text-5xl leading-none text-brand-accent-red z-10">
                    #{featuredArticle.articleNumber || "001"}
                  </span>
                  {/* Overlay texture */}
                  <div className="absolute inset-0 opacity-[0.04] bg-[repeating-linear-gradient(0deg,transparent,transparent_2px,rgba(255,255,255,0.5)_2px,rgba(255,255,255,0.5)_4px)] z-10" aria-hidden="true" />
                </div>

                {/* Texte */}
                <div className="p-8 md:p-12 flex flex-col justify-between border-t md:border-t-0 md:border-l border-brand-border">
                  <div>
                    <div className="flex items-center gap-3 mb-5">
                      <span className="badge-rubrique">{featuredArticle.rubrique}</span>
                    </div>
                    <h2 className="font-display font-black text-2xl md:text-3xl lg:text-4xl uppercase text-brand-text-primary group-hover:text-brand-accent-red transition-colors leading-tight mb-6">
                      {featuredArticle.title}
                    </h2>
                    <p className="text-brand-text-secondary text-sm leading-relaxed line-clamp-4 mb-8">
                      {featuredArticle.resume}
                    </p>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="font-mono text-xs text-brand-text-muted space-x-4">
                      <time dateTime={featuredArticle.date}>
                        {new Date(featuredArticle.date).toLocaleDateString("fr-FR")}
                      </time>
                      <span>·</span>
                      <span>{featuredArticle.readingTime} MIN</span>
                    </div>
                    <span className="font-mono text-xs text-brand-accent-red uppercase tracking-widest font-bold group-hover:underline underline-offset-4">
                      LIRE L&apos;ARTICLE →
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </section>
      )}

      {/* ── CITATION ──────────────────────────────────────────────── */}
      <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-16">
        <blockquote className="border-l-4 border-brand-accent-red pl-8 py-2">
          <p className="font-display font-black text-xl md:text-2xl text-brand-text-primary leading-snug">
            &ldquo;Le plus grand danger de l&apos;intelligence artificielle n&apos;est pas qu&apos;elle nous dépasse, mais qu&apos;elle apprenne à exploiter nos failles biologiques plus vite que nous ne pouvons le comprendre.&rdquo;
          </p>
          <cite className="display-block mt-4 font-mono text-xs text-brand-accent-red uppercase tracking-widest not-italic">
            Thierry Thiesson
          </cite>
        </blockquote>
      </section>

      {/* ── DATA.LOG ─────────────────────────────────────────────── */}
      <DataLog />

      {/* ── LATEST : liste compacte ────────────────────────────────── */}
      {latestArticles.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-6 lg:px-10 pb-16">
          <div className="flex items-baseline justify-between mb-6 border-b border-brand-border pb-3">
            <h2 className="font-mono text-[10px] uppercase tracking-[0.2em] text-brand-text-muted">LATEST_LOGS</h2>
            <Link
              href="/journal"
              className="font-mono text-[10px] uppercase tracking-widest text-brand-accent-red hover:underline underline-offset-4"
            >
              VOIR TOUT →
            </Link>
          </div>

          <div className="divide-y divide-brand-border">
            {latestArticles.map((article) => (
              <Link
                key={article.slug}
                href={`/journal/${article.slug}`}
                className="group flex items-baseline justify-between py-4 hover:bg-brand-bg-card px-3 -mx-3 transition-colors"
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="badge-rubrique text-[9px]">{article.rubrique}</span>
                  </div>
                  <h3 className="font-display font-black text-base uppercase text-brand-text-secondary group-hover:text-brand-accent-red transition-colors leading-tight truncate pr-4">
                    {article.title}
                  </h3>
                </div>
                <time className="font-mono text-xs text-brand-text-muted flex-shrink-0" dateTime={article.date}>
                  {new Date(article.date).toLocaleDateString("fr-FR")}
                </time>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
