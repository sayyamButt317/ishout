'use client';
import { useCallback, useMemo, useState } from 'react';
import { Button } from '@/components/ui/button';
import { TooltipProvider } from '@/components/ui/tooltip';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import VideoPanel from '@/src/app/component/content-feedback/video-panel';
import {
  TimelineScrubPreview,
  useTimelineScrub,
} from '@/src/app/component/content-feedback/timeline-scrub';
import { formatVideoDuration } from '@/src/utils/video-duration';
import { VideoFeedbackWorkspaceProps } from '@/src/types/Admin-Type/Content-type';
import useRevisionMessageStore from '@/src/store/Feedback/revisionmessage-store';
import TimelineMarker from '@/src/app/component/content-feedback/TimelineMarker';
import type { TimelineMarkerData } from '@/src/types/Admin-Type/timeline-type';

export default function VideoPlayerWithRevisionTimeline({
  videoRef,
  selectedPreviewMediaUrl,
  selectedPreviewMediaType,
  isPlaying,
  setIsPlaying,
  setSelectedVideoDuration,
  setSelectedVideoResolution,
  duration,
  markers,
  sendEnabled,
  contentUrl,
  onMarkerSeek,
}: VideoFeedbackWorkspaceProps) {
  const {
    trackRef,
    scrubVideoRef,
    pendingScrubTimeRef,
    scrubHover,
    clearScrubHover,
    handleTrackMouseMove,
  } = useTimelineScrub({
    selectedPreviewMediaUrl,
    duration,
  });

  const [pinMode, setPinMode] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [composerOpen, setComposerOpen] = useState(false);
  const [composerTime, setComposerTime] = useState(0);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { addTimestamp, timestamps: pendingTimestamps } = useRevisionMessageStore();

  const timelineMarkers = useMemo((): Array<
    TimelineMarkerData & { variant: 'saved' | 'pending' }
  > => {
    const saved = markers.map((m) => ({
      ...m,
      variant: 'saved' as const,
    }));

    const pending = pendingTimestamps
      .filter((t) => typeof t.time === 'number' && t.time >= 0 && Boolean(t.feedback?.trim()))
      .map((t, index) => ({
        id: `pending-${index}-${t.time}`,
        timestamp: t.time,
        text: t.feedback,
        variant: 'pending' as const,
      }));

    return [...saved, ...pending];
  }, [markers, pendingTimestamps]);

  const seekToMarker = useCallback(
    (timestamp: number) => {
      onMarkerSeek?.(timestamp);
      const v = videoRef.current;
      if (v) {
        v.currentTime = timestamp;
        v.pause();
        setIsPlaying(false);
      }
    },
    [onMarkerSeek, setIsPlaying, videoRef],
  );

  const openComposerAtTime = useCallback(
    (t: number) => {
      const video = videoRef.current;
      if (!video || !Number.isFinite(t) || !duration || duration <= 0) return;
      const clamped = Math.min(Math.max(0, t), duration - 0.001);
      video.pause();
      setIsPlaying(false);
      const capture = () => {
        requestAnimationFrame(() => {
          setComposerTime(clamped);
          setCommentText('');
          setComposerOpen(true);
        });
      };

      const handleSeeked = () => {
        video.removeEventListener('seeked', handleSeeked);
        capture();
      };
      if (video.readyState < 2) {
        const handleLoaded = () => {
          video.removeEventListener('loadeddata', handleLoaded);
          video.addEventListener('seeked', handleSeeked);
          video.currentTime = clamped;
        };

        video.addEventListener('loadeddata', handleLoaded);
      } else {
        video.addEventListener('seeked', handleSeeked);
        video.currentTime = clamped;
      }
    },
    [duration, setIsPlaying, videoRef],
  );

  const handlePinComment = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    openComposerAtTime(video.currentTime);
  }, [openComposerAtTime, videoRef]);

  const handleTrackClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!sendEnabled || !contentUrl || selectedPreviewMediaType !== 'video') return;
      if (!duration || duration <= 0 || !trackRef.current) return;
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
      openComposerAtTime(ratio * duration);
    },
    [
      contentUrl,
      duration,
      openComposerAtTime,
      selectedPreviewMediaType,
      sendEnabled,
      trackRef,
    ],
  );

  const handleSubmit = async () => {
    const text = commentText.trim();
    if (!text) return;
    setSubmitting(true);
    try {
      addTimestamp({
        time: Number(composerTime.toFixed(2)),
        feedback: text,
      });

      setComposerOpen(false);
      setPinMode(false);
      setCommentText('');
    } finally {
      setSubmitting(false);
    }
  };

  const progressPct =
    duration && duration > 0
      ? Math.min(100, Math.max(0, (currentTime / duration) * 100))
      : 0;

  const showVideoTools =
    selectedPreviewMediaType === 'video' &&
    !!selectedPreviewMediaUrl &&
    !!duration &&
    duration > 0;

  const timelineSlot =
    showVideoTools && sendEnabled ? (
      <div>
        <p className="mb-1.5 text-[10px] font-bold uppercase tracking-wide text-white/45">
          Timeline - hover for preview, click to add feedback
        </p>
        <div
          className="relative h-9 w-full overflow-visible"
          onMouseMove={handleTrackMouseMove}
          onMouseLeave={clearScrubHover}
        >
          <div
            ref={trackRef}
            className="absolute inset-0 cursor-crosshair rounded-md bg-white/15 ring-1 ring-white/10"
            onClick={handleTrackClick}
            title="Hover for frame preview · click to add feedback"
          >
            <div
              className="pointer-events-none absolute inset-y-0 left-0 rounded-l-md bg-(--color-primaryButton)/35"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <TooltipProvider delayDuration={100}>
            <div className="pointer-events-none absolute inset-0">
              {timelineMarkers.map((m) => (
                <TimelineMarker
                  key={m.id}
                  comment={{
                    id: m.id,
                    text: m.text,
                    timestamp: m.timestamp,
                    snapshot: m.snapshot,
                  }}
                  duration={duration}
                  variant={m.variant}
                  cardPlacement="below"
                  onClick={(c) => seekToMarker(c.timestamp)}
                />
              ))}
            </div>
          </TooltipProvider>
        </div>
      </div>
    ) : null;

  return (
    <div className="flex w-full shrink-0 flex-col gap-2">
      <VideoPanel
        ref={videoRef}
        selectedPreviewMediaUrl={selectedPreviewMediaUrl}
        selectedPreviewMediaType={selectedPreviewMediaType}
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        setSelectedVideoDuration={setSelectedVideoDuration}
        setSelectedVideoResolution={setSelectedVideoResolution}
        pinCommentMode={pinMode && sendEnabled && !!contentUrl}
        onPinComment={handlePinComment}
        onTimeUpdate={(t) => setCurrentTime(t)}
        timelineSlot={timelineSlot}
      />

      {showVideoTools && scrubHover && selectedPreviewMediaUrl && (
        <TimelineScrubPreview
          scrubHover={scrubHover}
          mediaUrl={selectedPreviewMediaUrl}
          duration={duration}
          scrubVideoRef={scrubVideoRef}
          pendingScrubTimeRef={pendingScrubTimeRef}
        />
      )}

      <Dialog open={composerOpen} onOpenChange={setComposerOpen}>
        <DialogContent className="max-w-md border-white/10 bg-(--color-background) text-white sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Your Feedback</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-white/60">
            Timecode {formatVideoDuration(composerTime)}
          </p>
          <textarea
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Write feedback for this moment…"
            className="min-h-28 w-full resize-none rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white placeholder:text-white/35"
          />
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="ghost"
              className="cursor-pointer text-white/80"
              onClick={() => setComposerOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={submitting || !commentText.trim()}
              className="cursor-pointer bg-primaryButton text-white hover:opacity-90"
              onClick={() => void handleSubmit()}
            >
              Add Feedback
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
