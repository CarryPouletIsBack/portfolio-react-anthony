# Guide de Déploiement sur Hébergeur

## 📋 Étapes de Déploiement

### 1. Build du Projet

Exécutez la commande de build pour générer les fichiers de production :

```bash
npm run build
```

Cette commande va créer un dossier `dist/` contenant tous les fichiers optimisés pour la production.

### 2. Préparer les Fichiers

Le dossier `dist/` contient tous les fichiers nécessaires :
- `index.html` - Point d'entrée de l'application
- `assets/` - Fichiers JavaScript et CSS optimisés
- `images/` - Images et assets
- `figma-assets/` - Assets Figma

### 3. Transférer les Fichiers

#### Option A : Via FTP/SFTP (FileZilla, WinSCP, etc.)

1. Connectez-vous à votre hébergeur via FTP/SFTP
2. Naviguez vers le dossier public (généralement `public_html`, `www`, ou `htdocs`)
3. **Si vous déployez à la racine** : Transférez TOUT le contenu du dossier `dist/` dans le dossier public
4. **Si vous déployez dans un sous-dossier** : Créez un dossier (ex: `portfolio`) et transférez le contenu de `dist/` dedans

#### Option B : Via cPanel File Manager

1. Connectez-vous à votre cPanel
2. Ouvrez le File Manager
3. Naviguez vers `public_html` (ou votre dossier public)
4. Uploadez tous les fichiers du dossier `dist/`

### 4. Configuration du Serveur

#### Pour Apache (la plupart des hébergeurs)

Le fichier `.htaccess` est déjà créé à la racine du projet. **Copiez-le dans le dossier `dist/`** avant de transférer, ou transférez-le avec les autres fichiers.

**Important** : Si vous déployez dans un sous-dossier (ex: `example.com/portfolio/`), modifiez la ligne `RewriteBase /` dans `.htaccess` en `RewriteBase /portfolio/`

#### Pour Nginx

Si votre hébergeur utilise Nginx, vous devrez configurer le serveur différemment. Contactez votre hébergeur ou ajoutez cette configuration :

```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

### 5. Vérifier le Déploiement

1. Visitez votre site web
2. Vérifiez que toutes les pages fonctionnent
3. Testez la navigation entre les pages
4. Vérifiez que les images et assets se chargent correctement

## 🔧 Configuration Spéciale

### Si vous déployez dans un sous-dossier

Si votre site n'est pas à la racine (ex: `example.com/portfolio/`), vous devez modifier `vite.config.ts` :

```typescript
export default defineConfig({
  base: '/portfolio/', // Remplacez par votre chemin
  plugins: [react()],
  // ... reste de la config
})
```

Puis rebuilder : `npm run build`

## ⚠️ Points d'Attention

1. **Chemins relatifs** : Les fichiers dans `dist/` utilisent des chemins absolus (`/assets/...`). Si vous déployez dans un sous-dossier, configurez la `base` dans `vite.config.ts`

2. **Fichier .htaccess** : Assurez-vous qu'il est bien transféré avec les autres fichiers

3. **Permissions** : Les fichiers doivent avoir les permissions de lecture (644) et les dossiers (755)

4. **Taille des fichiers** : Vérifiez que votre hébergeur accepte les fichiers de la taille de vos assets

## 🐛 Dépannage

### Les pages ne se chargent pas (erreur 404)
- Vérifiez que le fichier `.htaccess` est bien présent
- Vérifiez la configuration `RewriteBase` si vous êtes dans un sous-dossier

### Les assets ne se chargent pas
- Vérifiez les chemins dans le navigateur (F12 > Network)
- Vérifiez que tous les fichiers du dossier `dist/` ont été transférés
- Vérifiez les permissions des fichiers

### Erreur de CORS
- Contactez votre hébergeur pour configurer les en-têtes CORS si nécessaire

## 📞 Support

Si vous rencontrez des problèmes, vérifiez :
1. Les logs d'erreur de votre hébergeur
2. La console du navigateur (F12)
3. La configuration de votre serveur web




