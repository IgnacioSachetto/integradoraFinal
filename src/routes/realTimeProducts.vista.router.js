import express from "express";
import { productControler } from "../controllers/products.controller.js";
import { isPremiumOrAdmin } from '../middlewares/auth.js';

export const routerVistaRealTimeProducts = express.Router();

/*routerVistaRealTimeProducts.get("/", isPremiumOrAdmin, async (req, res) => {
    const allProducts = productService.getAllProducts();
    return res.render("realTimeProducts", await allProducts);
});*/

routerVistaRealTimeProducts.get("/", isPremiumOrAdmin, productControler.getVistaCreate);
