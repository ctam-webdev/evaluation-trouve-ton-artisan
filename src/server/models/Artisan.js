import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Artisan = sequelize.define('artisans', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nom: {
    type: DataTypes.STRING
  },
  note: {
    type: DataTypes.STRING
  },
  ville: {
    type: DataTypes.STRING
  },
  a_propos: {
    type: DataTypes.TEXT
  },
  email: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  },
  site_web: {
    type: DataTypes.STRING
  },
  specialite_id: {
    type: DataTypes.INTEGER
  }
}, {
  tableName: 'artisans',
  freezeTableName: true,
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

export default Artisan;
