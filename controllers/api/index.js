const router = require('express').Router();


router.get('/', (req, res) => {
  res.json({message: 'reached /api'})
})



module.exports = router;