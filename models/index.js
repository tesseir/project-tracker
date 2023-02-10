const { User, Team, Project } = require('../models');
//associations

/*
Team.hasMany(Users)

*/
Project.belongsTo(team, {
  foreignKey: 'team_id',
  as: 'team'
})

Team.hasMany(User, {
  foreignKey: 'user_id',
  as: 'users'
})


