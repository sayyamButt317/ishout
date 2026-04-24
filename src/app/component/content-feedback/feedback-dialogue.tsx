'use client';
import { useCallback, useState } from 'react';
import Image from 'next/image';
import { MessageSquarePlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { captureVideoFrameDataUrl } from '@/src/utils/content-feedback-chat';

export default function VideoFeedbackWorkspace({
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
  onSubmitTimedFeedback,
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
  const [composerSnapshot, setComposerSnapshot] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);


  const openComposerAtTime = useCallback(
    (t: number) => {
      const video = videoRef.current;
      if (!video || !Number.isFinite(t) || !duration || duration <= 0) return;
      const clamped = Math.min(Math.max(0, t), duration - 0.001);
      video.pause();
      setIsPlaying(false);
      const capture = () => {
        requestAnimationFrame(() => {
          const snapshot = captureVideoFrameDataUrl(video);
          setComposerTime(clamped);
          setComposerSnapshot(snapshot);
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
    [duration, setIsPlaying, videoRef]
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
      await onSubmitTimedFeedback({
        text,
        timestamp: composerTime,
        snapshotDataUrl: composerSnapshot,
      });
      setComposerOpen(false);
      setPinMode(false);
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

  return (
    <div className="flex min-h-0 w-full flex-1 flex-col gap-2">
      {showVideoTools && (
        <div className="flex flex-wrap items-center gap-2 px-1">
          <Button
            type="button"
            size="sm"
            variant={pinMode ? 'default' : 'outline'}
            disabled={!sendEnabled}
            onClick={() => setPinMode((p) => !p)}
            className={
              pinMode
                ? 'bg-(--color-primaryButton) text-white'
                : 'border-white/20 bg-white/5 text-white hover:bg-white/10'
            }
          >
            <MessageSquarePlus className="mr-1.5 size-3.5" />
            {pinMode ? 'Pin mode on' : 'Pin mode'}
          </Button>
          <span className="text-[11px] text-white/50">
            {pinMode
              ? 'Click the video to comment on this frame'
              : 'Scrub the bar below or turn on Pin mode'}
          </span>
          <span className="ml-auto font-mono text-xs tabular-nums text-white/70">
            {formatVideoDuration(currentTime)} / {formatVideoDuration(duration)}
          </span>
        </div>
      )}

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
      />

      {showVideoTools && sendEnabled && (
        <div className="px-1 pb-1">
          <p className="mb-1 text-[10px] font-bold uppercase tracking-wide text-white/45">
            Timeline — hover for preview, click to add feedback
          </p>
          <div
            className="relative h-9 w-full"
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
            <div className="pointer-events-none absolute inset-0">
              {markers.map((m) => {
                const left =
                  duration > 0
                    ? Math.min(100, Math.max(0, (m.timestamp / duration) * 100))
                    : 0;
                return (
                  <button
                    key={m.id}
                    type="button"
                    title={m.text}
                    className="pointer-events-auto absolute top-1/2 z-10 size-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white/80 bg-red-500 shadow-md transition hover:scale-110"
                    style={{ left: `${left}%` }}
                    onClick={(e) => {
                      e.stopPropagation();
                      onMarkerSeek?.(m.timestamp);
                      const v = videoRef.current;
                      if (v) {
                        v.currentTime = m.timestamp;
                        v.pause();
                        setIsPlaying(false);
                      }
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      )}

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
            <DialogTitle>Add video feedback</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-white/60">
            Timecode {formatVideoDuration(composerTime)}
          </p>
          {composerSnapshot ? (
            <Image
              src={composerSnapshot}
              alt="Frame"
              width={640}
              height={360}
              unoptimized
              className="max-h-48 w-full rounded-lg object-contain bg-black"
            />
          ) : (
            <p className="text-xs text-amber-200/90">
              Snapshot unavailable. Feedback will still
              include the timecode.
            </p>
          )}
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
              className="text-white/80"
              onClick={() => setComposerOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={submitting || !commentText.trim()}
              className="bg-(--color-primaryButton) text-white hover:opacity-90"
              onClick={() => void handleSubmit()}
            >
              {submitting ? 'Sending…' : 'Send Revision'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
