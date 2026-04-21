'use client';
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Video } from 'lucide-react';
import Image from 'next/image';

import NegotiationAgreedByCampaignHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-agreed-by-campaign-hook';
import { CardType } from '@/src/types/Admin-Type/agreed-negotiation-type';
import { countStyles } from '@/src/utils/countStyle';
import ContentHeader from '@/src/app/component/custom-component/ContentHeader';
import { Button } from '@/components/ui/button';
import { countStyles } from '@/src/utils/countStyle';

interface CampaingnContentProps {
  _id: string;
  thread_id: string;
  Brand_approved: string | null;
  admin_approved: string;
  brand_thread_id: string;
  campaign_id: string;
  campaign_logo_url: string;
  influencer_id: string;
  campaign_brief: {
    title: string;
  };
  name: string;
}

const COLUMNS = [
  { id: 'review', label: 'Under Review', color: 'primary' },
  { id: 'revision', label: 'Revision', color: 'amber' },
  { id: 'approved', label: 'Approved', color: 'emerald' },
];

function ContentFeedbackPageContent() {
  const searchParams = useSearchParams();
  const campaignIdFromQuery = searchParams.get('campaign_id') ?? '';
  const router = useRouter();

  const [search, setSearch] = useState('');

  const { data } = NegotiationAgreedByCampaignHook(campaignIdFromQuery);
  const negotiationItems = data?.negotiations ?? [];

  const handleViewProfile = (username?: string, platform?: string) => {
    if (!username || !platform) return;

    const cleanUsername = username.replace(/^@/, '');

    const urls: Record<string, string> = {
      instagram: `https://www.instagram.com/${cleanUsername}`,
      tiktok: `https://www.tiktok.com/@${cleanUsername}`,
      youtube: `https://www.youtube.com/@${cleanUsername}`,
    };

    const url = urls[platform.toLowerCase()];
    if (url) window.open(url, '_blank');
  };
  const apiCards: CardType[] = negotiationItems.map((item) => ({
    id: item._id,
    campaign_id: item.campaign_id,

    campaign: item.campaign_brief?.title ?? 'Campaign',
    thumb: item.campaign_logo_url ?? '',

    influncer_name: item.influencer?.username ?? '',
    picture: item.influencer?.picture ?? '',

    engagementRate: item.influencer?.engagementRate,
    country: item.influencer?.country,
    platform: item.influencer?.platform,

    thread_id: item.thread_id,
    brand_thread_id: item.brand_thread_id,
    admin_approved: item.admin_approved,

    rights: 'Full Rights',
    status: 'Ready to Post',
  }));

  return (
    <div className="font-sans">
      <ContentHeader
        title={apiCards?.[0]?.campaign ?? ''}
        logo={apiCards?.[0]?.thumb ?? ''}
        description="Showing influencers content waiting for content feedback review"
        category="Influencers Content"
      />

      <div className="flex gap-6 overflow-x-auto pb-4">
        {COLUMNS.map((col) => {
          const combinedCards =
            col.id === 'approved'
              ? apiCards.filter(
                  (card) => (card.admin_approved ?? '').toLowerCase() === 'approved',
                )
              : col.id === 'revision'
                ? apiCards.filter(
                    (card) => (card.admin_approved ?? '').toLowerCase() === 'revision',
                  )
                : apiCards.filter((card) => {
                    const status = (card.admin_approved ?? '').toLowerCase();
                    return status !== 'approved' && status !== 'revision';
                  });

          return (
            <div
              key={col.id}
              className="flex w-1/3 shrink-0 flex-col mt-2 gap-4 rounded-xl border border-white/10 bg-white/2 p-4"
            >
              {/* HEADER */}
              <div className="flex items-center justify-between px-2">
                <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">
                  {col.label}
                </h3>

                <span
                  className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    col.color === 'primary'
                      ? 'bg-(--color-primaryButton) text-white'
                      : countStyles[col.color]
                  }`}
                >
                  {combinedCards.length}
                </span>
              </div>

              {/* CARDS */}
              <div className="flex flex-col gap-3 overflow-y-auto">
                {combinedCards.map((card) => (
                  <div
                    key={card._id}
                    onClick={() => {
                      const campaignId =
                        card.campaign_id ?? campaignIdFromQuery;
                      if (!campaignId) return;

                      router.push(
                        `/Admin/content/${encodeURIComponent(
                          card._id
                        )}?campaign_id=${encodeURIComponent(campaignId)}`
                      );
                    }}
                    className="cursor-pointer rounded-2xl border border-white/10 bg-[#0F0F0F] p-5 transition-all hover:border-white/20"
                  >
                    {/* HEADER: Avatar and Username */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative size-12 overflow-hidden rounded-full border border-white/10">
                        <Image
                          src={card.picture || card.thumb}
                          alt={card.influncer_name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-base font-bold text-white">
                          @{card.influncer_name}
                        </h4>
                        <span className="text-sm text-white/40">
                          {/* Placeholder for name since logic wasn't provided for it */}
                          {card.influncer_name}
                        </span>
                      </div>
                    </div>

                    {/* DETAILS: Grid Style (Matches SS-2) */}
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                          Phone
                        </span>
                        <span className="text-sm text-white/90">
                          {card.thread_id || 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                          Country
                        </span>
                        <span className="text-sm text-white/90">
                          {card.country ?? 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* ACTIONS: Your Original Navigation Logic */}

                    <div className="flex gap-3">
                      {/* MESSAGE BUTTON → same as card click */}
                      <Button
                        variant="outline"
                        className="flex-1 h-11 rounded-xl bg-white/5 border-white/5 text-white hover:bg-white/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewProfile(card.influncer_name, card.platform);
                        }}
                      >
                        View Profile
                      </Button>

                      {/* VIEW CONTENT → influencer profile */}
                      <Button
                        variant="default"
                        onClick={(e) => {
                          e.stopPropagation();

                          const campaignId = card.campaign_id ?? campaignIdFromQuery;
                          if (!campaignId) return;

                          router.push(
                            `/Admin/content/${encodeURIComponent(
                              card.id,
                            )}?campaign_id=${encodeURIComponent(campaignId)}`,
                          );
                        }}
                        className="flex-1 h-11 rounded-xl bg-primaryButton hover:bg-primaryHover text-white font-bold"
                      >
                        View Content
                      </Button>
                    </div>
                  </div>
                ))}

                {/* Empty State */}
                {combinedCards.length === 0 && (
                  <p className="text-xs text-white/40 text-center py-4">
                    No items
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function InfluncersContentPage() {
  return (
    <Suspense fallback={<div className="p-4 text-white/60">Loading...</div>}>
      <ContentFeedbackPageContent />
    </Suspense>
  );
}