import express from 'express';
import passport from 'passport';
import { errorAutentificacion, githubCallback } from '../controllers/auth.controller.js';

const router = express.Router();

router.get(
  '/api/sessions/githubcallback',
  passport.authenticate('github', { failureRedirect: '/error-autentificacion' }),
  githubCallback
);

router.get('/error-autentificacion', errorAutentificacion);

export default router;
