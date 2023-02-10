const router = require('express').Router();
const { User, Team, Project } = require('../models');
//connection signal
router.get('/', (req, res) => {
  res.json({message: 'reached controllers/getRoutes'})
})

//get home
router.get('/', (req, res) => {
  res.json({message: 'reached home'})
})

//get team
router.get('/team', (req, res) => {
  res.json({message: 'reached controllers/getRoutes'})
})

//get project
router.get('/project', (req, res) => {
  res.json({message: 'reached controllers/getRoutes'})
})

//get resources
router.get('/resources', (req, res) => {
  res.json({message: 'reached controllers/getRoutes'})
})





module.exports = router;
