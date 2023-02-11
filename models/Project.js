const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
class Project extends Model {};
Project.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  // team_id: {
  //   type: DataTypes.INTEGER,
  //   references: {
  //     model: 'Team',
  //     key: 'id',
  //   },
  //   onUpdate: 'CASCADE',
  //   onDelete: 'SET NULL',
  // },
  Project_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: true,
  freezeTableName: true,
  underscored: true,
  modelName: 'Project',
});
console.log(`Project model connection =`)
console.log(Project === sequelize.models.Project)
module.exports = Project