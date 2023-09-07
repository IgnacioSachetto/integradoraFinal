import express from 'express';
import { recoverPasswordGet, recoverPasswordPost } from '../controllers/recoveryPass.controller.js';

export const routerRecoverPass = express.Router();

routerRecoverPass.get('/', recoverPasswordGet);
routerRecoverPass.post('/', recoverPasswordPost);

