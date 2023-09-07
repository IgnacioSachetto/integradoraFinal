import express from 'express';
import { isAmdin, isUser } from '../middlewares/auth.js';
export const viewsRouter = express.Router();

viewsRouter.get('', (req, res) => {
  return res.redirect('/login');
});

viewsRouter.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.render('error-page', { msg: 'no se pudo cerrar la session' });
    }
    return res.redirect('/login');
  });
});

viewsRouter.get('/login', (req, res) => {
  res.render('login-form');
});

viewsRouter.get('/register', (req, res) => {
  res.render('register-form');
});

viewsRouter.get('/profile', isUser, (req, res) => {
  res.render('profile');
});