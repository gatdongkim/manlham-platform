// 1. Load Environment Variables
import 'dotenv/config';
import express from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import path from 'path';
import { fileURLToPath } from 'url';

// Config & Utils
import connectDB from './config/db.js';
import { initSocket } from './socket.js';

// Route Imports
import authRoutes from './apps/auth/auth.routes.js';
import jobRoutes from './apps/jobs/job.routes.js';
import paymentRoutes from './apps/payments/payment.routes.js';
import applicationRoutes from './apps/applications/application.routes.js';
import adminPanelRoutes from './apps/admin_panel/admin.routes.js';
import userRoutes from './apps/users/user.routes.js';
import studentRoutes from './apps/students/student.routes.js';
import chatRoutes from './apps/chat/chat.routes.js';

// Custom Routes
import customJobRoutes from './routes/jobRoutes.js';
import customAdminRoutes from './routes/adminRoutes.js';

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

// Initialize Database & Socket
connectDB();
initSocket(server);

// 2. Security & Logging Middleware
app.use(helmet({ 
    crossOriginResourcePolicy: false, // Essential for allowing frontend to load images from backend
    contentSecurityPolicy: false      // Simplifies integration for initial launch
})); 

// 3. Optimized Production CORS
const allowedOrigins = [
    "http://localhost:5173",          // Local development
    "http://127.0.0.1:5173",         // Local development alternative
    "https://manlham-tech.vercel.app" // ADD YOUR ACTUAL VERCEL URL HERE
];

app.use(cors({
    origin: (origin, callback) => {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Blocked by CORS policy'));
        }
    },
    credentials: true
}));

app.use(express.json()); 
// Log using 'combined' in production (more detailed) or 'dev' locally
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

// Static Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 7. Mount Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', customJobRoutes);
app.use('/api/v1/job-details', customJobRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/applications', applicationRoutes);
app.use('/api/v1/admin', adminPanelRoutes);
app.use('/api/v1/admin-actions', customAdminRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/chat', chatRoutes);

// Health Check
app.get('/', (req, res) => res.send('🚀 Manlham Tech Support API is running...'));

// 404 & Error Handlers
app.use((req, res) => res.status(404).json({ message: `🔍 Route not found - ${req.originalUrl}` }));

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message,
        // Hide stack trace in production for security
        stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
    });
});

// 8. Dynamic Port Binding for Render
// Render sets the PORT variable automatically to 10000. 
// Your app MUST use process.env.PORT to receive traffic.
const PORT = process.env.PORT || 5000;
server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Production Mode: ${process.env.NODE_ENV === 'production'}`);
});