import React from 'react';
import { cn } from '@/lib/utils';

interface SpinnerProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  colors?: [string, string, string]; // [start, mid, end]
}

// Default brand colors mentioned in code: #f7941D (orange), white, #1E4B8E (blue)
const DEFAULT_COLORS: [string, string, string] = ['#ffff004d', '#FFFFFF', '#1E4B8E'];

const Spinner = ({ className, size = 'md', colors = DEFAULT_COLORS }: SpinnerProps) => {
  const sizeClasses: Record<typeof size, string> = {
    sm: 'w-5 h-5',
    md: 'w-7 h-7',
    lg: 'w-10 h-10',
  } as const;

  // Inner cutout thickness per size to form a clean ring
  const insetBySize: Record<typeof size, string> = {
    sm: 'inset-[3px]',
    md: 'inset-[4px]',
    lg: 'inset-[6px]',
  } as const;

  const gradient = `conic-gradient(${colors[0]}, ${colors[1]}, ${colors[2]}, ${colors[0]})`;

  return (
    <div className={cn('relative inline-flex items-center justify-center', sizeClasses[size], className)}>
      {/* Gradient ring */}
      <div
        className="absolute inset-0 rounded-full animate-spin"
        style={{ background: gradient }}
      />
      {/* Inner cutout to create donut shape */}
      <div className={cn('absolute rounded-full bg-white', insetBySize[size])} />
      {/* Fallback center dot for alignment (invisible) */}
      <span className="opacity-0">&nbsp;</span>
    </div>
  );
};

export default Spinner;