const User = require('./User');

const Project = require('./Project');
const Mindmap = require('./Mindmap');
const Node = require('./Node');

// /*
// Team.hasMany(Users)

// */
Project.belongsTo(User, {
  foreignKey: 'user_id',
  as: 'user',
  onDelete: 'set null',
});

User.hasMany(Project, {
  foreignKey: 'user_id',
  as: 'projects',
  onDelete: 'cascade',
});



Project.hasMany(Mindmap, {
  foreignKey: 'project_id',
  as: 'mindmaps',
  onDelete: 'cascade',
});

Mindmap.belongsTo(Project, {
  foreignKey: 'project_id',
  as: 'project',
  onDelete: 'set null',
});

Mindmap.hasMany(Node, {
  foreignKey: 'mindmap_id',
  as: 'nodes',
  onDelete: 'cascade',
});

Node.belongsTo(Mindmap, {
  foreignKey: 'mindmap_id',
  as: 'mindmap',
  onDelete: 'set null',
});

Node.hasMany(Node, {
  foreignKey: 'parentid',
  as: 'children',
  onDelete: 'cascade',
});

Node.belongsTo(Node, {
  foreignKey: 'parentid',
  as: 'parent',
  onDelete: 'set null',
});

module.exports = {
  User,
  Project,
  Mindmap,
  Node,
};
