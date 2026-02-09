import * as React from "react";
import { cn } from "../../Lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost";
  size?: "default" | "icon" | "sm";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
          variant === "ghost" && "hover:bg-accent",
          size === "icon" && "h-9 w-9",
          size === "sm" && "h-9 px-4",
          className,
        )}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";
