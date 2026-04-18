import { Message } from '@/lib/data';
import { cn } from '@/lib/utils';

interface MessageBubbleProps {
  message: Message;
  isOwnMessage: boolean;
}

export default function MessageBubble({ message, isOwnMessage }: MessageBubbleProps) {
  return (
    <div className={cn(
      "flex w-full mb-1",
      isOwnMessage ? "justify-end" : "justify-start"
    )}>
      <div className={cn(
        "max-w-[75%] px-4 py-2 rounded-2xl shadow-sm text-sm relative transition-all hover:shadow-md",
        isOwnMessage 
          ? "bg-primary text-primary-foreground rounded-tr-none" 
          : "bg-card border border-border text-card-foreground rounded-tl-none"
      )}>
        <p className="leading-relaxed">{message.text}</p>
        <span className={cn(
          "block text-[10px] mt-1.5 font-medium opacity-60",
          isOwnMessage ? "text-right text-primary-foreground/90" : "text-right text-muted-foreground"
        )}>
          {message.timestamp}
        </span>
      </div>
    </div>
  );
}
