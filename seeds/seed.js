const {User, Team, Project} = require('../models')

const users = [
  {
    name: "John Doe",
    email: "john.doe@example.com",
    password: "password123"
  },
  {
    name: "Jane Doe",
    email: "jane.doe@example.com",
    password: "password456"
  }
];

const teams = [
  {
    name: "Team A"
  },
  {
    name: "Team B"
  }
];

const projects = [
  {
    name: "Project X",
    TeamId: 1
  },
  {
    name: "Project Y",
    TeamId: 2
  }
];

const seedData = async () => {
  await User.bulkCreate(users);
  await Team.bulkCreate(teams);
  await Project.bulkCreate(projects);
};

seedData().catch(console.error);
