# Reflexe.io — Spécifications techniques & fonctionnelles

> Document de référence — Version 1.0  
> Auteur : Thierry Thiesson  
> Statut : document de travail, évolutif  
> Dépendance : Charte éditoriale & Design v1.0

---

## 1. Vue d'ensemble

### 1.1 Nature du projet

Journal numérique solo, évolutif, à publication asynchrone. Pas de backend transactionnel, pas de compte utilisateur en phase 1. Priorité absolue : **performance, lisibilité, maintenabilité**.

### 1.2 Principes directeurs

- **Statique d'abord** — pas de serveur applicatif si ce n'est pas nécessaire
- **Contenu souverain** — les articles sont des fichiers Markdown versionés, pas des données en base
- **Performance non négociable** — Lighthouse 95+ en production sur toutes les pages
- **SEO structurel** — chaque page est indexable, chaque article est une entité sémantique complète
- **Zéro dépendance superflue** — stack légère, maîtrisée, durable

---

## 2. Stack technique

### 2.1 Framework & rendu

| Composant | Choix | Justification |
|---|---|---|
| Framework | **Next.js 14+** (App Router) | SSG natif, ISR, SEO optimal, écosystème React maîtrisé |
| Rendu | **Static Site Generation (SSG)** | Pages pré-générées au build, CDN-ready, performance maximale |
| Langage | **TypeScript** | Typage strict, maintenabilité, cohérence avec stack pro |
| Styles | **CSS Modules + CSS custom properties** | Pas de surcharge Tailwind, contrôle total, cohérence avec la charte |
| Contenu | **MDX** (Markdown + JSX) | Articles en Markdown pur avec possibilité d'intégrer des composants React (schémas, callouts) |

### 2.2 Gestion du contenu

| Composant | Choix | Justification |
|---|---|---|
| Source articles | **Fichiers `.mdx` locaux** | Versionés avec le code, souverains, éditables sans CMS |
| Parser MDX | **next-mdx-remote** ou **contentlayer** | Lecture des métadonnées frontmatter, génération des slugs |
| Métadonnées article | **Frontmatter YAML** | Titre, date, rubrique, résumé, temps de lecture, statut draft/published |
| Images | **Next.js Image** (`next/image`) | Optimisation automatique WebP/AVIF, lazy loading natif |

### 2.3 Infrastructure & déploiement

| Composant | Choix | Justification |
|---|---|---|
| Hébergement | **Vercel** | Déploiement Next.js natif, CDN global, previews par branche, gratuit en solo |
| Domaine | **reflexe.io** | À acquérir — vérifier disponibilité |
| Versioning | **Git / GitHub** | Source of truth, déploiement automatique sur push main |
| CI/CD | **Vercel CLI + GitHub Actions** | Build automatique, checks Lighthouse optionnels |

### 2.4 Dépendances principales

```
next@14+
react@18+
typescript@5+
next-mdx-remote
gray-matter              # parsing frontmatter
reading-time             # calcul temps de lecture automatique
date-fns                 # formatage des dates
```

### 2.5 Dépendances optionnelles (phase 2+)

```
@vercel/analytics        # analytics légers, privacy-friendly
resend ou buttondown     # newsletter
fuse.js                  # recherche full-text côté client
```

---

## 3. Architecture du projet

### 3.1 Structure des dossiers

```
reflexe-io/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Layout racine (nav, footer, fonts)
│   ├── page.tsx                  # Page d'accueil
│   ├── journal/
│   │   ├── page.tsx              # Index du journal
│   │   └── [slug]/
│   │       └── page.tsx          # Page article dynamique
│   ├── a-propos/
│   │   └── page.tsx              # Page auteur
│   └── globals.css               # Variables CSS globales, reset
│
├── content/                      # Articles MDX — source of truth
│   ├── mecanismes/
│   │   └── biais-urgence-amazon.mdx
│   ├── terrain/
│   │   └── dark-patterns-checkout.mdx
│   ├── heritage/
│   │   └── guerre-froide-marketing.mdx
│   └── radar/
│       └── tiktok-dopamine-2024.mdx
│
├── components/
│   ├── layout/
│   │   ├── Nav.tsx
│   │   ├── Footer.tsx
│   │   └── ReadingProgress.tsx
│   ├── article/
│   │   ├── ArticleHeader.tsx     # Titre, métadonnées, rubrique
│   │   ├── ArticleBody.tsx       # Rendu MDX
│   │   ├── ArticleCard.tsx       # Carte dans l'index
│   │   └── Callout.tsx           # Composant MDX — citation mise en avant
│   ├── home/
│   │   ├── HeroThesis.tsx        # Présentation de la thèse
│   │   └── LatestArticles.tsx    # Derniers articles
│   └── ui/
│       ├── RubriqueBadge.tsx     # Label [ MÉCANISMES ] etc.
│       ├── Separator.tsx
│       └── SchemaWrapper.tsx     # Wrapper pour les schémas SVG inline
│
├── lib/
│   ├── articles.ts               # Fonctions de lecture et tri des articles
│   ├── types.ts                  # Types TypeScript partagés
│   └── constants.ts              # Rubriques, config globale
│
├── public/
│   ├── fonts/                    # Fonts auto-hébergées (performance)
│   ├── images/
│   │   └── articles/             # Images des articles
│   └── og/                       # Images Open Graph générées
│
└── styles/
    ├── tokens.css                # Design tokens (couleurs, typo, espacement)
    ├── typography.css            # Styles de lecture (prose)
    └── article.css               # Styles spécifiques page article
```

### 3.2 Format frontmatter des articles

```yaml
---
title: "Le biais d'urgence : comment Amazon transforme votre cortex en distributeur automatique"
slug: "biais-urgence-amazon"
rubrique: "terrain"
date: "2026-03-15"
resume: "Derrière le 'Plus que 3 en stock', une mécanique behavioriste vieille de 80 ans. Décryptage d'un réflexe conditionné industrialisé."
tags: ["biais d'urgence", "Amazon", "dark patterns", "behaviorisme"]
readingTime: 8
status: "published"   # draft | published
articleNumber: "001"
---
```

---

## 4. Spécifications fonctionnelles

### 4.1 Page — Accueil (`/`)

**Objectif :** Poser la thèse, donner envie d'entrer dans le journal.

**Composants :**

- **Hero thèse** — titre fort + formulation de la thèse centrale en 3–4 lignes. Pas de slider, pas d'animation complexe. Du texte, une typographie travaillée.
- **Article fondateur mis en avant** — un seul, en grand. Le texte de référence qui pose les bases du projet.
- **Derniers articles** — 3 à 4 cartes, toutes rubriques confondues, triées par date.
- **Encart "À propos"** — une phrase + lien vers la page auteur. Sobre.

**Comportements :**
- Génération statique au build
- Pas de pagination sur l'accueil — les 4 derniers articles seulement
- Aucun appel API au runtime

---

### 4.2 Page — Journal (`/journal`)

**Objectif :** Index complet de tous les articles publiés, navigable par rubrique.

**Composants :**

- **Filtre par rubrique** — 4 boutons : Tous / Mécanismes / Terrain / Héritage / Radar. Filtrage côté client (pas de rechargement de page).
- **Liste des articles** — cartes avec : numéro d'article, rubrique, titre, résumé, date, temps de lecture.
- **Compteur** — nombre d'articles par rubrique, mis à jour dynamiquement avec le filtre.

**Comportements :**
- Génération statique de la liste complète au build
- Filtrage JavaScript côté client, sans rechargement
- Tri par défaut : date décroissante (plus récent en premier)
- Pas de pagination en phase 1 (volume faible) — infinite scroll ou pagination simple en phase 2

---

### 4.3 Page — Article (`/journal/[slug]`)

**Objectif :** Expérience de lecture optimale. L'article est le produit.

**Composants :**

- **Header article**
  - Numéro d'article `#001`
  - Label rubrique `[ MÉCANISMES ]`
  - Titre (Syne, grand)
  - Résumé / chapeau
  - Date + temps de lecture estimé
  - Séparateur

- **Corps MDX**
  - Rendu du contenu Markdown
  - Support des composants custom : `<Callout>`, `<Schema>`, `<Highlight>`
  - Colonne de lecture centrée, max `720px`
  - Styles prose dédiés (voir section 5)

- **Barre de progression de lecture**
  - Fine barre horizontale fixe en haut de page
  - Couleur accent rouge signal
  - Apparaît dès le scroll, disparaît en fin d'article

- **Navigation entre articles**
  - Article précédent / suivant en bas de page
  - Même rubrique en priorité

- **Encart auteur** en fin d'article
  - Nom, une ligne de positionnement, lien À propos

**Comportements :**
- `generateStaticParams` — toutes les pages article pré-générées au build
- `generateMetadata` — title, description, OG tags générés depuis le frontmatter
- Pas de commentaires en phase 1
- Pas de partage social en phase 1 (le lecteur copie l'URL)

---

### 4.4 Page — À propos (`/a-propos`)

**Objectif :** Poser la crédibilité, humaniser la voix éditoriale.

**Contenu :**
- Qui est l'auteur — parcours e-commerce, CRO, tech
- Pourquoi Reflexe.io — la tension praticien / observateur lucide
- La thèse en version longue
- Contact (LinkedIn)

**Note :** Page statique, rédigée en MDX ou directement en JSX. Pas de composants dynamiques.

---

### 4.5 Navigation globale

**Desktop :**
```
reflexe.io          Journal    À propos
```
Logo à gauche, liens à droite. Sobre. Fond semi-transparent avec backdrop-filter au scroll.

**Mobile :**
Menu burger — ouverture plein écran, liens en grand, fermeture au tap ou à l'extérieur.

**Comportements :**
- Lien actif mis en évidence (couleur accent)
- Scroll > 80px : fond nav opaque + légère ombre
- Scroll = 0 : fond transparent

---

### 4.6 Footer

```
Reflexe.io — Les mécanismes de la manipulation, du présent vers le passé.

Journal        À propos

© 2026 Thierry Thiesson
```

Sobre, centré ou deux colonnes. Aucun widget, aucun lien externe superflu.

---

## 5. Spécifications de rendu — Typographie prose

Les articles sont du texte long. Les styles prose sont critiques.

### 5.1 Styles de base

```css
/* Colonne de lecture */
.prose {
  max-width: 720px;
  margin: 0 auto;
  font-family: 'IBM Plex Serif', Georgia, serif;
  font-size: 17px;
  line-height: 1.85;
  color: var(--color-text);
}

/* Titres dans l'article */
.prose h2 {
  font-family: 'Syne', sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  margin-top: 3rem;
  margin-bottom: 1rem;
  color: var(--color-text-strong);
}

.prose h3 {
  font-family: 'Syne', sans-serif;
  font-size: 1.2rem;
  font-weight: 600;
  margin-top: 2rem;
}

/* Citations en bloc */
.prose blockquote {
  border-left: 3px solid var(--color-accent);
  padding: 0.75rem 0 0.75rem 1.5rem;
  margin: 2rem 0;
  background: rgba(232, 48, 58, 0.04);
  font-style: normal;
  color: var(--color-text);
}

/* Liens */
.prose a {
  color: var(--color-accent-cyan);
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* Code inline */
.prose code {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.85em;
  background: var(--color-surface);
  padding: 0.1em 0.4em;
  border-radius: 2px;
}
```

### 5.2 Composants MDX custom

**`<Callout>`** — Citation ou concept mis en avant

```mdx
<Callout>
  Le biais d'urgence n'est pas un outil marketing. C'est un réflexe de survie détourné.
</Callout>
```

**`<Highlight label="Concept clé">`** — Encart définition

```mdx
<Highlight label="Conditionnement opérant">
  Mécanisme décrit par B.F. Skinner en 1938 : un comportement renforcé par une récompense
  devient un réflexe. Amazon en fait un moteur d'achat impulsif.
</Highlight>
```

**`<Schema>`** — Wrapper pour diagrammes SVG inline

```mdx
<Schema title="Du stimulus à l'achat — la chaîne behavioriste">
  {/* SVG inline */}
</Schema>
```

---

## 6. SEO & métadonnées

### 6.1 Métadonnées par page

Chaque page génère dynamiquement depuis le frontmatter :

```typescript
// app/journal/[slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const article = getArticleBySlug(params.slug)
  return {
    title: `${article.title} — Reflexe.io`,
    description: article.resume,
    openGraph: {
      title: article.title,
      description: article.resume,
      type: 'article',
      publishedTime: article.date,
      authors: ['Thierry Thiesson'],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.resume,
    }
  }
}
```

### 6.2 Données structurées (JSON-LD)

Chaque article embarque un bloc JSON-LD `Article` :

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Titre de l'article",
  "author": {
    "@type": "Person",
    "name": "Thierry Thiesson",
    "url": "https://reflexe.io/a-propos"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Reflexe.io"
  },
  "datePublished": "2026-03-15",
  "description": "Résumé de l'article"
}
```

### 6.3 Sitemap & robots

- `sitemap.xml` généré automatiquement par Next.js depuis les slugs des articles
- `robots.txt` : indexation complète, pas de restriction
- `canonical` sur chaque page

---

## 7. Performance — objectifs & leviers

### 7.1 Objectifs Lighthouse

| Métrique | Objectif |
|---|---|
| Performance | ≥ 95 |
| Accessibilité | ≥ 95 |
| Best Practices | ≥ 95 |
| SEO | ≥ 98 |

### 7.2 Leviers d'optimisation

**Fonts :**
- Auto-hébergement des fonts (Syne, IBM Plex Serif, JetBrains Mono) dans `/public/fonts`
- `font-display: swap`
- Preload des fonts critiques dans le `<head>`

**Images :**
- Composant `next/image` systématique
- Format WebP/AVIF automatique
- Attributs `width`, `height` et `alt` obligatoires
- Images articles : max `1200px` de large, optimisées avant upload

**JavaScript :**
- Pas de JS inutile côté client — les pages sont des composants serveur par défaut
- Seuls les composants interactifs (filtre journal, barre de lecture, menu mobile) sont des Client Components
- Pas de librairie d'animation externe — CSS transitions uniquement

**CSS :**
- CSS Modules — pas de CSS global sauf tokens et reset
- Pas de framework CSS (pas de Tailwind en production)
- Variables CSS pour tous les tokens — pas de valeurs hardcodées

---

## 8. Accessibilité

### 8.1 Exigences minimales

- Structure sémantique HTML5 : `<header>`, `<nav>`, `<main>`, `<article>`, `<footer>`
- Hiérarchie de titres cohérente : un seul `<h1>` par page
- Liens : texte descriptif, jamais "cliquez ici"
- Images : attribut `alt` systématique, vide pour les images décoratives
- Navigation clavier : focus visible sur tous les éléments interactifs
- Contraste : ratio minimum 4.5:1 pour le texte courant

### 8.2 Spécificités

- `skip link` : lien "Aller au contenu principal" en premier élément du DOM
- Menu mobile : gestion du focus trap à l'ouverture
- Barre de progression : `role="progressbar"` avec `aria-valuenow`
- Labels rubriques : balise `<span>` avec attribut approprié, pas juste de la décoration

---

## 9. Phases de développement

### Phase 1 — MVP (lancement)

**Objectif :** Site en ligne avec les 3–4 premiers articles.

- [ ] Setup Next.js 14 + TypeScript
- [ ] Système de lecture des fichiers MDX + frontmatter
- [ ] Layout global (nav, footer)
- [ ] Page accueil
- [ ] Page journal avec filtre rubriques
- [ ] Page article avec barre de progression
- [ ] Page À propos
- [ ] Fonts auto-hébergées
- [ ] Métadonnées SEO + JSON-LD
- [ ] Déploiement Vercel + domaine reflexe.io
- [ ] Lighthouse ≥ 95 sur toutes les pages

### Phase 2 — Enrichissement éditorial

- [ ] Composants MDX custom (Callout, Highlight, Schema)
- [ ] Système de tags et navigation par tags
- [ ] Page article : navigation précédent/suivant
- [ ] Recherche full-text côté client (fuse.js)
- [ ] Sitemap automatique

### Phase 3 — Audience & distribution

- [ ] Newsletter (Buttondown ou Resend)
- [ ] Analytics privacy-friendly (Vercel Analytics ou Plausible)
- [ ] Images Open Graph dynamiques (Next.js og:image)
- [ ] Mode sombre/clair (optionnel — dark par défaut, cohérent avec la charte)

### Phase 4 — Évolutions long terme

- [ ] RSS Feed
- [ ] Schémas analytiques interactifs (D3.js ou SVG animés)
- [ ] Série d'articles liés (format dossier)
- [ ] Version PDF des articles de fond (optionnel)

---

## 10. Règles de développement

### 10.1 Conventions de code

- **Composants** : PascalCase, un composant par fichier
- **Fichiers MDX** : kebab-case, dans le dossier de la rubrique correspondante
- **Types** : interfaces TypeScript explicites pour tous les objets métier (Article, Rubrique, Metadata)
- **CSS** : BEM allégé pour les classes, variables CSS pour tous les tokens

### 10.2 Type Article

```typescript
export interface Article {
  slug: string
  title: string
  rubrique: 'mecanismes' | 'terrain' | 'heritage' | 'radar'
  date: string
  resume: string
  tags: string[]
  readingTime: number
  status: 'draft' | 'published'
  articleNumber: string
  content: string
}
```

### 10.3 Règles de qualité

- Aucun `any` TypeScript
- Lighthouse ≥ 95 avant tout merge sur `main`
- Chaque article passe en `status: draft` pendant la rédaction, `published` à la mise en ligne
- Images vérifiées (format, poids, alt) avant commit

---

*Document évolutif — mis à jour au fil du développement du projet.*
