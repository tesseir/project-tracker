const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");



class Team extends Model {};
Team.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  timestamps: true,
  }
 
)
console.log(`Team model connection =`)
console.log( Team=== sequelize.models.Team)
module.exports = Team