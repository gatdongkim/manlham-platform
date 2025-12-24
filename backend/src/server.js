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

// Route Imports (Added .js extensions)
import authRoutes from './apps/auth/auth.routes.js';
import jobRoutes from './apps/jobs/job.routes.js';
import paymentRoutes from './apps/payments/payment.routes.js';
import applicationRoutes from './apps/applications/application.routes.js';
import adminPanelRoutes from './apps/admin_panel/admin.routes.js';
import userRoutes from './apps/users/user.routes.js';
import studentRoutes from './apps/students/student.routes.js';
import chatRoutes from './apps/chat/chat.routes.js';

// Custom Routes from src/routes/
import customJobRoutes from './routes/jobRoutes.js';
import customAdminRoutes from './routes/adminRoutes.js';

// Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

connectDB();
initSocket(server);

app.use(helmet({ crossOriginResourcePolicy: false })); 
app.use(cors({
    origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
    credentials: true
}));
app.use(express.json()); 
app.use(morgan('dev'));

// Static Files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 7. Mount Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/jobs', jobRoutes); // This uses your app/jobs logic
app.use('/api/v1/job-details', customJobRoutes); // Use a distinct path for details if needed
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/applications', applicationRoutes);
app.use('/api/v1/admin', adminPanelRoutes);
app.use('/api/v1/admin-actions', customAdminRoutes); // Use a distinct path for actions
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/students', studentRoutes);
app.use('/api/v1/chat', chatRoutes);

app.get('/', (req, res) => res.send('🚀 Manlham Tech Support API is running...'));

// 404 & Error Handlers
app.use((req, res) => res.status(404).json({ message: `🔍 Route not found - ${req.originalUrl}` }));

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    res.status(statusCode).json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));