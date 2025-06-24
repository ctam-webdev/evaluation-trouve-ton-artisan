import express from 'express';
import cors from 'cors';
import { Sequelize, DataTypes, Op } from 'sequelize';

const app = express();
app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Accept'],
  maxAge: 600 // 10 minutes
}));
app.use(express.json());

// Configuration de la base de données
import sequelize from './database.js';
import Artisan from './Artisan.js';

// Définition des modèles

const Categorie = sequelize.define('Categorie', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: DataTypes.STRING
}, {
  tableName: 'categories',
  timestamps: false
});

const Specialite = sequelize.define('Specialite', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: DataTypes.STRING,
  categorie_id: DataTypes.INTEGER
}, {
  tableName: 'specialites',
  timestamps: false
});

// Relations
Categorie.hasMany(Specialite, { foreignKey: 'categorie_id' });
Specialite.belongsTo(Categorie, { foreignKey: 'categorie_id' });
Artisan.belongsTo(Specialite, { foreignKey: 'specialite_id' });
Specialite.hasMany(Artisan, { foreignKey: 'specialite_id' });

// Test de connexion
sequelize.authenticate()
  .then(() => {
    console.log('✓ Base de données connectée');
  })
  .catch(err => console.error('✗ Erreur de connexion DB:', err));

// Route pour obtenir les catégories et leurs spécialités
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Categorie.findAll({
      include: [{
        model: Specialite,
        attributes: ['id', 'nom']
      }],
      attributes: ['id', 'nom']
    });
    res.json(categories);
  } catch (error) {
    console.error('✗ Erreur catégories:', error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour obtenir la liste de tous les artisans
app.get('/api/artisans', async (req, res) => {
  const { specialite, categorie } = req.query;
  try {
    const whereClause = {};
    const includeClause = [{
      model: Specialite,
      attributes: ['nom', 'categorie_id'],
      where: {}
    }];

    // Filtre par spécialité
    if (specialite) {
      whereClause.specialite_id = specialite;
    }

    // Filtre par catégorie
    if (categorie) {
      includeClause[0].where.categorie_id = categorie;
    }
    const artisans = await Artisan.findAll({
      where: whereClause,
      include: includeClause
    });
    
    const formattedArtisans = artisans.map(artisan => ({
      id: artisan.id,
      nom: artisan.nom,
      note: artisan.note,
      ville: artisan.ville,
      description: artisan.a_propos,
      email: artisan.email,
      image: artisan.image,
      site_web: artisan.site_web,
      specialite_id: artisan.specialite_id,
      specialite: artisan.Specialite ? artisan.Specialite.nom : null
    }));
    res.json(formattedArtisans);
  } catch (error) {
    console.error('✗ Erreur artisans:', error.message);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour obtenir un artisan par son ID
app.get('/api/artisans/:id', async (req, res) => {
  try {
    const artisan = await Artisan.findByPk(req.params.id, {
      include: [{
        model: Specialite,
        attributes: ['nom']
      }]
    });
    if (!artisan) {
      return res.status(404).json({ message: 'Artisan non trouvé' });
    }
    res.json({
      id: artisan.id,
      nom: artisan.nom,
      note: artisan.note,
      ville: artisan.ville,
      a_propos: artisan.a_propos,
      email: artisan.email,
      image: artisan.image,
      site_web: artisan.site_web,
      specialite_id: artisan.specialite_id,
      specialite: artisan.Specialite ? artisan.Specialite.nom : null
    });
  } catch (error) {
    console.error('✗ Erreur détail artisan:', error.message);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'artisan' });
  }
});

// Fonction de validation d'email
const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

// Fonction de validation de téléphone (optionnel)
const isValidPhone = (phone) => {
  if (!phone) return true; // Optionnel
  const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
  return phoneRegex.test(phone);
};

// Map pour suivre les tentatives par IP
const contactAttempts = new Map();

// Fonction de validation anti-XSS basique
const containsScript = (text) => {
  const scriptPattern = /<script[^>]*>|<\/script>|javascript:|onerror=|onload=|onclick=/i;
  return scriptPattern.test(text);
};

// Fonction d'échappement HTML basique
const escapeHtml = (text) => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};

// Route pour envoyer un message à un artisan
app.post('/api/contact', async (req, res) => {
  try {
    const { artisanId, artisanNom, nom, email, telephone, objet, message } = req.body;
    const clientIP = req.ip;

    // Vérification des tentatives
    const now = Date.now();
    const attempts = contactAttempts.get(clientIP) || [];
    const recentAttempts = attempts.filter(time => now - time < 3600000); // 1 heure

    if (recentAttempts.length >= 5) {
      return res.status(429).json({
        success: false,
        message: 'Trop de tentatives. Veuillez réessayer plus tard.'
      });
    }

    // Validation complète
    if (!artisanId || !nom || !email || !objet || !message) {
      return res.status(400).json({
        success: false,
        message: 'Tous les champs obligatoires doivent être remplis'
      });
    }

    // Validation des formats
    if (nom.length < 2 || nom.length > 50) {
      return res.status(400).json({
        success: false,
        message: 'Le nom doit contenir entre 2 et 50 caractères'
      });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({
        success: false,
        message: 'Format d\'email invalide'
      });
    }

    if (telephone && !isValidPhone(telephone)) {
      return res.status(400).json({
        success: false,
        message: 'Format de téléphone invalide'
      });
    }

    if (objet.length < 5 || objet.length > 50) {
      return res.status(400).json({
        success: false,
        message: 'L\'objet doit contenir entre 5 et 50 caractères'
      });
    }

    if (message.length < 10 || message.length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Le message doit contenir entre 10 et 1000 caractères'
      });
    }

    // Vérification anti-XSS
    if (containsScript(message) || containsScript(objet)) {
      return res.status(400).json({
        success: false,
        message: 'Contenu non autorisé détecté'
      });
    }

    // Échappement HTML
    const safeMessage = escapeHtml(message);
    const safeObjet = escapeHtml(objet);
    const safeNom = escapeHtml(nom);

    // Vérifier que l'artisan existe
    const artisan = await Artisan.findByPk(artisanId);
    if (!artisan) {
      return res.status(404).json({ 
        success: false, 
        message: 'Artisan non trouvé' 
      });
    }

    // TODO: Envoyer un email à l'artisan
    // Pour l'instant, on simule juste un délai
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Enregistrer la tentative
    contactAttempts.set(clientIP, [...recentAttempts, now]);

    // Réponse de succès avec headers de sécurité
    res.set({
      'Content-Security-Policy': "default-src 'self'",
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block'
    }).json({
      success: true,
      message: 'Message envoyé avec succès'
    });
  } catch (error) {
    console.error('✗ Erreur envoi message:', error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Erreur lors de l\'envoi du message' 
    });
  }
});

// Route de recherche avec suggestions
app.get('/api/suggest', async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.length < 2) {
      return res.json({ specialites: [], suggestions: [], count: 0 });
    }

    // Recherche des spécialités correspondantes
    const specialites = await Specialite.findAll({
      where: {
        nom: { [Op.like]: `%${query}%` }
      }
    });

    const artisans = await Artisan.findAll({
      where: {
        [Op.or]: [
          { nom: { [Op.like]: `%${query}%` } },
          { ville: { [Op.like]: `%${query}%` } },
          { '$Specialite.nom$': { [Op.like]: `%${query}%` } }
        ]
      },
      include: [{
        model: Specialite,
        attributes: ['nom'],
        required: false
      }]
    });

    res.json({
      specialites: specialites.map(spec => ({
        id: spec.id,
        nom: spec.nom,
        type: 'specialite'
      })),
      suggestions: artisans.slice(0, 5).map(artisan => ({
        id: artisan.id,
        nom: artisan.nom,
        ville: artisan.ville,
        specialite: artisan.Specialite?.nom
      })),
      count: artisans.length
    });
  } catch (error) {
    console.error('✗ Erreur suggestions:', error.message);
    res.status(500).json({ message: 'Erreur lors de la recherche des suggestions' });
  }
});

// Route de recherche
app.get('/api/search', async (req, res) => {
  try {
    const { query } = req.query;
    const artisans = await Artisan.findAll({
      where: {
        [Op.or]: [
          { nom: { [Op.like]: `%${query}%` } },
          { ville: { [Op.like]: `%${query}%` } },
          { '$Specialite.nom$': { [Op.like]: `%${query}%` } }
        ]
      },
      include: [{
        model: Specialite,
        attributes: ['nom']
      }]
    });

    const formattedArtisans = artisans.map(artisan => ({
      id: artisan.id,
      nom: artisan.nom,
      note: artisan.note,
      ville: artisan.ville,
      description: artisan.a_propos,
      email: artisan.email,
      image: artisan.image,
      site_web: artisan.site_web,
      specialite_id: artisan.specialite_id,
      specialite: artisan.Specialite ? artisan.Specialite.nom : null
    }));

    res.json(formattedArtisans);
  } catch (error) {
    console.error('✗ Erreur recherche:', error.message);
    res.status(500).json({ message: 'Erreur lors de la recherche des artisans' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`✓ Serveur prêt sur :${PORT}`);
});