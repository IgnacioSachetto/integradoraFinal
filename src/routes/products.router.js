import express from "express";
import { productControler } from "../controllers/products.controller.js";
import { isAmdin } from "../middlewares/auth.js";
export const routerProductos = express.Router();

routerProductos.get("/mockingproducts", productControler.getProductsByMock);

routerProductos.get('/', productControler.getAll);
  
routerProductos.get('/:id', productControler.getOne);

routerProductos.delete("/:id", isAmdin,  productControler.delete);

routerProductos.put("/:id", isAmdin,  productControler.update);

routerProductos.post("/",isAmdin,  productControler.create);

