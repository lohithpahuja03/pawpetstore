import React from "react";
import { cn } from "../../lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?:
    | "default"
    | "primary"
    | "secondary"
    | "accent"
    | "success"
    | "warning"
    | "danger"
    | "outline";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "default",
  size = "md",
  children,
  ...props
}) => {
  const variantStyles = {
    default:
      "bg-[#ECE5DC] text-[#1C2421] dark:bg-[#243731] dark:text-[#F3F7F5]",
    primary:
      "bg-[#E8F4EE] text-[#1B4332] dark:bg-[#162E24] dark:text-[#4BB787] border border-[#1B4332]/10 dark:border-[#4BB787]/20",
    secondary:
      "bg-[#FAF2E9] text-[#B57C45] dark:bg-[#2A2318] dark:text-[#E3B27E] border border-[#D9A066]/20",
    accent:
      "bg-[#FBECE8] text-[#C9674D] dark:bg-[#331F1A] dark:text-[#F08C73] border border-[#E07A5F]/20",
    success:
      "bg-[#EAF4EE] text-[#2D6A4F] dark:bg-[#142E22] dark:text-[#52B788]",
    warning:
      "bg-[#FEF3C7] text-[#B45309] dark:bg-[#30240E] dark:text-[#FBBF24]",
    danger:
      "bg-[#FEE2E2] text-[#B91C1C] dark:bg-[#351515] dark:text-[#F87171]",
    outline:
      "border border-[#E2DBD2] text-[#4A5550] dark:border-[#253831] dark:text-[#B6C4BC]",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[11px] font-medium rounded-full",
    md: "px-2.5 py-1 text-xs font-semibold rounded-full",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 font-medium tracking-wide transition-colors",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

export default Badge;
