import express from 'express';
import cors from 'cors';
import { Sequelize, DataTypes, Op } from 'sequelize';

const app = express();
app.use(cors());
app.use(express.json());

// Configuration de la base de données
const sequelize = new Sequelize('trouve_ton_artisan', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// Définition des modèles
const Artisan = sequelize.define('artisans', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: DataTypes.STRING,
  note: DataTypes.FLOAT,
  ville: DataTypes.STRING,
  a_propos: DataTypes.TEXT,
  email: DataTypes.STRING,
  image: DataTypes.STRING,
  site_web: DataTypes.STRING,
  specialite_id: DataTypes.INTEGER
}, {
  tableName: 'artisans',
  timestamps: false
});

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
    console.log('Connexion à la base de données réussie.');
    sequelize.query('SHOW TABLES').then(([results]) => {
      console.log('Tables dans la base de données:', results);
    });
  })
  .catch(err => console.error('Erreur de connexion:', err));

// Middleware de logging
app.use((req, res, next) => {
  console.log('\n=== NOUVELLE REQUÊTE ===');
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  console.log('Headers:', req.headers);
  next();
});

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
    console.error('Erreur lors de la récupération des catégories:', error);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

// Route pour obtenir la liste de tous les artisans
app.get('/api/artisans', async (req, res) => {
  const { specialite } = req.query;
  try {
    const where = {};
    if (specialite) {
      where.specialite_id = specialite;
    }
    const artisans = await Artisan.findAll({
      where,
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
    console.error('Erreur lors de la récupération des artisans:', error);
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
    console.error('Erreur lors de la récupération:', error);
    res.status(500).json({ message: 'Erreur lors de la récupération de l\'artisan' });
  }
});

// Routes de recherche et suggestions
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
    console.error('Erreur lors des suggestions:', error);
    res.status(500).json({ message: 'Erreur lors de la recherche des suggestions' });
  }
});

// Route de recherche
app.get('/api/search', async (req, res) => {
  try {
    const { query } = req.query;
    console.log('Recherche pour:', query);

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

    console.log('Résultats trouvés:', artisans.length);
    res.json(formattedArtisans);
  } catch (error) {
    console.error('Erreur lors de la recherche:', error);
    res.status(500).json({ message: 'Erreur lors de la recherche des artisans' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});
