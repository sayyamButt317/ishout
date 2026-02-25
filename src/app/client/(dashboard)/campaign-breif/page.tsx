'use client';
import CustomButton from '@/src/app/component/button';
import CampaignBriefResult from '@/src/app/component/custom-component/CampaignBriefResult';
import CampaignBreifHook from '@/src/routes/Company/api/Hooks/CampaignBreif-hook';
import useAuthStore from '@/src/store/AuthStore/authStore';
import { Loader2, Sparkles, X } from 'lucide-react';
import { useCallback, useState, useRef } from 'react';
import SummaryPopup from '@/src/app/component/Ready-made/SummaryPopup';
import { useReadyMadeTemplateStore } from '@/src/store/Campaign/campaign.store';
import { rangeOfFollowers } from '@/src/constant/rangeoffollowers';

const CampaignBreifPage = () => {
  const { mutate: generateCampaignBreif, data, isPending } = CampaignBreifHook();

  const { user_id } = useAuthStore();
  const [input, setInput] = useState('');
  const [showSummaryPopup, setShowSummaryPopup] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);
  const { setField } = useReadyMadeTemplateStore();

  const handleGenerateCampaignBreif = useCallback(() => {
    const user_input = input.trim();
    if (!user_input) return;
    generateCampaignBreif({ user_input, user_id }, {
      onSuccess: (responseData: any) => {
        setField('platform', []);
        setField('category', []);
        setField('followers', []);
        setField('country', []);
        setField('limit', '');
        
        if (responseData?.platform && Array.isArray(responseData.platform) && responseData.platform.length > 0) {
          setField('platform', responseData.platform);
        }
        if (responseData?.category && Array.isArray(responseData.category) && responseData.category.length > 0) {
          setField('category', responseData.category);
        }
        if (responseData?.followers) {
          if (Array.isArray(responseData.followers) && responseData.followers.length > 0) {
            setField('followers', responseData.followers);
          } else if (typeof responseData.followers === 'string') {
            const followerValue = responseData.followers.toLowerCase().trim();
            let numValue: number;
            
            if (followerValue.includes('k')) {
              numValue = parseInt(followerValue.replace('k', '')) * 1000;
            } else if (followerValue.includes('m')) {
              numValue = parseInt(followerValue.replace('m', '')) * 1000000;
            } else {
              numValue = parseInt(followerValue);
              if (numValue >= 1000 && numValue < 1000000) {
                numValue = Math.floor(numValue / 1000) * 1000;
              }
            }
            
            const matchedRange = rangeOfFollowers.find(range => {
              const [rangeStartStr, rangeEndStr] = range.toLowerCase().split('-');
              const rangeStart = rangeStartStr.includes('m') 
                ? parseInt(rangeStartStr.replace('m', '')) * 1000000 
                : parseInt(rangeStartStr.replace('k', '')) * 1000;
              const rangeEnd = rangeEndStr.includes('m') 
                ? parseInt(rangeEndStr.replace('m', '')) * 1000000 
                : parseInt(rangeEndStr.replace('k', '').replace('m', '')) * 1000;
              return numValue >= rangeStart && numValue <= rangeEnd;
            });
            
            if (matchedRange) {
              setField('followers', [matchedRange]);
            }
          }
        }
        if (responseData?.country && Array.isArray(responseData.country) && responseData.country.length > 0) {
          const countryMap: Record<string, string> = {
            'KSA': 'Saudi Arabia',
            'UAE': 'United Arab Emirates',
          };
          const mappedCountries = responseData.country.map((c: string) => countryMap[c] || c);
          setField('country', mappedCountries);
        }
        if (responseData?.limit) {
          setField('limit', String(responseData.limit));
        }
        setTimeout(() => {
          resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    });
  }, [input, user_id, generateCampaignBreif]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !isPending && input.trim()) {
      handleGenerateCampaignBreif();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0B0F19] via-[#0F172A] to-black text-white flex flex-col">
      <div className="flex-1 flex items-center justify-center px-6 py-20">
        <div className="w-full max-w-4xl">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-white/70 mb-6">
              <Sparkles size={16} />
              AI-Powered Campaign Strategy
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold leading-tight tracking-tight">
              Generate a Complete <span className="text-white/70">Campaign Brief</span> in
              Seconds
            </h1>
            <p className="mt-6 text-white/60 text-base md:text-lg max-w-2xl mx-auto">
              Describe your brand, goals, and audience. Our AI agent will craft a
              structured influencer campaign brief ready for execution.
            </p>
          </div>

          <div className="bg-white/5 border border-white/10 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-2xl shadow-black/40">
            <label className="block text-sm text-white/60 mb-3">
              Describe your campaign
            </label>

            <textarea
              placeholder="Example: We are launching a new skincare line in UAE targeting women 18–30. Budget is $20k. We want awareness + influencer reels + TikTok strategy..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              rows={6}
              className="w-full bg-black/40 border border-white/10 rounded-2xl p-5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all resize-none"
            />

            <div className="flex items-center justify-between mt-6">
              <p className="text-xs text-white/40">
                Press <span className="text-white/60 font-medium">Enter</span> to generate
              </p>
              <CustomButton
                onClick={handleGenerateCampaignBreif}
                disabled={isPending || !input.trim()}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-medium hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                {isPending ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>Generate Brief</>
                )}
              </CustomButton>
            </div>
          </div>
          <div className="mt-10 text-center text-sm text-white/40">
            The more details you provide (budget, region, target audience, deliverables),
            the better the generated campaign strategy.
          </div>
        </div>
      </div>

      {data && (
        <div ref={resultRef}>
          <CampaignBriefResult brief={data} onApprove={() => setShowSummaryPopup(true)} />
        </div>
      )}

      <div className="text-center text-xs text-white/30 pb-8">
        Powered by AI Campaign Intelligence
      </div>

      {showSummaryPopup && (
        <SummaryPopup onClose={() => setShowSummaryPopup(false)} />
      )}
    </div>
  );
};

export default CampaignBreifPage;
