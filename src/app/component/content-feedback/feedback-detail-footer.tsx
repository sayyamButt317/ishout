'use client';

import { useState } from 'react';

import InfluencerDetailDialog from '@/src/app/component/content-feedback/influencerdetail';

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
}: FeedbackDetailFooterProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-black/20 px-3 py-2">
      <div className="flex gap-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
        <div>
          <p className="text-[10px] font-bold uppercase text-white/40">Duration</p>
          <p className="text-sm font-bold text-white">{durationText}</p>
        </div>
        <div>
          <p className="text-[10px] font-bold uppercase text-white/40">Resolution</p>
          <p className="text-sm font-bold text-white">{resolutionText}</p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        {isDemographicsView ? (
          <button
            type="button"
            onClick={onSaveDemographics}
            disabled={isSavingDemographics || !canSaveDemographics}
            className="rounded-lg bg-primaryButton px-3 py-2 text-xs font-bold text-white disabled:opacity-50 lg:px-4 lg:text-sm"
          >
            Save Demographics
          </button>
        ) : (
          <>
            <InfluencerDetailDialog open={open} onOpenChange={setOpen} />
            <button
              onClick={onForwardToBrand}
              disabled={isForwardLoading || !canForward}
              className="rounded-lg bg-primaryButton px-3 py-2 text-xs font-bold text-white disabled:opacity-50 lg:px-4 lg:text-sm"
            >
              Forward to Brand
            </button>
            <button
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white lg:px-4 lg:text-sm"
              onClick={() => setOpen(true)}
            >
              Influencer Analytics
            </button>
          </>
        )}
      </div>
    </div>
  );
}
