import React from "react";
import { cn } from "../../lib/utils";

export const Skeleton: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-[#ECE5DC] dark:bg-[#243731]",
        className
      )}
      {...props}
    />
  );
};

export default Skeleton;
