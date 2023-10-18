import express from "express";
import { chatRealtimeController } from "../controllers/chatRealTime.controller.js";
import { isUserNotAdmin } from "../middlewares/auth.js";

export const routerViewChat = express.Router();

routerViewChat.get("/", isUserNotAdmin, chatRealtimeController.index);
  