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

2. Installer et configurer XAMPP
   - Télécharger XAMPP depuis [https://www.apachefriends.org/](https://www.apachefriends.org/)
   - Installer XAMPP (choisir C:\xampp comme dossier d'installation recommandé)
   - Lancer XAMPP Control Panel
   - Démarrer les services Apache et MySQL

3. Importer la base de données
   - Ouvrir [http://localhost/phpmyadmin](http://localhost/phpmyadmin)
   - Créer une nouvelle base de données nommée `trouve_ton_artisan`
   - Sélectionner la base de données
   - Cliquer sur l'onglet 'Importer'
   - Importer dans l'ordre :
     1. `database/create_tables.sql`
     2. `database/insert_data.sql`

## Structure du projet

```
trouve-ton-artisan/
├── database/           # Scripts SQL
│   ├── create_tables.sql
│   └── insert_data.sql
└── README.md
```

## Fonctionnalités principales

- [x] Structure de base de données
  - [x] Tables relationnelles
  - [x] Contraintes d'intégrité
  - [x] Données de test
  - [x] Système d'artisans du mois
- [ ] Backend Node.js/Express (à venir)
- [ ] Frontend React (à venir)
- [ ] Déploiement (à venir)

## Sécurité

- Protection contre les injections SQL
- Validation des données
- Encodage des sorties (XSS)
- Protection des formulaires
- Structure sécurisée du projet

## License

Ce projet est sous license MIT.
