const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Mindmap extends Model {}
Mindmap.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    project_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Project',
        key: 'id',
      },
    },
  },
  { sequelize, modelName: 'Mindmap' }
);

module.exports = Mindmap;
