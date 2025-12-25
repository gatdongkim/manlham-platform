import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from 'url';

// Route Imports
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { swaggerSpec } from "./swagger.js";
import authRoutes from './apps/auth/auth.routes.js';
import paymentRoutes from './apps/payments/payment.routes.js';
import applicationRoutes from './apps/applications/application.routes.js';
import adminPanelRoutes from './apps/admin_panel/admin.routes.js';
import userRoutes from './apps/users/user.routes.js';
import studentRoutes from './apps/students/student.routes.js';
import chatRoutes from './apps/chat/chat.routes.js';

// Custom Route Overrides (Admin Stats & Jobs)
import customJobRoutes from './routes/jobRoutes.js';
import customAdminRoutes from './routes/adminRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express(); 

// 1. Security & CORS
app.use(helmet({ crossOriginResourcePolicy: false, contentSecurityPolicy: false }));
app.use(xss());
app.use(mongoSanitize());

app.use(cors({
    origin: ["https://manlham-tech.vercel.app", "http://localhost:5173"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(morgan("dev"));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 2. Unified Route Mounting
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount specialized v1 routes directly
app.use('/api/v1/jobs', customJobRoutes); 
app.use('/api/v1/admin', customAdminRoutes); 
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/applications', applicationRoutes);
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/chat', chatRoutes);

// General fallback
app.use("/api", routes);

app.get("/", (req, res) => res.json({ message: "API Operational 🚀" }));

app.use(errorHandler);
export default app;