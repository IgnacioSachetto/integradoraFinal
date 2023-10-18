import express from "express";
import { cartController } from "../controllers/carts.controller.js";


export const routerVistaCart = express.Router();

routerVistaCart.get("/:cid", cartController.renderCart);
