import express from "express";
import { cartController } from "../controllers/carts.controller.js";
import { isUserOwner } from "../middlewares/auth.js";
export const routerCarts = express.Router();

routerCarts.get('/', cartController.getAll);

routerCarts.get('/:id', cartController.getOne);

routerCarts.put("/:cid", cartController.update);

routerCarts.put("/:cid/products/:pid", cartController.updateProductoToCart);

routerCarts.delete("/:cid/products/:pid", cartController.deleteProductInCart);

routerCarts.delete("/:cid", cartController.deleteCart);

routerCarts.post("/", cartController.create);

routerCarts.post("/:cid/product/:pid", isUserOwner, cartController.addProductoToCart);

routerCarts.post("/:cid/purchase", isUserOwner, cartController.purchase)