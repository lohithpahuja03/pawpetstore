import React from "react";
import { cn } from "../../lib/utils";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg" | "icon";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 select-none rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";

    const variantStyles = {
      primary:
        "bg-[#1B4332] text-white hover:bg-[#143527] focus-visible:ring-[#1B4332] dark:bg-[#4BB787] dark:text-[#0D1412] dark:hover:bg-[#5FC598] shadow-sm",
      secondary:
        "bg-[#D9A066] text-white hover:bg-[#C58B52] focus-visible:ring-[#D9A066] dark:bg-[#E3B27E] dark:text-[#0D1412] dark:hover:bg-[#F0C494] shadow-sm",
      accent:
        "bg-[#E07A5F] text-white hover:bg-[#C9674D] focus-visible:ring-[#E07A5F] dark:bg-[#F08C73] dark:text-[#0D1412] dark:hover:bg-[#FA9F88] shadow-sm",
      outline:
        "border border-[#E2DBD2] dark:border-[#253831] bg-transparent text-[#1C2421] dark:text-[#F3F7F5] hover:bg-[#FAF8F5] dark:hover:bg-[#172420]",
      ghost:
        "bg-transparent text-[#1C2421] dark:text-[#F3F7F5] hover:bg-[#FAF8F5] dark:hover:bg-[#172420]",
      danger:
        "bg-[#DC2626] text-white hover:bg-[#B91C1C] focus-visible:ring-[#DC2626] dark:bg-[#EF4444] dark:hover:bg-[#DC2626]",
    };

    const sizeStyles = {
      sm: "h-9 px-3.5 text-xs gap-1.5",
      md: "h-11 px-5 text-sm gap-2",
      lg: "h-13 px-7 text-base gap-2.5 font-semibold",
      icon: "h-10 w-10 p-0 shrink-0",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variantStyles[variant], sizeStyles[size], className)}
        {...props}
      >
        {isLoading && <Loader2 className="w-4 h-4 animate-spin shrink-0" />}
        {!isLoading && leftIcon && <span className="shrink-0">{leftIcon}</span>}
        {children}
        {!isLoading && rightIcon && <span className="shrink-0">{rightIcon}</span>}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
