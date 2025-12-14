# Restaurant Le Délice - Site Web Moderne

## 🎨 Description du Projet

Un site web gastronomique moderne et élégant pour le restaurant "Le Délice". Le design contemporain met en avant l'expérience culinaire avec une interface intuitive et responsive.

## ✨ Caractéristiques Principales

### Design Moderne
- **Palette de couleurs élégante** : Noir (#1a1a1a), Or (#d4af37), Marron (#8b7355)
- **Typographie raffinée** : Playfair Display (titres), Inter (corps de texte)
- **Animations fluides** : Transitions smooth et effet de défilement
- **Layout responsive** : Desktop, tablette et mobile optimisés

### Fonctionnalités
- ✅ Navigation sticky avec menu mobile
- ✅ Système de réservation avec validation complète
- ✅ Menu détaillé avec prix et descriptions
- ✅ Informations de contact et médias sociaux
- ✅ Stockage local des réservations (localStorage)
- ✅ Animation au défilement (Intersection Observer)
- ✅ Formulaires accessibles et validés

# Restaurant Le Délice — Documentation rapide

Ce dépôt contient un site vitrine moderne pour le restaurant **Le Délice**.

Langages et composants inclus
- `HTML5` (pages : `index.html`, `menu.html`)
- `CSS3` (`styles.css`, variables, responsive, animations)
- `JavaScript` client (`scripts.js`)
- `Node.js` + `Express` (optionnel) pour servir le site localement (`server.js`)
- Polices Google Fonts et Font Awesome pour les icônes

## 🔧 Langages Supplémentaires Intégrés

Pour démontrer l'utilisation de plusieurs langages de programmation, le projet inclut des scripts d'analyse des réservations dans différents langages :

### Python
- **Fichier** : `analyze_reservations.py`
- **Utilisation** : Analyse les réservations et affiche des statistiques.
- **Exécution** : `python analyze_reservations.py`
- **Intégration** : Accessible via l'API `/api/analyze` (appelle le script Python depuis Node.js)

### PHP
- **Fichier** : `php_index.php`
- **Utilisation** : Page d'accueil alternative générée par PHP.
- **Note** : Nécessite un serveur PHP (comme Apache) pour être exécuté.

### C#
- **Fichier** : `AnalyzeReservations.cs`
- **Utilisation** : Programme console pour analyser les réservations.
- **Exécution** : `dotnet run AnalyzeReservations.cs` (nécessite .NET SDK)

### Java
- **Fichier** : `AnalyzeReservations.java`
- **Utilisation** : Programme Java pour analyser les réservations.
- **Exécution** : `javac AnalyzeReservations.java && java AnalyzeReservations` (nécessite JDK et Gson library)

Ces scripts démontrent comment étendre les fonctionnalités du site avec d'autres langages de programmation.

Installation et exécution locale

1. Ouvrir PowerShell et se placer dans le dossier du projet :

```powershell
cd "C:\Users\KAMAGATE\Desktop\code"
```

2. Installer les dépendances Node (Express) :

```powershell
npm install
```

3. Démarrer le serveur local :

```powershell
npm start
# puis ouvrir http://localhost:3000
```

Sécuriser l'interface d'administration

Vous pouvez protéger l'interface admin en définissant une variable d'environnement `ADMIN_TOKEN`.

Exemple (PowerShell pour la session actuelle) :

```powershell
$env:ADMIN_TOKEN = "mon-token-securise"
npm start
```

Ou pour définir de manière permanente (Windows) :

```powershell
setx ADMIN_TOKEN "mon-token-securise"
```

Ensuite, pour accéder aux routes admin, fournissez le token via l'en-tête `x-admin-token: mon-token-securise` ou `?token=mon-token-securise`.


Fichiers importants
- `index.html` — page d'accueil
- `menu.html` — page présentant le menu complet
- `styles.css` — feuille de styles principale
- `scripts.js` — script client (navigation mobile, validation formulaire)
- `server.js` — serveur Express pour servir les fichiers statiques

Notes techniques
- Le serveur Express est minimal et sert tous les fichiers du dossier racine.
- Les icônes utilisent Font Awesome (CDN) et les polices via Google Fonts.
- Le formulaire de réservation utilise une validation côté client et peut stocker les réservations dans `localStorage`.

Bonnes pratiques
- Pour la production, utilisez un serveur static optimisé (Nginx, serve), minifiez les assets et configurez un process manager (pm2) si vous gardez `server.js`.

Licence
- © 2025 Restaurant Le Délice. Tous droits réservés.

Dernière mise à jour : 10 décembre 2025
