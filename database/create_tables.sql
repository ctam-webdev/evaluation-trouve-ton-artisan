-- Script de création des tables pour le projet "Trouve ton artisan"
-- Encodage: UTF-8

-- Suppression des tables si elles existent déjà
DROP TABLE IF EXISTS ArtisansTop;
DROP TABLE IF EXISTS Contacts;
DROP TABLE IF EXISTS Artisans;
DROP TABLE IF EXISTS Specialites;
DROP TABLE IF EXISTS Categories;

-- Création de la base de données si elle n'existe pas
CREATE DATABASE IF NOT EXISTS trouve_ton_artisan
CHARACTER SET utf8mb4
COLLATE utf8mb4_unicode_ci;

USE trouve_ton_artisan;

-- Table des catégories
CREATE TABLE Categories (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_categorie_nom (nom)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des spécialités
CREATE TABLE Specialites (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    categorie_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (categorie_id) REFERENCES Categories(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    UNIQUE KEY unique_specialite_par_categorie (nom, categorie_id),
    INDEX idx_specialite_nom (nom)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des artisans
CREATE TABLE Artisans (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(200) NOT NULL,
    note DECIMAL(2,1) NOT NULL CHECK (note >= 0 AND note <= 5),
    ville VARCHAR(100) NOT NULL,
    a_propos TEXT NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    site_web VARCHAR(255) DEFAULT NULL,
    specialite_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (specialite_id) REFERENCES Specialites(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_artisan_nom (nom),
    INDEX idx_artisan_ville (ville),
    INDEX idx_artisan_note (note)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des contacts
CREATE TABLE Contacts (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    objet VARCHAR(200) NOT NULL,
    message TEXT NOT NULL,
    date_envoi TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('nouveau', 'lu', 'répondu') DEFAULT 'nouveau',
    artisan_id INT NOT NULL,
    FOREIGN KEY (artisan_id) REFERENCES Artisans(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    INDEX idx_contact_statut (statut),
    INDEX idx_contact_date (date_envoi)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Table des artisans du mois
CREATE TABLE ArtisansTop (
    id INT PRIMARY KEY AUTO_INCREMENT,
    artisan_id INT NOT NULL,
    date_debut DATE NOT NULL,
    date_fin DATE NOT NULL,
    derniere_selection DATE NOT NULL,
    nombre_selections INT DEFAULT 1,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (artisan_id) REFERENCES Artisans(id) ON DELETE RESTRICT ON UPDATE CASCADE,
    CHECK (date_fin >= date_debut),
    INDEX idx_artisan_top_dates (date_debut, date_fin),
    INDEX idx_derniere_selection (derniere_selection)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- Ajout de triggers pour vérifier les contraintes métier
DELIMITER //

-- Empêcher un artisan d'être sélectionné deux mois consécutifs
CREATE TRIGGER before_insert_artisan_top
BEFORE INSERT ON ArtisansTop
FOR EACH ROW
BEGIN
    DECLARE last_selection DATE;
    
    SELECT MAX(date_fin)
    INTO last_selection
    FROM ArtisansTop
    WHERE artisan_id = NEW.artisan_id;
    
    IF last_selection IS NOT NULL AND DATEDIFF(NEW.date_debut, last_selection) < 30 THEN
        SIGNAL SQLSTATE '45000'
        SET MESSAGE_TEXT = 'Un artisan ne peut pas être sélectionné deux mois consécutifs';
    END IF;
END //

DELIMITER ;
