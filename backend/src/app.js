import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import mongoSanitize from "express-mongo-sanitize";
import swaggerUi from "swagger-ui-express";

import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import { swaggerSpec } from "./swagger.js";

// Import custom routes using ES Modules to replace the invalid 'require' calls
import customJobRoutes from './routes/jobRoutes.js';
import customAdminRoutes from './routes/adminRoutes.js';

const app = express(); 

// 1. Security Middlewares
// Set crossOriginResourcePolicy to false so images can load on the frontend
app.use(helmet({
  crossOriginResourcePolicy: false,
  contentSecurityPolicy: false
}));

app.use(xss());
app.use(mongoSanitize());

// 2. Production CORS Configuration
// Must match allowedOrigins in server.js and allow credentials for JWT cookies
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
app.use(morgan("dev"));

// 3. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later",
});
app.use("/api", limiter);

// 4. Routes Mounting
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount specialized admin and job routes to match your server.js logic
app.use('/api/v1/jobs', customJobRoutes);
app.use('/api/v1/admin', customAdminRoutes);

// General API router
app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({ message: "Malham Tech Support API is running 🚀" });
});

// 5. Error Handling (MUST be last)
app.use(errorHandler);

export default app;