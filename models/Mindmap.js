const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


class Mindmap extends Model {}
Mindmap.init({
  name: DataTypes.STRING,
}, { sequelize, modelName: "Mindmap" });



module.exports = Mindmap