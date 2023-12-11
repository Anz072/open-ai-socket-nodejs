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

// function splitter(socket, tokenCount, alltext) {
//   let splitCount = Math.round(tokenCount / 3000);
//   const sentences = alltext.split(/(?<=[.!?])\s+/);

//   console.log("splitCount: " + splitCount);

//   let splitSize = Math.ceil(sentences.length / splitCount);
//   let smallerTextSections = [];

//   for (let i = 0; i < sentences.length; i += splitSize) {
//     let splitArray = sentences.slice(i, i + splitSize);
//     smallerTextSections.push(splitArray.join(" "));
//   }
//   openAiApiMulti(socket, smallerTextSections);
// }

// async function openAiHandlerMini(socket, content) {
//   try {
//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         {
//           role: "system",
//           content: "Summarize main content it in 1 sentence",
//         },
//         {
//           role: "user",
//           content: content,
//         },
//       ],
//       stream: true,
//     });

//     for await (const chunk of completion) {
//       if (chunk.choices[0].delta.content !== null) {
//         socket.emit("serverResponse", chunk.choices[0].delta.content);
//       }
//       if (chunk.choices[0].delta.content === undefined) {
//         return;
//       }
//     }
//   } catch (error) {
//     console.error("Error in openAiHandlerMini:", error.message);

//     // Split content and recursively call openAiHandlerMini
//     const halfLength = Math.ceil(content.length / 2);
//     const firstHalf = content.slice(0, halfLength);
//     const secondHalf = content.slice(halfLength);

//     await openAiHandlerMini(socket, firstHalf);
//     await openAiHandlerMini(socket, secondHalf);
//   }
// }

// async function openAiApiMulti(socket, scrapedText) {
//   console.log("openAiApiMulti() executed");
//   let completedCount = 0;
//   for (const text of scrapedText) {
//     try {
//       await openAiHandlerMini(socket, text);
//       completedCount++;
//       if (completedCount === scrapedText.length) {
//         console.log("All asynchronous calls have finished.");
//         socket.emit("serverResponse", "END_OF_STREAM");
//       }
//     } catch (error) {
//       console.error("Error in openAiApiMultiAAAAAAAAAAAAAA:", error.message);
//     }
//   }
// }
