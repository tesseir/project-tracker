function withAuth(req, res, next) {
  if (req.session.loggedIn) {
    return next();
  } else {
    return res.redirect('/login');
  }
}

module.exports = withAuth;