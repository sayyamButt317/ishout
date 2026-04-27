"use client";

interface CountButtonProps {
  count: number;
}

export default function CountButton({ count }: CountButtonProps) {
  return (
    <span className="inline-flex items-center justify-center min-w-[2.5rem] h-7 px-3 rounded-md bg-white/10 text-white/90 text-sm font-medium border border-white/20">
      {count}
    </span>
  );
}
