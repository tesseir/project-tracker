const express = require('express');

const router = express.Router();

router.get('/create', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/login');
    return;
  }
  res.render('mindmap', { isEdit: false });
});

router.get('/:id/edit', (req, res) => {
  if (!req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('mindmap', { isEdit: true, mindmapId: req.params.id });
});

module.exports = router;
