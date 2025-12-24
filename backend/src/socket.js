import { Server } from 'socket.io';

let io;

/**
 * @desc Initialize Socket.io
 * ✅ Changed to 'export const' so server.js can find it
 */
export const initSocket = (server) => {
    io = new Server(server, {
        cors: {
            origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
            methods: ["GET", "POST"],
            credentials: true
        }
    });

    io.on('connection', (socket) => {
        console.log('📡 New client connected:', socket.id);
        
        socket.on('disconnect', () => {
            console.log('🔌 Client disconnected');
        });
    });

    return io;
};

/**
 * @desc Provide the IO instance to other controllers
 */
export const getIO = () => {
    if (!io) {
        throw new Error("Socket.io not initialized!");
    }
    return io;
};