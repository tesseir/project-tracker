const router = require('express').Router();
const { User, Team, Project } = require('../../models/index');








// const storeUserData = (req, res, next) => {
//   req.session.user = {
//     id: 1,
//     username: 'johndoe',
//     email: 'johndoe@example.com'
//   };
//   next();
// };

//---------------User----------------
//login
router.post('/login', (req, res) => {

  res.json({message: 'Post login'})
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