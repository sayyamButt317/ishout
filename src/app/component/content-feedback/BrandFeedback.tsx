'use client';
import useBrandContentFeedbackReadHook from '@/src/routes/Admin/Hooks/feedback/content-feedback-brand-read-hook';
import { FeedbackMessage } from './feedbackMessage';

const BrandFeedback = ({ activeFeedbackId }: { activeFeedbackId: string }) => {
    const { data: adminFeedbackData } =
        useBrandContentFeedbackReadHook(activeFeedbackId, !!activeFeedbackId);

    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                Brand feedback
            </p>

            <div className="mt-3 w-full pr-1">
                {adminFeedbackData?.feedback?.brand_review?.message?.length ? (
                    adminFeedbackData.feedback.brand_review.message.map(
                        (message: string, index: number) => (
                            <FeedbackMessage
                                key={`brand-feedback-${index}`}
                                message={message}
                                role="brand"

                            />
                        ),
                    )
                ) : (
                    <p className="text-sm text-white/50">No brand feedback yet.</p>
                )}
            </div>
        </div>
    )
}

export default BrandFeedback
