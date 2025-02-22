import { io, Socket } from "socket.io-client";

const SERVER_URL = process.env.EXPO_PUBLIC_SERVER_URL;

let socket: Socket | null = null;

const socketService = {
  initialize: (): void => {
    if (!socket) {
      socket = io(SERVER_URL);

      socket.on("connect", () => {
        console.log("Connected to server:", socket?.id);
      });

      socket.on("disconnect", (reason) => {
        console.log("Disconnected from server:", reason);
      });
    }
  },

  getSocket: (): Socket | null => {
    return socket;
  },

  joinRoom: (room: string): void => {
    if (socket) {
      console.log("Joining room", room);
      socket.emit("message", { type: "joinRoom", roomId: room });
    }
  },

  disconnect: (): void => {
    if (socket) {
      socket.disconnect();
      socket = null;
    }
  },
};

export default socketService;
