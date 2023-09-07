import express from "express";
import { sendPurchaseConfirmationEmail } from "../controllers/mail.controller.js";

export const routerViewMail = express.Router();

routerViewMail.get("/", sendPurchaseConfirmationEmail);
