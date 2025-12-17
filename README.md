# Portfolio React - Anthony

Portfolio personnel créé avec React, TypeScript et Vite, reprenant le design du portfolio HTML original.

## 🚀 Fonctionnalités

### ✅ Implémentées
- **Navigation complète** entre les pages (Accueil, Menu, À propos, Projets)
- **Design responsive** adapté mobile et desktop
- **Page d'accueil** avec design Figma moderne et carousel Swiper.js
- **Page menu** avec recherche et filtrage en temps réel
- **Page à propos** avec parcours et compétences (données centralisées)
- **Pages projets individuelles** restructurées en 9 sections professionnelles
- **Composants réutilisables** (Button, ProjectItem, etc.)
- **Animations** avec Framer Motion et CSS
- **Barre de recherche** avec placeholder animé et suggestions
- **Search bar mobile** avec dégradé noir et résultats en grille
- **Effets visuels** (Magic Bento, HoverCard, etc.)
- **Background dynamique** qui change selon la page active
- **Loading states** avec skeletons
- **Modal de projet** avec animation slide-up/down
- **Tableaux scrollables** horizontalement (HTML natif)
- **Données centralisées** dans `/src/data/`
- **Carousel Swiper.js** : Carousel fonctionnel avec pagination sur la page d'accueil
- **Design Figma** : Layout 2 colonnes avec cartes modernes
- **Code propre et optimisé** : Nettoyage complet CSS, HTML, JS et assets

### 🎨 Design & UX
- **Typographie** : Police Sora pour les titres de projets
- **Couleurs** : Thème sombre avec accents orange
- **Animations** : Transitions fluides et effets de hover
- **Responsive** : Adaptation mobile avec aspect ratio 9:16
- **Accessibilité** : Contraste et navigation au clavier, attributs alt appropriés

## 🛠️ Technologies

- **React 19** avec TypeScript
- **Vite** pour le build et le dev server
- **Tailwind CSS** pour les utilities
- **Framer Motion** pour les animations
- **CSS personnalisé** pour le styling des composants
- **GSAP** pour les animations avancées
- **React Router DOM** pour la navigation
- **React Swipeable** pour les gestes tactiles
- **Swiper.js** pour les carousels

## 📱 Pages

1. **Accueil** (`/`) - Page principale avec hero section et stats
2. **Menu** (`/menu`) - Liste de tous les projets avec recherche
3. **À propos** (`/about`) - Parcours professionnel et compétences
4. **Projet** (`/project/:id`) - Page détaillée d'un projet

## 🎯 Composants Principaux

### Composants de Layout
- `Header` - Navigation avec logo, menu et search bar desktop
- `Background` - Gestion du background image dynamique
- `MobileSearchBar` - Barre de recherche mobile avec dégradé et résultats

### Composants de Pages
- `Hero` - Page d'accueil avec projets récents
- `Menu` - Grille de projets par catégories avec filtrage
- `About` - Parcours professionnel et formations
- `SingleProjectNew` - Page projet structurée en 9 sections

### Composants UI Réutilisables
- `Button` - Boutons avec variants (primary/secondary) et mode icon
- `ProjectItem` - Carte projet avec détection de couleur automatique
- `HoverCard` - Effet de hover avec suivi de souris
- `MagicBento` - Effet de bordure animée au hover
- `ShinyText` - Animation de texte brillant
- `GradientText` - Texte avec dégradé animé
- `DecryptedText` - Effet de texte décrypté
- `AnimatedContent` - Animations au scroll
- `BlurText` - Effet de blur progressif
- `Skeleton` - Loading states

## 📊 Architecture du Projet

### Structure des Données
Toutes les données sont centralisées dans `/src/data/` :
- **`menuCategories.ts`** - Catégories et projets du menu (Navigation, Application, Site web, Logo, Motion, PLV)
- **`aboutData.ts`** - Données de la page À propos (stats, compétences, expériences, formations)
- **`projectsNew.ts`** - Données détaillées des projets avec structure en 9 sections

### Structure de Page Projet (9 Sections)
1. **Titre principal** - Avec badges et sous-titre
2. **Résumé / Introduction** - Synopsis du projet
3. **Contexte & Problématique** - Besoin client et enjeux
4. **Démarche & Approche** - Recherche UX, veille, tests
5. **Wireframes & Maquettes** - Prototypes et architecture
6. **Design System** - Palette colorimétrique et typographie
7. **Implémentation & Technologies** - Stack technique
8. **Impacts & Résultats** - Métriques et retours
9. **Conclusion** - Bilan et pistes d'évolution

## ✨ Fonctionnalités Récentes

### Design Figma - Page d'Accueil
- **Layout 2 colonnes** : Titre principal à gauche, cartes à droite
- **Cartes modernes** : Infos, Projet (carousel), Services avec design cohérent
- **Carousel Swiper.js** : Affichage des 4 premiers projets avec pagination fonctionnelle
- **Icônes SVG** : Remplacées par des SVG natifs pour de meilleures performances
- **Responsive design** : Adaptation mobile avec colonnes empilées
- **Code nettoyé** : Suppression des imports inutiles, conservation de Swiper.js

### Section Composants Pedaboard
- **Structure organisée** : Boutons groupés par type dans des colonnes
- **Layout flex-wrap** : Conteneur principal avec `flex-wrap` pour l'organisation
- **Groupes de boutons** : Search, Dashboard, Client, Filter, Expand, Pen, Bell, Contact, Formation, Boutique, Laboratoire
- **Centrage parfait** : Tous les SVG correctement centrés dans leurs boutons arrondis
- **Design cohérent** : Boutons blancs et orange avec icônes appropriées

### Modal de Projet avec Animation
- Ouverture : animation slide-up depuis le bas
- Position : fixe à 112px du haut avec page précédente visible en arrière
- Fermeture : animation slide-down fluide
- Bouton fermeture : icône croix circulaire avec hover

### Search Bar Mobile Améliorée
- Dégradé noir → transparent en arrière-plan
- Résultats en grille 3 colonnes sous le champ de recherche
- Style de champ texte distinct quand résultats affichés
- Placeholder et icône parfaitement alignés

### Tableaux Scrollables
- Conversion des divs flexbox en tableaux HTML natifs
- Scroll horizontal fonctionnel sur mobile
- Scrollbar personnalisée
- Min-width pour forcer le scroll

## 🧹 Nettoyage et Optimisation

### ✅ Code Propre et Optimisé
- **CSS** : Classes inutilisées supprimées, nomenclature cohérente
- **HTML** : Attributs alt appropriés, structure sémantique correcte
- **JavaScript** : Console.log supprimés, imports nettoyés
- **Assets** : Fichiers inutilisés supprimés
- **Accessibilité** : Éléments interactifs accessibles, labels appropriés
- **Performance** : Aucune erreur de linting, build optimisé

### ✅ Structure Sémantique
- Balises HTML appropriées (`<header>`, `<section>`, `<footer>`)
- Hiérarchie des titres correcte (`<h1>`, `<h2>`, `<h3>`)
- Éléments interactifs accessibles (`<button>` au lieu de `<div onClick>`)
- Attributs d'accessibilité (`aria-label`, `alt` descriptifs)

## ❌ Problèmes en Cours

### 🔧 Problèmes Mineurs
- Accès réseau mobile à vérifier (adresse IP 192.0.0.2)
- Quelques animations peuvent être saccadées sur mobile
- Certains effets de hover non optimisés pour le tactile

### ✅ Problèmes Résolus
- **Swiper.js** : Réinstallation et déclarations TypeScript ajoutées
- **Code nettoyé** : Suppression des imports inutiles (Button, useState, EffectCards, img, imgVector)
- **Structure JSX** : Correction des erreurs de compilation
- **Déclarations TypeScript** : Fichier `src/types/swiper.d.ts` créé pour les modules CSS Swiper
- **Nettoyage complet** : CSS, HTML, JS et assets optimisés

## 🚀 Installation et Lancement

```bash
# Installation des dépendances
npm install

# Lancement en développement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview
```

## 📂 Structure du Projet

```
src/
├── components/              # Composants React
│   ├── Header.tsx          # Navigation principale
│   ├── Background.tsx      # Background dynamique
│   ├── Hero.tsx            # Page d'accueil
│   ├── Menu.tsx            # Page menu avec recherche
│   ├── About.tsx           # Page à propos
│   ├── MobileSearchBar.tsx # Search bar mobile
│   ├── SingleProjectNew.tsx # Page projet (9 sections)
│   ├── ProjectItem.tsx     # Carte projet réutilisable
│   ├── Button.tsx          # Bouton réutilisable
│   ├── HoverCard.tsx       # Effet hover
│   ├── MagicBento.tsx      # Bordure animée
│   └── ... (composants UI)
├── data/                   # Données centralisées
│   ├── projectsNew.ts      # Projets (structure 9 sections)
│   ├── menuCategories.ts   # Catégories et projets menu
│   └── aboutData.ts        # Données page À propos
├── App.tsx                 # Composant racine
├── main.tsx               # Point d'entrée (2 roots)
└── index.css              # Styles globaux + Tailwind
```

## 🎨 Personnalisation

### Couleurs
- Orange principal : `#FF6B35`
- Texte sombre : `#222`
- Fond sombre : `#0a0a0a`

### Typographie
- Titres projets : `font-family: Sora`
- Taille standard : `14px` avec `letter-spacing: 1.82px`

### Animations
- Durée standard : `0.3s ease`
- Effets de bounce pour les entrées
- Transitions fluides entre les pages

## 📝 Notes de Développement

- Le projet a été migré depuis un portfolio HTML/CSS/JS original
- Respect du design original avec adaptations React modernes
- **Architecture basée sur les données** : Séparation claire données/logique
- **Composants modulaires** pour faciliter la maintenance
- **Tailwind CSS** utilisé pour les utilities (avec CSS custom pour les composants)
- **Deux roots React** : un pour le background, un pour l'application
- **TypeScript strict** avec `verbatimModuleSyntax` activé
- **Tableaux HTML natifs** pour garantir le scroll horizontal
- **Code propre et optimisé** : Nettoyage complet de tous les fichiers

## 🎯 Session de Travail - Octobre 2025

### ✅ Accomplissements
1. ✅ Centralisation de toutes les données (menu, about, projets)
2. ✅ Restructuration des pages projets en 9 sections professionnelles
3. ✅ Correction du scroll horizontal des tableaux
4. ✅ Amélioration de la search bar mobile (alignement, dégradé, résultats)
5. ✅ Implémentation du modal de projet avec animations
6. ✅ Optimisation du centrage vertical mobile
7. ✅ Nettoyage du code et suppression des duplications
8. ✅ **Section Composants Pedaboard** : Structure organisée avec boutons groupés par type
9. ✅ **Centrage des SVG** : Correction du positionnement des icônes dans les boutons arrondis
10. ✅ **Design Figma** : Implémentation du nouveau design de la page d'accueil
11. ✅ **Swiper.js** : Carousel fonctionnel avec pagination sur la page d'accueil
12. ✅ **Code nettoyé** : Suppression des imports inutiles, conservation de Swiper.js
13. ✅ **Déclarations TypeScript** : Résolution des erreurs de modules CSS Swiper
14. ✅ **Nettoyage complet** : CSS, HTML, JS et assets optimisés pour la production
15. ✅ **Accessibilité améliorée** : Attributs alt, éléments interactifs accessibles
16. ✅ **Structure sémantique** : HTML propre avec balises appropriées

### 🔮 Améliorations Futures

1. Créer le composant visuel pour User Flow / Wireframes
2. Compléter les données de tous les projets
3. Ajouter des images de wireframes réelles
4. Optimiser les performances sur mobile
5. Tester l'accès réseau mobile
6. Ajouter des tests unitaires
7. Optimiser le SEO

---

*Dernière mise à jour : Octobre 2025 - Code propre et optimisé*