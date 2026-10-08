import React from "react";
import Link from "next/link";
import { cn } from "../../lib/utils";

interface LogoProps {
  className?: string;
  variant?: "full" | "mark" | "compact";
  size?: "sm" | "md" | "lg";
}

export const Logo: React.FC<LogoProps> = ({
  className,
  variant = "full",
  size = "md",
}) => {
  const sizeMap = {
    sm: { icon: 26, text: "text-lg", sub: "text-[10px]" },
    md: { icon: 34, text: "text-xl", sub: "text-xs" },
    lg: { icon: 44, text: "text-2xl", sub: "text-sm" },
  };

  const { icon, text, sub } = sizeMap[size];

  return (
    <Link
      href="/"
      className={cn(
        "inline-flex items-center gap-2.5 group transition-transform duration-200 active:scale-95 select-none focus:outline-none",
        className
      )}
      aria-label="PawPetStore Home"
    >
      {/* Custom Vector Pet Paw & Care Heart Mark */}
      <div className="relative flex items-center justify-center">
        <svg
          width={icon}
          height={icon}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="transition-transform duration-300 group-hover:rotate-[-4deg] group-hover:scale-105"
        >
          {/* Outer Protective Organic Shield */}
          <rect
            width="48"
            height="48"
            rx="14"
            className="fill-[#1B4332] dark:fill-[#4BB787] transition-colors"
          />

          {/* Golden Paw Toe Pads */}
          <ellipse
            cx="16"
            cy="15"
            rx="3.5"
            ry="4.5"
            className="fill-[#D9A066] dark:fill-[#172420] transition-colors"
          />
          <ellipse
            cx="24"
            cy="12"
            rx="3.8"
            ry="5"
            className="fill-[#E07A5F] dark:fill-[#0D1412] transition-colors"
          />
          <ellipse
            cx="32"
            cy="15"
            rx="3.5"
            ry="4.5"
            className="fill-[#D9A066] dark:fill-[#172420] transition-colors"
          />

          {/* Central Main Heart-Paw Pad */}
          <path
            d="M24 22C20.5 22 17 24.5 17 28.5C17 32.5 20.8 35.8 24 38C27.2 35.8 31 32.5 31 28.5C31 24.5 27.5 22 24 22Z"
            fill="#FAF8F5"
            className="dark:fill-[#0D1412] transition-colors"
          />

          {/* Gentle Inner Heart Gleam */}
          <path
            d="M24 25C22.2 25 20.5 26.2 20.5 28.2C20.5 30.2 22.4 32 24 33.2C25.6 32 27.5 30.2 27.5 28.2C27.5 26.2 25.8 25 24 25Z"
            className="fill-[#E07A5F] dark:fill-[#4BB787] transition-colors"
          />
        </svg>
      </div>

      {/* Brand Typography */}
      {variant !== "mark" && (
        <div className="flex flex-col leading-none">
          <div className={cn("font-bold tracking-tight text-[#1C2421] dark:text-[#F3F7F5]", text)}>
            <span>Paw</span>
            <span className="text-[#1B4332] dark:text-[#4BB787]">Pet</span>
            <span className="text-[#D9A066] dark:text-[#E3B27E]">Store</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#E07A5F] ml-0.5 animate-pulse" />
          </div>
          {variant === "full" && (
            <span
              className={cn(
                "text-[#738078] dark:text-[#7E9086] font-medium tracking-wider uppercase",
                sub
              )}
            >
              Pet Marketplace & Care
            </span>
          )}
        </div>
      )}
    </Link>
  );
};

export default Logo;
