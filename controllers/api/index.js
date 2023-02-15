const router = require('express').Router();
const mindmapRoutes = require('./mindmap');
const postRoutes = require('./post-routes');

router.use('/', postRoutes);
router.use('/mindmap', mindmapRoutes);

// router.get('/', (req, res) => {
//   res.json({message: 'reached /api'})
// })

module.exports = router;
