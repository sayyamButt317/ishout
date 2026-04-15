'use client';

import Image from 'next/image';
import { Play } from 'lucide-react';

export type ContentFeedbackMediaPreviewProps = {
  selectedPreviewMediaUrl: string | null;
  selectedPreviewMediaType: 'video' | 'image' | null;
  isPlaying: boolean;
  setIsPlaying: (playing: boolean) => void;
  setSelectedVideoDuration: (seconds: number | null) => void;
  setSelectedVideoResolution: (resolution: string) => void;
};

export default function ContentFeedbackMediaPreview({
  selectedPreviewMediaUrl,
  selectedPreviewMediaType,
  isPlaying,
  setIsPlaying,
  setSelectedVideoDuration,
  setSelectedVideoResolution,
}: ContentFeedbackMediaPreviewProps) {
  return (
    <div className="relative shrink-0 aspect-9/16 h-[92%] max-h-[600px] overflow-hidden rounded-lg border border-white/10 bg-slate-800">
      {selectedPreviewMediaUrl ? (
        selectedPreviewMediaType === 'image' ? (
          <Image
            src={selectedPreviewMediaUrl}
            alt="Selected chat image"
            fill
            className="object-contain"
            sizes="(max-width: 1280px) 100vw, 600px"
          />
        ) : (
          <>
            <video
              src={selectedPreviewMediaUrl}
              className="h-full w-full object-cover"
              controls={isPlaying}
              onLoadedMetadata={(event) => {
                const media = event.currentTarget;
                setSelectedVideoDuration(media.duration || null);
                if (media.videoWidth && media.videoHeight) {
                  setSelectedVideoResolution(`${media.videoWidth} × ${media.videoHeight}`);
                } else {
                  setSelectedVideoResolution('—');
                }
              }}
            />
            {!isPlaying && (
              <div
                onClick={() => setIsPlaying(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer"
              >
                <Play
                  className="size-16 text-white/80 hover:text-white hover:scale-110 transition-all"
                  fill="currentColor"
                />
              </div>
            )}
          </>
        )
      ) : (
        <div className="flex h-full items-center justify-center text-white/50 text-sm">
          No media available
        </div>
      )}
    </div>
  );
}
