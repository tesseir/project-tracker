const router = require('express').Router();
const { User, Team, Project } = require('../models');
//connection signal
router.get('/', (req, res) => {
  res.json({message: 'reached controllers/getRoutes'})
})

//get home
router.get('/home', (req, res) => {
  res.json({message: 'reached home'})
})

//get team
router.get('/team', (req, res) => {
  res.json({message: 'reached Team'})
})

//get project
router.get('/project', (req, res) => {
  res.json({message: 'reached project'})
})

//get resources
router.get('/notebook', (req, res) => {
  res.json({message: 'reached notebook'})
})





module.exports = router;
