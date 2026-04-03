import useAdminContentFeedbackReadHook from '@/src/routes/Admin/Hooks/feedback/content-feedback-admin-read-hook';
import useSaveContentFeedbackHook from '@/src/routes/Admin/Hooks/feedback/content-feedback-write-hook';
import { ContentFeedbackPanelProps } from '@/src/types/Admin-Type/Feedback-Type';
import { captureVideoFrameDataUrl } from '@/src/utils/content-feedback-chat';
import React from 'react';
import { toast } from 'sonner';

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

    const { data: adminFeedbackData } =
        useAdminContentFeedbackReadHook(activeFeedbackId, !!activeFeedbackId);

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
        <div className="flex w-full lg:w-72 shrink-0 flex-col gap-3 overflow-y-auto rounded-lg border border-white/10 bg-white/5 p-3">
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
                    className="mt-2 w-full rounded-xl bg-(--color-primaryButton) px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {saveContentFeedbackMutation.isPending
                        ? 'Saving...'
                        : 'Save Admin Feedback'}
                </button>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                    Brand feedback
                </p>
                <div className="mt-2 max-h-40 space-y-2 overflow-y-auto">
                    {adminFeedbackData?.feedback?.brand_review?.message?.length ? (
                        adminFeedbackData.feedback.brand_review.message.map(
                            (message: string, index: number) => (
                                <p
                                    key={`brand-feedback-${index}`}
                                    className="text-sm text-white/70"
                                >
                                    {message}
                                </p>
                            ),
                        )
                    ) : (
                        <p className="text-sm text-white/70">No brand feedback yet.</p>
                    )}
                </div>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                    Admin feedback
                </p>
                <div className="mt-2 max-h-40 space-y-2 overflow-y-auto">
                    {adminFeedbackData?.feedback?.admin_Rewiew?.message?.length ? (
                        adminFeedbackData.feedback.admin_Rewiew.message.map(
                            (message: string, index: number) => (
                                <p
                                    key={`admin-feedback-${index}`}
                                    className="text-sm text-white/70"
                                >
                                    {message}
                                </p>
                            ),
                        )
                    ) : (
                        <p className="text-sm text-white/70">No admin feedback yet.</p>
                    )}
                </div>
            </div>
        </div>

    )
}
