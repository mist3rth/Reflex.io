# PRD - Reflexe.io

> **Document de référence — Version 1.0**
> **Auteur :** Thierry Thiesson
> **Statut :** Document de travail, évolutif

## 1. Vision & Objectifs
**Reflexe.io** est un journal d'analyse des biais cognitifs et de leur exploitation systématique par les acteurs du e-commerce, du pouvoir politique et des plateformes numériques.

### 1.1 Thèse Centrale
L'exploitation massive des mécanismes de défense naturels (réflexes primaires) produit un effet paradoxal : la désensibilisation ou l'état d'alerte chronique, rendant les individus plus vulnérables. Reflexe.io éclaire ces mécanismes, "du présent vers le passé".

### 1.2 Objectif Produit
Transformer un CV statique en un site d'autorité pour générer des leads qualifiés via un journal numérique solo, asynchrone et performant.

## 2. Public Cible
- Professionnels du numérique (E-commerce, Tech, UX)
- Journalistes, chercheurs, décideurs
- Citoyens critiques exigeant de la profondeur

## 3. Spécifications Fonctionnelles

### 3.1 Structure du Site
- **Accueil (/)** : Pose la thèse, met en avant l'article fondateur et les derniers articles.
- **Journal (/journal)** : Index complet avec filtrage par rubrique (Mécanismes, Terrain, Héritage, Radar).
- **Article (/journal/[slug])** : Expérience de lecture optimale, barre de progression, navigation entre articles.
- **À propos (/a-propos)** : Crédibilité de l'auteur (Thierry Thiesson) et thèse détaillée.

### 2.2. Header d'Article (Refonte Grille)
- **Concept :** Abandon de l'overlay (texte sur image) pour une disposition en deux colonnes sur desktop afin de garantir une lisibilité parfaite.
- **Desktop (Grid 2 col) :**
    - Colonne 1 : Image de couverture (proportions respectées, effet parallaxe léger ou zoom au survol).
    - Colonne 2 : Métadonnées (Rubrique, #Numéro), Titre H1 massif, Date et Temps de lecture.
- **Mobile (Stacked) :**
    - Image en haut (Plein écran ou large).
    - Texte en dessous sur fond propre (sans superposition).
- **Style :** Minimaliste, typographie de presse haut de gamme, contraste élevé.

### 3.2 Rubriques
- **Mécanismes** : Analyse scientifique et historique des biais.
- **Terrain** : Cas concrets e-commerce (dark patterns).
- **Héritage** : Continuité Guerre froide / numérique.
- **Radar** : Décryptage de l'actualité.

## 4. Identité Visuelle (Charte)
- **Concept** : Tech sombre & intellectuel (Terminal de veille).
- **Couleurs** : Fond noir profond (#07090F), Accent rouge signal (#E8303A).
- **Typographie** : Syne (Titres), IBM Plex Serif (Corps), JetBrains Mono (Labels/Labels).

## 5. SEO & Performance
- **Objectif** : Lighthouse 95+ (Performance, A11Y, SEO).
- **SEO** : JSON-LD (Article), sitemap automatique, meta-tags dynamiques.
