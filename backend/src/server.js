const http = require("http");
const app = require("./app");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const PORT = process.env.PORT || 5000;

/**
 * Create HTTP server
 * (Required later for Socket.io integration)
 */
const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
