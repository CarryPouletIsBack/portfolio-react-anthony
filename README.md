# Portfolio React - Anthony Merault

Portfolio personnel créé avec React, TypeScript et Vite, présentant une collection de projets de design et développement web.

## 🚀 Fonctionnalités

### Navigation & Pages
- **URLs avec langue** : préfixe `/fr` ou `/en` pour toutes les pages (ex. `/fr`, `/en/about`, `/fr/kaldera`)
- **Redirection** : `/` redirige vers `/fr` ou `/en` selon la langue
- **Navigation** entre Accueil, À propos, Projets, Dashboard
- **Design responsive** adapté mobile et desktop
- **Page d'accueil** avec hero section, carousel de projets et cartes d'information
- **Page à propos** avec intégration Strava (profil, activités, performance, entraînement)
- **Pages projets** (Playdago, Pedaboard, Kaldera) en sections professionnelles ; **Kaldera** : lien « Voir le projet » vers [trackali.com](https://trackali.com) (nouvel onglet)
- **Page 404** : message, liens vers les 3 projets, réseaux sociaux, bouton « Retour à l'accueil »
- **Dashboard** avec gestion de projets et statistiques Google Analytics
- **Page de connexion** pour accéder au dashboard

### Intégration Strava
- **Données Strava en temps réel** : Profil athlète, activités, statistiques
- **Architecture sécurisée** : Appels API via endpoints Vercel (tokens gérés côté serveur)
- **Cache intelligent** : Système de cache localStorage (5 minutes) pour limiter les appels API
- **Graphiques de performance** : Graphique radar et journal d'entraînement (arrêt à la dernière activité)
- **Header dynamique** : Nom et prénom récupérés depuis Strava API avec skeleton de chargement
- **Photo de profil** : Photo de profil Strava affichée dans le header au lieu du logo (fallback logo SVG)
- **Limitation des appels API** : Réduction automatique des requêtes grâce au cache
- **Gestion des tokens** : Refresh automatique des tokens côté serveur via Vercel Functions
- **Affichage prioritaire des photos** : Les photos d'activités sont affichées en priorité, les tracés GPS ne s'affichent que s'il n'y a pas de photo disponible

### Composants & Animations
- **Composants réutilisables** (Button, ProjectItem, HoverCard, etc.)
- **Animations fluides** avec Framer Motion et CSS
- **Barre de recherche** avec placeholder animé et suggestions
- **Search bar mobile** avec dégradé et résultats en grille
- **Effets visuels** (Magic Bento, Scroll Stack, Card Swap, BlurText, GradientText, ShinyText)
- **Background dynamique** qui change selon la page active
- **Loading states** avec skeletons
- **Modal de projet** avec animation slide-up/down

### Design & UX
- **Typographie** : Space Grotesk (titres), Inter (corps de texte), Sora, DM Mono, JetBrains Mono
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
- **Navigation SPA** avec `history.pushState` / `popstate` (pas de React Router)
- **Swiper.js** pour les carousels
- **Highcharts** pour les graphiques avancés (DonutChartRace, StravaSonifiedChart, StravaSplineChart, StravaRadialBarChart)
- **Shadcn/ui** pour les composants UI (file-tree, scroll-area, button)
- **Radix UI** pour les primitives d'accessibilité
- **React Three Fiber** pour le rendu 3D
- **Three.js** pour la manipulation de modèles 3D et nuages de points
- **Strava API** pour l'intégration des données sportives
- **Recharts** pour les graphiques de performance Strava
- **MUI X Charts** pour les visualisations de données
- **Vercel API Routes** pour les endpoints serveur (optionnel)
- **Google Analytics Data API** pour les statistiques du site
- **Lucide React** pour les icônes

## 📱 Pages

Les URLs incluent le préfixe de langue `/fr` ou `/en`.

| Page        | URL (ex. FR)     | Description |
|------------|------------------|-------------|
| Accueil    | `/fr`, `/en`     | Hero, carousel de projets, cartes d'information |
| À propos   | `/fr/about`, `/en/about` | Parcours, compétences, Strava, formations |
| Playdago   | `/fr/playdago`, `/en/playdago` | Page projet détaillée |
| Pedaboard  | `/fr/pedaboard`, `/en/pedaboard` | Page projet détaillée |
| Kaldera    | `/fr/kaldera`, `/en/kaldera` | Page projet + lien [trackali.com](https://trackali.com) (nouvel onglet) |
| 404        | toute URL inconnue | Message d'erreur, 3 projets, réseaux, retour accueil |
| Dashboard  | `/fr/dashboard`, `/en/dashboard` | Interface admin (authentification requise) |
| Login      | (via dashboard)  | Connexion pour accéder au dashboard |

## 🎯 Composants Principaux

### Composants de Layout
- `Header` - Navigation avec photo de profil Strava dynamique, nom/prénom depuis Strava API, menu et search bar desktop
- `Background` - Gestion du background image dynamique
- `MobileSearchBar` - Barre de recherche mobile avec dégradé, résultats en grille carrée et overlay

### Composants de Pages
- `Hero` - Page d'accueil avec projets récents et cartes d'information
- `About` - Parcours professionnel et formations
- `AboutNew` - Page à propos avec navigation par sections et modèle 3D
- `SingleProjectNew` - Page projet structurée en sections (avec lien externe si `projectUrl` défini, ex. Kaldera)
- `ErrorPage` - Page 404 : message, projets Playdago/Pedaboard/Kaldera, réseaux sociaux, bouton retour accueil

### Composants UI Réutilisables
- `Button` - Boutons avec variants (primary/secondary) et mode icon
- `ProjectItem` - Carte projet avec détection de couleur automatique
- `HoverCard` - Effet de hover avec suivi de souris
- `MagicBento` - Grille type bento (React Bits) : tuiles image / contenu, animations optionnelles ; mode « shell » pour wrapper la barre de recherche sans tuiles
- `ScrollStack` / `ScrollStackItem` - Pile de cartes liée au scroll (React Bits adapté) : scroll natif, cache de layout, lissage RAF, centrage vertical optionnel (`centerStackVertically`), racine scroll custom (`scrollRootRef`, ex. `.single-project-page`)
- `CardSwap` - Carousel de cartes 3D (React Bits)
- `PlaydagoH1HandwritingLogo` - Logo manuscrit Playdago au-dessus de la section mode clair
- `PlaydagoDesignSystemTables` - Tableaux palette / typéchelle (mode bento pour la grille design system)
- `ShinyText` - Animation de texte brillant
- `GradientText` - Texte avec dégradé animé
- `DecryptedText` - Effet de texte décrypté
- `AnimatedContent` - Animations au scroll
- `BlurText` - Effet de blur progressif sur le texte
- `Skeleton` - Loading states
- `ProgressiveBlur` - Effet de blur progressif en bas de page
- `Tree`, `Folder`, `File` - Composants file-tree pour afficher les wireframes
- `HumanBody3D` - Modèle 3D en nuage de points avec React Three Fiber

## 📊 Architecture du Projet

### Structure des Données
- **`/src/data/`** : `menuCategories.ts`, `aboutData.ts`, `projectsNew.ts` (projets avec sections ; option `projectUrl` pour lien externe, ex. Kaldera → trackali.com)
- **`/content/pages/`** : Fichiers texte de description par page (`accueil.txt`, `about.txt`, `playdago.txt`, `pedaboard.txt`, `kaldera.txt`, `404.txt`, `dashboard.txt`) pour doc / SEO

### Structure de Page Projet
1. **Titre principal** - Avec badges et sous-titre (effet BlurText)
2. **Sommaire** - Navigation horizontale scrollable, fixe en haut lors du scroll
3. **Résumé / Introduction** - Synopsis du projet
4. **L'équipe projet** - Présentation des membres de l'équipe (carousel)
5. **Contexte & Démarche** - Besoin client, enjeux, recherche UX, veille, tests
6. **Processus détaillé** - Case study avec processus de design détaillé (recherche, veille, idéation, tests)
7. **Idéation & Solutions testées** - Prototypes et architecture (avec file-tree)
8. **Design System** - Palette colorimétrique et typographie (tableau typographie masqué)
9. **Implémentation & Technologies** - Stack technique
10. **Résultats & Impact** - Métriques avec Donut Chart Race animés et retours

## ✨ Fonctionnalités Récentes

### Single Project — Playdago (avril 2026, branche `single-project-playdago`)
- **Design system (section Architecture)** : grille **Magic Bento** (captures Figma, tableaux palette / typéchelle intégrés dans des tuiles).
- **Card Swap** : trois vues (dashboard, personnalisation du dé, distribution des cartes).
- **Mode clair** : **Scroll Stack** sur les captures pleine largeur — défilement via le conteneur `.single-project-page`, pas `window` ; animation adoucie (easing, lerp) ; dépilement progressif après la phase « pin » pour éviter un chevauchement prolongé.
- **Section « Phase d’intégration »** : retirée de la page projet.
- **Mes autres projets** : carrousel Swiper (overflow, `centeredSlidesBounds`, largeurs arrondies) pour limiter les chevauchements.
- **Fichiers principaux** : `ScrollStack.tsx`, `ScrollStack.css`, `CardSwap.tsx`, `MagicBento.tsx`, `PlaydagoH1HandwritingLogo.tsx`, `PlaydagoDesignSystemTables.tsx`, `SingleProjectNew.tsx`, `SingleProject.css`.

### URLs, 404 & Projets (Février 2025)
- **Langue dans l’URL** : toutes les routes utilisent le préfixe `/fr` ou `/en` ; la racine `/` redirige vers `/fr` ou `/en` ; synchronisation URL ↔ changement de langue.
- **Page 404** : affichage pour toute URL inconnue ; message traduit, 3 projets (Playdago, Pedaboard, Kaldera), icônes réseaux sociaux, bouton « Retour à l’accueil ».
- **Lien projet Kaldera** : sur la page projet Kaldera, lien « Voir le projet » vers https://trackali.com (ouverture en nouvel onglet) ; champ optionnel `projectUrl` dans `projectsNew.ts`.
- **Descriptions par page** : dans `content/pages/`, un fichier `.txt` par page (accueil, about, playdago, pedaboard, kaldera, 404, dashboard) avec titre et description.

### Page AboutNew
- **Navigation par sections** : Menu de navigation avec 3 sections (Introduction, Description, Arbre de compétences)
- **Modèle 3D en nuage de points** : Affichage d'un modèle 3D humain converti en nuage de points dans la section Introduction
- **Layout 3 colonnes** : Structure en 3 colonnes avec le modèle 3D centré dans la colonne du milieu
  - **Desktop** : Grid layout avec `grid-template-columns: 1fr auto 1fr` (colonnes gauche/droite flexibles, centre auto)
  - **Tablette/Mobile (≤1024px)** : Passage en layout vertical avec ordre : Colonne gauche → Modèle 3D → Colonne droite
  - **Gestion de largeur** : Les colonnes s'adaptent automatiquement avec `width: 100%` et `box-sizing: border-box`
  - **Cartes Strava** : Largeur adaptative avec surcharge de la largeur fixe (508px → 100%)
- **Navigation fluide** : Scroll automatique vers les sections avec état actif des boutons
- **Responsive** : Adaptation mobile avec ajustements de positionnement du modèle 3D
- **OrbitControls** : Rotation automatique et contrôles interactifs du modèle 3D
- **Chargement OBJ** : Support des modèles 3D au format OBJ avec conversion en nuage de points
- **Intégration Strava** : 4 cartes affichant les données Strava en temps réel :
  - **Profil** : Informations personnelles de l'athlète (nom, ville, poids)
  - **Performance** : Graphique radar avec total kilométrique 2025
  - **Entraînement** : Journal d'entraînement avec graphique d'évolution
  - **Activités** : Liste des 5 dernières activités avec détails (carousel Swiper)
- **Système de cache** : Cache localStorage de 5 minutes pour limiter les appels API Strava

### Page d'Accueil
- **Layout 2 colonnes** : Titre principal à gauche (fixe en bas), cartes à droite
- **Titre fixe** : Positionné à 16px du bas de l'écran sur desktop
- **Cartes modernes** : Infos, Projet (carousel), Services
- **Carousel Swiper.js** : Affichage des projets avec pagination
- **Scroll vertical** : Colonne de droite avec scroll indépendant sur desktop
- **Pas de scroll vertical** : Page d'accueil sans scroll sur desktop (sauf mobile)

### Search Bar (mobile & desktop)
- **Affichage** : Visible sur mobile et desktop ; largeur 50% par défaut, 100% quand active sur desktop
- **Placeholder animé** : Un seul élément avec transition CSS (fondu sortant → changement de texte → fondu entrant), sans Framer sur le placeholder pour éviter le clignotement sur mobile
- **Fermeture** : Clic en dehors de la search bar pour fermer (détection via ref + mousedown/touchstart)
- **Mobile** : Pas de zoom au focus de l’input (font-size 16px sur mobile), overlay flouté en arrière-plan quand active
- **Fond actif** : Overlay noir à 20% (rgba(0,0,0,0.20)) sur la search bar active, même couleur sur tous les devices
- **Blur** : Backdrop-filter blur(40px) quand active ; z-index 10000 pour passer devant les autres éléments
- **Résultats** : Miniatures carrées (border-radius 12px), grille par catégories, arrondi 24px en bas

### Single Project
- **Image de couverture carousel** : Carousel d'images/vidéos au-dessus de la page avec dots de pagination ronds
- **Position dynamique** : Page SingleProject positionnée à 50% de la hauteur de l'écran (48vh + 100px)
- **Scroll interactif** : La page remonte progressivement jusqu'en haut lors du scroll (de 48vh + 100px à 0)
- **Swipe synchronisé** : L'image de couverture descend en même temps que la page lors du swipe down
- **Overlay dégradé** : Overlay transparent en haut qui devient progressivement opaque vers le bas (#FFF8F5 à 66%)
- **Effet BlurText** : Animation de blur progressif sur le titre principal
- **Sommaire masqué** : Le sommaire est maintenant masqué (peut être réactivé si nécessaire)
- **ProgressiveBlur** : Effet de blur en bas de page qui suit le scroll
- **File Tree** : Affichage des wireframes avec composant file-tree
- **Support vidéo** : Affichage de vidéos en couverture (ex: Mp audio)
- **Tableaux scrollables** : Scroll horizontal pour les tableaux de couleurs
- **Responsive mobile** : Paragraphes en pleine largeur avec text-align: left sur mobile
- **Sections organisées** : Sections professionnelles avec espacement optimisé
- **Carousel équipe** : Présentation des membres de l'équipe avec Swiper.js
- **Barre de swipe améliorée** : Padding augmenté (24px top, 16px bottom) et handle plus épais (6px)
- **Section "Processus détaillé"** : Nouvelle section avec contenu structuré pour les projets (Case Study)
- **Section "Idéation & Solutions testées"** : Remplacement de "Wireframes & Maquettes" par ce nouveau titre
- **Donut Chart Race** : Graphiques en donut animés dans la section "Résultats & Impact" avec effet "race" séquentiel
- **Padding-bottom** : Ajout d'un padding-bottom de 160px sur desktop (64px sur mobile) pour améliorer l'espacement
- **Masquage tableau typographie** : Tableau des typographies masqué, seul l'alphabet reste visible
- **Alignement Figma (fév. 2025)** : Main container avec padding 48px/80px et gap 80px ; section « Mes autres projets » en carousel (cartes 1118×858px, overlay titre/date/badges) ; tableaux sémantiques Palette Pedaboard (7 lignes), Typescale (5 colonnes, 7 rôles), Équipe projet (Rôle / Nom Prénom) ; section Conception & Itération en deux panneaux (wireframe + maquette) ; pagination des carousels sous les images
- **Matrice de positionnement** : Graphique scatter Highcharts (composant `PositionnementMatrixChart`) en section Problématique/Solution — axes croisés à 0, style épuré, données dans `projectsNew.ts` (`positionnementMatrix`)
- **User Flow** : Organigramme Highcharts (composant `UserFlowChart`) en section Architecture & Flux — chart organization inversé, nœuds et liens dans `projectsNew.ts` (`userFlow`)
- **Tableau Typescale** : Scroll horizontal avec largeur minimale 860px pour éviter les retours à la ligne sur Inter SemiBold
- **Espacement fluide** : Variables CSS `--sp-padding-x-fluid`, `--sp-gap-fluid`, `--sp-padding-y-fluid` (clamp) pour adaptation au redimensionnement
- **Polices locales** : JetBrains Mono et Space Grotesk chargées depuis `public/fonts/` (voir `src/index.css`)

## 🧹 Code Propre et Optimisé

### Qualité du Code
- **CSS** : Classes organisées, commentaires utiles uniquement
- **TypeScript** : Types stricts, aucune erreur de compilation
- **JavaScript** : Aucun console.log de debug, imports optimisés (pas d'imports React inutiles)
- **React** : Utilisation des types React modernes (`FC`, `MouseEvent`, etc.) sans imports React inutiles (React 17+)
- **Accessibilité** : Attributs alt, éléments interactifs accessibles
- **Performance** : Build optimisé, pas d'erreurs de linting
- **Build** : Toutes les erreurs TypeScript corrigées, build Vercel fonctionnel
- **Code propre** : Nettoyage complet effectué (janvier 2025) - imports inutiles supprimés, variables non utilisées nettoyées, console.log de debug supprimés

### Structure Sémantique
- Balises HTML appropriées (`<header>`, `<section>`, `<footer>`)
- Hiérarchie des titres correcte (`<h1>`, `<h2>`, `<h3>`)
- Éléments interactifs accessibles (`<button>` au lieu de `<div onClick>`)
- Attributs d'accessibilité (`aria-label`, `alt` descriptifs)

## 🌐 SEO & Indexation (FR / EN)

- **Indexer les deux langues** : Les pages `/fr` et `/en` (et toutes les variantes : `/fr/about`, `/en/playdago`, etc.) sont faites pour être indexées. Cela permet d’être trouvé par les recruteurs en France (recherche en français) et à l’international (recherche en anglais, ex. Linear).
- **Balises hreflang** : Pour chaque page, le head contient dynamiquement trois liens `rel="alternate"` : `hreflang="fr"`, `hreflang="en"`, et `hreflang="x-default"` (pointe vers la version EN). Google utilise ces balises pour associer les versions FR et EN et éviter le duplicate content. **x-default = anglais** : si la langue de l’utilisateur est inconnue (ou US/UK, etc.), Google affiche la version EN par défaut.
- **URL de base pour le SEO** : En production, définir `VITE_SITE_URL=https://anthony-merault.fr` (ou ton domaine) dans les variables d’environnement Vercel. Sans cette variable, le script utilise `window.location.origin` (correct en prod si le site est servi sur le bon domaine).
- **Titre et méta** : Le titre du document (`document.title`) est mis à jour à chaque changement de page. La méta description par défaut (dans `index.html`) est en anglais pour la racine.
- **Canonical** : Chaque page reçoit dynamiquement un `<link rel="canonical">` vers son URL propre (évite le duplicate content avec paramètres UTM, etc.).
- **Checklist complète** : Voir [SEO_INDEXATION.md](./SEO_INDEXATION.md) pour le récapitulatif (déjà en place, à faire manuellement, optionnel).

## 🚀 Installation et Lancement

```bash
# Installation des dépendances
npm install

# Configuration des variables d'environnement
# Créez un fichier .env.local à la racine :

# Strava API (pour le développement local avec Vercel CLI)
STRAVA_CLIENT_ID=votre_client_id
STRAVA_CLIENT_SECRET=votre_client_secret
STRAVA_ACCESS_TOKEN=votre_access_token
STRAVA_REFRESH_TOKEN=votre_refresh_token
STRAVA_TOKEN_EXPIRES_AT=timestamp_unix_expiration

# Google Analytics OAuth2 (pour le dashboard)
# ⚠️ IMPORTANT : Le préfixe VITE_ est uniquement pour le développement local (côté client)
VITE_GOOGLE_CLIENT_ID=votre_google_client_id
VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/api/google-auth/callback

# Google Analytics Tracking (react-ga4)
# ⚠️ IMPORTANT : Pour react-ga4 (côté client), on DOIT utiliser VITE_ même dans Vercel
VITE_GA_MEASUREMENT_ID=G-MS120551E9

# SEO : URL canonique du site (pour les balises hreflang en production)
# Ex. VITE_SITE_URL=https://anthony-merault.fr
# VITE_SITE_URL=https://ton-domaine.fr

# Dashboard (pour l'authentification)
DASHBOARD_PASSWORD=votre_mot_de_passe

# Mode Mock Strava (pour développement local sans API routes)
VITE_USE_STRAVA_MOCK=true

# Lancement en développement
# Option 1: Avec Vercel CLI (pour tester les API routes) - RECOMMANDÉ
vercel dev

# Option 2: Avec Vite uniquement (frontend seulement) - Utilise les mocks automatiquement
npm run dev

# Build de production
npm run build

# Prévisualisation du build
npm run preview
```

## 🔧 Développement Local - Guide Complet

### ⚠️ IMPORTANT : Différence entre `npm run dev` et `vercel dev`

**`npm run dev`** (Vite uniquement) :
- ✅ Lance uniquement le frontend React
- ❌ Les routes `/api/*` ne fonctionnent PAS (erreur 500)
- ✅ Utilise automatiquement les **données mockées** si `VITE_USE_STRAVA_MOCK=true` ou si vous êtes sur `localhost`
- ✅ Parfait pour travailler sur le design CSS sans avoir besoin des vraies données

**`vercel dev`** (Vercel CLI) :
- ✅ Lance le frontend ET les API routes Vercel
- ✅ Les routes `/api/strava/*` fonctionnent correctement
- ✅ Télécharge automatiquement les variables d'environnement depuis Vercel
- ✅ Comportement identique à la production
- ⚠️ Nécessite Vercel CLI installé : `npm install -g vercel`

### Configuration pour le Développement Local

#### Option 1 : Utiliser les Mocks (Recommandé pour le design)

Créez un fichier `.env.local` à la racine avec :

```env
VITE_USE_STRAVA_MOCK=true
```

Puis lancez :
```bash
npm run dev
```

Les données mockées seront utilisées automatiquement. **Aucune API route nécessaire !**

#### Option 2 : Utiliser les Vraies API Routes

1. Installez Vercel CLI :
```bash
npm install -g vercel
```

2. Connectez-vous :
```bash
vercel login
```

3. Configurez les variables dans `.env.local` (sans `VITE_` pour les API routes) :
```env
STRAVA_CLIENT_ID=votre_client_id
STRAVA_CLIENT_SECRET=votre_client_secret
STRAVA_ACCESS_TOKEN=votre_access_token
STRAVA_REFRESH_TOKEN=votre_refresh_token
STRAVA_TOKEN_EXPIRES_AT=timestamp_unix
```

4. Lancez avec Vercel :
```bash
vercel dev
```

Les variables seront téléchargées automatiquement depuis Vercel si configurées.

### 🐛 Erreurs Courantes et Solutions

#### Erreur 1 : "Les données Strava ne se chargent pas en local"

**Symptômes :**
- Erreur 500 sur `/api/strava/*`
- Message "Failed to load resource: the server responded with a status of 500"
- Console : `VITE_USE_STRAVA_MOCK: undefined, USE_MOCK: false`

**Causes possibles :**
1. Vous utilisez `npm run dev` au lieu de `vercel dev`
2. La variable `VITE_USE_STRAVA_MOCK=true` n'est pas dans `.env.local`
3. Le serveur n'a pas été redémarré après avoir modifié `.env.local`

**Solutions :**

**Solution A : Activer les mocks (le plus simple)**
1. Créez/modifiez `.env.local` :
```env
VITE_USE_STRAVA_MOCK=true
```
2. Redémarrez le serveur (`Ctrl+C` puis `npm run dev`)
3. Vérifiez dans la console : `USE_MOCK: true`

**Solution B : Utiliser Vercel CLI**
1. Installez Vercel CLI : `npm install -g vercel`
2. Lancez : `vercel dev` (au lieu de `npm run dev`)
3. Les API routes fonctionneront correctement

**Vérification :**
Ouvrez la console (F12) et cherchez :
- `🔍 Mode Mock Strava:` avec `USE_MOCK: true` → Les mocks sont activés ✅
- `🎭 Mode Mock activé` → Les données mockées sont utilisées ✅
- `📡 Appel API via endpoint Vercel` → Les API routes sont utilisées (nécessite `vercel dev`)

#### Erreur 2 : "API routes Vercel ne sont pas disponibles"

**Symptômes :**
- Message d'erreur : "Les API routes Vercel ne sont pas disponibles avec 'npm run dev'"
- Les routes `/api/*` retournent du HTML au lieu de JSON

**Cause :**
Les routes `/api/*` sont des Serverless Functions Vercel qui ne fonctionnent qu'avec `vercel dev` ou en production.

**Solution :**
- Utilisez `vercel dev` au lieu de `npm run dev`
- OU activez les mocks avec `VITE_USE_STRAVA_MOCK=true` dans `.env.local`

#### Erreur 3 : "Variables d'environnement manquantes"

**Symptômes :**
- Erreur 500 avec message "Variables d'environnement manquantes sur Vercel"
- Liste des variables manquantes dans l'erreur

**Cause :**
Les variables d'environnement ne sont pas configurées dans Vercel ou dans `.env.local`.

**Solution :**
1. **En local** : Ajoutez les variables dans `.env.local` (sans `VITE_` pour les API routes)
2. **En production** : Allez dans Vercel → Settings → Environment Variables et ajoutez les variables
3. Redéployez après avoir ajouté les variables

#### Erreur 4 : "Token Strava rejeté (401)"

**Symptômes :**
- Erreur 401 Unauthorized
- Message "Token Strava rejeté"

**Causes possibles :**
1. Token expiré (expire après 6 heures)
2. Token sans les bonnes permissions (scope manquant)
3. Token invalide ou révoqué

**Solutions :**
1. **Refresh automatique** : Les tokens sont automatiquement rafraîchis par les API routes Vercel
2. **Vérifier les permissions** : Le token doit avoir le scope `activity:read` ou `activity:read_all`
3. **Régénérer le token** : Allez sur https://www.strava.com/settings/api et créez un nouveau token

#### Erreur 5 : "VITE_USE_STRAVA_MOCK: undefined"

**Symptômes :**
- Dans la console : `VITE_USE_STRAVA_MOCK: undefined`
- `USE_MOCK: false` même si vous avez ajouté la variable

**Causes possibles :**
1. Le fichier `.env.local` n'existe pas ou n'est pas à la racine
2. La variable n'est pas correctement formatée
3. Le serveur n'a pas été redémarré

**Solutions :**
1. Vérifiez que `.env.local` est à la racine (même niveau que `package.json`)
2. Vérifiez le contenu : `cat .env.local` (doit contenir `VITE_USE_STRAVA_MOCK=true`)
3. Format correct : `VITE_USE_STRAVA_MOCK=true` (sans espaces, sans guillemets)
4. **Redémarrez le serveur** après modification (important !)

**Note :** En local (localhost), les mocks sont activés automatiquement même sans la variable, pour éviter les erreurs.

#### Erreur 6 : "Expected ')' but found 'if'" (Erreur de build)

**Symptômes :**
- Erreur de compilation TypeScript/ESBuild
- Message "Expected ')' but found 'if'"

**Cause :**
Erreur de syntaxe dans le code (parenthèse manquante, etc.)

**Solution :**
1. Vérifiez les erreurs de linting : `npm run build`
2. Corrigez les erreurs de syntaxe
3. Vérifiez que toutes les parenthèses sont fermées

### 📋 Checklist Développement Local

Avant de commencer à développer :

- [ ] Les dépendances sont installées (`npm install`)
- [ ] Le fichier `.env.local` existe à la racine
- [ ] `VITE_USE_STRAVA_MOCK=true` est dans `.env.local` (pour utiliser les mocks)
- [ ] OU les variables Strava sont configurées (pour utiliser les vraies API)
- [ ] Le serveur a été redémarré après modification de `.env.local`
- [ ] La console affiche `USE_MOCK: true` ou les API routes fonctionnent

### 🔍 Debug en Local

**Vérifier la configuration des mocks :**
Ouvrez la console (F12) et cherchez :
```
🔍 Mode Mock Strava: {
  DEV: true,
  VITE_USE_STRAVA_MOCK: "true" ou undefined,
  USE_MOCK: true ou false
}
```

**Si `USE_MOCK: false` :**
1. Vérifiez que `.env.local` contient `VITE_USE_STRAVA_MOCK=true`
2. Redémarrez le serveur
3. Si toujours `false`, les mocks seront activés automatiquement sur `localhost`

**Si vous voyez `🎭 Mode Mock activé` :**
- Les données mockées sont utilisées ✅
- Aucun appel API n'est fait
- Parfait pour travailler sur le design

**Si vous voyez `📡 Appel API via endpoint Vercel` :**
- Les vraies API routes sont utilisées
- Nécessite `vercel dev` ou être en production

### Intégration Google Analytics

Le projet intègre l'API Google Analytics Data pour afficher les statistiques du site dans le dashboard.

**⚠️ IMPORTANT : Variables d'environnement Vercel**

Dans Vercel, les variables d'environnement pour les **API routes** ne doivent **PAS** avoir le préfixe `VITE_` !

**Configuration en développement local (`.env.local`) :**
```env
# Côté client (React) - avec préfixe VITE_
VITE_GOOGLE_CLIENT_ID=votre_client_id
VITE_GOOGLE_REDIRECT_URI=http://localhost:5173/api/google-auth/callback
```

**Configuration en production (Vercel Environment Variables) :**

⚠️ **Vous devez configurer les DEUX types de variables dans Vercel :**

```env
# Pour le client React (avec préfixe VITE_)
VITE_GOOGLE_CLIENT_ID=votre_client_id
VITE_GOOGLE_REDIRECT_URI=https://votre-projet.vercel.app/api/google-auth/callback

# Pour les API routes (SANS préfixe VITE_)
GOOGLE_CLIENT_ID=votre_client_id
GOOGLE_CLIENT_SECRET=votre_client_secret
GOOGLE_REDIRECT_URI=https://votre-projet.vercel.app/api/google-auth/callback
```

**Note :** Vous pouvez utiliser le même `CLIENT_ID` pour les deux, mais vous devez le configurer deux fois (une fois avec `VITE_`, une fois sans) car Vercel les traite différemment.

**Pourquoi cette différence ?**
- Le préfixe `VITE_` est uniquement pour les variables accessibles côté **client** (navigateur)
- Les API routes Vercel sont côté **serveur**, donc elles utilisent les variables **sans** préfixe `VITE_`
- Dans votre code client (React), vous utilisez `import.meta.env.VITE_GOOGLE_CLIENT_ID`
- Dans vos API routes (`api/google-auth/callback.ts`), vous utilisez `process.env.GOOGLE_CLIENT_ID` (sans VITE_)

**Endpoints API disponibles :**
- `GET /api/google-auth/callback` - Gère le callback OAuth2
- `POST /api/google-auth/refresh` - Rafraîchit les tokens expirés

Voir [GOOGLE_ANALYTICS_SETUP.md](./GOOGLE_ANALYTICS_SETUP.md) pour la configuration complète.

### Intégration Strava

Le projet intègre l'API Strava pour afficher vos données sportives via des **endpoints API Vercel sécurisés**.

**Architecture :**
```
Browser → /api/strava/* → Vercel Server (ajoute Bearer token) → Strava API → Données ✅
```

**Avantages de cette architecture :**
- ✅ Tokens gérés côté serveur (pas d'exposition dans le code client)
- ✅ Refresh automatique des tokens expirés
- ✅ Protection contre les erreurs CORS
- ✅ Meilleure sécurité et respect des limites de taux

**Configuration en développement :**
1. Installez Vercel CLI : `npm install -g vercel`
2. Obtenez vos tokens Strava via votre projet Node.js (`C:\Users\Anthony\strava-api-client`)
3. Créez un fichier `.env.local` avec les variables **sans** le préfixe `VITE_` :
   ```env
   STRAVA_CLIENT_ID=votre_client_id
   STRAVA_CLIENT_SECRET=votre_client_secret
   STRAVA_ACCESS_TOKEN=votre_access_token
   STRAVA_REFRESH_TOKEN=votre_refresh_token
   STRAVA_TOKEN_EXPIRES_AT=timestamp_unix_expiration
   ```
4. Lancez avec `vercel dev` (les variables seront téléchargées automatiquement)

**Configuration en production (Vercel) :**
1. Allez sur [vercel.com](https://vercel.com) → Votre projet → **Settings** → **Environment Variables**
2. Ajoutez les 5 variables **SANS** le préfixe `VITE_` (pour les API routes) :
   - `STRAVA_CLIENT_ID`
   - `STRAVA_CLIENT_SECRET`
   - `STRAVA_ACCESS_TOKEN`
   - `STRAVA_REFRESH_TOKEN`
   - `STRAVA_TOKEN_EXPIRES_AT`
3. Cochez **Production** (et optionnellement Preview/Development)
4. Redéployez votre projet après avoir ajouté les variables

⚠️ **Important** : 
- Utilisez les variables **SANS** `VITE_` pour les API routes Vercel (plus sécurisé)
- Les tokens Strava expirent après 6 heures, mais sont **automatiquement rafraîchis** par les endpoints API
- Le refresh automatique utilise votre `STRAVA_REFRESH_TOKEN` (qui expire rarement)
- Vous n'avez normalement **PAS besoin** de mettre à jour manuellement les tokens dans Vercel

**Endpoints API disponibles :**
- `GET /api/strava/athlete` - Informations de l'athlète
- `GET /api/strava/activities` - Liste des activités (avec pagination et filtres)
- `GET /api/strava/activities/:id` - Détails d'une activité
- `GET /api/strava/athlete/stats?athlete_id=XXX` - Statistiques de l'athlète

**Système de cache :**
- Cache localStorage de 5 minutes pour limiter les appels API
- Réduction automatique des requêtes Strava
- Meilleures performances et respect des limites de taux

**Fonctionnalités :**
- Affichage du profil athlète
- 5 dernières activités avec détails
- Activités 2025 avec statistiques
- Graphiques de performance (radar, journal d'entraînement)

Voir [STRAVA_TOKEN_MANAGEMENT.md](./STRAVA_TOKEN_MANAGEMENT.md), [VERCEL_STRAVA_SETUP.md](./VERCEL_STRAVA_SETUP.md) et [VERCEL_ENV_VARS.md](./VERCEL_ENV_VARS.md) pour plus de détails.

## 📂 Structure du Projet

```
src/
├── components/              # Composants React
│   ├── Header.tsx          # Navigation principale
│   ├── Background.tsx     # Background dynamique
│   ├── Hero.tsx            # Page d'accueil
│   ├── Menu.tsx            # Page menu avec recherche
│   ├── About.tsx           # Page à propos
│   ├── AboutNew.tsx        # Page à propos améliorée avec navigation et 3D
│   ├── HumanBody3D.tsx    # Composant 3D avec nuage de points
│   ├── MobileSearchBar.tsx # Search bar mobile
│   ├── SingleProjectNew.tsx # Page projet (sections)
│   ├── ProjectItem.tsx     # Carte projet réutilisable
│   ├── Button.tsx          # Bouton réutilisable
│   ├── Dashboard.tsx       # Page dashboard administrateur
│   ├── DashboardStats.tsx  # Composant statistiques Google Analytics
│   └── Login.tsx           # Page de connexion
│   ├── ui/                 # Composants UI (shadcn/ui)
│   │   ├── button.tsx
│   │   ├── scroll-area.tsx
│   │   └── file-tree.tsx
│   └── ... (autres composants)
├── data/                   # Données centralisées
│   ├── projectsNew.ts      # Projets (structure sections)
│   ├── menuCategories.ts   # Catégories et projets menu
│   ├── aboutData.ts        # Données page À propos
│   └── flowData.ts         # Données pour l'arbre de compétences
├── services/               # Services API
│   ├── stravaService.ts    # Service Strava avec cache
│   ├── authService.ts      # Service d'authentification
│   ├── googleAnalyticsService.ts  # Service Google Analytics Data API
│   └── googleAuthService.ts        # Service OAuth2 Google Analytics
├── lib/                    # Utilitaires
│   └── utils.ts            # Fonction cn() pour Tailwind
├── api/                    # Routes API Vercel (Serverless Functions)
│   ├── strava/             # Endpoints Strava sécurisés
│   │   ├── athlete.ts      # GET /api/strava/athlete
│   │   ├── activities.ts   # GET /api/strava/activities
│   │   ├── activities/[id]/index.ts  # GET /api/strava/activities/:id
│   │   ├── athlete/stats.ts # GET /api/strava/athlete/stats
│   │   └── utils.ts        # Utilitaires (refresh token, gestion tokens)
│   ├── auth/               # Endpoints d'authentification
│   │   └── login.ts        # POST /api/auth/login
│   └── google-auth/        # Endpoints OAuth2 Google Analytics
│       ├── callback.ts     # GET /api/google-auth/callback
│       └── refresh.ts       # POST /api/google-auth/refresh
├── App.tsx                 # Composant racine
├── main.tsx               # Point d'entrée
└── index.css              # Styles globaux + Tailwind
```

## 🎨 Personnalisation

### Couleurs
- Orange principal : `#FF6B35`
- Texte sombre : `#222`
- Fond sombre : `#0a0a0a`
- Fond accueil : dégradé dynamique selon l’heure (île de la Réunion, `Indian/Reunion`) ; référence midi `#509ED8`

### Typographie
- Titres : `Space Grotesk` (depuis `public/fonts/`)
- Corps : `Inter` (police principale, remplace SF Pro sur tout le projet)
- Monospace : `JetBrains Mono`, `DM Mono`
- Projets : `Sora`

### Animations
- Durée standard : `0.3s ease`
- Effets de bounce pour les entrées
- Transitions fluides entre les pages

## 🌅 Fond d’accueil selon l’heure (Réunion)

La page d’accueil adapte automatiquement l’ambiance à l’heure locale **île de la Réunion** (UTC+4, même heure civile que Dubaï).

### Comportement

- **Fond** : dégradé interpolé (aube orange → jour bleu `#509ED8` à midi → crépuscule rose/violet → nuit bleu foncé).
- **Light Rays** (React Bits) : origine `top-left` / `top-center` / `top-right` selon la position du soleil.
- **Side Rays** (React Bits) : rayons latéraux dont la source traverse l’écran (`sourceX` 0 = est, 1 = ouest), atténués au zénith.
- **Transitions** : fondus d’environ 4,2 s entre les paliers ; en mode Auto, rafraîchissement toutes les minutes.

### Fichiers principaux

| Fichier | Rôle |
|---------|------|
| `src/lib/accueilTimeOfDay.ts` | Paliers horaires, interpolation, animation |
| `src/lib/accueilSideRays.ts` | Trajectoire `sourceX` + paramètres Side Rays |
| `src/contexts/AccueilTimeOfDayContext.tsx` | Thème actif, application CSS sur `html`/`body` |
| `src/components/LightRays.tsx` | Rayons centraux (React Bits) |
| `src/components/SideRays.tsx` | Rayons latéraux (React Bits) |
| `src/components/HeroTitleLottieCycle.tsx` | Lottie au-dessus du H1 (`lottie-react`) |
| `src/data/heroLottieAnimations.ts` | Import du JSON actif + constante `HERO_LOTTIE_FILE` |

### Animations Lottie au-dessus du titre

L’animation **`8f577fd4-f1aa-11ef-b996-b3631e05cc15.json`** (`animation json/`) s’affiche **au-dessus du H1** en boucle.

**Changer d’animation** : dans `src/data/heroLottieAnimations.ts`, modifie l’import et `HERO_LOTTIE_FILE` pour pointer vers un autre `.json` du dossier `animation json/`, puis relance `npm run dev`.

Autres exports disponibles dans le dépôt : `546e56ea-…`, `5e0f7282-…`, `8c56d45c-…`, `474d4913-…` (voir `animation json/README.md`).

### Boutons de test ambiance (dev uniquement)

`AccueilTimeOfDayPreviewControls` n’est **pas monté** par défaut. Pour prévisualiser Nuit / Aube / Midi / etc. en local, importe-le et place-le dans `Header.tsx` ou `Hero.tsx` :

```tsx
import AccueilTimeOfDayPreviewControls from './AccueilTimeOfDayPreviewControls';
// …
<AccueilTimeOfDayPreviewControls />
```

Modes : Auto, Nuit, Aube, Midi, Coucher, Crépuscule — `ACCUEIL_TIME_OF_DAY_PREVIEW_OPTIONS` dans `accueilTimeOfDay.ts`.

`prefers-reduced-motion` : palette figée sur le bleu midi.

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

## 🏃 Intégration Strava

### Architecture Sécurisée
Le projet utilise des **endpoints API Vercel** pour tous les appels Strava :
- ✅ Tokens gérés côté serveur (jamais exposés dans le code client)
- ✅ Refresh automatique des tokens expirés
- ✅ Protection contre les erreurs CORS et 401
- ✅ Meilleure sécurité et gestion des secrets

**Flow des données :**
```
React Component → /api/strava/athlete → Vercel Function (ajoute token) → Strava API → Données
```

### Fonctionnalités
- **Données en temps réel** : Profil, activités, statistiques depuis l'API Strava
- **Cache intelligent** : Système de cache localStorage (5 minutes) pour limiter les appels API
- **Graphiques de performance** : Graphique radar et journal d'entraînement avec Recharts
- **Gestion des tokens** : Refresh automatique côté serveur via Vercel Functions

### Configuration
1. Obtenez vos tokens Strava (voir [STRAVA_TOKEN_MANAGEMENT.md](./STRAVA_TOKEN_MANAGEMENT.md))
2. **En développement** : Créez un fichier `.env.local` avec les variables **SANS** `VITE_` :
   ```env
   STRAVA_CLIENT_ID=votre_client_id
   STRAVA_ACCESS_TOKEN=votre_access_token
   # ... etc
   ```
3. Lancez avec `vercel dev` (les API routes fonctionneront)
4. **En production** : Configurez les variables dans Vercel (voir [VERCEL_ENV_VARS.md](./VERCEL_ENV_VARS.md))

### Endpoints API Disponibles
- `GET /api/strava/athlete` - Informations de l'athlète
- `GET /api/strava/activities?page=1&per_page=10` - Liste des activités
- `GET /api/strava/activities/:id` - Détails d'une activité
- `GET /api/strava/athlete/stats?athlete_id=XXX` - Statistiques de l'athlète

### Refresh Automatique des Tokens

**🎉 Bonne nouvelle :** Les tokens sont automatiquement rafraîchis par les endpoints API Vercel !

**Comment ça fonctionne :**
1. Quand un appel API est fait et que le token est expiré (vérifié avec `STRAVA_TOKEN_EXPIRES_AT`)
2. L'endpoint utilise automatiquement le `STRAVA_REFRESH_TOKEN` pour obtenir un nouveau token
3. Le nouveau token est utilisé pour l'appel Strava
4. ✅ **Aucune manipulation manuelle nécessaire !**

**⚠️ Note importante :**
- Le refresh automatique fonctionne tant que votre `STRAVA_REFRESH_TOKEN` est valide (il expire très rarement)
- Les nouveaux tokens rafraîchis ne sont **pas** automatiquement sauvegardés dans Vercel (mais ça n'empêche pas le fonctionnement)
- Si vous voulez mettre à jour les tokens dans Vercel manuellement, utilisez votre script `strava-api-client` pour obtenir les nouveaux tokens, puis mettez-les à jour dans Vercel

### Cache et Performance
- **Cache localStorage** : 5 minutes pour les activités, athlète et activités 2025
- **Réduction des appels API** : Limite automatique des requêtes Strava
- **Respect des limites** : Prévention des erreurs 429 (Too Many Requests)

## 🔧 Corrections Récentes (Janvier 2025)

### Header avec Intégration Strava Dynamique
- ✅ **Photo de profil Strava** : Photo de profil affichée dans le header au lieu du logo SVG (object-fit: cover)
- ✅ **Nom et prénom dynamiques** : Récupération depuis Strava API avec `getStravaAthlete()`
- ✅ **Skeleton de chargement** : Skeleton animé pendant le chargement des données Strava (nom et photo)
- ✅ **Fallback** : Logo SVG et nom "Anthony Merault" affichés si pas de données Strava disponibles
- ✅ **Balise sémantique** : Nom/prénom dans une balise `<p>` au lieu de `<h1>` pour meilleure structure HTML

### Search Bar (Février 2025)
- ✅ **Placeholder** : Une seule div, transition CSS (pas de Framer) pour limiter le clignotement sur mobile
- ✅ **Fermeture au clic extérieur** : Détection via ref sur le conteneur + mousedown/touchstart
- ✅ **Pas de zoom mobile** : font-size 16px sur l’input en mobile (media query desktop pour 14px)
- ✅ **Fond actif** : Overlay rgba(0,0,0,0.20) sur la search bar active (::before), cohérent avec/sans résultats
- ✅ **Zone résultats** : border-radius 24px en bas, overflow hidden pour éviter les angles droits
- ✅ **Overlay flouté** : Portal vers #search-overlay-root (position absolute dans le root), blur 12px
- ✅ **Projets en carré** : Miniatures avec border-radius 12px

### Corrections Graphiques Strava
- ✅ **Graphique d'entraînement** : Le graphique Spline s'arrête maintenant à la dernière activité (suppression de l'intervalle qui ajoutait des points continuellement)
- ✅ **Données réelles uniquement** : Affichage uniquement des activités réelles sans simulation de données futures

### Nettoyage du Code (Janvier 2025)
- ✅ **Suppression des imports React inutiles** : Nettoyage complet de tous les imports `React` inutiles (React 17+ n'en a plus besoin pour JSX)
- ✅ **Correction des types React** : Remplacement de `React.FC`, `React.MouseEvent`, `React.TouchEvent`, `React.CSSProperties` par les types importés directement (`FC`, `MouseEvent`, `TouchEvent`, `CSSProperties`)
- ✅ **Remplacement de React.ReactNode** : Utilisation de `ReactNode` importé de 'react' au lieu de `React.ReactNode`
- ✅ **Suppression des console.log/warn/error** : Nettoyage de tous les `console.log` de debug dans les composants (conservés uniquement dans les services si nécessaire)
- ✅ **Suppression des variables inutilisées** : Nettoyage de toutes les variables non utilisées (`stravaActivities`, `_searchTerm`, `_prev`, `_animateOpacity`, etc.)
- ✅ **Suppression des lignes vides inutiles** : Nettoyage des espaces et lignes vides superflues
- ✅ **Tous les fichiers passent le linting** : Aucune erreur de linting dans tout le projet

### Corrections de Build Vercel (Janvier 2025)
- ✅ **Fichiers manquants ajoutés** : Ajout de `StravaRadialBarChart.tsx` et `StravaSonifiedChart.tsx` qui étaient manquants
- ✅ **Correction des imports React dans les graphiques** : Remplacement de `React.FC` par `FC` dans tous les composants Strava
- ✅ **Import dynamique conditionnel pour stravaMockData** : Remplacement de l'import statique par un import dynamique conditionnel pour éviter les erreurs de build en production
- ✅ **Ajout de stravaMockData.ts au commit** : Fichier mock ajouté au dépôt pour permettre à Rollup de le résoudre lors du build (jamais utilisé en production)
- ✅ **Build Vercel fonctionnel** : Tous les problèmes de build résolus, le projet se build correctement sur Vercel

### Architecture Strava Corrigée et Opérationnelle (Janvier 2025)
- ✅ **Migration vers endpoints API Vercel** : Tous les appels Strava passent maintenant par des endpoints serveur sécurisés
- ✅ **Sécurité renforcée** : Tokens gérés côté serveur, jamais exposés dans le code client
- ✅ **Correction des erreurs 401** : Plus d'appels directs depuis le navigateur vers Strava API
- ✅ **Nouvel endpoint créé** : `/api/strava/athlete/stats` pour les statistiques de l'athlète
- ✅ **Variables d'environnement** : Utilisation des variables sans préfixe `VITE_` pour les API routes
- ✅ **Gestion automatique des tokens** : Refresh automatique des tokens expirés côté serveur
- ✅ **Corrections techniques** :
  - Correction de l'erreur `ERR_MODULE_NOT_FOUND` (ajout des extensions `.js` dans les imports)
  - Correction de l'erreur `body stream already read` (utilisation de `response.clone()`)
  - Amélioration des messages d'erreur avec diagnostics détaillés
- ✅ **Documentation mise à jour** : README et guides mis à jour avec la nouvelle architecture

### Refresh Automatique des Tokens

**Bonne nouvelle :** Les tokens sont automatiquement rafraîchis par les endpoints API Vercel ! 🎉

Quand un token expire :
1. L'endpoint API détecte que le token est expiré (vérification avec `STRAVA_TOKEN_EXPIRES_AT`)
2. Il utilise automatiquement le `STRAVA_REFRESH_TOKEN` pour obtenir un nouveau token
3. Le nouveau token est utilisé pour l'appel Strava

**⚠️ Important :** Les nouveaux tokens rafraîchis ne sont PAS automatiquement sauvegardés dans Vercel. Pour une solution complètement automatique à long terme, vous pouvez :
- Utiliser **Vercel KV** pour stocker les tokens dynamiquement
- Créer un endpoint `/api/refresh-token` qui met à jour les variables Vercel via l'API
- Ou simplement mettre à jour manuellement les tokens dans Vercel tous les quelques jours si nécessaire

**Note :** Le refresh automatique fonctionne tant que le `STRAVA_REFRESH_TOKEN` est valide (il expire rarement, contrairement à l'access token qui expire toutes les 6 heures).

### Ajustements CSS Page AboutNew

### Ajustements CSS Page AboutNew
- ✅ Ajustement des espacements dans le layout 3 colonnes :
  - `gap` du conteneur `.intro-columns-container` : `24px` → `0px`
  - `margin-bottom` des colonnes `.intro-column-left/right` : `16px` → `0px`
- ✅ Alignement des colonnes :
  - Ajout de `justify-content: flex-start` sur `.intro-column`
  - Ajout de `align-items: center` sur `.intro-column`
- ✅ Optimisation des cartes Strava (`.hero-card.services-card`) :
  - `gap` : `16px` → `0px`
  - `margin-bottom` : `0px` → `12px`
  - `padding-top` et `padding-bottom` : `11px` → `12px`

### Modifications Page d'accueil (Hero) - Janvier 2025
- ✅ **Refactorisation de l'architecture CSS** : 
  - Gestion de la classe `accueil-page` directement sur le `body` (comme `menu-active`)
  - Simplification de la classe `page active accueil-page` en `page active`
  - Détection de la page d'accueil via `body.classList.contains('accueil-page')` dans GridPattern et Background
- ✅ **Page d'accueil scrollable avec titre fixe** :
  - Toute la page d'accueil est maintenant scrollable (scroll vertical activé sur `body.accueil-page`)
  - Titre H1 fixe en position `sticky` à gauche de la colonne (reste visible lors du scroll)
  - Suppression des limitations de hauteur (`max-height`) qui causaient l'enveloppement du contenu
  - Colonne de droite suit le scroll de la page entière (plus de scroll indépendant)
- ✅ **Correction de l'overflow visible** :
  - Correction des règles CSS pour permettre `overflow: visible` sur `.hero-main` et `.main-accueil`
  - Modification de tous les parents (`.page.active`, `.container`, `body.accueil-page`) pour permettre l'overflow visible uniquement sur la page d'accueil
  - Protection des autres pages (AboutNew, SingleProject) avec `:not(.single-project-page)`
- ✅ **Améliorations UI** :
  - Mise à jour du favicon pour utiliser le logo du header (`/images/logo.svg`)
  - Style de la carte Footer identique à la carte Infos (même padding, gap, animation-delay)
  - Intégration du bouton "About New" dans la flèche de la carte Infos (suppression du bouton séparé)
- ✅ **Effet BlurText global sur tous les titres** :
  - Animation CSS automatique appliquée à tous les titres H1, H2, H3, H4, H5, H6
  - Effet de blur progressif lors de l'apparition (blur(8px) → blur(0px))
  - Délais progressifs pour les titres imbriqués (h2: +0.1s, h3: +0.2s, etc.)
  - Durée d'animation : 0.8s avec transition ease-out

- ✅ Correction de toutes les erreurs TypeScript du build
- ✅ Suppression des imports non utilisés (`Menu`, `swiper/css/navigation`)
- ✅ Nettoyage des variables non utilisées (`searchTerm`, `filteredResults`, `groupIndex`, `handleClose`, `ref`)
- ✅ Ajout d'une section Sommaire avec navigation horizontale scrollable
- ✅ Implémentation du sticky positioning pour le sommaire (JavaScript)
- ✅ Amélioration du responsive mobile : paragraphes en pleine largeur
- ✅ Nettoyage du code CSS et JavaScript (suppression des duplications)
- ✅ Code prêt pour le déploiement sur Vercel/GitHub Pages
- ✅ Ajout de la page AboutNew avec navigation par sections
- ✅ Intégration d'un modèle 3D en nuage de points avec React Three Fiber
- ✅ Conversion de modèles OBJ en nuage de points pour affichage optimisé
- ✅ Responsive design pour le modèle 3D sur mobile et desktop
- ✅ Intégration Strava avec affichage des données en temps réel
- ✅ Système de cache localStorage pour limiter les appels API Strava
- ✅ Graphiques de performance (radar, journal d'entraînement)
- ✅ Routes API Vercel configurées pour le refresh automatique des tokens (production)
- ✅ Gestion des tokens avec expiration et validation

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

## 📚 Documentation Additionnelle

- [STRAVA_TOKEN_MANAGEMENT.md](./STRAVA_TOKEN_MANAGEMENT.md) - Gestion des tokens Strava
- [VERCEL_STRAVA_SETUP.md](./VERCEL_STRAVA_SETUP.md) - Configuration Strava sur Vercel (Production)
- [VERCEL_API_SETUP.md](./VERCEL_API_SETUP.md) - Configuration des routes API Vercel
- [VERCEL_ENV_VARS.md](./VERCEL_ENV_VARS.md) - Variables d'environnement Vercel
- [GOOGLE_ANALYTICS_SETUP.md](./GOOGLE_ANALYTICS_SETUP.md) - Configuration OAuth2 pour Google Analytics
- [DEPLOY.md](./DEPLOY.md) - Guide de déploiement

---

### Améliorations Single Project (Janvier 2025)
- ✅ **Section "Processus détaillé – PlayDaGo"** : Nouvelle section Case Study avec contenu structuré détaillant le processus de design (recherche utilisateur, veille concurrentielle, idéation, tests & itérations)
- ✅ **Titre section mis à jour** : "Wireframes & Maquettes" renommé en "Idéation & Solutions testées" pour une meilleure cohérence
- ✅ **Donut Chart Race** : Intégration de graphiques en donut animés dans la section "Résultats & Impact" avec effet "race" séquentiel (délai progressif entre chaque graphique)
- ✅ **Padding-bottom amélioré** : Ajout d'un padding-bottom de 160px sur desktop (64px sur mobile) pour un meilleur espacement en bas de page
- ✅ **Tableau typographie masqué** : Le tableau des typographies est maintenant masqué, seul l'affichage de l'alphabet reste visible

### Alignement Figma & Refactor Single Project CSS (Février 2025)
- ✅ **Page Single Project** : Conteneur principal (padding 48px/80px, gap 80px), section « Mes autres projets » en carousel (cartes laptop mockup 1118×858px, overlay titre/date/badges), tableaux sémantiques (Palette Pedaboard, Typescale, Équipe projet), section Conception & Itération en deux panneaux, pagination des carousels repositionnée sous les images
- ✅ **Matrice de positionnement** : `PositionnementMatrixChart` (Highcharts scatter) ; **User Flow** : `UserFlowChart` (Highcharts organization) ; **Tableau Typescale** : scroll horizontal (860px).
- ✅ **Espacement fluide** : Variables CSS `clamp()` pour padding et gap afin d’adapter l’interface au redimensionnement
- ✅ **Polices locales** : JetBrains Mono et Space Grotesk chargées depuis `public/fonts/`
- ✅ **Nettoyage code** : Suppression de l’import et de la fonction inutilisés dans `SingleProjectNew.tsx`, suppression des `console.log` de debug dans `DashboardStats.tsx`

---

### Dashboard & Google Analytics (Janvier 2025)
- ✅ **Dashboard administrateur** : Interface complète de gestion des projets avec authentification
- ✅ **Authentification** : Système de connexion avec email/mot de passe (API Vercel + fallback local)
- ✅ **Gestion de projets** : CRUD complet (création, lecture, modification, suppression)
- ✅ **Recherche et filtrage** : Recherche par titre, filtrage par catégorie et statut
- ✅ **Vue en grille/liste** : Basculement entre deux modes d'affichage
- ✅ **Intégration Google Analytics** : Service complet pour l'API Google Analytics Data v1beta
- ✅ **OAuth2 Google** : Authentification OAuth2 pour accéder aux données Analytics
- ✅ **Statistiques en temps réel** : Affichage des utilisateurs actifs en temps réel
- ✅ **Vue d'ensemble** : Statistiques globales (visiteurs, pages vues, taux de rebond, durée moyenne)
- ✅ **Google Tag Manager** : Intégration GTM (GTM-MJ9VW6G4) et Google Analytics (G-MS120551E9)
- ✅ **Design cohérent** : Style aligné avec la page d'accueil (glassmorphism, couleurs, marges)
- ✅ **Barre de recherche** : Même style que la page d'accueil (glassmorphism, centrée)
- ✅ **Responsive** : Adaptation mobile complète du dashboard
- ✅ **Documentation** : Guide complet de configuration OAuth2 (GOOGLE_ANALYTICS_SETUP.md)

---

## 🔄 Workflow Complet de Développement

### 1. Design (Figma) → Code
1. **Créer le design** dans Figma
2. **Exporter les assets** (SVG, PNG) dans `public/figma-assets/` ou `src/assets/`
3. **Optionnel** : Utiliser le MCP Figma dans Cursor pour générer le code React directement

### 2. Développement (Cursor)
1. **Ouvrir le projet** dans Cursor
2. **Utiliser l'IA intégrée** pour générer/modifier le code
3. **Utiliser les MCP** (Figma, MUI) pour accéder à la documentation et aux exemples
4. **Tester en local** :
   - Avec mocks : `npm run dev` (après avoir ajouté `VITE_USE_STRAVA_MOCK=true` dans `.env.local`)
   - Avec vraies API : `vercel dev` (nécessite Vercel CLI)

### 3. Version Control (Git/GitHub)
1. **Vérifier les changements** : `git status`
2. **Ajouter les fichiers** : `git add .`
3. **Commit avec message descriptif** : `git commit -m "feat: description"` ou `fix: description`
4. **Push vers GitHub** : `git push origin main`

**Convention de commits :**
- `feat:` : Nouvelle fonctionnalité
- `fix:` : Correction de bug
- `refactor:` : Refactoring du code
- `style:` : Changements de style (CSS, formatage)
- `docs:` : Documentation
- `chore:` : Tâches de maintenance

### 4. Déploiement Automatique (Vercel)
1. **Push sur `main`** → Déploiement automatique déclenché
2. **Vérifier les logs** dans Vercel Dashboard → Deployments → Logs
3. **Variables d'environnement** : Configurées dans Vercel → Settings → Environment Variables

### 5. Intégrations API

**Strava :**
- Architecture : `Client → /api/strava/* → Vercel Function → Strava API`
- Tokens gérés côté serveur uniquement (jamais exposés dans le code client)
- Refresh automatique des tokens expirés
- En local : Utiliser les mocks (`VITE_USE_STRAVA_MOCK=true`) ou `vercel dev`

**Google Analytics :**
- OAuth2 flow : `Client → Google → /api/google-auth/callback → Dashboard`
- Tokens stockés dans `localStorage` côté client
- Variables d'environnement :
  - `VITE_*` pour le client React
  - Sans `VITE_` pour les API routes Vercel

### 6. MCP (Model Context Protocol)

**MCP Configurés :**
- **MUI MCP** : Accès à la documentation MUI et exemples de code
- **Figma MCP** : Génération de code React depuis les designs Figma (si configuré)

**Configuration :**
1. Cursor Settings → MCP → Add Server
2. Ajouter la configuration du serveur MCP souhaité
3. Voir `MCP_CONFIG.md` pour plus de détails

**Avantages :**
- Documentation à jour automatiquement
- Code précis basé sur les meilleures pratiques
- Génération rapide de code depuis les designs

## 📚 Documentation des Erreurs Courantes

### Erreurs de Développement Local

#### ❌ "Les données Strava ne se chargent pas en local"
**Symptômes :**
- Erreur 500 sur `/api/strava/*`
- Console : `VITE_USE_STRAVA_MOCK: undefined, USE_MOCK: false`
- Message "Failed to load resource: the server responded with a status of 500"

**Causes possibles :**
1. Utilisation de `npm run dev` sans mocks activés
2. Variable `VITE_USE_STRAVA_MOCK=true` absente de `.env.local`
3. Serveur non redémarré après modification de `.env.local`

**Solutions :**
- **Solution A (Recommandée)** : Ajouter `VITE_USE_STRAVA_MOCK=true` dans `.env.local` et redémarrer
- **Solution B** : Utiliser `vercel dev` au lieu de `npm run dev`

**Vérification :**
Console (F12) → Chercher `🔍 Mode Mock Strava:` avec `USE_MOCK: true`

#### ❌ "API routes Vercel ne sont pas disponibles"
**Symptômes :**
- Message : "Les API routes Vercel ne sont pas disponibles avec 'npm run dev'"
- Routes `/api/*` retournent du HTML au lieu de JSON

**Cause :**
Les routes `/api/*` sont des Serverless Functions Vercel qui ne fonctionnent qu'avec `vercel dev` ou en production.

**Solution :**
- Utiliser `vercel dev` au lieu de `npm run dev`
- OU activer les mocks avec `VITE_USE_STRAVA_MOCK=true`

#### ❌ "VITE_USE_STRAVA_MOCK: undefined"
**Symptômes :**
- Console : `VITE_USE_STRAVA_MOCK: undefined`
- `USE_MOCK: false` même après avoir ajouté la variable

**Causes possibles :**
1. Fichier `.env.local` absent ou mal placé
2. Variable mal formatée
3. Serveur non redémarré

**Solutions :**
1. Vérifier que `.env.local` est à la racine (même niveau que `package.json`)
2. Vérifier le format : `VITE_USE_STRAVA_MOCK=true` (sans espaces, sans guillemets)
3. **Redémarrer le serveur** après modification (important !)

**Note :** En local (localhost), les mocks sont activés automatiquement même sans la variable.

#### ❌ "Variables d'environnement manquantes"
**Symptômes :**
- Erreur 500 avec message "Variables d'environnement manquantes sur Vercel"
- Liste des variables manquantes dans l'erreur

**Cause :**
Variables non configurées dans Vercel ou dans `.env.local`.

**Solution :**
1. **En local** : Ajouter les variables dans `.env.local` (sans `VITE_` pour les API routes)
2. **En production** : Vercel → Settings → Environment Variables
3. Redéployer après avoir ajouté les variables

#### ❌ "Token Strava rejeté (401)"
**Symptômes :**
- Erreur 401 Unauthorized
- Message "Token Strava rejeté"

**Causes possibles :**
1. Token expiré (expire après 6 heures)
2. Token sans les bonnes permissions (scope manquant)
3. Token invalide ou révoqué

**Solutions :**
1. **Refresh automatique** : Les tokens sont automatiquement rafraîchis par les API routes Vercel
2. **Vérifier les permissions** : Le token doit avoir le scope `activity:read` ou `activity:read_all`
3. **Régénérer le token** : https://www.strava.com/settings/api

### Erreurs de Build

#### ❌ "Expected ')' but found 'if'"
**Symptômes :**
- Erreur de compilation TypeScript/ESBuild
- Message "Expected ')' but found 'if'"

**Cause :**
Erreur de syntaxe dans le code (parenthèse manquante, etc.)

**Solution :**
1. Vérifier les erreurs de linting : `npm run build`
2. Corrigez les erreurs de syntaxe
3. Vérifier que toutes les parenthèses sont fermées

#### ❌ "Cannot find module"
**Symptômes :**
- Erreur d'import
- Message "Cannot find module '...'"

**Cause :**
Import incorrect ou fichier manquant.

**Solution :**
1. Vérifier les chemins d'import
2. Vérifier les extensions de fichiers (`.ts`, `.tsx`, `.js`)
3. Vérifier que le fichier existe

### Erreurs de Production

#### ❌ "Les données Strava ne se chargent pas en production"
**Symptômes :**
- Erreur 500 sur les routes `/api/strava/*` en production
- Message "Variables d'environnement manquantes"

**Cause :**
Variables d'environnement non configurées dans Vercel.

**Solution :**
1. Vercel → Settings → Environment Variables
2. Ajouter toutes les variables nécessaires (sans `VITE_` pour les API routes)
3. Redéployer le projet

#### ❌ "OAuth2 redirect vers URL Vercel au lieu du domaine personnalisé"
**Symptômes :**
- Après connexion Google, redirection vers `portfolio-react-anthony-xxx.vercel.app` au lieu de `anthony-merault.fr`

**Cause :**
`GOOGLE_REDIRECT_URI` et `VITE_GOOGLE_REDIRECT_URI` pointent vers l'URL Vercel.

**Solution :**
1. Mettre à jour dans Vercel → Settings → Environment Variables :
   - `GOOGLE_REDIRECT_URI=https://anthony-merault.fr/api/google-auth/callback`
   - `VITE_GOOGLE_REDIRECT_URI=https://anthony-merault.fr/api/google-auth/callback`
2. Mettre à jour dans Google Cloud Console → Authorized redirect URIs
3. Redéployer

## 🛠️ Outils et Librairies

### MCP (Model Context Protocol)
- **MUI MCP** : Documentation et exemples MUI (voir `MCP_CONFIG.md`)
- **Figma MCP** : Génération de code depuis Figma (si configuré)
- Configuration dans Cursor Settings → MCP → Add Server

### Librairies Principales
- **UI** : @radix-ui/*, @mui/material, shadcn/ui, lucide-react
- **Animations** : framer-motion, gsap, @react-spring/web
- **Graphiques** : highcharts, recharts, @mui/x-charts
- **3D** : @react-three/fiber, @react-three/drei, three
- **Utilitaires** : date-fns, clsx, class-variance-authority
- **API** : react-ga4, @vercel/node

Voir [WORKFLOW.md](./WORKFLOW.md) pour la documentation complète du workflow (Figma, Cursor, Git, GitHub, Vercel, MCP).

### Page Description & Typographie (Février 2025)
- **Design system Single Project** appliqué à la section Description (À propos) : cartes, stats, expériences, formations alignés sur les couleurs et espacements de la page projet
- **Tableau Formations** : style du tableau « L’équipe projet » (Single Project) — en-tête #EAEAE6, lignes JetBrains Mono, bordure #b2aaaa ; **scroll horizontal** sur mobile (min-width 480px)
- **Textes sur fond noir** : titres « À propos de moi », paragraphes d’intro et « Formations » en blanc dans la section Description
- **Typographie** : remplacement de **SF Pro** par **Inter** dans tout le projet (AboutNew, About, SingleProject, TarotCard, ProjectStats, ProjectCharts)

*Dernière mise à jour : avril 2026 — page projet Playdago (Magic Bento, Scroll Stack, Card Swap) ; précédemment fév. 2025 : URLs /fr et /en, 404, Kaldera (trackali.com), `content/pages/`.*
