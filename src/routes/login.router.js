import express from 'express';
import passport from 'passport';
import { DTOsession } from '../DAO/models/DTO/session.dto.js';

export const loginRouter = express.Router();

//Debido a la caracteristicas del manejo del logeo decidi no dividirlo en capas

loginRouter.post('/register', passport.authenticate('register', { failureRedirect: '/error-autentificacion' }), async (req, res) => {
  return res.redirect('/login');
});

loginRouter.post('/login', passport.authenticate('login', { failureRedirect: '/error-autentificacion' }), async (req, res) => {
  const user = req.user;

  user.last_connection = new Date();

  try {
    await user.save();

    if (user.username == 'adminCoder@coder.com' && user.password == 'adminCod3r123') {
      req.session.user = {
        email: 'adminCoder@coder.com',
        firstName: 'admin',
        lastName: 'admin',
        rol: 'admin',
        _id: req.user._id.toString(),
      };
    } else {
      req.session.user = {
        email: req.user.email,
        firstName: req.user.firstName,
        lastName: req.user.lastName,
        rol: req.user.rol,
        _id: req.user._id.toString(),
      };
    }

    return res.redirect('/vista/products');
  } catch (error) {
    console.error('Error al actualizar la última conexión:', error);
    return res.status(500).json({ error: 'Error al actualizar la última conexión.' });
  }
});

loginRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('Error al cerrar sesión:', err);
    }
    res.redirect('/');
  });
});

loginRouter.use('/current', (req, res) => {
  const userSession = new DTOsession(req.session.user);
  return res.status(200).json({
    status: 'success',
    msg: 'datos de la session',
    payload: userSession || {},
  });
});
