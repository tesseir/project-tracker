const User = require('./User');
const Team = require('./Team');
const Project = require('./Project');
const Mindmap = require('./Mindmap');
const Node = require('./Node');

// /*
// Team.hasMany(Users)

// */
Project.belongsTo(Team, {
  foreignKey: 'team_id',
  as: 'team',
  onDelete: 'set null',
});

Team.hasMany(User, {
  foreignKey: 'user_id',
  as: 'users',
  onDelete: 'cascade',
});

User.belongsTo(Team, {
  foreignKey: 'team_id',
  as: 'team',
  onDelete: 'set null',
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
  Team,
  Project,
  Mindmap,
  Node,
};
