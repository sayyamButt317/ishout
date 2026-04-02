import useAdminContentFeedbackReadHook from '@/src/routes/Admin/Hooks/feedback/content-feedback-admin-read-hook';
import useSaveContentFeedbackHook from '@/src/routes/Admin/Hooks/feedback/content-feedback-write-hook';
import { ContentFeedbackPanelProps } from '@/src/types/Admin-Type/Feedback-Type';
import React from 'react';


const normalizeMessages = (messages?: string[]) =>
    (messages ?? [])
        .flatMap((entry) =>
            entry
                .split(/\r?\n/)
                .map((part) => part.trim())
                .filter(Boolean),
        );

export default function ContentFeedbackPanel({
    activeFeedbackId,
    selectedContentFeedback,
    setSelectedContentFeedback,
    selectedPreviewMediaUrl,
    negotiationId,
    selectedCard,
    setFeedbackId,
}: ContentFeedbackPanelProps) {
    const saveContentFeedbackMutation = useSaveContentFeedbackHook();
    const { data: adminFeedbackData, refetch: refetchAdminFeedback } =
        useAdminContentFeedbackReadHook(activeFeedbackId, !!activeFeedbackId);
    const brandMessages = normalizeMessages(
        adminFeedbackData?.feedback?.brand_review?.message,
    );
    const adminMessages = normalizeMessages(
        adminFeedbackData?.feedback?.admin_Rewiew?.message,
    );

    return (
        <div className="flex w-full flex-col gap-3 overflow-y-auto rounded-lg border border-white/10 bg-white/5 p-3">
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
                        if (
                            !selectedContentFeedback.trim() ||
                            !selectedPreviewMediaUrl ||
                            !negotiationId ||
                            !selectedCard?.campaign_id
                        ) {
                            return;
                        }

                        try {
                            const response = await saveContentFeedbackMutation.mutateAsync({
                                negotiation_id: negotiationId,
                                campaign_id: selectedCard.campaign_id,
                                content_url: selectedPreviewMediaUrl,
                                msg: selectedContentFeedback.trim(),
                                review_side: 'admin_review',
                            });
                            const newFeedbackId = response?.feedback?.feedback_id as
                                | string
                                | undefined;
                            if (newFeedbackId) {
                                setFeedbackId(
                                    negotiationId,
                                    selectedPreviewMediaUrl,
                                    newFeedbackId,
                                );
                            }
                            setSelectedContentFeedback('');
                            if (newFeedbackId || activeFeedbackId) {
                                await refetchAdminFeedback();
                            }
                        } catch (error) {
                            console.error('Failed to save content feedback:', error);
                        }
                    }}
                    disabled={saveContentFeedbackMutation.isPending}
                    className="mt-2 w-full rounded-xl bg-(--color-primaryButton) px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {saveContentFeedbackMutation.isPending
                        ? 'Saving...'
                        : 'Save Admin Feedback'}
                </button>
            </div>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                        Brand feedback
                    </p>
                    <div className="mt-2 max-h-40 space-y-2 overflow-y-auto">
                        {brandMessages.length ? (
                            brandMessages.map((message: string, index: number) => (
                                <div
                                    key={`brand-feedback-${index}`}
                                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70"
                                >
                                    {message}
                                </div>
                            ))
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
                        {adminMessages.length ? (
                            adminMessages.map((message: string, index: number) => (
                                <div
                                    key={`admin-feedback-${index}`}
                                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-white/70"
                                >
                                    {message}
                                </div>
                            ))
                        ) : (
                            <p className="text-sm text-white/70">No admin feedback yet.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>

    )
}
