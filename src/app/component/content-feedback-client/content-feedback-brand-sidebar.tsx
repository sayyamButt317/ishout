'use client';

import type { Dispatch, SetStateAction } from 'react';
import useSaveContentFeedbackHook from '@/src/routes/Admin/Hooks/feedback/content-feedback-write-hook';
import useUpdateApprovedContent from '@/src/routes/Company/api/Hooks/use-update-approved-content.hook';
import type { WhatsAppAdminCompanyApproveVideoResponse } from '@/src/types/Compnay/approved-video-type';

function parseHashtagsInputToArray(text: string): string[] {
  return text
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

type SaveContentFeedbackMutation = ReturnType<typeof useSaveContentFeedbackHook>;
type UpdateApprovedContentMutation = ReturnType<typeof useUpdateApprovedContent>;

type BrandFeedbackData = {
  feedback?: {
    brand_review?: {
      message?: string[];
    };
  };
};

export type ContentFeedbackBrandSidebarProps = {
  selectedContentFeedback: string;
  onSelectedContentFeedbackChange: (value: string) => void;
  saveContentFeedbackMutation: SaveContentFeedbackMutation;
  selectedPreviewMediaUrl: string | null;
  negotiationId: string;
  contentId: string | undefined;
  setFeedbackId: (negotiationId: string, contentUrl: string, feedbackId: string) => void;
  activeFeedbackId: string | undefined;
  refetchBrandFeedback: () => Promise<unknown>;
  brandFeedbackData: BrandFeedbackData | undefined;
  selectedMediaKey: string | null;
  approveVideoResponseByUrl: Partial<
    Record<string, WhatsAppAdminCompanyApproveVideoResponse>
  >;
  approvedCopyDraft: { hashtags: string };
  setApprovedCopyDraftField: (field: 'hashtags', value: string) => void;
  setApprovedCopyDraftByUrl: Dispatch<
    SetStateAction<Record<string, { hashtags: string }>>
  >;
  updateApprovedContentMutation: UpdateApprovedContentMutation;
};

export default function ContentFeedbackBrandSidebar({
  selectedContentFeedback,
  onSelectedContentFeedbackChange,
  saveContentFeedbackMutation,
  selectedPreviewMediaUrl,
  negotiationId,
  contentId,
  setFeedbackId,
  activeFeedbackId,
  refetchBrandFeedback,
  brandFeedbackData,
  selectedMediaKey,
  approveVideoResponseByUrl,
  approvedCopyDraft,
  setApprovedCopyDraftField,
  setApprovedCopyDraftByUrl,
  updateApprovedContentMutation,
}: ContentFeedbackBrandSidebarProps) {
  return (
    <div className="flex w-full shrink-0 flex-col gap-3 overflow-y-auto rounded-lg border border-white/10 bg-white/5 p-3">
      <h1 className="text-2xl font-bold text-white">Add Feedback</h1>
      <p className="text-sm font-thin text-white">
        Add feedback on the selected content.
      </p>
      <div className="relative">
        <textarea
          value={selectedContentFeedback}
          onChange={(e) => onSelectedContentFeedbackChange(e.target.value)}
          placeholder="Type feedback on selected content..."
          className="h-24 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white placeholder:text-white/40 focus:border-primaryButton focus:outline-none focus:ring-1 focus:ring-primaryButton"
        />
        <button
          type="button"
          onClick={async () => {
            if (
              !selectedContentFeedback.trim() ||
              !selectedPreviewMediaUrl ||
              !negotiationId ||
              !contentId
            ) {
              return;
            }

            try {
              const response = await saveContentFeedbackMutation.mutateAsync({
                negotiation_id: negotiationId,
                content_id: contentId,
                content_url: selectedPreviewMediaUrl,
                msg: selectedContentFeedback.trim(),
                review_side: 'brand_review',
                Brand_approved: 'revision',
              });
              const newFeedbackId = response?.feedback?.feedback_id as string | undefined;
              if (newFeedbackId) {
                setFeedbackId(negotiationId, selectedPreviewMediaUrl, newFeedbackId);
              }
              onSelectedContentFeedbackChange('');
              if (newFeedbackId || activeFeedbackId) {
                await refetchBrandFeedback();
              }
            } catch (error) {
              console.error('Failed to save content feedback:', error);
            }
          }}
          disabled={saveContentFeedbackMutation.isPending}
          className="mt-2 rounded-xl bg-(--color-primaryButton) px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {saveContentFeedbackMutation.isPending ? 'Saving...' : 'Save Brand Feedback'}
        </button>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/5 p-4">
        <p className="text-xs font-bold uppercase tracking-wider text-white/50">
          Brand feedback
        </p>
        <div className="mt-2 max-h-40 space-y-2 overflow-y-auto">
          {brandFeedbackData?.feedback?.brand_review?.message?.length ? (
            brandFeedbackData.feedback.brand_review.message.map(
              (message: string, index: number) => (
                <p key={`brand-feedback-${index}`} className="text-sm text-white/70">
                  {message}
                </p>
              ),
            )
          ) : (
            <p className="text-sm text-white/70">No brand feedback yet.</p>
          )}
        </div>
      </div>
      {selectedMediaKey &&
        approveVideoResponseByUrl[selectedMediaKey]?.approved_content_id && (
          <div
            key={selectedMediaKey}
            className="rounded-xl border border-white/10 bg-white/5 p-4"
          >
            <div className="flex flex-wrap items-center justify-between gap-2">
              <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                Hashtags & copy
              </p>
              <button
                type="button"
                onClick={() => {
                  if (!selectedMediaKey) return;
                  setApprovedCopyDraftByUrl((prev) => {
                    const current = prev[selectedMediaKey] ?? {
                      hashtags: '',
                    };
                    return {
                      ...prev,
                      [selectedMediaKey]: {
                        ...current,
                        hashtags: current.hashtags ? `${current.hashtags.trim()} ` : '#',
                      },
                    };
                  });
                }}
                className="shrink-0 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Add hashtags
              </button>
            </div>
            <div className="mt-3 grid gap-3 text-sm">
              <div>
                <p className="text-[10px] font-bold uppercase text-white/40">Hashtags</p>
                <textarea
                  value={approvedCopyDraft.hashtags}
                  onChange={(e) => setApprovedCopyDraftField('hashtags', e.target.value)}
                  placeholder="Space or comma separated"
                  rows={2}
                  className="mt-1 w-full resize-none rounded-lg border border-white/10 bg-white/5 p-2 text-sm text-white placeholder:text-white/35 focus:border-primaryButton focus:outline-none focus:ring-1 focus:ring-primaryButton"
                />
                <button
                  type="button"
                  disabled={updateApprovedContentMutation.isPending}
                  onClick={() => {
                    const id =
                      selectedMediaKey &&
                      approveVideoResponseByUrl[selectedMediaKey]?.approved_content_id;
                    if (!id) return;
                    const hashtags = parseHashtagsInputToArray(
                      approvedCopyDraft.hashtags,
                    );
                    updateApprovedContentMutation.mutate({
                      approved_content_id: id,
                      payload: {
                        hashtags: hashtags.length ? hashtags : undefined,
                      },
                    });
                  }}
                  className="mt-3 rounded-lg bg-(--color-primaryButton) px-3 py-2 text-xs font-bold text-white transition-colors hover:bg-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {updateApprovedContentMutation.isPending ? 'Saving…' : 'Save hashtags'}
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
}
