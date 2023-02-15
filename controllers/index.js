const router = require('express').Router();

const apiRoutes = require('./api');
const getRoutes = require('./get-routes');

router.use('/api', apiRoutes);
router.use('/', getRoutes);

router.get('/', (req, res) => {
  res.json({message: 'reached controllers/index'})
})

module.exports = router;
