const Message = require('../models/Message');

const userSocketMap = {};

const socketHandler = (io) => {

  io.on('connection', (socket) => {
    console.log('A user connected:', socket.id);

    const userId = socket.handshake.query.userId;

    if (userId) {
      userSocketMap[userId] = socket.id;
    }

    io.emit('getOnlineUsers', Object.keys(userSocketMap));

    socket.on('sendMessage', async (data) => {
      try {
        const { senderId, receiverId, message } = data;

        const newMessage = await Message.create({
          senderId,
          receiverId,
          message,
        });

        const receiverSocketId = userSocketMap[receiverId];

        if (receiverSocketId) {
          io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        socket.emit('messageSaved', newMessage);

      } catch (error) {
        socket.emit('error', { message: 'Message failed to send' });
      }
    });

    socket.on('disconnect', () => {
      console.log('A user disconnected:', socket.id);

      if (userId) {
        delete userSocketMap[userId];
      }

      io.emit('getOnlineUsers', Object.keys(userSocketMap));
    });
  });

};

module.exports = socketHandler;