// //associations
const express = require("express");
const { Model, DataTypes } = require("sequelize");
const User = require('./User')
const Team = require('./Team')
const Project = require('./Project')
const Notebook = require('./Notebook')
const Note = require('./Note')
const Map = require('./Map')



module.exports = {
  User,
  Team,
  Project,
  Notebook,
  Note,
  Map
  
  
  }