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

const app = express(); // 1. Initialize first

// 2. Security Middlewares
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// 3. Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, please try again later",
});
app.use("/api", limiter);

// 4. Routes
app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", routes);

app.get("/", (req, res) => {
  res.json({ message: "Malham Tech Support API is running 🚀" });
});

// 5. Error Handling (MUST be last)
app.use(errorHandler);

app.use('/api/v1/jobs', require('./routes/jobRoutes'));
app.use('/api/v1/admin', require('./routes/adminRoutes'));

export default app;