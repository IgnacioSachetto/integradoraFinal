import express from "express";
import {productService} from "../services/products.service.js";

export const routerVistaRealTimeProducts = express.Router()
routerVistaRealTimeProducts.get("/", async (req, res) => {
    const allProducts = productService.getAllProducts()
    return res.render("realTimeProducts", await allProducts);
});