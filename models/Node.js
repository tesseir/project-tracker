const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const Mindmap = require('./Mindmap');

class Node extends Model {}
Node.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    node_id: {
      type: DataTypes.STRING,
      unique: true,
    },
    topic: {
      type: DataTypes.STRING,
    },
    isroot: {
      type: DataTypes.BOOLEAN,
    },
    direction: {
      type: DataTypes.ENUM,
      values: ['left', 'center', 'right'],
    },
    expanded: DataTypes.BOOLEAN,
    data: DataTypes.JSON,
    mindmap_id: {
      type: DataTypes.INTEGER,
      references: {
        model: Mindmap,
        key: 'id',
      },
    },
    parentid: {
      type: DataTypes.STRING,
      references: {
        model: Node,
        key: 'node_id',
      },
    },
  },
  { sequelize, modelName: 'Node' }
);

module.exports = Node;
