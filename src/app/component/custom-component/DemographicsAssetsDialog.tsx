'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import DemographicsOcrHook from '@/src/routes/Admin/Mutations/DemoGraphics';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { ScanText } from 'lucide-react';
import type { DemographicsOcrResponse } from '@/src/types/Admin-Type/demographics-ocr-type';
import DemographicsOcrInsights from '@/src/app/component/custom-component/DemographicsOcrInsights';
import IPhoneMockup from '@/src/app/component/custom-component/IPhoneMockup';

interface DemographicsAssetsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  imageUrls: string[];
  campaign_id: string;
  influencer_id: string;
  isLoading?: boolean;
  username?: string | null;
  onExtractOcr?: () => void;
  isOcrPending?: boolean;
}

export default function DemographicsAssetsDialog({
  open,
  onOpenChange,
  imageUrls,
  campaign_id,
  influencer_id,
  isLoading = false,
  username,
  onExtractOcr,
  isOcrPending = false,
}: DemographicsAssetsDialogProps) {
  const { mutate: demographicsOcrMutation, isPending: isInternalOcrPending } =
    DemographicsOcrHook();

  const [ocrResult, setOcrResult] = useState<DemographicsOcrResponse | null>(null);

  useEffect(() => {
    if (!open) setOcrResult(null);
  }, [open]);

  const hasImages = imageUrls.length > 0;
  const showExtractButton = hasImages && !isLoading;
  const ocrPending = onExtractOcr ? isOcrPending : isInternalOcrPending;

  const handleExtract = useCallback(() => {
    if (onExtractOcr) {
      onExtractOcr();
      return;
    }
    const urls = imageUrls.filter(Boolean);
    if (!urls.length) {
      toast.error('No demographics images to process');
      return;
    }
    if (!campaign_id || !influencer_id) {
      toast.error('Missing campaign or influencer context for OCR');
      return;
    }
    demographicsOcrMutation({ image_url: urls, campaign_id, influencer_id }, {
      onSuccess: (payload) => {
        setOcrResult(payload as DemographicsOcrResponse);
        toast.success('Demographics data extracted from images');
      },
    });
  }, [onExtractOcr, imageUrls, campaign_id, influencer_id, demographicsOcrMutation]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="flex h-[min(92vh,920px)] w-[min(96vw,1600px)] max-w-[96vw] flex-col gap-0 overflow-hidden rounded-2xl border border-white/10 bg-[#121218] p-0 shadow-2xl sm:max-w-[96vw]"
        aria-describedby={undefined}
      >
        <DialogHeader className="shrink-0 border-b border-white/10 px-6 py-5">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
            <DialogTitle className="text-left text-lg font-semibold tracking-tight text-white sm:text-xl">
              Demographics Assets {username ? `• @${username}` : ''}
            </DialogTitle>
          </div>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-5">
          {isLoading ? (
            <div className="flex min-h-[50vh] items-center justify-center text-sm text-white/60">
              Loading demographics...
            </div>
          ) : hasImages ? (
            <>
              <div className="flex flex-wrap items-start justify-center gap-10 md:gap-14 lg:gap-16">
                {imageUrls.map((imageUrl, index) => (
                  <IPhoneMockup
                    key={`${imageUrl}-${index}`}
                    src={imageUrl}
                    alt={`Demographics screenshot ${index + 1}`}
                  />
                ))}
              </div>
              {ocrResult ? <DemographicsOcrInsights data={ocrResult} /> : null}
            </>
          ) : (
            <div className="flex min-h-[40vh] items-center justify-center text-sm text-white/60">
              No demographics assets found.
            </div>
          )}
        </div>

        {showExtractButton ? (
          <div className="shrink-0 border-t border-white/10 bg-[#0e0e12] px-6 py-4">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-white/45">
                Send all demographics screenshots to OCR to extract structured audience data.
              </p>
              <button
                type="button"
                disabled={ocrPending}
                onClick={handleExtract}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#FF3B8D] px-5 py-3 text-sm font-semibold text-white shadow-md shadow-[#FF3B8D]/25 transition hover:bg-[#e2327d] disabled:cursor-not-allowed disabled:opacity-40 sm:w-auto"
              >
                <ScanText className="h-4 w-4 shrink-0 opacity-90" aria-hidden />
                {ocrPending ? 'Extracting…' : 'Extract data from images'}
              </button>
            </div>
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
