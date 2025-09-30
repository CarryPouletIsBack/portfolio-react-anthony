# Portfolio React - Anthony

Portfolio personnel créé avec React, TypeScript et Vite, reprenant le design du portfolio HTML original.

## 🚀 Fonctionnalités

### ✅ Implémentées
- **Navigation complète** entre les pages (Accueil, Menu, À propos, Projets)
- **Design responsive** adapté mobile et desktop
- **Page d'accueil** avec statistiques animées et projets récents
- **Page menu** avec recherche et filtrage en temps réel
- **Page à propos** avec parcours et compétences
- **Pages projets individuelles** avec détails complets
- **Composants réutilisables** (Button, ProjectItem, etc.)
- **Animations** avec Framer Motion et CSS
- **Barre de recherche** avec placeholder animé (ShinyText)
- **Effets visuels** (Magic Bento, HoverCard, etc.)
- **Charts interactifs** avec données fictives
- **Loading states** avec skeletons

### 🎨 Design & UX
- **Typographie** : Police Sora pour les titres de projets
- **Couleurs** : Thème sombre avec accents orange
- **Animations** : Transitions fluides et effets de hover
- **Responsive** : Adaptation mobile avec aspect ratio 9:16
- **Accessibilité** : Contraste et navigation au clavier

## 🛠️ Technologies

- **React 18** avec TypeScript
- **Vite** pour le build et le dev server
- **Framer Motion** pour les animations
- **CSS Modules** pour le styling
- **Recharts** pour les graphiques
- **React Router** pour la navigation

## 📱 Pages

1. **Accueil** (`/`) - Page principale avec hero section et stats
2. **Menu** (`/menu`) - Liste de tous les projets avec recherche
3. **À propos** (`/about`) - Parcours professionnel et compétences
4. **Projet** (`/project/:id`) - Page détaillée d'un projet

## 🎯 Composants Principaux

- `Header` - Navigation avec logo et menu
- `Hero` - Section hero de la page d'accueil
- `ProjectItem` - Composant réutilisable pour les projets
- `Button` - Boutons avec variants primary/secondary
- `MobileSearchBar` - Barre de recherche mobile
- `ShinyText` - Animation de placeholder
- `ProjectCharts` - Graphiques de statistiques
- `HoverCard` - Effet de hover avec suivi de souris

## ❌ Problèmes Non Résolus

### 🚨 Problème Critique - Safari Mobile
**Description** : Bande blanche persistante en haut de l'écran sur iPhone Safari
- L'image de fond couvre le bas mais pas le haut
- Problème spécifique à Safari mobile iOS
- Tentatives de correction non fructueuses

**Solutions tentées** :
- Meta viewport avec `viewport-fit=cover`
- CSS avec `100dvh` et `100svh`
- Safe area insets avec `env(safe-area-inset-*)`
- Positionnement `fixed` vs `absolute`
- Suppression des contraintes de hauteur
- Gestion des `overflow` et `margin`

**Impact** : Expérience utilisateur dégradée sur iOS Safari

### 🔧 Autres Problèmes Mineurs
- Quelques animations peuvent être saccadées sur mobile
- Performance des charts sur les appareils moins puissants
- Certains effets de hover non optimisés pour le tactile

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
├── components/          # Composants React
│   ├── Header.tsx      # Navigation principale
│   ├── Hero.tsx        # Section hero
│   ├── Menu.tsx        # Page menu avec recherche
│   ├── About.tsx       # Page à propos
│   ├── SingleProject.tsx # Page projet individuel
│   └── ...
├── App.tsx             # Composant racine avec routing
├── main.tsx           # Point d'entrée
└── index.css          # Styles globaux
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
- Respect strict du design original avec adaptations React
- Composants modulaires pour faciliter la maintenance
- CSS séparé pour maintenir la modularité (selon préférences utilisateur)
- Pas d'utilisation de Tailwind CSS (supprimé à la demande)

## 🔮 Améliorations Futures

1. **Résoudre le problème Safari mobile** (priorité haute)
2. Optimiser les performances sur mobile
3. Ajouter plus d'animations micro-interactions
4. Implémenter un système de thème
5. Ajouter des tests unitaires
6. Optimiser le SEO

---

*Dernière mise à jour : Octobre 2024*