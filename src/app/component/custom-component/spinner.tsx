import React from "react";
import { cn } from "@/lib/utils";

interface SpinnerProps {
  size?: number;
  className?: string;
}

const Spinner = ({ size = 32, className }: SpinnerProps) => {
  const borderSize = Math.max(2, Math.floor(size / 12));
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center",
        className
      )}
      aria-label="Loading"
    >
      <div
        className="animate-spin rounded-full border border-transparent border-t-white border-r-white/80"
        style={{
          width: size,
          height: size,
          borderWidth: borderSize,
          borderTopColor: "rgba(255,255,255,0.9)",
          borderRightColor: "rgba(255,255,255,0.7)",
          borderLeftColor: "transparent",
          borderBottomColor: "transparent",
        }}
      />
    </div>
  );
};

export default Spinner;
