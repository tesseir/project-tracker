const express = require("express");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");


class Notebook extends Model {};
Notebook.init({
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
  modelName: 'Notebook',
});

   console.log(`Notebook model connection =`)
console.log(Notebook === sequelize.models.Notebook)
module.exports = Notebook