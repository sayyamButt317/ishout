'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import InfluencerDetailDialog from '@/src/app/component/content-feedback/influencerdetail';
import CustomButton from '../button';

import { ReadyForPostingHook } from '@/src/routes/Admin/Mutations/DemoGraphics';
import useReportStore from '@/src/store/Report/report-store';

type FeedbackDetailFooterProps = {
  durationText: string;
  resolutionText: string;
  canForward: boolean;
  isForwardLoading: boolean;
  onForwardToBrand: () => void;
  isDemographicsView?: boolean;
  canSaveDemographics?: boolean;
  isSavingDemographics?: boolean;
  onSaveDemographics?: () => void;
  contentUrl?: string | null;
  threadId?: string | null;
};

export default function FeedbackDetailFooter({
  durationText,
  resolutionText,
  canForward,
  isForwardLoading,
  onForwardToBrand,
  isDemographicsView = false,
  canSaveDemographics = false,
  isSavingDemographics = false,
  onSaveDemographics,
  contentUrl,
  threadId,
}: FeedbackDetailFooterProps) {
  const [open, setOpen] = useState(false);

  const { campaign_id } = useReportStore();
  const readyForPostingMutation = ReadyForPostingHook();

  const handleReadyForPosting = () => {
    if (!campaign_id) {
      toast.error('Campaign ID not found');
      return;
    }
    if (!contentUrl) {
      toast.error('No content URL selected. Select media first.');
      return;
    }
    if (!threadId) {
      toast.error('Thread ID not found. Select content first.');
      return;
    }
    readyForPostingMutation.mutate({ campaign_id, content_url: contentUrl, thread_id: threadId });
  };

  return (
    <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-black/20 px-3 py-2">
      <div className="flex gap-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
        <div>
          <p className="text-[10px] font-bold uppercase text-white/40">
            Duration
          </p>

          <p className="text-sm font-bold text-white">
            {durationText}
          </p>
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase text-white/40">
            Resolution
          </p>

          <p className="text-sm font-bold text-white">
            {resolutionText}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {isDemographicsView ? (
          <button
            type="button"
            onClick={onSaveDemographics}
            disabled={
              isSavingDemographics || !canSaveDemographics
            }
            className="rounded-lg bg-primaryButton px-3 py-2 text-xs font-bold text-white disabled:opacity-50 lg:px-4 lg:text-sm"
          >
            {isSavingDemographics
              ? 'Saving...'
              : 'Save Demographics'}
          </button>
        ) : (
          <>
            <InfluencerDetailDialog
              open={open}
              onOpenChange={setOpen}
            />

            <CustomButton
              onClick={onForwardToBrand}
              disabled={
                isForwardLoading || !canForward
              }
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white hover:bg-primaryButton lg:px-4 lg:text-sm"
            >
              {isForwardLoading
                ? 'Forwarding...'
                : 'Forward to Brand'}
            </CustomButton>

            <CustomButton
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white hover:bg-primaryButton lg:px-4 lg:text-sm"
              onClick={() => setOpen(true)}
            >
              Influencer Analytics
            </CustomButton>

            <CustomButton
              onClick={handleReadyForPosting}
              disabled={
                readyForPostingMutation.isPending
              }
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white hover:bg-primaryButton disabled:opacity-50 lg:px-4 lg:text-sm"
            >
              {readyForPostingMutation.isPending
                ? 'Sending...'
                : 'Ready for Post'}
            </CustomButton>
          </>
        )}
      </div>
    </div>
  );
}