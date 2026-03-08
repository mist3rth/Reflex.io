"use client";

import { useState, useEffect, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import Link from "next/link";
// import { searchArticles } from "@/lib/actions"; -- REMOVED
import { ArticleMetadata } from "@/lib/types";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<ArticleMetadata[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const timer = setTimeout(async () => {
      if (query.trim().length >= 2) {
        setIsLoading(true);
        try {
          // Utilisation du basePath pour l'API en mode statique
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_PATH || '/Reflex.io'}/api/search`);
          const articles: ArticleMetadata[] = await response.json();
          
          const lowerQuery = query.toLowerCase();
          const searchResults = articles.filter((article) => {
            const title = article.title || "";
            const resume = article.resume || "";
            const rubrique = article.rubrique || "";
            const tags = Array.isArray(article.tags) ? article.tags : [];

            return (
              title.toLowerCase().includes(lowerQuery) ||
              resume.toLowerCase().includes(lowerQuery) ||
              rubrique.toLowerCase().includes(lowerQuery) ||
              tags.some((tag) => typeof tag === "string" && tag.toLowerCase().includes(lowerQuery))
            );
          }).slice(0, 8);

          setResults(searchResults);
        } catch (error) {
          console.error("Search failed:", error);
        } finally {
          setIsLoading(false);
          setSelectedIndex(-1);
        }
      } else {
        setResults([]);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (results.length > 0) {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          setSelectedIndex((prev) => Math.min(prev + 1, results.length - 1));
        }
        if (e.key === "ArrowUp") {
          e.preventDefault();
          setSelectedIndex((prev) => Math.max(prev - 1, 0));
        }
        if (e.key === "Enter" && selectedIndex >= 0) {
          e.preventDefault();
          const target = results[selectedIndex];
          window.location.href = `/journal/${target.slug}`;
          onClose();
        }
      }
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, results, selectedIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex flex-col bg-brand-bg-primary/95 backdrop-blur-xl transition-all duration-300">
      {/* Header Search */}
      <div className="border-b border-brand-border px-6 py-4 flex items-center gap-4">
        <Search className="w-5 h-5 text-brand-text-muted" />
        <input
          ref={inputRef}
          type="text"
          placeholder="RECHERCHER UN MÉCANISME, UN BIAIS, UN ARTICLE..."
          className="flex-1 bg-transparent border-none outline-none font-mono text-sm tracking-widest text-brand-text-primary uppercase placeholder:text-brand-text-muted"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button 
          onClick={onClose}
          className="p-2 hover:bg-brand-bg-card rounded-full transition-colors"
          aria-label="Fermer la recherche"
        >
          <X className="w-5 h-5 text-brand-text-muted" />
        </button>
      </div>

      {/* Results */}
      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-3xl mx-auto">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-8 h-8 text-brand-accent-red animate-spin" />
              <span className="font-mono text-[10px] tracking-widest text-brand-text-muted uppercase">Indexation en cours...</span>
            </div>
          ) : results.length > 0 ? (
            <div className="grid gap-2">
              <span 
                className="font-mono text-[10px] tracking-widest text-brand-text-muted uppercase mb-4 pl-4"
                aria-live="polite"
              >
                {results.length} RÉSULTAT{results.length > 1 ? 'S' : ''} TROUVÉ{results.length > 1 ? 'S' : ''}
              </span>
              {results.map((article, index) => (
                <Link
                  key={article.slug}
                  href={`/journal/${article.slug}`}
                  onClick={onClose}
                  className={`group p-4 flex flex-col gap-1 border transition-all ${
                    selectedIndex === index 
                      ? "bg-brand-bg-card border-brand-accent-red translate-x-1 shadow-[0_0_20px_rgba(232,48,58,0.1)]" 
                      : "bg-transparent border-transparent hover:border-brand-border-bright"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[10px] text-brand-accent-red font-black uppercase tracking-tighter">
                      #{article.articleNumber}
                    </span>
                    <span className="font-mono text-[10px] text-brand-text-muted uppercase tracking-widest">
                      {article.rubrique}
                    </span>
                  </div>
                  <h3 className="font-display font-black text-base uppercase tracking-tight text-brand-text-primary group-hover:text-brand-accent-red transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-brand-text-secondary line-clamp-1 italic font-serif opacity-70">
                    {article.resume}
                  </p>
                </Link>
              ))}
            </div>
          ) : query.trim().length >= 2 ? (
            <div className="text-center py-20">
              <p className="font-mono text-xs tracking-widest text-brand-text-muted uppercase">
                Aucun résultat pour &quot;{query}&quot;
              </p>
            </div>
          ) : (
            <div className="grid gap-12 pt-10">
              <div className="text-center">
                <p className="font-mono text-[10px] tracking-widest text-brand-text-muted uppercase mb-8">
                  Suggestions de recherche
                </p>
                <div className="flex flex-wrap justify-center gap-3">
                  {["Amazon", "Milgram", "Biais", "IA", "Algorithme"].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-4 py-2 border border-brand-border font-mono text-[10px] tracking-widest uppercase hover:border-brand-accent-red hover:text-brand-accent-red transition-all"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Footer shortcut */}
      <div className="border-t border-brand-border px-6 py-3 flex justify-between items-center bg-brand-bg-primary">
        <div className="flex items-center gap-4 text-[10px] font-mono text-brand-text-muted uppercase tracking-widest mx-auto md:mx-0">
          <span className="flex items-center gap-1.5"><kbd className="bg-brand-bg-card px-1.5 py-0.5 border border-brand-border rounded text-[9px]">ESC</kbd> FERMER</span>
          <span className="flex items-center gap-1.5"><kbd className="bg-brand-bg-card px-1.5 py-0.5 border border-brand-border rounded text-[9px]">↑↓</kbd> NAVIGUER</span>
          <span className="flex items-center gap-1.5"><kbd className="bg-brand-bg-card px-1.5 py-0.5 border border-brand-border rounded text-[9px]">↵</kbd> OUVRIR</span>
        </div>
      </div>
    </div>
  );
}
