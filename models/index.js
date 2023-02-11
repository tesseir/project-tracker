// //associations
const express = require("express");
const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

  



class User extends Model {}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "user" }
);

class Team extends Model {}
Team.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "team" }
);

class Project extends Model {}
Project.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  { sequelize, modelName: "project" }
);

User.belongsToMany(Team, { through: "UserTeam" });
Team.belongsToMany(User, { through: "UserTeam" });
Project.belongsTo(Team);



module.exports = { User, Team, Project };