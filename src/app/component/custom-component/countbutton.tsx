"use client";

interface CountButtonProps {
  count: number;
}

export default function CountButton({ count }: CountButtonProps) {
  return (
    <span className="inline-flex items-center justify-center min-w-10 h-7 px-3 rounded-md bg-foreground/10 text-foreground/90 text-sm font-medium border border-foreground/20">
      {count}
    </span>
  );
}
