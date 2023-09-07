import express from "express";
import { cartService } from "../services/carts.service.js";

export const routerVistaCart = express.Router();

routerVistaCart.get("/:cid", async (req, res) => {
    const cid = req.params.cid;
    const cart = await cartService.getCart(cid)
    res.status(200).render("cart", {
      p: cart.products.map((product) => ({
        name: product.id.title,
        description: product.id.description,
        price: product.id.price,
        stock: product.id.stock,
        quantity: product.quantity,
        id:product._id.toString()
      })),
      cid: cid,
    });
  });