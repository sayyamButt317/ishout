import { useEffect, useMemo, useState } from 'react';
import useRevisionMessageStore from '@/src/store/Feedback/revisionmessage-store';
import CustomButton from '../button';
import SendRevisionHook from '@/src/routes/Admin/Hooks/feedback/send-revision-hook';
import useContentRevisionHistoryHook from '@/src/routes/Admin/Hooks/feedback/content-revision-history-hook';
import { Loader2, RefreshCw, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

interface TimestampItem {
  time: number;
  feedback: string;
}

function isVideoRevisionUI(contentType: string, contentUrl: string): boolean {
  const t = (contentType || '').toUpperCase();
  if (t === 'IMAGE') return false;
  if (t === 'VIDEO' || t === 'REEL') return true;

  const u = (contentUrl || '').trim().toLowerCase();
  if (!u) return t !== 'IMAGE';

  if (/\.(jpg|jpeg|png|gif|webp|avif|bmp|svg)(\?|#|$|&)/i.test(u)) return false;
  if (/\.(mp4|m4v|webm|mov|mkv|avi|ogv)(\?|#|$|&)/i.test(u)) return true;
  if (u.includes('mime=video') || u.includes('/video')) return true;

  return t === 'POST' || t === 'STORY';
}

function formatVideoTimestamp(seconds: number): string {
  const total = Math.floor(seconds);
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

type RevisionMessageProps = {
  reviewSide?: 'admin' | 'brand';
  negotiationId?: string;
  threadId?: string;
};

type WorkflowAccent = 'action' | 'resolved' | 'discussion';

const accentStyles: Record<
  WorkflowAccent,
  {
    bar: string;
    timeBox: string;
    timeText: string;
    badge: string;
    badgeText: string;
  }
> = {
  action: {
    bar: 'bg-[#ff4e7e]',
    timeBox: 'border-[#ff4e7e]/30 bg-[#ff4e7e]/10',
    timeText: 'text-[#ff4e7e]',
    badge: 'bg-[#ff4e7e]/15 border border-[#ff4e7e]/25',
    badgeText: 'text-[#ff9bb5]',
  },
  resolved: {
    bar: 'bg-teal-400',
    timeBox: 'border-teal-400/30 bg-teal-400/10',
    timeText: 'text-teal-300',
    badge: 'bg-teal-400/15 border border-teal-400/25',
    badgeText: 'text-teal-200',
  },
  discussion: {
    bar: 'bg-white/25',
    timeBox: 'border-white/15 bg-white/5',
    timeText: 'text-white/50',
    badge: 'bg-white/8 border border-white/15',
    badgeText: 'text-white/45',
  },
};

function PendingRevisionCard({
  item,
  index,
  authorLabel,
  onRemove,
}: {
  item: TimestampItem;
  index: number;
  authorLabel: string;
  onRemove: (index: number) => void;
}) {
  const accent = accentStyles.action;
  const timeLabel = formatVideoTimestamp(item.time);

  return (
    <article
      className={cn(
        'relative overflow-hidden rounded-2xl border border-white/[0.08]',
        'bg-[#12141c] shadow-[0_8px_32px_rgba(0,0,0,0.35)]',
      )}
    >
      <div className={cn('absolute inset-y-0 left-0 w-1', accent.bar)} />

      <div className="flex gap-4 p-4 pl-5">
        <div
          className={cn(
            'flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border font-mono text-sm font-bold',
            accent.timeBox,
            accent.timeText,
          )}
        >
          {timeLabel}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-white">{authorLabel}</span>
              <span
                className={cn(
                  'rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide',
                  accent.badge,
                  accent.badgeText,
                )}
              >
                Action required
              </span>
            </div>
            <span className="shrink-0 text-[11px] text-white/35">
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="flex h-8 w-8 items-center cursor-pointer justify-center rounded-lg text-red-400/90 transition hover:bg-red-500/10 hover:text-red-300"
                aria-label="Remove revision message"
              >
                <Trash2 className="size-4" />
              </button></span>
          </div>
          <p className="mt-2 text-sm leading-relaxed text-white/85">{item.feedback}</p>
        </div>
      </div>
    </article>
  );
}

export const RevisionMessage = ({
  reviewSide = 'admin',
  negotiationId,
  threadId: threadIdProp,
}: RevisionMessageProps) => {
  const sendinfo = SendRevisionHook();
  const revisionHistory = useContentRevisionHistoryHook();
  const { mutate: loadRevisionHistory } = revisionHistory;

  const [imageRevisionNote, setImageRevisionNote] = useState('');

  const {
    removeTimestamp,
    timestamps,
    reset,
    addTimestamp,
    clearTimestamps,
    contentType,
    contentUrl,
  } = useRevisionMessageStore();

  const showVideoTimeline = useMemo(
    () => isVideoRevisionUI(contentType, contentUrl),
    [contentType, contentUrl],
  );

  const authorLabel = reviewSide === 'brand' ? 'Brand Lead' : 'Admin';

  const pendingCount = showVideoTimeline
    ? timestamps.filter((t) => t.feedback?.trim()).length
    : imageRevisionNote.trim()
      ? 1
      : 0;

  useEffect(() => {
    const id = (negotiationId ?? '').trim();
    if (!id) return;
    loadRevisionHistory(id);
  }, [negotiationId, loadRevisionHistory]);

  useEffect(() => {
    if (showVideoTimeline) setImageRevisionNote('');
  }, [showVideoTimeline]);

  const hasTimestampWithMessage = useMemo(
    () =>
      timestamps.some(
        (item) =>
          typeof item.time === 'number' &&
          item.time >= 0 &&
          Boolean(item.feedback?.trim()),
      ),
    [timestamps],
  );

  const canSendImageRevision = Boolean(imageRevisionNote.trim());

  const sendRevisionTimeandMessage = () => {
    const s = useRevisionMessageStore.getState();
    const stamps = s.timestamps;
    const effectiveNegotiationId =
      s.negotiation_id?.trim() || negotiationId?.trim() || '';
    const effectiveThreadId = s.thread_id?.trim() || threadIdProp?.trim() || '';

    if (!stamps.length) {
      toast.error('Add at least one timestamp before requesting a revision.');
      return;
    }
    if (!effectiveNegotiationId || !effectiveThreadId) {
      toast.error(
        'Missing negotiation/thread id. Select content first, then try again.',
      );
      return;
    }

    const hasInvalidTimestamp = stamps.some(
      (t) => !t.feedback?.trim() || typeof t.time !== 'number' || t.time < 0,
    );
    if (hasInvalidTimestamp) {
      toast.error('Invalid revision data. Please re-check the timestamps and feedback.');
      return;
    }

    const storePayload = s.buildPayload();
    const finalPayload = storePayload
      ? {
        ...storePayload,
        negotiation_id: storePayload.negotiation_id || effectiveNegotiationId,
        thread_id: storePayload.thread_id || effectiveThreadId,
      }
      : {
        negotiation_id: effectiveNegotiationId,
        thread_id: effectiveThreadId,
        message_id: s.message_id || '',
        contentType: s.contentType,
        contentUrl: s.contentUrl,
        current_version: s.current_version,
        status: s.status,
        revisions: [
          { version: s.current_version, timestamps: stamps, status: 'OPEN' as const },
        ],
      };

    sendinfo.mutate(
      { ...finalPayload, review_side: reviewSide },
      {
        onSuccess: () => {
          reset();
          setImageRevisionNote('');
          const id = (negotiationId ?? finalPayload.negotiation_id ?? '').trim();
          if (id) {
            loadRevisionHistory(id);
          }
        },
      },
    );
  };

  const sendImageRevision = () => {
    const text = imageRevisionNote.trim();
    if (!text) {
      toast.error('Enter your revision feedback.');
      return;
    }
    clearTimestamps();
    addTimestamp({ time: 0, feedback: text });
    sendRevisionTimeandMessage();
  };

  return (
    <div className="space-y-4">
      {/* Workflow header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-white">Revision Workflow</h3>
          <p className="mt-0.5 text-xs text-white/40">
            {pendingCount > 0
              ? `${pendingCount} pending action${pendingCount === 1 ? '' : 's'}`
              : 'No pending comments'}
            {timestamps.length > 0 && showVideoTimeline
              ? ` · ${timestamps.length} total comment${timestamps.length === 1 ? '' : 's'}`
              : ''}
          </p>
        </div>
      </div>

      {/* Pending items */}
      <div className="space-y-3">
        {showVideoTimeline ? (
          timestamps.length > 0 ? (
            timestamps.map((item: TimestampItem, index: number) => (
              <PendingRevisionCard
                key={`${item.time}-${index}-${item.feedback.slice(0, 12)}`}
                item={item}
                index={index}
                authorLabel={authorLabel}
                onRemove={removeTimestamp}
              />
            ))
          ) : (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] px-4 py-10 text-center">
              <p className="text-sm text-white/35">
                Pin comments on the timeline to add revision feedback.
              </p>
            </div>
          )
        ) : (
          <article className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#12141c] shadow-[0_8px_32px_rgba(0,0,0,0.35)]">
            <div className={cn('absolute inset-y-0 left-0 w-1', accentStyles.action.bar)} />
            <div className="p-4 pl-5">
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="text-sm font-semibold text-white">{authorLabel}</span>
                <span
                  className={cn(
                    'rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide',
                    accentStyles.action.badge,
                    accentStyles.action.badgeText,
                  )}
                >
                  Action required
                </span>
              </div>
              <Textarea
                value={imageRevisionNote}
                onChange={(e) => setImageRevisionNote(e.target.value)}
                placeholder="Describe what needs to change for this image…"
                className="min-h-[120px] w-full resize-y border-white/10 bg-black/30 text-sm text-white placeholder:text-white/35 focus-visible:ring-[#ff4e7e]/40"
                rows={5}
              />
            </div>
          </article>
        )}
      </div>

      {showVideoTimeline && hasTimestampWithMessage && (
        <div className="flex justify-end">
          <CustomButton
            onClick={sendRevisionTimeandMessage}
            disabled={!hasTimestampWithMessage || sendinfo.isPending}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-primaryButton px-5 py-2.5 disabled:opacity-50"
          >

            {sendinfo.isPending ? <Loader2 className="size-4 animate-spin" /> : 'Request Revision'}
          </CustomButton>
        </div>
      )}

      {!showVideoTimeline && (
        <div className="flex justify-end">
          <CustomButton
            onClick={sendImageRevision}
            disabled={!canSendImageRevision || sendinfo.isPending}
            className="flex cursor-pointer items-center gap-2 rounded-xl bg-primaryButton px-5 py-2.5 disabled:opacity-50"
          >
            <RefreshCw className={cn('size-4', sendinfo.isPending && 'animate-spin')} />
            Request Revision
          </CustomButton>
        </div>
      )}
    </div>
  );
};
