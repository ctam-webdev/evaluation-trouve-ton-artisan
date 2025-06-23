import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

async function initDatabase() {
  try {
    // Vérification de la connexion MySQL
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD
    });

    // S'assurer que la base de données existe
    await connection.query(`CREATE DATABASE IF NOT EXISTS ${process.env.DB_NAME}`);
    await connection.end();

    // Créer la connexion Sequelize
    const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
      host: process.env.DB_HOST,
      dialect: 'mysql',
      logging: (msg) => console.log('SQL:', msg)
    });

    // Tester la connexion
    await sequelize.authenticate();
    console.log('Connexion à la base de données réussie.');

    // Vérifier la base et la table
    const [results] = await sequelize.query('SHOW TABLES');
    console.log('Tables dans la base de données:', results);

    return sequelize;
  } catch (error) {
    console.error('Erreur d\'initialisation de la base de données:', error);
    throw error;
  }
}

const sequelize = await initDatabase();
export default sequelize;
