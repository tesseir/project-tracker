const router = require('express').Router();
const { User, Team, Project } = require('../models');
//connection signal
router.get('/', (req, res) => {
  res.json({message: 'reached controllers/getRoutes'})
})
//---------------------------------------------------------Users
//get all users
router.get('/user', async (req, res) => {
  const userData = await User.findAll().catch((err) => {
    res.json(err)
  });
  const users = userData.map((user) =>user.get({plain: true}))
  res.json({users})
})

//get a user
router.get('/user/:id', async (req, res) => {
  try {
    const userData = await User.findByPk(req.params.id);
    if(!userData) {
      res.status(404).json({message: 'no user with this id'})
      return;
    }
    const user = userData.get({plain: true});
    res.json({user})
  } catch (error) {
    res.status(505).json(err)
  }
})
/*
example response:
{
		"id": 1,
		"name": "John Doe",
		"email": "john.doe@example.com",
		"password": "password123",
		"createdAt": "2023-02-11T23:01:05.000Z",
		"updatedAt": "2023-02-11T23:01:05.000Z"
	},
*/
//---------------------------------------------------------Teams

//get all team
router.get('/team', async (req, res) => {
  const teamData = await Team.findAll().catch((err) => res.json(err));
  const teams = teamData.map((team) => team.get({plain: true}));
  res.json({teams})
  // res.render('teams', { teams });
})

router.get('/team/:id', async (req, res) => {
  try {
    const teamData = await Team.findByPk(req.params.id);
    if(!teamData){
      res.status(404).json({message: 'no team with that id'});
      return;
    }
    const team = teamData.get({plain: true});
    res.json({team})
  } catch (error) {
    res.status(500).json(error)
  }
})
/*
example response:
{
		"id": 1,
		"name": "Team A",
		"createdAt": "2023-02-11T23:01:05.000Z",
		"updatedAt": "2023-02-11T23:01:05.000Z"
	}
*/
//---------------------------------------------------------projects
//
//get all projects
router.get('/project', async (req, res) => {
  const projectData = await Project.findAll().catch((err) => res.json(err));

  const projects = projectData.map((project) => project.get({plain:true}));
  res.json({projects})
})

//get single project
 router.get('/project/:id', async (req, res) => {
  try {
    const projectData = await Project.findByPk(req.params.id);
    if (!projectData){
      res.status(404).json({message: 'no project by that id'});
    return;
    }
    const project = projectData.get({plain: true});
    res.json({project})
  } catch (error) {
    res.status(500).json(error)
  }
 })
/*
example:
	"project": {
		"id": 1,
		"name": "Project X",
		"createdAt": "2023-02-11T23:01:05.000Z",
		"updatedAt": "2023-02-11T23:01:05.000Z",
		"teamId": null
	}
*/

//get resources
router.get('/notebook', (req, res) => {
  res.json({message: 'reached notebook'})
})





module.exports = router;
