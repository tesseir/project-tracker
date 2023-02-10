const router = require('express').Router();


router.get('/', (req, res) => {
  res.json({message: 'reached /api'})
})

//---------------User----------------
//User login
router.post('/', (req, res) => {
  res.json({message: 'reached /api'})
})

router.get('/', (req, res) => {
  res.json({message: 'reached /api'})
})