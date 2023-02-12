const router = require('express').Router();
const { User, Team, Project } = require('../../models/index');









//---------------User----------------
//login
router.post('/login', async (req, res) => {
  try {
    const dbUser = await User.findOne({
      where: {
        email: req.body.email,
      }
    });

    if(!dbUser) {
      res
        .status(404)
        .json({message: 'incorrect email'})
      return;
    }

    const validPassword = (dbUser.password == req.body.password)

    res.json(validPassword)
  } catch (error) {
    
  }

  // res.json({message: 'Post login'})
})
//logout
router.post('/logout', (req, res) => {
  res.json({message: 'Post logout'})
})
//signup
router.post('/signup', async (req, res) => {
  try {
    const newUser = User.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    })
    req.session.save(() =>{
      req.session.loggedIn = true,
      req.session.user = {
        id: newUser.id,
        username: newUser.name,
        email: newUser.email
      }

      res.status(200).json("it worked!");
    })
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
  res.json({message: 'Post signup'})
})


//-------------Team-------------------
//create team
router.post('/team', (req, res) => {
  res.json({message: 'Post team'})
})
//update team
router.put('/team/:id', (req, res) => {
  res.json({message: 'Put team'})
})
//delete team
router.delete('/team/:id', (req, res) => {
  res.json({message: 'delete team'})
})


//------------Project----------------
//create project
router.post('/project', (req, res) => {
  res.json({message: 'Post project'})
})
//update project
router.put('/project/:id', (req, res) => {
  res.json({message: 'Put project'})
})
//delete project
router.delete('/project/:id', (req, res) => {
  res.json({message: 'delete project'})
})

module.exports = router;