require("dotenv").config();
const PORT = process.env.PORT || 3000;
const express = require("express");
const app = express();
const OpenAI = require("openai");
const openai = new OpenAI();
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
      console.log(content.type);
      console.log(content.length);
      openAiHandler(socket, content.text);
    }else{
      console.log('Content is NULL/Undefined');
      socket.emit("serverResponse", "Failed to fetch content, try realoading the webpage");
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


async function openAiHandler(socket, content) {
  const completion = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "Extract relevant article and summarize it in 5 sentences",
      },
      {
        role: "user",
        content: content,
      },
    ],
    stream: true,
  });

  for await (const chunk of completion) {
    if (chunk.choices[0].delta.content !== null) {
      socket.emit("serverResponse", chunk.choices[0].delta.content);
    }
    if (chunk.choices[0].delta.content === undefined) {
      socket.emit("serverResponse", "END_OF_STREAM");
    }
  }
}

module.exports = { openAiHandler };
