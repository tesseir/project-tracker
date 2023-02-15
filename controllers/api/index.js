const router = require('express').Router();
const postRoutes = require('./post-routes');


router.use('/', postRoutes);

// router.get('/', (req, res) => {
//   res.json({message: 'reached /api'})
// })



module.exports = router;