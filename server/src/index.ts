import { Server } from "socket.io";

const io = new Server(3000, {
  cors: {
    origin: "*",
  },
});

io.on("connection", async (socket) => {
  socket.on("send-chat-message", (data) => {
    console.log(data);

    socket.broadcast.emit("chat-message", data);
  });

  socket.on("disconnect", () => {
    socket.emit("user-disconnected", `${socket.id} disconnected`);
  });
});
