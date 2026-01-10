const http = require("http");
const dotenv = require("dotenv");
const { Server } = require("socket.io");

const app = require("./app");
const connectDB = require("./config/db");

dotenv.config();

const PORT = process.env.PORT || 5000;

// Keep track of connected sockets
global.connectedSockets = new Set();

const startServer = async () => {
  try {
    //Connect Database first
    await connectDB();

    // Create HTTP server
    const server = http.createServer(app);

    // Initialize Socket.io
    const io = new Server(server, {
      cors: {
        origin: "*", // later replace with frontend URL
        methods: ["GET", "POST"]
      }
    });

    //Make io globally accessible
    global.io = io;

    // Handle socket connections
    io.on("connection", (socket) => {
      console.log("Socket connected:", socket.id);
      global.connectedSockets.add(socket.id);

      socket.on("disconnect", () => {
        console.log("Socket disconnected:", socket.id);
        global.connectedSockets.delete(socket.id);
      });
    });

    //Start server
    server.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
    console.error("Server startup failed:", error);
    process.exit(1);
  }
};

startServer();
