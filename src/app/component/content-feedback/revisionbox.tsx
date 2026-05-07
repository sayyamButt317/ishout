import { useEffect, useMemo } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import useRevisionMessageStore from '@/src/store/Feedback/revisionmessage-store';
import CustomButton from '../button';
import SendRevisionHook from '@/src/routes/Admin/Hooks/feedback/send-revision-hook';
import useContentRevisionHistoryHook from '@/src/routes/Admin/Hooks/feedback/content-revision-history-hook';
import type {
  ContentRevisionDocument,
} from '@/src/types/Admin-Type/Feedback-Type';
import { MessageCircleWarning, RefreshCw, TimerIcon } from 'lucide-react';
import { toast } from 'sonner';

interface TimestampItem {
  time: number;
  feedback: string;
}

type RevisionBoxProps = {
  reviewSide?: 'admin' | 'brand';
  negotiationId?: string;
};

const getApiErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    const detail = error.response?.data?.detail;
    if (typeof detail === 'string') return detail;
  }
  return 'Unable to load revision history.';
};

const formatRevisionDate = (value?: string) => {
  if (!value) return null;
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return null;
  return {
    day: date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }),
    time: date.toLocaleTimeString(undefined, {
      hour: 'numeric',
      minute: '2-digit',
    }),
  };
};

export const RevisionBox = ({
  reviewSide = 'admin',
  negotiationId,
}: RevisionBoxProps) => {
  const sendinfo = SendRevisionHook();
  const revisionHistory = useContentRevisionHistoryHook();
  const { mutate: loadRevisionHistory } = revisionHistory;

  const { buildPayload, removeTimestamp, timestamps, reset, negotiation_id, thread_id } =
    useRevisionMessageStore();

  useEffect(() => {
    const id = (negotiationId ?? '').trim();
    if (!id) return;
    loadRevisionHistory(id);
  }, [negotiationId, loadRevisionHistory]);

  const revisionTimeline = useMemo(() => {
    const documents = revisionHistory.data?.documents ?? [];
    const items = documents.flatMap((doc: ContentRevisionDocument) =>
      (doc.revisions ?? []).map((revision, index) => {
        const timestamps = revision.timestamps ?? [];
        return {
          key: `${doc.negotiation_id}-${index}`,
          versionLabel: `Version ${index + 1}`,
          feedbackCount: timestamps.length,
          timestamps,
          status: revision.status ?? doc.status ?? '-',
          createdAt: revision.created_at ?? doc.created_at,
        };
      }),
    );

    return items.reverse();
  }, [revisionHistory.data?.documents]);

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

  const sendRevisionTimeandMessage = () => {
    const payload = buildPayload();
    if (!payload) {
      if (!timestamps.length) {
        toast.error('Add at least one timestamp before requesting a revision.');
        return;
      }
      if (!negotiation_id?.trim() || !thread_id?.trim()) {
        toast.error(
          'Missing negotiation/thread id. Select content first, then try again.',
        );
        return;
      }
      toast.error('Invalid revision data. Please re-check the timestamps and feedback.');
      return;
    }

    sendinfo.mutate(
      { ...payload, review_side: reviewSide },
      {
        onSuccess: () => {
          reset();
          const id = (negotiationId ?? payload.negotiation_id ?? '').trim();
          if (id) {
            loadRevisionHistory(id);
          }
        },
      },
    );
  };

  return (
    <div className="mt-3 space-y-2">
      <Card className="px-4 py-3">
        {/* HEADER */}
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Revision Timeline</h1>
        </div>

        {/* TIMELINE */}
        <div className="space-y-2">
          {timestamps.map((item: TimestampItem, index: number) => (
            <div
              key={index}
              className="flex items-start justify-between rounded-lg border border-white/10 bg-white/5 p-3"
            >
              <div>
                <p className="flex items-center gap-1 text-xs text-white/50">
                  <TimerIcon size={14} /> {item.time}s
                </p>
                <p className="flex items-center gap-1 text-sm text-white">
                  <MessageCircleWarning size={14} /> {item.feedback}
                </p>
              </div>

              <button
                onClick={() => removeTimestamp(index)}
                className="text-xs text-red-400 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        {hasTimestampWithMessage && (
          <div className="mt-3 flex justify-end">
            <CustomButton
              onClick={sendRevisionTimeandMessage}
              disabled={!hasTimestampWithMessage}
              className="bg-primaryButton cursor-pointer flex items-center gap-2 px-4 py-2 disabled:opacity-50"
            >
              <RefreshCw className="size-4" />
              Request Revision
            </CustomButton>
          </div>
        )}

        {/* API REVISION HISTORY */}
        <div className="mt-3 space-y-2">
          {revisionHistory.isError && (
            <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
              {getApiErrorMessage(revisionHistory.error)}
            </div>
          )}
          {!revisionHistory.isPending &&
            !revisionHistory.isError &&
            revisionHistory.data?.count === 0 && (
              <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/60">
                No revision data found for this negotiation.
              </div>
            )}

          {!revisionHistory.isPending &&
            !revisionHistory.isError &&
            revisionTimeline.length > 0 && (
              <div className="rounded-lg border border-white/10 bg-white/5 p-4">
                <h2 className="mb-4 text-xs font-semibold uppercase tracking-wider text-white/50">
                  Revision Timeline
                </h2>
                <div className="space-y-4">
                  {revisionTimeline.map((item, index) => {
                    const formattedDate = formatRevisionDate(item.createdAt);
                    return (
                      <div key={item.key} className="grid grid-cols-[112px_1fr] gap-3">
                        <div className="pt-1 text-right">
                          {formattedDate ? (
                            <>
                              <p className="text-[11px] font-semibold uppercase tracking-wider text-white/45">
                                {formattedDate.day}
                              </p>
                              <p className="text-xs text-white/65">
                                {formattedDate.time}
                              </p>
                            </>
                          ) : (
                            <p className="text-xs text-white/35">No date</p>
                          )}
                        </div>

                        <div className="relative rounded-xl border border-white/10 bg-linear-to-br from-[#171a2d] via-[#121528] to-[#0e1122] p-3 shadow-[0_12px_24px_rgba(0,0,0,0.35)]">
                          <span
                            className={`absolute -left-[6px] top-4 block size-2.5 rounded-full border ${index === 0
                              ? 'border-pink-300 bg-pink-300 shadow-[0_0_12px_rgba(244,114,182,0.8)]'
                              : 'border-cyan-300/60 bg-cyan-300/60'
                              }`}
                          />

                          <div className="flex items-center justify-between gap-3">
                            <p className="text-[11px] font-semibold uppercase tracking-wide text-white/40">
                              {item.versionLabel}
                            </p>
                            <span
                              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${item.status === 'OPEN'
                                ? 'border border-amber-400/40 bg-amber-400/15 text-amber-200'
                                : 'border border-emerald-400/40 bg-emerald-400/15 text-emerald-200'
                                }`}
                            >
                              {item.status}
                            </span>
                          </div>

                          <div className="mt-1 text-xs text-white/55">
                            {item.feedbackCount} feedback point{item.feedbackCount === 1 ? '' : 's'}
                          </div>

                          <div className="mt-2 space-y-2">
                            {item.timestamps.map((timestamp, timestampIndex) => (
                              <div
                                key={`${item.key}-timestamp-${timestampIndex}`}
                                className="rounded-lg border border-violet-300/15 bg-violet-500/10 px-2.5 py-2"
                              >
                                <p className="flex items-center gap-1 text-xs font-medium text-cyan-200/90">
                                  <TimerIcon size={12} /> {(timestamp.time ?? 0).toFixed(2)}s
                                </p>
                                <p className="mt-1 flex items-center gap-1 text-sm text-white/90">
                                  <MessageCircleWarning size={13} />
                                  {timestamp.feedback ?? 'No feedback message'}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
        </div>
      </Card>
    </div>
  );
};
