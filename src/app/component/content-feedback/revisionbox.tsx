import { useEffect } from 'react';
import axios from 'axios';
import { Card } from '@/components/ui/card';
import useRevisionMessageStore from '@/src/store/Feedback/revisionmessage-store';
import CustomButton from '../button';
import SendRevisionHook from '@/src/routes/Admin/Hooks/feedback/send-revision-hook';
import useContentRevisionHistoryHook from '@/src/routes/Admin/Hooks/feedback/content-revision-history-hook';
import type {
  ContentRevisionDocument,
  ContentRevisionTimestamp,
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

        <div className="mt-3 flex justify-end">
          <CustomButton
            onClick={sendRevisionTimeandMessage}
            disabled={!timestamps.length}
            className="bg-primaryButton cursor-pointer flex items-center gap-2 px-4 py-2 disabled:opacity-50"
          >
            <RefreshCw className="size-4" />
            Request Revision
          </CustomButton>
        </div>

        {/* API REVISION HISTORY */}
        <div className="mt-3 space-y-2">
          {revisionHistory.isPending && (
            <div className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm text-white/60">
              Loading revision history...
            </div>
          )}
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

          {(revisionHistory.data?.documents ?? []).map(
            (doc: ContentRevisionDocument, docIndex: number) => (
              <div
                key={`${doc.negotiation_id}-${docIndex}`}
                className="space-y-2 rounded-lg border border-white/10 bg-white/5 p-3"
              >
                <div className="grid grid-cols-2 gap-2 text-xs text-white/70 md:grid-cols-4">
                  <p>
                    <span className="text-white/50">Admin Ver:</span>{' '}
                    {doc.admin_current_version ?? '-'}
                  </p>
                  <p>
                    <span className="text-white/50">Content URL:</span>{' '}
                    {doc.contentUrl ? 'Available' : '-'}
                  </p>
                  <p>
                    <span className="text-white/50">Current Ver:</span>{' '}
                    {doc.current_version ?? '-'}
                  </p>
                  <p>
                    <span className="text-white/50">Status:</span> {doc.status ?? '-'}
                  </p>
                </div>

                {doc.contentUrl ? (
                  <button
                    type="button"
                    className="w-full text-left"
                    onClick={() =>
                      window.open(doc.contentUrl, '_blank', 'noopener,noreferrer')
                    }
                  >
                    <video
                      src={doc.contentUrl}
                      className="h-24 w-40 rounded-lg border border-white/10 object-cover"
                      muted
                      preload="metadata"
                    />
                  </button>
                ) : null}

                {(doc.revisions ?? []).map((revision, revisionIndex) =>
                  (revision.timestamps ?? []).map(
                    (item: ContentRevisionTimestamp, timestampIndex: number) => (
                      <div
                        key={`${docIndex}-${revisionIndex}-${timestampIndex}`}
                        className="rounded-lg border border-white/10 bg-black/20 p-3"
                      >
                        <p className="flex items-center gap-1 text-xs text-white/50">
                          <TimerIcon size={14} /> {item.time ?? 0}s
                        </p>
                        <p className="flex items-center gap-1 text-sm text-white">
                          <MessageCircleWarning size={14} /> {item.feedback ?? '-'}
                        </p>
                      </div>
                    ),
                  ),
                )}
              </div>
            ),
          )}
        </div>
      </Card>
    </div>
  );
};
