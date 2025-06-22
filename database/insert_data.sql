-- Script d'insertion des données pour le projet "Trouve ton artisan"
-- Encodage: UTF-8

USE trouve_ton_artisan;

-- Suppression des tables si elles existent (dans l'ordre pour respecter les contraintes)
DROP TABLE IF EXISTS ArtisansTop;
DROP TABLE IF EXISTS Contacts;
DROP TABLE IF EXISTS Artisans;
DROP TABLE IF EXISTS Specialites;
DROP TABLE IF EXISTS Categories;

-- Insertion des catégories
INSERT INTO Categories (nom) VALUES
('Alimentation'),
('Bâtiment'),
('Services'),
('Fabrication');

-- Insertion des spécialités
INSERT INTO Specialites (nom, categorie_id) VALUES
('Boucher', (SELECT id FROM Categories WHERE nom = 'Alimentation')),
('Boulanger', (SELECT id FROM Categories WHERE nom = 'Alimentation')),
('Chocolatier', (SELECT id FROM Categories WHERE nom = 'Alimentation')),
('Traiteur', (SELECT id FROM Categories WHERE nom = 'Alimentation')),
('Chauffagiste', (SELECT id FROM Categories WHERE nom = 'Bâtiment')),
('Electricien', (SELECT id FROM Categories WHERE nom = 'Bâtiment')),
('Menuisier', (SELECT id FROM Categories WHERE nom = 'Bâtiment')),
('Plombier', (SELECT id FROM Categories WHERE nom = 'Bâtiment')),
('Bijoutier', (SELECT id FROM Categories WHERE nom = 'Fabrication')),
('Couturier', (SELECT id FROM Categories WHERE nom = 'Fabrication')),
('Ferronier', (SELECT id FROM Categories WHERE nom = 'Fabrication')),
('Coiffeur', (SELECT id FROM Categories WHERE nom = 'Services')),
('Fleuriste', (SELECT id FROM Categories WHERE nom = 'Services')),
('Toiletteur', (SELECT id FROM Categories WHERE nom = 'Services')),
('Webdesign', (SELECT id FROM Categories WHERE nom = 'Services'));

-- Insertion des artisans
INSERT INTO Artisans (nom, specialite_id, note, ville, a_propos, email, site_web) VALUES
('Boucherie Dumont', 
 (SELECT id FROM Specialites WHERE nom = 'Boucher'), 
 4.5, 
 'Lyon',
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id 
 volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
 'boucherie.dumont@gmail.com',
 NULL),

('Au pain chaud',
 (SELECT id FROM Specialites WHERE nom = 'Boulanger'),
 4.8,
 'Montélimar',
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id 
 volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
 'aupainchaud@hotmail.com',
 NULL),

('Chocolaterie Labbé',
 (SELECT id FROM Specialites WHERE nom = 'Chocolatier'),
 4.9,
 'Lyon',
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id 
 volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
 'chocolaterie-labbe@gmail.com',
 'https://chocolaterie-labbe.fr'),

('Traiteur Truchon',
 (SELECT id FROM Specialites WHERE nom = 'Traiteur'),
 4.1,
 'Lyon',
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id 
 volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
 'contact@truchon-traiteur.fr',
 'https://truchon-traiteur.fr'),

('Orville Salmons',
 (SELECT id FROM Specialites WHERE nom = 'Chauffagiste'),
 5.0,
 'Lyon',
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id 
 volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
 'o-salmons@live.com',
 NULL),

('Mont Blanc Electricité',
 (SELECT id FROM Specialites WHERE nom = 'Electricien'),
 4.5,
 'Chamonix',
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id 
 volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
 'contact@mont-blanc-electricite.com',
 'https://mont-blanc-electricite.com'),

('Boutot & fils',
 (SELECT id FROM Specialites WHERE nom = 'Menuisier'),
 4.7,
 'Bourg-en-Bresse',
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id 
 volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
 'boutot.menuiserie@gmail.com',
 'https://boutot-menuiserie.com'),

('Vallis Bellemare',
 (SELECT id FROM Specialites WHERE nom = 'Plombier'),
 4.0,
 'Vienne',
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id 
 volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
 'v.bellemare@gmail.com',
 'https://plomberie-bellemare.com'),

('Claude Quinn',
 (SELECT id FROM Specialites WHERE nom = 'Bijoutier'),
 4.2,
 'Aix-les-Bains',
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id 
 volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
 'claude.quinn@gmail.com',
 NULL),

('Amitée Lécuyer',
 (SELECT id FROM Specialites WHERE nom = 'Couturier'),
 4.5,
 'Annecy',
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id 
 volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
 'a.amitee@ghotmail.com',
 'https://lecuyer-couture.com'),

('Ernest Carigan',
 (SELECT id FROM Specialites WHERE nom = 'Ferronier'),
 5.0,
 'Le Puy-en-Velay',
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id 
 volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
 'e-carigan@hotmail.com',
 NULL),

('Royden Charbonneau',
 (SELECT id FROM Specialites WHERE nom = 'Coiffeur'),
 3.8,
 'Saint-Priest',
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id 
 volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
 'r.charbonneau@gmail.com',
 NULL),

('Leala Dennis',
 (SELECT id FROM Specialites WHERE nom = 'Coiffeur'),
 3.8,
 'Chambéry',
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id 
 volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
 'l.dennis@hotmail.fr',
 'https://coiffure-leala-chambery.fr'),

("C'est sup'hair",
 (SELECT id FROM Specialites WHERE nom = 'Coiffeur'),
 4.1,
 'Romans-sur-Isère',
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id 
 volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
 'sup-hair@gmail.com',
 'https://sup-hair.fr'),

('Le monde des fleurs',
 (SELECT id FROM Specialites WHERE nom = 'Fleuriste'),
 4.6,
 'Annonay',
 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id 
 volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
 'contact@le-monde-des-fleurs-annonay.fr',
 'https://le-monde-des-fleurs-annonay.fr'),

('Valérie Laderoute',
 (SELECT id FROM Specialites WHERE nom = 'Toiletteur'),
 4.5,
 'Valence',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id 
 volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
 'v-laderoute@gmail.com',
 NULL),

('CM Graphisme',
 (SELECT id FROM Specialites WHERE nom = 'Webdesign'),
 4.4,
 'Valence',
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus eleifend ante sem, id 
 volutpat massa fermentum nec. Praesent volutpat scelerisque mauris, quis sollicitudin tellus sollicitudin. ',
 'contact@cm-graphisme.com',
 'https://cm-graphisme.com');

-- Insertion des premiers artisans du mois avec sélection manuelle
INSERT INTO ArtisansTop (artisan_id, date_debut, date_fin, derniere_selection, nombre_selections)
SELECT 
    id,
    DATE_FORMAT(CURRENT_DATE, '%Y-%m-01'),
    LAST_DAY(CURRENT_DATE),
    CURRENT_DATE,
    1
FROM Artisans
WHERE nom IN (
    'Chocolaterie Lahalle',
    'Au pain chaud',
    'Boucherie Dumont'
);
