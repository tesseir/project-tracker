const router = require('express').Router();

const apiRoutes = require('./api');
const getRoutes = require('./get-routes');
const mindmapRoutes = require('./mindmap-routes');

router.use('/api', apiRoutes);
router.use('/', getRoutes);
router.use('/mindmap', mindmapRoutes);

router.get('/', (req, res) => {
  res.json({ message: 'reached controllers/index' });
});

module.exports = router;
