import 'dotenv/config';
import http from 'http';
import app from './app.js'; // Import the unified app logic
import connectDB from './config/db.js';
import { initSocket } from './socket.js';

const server = http.createServer(app);

// Initialize Services
connectDB();
initSocket(server);

// Dynamic Port Binding for Render
const PORT = process.env.PORT || 5000;

server.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🌍 Production Mode: ${process.env.NODE_ENV === 'production'}`);
    console.log(`📡 CORS enabled for: https://manlham-tech.vercel.app`);
});