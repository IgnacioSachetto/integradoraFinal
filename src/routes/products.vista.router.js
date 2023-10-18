import express from 'express';
import { productControler } from "../controllers/products.controller.js";

export const routerVistaProducts = express.Router();

routerVistaProducts.get('/', productControler.getAllVista);
