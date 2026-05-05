'use client';
import { ContentFeedbackPanelProps } from '@/src/types/Admin-Type/Feedback-Type';
import BrandFeedback from '@/src/app/component/content-feedback/BrandFeedback';

export default function ContentFeedbackPanel({
  activeFeedbackId,
}: ContentFeedbackPanelProps) {
  return (
    <div className="flex w-full shrink-0 flex-col gap-3 overflow-y-auto rounded-lg border border-white/10 bg-white/5 p-3">
      <h1 className="text-white text-2xl font-bold font-inter">
        Brand Feedback
      </h1>
      <BrandFeedback activeFeedbackId={activeFeedbackId} />
    </div>
  );
}
