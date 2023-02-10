const router = require('express').Router();
const { User, Team, Project } = require('../models');
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
router.post('/signup', (req, res) => {
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