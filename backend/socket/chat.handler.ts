import { Server, Socket } from 'socket.io';
import { db } from '../db';
import { messages } from '../db/schema';

export const registerChatHandlers = (io: Server, socket: Socket) => {
  
  const joinRoom = (roomId: string) => {
    socket.join(roomId);
  };

  const sendMessage = async (data: { roomId: string; senderId: string; content: string }) => {
    try {
      const [newMessage] = await db.insert(messages).values(data).returning();
      io.to(data.roomId).emit('receive_message', newMessage);
    } catch (error) {
      socket.emit('error', 'Message failed to send');
    }
  };

  // Bind the functions to the socket events
  socket.on('join_room', joinRoom);
  socket.on('send_message', sendMessage);
};