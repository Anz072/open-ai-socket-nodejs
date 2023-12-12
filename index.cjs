require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const openAiHandler = require("./src/OpenAIStream");
const cleanText = require("./src/cleanText");
const contentMessageHandler = require("./src/messageCreator");
const app = express();
const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer, {
  cors: {
    origin: ["http://localhost:3001", "null", "*"],
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected");
  console.log(socket.id);

  socket.on("clientMessage", (content) => {
    if (content.text !== undefined && content.text !== null) {
      console.log("content received");
      const contentMessage = contentMessageHandler(
        content.length,
        content.type
      );
      const cleaned = cleanText(content.text);
      openAiHandler(socket, cleaned, "gpt-3.5-turbo", contentMessage);
    } else {
      console.log("Content is NULL/Undefined");
      socket.emit(
        "serverResponse",
        "Failed to fetch content, try realoading the webpage"
      );
      socket.emit("serverResponse", "END_OF_STREAM");
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});