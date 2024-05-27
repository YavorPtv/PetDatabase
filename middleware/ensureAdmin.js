function ensureAdmin(req, res, next) {
    if (req.isAuthenticated() && req.user.Role === 'admin') {
      return next();
    }
    req.flash('error_msg', 'You are not authorized to view this page');
    res.redirect('/');
  }
  
  module.exports = ensureAdmin;