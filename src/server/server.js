import express from 'express';
import cors from 'cors';
const app = express();

app.use(cors());

// Route pour la page d'accueil - artisans du mois
app.get('/api/artisans/mois', (req, res) => {
  // TODO: Remplacer par les vraies données
  res.json([
    { id: 1, nom: 'Amitée Lecuyer', specialite: 'Boulangerie', localisation: 'Lyon', note: 4.5 },
    { id: 2, nom: 'Claude Quinn', specialite: 'Plomberie', localisation: 'Grenoble', note: 5 },
    { id: 3, nom: 'Boucherie Dumont', specialite: 'Boucherie', localisation: 'Saint-Étienne', note: 4.8 }
  ]);
});

// Route pour la fiche artisan
app.get('/api/artisans/:id', (req, res) => {
  // TODO: Remplacer par les vraies données
  res.json({
    id: req.params.id,
    nom: 'Amitée Lecuyer',
    specialite: 'Boulangerie',
    localisation: 'Lyon',
    note: 4.5,
    description: 'Artisan boulanger depuis 15 ans...',
    email: 'contact@boulangerie-lecuyer.fr',
    image: 'img-amitee-lecuyer.jpg'
  });
});

app.listen(3001, () => {
  console.log('Serveur démarré sur le port 3001');
});
