// =================================================================
//                      IMPORTS AND CONFIG
// =================================================================

// Load environment variables from .env file
require('dotenv').config();

// Core libraries
const express = require('express');
const http = require('http'); // Required to create a server for Socket.IO
const { Server } = require("socket.io");
const cors = require('cors');

// Local modules
const connectDB = require('./config/db');

// =================================================================
//                    INITIALIZATION
// =================================================================

// Create the Express app
const app = express();
// Create an HTTP server from the Express app
const server = http.createServer(app);

// Configure CORS (Cross-Origin Resource Sharing)
// This allows your React frontend (running on localhost:3000) to communicate with this server.
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};
app.use(cors(corsOptions));

// Initialize Socket.IO and attach it to the server, using the same CORS options
const io = new Server(server, { cors: corsOptions });

// =================================================================
//                    DATABASE & MIDDLEWARE
// =================================================================

// Connect to MongoDB
connectDB();

// Express Middleware to parse JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Custom Middleware to make the 'io' instance available in all route handlers
// This is the key to being able to emit events from your controllers (e.g., after creating a new article)
app.use((req, res, next) => {
    req.io = io;
    next();
});

// =================================================================
//                      API ROUTES
// =================================================================

// This is where the server links URL paths to the route handler files.
// If these files don't exist at the specified paths, the server will crash.
console.log("Attempting to load routes...");

app.use('/api/auth', require('./routes/auth'));
app.use('/api/worlds', require('./routes/worlds'));

console.log("Routes loaded successfully.");

// =================================================================
//                      SOCKET.IO LOGIC
// =================================================================

// This block runs every time a new client connects to the server via WebSocket
io.on('connection', (socket) => {
    console.log('✅ A user connected via WebSocket:', socket.id);

    // Listen for a client joining a specific world's "room"
    socket.on('join_world', (worldId) => {
        socket.join(worldId);
        console.log(`User ${socket.id} joined room for world: ${worldId}`);
    });

    // Listen for a client leaving a world's "room"
    socket.on('leave_world', (worldId) => {
        socket.leave(worldId);
        console.log(`User ${socket.id} left room for world: ${worldId}`);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('❌ User disconnected:', socket.id);
    });
});


// =================================================================
//                      SERVER LISTENER
// =================================================================

const PORT = process.env.PORT || 5005;

// Start the server. We use `server.listen` instead of `app.listen`
// because we need to listen on the http server that Socket.IO is attached to.
server.listen(PORT, () => console.log(`🚀 Server is running on http://localhost:${PORT}`));