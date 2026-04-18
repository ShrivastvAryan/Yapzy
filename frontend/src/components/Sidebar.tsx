'use client';

import { Conversation } from '@/lib/data';
import { Search, MoreVertical, MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

interface SidebarProps {
  conversations: Conversation[];
  activeId: string;
  onSelect: (id: string) => void;
}

export default function Sidebar({ conversations, activeId, onSelect }: SidebarProps) {
  return (
    <aside className="w-80 border-r border-border bg-card flex flex-col h-full shrink-0">
      <div className="p-4 border-b border-border flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h1 className="text-xl font-bold tracking-tight">Messages</h1>
          <div className="flex gap-1">
            <Button variant="ghost" size="icon" className="rounded-full">
              <MessageSquarePlus className="w-5 h-5 text-muted-foreground" />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full">
              <MoreVertical className="w-5 h-5 text-muted-foreground" />
            </Button>
          </div>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input 
            placeholder="Search conversations..." 
            className="pl-9 bg-muted/50 border-none focus-visible:ring-1" 
          />
        </div>
      </div>
      
      <div className="flex-1 overflow-y-auto py-2">
        {conversations.map((conv) => (
          <button
            key={conv.id}
            onClick={() => onSelect(conv.id)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 transition-colors hover:bg-accent group relative",
              activeId === conv.id ? "bg-accent" : ""
            )}
          >
            {activeId === conv.id && (
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary" />
            )}
            <div className="relative shrink-0">
              <Avatar 
                fallback={conv.user.name.charAt(0)} 
                gradient={conv.user.avatarGradient}
                className="w-12 h-12"
              />
              {conv.user.online && (
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-background rounded-full" />
              )}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="flex justify-between items-baseline mb-1">
                <span className="font-semibold text-sm truncate">{conv.user.name}</span>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap">{conv.lastMessageTime}</span>
              </div>
              <div className="flex justify-between items-center gap-2">
                <p className="text-xs text-muted-foreground truncate leading-snug">
                  {conv.lastMessage}
                </p>
                {conv.unreadCount > 0 && (
                  <span className="bg-primary text-primary-foreground text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center shrink-0">
                    {conv.unreadCount}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </aside>
  );
}
