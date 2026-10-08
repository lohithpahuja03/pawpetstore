import React from "react";
import { cn } from "../../lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, helperText, leftIcon, rightIcon, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#4A5550] dark:text-[#B6C4BC]"
          >
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {leftIcon && (
            <div className="absolute left-3.5 flex items-center pointer-events-none text-[#738078] dark:text-[#7E9086]">
              {leftIcon}
            </div>
          )}
          <input
            id={inputId}
            type={type}
            ref={ref}
            className={cn(
              "flex h-11 w-full rounded-xl border border-[#E2DBD2] bg-white px-4 py-2 text-sm text-[#1C2421] transition-all placeholder:text-[#738078]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4332] focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
              "dark:border-[#253831] dark:bg-[#141F1C] dark:text-[#F3F7F5] dark:placeholder:text-[#7E9086]/60 dark:focus-visible:ring-[#4BB787]",
              leftIcon && "pl-10",
              rightIcon && "pr-10",
              error && "border-[#DC2626] focus-visible:ring-[#DC2626] dark:border-[#F87171]",
              className
            )}
            {...props}
          />
          {rightIcon && (
            <div className="absolute right-3.5 flex items-center text-[#738078] dark:text-[#7E9086]">
              {rightIcon}
            </div>
          )}
        </div>
        {error && (
          <p className="text-xs text-[#DC2626] dark:text-[#F87171]">{error}</p>
        )}
        {!error && helperText && (
          <p className="text-xs text-[#738078] dark:text-[#7E9086]">{helperText}</p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full space-y-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-xs font-semibold uppercase tracking-wider text-[#4A5550] dark:text-[#B6C4BC]"
          >
            {label}
          </label>
        )}
        <textarea
          id={inputId}
          ref={ref}
          className={cn(
            "flex min-h-[100px] w-full rounded-xl border border-[#E2DBD2] bg-white px-4 py-3 text-sm text-[#1C2421] transition-all placeholder:text-[#738078]/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B4332] focus-visible:border-transparent disabled:cursor-not-allowed disabled:opacity-50",
            "dark:border-[#253831] dark:bg-[#141F1C] dark:text-[#F3F7F5] dark:placeholder:text-[#7E9086]/60 dark:focus-visible:ring-[#4BB787]",
            error && "border-[#DC2626] focus-visible:ring-[#DC2626] dark:border-[#F87171]",
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-xs text-[#DC2626] dark:text-[#F87171]">{error}</p>
        )}
        {!error && helperText && (
          <p className="text-xs text-[#738078] dark:text-[#7E9086]">{helperText}</p>
        )}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";

export default Input;
