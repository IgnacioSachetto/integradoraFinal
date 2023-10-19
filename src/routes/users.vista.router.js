import express from 'express';
import { userController } from '../controllers/users.controller.js';
import { isAdmin } from '../middlewares/auth.js';

export const routerVistaUsers = express.Router();

routerVistaUsers.get("/", isAdmin, userController.getVistaUsers);
