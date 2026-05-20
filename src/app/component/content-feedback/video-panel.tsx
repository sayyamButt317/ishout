'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';
import { forwardRef } from 'react';
import { VideoPanelProps } from '@/src/types/Admin-Type/Video-type';

const VideoPanel = forwardRef<HTMLVideoElement, VideoPanelProps>(function VideoPanel(
  {
    selectedPreviewMediaUrl,
    selectedPreviewMediaType,
    isPlaying,
    setIsPlaying,
    setSelectedVideoDuration,
    setSelectedVideoResolution,
    timelineSlot,
    pinCommentMode = false,
    onPinComment,
    onTimeUpdate,
  },
  ref,
) {

  function isValidMediaUrl(value: string) {
    if (!value) return false;
    try {
      const url = new URL(value);
      return url.protocol === 'http:' || url.protocol === 'https:';
    } catch {
      return false;
    }
  }
  function isDataUrl(value: string) {
    return value.startsWith('data:');
  }

  const hasTimeline = Boolean(timelineSlot);

  return (
    <div
      className={`flex w-full flex-col rounded-lg border border-white/10 bg-slate-800 ${hasTimeline ? 'shrink-0' : 'min-h-[min(350px,58vh)] flex-1 overflow-hidden'
        }`}
    >
      <div
        className={`relative flex items-center justify-center overflow-hidden bg-black ${hasTimeline ? 'min-h-[min(320px,42vh)]' : 'min-h-[min(480px,56vh)] flex-1'
          }`}
      >
        {selectedPreviewMediaUrl ? (
          isDataUrl(selectedPreviewMediaUrl) || (isValidMediaUrl(selectedPreviewMediaUrl) && selectedPreviewMediaType === 'image') ? (
            <Image
              src={selectedPreviewMediaUrl}
              alt="Selected chat image"
              fill
              className="object-contain"
              sizes="(max-width: 1280px) 100vw, 600px"
            />
          ) : isValidMediaUrl(selectedPreviewMediaUrl) ? (
            <>
              <video
                ref={ref}
                src={selectedPreviewMediaUrl}
                className={`max-h-full max-w-full object-contain ${pinCommentMode ? 'cursor-crosshair' : ''}`}
                controls={isPlaying}
                playsInline
                onTimeUpdate={(e) =>
                  onTimeUpdate?.(e.currentTarget.currentTime)
                }
                onLoadedMetadata={(event) => {
                  const media = event.currentTarget;
                  setSelectedVideoDuration(
                    Number.isFinite(media.duration) ? media.duration : null,
                  );
                  if (media.videoWidth && media.videoHeight) {
                    setSelectedVideoResolution(
                      `${media.videoWidth} × ${media.videoHeight}`,
                    );
                  } else {
                    setSelectedVideoResolution('—');
                  }
                }}
                onClick={() => {
                  if (pinCommentMode && onPinComment) {
                    onPinComment();
                  }
                }}
              />

              {pinCommentMode && (
                <div className="pointer-events-none absolute left-3 top-3 z-10 rounded-md bg-black/70 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white/90">
                  Click video to comment
                </div>
              )}

              {!isPlaying && !pinCommentMode && (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="absolute inset-0 z-5 flex cursor-pointer items-center justify-center bg-black/20 transition-colors hover:bg-black/30"
                >
                  <Play
                    className="size-16 text-white/80 transition-all hover:scale-110 hover:text-white"
                    fill="currentColor"
                  />
                </button>
              )}

              {!isPlaying && pinCommentMode && (
                <button
                  type="button"
                  onClick={() => setIsPlaying(true)}
                  className="absolute left-1/2 top-1/2 z-5 flex size-14 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                  aria-label="Play video"
                >
                  <Play className="ml-0.5 size-7" fill="currentColor" />
                </button>
              )}
            </>
          ) : (
            <div className="flex min-h-[min(480px,56vh)] w-full items-center justify-center text-sm text-white/50">
              No media available
            </div>
          )
        ) : (
          <div className="flex min-h-[min(480px,56vh)] w-full items-center justify-center text-sm text-white/50">
            No media available
          </div>
        )}
      </div>

      {timelineSlot ? (
        <div className="shrink-0 overflow-visible border-t border-white/10 bg-black/50 px-3 py-2.5">
          {timelineSlot}
        </div>
      ) : null}
    </div>
  );
});

export default VideoPanel;
