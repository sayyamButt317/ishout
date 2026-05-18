'use client';

import Image from 'next/image';
import { MessageSquareWarning, Play } from 'lucide-react';
import { formatVideoDuration } from '@/src/utils/video-duration';
import { cn } from '@/lib/utils';

export type TimelineMarkerComment = {
  id: string;
  text: string;
  timestamp: number;
  snapshot?: string;
};

export type TimelineMarkerVariant = 'pending' | 'saved';

export type TimelineMarkerCardPlacement = 'above' | 'below';

export type TimelineMarkerProps = {
  comment: TimelineMarkerComment;
  duration: number;
  variant?: TimelineMarkerVariant;
  cardPlacement?: TimelineMarkerCardPlacement;
  onClick?: (comment: TimelineMarkerComment) => void;
};

function truncate(text: string, max = 48) {
  const t = text.trim();
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1)}…`;
}

export default function TimelineMarker({
  comment,
  duration,
  variant = 'saved',
  cardPlacement = 'below',
  onClick,
}: TimelineMarkerProps) {
  const position =
    duration > 0
      ? Math.min(100, Math.max(0, (comment.timestamp / duration) * 100))
      : 0;

  const isPending = variant === 'pending';
  const timeLabel = formatVideoDuration(comment.timestamp);
  const showBelow = cardPlacement === 'below';

  const cardContent = (
    <div className="overflow-hidden rounded-lg border border-white/10 bg-[#1c1d26] shadow-[0_12px_40px_rgba(0,0,0,0.55)] ring-1 ring-black/40">
      <div className="flex items-start justify-between gap-2 border-b border-white/6 px-3 py-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <MessageSquareWarning
            size={14}
            className={cn(
              'shrink-0',
              isPending ? 'text-[#ff9bb5]' : 'text-rose-400',
            )}
          />
          <span
            className={cn(
              'text-xs font-semibold',
              isPending ? 'text-[#ff9bb5]' : 'text-rose-300',
            )}
          >
            {isPending ? 'Revision:' : 'Feedback:'}
          </span>
        </div>
        <div className="flex shrink-0 items-center gap-1 text-[11px] font-mono text-white/70">
          <Play size={10} className="fill-current" />
          {timeLabel}
        </div>
      </div>

      {comment.snapshot ? (
        <div className="relative mx-3 mt-2 aspect-video max-h-24 overflow-hidden rounded-md border border-white/10 bg-black">
          <Image
            src={comment.snapshot}
            alt="Frame at comment"
            fill
            className="object-contain"
            sizes="240px"
          />
        </div>
      ) : null}

      <p className="px-3 py-2 text-sm leading-snug text-white/75">
        {truncate(comment.text, 72)}
      </p>

      <div className="border-t border-white/6 px-3 py-1.5">
        <span
          className={cn(
            'text-[10px] font-bold uppercase tracking-wider',
            isPending ? 'text-violet-300/90' : 'text-violet-300/70',
          )}
        >
          {isPending ? 'Pending revision' : 'Saved feedback'}
        </span>
      </div>
    </div>
  );

  return (
    <div
      className="pointer-events-auto absolute top-1/2 z-20 -translate-x-1/2 -translate-y-1/2"
      style={{ left: `${position}%` }}
    >
      <div className="group relative flex flex-col items-center">
        <button
          type="button"
          title={comment.text}
          onClick={(e) => {
            e.stopPropagation();
            onClick?.(comment);
          }}
          className={cn(
            'relative z-10 size-3.5 rounded-full border-2 border-white/90 shadow-md transition',
            'hover:scale-125 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50',
            isPending
              ? 'bg-[#ff4e7e] shadow-[0_0_10px_rgba(255,78,126,0.55)]'
              : 'bg-red-500',
          )}
          aria-label={`Feedback at ${timeLabel}`}
        />

        <div
          className={cn(
            'pointer-events-none absolute left-1/2 z-50 w-[min(240px,calc(100vw-2rem))] -translate-x-1/2',
            'scale-95 opacity-0 transition-all duration-150',
            'group-hover:pointer-events-auto group-hover:scale-100 group-hover:opacity-100',
            showBelow ? 'top-full mt-2' : 'bottom-full mb-2',
          )}
        >
          {showBelow ? (
            <>
              <div
                className="mx-auto h-0 w-0 border-x-8 border-b-8 border-x-transparent border-b-[#1c1d26]"
                aria-hidden
              />
              {cardContent}
            </>
          ) : (
            <>
              {cardContent}
              <div
                className="mx-auto h-0 w-0 border-x-8 border-t-8 border-x-transparent border-t-[#1c1d26]"
                aria-hidden
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
