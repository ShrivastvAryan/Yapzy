'use client';

import { Conversation, Message, User } from '@/lib/data';
import { Phone, Video, Info, Send, Plus, Smile } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import MessageBubble from '@/components/MessageBubble';
import { useRef, useEffect } from 'react';

interface ChatAreaProps {
  conversation: Conversation;
  messages: Message[];
  currentUser: User;
}

export default function ChatArea({ conversation, messages, currentUser }: ChatAreaProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="flex-1 flex flex-col bg-background h-full overflow-hidden">
      {/* Header */}
      <header className="px-6 py-4 border-b border-border flex justify-between items-center bg-card/50 backdrop-blur-sm z-10 shrink-0">
        <div className="flex items-center gap-3">
          <Avatar 
            fallback={conversation.user.name.charAt(0)} 
            gradient={conversation.user.avatarGradient}
            className="w-10 h-10"
          />
          <div>
            <h2 className="font-semibold text-sm">{conversation.user.name}</h2>
            <div className="flex items-center gap-1.5">
              <div className={`w-2 h-2 rounded-full ${conversation.user.online ? 'bg-green-500' : 'bg-muted-foreground/30'}`} />
              <span className="text-[10px] text-muted-foreground uppercase tracking-wider font-medium">
                {conversation.user.online ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full h-9 w-9">
            <Phone className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full h-9 w-9">
            <Video className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full h-9 w-9">
            <Info className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Message List */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-6 space-y-6 scroll-smooth bg-muted/20"
      >
        <div className="flex flex-col gap-6">
          {messages.map((msg) => (
            <MessageBubble 
              key={msg.id} 
              message={msg} 
              isOwnMessage={msg.senderId === currentUser.id} 
            />
          ))}
        </div>
      </div>

      {/* Input Area */}
      <footer className="p-4 border-t border-border bg-card shrink-0">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-muted-foreground rounded-full shrink-0">
            <Plus className="w-5 h-5" />
          </Button>
          <div className="relative flex-1">
            <Input 
              placeholder="Type a message..." 
              className="pr-10 bg-muted/50 border-none h-11 focus-visible:ring-1" 
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-1 top-1/2 -translate-y-1/2 text-muted-foreground h-8 w-8 rounded-full"
            >
              <Smile className="w-5 h-5" />
            </Button>
          </div>
          <Button size="icon" className="rounded-full h-11 w-11 shrink-0 shadow-lg shadow-primary/20">
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </footer>
    </div>
  );
}
