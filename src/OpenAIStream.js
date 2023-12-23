const OpenAI = require("openai");
const openai = new OpenAI();

async function openAiHandler(
  socket,
  content,
  modelHandle = "gpt-3.5-turbo",
  contentMessage
) {
  console.log("OPENAI MODEL: ", modelHandle);
  console.log("contentMessage: ", contentMessage);
  try {
    const completion = await openai.chat.completions.create({
      model: modelHandle,
      messages: [
        {
          role: "system",
          content: contentMessage,
        },
        {
          role: "user",
          content: content,
        },
      ],
      stream: true,
      temperature: 0.9,
    });

    for await (const chunk of completion) {
      if (chunk.choices[0].delta.content !== null) {
        socket.emit("serverResponse", chunk.choices[0].delta.content);
      }
      if (chunk.choices[0].delta.content === undefined) {
        socket.emit("serverResponse", "END_OF_STREAM");
      }
    }
  } catch (error) {
    const matches = error.error.message.match(/resulted in (\d+) tokens/);
    const tokens = matches ? parseInt(matches[1], 10) : null;
    console.log("tokens ", tokens);
    if (error.error.code !== "context_length_exceeded") {
      socket.emit("serverResponse", "Error in openAiHandler");
      socket.emit("serverResponse", "END_OF_STREAM");
      return;
    } else if (
      error.error.code === "context_length_exceeded" &&
      modelHandle === "gpt-4-1106-preview"
    ) {
      socket.emit("serverResponse", "Error in openAiHandler");
      socket.emit("serverResponse", "END_OF_STREAM");
      console.log(error.error.message);
    }

    // splitter(socket, tokens, content);
    openAiHandler(socket, content, "gpt-4-1106-preview", contentMessage);
  }
}

module.exports = openAiHandler;
