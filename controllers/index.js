const router = require('express').Router();

const apiRoutes = require('./api');
const getRoutes = require('./get-routes');

router.use('/', getRoutes);
router.use('/api', apiRoutes);

router.get('/', (req, res) => {
  res.json({message: 'reached controllers/index'})
})

module.exports = router;
