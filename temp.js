



// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// io.on('connection', (socket) => {
//   console.log('Client connected');
//   // Handle data updates and send to the connected clients
//   setInterval(() => {
//     const data = /* Fetch data from Heroku */;
//     socket.emit('update', data);
//   }, 100);
// });

// server.listen(process.env.PORT || 3000, () => {
//   console.log('Server running on port 3000');
// });




// const OpenAI = require("openai");

// const openai = new OpenAI();
// // const messages = [
// //   {
// //     role: "system",
// //     content: `Extract relevant article and summarize it in 5 sentences`,
// //   },
// //   {
// //     role: "user",
// //     content: `${scrapedText.arr.join(" ")}`,
// //   },
// // ];

// async function openAiHandler(socket) {
//   for (let i = 0; i < 10; i++) {
//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages: [
//         { role: "system", content: "Extract relevant article and summarize it in 3 sentences" },
//         { role: "user", content: `YouTube, the digital haven for creativity and expression, is a vast landscape where content creators navigate the ever-changing currents of online trends. Among the myriad of bizarre phenomena that captivate the platform's diverse audience, one unexpected star emerges: the rubber duck. This seemingly ordinary bath toy has taken the YouTube community by storm, becoming an unexpected muse for content creators seeking the next viral sensation.

//         At first glance, the rubber duck may appear as a simple childhood relic, but its subtle charm has sparked a peculiar trend. Creators across genres, from gaming to cooking, have embraced the rubber duck, weaving it into their narratives and integrating it into their content in ingenious ways. This peculiar phenomenon raises intriguing questions about the psychology of online engagement and the unpredictable nature of viral content.
        
//         Beyond its role as an internet sensation, the rubber duck trend reflects the communal and collaborative spirit of YouTube. Creators often engage in friendly competitions to outdo each other with the most creative use of rubber ducks in their videos. This sense of camaraderie fosters a unique online culture, where the unexpected can become the norm, and creativity knows no bounds.
        
//         Moreover, the rubber duck trend sheds light on the symbiotic relationship between content creators and their audiences. Viewers actively participate in this phenomenon by suggesting new and inventive uses for rubber ducks, effectively shaping the evolution of the trend. This organic collaboration underscores the democratic nature of YouTube, where anyone with a camera and a rubber duck can contribute to the platform's ever-expanding tapestry of content.` },
//       ],
//       stream: true,
//     });

//     for await (const chunk of completion) {
//       // console.log(chunk.choices[0].delta.content);
//       // Emit the data to the connected client
//       // console.log('t')
//       const messageToServer = "Hello, serverxx!";
//       socket.emit("serverData", messageToServer);
//       // socket.emit("serverData", { content: chunk.choices[0].delta.content });
//     }
//   }
// }

// module.exports = { openAiHandler };






// require('dotenv').config();
// const PORT = 3000;
// const express = require("express");
// const app = express();
// const { openAiHandler } = require('./openAIHandler');
// const httpServer = require("http").createServer(app); 
// const io = require("socket.io")(httpServer, {
//   cors: {
//     origin: ["http://localhost:3000", "null"], 
//     methods: ["GET", "POST"],
//   },
// });




// app.use(express.static("public"));

// io.on("connection", (socket) => {
//   console.log("Socket connected!");

//   console.log(openAiHandler());

  

//   socket.on("clientMessage2", (data) => {
//     console.log("Message from clientxx:", data);
//     socket.emit("serverResponse", "Message received by server");
//   });

//   socket.on("disconnect", () => {
//     console.log("Disconnected user");
//   });

//   socket.emit("serverRespons22e", "Message receAAAived by server");
// });



// httpServer.listen(PORT, () => {
//   console.log("Server running on port " + PORT);
// });
