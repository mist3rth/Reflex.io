import type { Metadata } from "next";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

export const metadata: Metadata = {
  title: "À propos | Reflexe.io",
  description: "La voix derrière Reflexe.io : Thierry Thiesson. 30 ans d'expertise dans le digital et les architectures de la pensée.",
  openGraph: {
    title: "Thierry Thiesson | À propos de Reflexe.io",
    description: "Prospective, conseil et analyse des architectures de la pensée.",
    images: ["/images/author.webp"],
  }
};

export default function AboutPage() {
  return (
    <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-10">
      {/* En-tête page */}
      <div className="border-l-4 border-brand-accent-red pl-6 mb-14">
        <h1 className="font-display font-black text-4xl md:text-5xl uppercase text-brand-text-primary mb-2">
          À PROPOS
        </h1>
        <p className="font-mono text-sm text-brand-accent-red italic">
          La voix derrière Reflexe.io : Thierry Thiesson
        </p>
      </div>

      {/* Layout 2 colonnes : Photo + Contenu */}
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-12 lg:gap-16">

        {/* Colonne gauche : Photo */}
        <div>
          {/* Portrait */}
          <div className="relative aspect-[3/4] max-w-[340px] bg-brand-bg-secondary border border-brand-border overflow-hidden mb-6 group">
            <Image
              src={getAssetPath("/images/author.webp")}
              alt="Thierry Thiesson"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
              sizes="(max-width: 768px) 100vw, 340px"
            />
          </div>

          {/* Citation */}
          <blockquote className="border-l-2 border-brand-accent-red pl-4 mb-8">
            <p className="font-serif italic text-sm text-brand-text-secondary leading-relaxed">
              &ldquo;Le numérique n&apos;est pas qu&apos;une affaire de code, c&apos;est une architecture de la pensée.&rdquo;
            </p>
          </blockquote>

          {/* Liens externes */}
          <div className="flex flex-col gap-4 max-w-[340px]">
            <a 
              href="https://mist3rth.github.io/presentMe/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-between px-5 py-3 border border-brand-accent-red text-brand-accent-red hover:bg-brand-accent-red hover:text-white transition-all duration-300 group"
              aria-label="Voir le portfolio de projets (s'ouvre dans un nouvel onglet)"
            >
              <span className="font-mono text-[11px] font-black uppercase tracking-[0.15em]">
                Voir le portfolio
              </span>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" aria-hidden="true">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </a>
            
            <a 
              href="https://www.linkedin.com/in/thierry-thiesson-7887501"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-brand-text-muted hover:text-brand-text-primary transition-colors px-1 group"
              aria-label="Profil LinkedIn (s'ouvre dans un nouvel onglet)"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-text-muted group-hover:text-[#0077b5] transition-colors" aria-hidden="true"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
              <span className="font-mono text-[10px] uppercase tracking-widest text-brand-text-muted group-hover:text-brand-text-primary transition-colors">Profil LinkedIn</span>
            </a>
          </div>
        </div>

        {/* Colonne droite : Texte avec sections numérotées */}
        <div className="space-y-16">
          {/* 01 QUI */}
          <section>
            <div className="flex items-center gap-4 mb-5">
              <span className="font-mono font-black text-[10px] text-brand-accent-red">01.</span>
              <h2 className="font-display font-black text-sm uppercase tracking-widest text-brand-accent-red">QUI</h2>
            </div>
            <div className="space-y-4 text-brand-text-secondary text-sm leading-relaxed">
              <p>
                <strong className="text-brand-text-primary">Thierry Thiesson. 30 ans dans le digital. Pas un observateur, un praticien.</strong>
              </p>
              <p>
                Des premiers BBS aux architectures IA contemporaines, j&apos;ai traversé chaque cycle technologique majeur de l&apos;intérieur. Pas comme analyste. Comme acteur.
              </p>
              <p>
                Formé en autonomie au MIT sur l&apos;IA appliquée aux organisations, j&apos;ai construit une lecture transversale rare : technique, économique, géopolitique, cognitive. Pas pour couvrir tous les sujets. Pour comprendre comment ils s&apos;imbriquent.
              </p>
              <p>
                Reflexe.io est né de cette conviction : les mécaniques qui façonnent nos sociétés ne se lisent pas dans une seule discipline.
              </p>
            </div>
          </section>

          {/* 02 CE QUE JE FAIS */}
          <section>
            <div className="flex items-center gap-4 mb-5">
              <span className="font-mono font-black text-[10px] text-brand-accent-red">02.</span>
              <h2 className="font-display font-black text-sm uppercase tracking-widest text-brand-accent-red">CE QUE JE FAIS</h2>
            </div>
            <div className="space-y-4 text-brand-text-secondary text-sm leading-relaxed">
              <p>
                <strong className="text-brand-text-primary">Prospective &amp; Conseil.</strong>
              </p>
              <p>
                J&apos;aide des organisations à lire les signaux faibles avant qu&apos;ils deviennent des chocs. À comprendre les dynamiques d&apos;influence cognitive qui reconfigurent leurs marchés, leurs équipes, leurs décisions.
              </p>
              <p>
                Pas de slides génériques. Pas de frameworks recyclés.<br />
                Une lecture construite sur 30 ans d&apos;exposition directe aux cycles d&apos;innovation.
              </p>
            </div>
          </section>

          {/* 03 POURQUOI REFLEXE.IO */}
          <section>
            <div className="flex items-center gap-4 mb-5">
              <span className="font-mono font-black text-[10px] text-brand-accent-red">03.</span>
              <h2 className="font-display font-black text-sm uppercase tracking-widest text-brand-accent-red">POURQUOI REFLEXE.IO</h2>
            </div>
            <div className="space-y-4 text-brand-text-secondary text-sm leading-relaxed">
              <p>
                Parce que la technique est devenue trop importante pour être laissée aux seuls techniciens.<br />
                Et la prospective trop sérieuse pour être laissée aux seuls futurologues.
              </p>
              <p>
                Chaque article publié ici est une démonstration de méthode : croiser le temps long de l&apos;histoire, la rigueur des données, et l&apos;angle cognitif que la plupart des analyses ignorent.
              </p>
              
              <div className="border border-brand-accent-red/30 p-6 bg-brand-bg-card mt-8">
                <h3 className="font-display font-black text-xs uppercase tracking-widest text-brand-text-primary mb-2">INDÉPENDANCE TOTALE</h3>
                <p className="text-brand-text-secondary text-xs leading-relaxed">
                  Aucun annonceur. Aucune affiliation.
                </p>
              </div>

              <div className="mt-8 pt-8 border-t border-brand-border">
                <p className="font-mono text-[10px] uppercase tracking-widest text-brand-text-muted mb-3">
                  → Vous souhaitez travailler ensemble ?
                </p>
                <a href="mailto:mist3rth@gmail.com" className="font-display font-black text-xl text-brand-text-primary hover:text-brand-accent-red transition-colors">
                  mist3rth@gmail.com
                </a>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
