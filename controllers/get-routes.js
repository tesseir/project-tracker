const router = require('express').Router();
const { User, Team, Project, Mindmap, Node } = require('../models');
//connection signal
router.get('/', (req, res) => {
  res.json({ message: 'reached controllers/getRoutes' });
});

//get home
router.get('/', (req, res) => {
  res.json({ message: 'reached home' });
});

//get team
router.get('/team', (req, res) => {
  res.json({ message: 'reached controllers/getRoutes' });
});

//get project
router.get('/project', (req, res) => {
  res.json({ message: 'reached controllers/getRoutes' });
});

//get all mind maps
router.get('/mindmap', (req, res) => {
  const mindmap = Mindmap.findAll()
  


  res.json({mindmap});
});















router.get('/mindmap/:id', async (req, res) => {
  try {
    const mindmap = await Mindmap.findOne({
      where: { id: req.params.id },
      // include: [{ model: Node, as: "nodes", hierarchy: true }]
    });

    if (!mindmap) {
      return res.status(404).json({ message: "Mindmap not found" });
    }

    return res.status(200).json({ mindmap });
  } catch (err) {
    return res.status(500).json({ message: err });
  }
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
module.exports = router;
