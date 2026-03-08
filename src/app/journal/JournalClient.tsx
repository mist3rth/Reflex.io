"use client";

import { useState } from "react";
import Link from "next/link";
import { Article } from "@/lib/types";

const RUBRIQUES = [
  { id: "tous", label: "TOUS" },
  { id: "mecanismes", label: "MÉCANISMES" },
  { id: "terrain", label: "TERRAIN" },
  { id: "heritage", label: "HÉRITAGE" },
];

export function JournalClient({ articles }: { articles: Article[] }) {
  const [filter, setFilter] = useState<string>("tous");
  const [currentPage, setCurrentPage] = useState(1);
  const ARTICLES_PER_PAGE = 6;

  const filtered = filter === "tous" ? articles : articles.filter((a) => a.rubrique === filter);
  
  // Pagination logic
  const totalPages = Math.ceil(filtered.length / ARTICLES_PER_PAGE);
  const paginatedArticles = filtered.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE
  );

  const handleFilterChange = (newFilter: string) => {
    setFilter(newFilter);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    // Scroll To Top smootly
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10">
      {/* En-tête rubrique style [MÉCANISMES] */}
      <div className="mb-10 px-0 sm:px-0">
        <h1 className="font-display font-black text-2xl sm:text-5xl md:text-7xl uppercase text-brand-text-primary leading-none mb-4 tracking-tight break-words">
          <span className="text-brand-text-muted font-black">[ </span>
          <span className="text-brand-accent-red">LE JOURNAL</span>
          <span className="text-brand-text-muted font-black"> ]</span>
        </h1>
        <p className="text-brand-text-muted text-sm max-w-xl leading-relaxed pl-1 sm:pl-0">
          Décortication des mécanismes de la manipulation. Explorations, enquêtes et données brutes.
        </p>
      </div>

      {/* Filtres style tags */}
      <div className="flex flex-wrap gap-2 mb-8 pl-1 sm:pl-0">
        {RUBRIQUES.map((r) => (
          <button
            key={r.id}
            onClick={() => handleFilterChange(r.id)}
            className={`font-mono text-[10px] font-black uppercase tracking-[0.15em] px-3 py-1.5 border transition-colors cursor-pointer ${
              filter === r.id
                ? "bg-brand-accent-red border-brand-accent-red text-white"
                : "border-brand-border text-brand-text-muted hover:border-brand-border-bright hover:text-brand-text-primary"
            }`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {/* Tableau d'articles style wireframe */}
      <div className="border border-brand-border">
        {/* Header - Hidden on mobile */}
        <div className="hidden md:grid md:grid-cols-[160px_1fr_140px_120px] items-center gap-6 px-4 py-3 border-b border-brand-border bg-brand-bg-secondary/30">
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-text-muted">CRÉATION</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-text-muted text-center">ANOMALIE_IDENTIFIÉE</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-text-muted text-center">AUTEUR</span>
          <span className="font-mono text-[10px] uppercase tracking-widest text-brand-text-muted text-right">STATUT</span>
        </div>

        {paginatedArticles.length > 0 ? (
          <div className="divide-y divide-brand-border">
            {paginatedArticles.map((article) => (
              <Link 
                key={article.slug} 
                href={`/journal/${article.slug}`}
                className="group grid grid-cols-1 md:grid-cols-[160px_1fr_140px_120px] items-start md:items-center gap-4 md:gap-6 px-4 py-8 md:py-6 hover:bg-brand-bg-secondary/50 transition-colors"
              >
                {/* Date */}
                <span className="font-mono text-xs text-brand-text-muted order-2 md:order-none">
                  {new Date(article.date).toLocaleDateString('fr-FR')}
                </span>

                {/* Content */}
                <div className="space-y-4 order-1 md:order-none">
                  <div className="inline-block px-2 py-0.5 border border-brand-accent-red/30 bg-brand-accent-red/5 font-mono text-[10px] text-brand-accent-red uppercase tracking-widest">
                    {article.rubrique}
                  </div>
                  <div>
                    <h2 className="font-display font-medium text-xl md:text-2xl uppercase text-brand-text-primary group-hover:text-brand-accent-red transition-colors leading-tight">
                      {article.title}
                    </h2>
                    <p className="mt-2 text-sm text-brand-text-secondary line-clamp-2 md:line-clamp-1 italic max-w-2xl">
                      {article.resume}
                    </p>
                  </div>
                </div>

                {/* Author */}
                <span className="hidden md:block font-mono text-[11px] text-brand-text-muted text-center">
                  Reflexe.io
                </span>

                {/* Status */}
                <div className="hidden md:flex justify-end">
                  <span className="font-mono text-[10px] px-2 py-0.5 border border-brand-border text-brand-text-muted uppercase tracking-widest">
                    {article.status}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="px-4 py-16 text-center font-mono text-sm text-brand-text-muted">
            {"// AUCUN_ARTICLE_TROUVÉ"}
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-4 font-mono text-xs text-brand-text-muted">
        <span>
          PAGE : {currentPage} / {totalPages || 1} | TOTAL : {filtered.length} | FILTRE : {filter.toUpperCase()}
        </span>
        <div className="flex gap-3">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-3 py-1 border border-brand-border transition-colors ${
              currentPage === 1
                ? "opacity-30 cursor-not-allowed"
                : "text-brand-text-muted hover:border-brand-border-bright hover:text-brand-text-primary cursor-pointer"
            }`}
          >
            ‹ PRÉCÉDENT
          </button>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className={`px-3 py-1 border border-brand-border transition-colors ${
              currentPage === totalPages || totalPages === 0
                ? "opacity-30 cursor-not-allowed"
                : "text-brand-text-muted hover:border-brand-border-bright hover:text-brand-text-primary cursor-pointer"
            }`}
          >
            SUIVANT ›
          </button>
        </div>
      </div>

      {/* Section ressources */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-16">
        {[
          {
            title: "RÉPERTOIRE DES BIAIS",
            desc: "Visualisez comment les mécanismes cognitifs influencent vos prises de décision quotidiennes.",
            href: "/biais"
          },
          {
            title: "ARCHIVES HISTORIQUES",
            desc: "Explorez les racines des techniques de manipulation à travers les âges.",
            href: "/histoire"
          },
          {
            title: "VISION & ENGAGEMENT",
            desc: "Découvrez la philosophie du projet Reflexe.io et notre manifeste d'indépendance.",
            href: "/a-propos"
          },
        ].map((card) => (
          <Link key={card.title} href={card.href} className="border border-brand-border p-6 bg-brand-bg-card hover:border-brand-accent-red transition-colors group">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-3 h-3 bg-brand-accent-red flex-shrink-0" aria-hidden="true" />
              <h3 className="font-display font-black text-xs uppercase tracking-wider text-brand-accent-red group-hover:text-brand-text-primary transition-colors">
                {card.title}
              </h3>
            </div>
            <p className="text-brand-text-muted text-xs leading-relaxed">{card.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
