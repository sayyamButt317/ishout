'use client';
import { ContentFeedbackPanelProps } from '@/src/types/Admin-Type/Feedback-Type';
import BrandFeedback from '@/src/app/component/content-feedback/BrandFeedback';

export default function ContentFeedbackPanel({
  activeFeedbackId,
}: ContentFeedbackPanelProps) {
  return (
    <div className="flex w-full shrink-0 flex-col gap-3 overflow-y-auto rounded-lg border border-white/10 bg-white/5 p-3">
      <h1 className="text-white text-2xl font-bold font-inter">
        Brand feedback on selected Media
      </h1>
      <BrandFeedback activeFeedbackId={activeFeedbackId} />
      {/* Admin feedback read is intentionally disabled for now. */}
      {/* Related API: GET /api/admin/content-feedback/admin?content_id=... */}
      {/* <AdminFeedback activeFeedbackId={activeFeedbackId} /> */}
    </div>
  );
}
