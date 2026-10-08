import React from "react";
import { Star } from "lucide-react";
import { cn } from "../../lib/utils";

interface RatingProps {
  value: number; // e.g., 4.8
  count?: number; // review count
  size?: "sm" | "md";
  className?: string;
  showText?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  count,
  size = "md",
  className,
  showText = true,
}) => {
  const starSize = size === "sm" ? "w-3.5 h-3.5" : "w-4 h-4";
  const rounded = Math.round(value * 2) / 2;

  return (
    <div className={cn("inline-flex items-center gap-1.5", className)}>
      <div className="flex items-center text-[#D9A066]">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={cn(
              starSize,
              star <= rounded
                ? "fill-[#D9A066] text-[#D9A066]"
                : "text-[#E2DBD2] dark:text-[#253831]"
            )}
          />
        ))}
      </div>
      {showText && (
        <span className="text-xs font-semibold text-[#1C2421] dark:text-[#F3F7F5]">
          {value.toFixed(1)}
        </span>
      )}
      {count !== undefined && (
        <span className="text-xs text-[#738078] dark:text-[#7E9086]">
          ({count})
        </span>
      )}
    </div>
  );
};

export default Rating;
