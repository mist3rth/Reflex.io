import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { getAssetPath } from "@/lib/utils";

export const metadata: Metadata = {
  title: "À propos | Reflexe.io",
  description: "La voix derrière Reflexe.io : Thierry Thiesson.",
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
        <div className="space-y-14">
          {/* 01 Mon Parcours */}
          <section>
            <div className="flex items-center gap-4 mb-5">
              <span className="font-mono font-black text-[10px] text-brand-accent-red">01.</span>
              <h2 className="font-display font-black text-sm uppercase tracking-widest text-brand-accent-red">MON PARCOURS</h2>
            </div>
            <p className="text-brand-text-secondary text-sm leading-relaxed mb-4">
              Passionné par l&apos;intersection entre la technologie et la pensée critique, Thierry Thiesson a forgé son expertise à travers des décennies d&apos;exploration digitale. Son parcours est jalonné de défis relevés pour rendre le complexe accessible.
            </p>
            <p className="text-brand-text-secondary text-sm leading-relaxed">
              Des premières lignes de BBS aux architectures cloud contemporaines, il a observé les cycles d&apos;innovation non pas comme des successions d&apos;outils, mais comme des évolutions de notre rapport au savoir. Son expérience en tant qu&apos;architecte de systèmes d&apos;information lui permet aujourd&apos;hui d&apos;offrir un regard à la fois technique et philosophique sur notre futur numérique.
            </p>
          </section>

          {/* 02 Le Positionnement */}
          <section>
            <div className="flex items-center gap-4 mb-5">
              <span className="font-mono font-black text-[10px] text-brand-accent-red">02.</span>
              <h2 className="font-display font-black text-sm uppercase tracking-widest text-brand-accent-red">LE POSITIONNEMENT</h2>
            </div>
            <p className="text-brand-text-secondary text-sm leading-relaxed mb-4">
              <Link href="/" className="text-brand-accent-red hover:underline underline-offset-2">Reflexe.io</Link> n&apos;est pas un média de plus sur l&apos;actualité tech. C&apos;est un laboratoire d&apos;analyse. Nous ne nous contentons pas de rapporter ce qui se passe ; nous cherchons à comprendre pourquoi cela se produit et quelles en sont les ramifications profondes sur notre société.
            </p>
            <p className="text-brand-text-secondary text-sm leading-relaxed">
              Dans un monde saturé d&apos;informations éphémères, nous privilégions le &ldquo;temps long&rdquo;. Chaque article, chaque analyse est le fruit d&apos;une réflexion mûrie, visant à donner à nos lecteurs les clés d&apos;une autonomie de pensée face aux algorithmes.
            </p>
          </section>

          {/* 03 Pourquoi ce Projet */}
          <section>
            <div className="flex items-center gap-4 mb-5">
              <span className="font-mono font-black text-[10px] text-brand-accent-red">03.</span>
              <h2 className="font-display font-black text-sm uppercase tracking-widest text-brand-accent-red">POURQUOI CE PROJET ?</h2>
            </div>
            <p className="text-brand-text-secondary text-sm leading-relaxed">
              Ce projet est né d&apos;un constat simple : la technique est devenue trop importante pour être laissée aux seuls techniciens. Il y a un besoin vital de médiation culturelle. Reflexe.io se veut ce pont, ce &ldquo;réflexe&rdquo; nécessaire avant d&apos;adopter ou de rejeter une innovation.
            </p>
          </section>

          {/* Engagement / Vision */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="border border-brand-border p-6 bg-brand-bg-card">
              <h3 className="font-display font-black text-xs uppercase tracking-widest text-brand-text-muted mb-3">ENGAGEMENT</h3>
              <p className="text-brand-text-secondary text-xs leading-relaxed">
                Une indépendance totale vis-à-vis des annonceurs et des géants du secteur.
              </p>
            </div>
            <div className="border border-brand-border p-6 bg-brand-bg-card">
              <h3 className="font-display font-black text-xs uppercase tracking-widest text-brand-text-muted mb-3">VISION</h3>
              <p className="text-brand-text-secondary text-xs leading-relaxed">
                Contribuer à une technologie plus humaine, plus éthique et plus transparente.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
