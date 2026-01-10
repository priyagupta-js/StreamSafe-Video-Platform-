import { io } from "socket.io-client";

// Backend URL
const SOCKET_URL = "http://localhost:5000";

// Create socket connection
const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false
});

export default socket;
