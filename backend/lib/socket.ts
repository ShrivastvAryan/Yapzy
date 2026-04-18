import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';
import { registerChatHandlers } from '../socket/chat.handler';

export let io: Server;

export const initSocket = (httpServer: HttpServer) => {
  io = new Server(httpServer, {
    cors: { origin: "http://localhost:8000" }
  });

  // Optional: Add JWT Middleware here
  
  io.on('connection', (socket) => {
    console.log('User connected:', socket.id);
    
    // Register separate handler files
    registerChatHandlers(io, socket);

    socket.on('disconnect', () => console.log('User disconnected'));
  });

  return io;
};