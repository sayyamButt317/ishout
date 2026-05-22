'use client';
import CampaignBriefResult from '@/src/app/component/custom-component/CampaignBriefResult';
import useAdminCreateCampaignBriefHook from '@/src/routes/Admin/Hooks/admin-create-campaign-brief-hook';
import { Loader2, Sparkles, WandSparkles } from 'lucide-react';
import { useCallback, useState, useRef } from 'react';
import SummaryPopup from '@/src/app/Admin/component/AdminSummaryPopup';
import { useReadyMadeTemplateStore } from '@/src/store/Campaign/campaign.store';
import { rangeOfFollowers } from '@/src/constant/rangeoffollowers';
import {
  mapAdminCampaignBriefApiResponseToCampaignBrief,
  type AdminCampaignBriefApiResponse,
} from '@/src/types/Admin-Type/create-campaign-type';

const CampaignBreifPage = () => {
  const {
    mutate: generateCampaignBreif,
    data,
    isPending,
    reset,
  } = useAdminCreateCampaignBriefHook();
  const [input, setInput] = useState('');
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const { setField } = useReadyMadeTemplateStore();

  const handleGenerateCampaignBreif = useCallback(() => {
    const user_input = input.trim();
    if (!user_input) return;
    generateCampaignBreif(
      { user_input },
      {
        onSuccess: (responseData: AdminCampaignBriefApiResponse) => {
          if (responseData?.id) setField('brief_id', responseData.id);

          setField('platform', []);
          setField('category', []);
          setField('followers', []);
          setField('country', []);
          setField('limit', '');

          if (responseData?.platform?.length) setField('platform', responseData.platform);
          if (responseData?.category?.length) setField('category', responseData.category);

          if (responseData?.followers != null) {
            if (
              Array.isArray(responseData.followers) &&
              responseData.followers.length > 0
            ) {
              setField('followers', responseData.followers);
            } else if (typeof responseData.followers === 'string') {
              const followerValue = responseData.followers.toLowerCase().trim();
              let numValue: number;
              if (followerValue.includes('k')) {
                numValue = parseInt(followerValue.replace('k', ''), 10) * 1000;
              } else if (followerValue.includes('m')) {
                numValue = parseInt(followerValue.replace('m', ''), 10) * 1000000;
              } else {
                numValue = parseInt(followerValue, 10);
                if (numValue >= 1000 && numValue < 1000000)
                  numValue = Math.floor(numValue / 1000) * 1000;
              }
              const matchedRange = rangeOfFollowers.find((range) => {
                const [rangeStartStr, rangeEndStr] = range.toLowerCase().split('-');
                const rangeStart = rangeStartStr.includes('m')
                  ? parseInt(rangeStartStr.replace('m', ''), 10) * 1000000
                  : parseInt(rangeStartStr.replace('k', ''), 10) * 1000;
                const rangeEnd = rangeEndStr.includes('m')
                  ? parseInt(rangeEndStr.replace('m', ''), 10) * 1000000
                  : parseInt(rangeEndStr.replace('k', '').replace('m', ''), 10) * 1000;
                return numValue >= rangeStart && numValue <= rangeEnd;
              });
              if (matchedRange) setField('followers', [matchedRange]);
            }
          }

          if (responseData?.country?.length) {
            const countryMap: Record<string, string> = {
              KSA: 'Saudi Arabia',
              UAE: 'United Arab Emirates',
            };
            setField(
              'country',
              responseData.country.map((c: string) => countryMap[c] || c),
            );
          }

          if (responseData?.limit != null) setField('limit', String(responseData.limit));

          setTimeout(() => {
            resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        },
      },
    );
  }, [input, generateCampaignBreif, setField]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey && !isPending && input.trim()) {
      e.preventDefault();
      handleGenerateCampaignBreif();
    }
  };

  const handleApprove = useCallback(() => {
    setInput('');
    reset();
    setShowSummaryPopup(true);
  }, [reset]);

  const canGenerate = Boolean(input.trim());

  return (
    <div className="min-h-screen bg-linear-to-b from-blue-50 via-foreground/5 to-purple-50 dark:from-[#0B0F19] dark:via-[#0F172A] dark:to-black flex flex-col">
      {/* ── Hero Section ── */}
      <div className="flex-1 flex items-center justify-center ">
        <div className="w-full max-w-5xl flex flex-col items-center text-center gap-2">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primarytext/30 bg-primarytext/5 text-primaryButton dark:text-white text-xs font-bold tracking-wider uppercase">
            <Sparkles size={26} className="fill-primarytext" />
            AI-Powered Campaign Engine
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight text-foreground/95 max-w-4xl mx-auto">
              Generate a Complete{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r italic from-primaryButton to-primaryHover">
                Campaign Brief{' '}
              </span>{' '}
              in Seconds
            </h2>
            <p className="text-foreground/60 text-lg italic opacity-80">
              Describe the campaign below.
            </p>
          </div>

          {/* Input card */}
          <div className="w-full bg-foreground/10 dark:bg-[#131318] rounded-2xl p-1 border border-white/0.06 shadow-2xl shadow-black/40">
            <div className="bg-slate-100 rounded-2xl p-6 space-y-4 text-left dark:bg-[#13131a]">
              <div className="space-y-2">
                <textarea
                  id="admin-campaign-input"
                  placeholder="e.g., A summer launch for our sustainable activewear brand featuring gen-z yoga influencers in urban settings..."
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={5}
                  className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-sm text-foreground/95 placeholder:text-foreground/70 resize-none"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-white/0.05">
                <div className="flex items-center gap-2 text-foreground/80 text-xs">
                  <span className="text-sm">Press ⏎ Enter to generate</span>
                </div>

                <button
                  onClick={handleGenerateCampaignBreif}
                  disabled={isPending || !canGenerate}
                  className="px-8 py-3.5 bg-linear-to-r from-primaryButton to-primaryHover text-white cursor-pointer font-bold rounded-full flex items-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating Brief...
                    </>
                  ) : (
                    <>
                      <WandSparkles />
                      Generate Brief
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Helper text */}
          <p className="text-sm text-foreground/45 max-w-xl mx-auto leading-relaxed">
            The more details you provide (budget, region, audience, deliverables), the
            more accurate and actionable your AI campaign strategy becomes.
          </p>
        </div>
      </div>

      {/* ── Campaign Brief Result ── */}
      {data && (
        <div ref={resultRef}>
          <CampaignBriefResult
            brief={mapAdminCampaignBriefApiResponseToCampaignBrief(data)}
            onApprove={handleApprove}
          />
        </div>
      )}

      {/* ── Footer ── */}
      <footer className="flex justify-center py-8">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-foreground/10 rounded-2xl border border-white/0.06">
          <div className="w-6 h-6 rounded-md bg-linear-to-br from-primaryButton to-primaryHover flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-black fill-black" />
          </div>
          <span className="text-xs font-bold tracking-tight text-foreground/80">
            Powered by <span className="text-foreground/95">iShout AI</span>
          </span>
        </div>
      </footer>

      {showSummaryPopup && <SummaryPopup onClose={() => setShowSummaryPopup(false)} />}
    </div>
  );
};

export default CampaignBreifPage;
