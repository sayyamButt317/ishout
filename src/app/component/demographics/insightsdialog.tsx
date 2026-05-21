'use client';

import { useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ExtractInsightsHook } from '@/src/routes/Admin/Query/Queries';
import DemographicsOcrInsights from '@/src/app/component/custom-component/DemographicsOcrInsights';
import { mapStoredInsightsToOcrResponse } from '@/src/types/Admin-Type/demographics-ocr-type';

interface InsightsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  campaign_id: string;
  influencer_id: string;
  username?: string | null;
}

export default function InsightsDialog({
  open,
  onOpenChange,
  campaign_id,
  influencer_id,
  username,
}: InsightsDialogProps) {
  const { data: insightsRecord, isLoading, isError } = ExtractInsightsHook(
    campaign_id,
    influencer_id,
    open,
  );

  const insightsData = useMemo(
    () => mapStoredInsightsToOcrResponse(insightsRecord),
    [insightsRecord],
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex h-[min(92vh,920px)] w-[min(96vw,1200px)] max-w-[96vw] flex-col gap-0 overflow-hidden rounded-2xl border border-white/10 bg-[#121218] p-0 shadow-2xl sm:max-w-[96vw]"
        aria-describedby={undefined}
      >
        <DialogHeader className="shrink-0 border-b border-white/10 px-6 py-5">
          <DialogTitle className="text-left text-lg font-semibold tracking-tight text-white sm:text-xl">
            Audience Insights {username ? `• @${username}` : ''}
          </DialogTitle>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          {isLoading ? (
            <div className="flex min-h-[50vh] items-center justify-center text-sm text-white/60">
              Loading insights...
            </div>
          ) : isError || !insightsData ? (
            <div className="flex min-h-[40vh] items-center justify-center text-sm text-white/60">
              No insights found for this influencer.
            </div>
          ) : (
            <DemographicsOcrInsights data={insightsData} className="space-y-10" />
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
