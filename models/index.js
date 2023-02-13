const User = require('./User')
const Team = require('./Team')
const Project = require('./Project')
const Mindmap = require('./Mindmap')
const Node = require('./Node')


// /*
// Team.hasMany(Users)

// */
Project.belongsTo(Team, {
  foreignKey: 'team_id',
  as: 'team'
})

Team.hasMany(User, {
  foreignKey: 'user_id',
  as: 'users'
})

Node.hasMany(Node, { as: 'children', foreignKey: 'parentId' });
Node.belongsTo(Node, { as: 'parent', foreignKey: 'parentId' });

