# Trouve ton artisan

Plateforme de mise en relation entre artisans et particuliers pour la région Auvergne Rhône-Alpes.

## Description

Cette application permet aux particuliers de :
- Rechercher des artisans par catégorie et spécialité
- Consulter les fiches détaillées des artisans
- Contacter directement les artisans via un formulaire
- Découvrir les artisans du mois

## Technologies utilisées

Conformément aux exigences du projet :

### Maquettage
- Figma

### Frontend
- ReactJS
- Bootstrap
- Sass

### Backend (API)
- Node.js
- Express avec Sequelize
- XAMPP (MySQL/MariaDB)

### Outils
- Visual Studio Code
- Git et GitHub pour le versionning

## Prérequis

- Node.js (v18 ou supérieur)
- XAMPP (avec MySQL/MariaDB)

## Installation

1. Cloner le dépôt
```bash
git clone https://github.com/ctam-webdev/evaluation-trouve-ton-artisan.git
cd trouve-ton-artisan
```

2. Installer les dépendances
```bash
npm install
```

3. Configurer les variables d'environnement
```bash
cp .env.example .env
# Modifier les valeurs dans .env si nécessaire
```

4. Installer et configurer XAMPP
   - Télécharger XAMPP depuis [https://www.apachefriends.org/](https://www.apachefriends.org/)
   - Installer XAMPP (choisir C:\xampp comme dossier d'installation recommandé)
   - Lancer XAMPP Control Panel
   - Démarrer les services Apache et MySQL

5. Importer la base de données
   - Ouvrir [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
   - Créer une nouvelle base de données nommée `trouve_ton_artisan`
   - Sélectionner la base de données
   - Cliquer sur l'onglet 'Importer'
   - Importer dans l'ordre :
     1. `database/create_tables.sql`
     2. `database/insert_data.sql`

6. Démarrer l'application
```bash
npm run dev
```

L'application sera disponible sur :
- Frontend : [http://localhost:3000](http://localhost:3000)
- Backend API : [http://localhost:3001](http://localhost:3001)

## Structure du projet

```
artisan/
├── database/           # Scripts SQL
│   ├── create_tables.sql
│   ├── insert_data.sql
│   └── update_images.sql
├── public/            # Assets statiques
│   └── img/           # Images des artisans
├── src/
│   ├── client/        # Frontend React
│   │   ├── components/# Composants réutilisables
│   │   ├── pages/     # Pages de l'application
│   │   └── styles/    # Fichiers SCSS
│   ├── server/        # Backend Node.js/Express
│   │   ├── Artisan.js # Modèle Artisan
│   │   ├── database.js# Configuration DB
│   │   └── routes.js  # Routes API
│   └── index.js       # Point d'entrée
├── .env               # Variables d'environnement
└── package.json       # Dépendances
```

## Fonctionnalités principales

- [x] Structure de base de données
  - [x] Tables relationnelles
  - [x] Contraintes d'intégrité
  - [x] Données de test
  - [x] Système d'artisans du mois
- [x] Backend Node.js/Express
  - [x] API RESTful
  - [x] Validation des données
  - [x] Protection contre les injections SQL
  - [x] Gestion des erreurs
- [x] Frontend React
  - [x] Interface responsive
  - [x] Composants réutilisables
  - [x] Routage dynamique
  - [x] Formulaires avec validation
  - [x] Design moderne et professionnel

## Notes importantes

1. Les liens du footer (CGU, Mentions légales, etc.) mènent à une page "En construction" car ils ne font pas partie du livrable attendu pour cette évaluation.

2. L'application est disponible en ligne à l'adresse : [https://jovial-crepe-0cfe1d.netlify.app](https://jovial-crepe-0cfe1d.netlify.app)
   La version de production inclut :
   - Configuration sécurisée du serveur
   - Système de logs en place
   - Certificat HTTPS
   - Optimisations de performance

## Sécurité

- Protection contre les injections SQL
- Validation des données
- Encodage des sorties (XSS)
- Protection des formulaires
- Structure sécurisée du projet

## License

Ce projet est sous license MIT.