const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


class Mindmap extends Model {}
Mindmap.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name:{
    type: DataTypes.STRING
  }
}, 
{ sequelize,
  modelName: "Mindmap" });



module.exports = Mindmap