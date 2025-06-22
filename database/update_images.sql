-- Script d'ajout des images pour les artisans
USE trouve_ton_artisan;

-- Ajout de la colonne image si elle n'existe pas
ALTER TABLE Artisans
ADD COLUMN IF NOT EXISTS image VARCHAR(255) DEFAULT NULL AFTER email;

-- Mise à jour des images pour chaque artisan
UPDATE Artisans SET image = 'img-amitee-lecuyer.jpg' WHERE nom = 'Amitée Lécuyer';
UPDATE Artisans SET image = 'img-au-pain-chaud.jpg' WHERE nom = 'Au pain chaud';
UPDATE Artisans SET image = 'img-boucherie-dumont.jpg' WHERE nom = 'Boucherie Dumont';
UPDATE Artisans SET image = 'img-boutot-et-fils.jpg' WHERE nom = 'Boutot & fils';
UPDATE Artisans SET image = 'img-cest-sup-hair.jpg' WHERE nom = "C'est sup'hair";
UPDATE Artisans SET image = 'img-chocolaterie-labbe.jpg' WHERE nom = 'Chocolaterie Labbé';
UPDATE Artisans SET image = 'img-claude-quinn.jpg' WHERE nom = 'Claude Quinn';
UPDATE Artisans SET image = 'img-cm-graphisme.jpg' WHERE nom = 'CM Graphisme';
UPDATE Artisans SET image = 'img-ernest-carigan.jpg' WHERE nom = 'Ernest Carigan';
UPDATE Artisans SET image = 'img-laela-dennis.jpg' WHERE nom = 'Leala Dennis';
UPDATE Artisans SET image = 'img-le-monde-des-fleurs.jpg' WHERE nom = 'Le monde des fleurs';
UPDATE Artisans SET image = 'img-mont-blanc-electricite.jpg' WHERE nom = 'Mont Blanc Electricité';
UPDATE Artisans SET image = 'img-orville-salmons.jpg' WHERE nom = 'Orville Salmons';
UPDATE Artisans SET image = 'img-royden-charbonneau.jpg' WHERE nom = 'Royden Charbonneau';
UPDATE Artisans SET image = 'img-traiteur-truchon.jpg' WHERE nom = 'Traiteur Truchon';
UPDATE Artisans SET image = 'img-valerie-laderoute.jpg' WHERE nom = 'Valérie Laderoute';
UPDATE Artisans SET image = 'img-vallis-bellemare.jpg' WHERE nom = 'Vallis Bellemare';

-- Vérification que toutes les images ont été mises à jour
SELECT nom, image 
FROM Artisans 
WHERE image IS NULL;
