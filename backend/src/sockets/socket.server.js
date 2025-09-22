const { Server } = require("socket.io");
const cookie = require("cookie");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");
const aiService = require("../services/ai.service");
const messageModel = require("../models/message.model");
const { createMemory, queryMemory } = require("../services/vector.service");

function initSocketServer(httpServer) {
  const io = new Server(httpServer, {});

  io.use(async (socket, next) => {
    const cookies = cookie.parse(socket.handshake.headers?.cookie || "");
    if (!cookies.token) {
      next(new Error("Authentication error: No token provided"));
    }

    try {
      const decoded = jwt.verify(cookies.token, process.env.JWT_SECRET);
      const user = await userModel.findById(decoded.id);
      socket.user = user;
      next();
    } catch (err) {
      next(new Error("Authentication error: Invalid token"));
    }
  });

  io.on("connection", (socket) => {
    socket.on("ai-message", async (messagePayload) => {
      const [message, messageVector] = await Promise.all([
        messageModel.create({
          chat: messagePayload.chat,
          content: messagePayload.content,
          user: socket.user._id,
          role: "user",
        }),
        aiService.generateVector(messagePayload.content),
      ]);

      await createMemory({
        vectors: messageVector,
        messageId: message._id,
        metadata: {
          chat: messagePayload.chat,
          user: socket.user._id,
          text: messagePayload.content,
        },
      });

      const [memory, chatHistory] = await Promise.all([
        queryMemory({
          queryVector: messageVector,
          limit: 3,
          metadata: {
            user: socket.user._id
          },
        }),
        messageModel
          .find({
            chat: messagePayload.chat,
          })
          .sort({ createdAt: -1 })
          .limit(20)
          .lean()
          .then((messages) => messages.reverse()),
      ]);

      const shortTermMemory = chatHistory.map((item) => {
        return {
          role: item.role,
          parts: [{ text: item.content }],
        };
      });

      const longTermMemory = [
        {
          role: "user",
          parts: [
            {
              text: `these are some previous message from the chat, use them to generate the response ${memory
                .map((item) => item.metadata.text)
                .join("\n")}`,
            },
          ],
        },
      ];

      const response = await aiService.generateResponse([
        ...shortTermMemory,
        ...longTermMemory,
      ]);

      socket.emit("ai-response", {
        content: response,
        chat: messagePayload.chat,
      });

      const [responseMessage, responseVector] = await Promise.all([
        messageModel.create({
          chat: messagePayload.chat,
          content: response,
          user: socket.user._id,
          role: "model",
        }),
        aiService.generateVector(response),
      ]);

      await createMemory({
        vectors: responseVector,
        messageId: responseMessage._id,
        metadata: {
          chat: messagePayload.chat,
          user: socket.user._id,
          text: response,
        },
      });
    });
  });
}

module.exports = initSocketServer;
