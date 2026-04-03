'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { formatVideoDuration } from '@/src/utils/video-duration';

export const SCRUB_PREVIEW_MAX_W = 240;
export const SCRUB_PREVIEW_MAX_H = 135;

export type ScrubHoverPosition = {
  time: number;
  clientX: number;
  trackTop: number;
};

type UseTimelineScrubOptions = {
  selectedPreviewMediaUrl: string | null;
  duration: number | null;
};

type TimelineScrubPreviewProps = {
  scrubHover: ScrubHoverPosition;
  mediaUrl: string;
  duration: number | null;
  scrubVideoRef: React.RefObject<HTMLVideoElement | null>;
  pendingScrubTimeRef: React.MutableRefObject<number | null>;
};


export function useTimelineScrub({
  selectedPreviewMediaUrl,
  duration,
}: UseTimelineScrubOptions) {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const scrubVideoRef = useRef<HTMLVideoElement | null>(null);
  const scrubSeekRafRef = useRef(0);
  const pendingScrubTimeRef = useRef<number | null>(null);
  const [scrubHover, setScrubHover] = useState<ScrubHoverPosition | null>(null);

  const queueScrubPreviewSeek = useCallback((t: number, d: number) => {
    if (!Number.isFinite(t) || d <= 0) return;
    const clamped = Math.min(Math.max(0, t), d - 0.04);
    pendingScrubTimeRef.current = clamped;
    if (scrubSeekRafRef.current) return;
    scrubSeekRafRef.current = requestAnimationFrame(() => {
      scrubSeekRafRef.current = 0;
      const v = scrubVideoRef.current;
      const target = pendingScrubTimeRef.current;
      if (v && target != null && Math.abs(v.currentTime - target) > 0.06) {
        v.currentTime = target;
      }
    });
  }, []);

  useEffect(() => {
    return () => {
      if (scrubSeekRafRef.current) {
        cancelAnimationFrame(scrubSeekRafRef.current);
      }
    };
  }, []);

  const clearScrubHover = useCallback(() => {
    setScrubHover(null);
    pendingScrubTimeRef.current = null;
  }, []);

  const handleTrackMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!selectedPreviewMediaUrl || !duration || duration <= 0 || !trackRef.current) {
        return;
      }
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      const t = ratio * duration;
      setScrubHover({
        time: t,
        clientX: e.clientX,
        trackTop: rect.top,
      });
      queueScrubPreviewSeek(t, duration);
    },
    [duration, queueScrubPreviewSeek, selectedPreviewMediaUrl],
  );

  return {
    trackRef,
    scrubVideoRef,
    pendingScrubTimeRef,
    scrubHover,
    clearScrubHover,
    handleTrackMouseMove,
  };
}

export function TimelineScrubPreview({
  scrubHover,
  mediaUrl,
  duration,
  scrubVideoRef,
  pendingScrubTimeRef,
}: TimelineScrubPreviewProps) {
  return (
    <div
      className="pointer-events-none fixed z-200 flex flex-col items-center gap-1 drop-shadow-2xl"
      style={{
        width: SCRUB_PREVIEW_MAX_W,
        left: Math.min(
          typeof window !== 'undefined'
            ? window.innerWidth - SCRUB_PREVIEW_MAX_W - 8
            : 0,
          Math.max(8, scrubHover.clientX - SCRUB_PREVIEW_MAX_W / 2),
        ),
        top: Math.max(8, scrubHover.trackTop - SCRUB_PREVIEW_MAX_H - 40),
      }}
    >
      <div
        className="flex max-h-[135px] w-[240px] max-w-[min(240px,calc(100vw-16px))] items-center justify-center overflow-hidden rounded-md border border-white/25 bg-black shadow-xl ring-1 ring-black/40"
        style={{ minHeight: 76 }}
      >
        <video
          ref={scrubVideoRef}
          key={mediaUrl}
          src={mediaUrl}
          muted
          playsInline
          preload="auto"
          className="max-h-[135px] max-w-full object-contain"
          onLoadedData={(e) => {
            const t = pendingScrubTimeRef.current;
            const d = duration ?? 0;
            if (t != null && d > 0) {
              e.currentTarget.currentTime = Math.min(Math.max(0, t), d - 0.04);
            }
          }}
        />
      </div>
      <span className="rounded bg-black/90 px-2 py-0.5 font-mono text-[11px] font-semibold tabular-nums text-white">
        {formatVideoDuration(scrubHover.time)}
      </span>
    </div>
  );
}
