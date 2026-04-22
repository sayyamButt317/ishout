'use client';
import CampaignBriefResult from '@/src/app/component/custom-component/CampaignBriefResult';
import CampaignBreifHook from '@/src/routes/Company/api/Hooks/CampaignBreif-hook';
import useAuthStore from '@/src/store/AuthStore/authStore';
import { Loader2, Sparkles, WandSparkles } from 'lucide-react';
import { useCallback, useState, useRef } from 'react';
import SummaryPopup from '@/src/app/component/Ready-made/SummaryPopup';
import { useReadyMadeTemplateStore } from '@/src/store/Campaign/campaign.store';
import { rangeOfFollowers } from '@/src/constant/rangeoffollowers';
import { CampaignBriefResponse } from '@/src/types/Compnay/campaignbrieftype';



const CampaignBreifPage = () => {
  const { mutate: generateCampaignBreif, data, isPending, reset } = CampaignBreifHook();
  const { user_id } = useAuthStore();
  const [input, setInput] = useState('');
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const { setField } = useReadyMadeTemplateStore();

  const handleGenerateCampaignBreif = useCallback(() => {
    const user_input = input.trim();
    if (!user_input) return;
    generateCampaignBreif(
      { user_input, user_id },
      {
        onSuccess: (responseData: CampaignBriefResponse) => {
          if (responseData?.id) setField('brief_id', responseData.id);

          setField('platform', []);
          setField('category', []);
          setField('followers', []);
          setField('country', []);
          setField('limit', '');

          if (responseData?.platform?.length) setField('platform', responseData.platform);
          if (responseData?.category?.length) setField('category', responseData.category);

          if (responseData?.followers) {
            if (Array.isArray(responseData.followers) && responseData.followers.length > 0) {
              setField('followers', responseData.followers);
            } else if (typeof responseData.followers === 'string') {
              const followerValue = (responseData.followers as unknown as string).toLowerCase().trim();
              let numValue: number;
              if (followerValue.includes('k')) {
                numValue = parseInt(followerValue.replace('k', '')) * 1000;
              } else if (followerValue.includes('m')) {
                numValue = parseInt(followerValue.replace('m', '')) * 1000000;
              } else {
                numValue = parseInt(followerValue);
                if (numValue >= 1000 && numValue < 1000000) numValue = Math.floor(numValue / 1000) * 1000;
              }
              const matchedRange = rangeOfFollowers.find((range) => {
                const [rangeStartStr, rangeEndStr] = range.toLowerCase().split('-');
                const rangeStart = rangeStartStr.includes('m')
                  ? parseInt(rangeStartStr.replace('m', '')) * 1000000
                  : parseInt(rangeStartStr.replace('k', '')) * 1000;
                const rangeEnd = rangeEndStr.includes('m')
                  ? parseInt(rangeEndStr.replace('m', '')) * 1000000
                  : parseInt(rangeEndStr.replace('k', '').replace('m', '')) * 1000;
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
            setField('country', responseData.country.map((c: string) => countryMap[c] || c));
          }

          if (responseData?.limit) setField('limit', String(responseData.limit));

          setTimeout(() => {
            resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 100);
        },
      },
    );
  }, [input, user_id, generateCampaignBreif, setField]);

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

  return (
    <div className="min-h-screen bg-linear-to-b from-[#0B0F19] via-[#0F172A] to-black flex flex-col">

      {/* ── Hero Section ── */}
      <div className="flex-1 flex items-center justify-center ">
        <div className="w-full max-w-5xl flex flex-col items-center text-center gap-2">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primarytext/30 bg-primarytext/5 text-white text-xs font-bold tracking-wider uppercase">
            <Sparkles size={26} className="fill-primarytext" />
            AI-Powered Campaign Engine
          </div>

          {/* Headline */}
          <div className="space-y-4">
            <h2 className="text-5xl md:text-6xl font-black tracking-tight leading-tight text-[#f8f5fd] max-w-4xl mx-auto">
              Generate a Complete{' '}
              <span className="text-transparent bg-clip-text bg-linear-to-r italic from-primaryButton to-primaryHover">
                Campaign Brief   {' '}
              </span>{' '}
              in Seconds
            </h2>
            <p className="text-[#acaab1] text-lg italic opacity-80">
              Describe your campaign below to get started.
            </p>
          </div>

          {/* Input card */}
          <div className="w-full bg-[#131318] rounded-2xl p-1 border border-white/0.06 shadow-2xl shadow-black/40">
            <div className="bg-[#13131a] rounded-2xl p-6 space-y-4 text-left">

              <textarea
                placeholder="e.g., A summer launch for our sustainable activewear brand featuring gen-z yoga influencers in urban settings..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={5}
                className="w-full bg-transparent border-none focus:ring-0 focus:outline-none text-xl text-[#f8f5fd] placeholder:text-[#acaab1]/30 resize-none"
              />

              <div className="flex items-center justify-between pt-4 border-t border-white/0.05">
                <div className="flex items-center gap-2 text-#acaab1/40 text-xs">
                  <span className='text-sm'>Press ⏎ Enter to generate</span>
                </div>

                <button
                  onClick={handleGenerateCampaignBreif}
                  disabled={isPending || !input.trim()}
                  className="px-8 py-3.5 bg-linear-to-r from-primaryButton to-primaryHover text-white cursor-pointer font-bold rounded-full flex items-center gap-2 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Generating Brief...
                    </>
                  ) : (
                    <>
                      {/* magic_button icon */}
                      <WandSparkles />
                      Generate Brief
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Helper text */}
          <p className="text-sm text-[#acaab1]/40 max-w-xl mx-auto leading-relaxed">
            The more details you provide (budget, region, audience, deliverables), the more
            accurate and actionable your AI campaign strategy becomes.
          </p>
        </div>
      </div>

      {/* ── Campaign Brief Result ── */}
      {data && (
        <div ref={resultRef}>
          <CampaignBriefResult brief={data} onApprove={handleApprove} />
        </div>
      )}

      {/* ── Footer ── */}
      <footer className="flex justify-center py-8">
        <div className="inline-flex items-center gap-3 px-6 py-3 bg-[#19191f] rounded-2xl border border-white/0.06">
          <div className="w-6 h-6 rounded-md bg-linear-to-br from-primaryButton to-primaryHover flex items-center justify-center">
            <Sparkles className="w-3 h-3 text-black fill-black" />
          </div>
          <span className="text-xs font-bold tracking-tight text-[#acaab1]">
            Powered by <span className="text-[#f8f5fd]">iShout AI</span>
          </span>
        </div>
      </footer>

      {showSummaryPopup && <SummaryPopup onClose={() => setShowSummaryPopup(false)} />}
    </div>
  );
};

export default CampaignBreifPage;