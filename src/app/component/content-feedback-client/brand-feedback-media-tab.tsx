'use client';

import Image from 'next/image';
import useBrandMediaUrlsHook from '@/src/routes/Admin/Hooks/content/brand-media-urls';

type BrandFeedbackMediaTabProps = {
  negotiationId: string;
  onSelectMedia: (url: string, type: 'video' | 'image') => void;
};

export default function BrandFeedbackMediaTab({
  negotiationId,
  onSelectMedia,
}: BrandFeedbackMediaTabProps) {
  const { data, isLoading } = useBrandMediaUrlsHook(negotiationId);
  const mediaItems = data?.media_items ?? [];

  return (
    <div className="min-h-75 flex-1 overflow-y-auto p-3 lg:min-h-0">
      {isLoading ? (
        <p className="text-sm text-white/50">Loading media...</p>
      ) : mediaItems.length > 0 ? (
        <div className="grid grid-cols-2 gap-3">
          {mediaItems.map((item, index) => {
            const url = item.media_url;
            const lowerType = (item.media_type ?? '').toLowerCase();
            const lowerUrl = url.toLowerCase();
            const isVideo =
              lowerType === 'video' ||
              /\.(mp4|mov|webm|mkv|avi|m4v)(\?|$)/.test(lowerUrl);
            const isImage =
              lowerType === 'image' ||
              /\.(jpg|jpeg|png|webp|gif|bmp|svg)(\?|$)/.test(lowerUrl);

            return (
              <button
                key={`${url}-${index}`}
                type="button"
                onClick={() => {
                  if (isVideo) onSelectMedia(url, 'video');
                  if (isImage) onSelectMedia(url, 'image');
                }}
                className="rounded-lg border border-white/10 bg-white/5 p-2 text-left transition-colors hover:bg-white/10"
              >
                <div className="mb-2 h-28 overflow-hidden rounded bg-white/10">
                  {isVideo ? (
                    <video
                      src={url}
                      className="h-full w-full object-cover"
                      muted
                      preload="metadata"
                    />
                  ) : isImage ? (
                    <Image
                      src={url}
                      alt={`Media ${index + 1}`}
                      width={320}
                      height={180}
                      className="h-full w-full object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-[10px] font-semibold text-white/40">
                      Unsupported media
                    </div>
                  )}
                </div>
                <p className="truncate text-xs font-semibold text-white">
                  Media {index + 1}
                </p>
                <p className="truncate text-[10px] text-white/40">{url}</p>
              </button>
            );
          })}
        </div>
      ) : (
        <p className="text-sm text-white/50">No media found for this negotiation.</p>
      )}
    </div>
  );
}
