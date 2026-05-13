import { useEffect, useMemo, useState } from 'react';
import { Card } from '@/components/ui/card';
import useRevisionMessageStore from '@/src/store/Feedback/revisionmessage-store';
import CustomButton from '../button';
import SendRevisionHook from '@/src/routes/Admin/Hooks/feedback/send-revision-hook';
import useContentRevisionHistoryHook from '@/src/routes/Admin/Hooks/feedback/content-revision-history-hook';
import { MessageCircleWarning, RefreshCw, TimerIcon } from 'lucide-react';
import { toast } from 'sonner';
import { Textarea } from '@/components/ui/textarea';

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

type RevisionMessageProps = {
  reviewSide?: 'admin' | 'brand';
  negotiationId?: string;
  threadId?: string;
};

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
    <div className="mt-3 space-y-2">
      <Card className="px-4 py-3">
        <div className="mb-3 flex items-center justify-between">
          <h1 className="text-lg font-semibold">Revision Message</h1>
        </div>
        <div className="space-y-2">
          {showVideoTimeline ? (
            timestamps.map((item: TimestampItem, index: number) => (
              <div
                key={index}
                className="flex items-start justify-between rounded-lg border border-white/10 bg-white/5 p-3"
              >
                <div>
                  <p className="flex items-center gap-1 text-xs text-white/50">
                    <TimerIcon size={14} /> {Number(item.time).toFixed(2)}s
                  </p>
                  <p className="flex items-center gap-1 text-sm text-white">
                    <MessageCircleWarning size={14} /> {item.feedback}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => removeTimestamp(index)}
                  className="text-xs text-red-400 hover:underline"
                >
                  Remove
                </button>
              </div>
            ))
          ) : (
            <Textarea
              value={imageRevisionNote}
              onChange={(e) => setImageRevisionNote(e.target.value)}
              placeholder="Describe what needs to change for this image…"
              className="min-h-[120px] w-full resize-y border-white/10 bg-white/5 text-white placeholder:text-white/40"
              rows={5}
            />
          )}
        </div>

        {showVideoTimeline && hasTimestampWithMessage && (
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

        {!showVideoTimeline && (
          <div className="mt-3 flex justify-end">
            <CustomButton
              onClick={sendImageRevision}
              disabled={!canSendImageRevision}
              className="bg-primaryButton cursor-pointer flex items-center gap-2 px-4 py-2 disabled:opacity-50"
            >
              <RefreshCw className="size-4" />
              Request Revision
            </CustomButton>
          </div>
        )}
      </Card>
    </div>
  );
};
