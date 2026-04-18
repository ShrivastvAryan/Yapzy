'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import ChatArea from '@/components/ChatArea';
import { mockConversations, mockMessages, currentUser } from '@/lib/data';

export default function Home() {
  const [activeConversationId, setActiveConversationId] = useState<string>(mockConversations[0].id);

  const activeConversation = mockConversations.find(c => c.id === activeConversationId);
  const messages = mockMessages[activeConversationId] || [];

  return (
    <main className="flex h-screen w-screen bg-background overflow-hidden text-foreground">
      <Sidebar 
        conversations={mockConversations} 
        activeId={activeConversationId} 
        onSelect={setActiveConversationId} 
      />
      {activeConversation ? (
        <ChatArea 
          conversation={activeConversation} 
          messages={messages} 
          currentUser={currentUser} 
        />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center bg-muted/20 text-muted-foreground gap-4">
          <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
            </svg>
          </div>
          <p className="text-lg font-medium">Select a conversation to start chatting</p>
          <p className="text-sm opacity-70">Choose from your existing chats or start a new one.</p>
        </div>
      )}
    </main>
  );
}
