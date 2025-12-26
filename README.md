# Portfolio React - Anthony Merault

Portfolio personnel créé avec React, TypeScript et Vite, présentant une collection de projets de design et développement web.

## 🚀 Fonctionnalités

### Navigation & Pages
- **Navigation complète** entre les pages (Accueil, Menu, À propos, Projets)
- **Design responsive** adapté mobile et desktop
- **Page d'accueil** avec hero section, carousel de projets et cartes d'information
- **Page menu** avec recherche et filtrage en temps réel par catégories
- **Page à propos** avec parcours professionnel, compétences et formations
- **Pages projets individuelles** structurées en sections professionnelles

### Composants & Animations
- **Composants réutilisables** (Button, ProjectItem, HoverCard, etc.)
- **Animations fluides** avec Framer Motion et CSS
- **Barre de recherche** avec placeholder animé et suggestions
- **Search bar mobile** avec dégradé et résultats en grille
- **Effets visuels** (Magic Bento, BlurText, GradientText, ShinyText)
- **Background dynamique** qui change selon la page active
- **Loading states** avec skeletons
- **Modal de projet** avec animation slide-up/down

### Design & UX
- **Typographie** : Polices Space Grotesk, Sora, DM Mono, Inter
- **Couleurs** : Thème sombre avec accents orange
- **Animations** : Transitions fluides et effets de hover
- **Responsive** : Adaptation mobile avec aspect ratio optimisé
- **Accessibilité** : Contraste et navigation au clavier, attributs alt appropriés

## 🛠️ Technologies

- **React 19** avec TypeScript
- **Vite** pour le build et le dev server
- **Tailwind CSS** pour les utilities
- **Framer Motion** pour les animations
- **CSS personnalisé** pour le styling des composants
- **GSAP** pour les animations avancées
- **React Router DOM** pour la navigation
- **Swiper.js** pour les carousels
- **Shadcn/ui** pour les composants UI (file-tree, scroll-area, button)
- **Radix UI** pour les primitives d'accessibilité

## 📱 Pages

1. **Accueil** (`/`) - Page principale avec hero section, titre fixe en bas, carousel de projets et cartes d'information
2. **Menu** (`/menu`) - Liste de tous les projets avec recherche et filtrage par catégories
3. **À propos** (`/about`) - Parcours professionnel, compétences, expériences et formations
4. **Projet** (`/project/:id`) - Page détaillée d'un projet avec 9 sections structurées

## 🎯 Composants Principaux

### Composants de Layout
- `Header` - Navigation avec logo, menu et search bar desktop
- `Background` - Gestion du background image dynamique
- `MobileSearchBar` - Barre de recherche mobile avec dégradé et résultats

### Composants de Pages
- `Hero` - Page d'accueil avec projets récents et cartes d'information
- `Menu` - Grille de projets par catégories avec filtrage
- `About` - Parcours professionnel et formations
- `SingleProjectNew` - Page projet structurée en sections

### Composants UI Réutilisables
- `Button` - Boutons avec variants (primary/secondary) et mode icon
- `ProjectItem` - Carte projet avec détection de couleur automatique
- `HoverCard` - Effet de hover avec suivi de souris
- `MagicBento` - Effet de bordure animée au hover
- `ShinyText` - Animation de texte brillant
- `GradientText` - Texte avec dégradé animé
- `DecryptedText` - Effet de texte décrypté
- `AnimatedContent` - Animations au scroll
- `BlurText` - Effet de blur progressif sur le texte
- `Skeleton` - Loading states
- `ProgressiveBlur` - Effet de blur progressif en bas de page
- `Tree`, `Folder`, `File` - Composants file-tree pour afficher les wireframes

## 📊 Architecture du Projet

### Structure des Données
Toutes les données sont centralisées dans `/src/data/` :
- **`menuCategories.ts`** - Catégories et projets du menu (Navigation, Application, Site web, Logo, Motion, PLV)
- **`aboutData.ts`** - Données de la page À propos (stats, compétences, expériences, formations)
- **`projectsNew.ts`** - Données détaillées des projets avec structure en sections

### Structure de Page Projet
1. **Titre principal** - Avec badges et sous-titre (effet BlurText)
2. **Résumé / Introduction** - Synopsis du projet
3. **Contexte & Problématique** - Besoin client et enjeux
4. **Démarche & Approche** - Recherche UX, veille, tests
5. **Wireframes & Maquettes** - Prototypes et architecture (avec file-tree)
6. **Design System** - Palette colorimétrique et typographie
7. **Implémentation & Technologies** - Stack technique
8. **Impacts & Résultats** - Métriques et retours
9. **Conclusion** - Bilan et pistes d'évolution

## ✨ Fonctionnalités Récentes

### Page d'Accueil
- **Layout 2 colonnes** : Titre principal à gauche (fixe en bas), cartes à droite
- **Titre fixe** : Positionné à 16px du bas de l'écran sur desktop
- **Cartes modernes** : Infos, Projet (carousel), Services
- **Carousel Swiper.js** : Affichage des projets avec pagination
- **Scroll vertical** : Colonne de droite avec scroll indépendant sur desktop
- **Pas de scroll vertical** : Page d'accueil sans scroll sur desktop (sauf mobile)

### Search Bar
- **Affichage sur tous les devices** : Visible sur mobile et desktop
- **Largeur réduite** : 50% de la largeur par défaut sur desktop
- **Largeur complète** : 100% quand active sur desktop
- **Miniatures arrondies** : Thumbnails fully rounded sur desktop
- **Miniatures agrandies** : Résultats plus grands sur desktop

### Single Project
- **Effet BlurText** : Animation de blur progressif sur le titre principal
- **ProgressiveBlur** : Effet de blur en bas de page qui suit le scroll
- **File Tree** : Affichage des wireframes avec composant file-tree
- **Support vidéo** : Affichage de vidéos en couverture (ex: Mp audio)
- **Tableaux scrollables** : Scroll horizontal pour les tableaux de couleurs
- **Sections organisées** : 9 sections professionnelles avec espacement optimisé

## 🧹 Code Propre et Optimisé

### Qualité du Code
- **CSS** : Classes organisées, commentaires utiles uniquement
- **TypeScript** : Types stricts, aucune erreur de compilation
- **JavaScript** : Aucun console.log, imports optimisés
- **Accessibilité** : Attributs alt, éléments interactifs accessibles
- **Performance** : Build optimisé, pas d'erreurs de linting
- **Build** : Toutes les erreurs TypeScript corrigées (variables non utilisées, imports manquants)

### Structure Sémantique
- Balises HTML appropriées (`<header>`, `<section>`, `<footer>`)
- Hiérarchie des titres correcte (`<h1>`, `<h2>`, `<h3>`)
- Éléments interactifs accessibles (`<button>` au lieu de `<div onClick>`)
- Attributs d'accessibilité (`aria-label`, `alt` descriptifs)

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
│   ├── Background.tsx     # Background dynamique
│   ├── Hero.tsx            # Page d'accueil
│   ├── Menu.tsx            # Page menu avec recherche
│   ├── About.tsx           # Page à propos
│   ├── MobileSearchBar.tsx # Search bar mobile
│   ├── SingleProjectNew.tsx # Page projet (sections)
│   ├── ProjectItem.tsx     # Carte projet réutilisable
│   ├── Button.tsx          # Bouton réutilisable
│   ├── ui/                 # Composants UI (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── scroll-area.tsx
│   │   └── file-tree.tsx
│   └── ... (autres composants)
├── data/                   # Données centralisées
│   ├── projectsNew.ts      # Projets (structure sections)
│   ├── menuCategories.ts   # Catégories et projets menu
│   └── aboutData.ts        # Données page À propos
├── lib/                    # Utilitaires
│   └── utils.ts            # Fonction cn() pour Tailwind
├── App.tsx                 # Composant racine
├── main.tsx               # Point d'entrée
└── index.css              # Styles globaux + Tailwind
```

## 🎨 Personnalisation

### Couleurs
- Orange principal : `#FF6B35`
- Texte sombre : `#222`
- Fond sombre : `#0a0a0a`
- Fond accueil : `#509ED8` (bleu ciel)

### Typographie
- Titres : `Space Grotesk`
- Corps : `Inter`
- Monospace : `DM Mono`
- Projets : `Sora`

### Animations
- Durée standard : `0.3s ease`
- Effets de bounce pour les entrées
- Transitions fluides entre les pages

## 📝 Notes de Développement

- **Architecture basée sur les données** : Séparation claire données/logique
- **Composants modulaires** pour faciliter la maintenance
- **Tailwind CSS** utilisé pour les utilities (avec CSS custom pour les composants)
- **Deux roots React** : un pour le background, un pour l'application
- **TypeScript strict** avec `verbatimModuleSyntax` activé
- **Tableaux HTML natifs** pour garantir le scroll horizontal
- **Code propre et optimisé** : Nettoyage complet de tous les fichiers
- **Menu temporairement masqué** : Le menu redirige vers l'accueil (code commenté pour réactivation future)

## 🎯 Fonctionnalités Clés

### Responsive Design
- **Mobile** : Layout vertical, scroll vertical activé
- **Desktop** : Layout 2 colonnes, pas de scroll vertical sur la page d'accueil
- **Tablette** : Adaptation intermédiaire

### Animations
- **BlurText** : Effet de blur progressif sur le texte
- **ProgressiveBlur** : Blur en bas de page qui suit le scroll
- **Framer Motion** : Animations fluides et performantes
- **GSAP** : Animations avancées pour les effets complexes

### Accessibilité
- Navigation au clavier
- Attributs ARIA appropriés
- Contraste de couleurs respecté
- Labels descriptifs

## 🔧 Corrections Récentes (Janvier 2025)

- ✅ Correction de toutes les erreurs TypeScript du build
- ✅ Suppression des imports non utilisés (`Menu`, `swiper/css/navigation`)
- ✅ Nettoyage des variables non utilisées (`searchTerm`, `filteredResults`, `groupIndex`, `handleClose`, `ref`)
- ✅ Code prêt pour le déploiement sur Vercel/GitHub Pages

## 📦 Déploiement

Le projet est prêt pour être déployé sur différentes plateformes. Voir le [Guide de Déploiement](./DEPLOY.md) pour les instructions détaillées.

### Déploiement rapide sur Vercel

1. Aller sur [vercel.com](https://vercel.com) et se connecter avec GitHub
2. Cliquer sur "New Project" et importer `portfolio-react-anthony`
3. Vercel détectera automatiquement les paramètres (Vite, build, etc.)
4. Cliquer sur "Deploy" → C'est fait ! 🎉

Le projet inclut :
- ✅ Fichier `vercel.json` configuré pour le routing SPA
- ✅ Cache optimisé pour les assets
- ✅ Configuration prête pour production

### Autres options
- **Netlify** : Build command `npm run build`, publish directory `dist`
- **GitHub Pages** : Voir le guide pour configurer GitHub Actions

---

*Dernière mise à jour : Janvier 2025 - Code propre et optimisé, prêt pour production*
