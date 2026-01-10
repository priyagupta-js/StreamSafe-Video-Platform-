import { io } from "socket.io-client";

// Backend URL
const SOCKET_URL = "http://localhost:5000";

// Create a SINGLE socket instance
const socket = io(SOCKET_URL, {
  transports: ["websocket"],
  autoConnect: false // we will connect manually
});

export default socket;
