import * as React from "react"
import { cn } from "@/lib/utils"

interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  fallback: string;
  gradient?: string;
}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, fallback, gradient, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full",
          className
        )}
        {...props}
      >
        <div 
          className="flex h-full w-full items-center justify-center rounded-full text-white font-medium bg-muted"
          style={{ background: gradient }}
        >
          {fallback}
        </div>
      </div>
    )
  }
)
Avatar.displayName = "Avatar"

export { Avatar }
