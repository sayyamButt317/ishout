'use client';

import Image from 'next/image';
import { cn } from '@/lib/utils';

export interface IPhoneMockupProps {
  src: string;
  alt?: string;
  className?: string;
  imageObjectFit?: 'contain' | 'cover';
  unoptimized?: boolean;
}

export default function IPhoneMockup({
  src,
  alt = 'Screenshot preview',
  className,
  imageObjectFit = 'contain',
  unoptimized = true,
}: IPhoneMockupProps) {
  return (
    <div
      className={cn(
        'mx-auto flex w-full max-w-[min(100%,300px)] justify-center sm:max-w-[min(100%,340px)]',
        className,
      )}
    >
      {/* Outer chassis */}
      <div className="relative w-full rounded-[2.85rem] bg-linear-to-b from-zinc-600 via-zinc-800 to-zinc-950 p-[9px] shadow-[0_28px_56px_-16px_rgba(0,0,0,0.9),inset_0_1px_0_rgba(255,255,255,0.12)] ring-1 ring-white/15">
        {/* Left buttons */}
        <div
          className="absolute -left-[3px] top-[20%] z-0 h-9 w-[3px] rounded-l-md bg-zinc-700 shadow-sm"
          aria-hidden
        />
        <div
          className="absolute -left-[3px] top-[28%] z-0 h-12 w-[3px] rounded-l-md bg-zinc-700 shadow-sm"
          aria-hidden
        />
        {/* Right button (power) */}
        <div
          className="absolute -right-[3px] top-[24%] z-0 h-14 w-[3px] rounded-r-md bg-zinc-700 shadow-sm"
          aria-hidden
        />

        {/* Screen glass */}
        <div className="relative aspect-9/19.5 w-full overflow-hidden rounded-[2.2rem] bg-black ring-1 ring-black/80">
          {/* Glare edge */}
          <div
            className="pointer-events-none absolute inset-0 rounded-[2.2rem] ring-1 ring-inset ring-white/10"
            aria-hidden
          />

          {/* Dynamic Island */}
          <div className="pointer-events-none absolute left-1/2 top-3 z-30 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black shadow-[inset_0_-1px_2px_rgba(255,255,255,0.06)]" />

          {/* Status bar hint */}
          <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-12 bg-linear-to-b from-black/50 to-transparent" />

          <Image
            src={src}
            alt={alt}
            fill
            sizes="(max-width: 768px) 90vw, 340px"
            className={cn(
              imageObjectFit === 'cover' ? 'object-cover object-top' : 'object-contain object-top',
            )}
            unoptimized={unoptimized}
          />

          {/* Home indicator */}
          <div className="pointer-events-none absolute inset-x-0 bottom-2.5 z-20 flex justify-center">
            <div className="h-[5px] w-[110px] rounded-full bg-white/22" />
          </div>
        </div>
      </div>
    </div>
  );
}
