'use client';
import useSaveContentFeedbackHook from '@/src/routes/Admin/Hooks/feedback/content-feedback-write-hook';
import { ContentFeedbackPanelProps } from '@/src/types/Admin-Type/Feedback-Type';
import { captureVideoFrameDataUrl } from '@/src/utils/content-feedback-chat';
import { toast } from 'sonner';
import AdminFeedback from '@/src/app/component/content-feedback/AdminFeedback';
import BrandFeedback from '@/src/app/component/content-feedback/BrandFeedback';

export default function ContentFeedbackPanel({
    activeFeedbackId,
    selectedContentFeedback,
    setSelectedContentFeedback,
    selectedPreviewMediaUrl,
    negotiationId,
    selectedCard,
    videoRef,
    setFeedbackId,
}: ContentFeedbackPanelProps) {

    const saveContentFeedbackMutation = useSaveContentFeedbackHook();
    const SubmitFeedback = async (payload: {
        text: string;
        timestamp: number;
        snapshotDataUrl: string | null;
    }) => {
        if (!selectedContentFeedback.trim() ||
            !selectedPreviewMediaUrl ||
            !negotiationId ||
            !selectedCard?.campaign_id
        ) {
            toast.error(
                'Add feedback text, select content, and ensure campaign is set before saving.',
            );
            return;
        }
        try {
            const response = await saveContentFeedbackMutation.mutateAsync({
                negotiation_id: negotiationId,
                campaign_id: selectedCard.campaign_id,
                content_url: selectedPreviewMediaUrl,
                snapshot: payload.snapshotDataUrl,
                msg: payload.text,
                review_side: 'admin_review',
                timestamp: payload.timestamp,
            });
            const newFeedbackId = response?.feedback?.feedback_id as
                | string
                | undefined;
            if (newFeedbackId && setFeedbackId) {
                setFeedbackId(negotiationId, selectedPreviewMediaUrl, newFeedbackId);
            }
            setSelectedContentFeedback('');
            toast.success('Feedback saved');
        }
        catch (error) {
            toast.error(`Failed to save content feedback: ${error}`);
        }
    };

    return (
        <div className="flex w-full shrink-0 flex-col gap-3 overflow-y-auto rounded-lg border border-white/10 bg-white/5 p-3">
            <div className="relative">
                <textarea
                    value={selectedContentFeedback}
                    onChange={(e) => setSelectedContentFeedback(e.target.value)}
                    placeholder="Type feedback on selected content..."
                    className="h-24 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white placeholder:text-white/40 focus:border-(--color-primaryButton) focus:outline-none focus:ring-1 focus:ring-(--color-primaryButton)"
                />
                <button
                    type="button"
                    onClick={async () => {
                        const video = videoRef?.current ?? null;
                        await SubmitFeedback({
                            text: selectedContentFeedback.trim(),
                            timestamp: Date.now(),
                            snapshotDataUrl: video
                                ? captureVideoFrameDataUrl(video)
                                : null,
                        });
                    }}
                    disabled={saveContentFeedbackMutation.isPending}
                    className="mt-2 w-full rounded-xl bg-primaryButton px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {saveContentFeedbackMutation.isPending
                        ? 'Saving...'
                        : 'Save Admin Feedback'}
                </button>
            </div>
            <BrandFeedback activeFeedbackId={activeFeedbackId} />
            <AdminFeedback activeFeedbackId={activeFeedbackId} />
        </div>

    )
}
