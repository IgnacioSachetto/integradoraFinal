import express from 'express';
import recoveryMailController from '../controllers/recoveryMail.controller.js';


export const routerRecoverMail = express.Router();

routerRecoverMail.get('/', (_, res) => {
    res.render('recover-mail');
  });

routerRecoverMail.post('/', recoveryMailController.checkEmail)