import { Router } from "express";

import userRoutes from "../apps/users/user.routes.js";
import studentRoutes from "../apps/students/student.routes.js";
import clientRoutes from "../apps/clients/client.routes.js";
import adminRoutes from "../apps/admin_panel/admin.routes.js";
import jobRoutes from "../apps/jobs/job.routes.js";
import chatRoutes from "../apps/chat/chat.routes.js";

const router = Router();

router.use("/auth", userRoutes);
router.use("/students", studentRoutes);
router.use("/clients", clientRoutes);
router.use("/admin", adminRoutes);
router.use("/jobs", jobRoutes);
router.use("/chat", chatRoutes);

export default router;
