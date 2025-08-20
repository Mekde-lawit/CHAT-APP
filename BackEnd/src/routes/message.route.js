import express from "express";
import protectRoute from "../middlewares/auth.middleware.js";
import {
  getUserFromSidebar,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";

const router = express.Router();

router.get("/users", protectRoute, getUserFromSidebar);
router.get("/:id", protectRoute, getMessages);
router.post("/send", protectRoute, sendMessage);

export default router;
