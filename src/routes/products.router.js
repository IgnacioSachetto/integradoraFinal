import express from "express";
import { productControler } from "../controllers/products.controller.js";
import { isAdmin, isPremiumOrAdmin } from "../middlewares/auth.js";
export const routerProductos = express.Router();

routerProductos.get("/mockingproducts", productControler.getProductsByMock);

routerProductos.get('/', productControler.getAll);
  
routerProductos.get('/:id', productControler.getOne);

routerProductos.delete("/:id", isAdmin,  productControler.delete);

routerProductos.put("/:id", isAdmin ,  productControler.update);

routerProductos.post("/", isPremiumOrAdmin ,  productControler.create);

