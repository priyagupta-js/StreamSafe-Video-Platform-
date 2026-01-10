const http = require("http");
const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { Server } = require("socket.io");

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;

/**
 * Create HTTP server
 */
const server = http.createServer(app);

// Initialize Socket.io
const io = new Server(server, {
  cors: {
    origin: "*", // frontend URL later
    methods: ["GET", "POST"]
  }
});
// Make io accessible globally
global.io = io;

// Socket connection
io.on("connection", (socket) => {
  console.log("🟢 Client connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("🔴 Client disconnected:", socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});