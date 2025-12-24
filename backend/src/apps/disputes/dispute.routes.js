import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { create, list } from "./dispute.controller.js";

const router = Router();

router.post("/", authMiddleware(), create);
router.get("/", authMiddleware(["ADMIN"]), list);

export default router;
