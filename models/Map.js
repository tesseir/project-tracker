const express = require("express");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


class Map extends Model {};
Map.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  project_id: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: 'Project',
    //   key: 'id',
    // },
    // onUpdate: 'CASCADE',
    // onDelete: 'SET NULL',
  },
}, {
  sequelize,
  timestamp: true,
  modelName: 'Map',
});
   console.log(`Map model connection =`)
console.log(Map === sequelize.models.map)
module.exports = Map