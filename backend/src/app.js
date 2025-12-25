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

// Route Imports (Matching your server.js structure)
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

// Custom Routes
import customJobRoutes from './routes/jobRoutes.js';
import customAdminRoutes from './routes/adminRoutes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express(); 

// 1. Security Middlewares
app.use(helmet({
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: false
}));
app.use(xss());
app.use(mongoSanitize());

// 2. Production CORS Fix - Crucial for "API: BLOCKED" error
app.use(cors({
    origin: [
        "https://manlham-tech.vercel.app", 
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// 3. Static Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 4. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later",
});
app.use("/api", limiter);

// 5. Unified Route Mounting
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount all v1 routes clearly
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', customJobRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/applications', applicationRoutes);
app.use('/api/v1/admin', adminPanelRoutes);
app.use('/api/v1/admin-actions', customAdminRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/chat', chatRoutes);

// General catch-all router
app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({ message: "Malham Tech Support API is running 🚀" });
});

// 6. Error Handling
app.use(errorHandler);

export default app;