# Architecture - Reflexe.io

> **Document technique — Version 1.0**
> **Stack :** Next.js 14, TypeScript, CSS Modules

## 1. Stack Technique
| Composant | Choix | Justification |
|---|---|---|
| Framework | **Next.js 14+** (App Router) | SSG, ISR, SEO optimal |
| Rendu | **Static Site Generation (SSG)** | Performance maximale |
| Langage | **TypeScript** | Typage strict |
| Styles | **CSS Modules** | Contrôle total, pas de surcharge |
| Contenu | **MDX** | Markdown + composants React |
| Déploiement | **Vercel** | Intégration Next.js native |

## 2. Structure du Projet
```
reflexe-io/
├── app/                  # Next.js App Router
├── content/              # Articles MDX (Source of truth)
├── components/           # Composants UI (Layout, Article, UI)
├── lib/                  # Logique métier (articles.ts)
├── public/               # Assets (Fonts, Images)
└── styles/               # Design System (Tokens, Typo)
```

## 3. Modèle de Données
### 3.1 Type Article
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

## 4. Performance & Optimisation
- **Fonts** : Auto-hébergées dans `/public/fonts`.
- **Layout Contextuel** : Utilisation de `CSS Grid` et `Flexbox` pour les composants complexes (ex: Header d'article en 2 colonnes) afin de garantir la fluidité sur tous les viewports.
- **Optimisation Image** : Priorité au composant `next/image` avec ratios fixes pour éviter le CLS.
- **CSS** : Uniquement CSS Modules et CSS Variables (Design Tokens).

## 5. Accessibilité (A11Y)
- Structure sémantique HTML5 (header, nav, main, article, footer).
- Support clavier complet.
- Ratio de contraste WCAG AA.
