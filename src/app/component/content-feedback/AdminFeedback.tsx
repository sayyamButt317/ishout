'use client';
import useAdminContentFeedbackReadHook from '@/src/routes/Admin/Hooks/feedback/content-feedback-admin-read-hook';
import { FeedbackMessage } from './feedbackMessage';

const AdminFeedback = ({ activeFeedbackId }: { activeFeedbackId: string }) => {
    const { data: adminFeedbackData } =
        useAdminContentFeedbackReadHook(activeFeedbackId, !!activeFeedbackId);

    return (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                Admin feedback
            </p>

            <div className="mt-3 h-auto space-y-3 overflow-y-auto pr-1">
                {adminFeedbackData?.feedback?.admin_Rewiew?.message?.length ? (
                    adminFeedbackData.feedback.admin_Rewiew.message.map(
                        (message: string, index: number) => (
                            <FeedbackMessage
                                key={`admin-feedback-${index}`}
                                message={message}
                                role="admin"
                            />
                        ),
                    )
                ) : (
                    <p className="text-sm text-white/50">No admin feedback yet.</p>
                )}
            </div>
        </div>
    )
}

export default AdminFeedback
