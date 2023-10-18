
export const githubCallback = (req, res) => {
    req.session.firstName = req.user.firstName;
    req.session.email = req.user.email;
    res.clearCookie('userId');
    res.cookie('userId', req.user._id, { maxAge: 3600000 });
    res.redirect('/vista/products');
  };
  
  export const errorAutentificacion = (req, res) => {
    return res.status(400).render('error-page', { msg: 'error al loguear' });
  };
  