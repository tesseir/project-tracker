const express = require("express");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Note extends Model {};
Note.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    references: {
      model: 'User',
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  notebook_id: {
    type: DataTypes.INTEGER,
    // references: {
    //   model: 'Notebook',
    //   key: 'id',
    // },
    // onUpdate: 'CASCADE',
    // onDelete: 'SET NULL',
  },
  content: DataTypes.STRING
}, {
  sequelize,
  timestamp: true,
  modelName: 'Note',
});

   console.log(`Note model connection =`)
console.log(Note === sequelize.models.note)
module.exports = Note