export interface User {
  id: string;
  name: string;
  avatarGradient: string;
  online: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export interface Conversation {
  id: string;
  user: User;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

export const currentUser: User = {
  id: 'user1',
  name: 'Me',
  avatarGradient: 'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  online: true,
};

export const contacts: User[] = [
  { id: 'u1', name: 'Alice Smith', avatarGradient: 'linear-gradient(135deg, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)', online: true },
  { id: 'u2', name: 'Bob Jones', avatarGradient: 'linear-gradient(120deg, #84fab0 0%, #8fd3f4 100%)', online: false },
  { id: 'u3', name: 'Charlie Davis', avatarGradient: 'linear-gradient(120deg, #fccb90 0%, #d57eeb 100%)', online: true },
  { id: 'u4', name: 'Diana Prince', avatarGradient: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)', online: false },
];

export const mockConversations: Conversation[] = [
  {
    id: 'c1',
    user: contacts[0],
    lastMessage: 'Hey, are we still on for tomorrow?',
    lastMessageTime: '10:30 AM',
    unreadCount: 2,
  },
  {
    id: 'c2',
    user: contacts[1],
    lastMessage: 'I sent the files to your email.',
    lastMessageTime: 'Yesterday',
    unreadCount: 0,
  },
  {
    id: 'c3',
    user: contacts[2],
    lastMessage: 'Sounds good to me!',
    lastMessageTime: 'Tuesday',
    unreadCount: 0,
  },
  {
    id: 'c4',
    user: contacts[3],
    lastMessage: 'Can you review the PR?',
    lastMessageTime: 'Monday',
    unreadCount: 1,
  },
];

export const mockMessages: Record<string, Message[]> = {
  'c1': [
    { id: 'm1', senderId: 'u1', text: 'Hi! How are you doing?', timestamp: '10:00 AM' },
    { id: 'm2', senderId: 'user1', text: 'I am doing great, Alice. Just working on a new project.', timestamp: '10:05 AM' },
    { id: 'm3', senderId: 'u1', text: 'That sounds exciting! What is it about?', timestamp: '10:10 AM' },
    { id: 'm4', senderId: 'user1', text: 'It\'s a modern chatting app UI built with Next.js.', timestamp: '10:15 AM' },
    { id: 'm5', senderId: 'u1', text: 'Oh wow! I would love to see it when it\'s ready.', timestamp: '10:20 AM' },
    { id: 'm6', senderId: 'user1', text: 'I will definitely show you a demo.', timestamp: '10:25 AM' },
    { id: 'm7', senderId: 'u1', text: 'Hey, are we still on for tomorrow?', timestamp: '10:30 AM' },
  ],
};
