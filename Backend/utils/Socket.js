import { Server } from 'socket.io';

let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173', 'http://localhost:5174'],
      credentials: true,
    },
  });

  io.on('connection', (socket) => {
    console.log(`User connected: ${socket.id}`);

    // Join user-specific room based on userId
    socket.on('joinRoom', (userId) => {
      socket.join(userId);
      console.log(`User ${userId} joined room`);
    });

    socket.on('disconnect', () => {
      console.log(`User disconnected: ${socket.id}`);
    });
  });

  return io;
};

// Function to emit notification to specific users
const emitNotification = (userIds, notification) => {
  if (!io) {
    console.error('Socket.IO not initialized');
    return;
  }
  userIds.forEach((userId) => {
    io.to(userId).emit('newNotification', notification);
  });
};

export { initializeSocket, emitNotification };