import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-brand-border mt-24 bg-brand-bg-secondary" aria-label="Pied de page">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">

          {/* Brand */}
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 group w-fit">
              <span className="w-4 h-4 bg-brand-accent-red flex-shrink-0" aria-hidden="true" />
              <span className="font-display font-black text-sm tracking-widest text-brand-text-primary uppercase group-hover:text-brand-accent-red transition-colors">
                REFLEXE.IO
              </span>
            </Link>
            <p className="text-brand-text-muted text-sm leading-relaxed max-w-xs">
              Supprimer les mécaniques qui façonnent votre perception du monde.
            </p>
          </div>

          {/* Contenu */}
          <div className="md:col-start-4">
            <h3 className="font-mono text-[10px] uppercase tracking-widest text-brand-text-muted mb-4 text-right">Contenu</h3>
            <ul className="space-y-3 text-right">
              <li>
                <Link href="/journal" className="text-brand-text-secondary text-sm hover:text-brand-text-primary transition-colors">
                  JOURNAL
                </Link>
              </li>
              <li>
                <Link href="/biais" className="text-brand-text-secondary text-sm hover:text-brand-text-primary transition-colors">
                  BIAIS
                </Link>
              </li>
              <li>
                <Link href="/histoire" className="text-brand-text-secondary text-sm hover:text-brand-text-primary transition-colors">
                  HISTOIRE
                </Link>
              </li>
              <li>
                <Link href="/a-propos" className="text-brand-text-secondary text-sm hover:text-brand-text-primary transition-colors">
                  À PROPOS
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-brand-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-mono text-[10px] uppercase tracking-widest text-brand-text-muted">
            © 2026 REFLEXE.IO | Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <a href="https://www.linkedin.com/in/thierry-thiesson-7887501" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-brand-text-muted hover:text-brand-text-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
