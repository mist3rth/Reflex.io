"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { SearchOverlay } from "./SearchOverlay";

const NAV_LINKS = [
  { href: "/journal", label: "JOURNAL" },
  { href: "/biais", label: "BIAIS" },
  { href: "/histoire", label: "HISTOIRE" },
  { href: "/a-propos", label: "À PROPOS" },
];

export function Nav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [mobileOpen]);

  // Raccourcis clavier
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Cmd/Ctrl + K pour la recherche
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsSearchOpen(true);
      }
      // Escape pour fermer le menu mobile
      if (e.key === "Escape" && mobileOpen) {
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-colors duration-200 ${
          scrolled 
            ? "bg-[#000000] shadow-2xl" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-10 h-14 flex items-center justify-between gap-8">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0 group"
            aria-label="Reflexe.io – Accueil"
          >
            <span className="w-4 h-4 bg-brand-accent-red flex-shrink-0" aria-hidden="true" />
            <span className="font-display font-black text-base tracking-widest text-brand-text-primary uppercase group-hover:text-brand-accent-red transition-colors">
              REFLEXE.IO
            </span>
          </Link>

          {/* Nav desktop */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Navigation principale">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={pathname === link.href ? "page" : undefined}
                className={`font-mono text-xs tracking-[0.12em] uppercase transition-colors ${
                  pathname === link.href
                    ? "text-brand-accent-red"
                    : "text-brand-text-muted hover:text-brand-text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Search */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Rechercher"
              className="text-brand-text-muted hover:text-brand-text-primary transition-colors p-1"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
            </button>
          </div>

          {/* Burger mobile */}
          <button
            className="md:hidden text-brand-text-primary p-2 z-[110]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={mobileOpen}
          >
            <div className="relative w-6 h-5">
              <span 
                className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ${
                  mobileOpen ? "top-2 rotate-45" : "top-0"
                }`} 
              />
              <span 
                className={`absolute left-0 top-2 w-full h-0.5 bg-current transition-opacity duration-300 ${
                  mobileOpen ? "opacity-0" : "opacity-100"
                }`} 
              />
              <span 
                className={`absolute left-0 w-full h-0.5 bg-current transition-all duration-300 ${
                  mobileOpen ? "top-2 -rotate-45" : "top-4"
                }`} 
              />
            </div>
          </button>
        </div>

        {/* Menu mobile */}
        <div 
          className={`fixed inset-0 bg-brand-bg-primary/95 backdrop-blur-xl z-[105] transition-all duration-500 ease-expo flex flex-col items-center justify-center ${
            mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full pointer-events-none"
          }`}
        >
          {/* Logo dans le menu mobile */}
          <div className="absolute top-6 left-6">
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="flex items-center gap-2 group"
            >
              <span className="w-4 h-4 bg-brand-accent-red flex-shrink-0" aria-hidden="true" />
              <span className="font-display font-black text-base tracking-widest text-brand-text-primary uppercase group-hover:text-brand-accent-red transition-colors">
                REFLEXE.IO
              </span>
            </Link>
          </div>

          <nav className="flex flex-col items-center gap-12" aria-label="Navigation mobile">
            <ul className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, idx) => (
                <li 
                  key={link.href}
                  className={`transition-all duration-500 delay-[${idx * 50}ms] ${
                    mobileOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  }`}
                >
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={`font-display font-black text-4xl uppercase tracking-tighter transition-colors ${
                      pathname === link.href ? "text-brand-accent-red" : "text-brand-text-primary hover:text-brand-accent-red"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => {
                setMobileOpen(false);
                setIsSearchOpen(true);
              }}
              className={`font-mono text-xs tracking-[0.2em] uppercase text-brand-text-muted hover:text-brand-accent-red transition-all duration-500 delay-300 flex items-center gap-3 py-4 border-t border-brand-border w-48 justify-center ${
                mobileOpen ? "opacity-100" : "opacity-0"
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>
              </svg>
              RECHERCHE
            </button>
          </nav>
        </div>
      </header>
      
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
