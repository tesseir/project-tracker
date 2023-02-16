const router = require('express').Router();
const { User, Team, Project } = require('../../models');
//---------------User----------------
//login

router.post('/login', async (req, res) => {
  try {
    const dbUser = await User.findOne({
      where: {
        username: req.body.username,
      },
    });
    //if email doesn't exist in db
    if (!dbUser) {
      res.status(400).json({ message: 'incorrect username' });
      return;
    }
    //compare password
    //will add bcrypt compare
    const validPassword = dbUser.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({ message: 'invalid password' });
      return;
    }
    //if password matches, then user data is saved in session store
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = dbUser.id;
      req.session.username = dbUser.username;
      res.status(200).json({ user: dbUser, message: 'you are now logged in' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

//logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).json({ message: 'logged out' }).end();
    });
  } else {
    res.status(404).end();
  }
});
//signup

router.post('/signup', async (req, res) => {
  try {
    const newUser = User.create({
      username: req.body.username,
      password: req.body.password,
    });

    console.log('newUser', newUser);
    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.user_id = newUser.id;
      req.session.username = newUser.username;
      res.status(200).json({ user: newUser, message: 'you are now logged in' });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

//update user

//-------------Team-------------------
//create team
router.post('/team', async (req, res) => {
  try {
    const newTeam = await Team.create({
      name: req.body.name,
    });
    res.status(200).json({ team: newTeam, message: 'team created' });
  } catch (error) {}

  // res.json({message: 'Post team'})
});
//update team
router.put('/team/:id', (req, res) => {
  res.json({ message: 'Put team' });
});
//delete team
router.delete('/team/:id', (req, res) => {
  res.json({ message: 'delete team' });
});

//------------Project----------------
// create project
router.post('/project', async (req, res) => {
  try {
    const newProject = await Project.create({
      name: req.body.name,
      user_id: req.session.user_id,
    });
    res.status(200).json({ project: newProject, message: 'project created' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

//update project
router.put('/project/:id', async (req, res) => {
  try {
    const updateProject = await Project.update(
      {
        name: req.body.name,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );
    res
      .status(200)
      .json({ project: updateProject, message: 'project updated' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

// Delete project and associated mindmaps and nodes
router.delete('/project/:id', async (req, res) => {
  try {
    const deleteProject = await Project.destroy({
      where: {
        id: req.params.id,
      },
    });
    res
      .status(200)
      .json({ project: deleteProject, message: 'project deleted' });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

module.exports = router;
