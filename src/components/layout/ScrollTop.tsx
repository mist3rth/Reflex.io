"use client";

import { useEffect, useState } from "react";

export function ScrollTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      // Afficher à 70% de la hauteur de la fenêtre
      if (window.scrollY > window.innerHeight * 0.7) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 z-[90] md:flex items-center justify-center w-12 h-12 bg-brand-bg-card border border-brand-border text-brand-text-primary hover:text-brand-accent-red hover:border-brand-accent-red transition-all duration-300 shadow-2xl group cursor-pointer hidden ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
      }`}
      aria-label="Retour en haut"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="text-brand-text-muted group-hover:text-brand-accent-red group-hover:-translate-y-1 transition-all"
      >
        <path d="m18 15-6-6-6 6" />
      </svg>
      <div className="absolute -top-1 -right-1 w-2 h-2 bg-brand-accent-red" />
    </button>
  );
}
