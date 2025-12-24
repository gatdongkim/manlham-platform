import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.middleware.js";
import { createProfile, getProfile } from "./client.controller.js";

const router = Router();

router.post("/", authMiddleware(["CLIENT"]), createProfile);
router.get("/me", authMiddleware(["CLIENT"]), getProfile);

export default router;
