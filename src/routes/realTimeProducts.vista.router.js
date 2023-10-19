import express from "express";
import { productControler } from "../controllers/products.controller.js";
import { isPremiumOrAdmin } from '../middlewares/auth.js';

export const routerVistaRealTimeProducts = express.Router();

routerVistaRealTimeProducts.get("/", isPremiumOrAdmin, productControler.getVistaCreate);
