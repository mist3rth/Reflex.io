import React from 'react';
import Image from 'next/image';
import { getBreadcrumbJsonLd } from '@/lib/jsonld';
import { getAssetPath } from '@/lib/utils';

interface BiasData {
  title: string;
  brain: string;
  evolution?: string;
  exploitation: string;
}

function BiasCard({ title, brain, evolution, exploitation }: BiasData) {
  return (
    <div className="bg-brand-bg-secondary border border-brand-border p-8 rounded-sm hover:border-brand-accent-red/50 transition-all group flex flex-col h-full">
      <h3 className="font-display font-black text-xl md:text-2xl uppercase text-brand-text-primary mb-6 group-hover:text-brand-accent-red transition-colors tracking-tight">
        {title}
      </h3>
      <div className="space-y-6 flex-grow">
        <div>
          <span className="font-mono text-[10px] text-brand-accent-red uppercase block mb-2 tracking-widest font-bold">Mécanique Cérébrale</span>
          <p className="text-brand-text-secondary leading-relaxed text-sm md:text-base">{brain}</p>
        </div>
        {evolution && (
          <div>
            <span className="font-mono text-[10px] text-brand-accent-red uppercase block mb-2 tracking-widest font-bold">Origine Évolutive</span>
            <p className="text-brand-text-muted leading-relaxed text-sm">{evolution}</p>
          </div>
        )}
        <div className="pt-4 border-t border-brand-border/50">
          <span className="font-mono text-[10px] text-brand-accent-red uppercase block mb-2 tracking-widest font-bold">Exploitation Contemporaine</span>
          <p className="text-brand-text-secondary leading-relaxed text-sm">{exploitation}</p>
        </div>
      </div>
    </div>
  );
}

export default function BiaisPage() {

  return (
    <div className="min-h-screen bg-brand-bg-primary text-brand-text-primary selection:bg-brand-accent-red selection:text-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(getBreadcrumbJsonLd([
            { name: "Accueil", item: "/" },
            { name: "Biais cognitifs", item: "/biais" }
          ])),
        }}
      />
      <div className="max-w-[1400px] mx-auto px-6 lg:px-10 py-0 sm:py-10 flex flex-col">
        {/* 1. Banner Hero Immersive (TOP - Mobile & Desktop) */}
        <div className="relative w-full aspect-[21/9] md:aspect-video min-h-[250px] md:min-h-[400px] max-h-[700px] mb-8 md:mb-16 overflow-hidden border border-brand-border group flex items-center justify-center">
          <div className="absolute inset-0 bg-brand-bg-secondary">
             <Image 
              src={getAssetPath("/images/biais_hero.png")}
              alt="Architecture des biais cognitifs"
              fill
              className="object-cover opacity-60 group-hover:scale-105 transition-transform duration-[2s] ease-out grayscale contrast-125"
              priority
            />
          </div>
          <div className="absolute inset-0 bg-black/40" />
          
          <div className="absolute inset-0 p-4 md:p-12 flex flex-col items-center justify-center text-center">
            <div className="max-w-3xl">
              <p className="font-mono text-[8px] md:text-xs uppercase tracking-[0.3em] text-brand-text-muted mb-2 md:mb-4 pt-1">
                SYSTÈME_1 / INFODÉFICIENCE
              </p>
              <h1 className="font-display font-black text-lg sm:text-4xl md:text-7xl uppercase text-brand-text-primary mb-4 md:mb-6 tracking-tight leading-tight sm:leading-[0.9] break-words drop-shadow-2xl">
                Architecture des Biais Cognitifs
              </h1>
              <div className="flex items-center justify-center gap-3 md:gap-6 font-mono text-[8px] md:text-xs text-brand-accent-red uppercase tracking-[0.2em] font-bold">
                <span className="bg-brand-accent-red text-white px-2 py-0.5 whitespace-nowrap">ANATOMIE DES RÉFLEXES</span>
                <span className="hidden sm:block w-1 h-1 bg-brand-accent-red rounded-full" />
                <span className="text-brand-text-primary underline decoration-brand-accent-red decoration-2 underline-offset-4 tracking-[0.3em]">MARS 2026 EDITION</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. Introduction (Désormais centrée sans sommaire) */}
        <div className="max-w-4xl mx-auto w-full mb-8 md:mb-24 mt-4 lg:mt-0">
          <div className="p-6 md:p-12 bg-brand-bg-secondary border border-brand-border italic font-serif text-base md:text-xl text-brand-text-secondary leading-relaxed relative overflow-hidden">
            <div className="absolute top-0 left-0 w-1 h-full bg-brand-accent-red" />
            &quot;Un biais cognitif n&apos;est pas un défaut de fabrication. C&apos;est un raccourci de traitement sélectionné par l&apos;évolution. Le problème commence quand ces raccourcis deviennent des surfaces d&apos;attaque.&quot;
          </div>
        </div>


        {/* Content Families */}
        <div className="space-y-32">
          {/* Famille 1 */}
          <section id="famille-1" className="scroll-mt-32">
            <div className="mb-12 border-b border-brand-border pb-8">
              <span className="font-mono text-xs text-brand-accent-red uppercase tracking-[0.4em] block mb-4">Famille 01</span>
              <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter mb-4">Survie & Urgence</h2>
              <p className="text-brand-text-muted text-lg max-w-3xl italic">
                Ces biais mobilisent les systèmes d&apos;alerte primitifs du cerveau. Ils sont parmi les plus anciens et les plus robustes.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BiasCard 
                title="Biais de rareté"
                brain="Le cortex préfrontal est court-circuité par l'activation de l'amygdale. Le cerveau interprète la rareté comme une menace directe à la survie."
                evolution="Dans un environnement de survie, agir quand la ressource est disponible est la seule stratégie gagnante."
                exploitation="&quot;Plus que 3 en stock&quot;, compteurs de temps réel, ventes flash, éditions limitées artificiellement rares."
              />
              <BiasCard 
                title="Aversion aux pertes"
                brain="La douleur psychologique d'une perte est environ deux fois plus intense que le plaisir d'un gain équivalent. Codé dans l'insula et le cortex cingulaire."
                evolution="Perdre des ressources acquises était souvent fatal. La sélection naturelle a favorisé ceux qui protègent leurs acquis agressivement."
                exploitation="&quot;Ne ratez pas&quot; au lieu de &quot;Profitez de&quot;, essais gratuits avec carte bancaire, programmes de fidélité expirables."
              />
              <BiasCard 
                title="Saillance & Contraste"
                brain="Le cerveau détecte les changements et les contrastes plutôt que les états stables. Héritage des systèmes de détection de prédateurs."
                evolution="Survivre demande de détecter l'élément qui tranche avec l'arrière-plan sécurisé."
                exploitation="Boutons CTA vifs, prix barrés, notifications rouges, ancrage de prix élevés pour valoriser le prix cible."
              />
              <BiasCard 
                title="Effet de Cadrage"
                brain="La même information produit des décisions opposées selon sa présentation. Un cadrage négatif active fortement l'amygdale."
                exploitation="&quot;90% sans matières grasses&quot; vs &quot;10% de gras&quot;, titres de presse orientés, réduction vs supplément."
              />
            </div>
          </section>

          {/* Famille 2 */}
          <section id="famille-2" className="scroll-mt-32">
            <div className="mb-12 border-b border-brand-border pb-8">
              <span className="font-mono text-xs text-brand-accent-red uppercase tracking-[0.4em] block mb-4">Famille 02</span>
              <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter mb-4">Sociaux & Appartenance</h2>
              <p className="text-brand-text-muted text-lg max-w-3xl italic">
                L&apos;être humain est une espèce profondément sociale. Ces mécanismes régissent la survie au sein du groupe.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BiasCard 
                title="Preuve Sociale"
                brain="Dans l'incertitude, le cerveau délègue son jugement au comportement du groupe. L'exclusion active les zones de douleur physique."
                evolution="Suivre le groupe en cas de doute est statistiquement plus sûr. La synchronisation augmente la résilience collective."
                exploitation="Compteurs d'avis, labels &quot;Meilleure vente&quot;, likes, influenceurs agissant comme des pairs de référence."
              />
              <BiasCard 
                title="Biais d'autorité"
                brain="Face à un signal d'autorité (titre, uniforme), le cortex préfrontal réduit son activité analytique critique."
                evolution="Suivre les individus à haut statut ou expertise est une stratégie d'apprentissage et de survie efficace."
                exploitation="Blouses blanches, &quot;Vu dans les médias&quot;, certifications de sécurité institutionnelles, design corporate formel."
              />
              <BiasCard 
                title="Réciprocité"
                brain="Recevoir un service crée une tension psychologique (dette) que le cerveau cherche à résoudre par un retour."
                evolution="Fondement de la coopération humaine. Violer cette norme exposait à l'exclusion sociale dans les groupes primitifs."
                exploitation="Échantillons gratuits, contenu gratuit avant vente, &quot;Cadeaux&quot; d'inscription, flattery marketing."
              />
              <BiasCard 
                title="Conformité"
                brain="Adopter les codes du groupe dominant active le circuit de récompense dopaminergique. La non-conformité active l'anxiété."
                exploitation="Marketing de communauté, FOMO (Fear Of Missing Out), abonnements présentés comme des identités sociales."
              />
            </div>
          </section>

          {/* Famille 3 */}
          <section id="famille-3" className="scroll-mt-32">
            <div className="mb-12 border-b border-brand-border pb-8">
              <span className="font-mono text-xs text-brand-accent-red uppercase tracking-[0.4em] block mb-4">Famille 03</span>
              <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter mb-4">Traitement de l&apos;information</h2>
              <p className="text-brand-text-muted text-lg max-w-3xl italic">
                Ces biais affectent la façon même dont nous construisons notre perception du réel.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BiasCard 
                title="Confirmation"
                brain="Le cerveau traite préférentiellement ce qui confirme ses croyances. Sa remise en question génère une dissonance douloureuse."
                evolution="Maintenir des modèles du monde cohérents est économiquement vital pour l'action rapide."
                exploitation="Algorithmes de recommandation (chambres d'écho), titres sensationnels, ciblage par affinité idéologique."
              />
              <BiasCard 
                title="Ancrage"
                brain="Le cerveau s'appuie sur la première information numérique reçue pour évaluer toutes les suivantes."
                exploitation="Prix de référence barrés, items ultra-chers en début de menu, négociations ancrées délibérément haut."
              />
              <BiasCard 
                title="Disponibilité"
                brain="Ce qui est mémorable, récent ou émotionnellement chargé paraît plus probable et fréquent qu'il ne l'est."
                exploitation="Couverture intense de faits divers rares, saturation de retargeting, répétition de slogans simples."
              />
              <BiasCard 
                title="Statu Quo"
                brain="Le cerveau préfère l'état existant au changement. Changer demande un effort cognitif et expose à des risques."
                exploitation="Renouvellement automatique d'abonnements, cases pré-cochées (opt-out), paramètres par défaut complexes."
              />
            </div>
          </section>

          {/* Famille 4 */}
          <section id="famille-4" className="scroll-mt-32">
            <div className="mb-12 border-b border-brand-border pb-8">
              <span className="font-mono text-xs text-brand-accent-red uppercase tracking-[0.4em] block mb-4">Famille 04</span>
              <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter mb-4">Ego & Identité</h2>
              <p className="text-brand-text-muted text-lg max-w-3xl italic">
                Ces biais protègent l&apos;image de soi et la cohérence identitaire.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BiasCard 
                title="Engagement"
                brain="Une fois engagé publiquement ou privément, le cerveau modifie sa perception du réel pour rester cohérent."
                exploitation="Technique du pied dans la porte, questionnaires de personnalisation, programmes de fidélité à statuts."
              />
              <BiasCard 
                title="Dunning-Kruger"
                brain="Les moins compétents surestiment leur maîtrise par manque de capacités métacognitives."
                exploitation="Interfaces de trading simplifiées, promesses d'apprentissage &quot;éclair&quot;, flatterie de l'ego."
              />
            </div>
          </section>

          {/* Famille 5 */}
          <section id="famille-5" className="scroll-mt-32">
            <div className="mb-12 border-b border-brand-border pb-8">
              <span className="font-mono text-xs text-brand-accent-red uppercase tracking-[0.4em] block mb-4">Famille 05</span>
              <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter mb-4">Récompense & Addiction</h2>
              <p className="text-brand-text-muted text-lg max-w-3xl italic">
                Ils exploitent directement le système dopaminergique. L&apos;industrie numérique les a industrialisés.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BiasCard 
                title="Renforcement Variable"
                brain="La récompense aléatoire et imprévisible produit le comportement le plus compulsif (Skinner box)."
                exploitation="Fil d'actualité, Pull-to-refresh, Notifications aléatoires, Loot boxes, Likes variables."
              />
              <BiasCard 
                title="Gratification Immédiate"
                brain="Le cerveau dévalorise les récompenses futures de façon hyperbolique au profit de l'immédiat."
                exploitation="Livraison express, Afterpay, Accès instantané au contenu, stimulations courtes (TikTok/Reels)."
              />
            </div>
          </section>

          {/* Famille 6 */}
          <section id="famille-6" className="scroll-mt-32">
            <div className="mb-12 border-b border-brand-border pb-8">
              <span className="font-mono text-xs text-brand-accent-red uppercase tracking-[0.4em] block mb-4">Famille 06</span>
              <h2 className="font-display font-black text-4xl md:text-5xl uppercase tracking-tighter mb-4">Numériques émergents</h2>
              <p className="text-brand-text-muted text-lg max-w-3xl italic">
                Les interfaces modernes ont amplifié ces mécanismes à une échelle sans précédent.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <BiasCard 
                title="Automation Bias"
                brain="Réduction de l'activité analytique critique en présence d'un système automatisé perçu comme compétent."
                exploitation="Recommandations algorithmiques acceptées sans filtre, suivi aveugle des navigations automatisées."
              />
              <BiasCard 
                title="Simple Exposition"
                brain="La familiarité génère de la préférence. Plus un stimulus est fréquent, plus il est perçu positivement."
                exploitation="Retargeting publicitaire intensif, répétition désinformationnelle (Illusory truth effect)."
              />
              <BiasCard 
                title="Surcharge & Paralysie"
                brain="Trop d'options augmentent le coût cognitif et le regret potentiel, poussant à la délégation algorithmique."
                exploitation="Catalogues de streaming gigantesques, menus de paramètres touffus favorisant le statu quo."
              />
            </div>
          </section>
        </div>

        {/* Conclusion */}
        <section className="mt-24 border-t border-brand-border/50 pt-16 pb-20">
           <div className="max-w-4xl">
              <h2 className="font-display font-black text-3xl md:text-4xl uppercase tracking-tighter mb-8 text-brand-accent-red">La connaissance n&apos;est pas l&apos;immunité</h2>
              <div className="prose prose-invert prose-brand max-w-none space-y-6 text-base md:text-lg text-brand-text-secondary">
                <p>
                  Connaître l&apos;existence d&apos;un biais ne suffit pas à s&apos;en protéger. La connaissance intellectuelle n&apos;efface pas le mécanisme automatique ancré dans nos structures cérébrales depuis des millénaires.
                </p>
                <p>
                  Ce que la connaissance permet, en revanche, c&apos;est de <strong>ralentir</strong>. De créer un espace entre le stimulus et la réponse. De se demander : <em>est-ce que j&apos;agis, ou est-ce qu&apos;on m&apos;a déclenché ?</em>
                </p>
              </div>
           </div>
          </section>
        </div>
      </div>
  );
}
