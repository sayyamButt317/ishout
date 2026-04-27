'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PageHeader from '@/src/app/component/PageHeader';
import ContentHeader from '@/src/app/component/custom-component/ContentHeader';
import CampaignBriefDialog from '@/src/app/component/custom-component/CampaignBriefDialog';
import CampaignBriefDetailHook from '@/src/routes/Company/api/Hooks/get-campaign-brief-detail-hook';
import { UpdateCampaignBrief } from '@/src/types/Compnay/campaignbrieftype';
import { MessageSquare, MoreHorizontal, Search, Video } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import NegotiationAgreedByCampaignHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-agreed-by-campaign-hook';
import {
  CardType,
  NegotiationItem,
  NegotiationResponse,
} from '@/src/types/Compnay/feeedback-content-type';

const COLUMNS = [
  { id: 'review', label: 'Under Review', count: 12, color: 'primary' },
  { id: 'revision', label: 'Revision', count: 3, color: 'amber' },
  { id: 'approved', label: 'Approved', count: 28, color: 'emerald' },
];

const countStyles: Record<string, string> = {
  slate: 'bg-slate-100 border-slate-200 text-slate-600',
  primary: 'bg-[var(--color-primaryButton)] text-white',
  amber: 'bg-amber-100 border-amber-200 text-amber-700',
  emerald: 'bg-emerald-100 border-emerald-200 text-emerald-700',
};

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

function ContentFeedbackPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const campaignIdFromQuery = searchParams.get('campaign_id') ?? '';

  const [search, setSearch] = useState('');
  const [selectedBriefId, setSelectedBriefId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const { data } = NegotiationAgreedByCampaignHook(campaignIdFromQuery) as {
    data?: NegotiationResponse;
  };

  const { data: briefData } = CampaignBriefDetailHook(selectedBriefId ?? '');

  const negotiationItems = data?.negotiations ?? [];

  type CardWithSource = CardType & { source: NegotiationItem };

  // Keeping the admin_approved filter as requested
  const apiCards: CardWithSource[] = negotiationItems
    .filter((item) => item.admin_approved === 'Approved')
    .map((item) => ({
      id: item._id,
      campaign_id: item.campaign_id,
      title: `${item.name ?? 'Unknown'} - ${item.thread_id ?? ''}`,
      campaign: item.campaign_brief?.title ?? 'Campaign',
      thumb: item.influencer?.picture ?? '',
      thread_id: item.thread_id,
      brand_thread_id: item.brand_thread_id,
      Brand_approved: item.Brand_approved,
      source: item,
    }));

  const brief: UpdateCampaignBrief | null = briefData?.response
    ? {
        ...briefData.response,
        id: briefData.id,
      }
    : null;

  return (
    <div className="font-sans">
      <PageHeader
        title="Content Review & Feedback Pipeline"
        description="Review content from influencers and provide feedback"
        icon={<MessageSquare className="size-5" />}
        actions={
          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-white/40" />
              <input
                type="text"
                placeholder="Search content..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-64 rounded-lg border border-white/10 bg-white/5 pl-9 pr-4 text-sm text-white placeholder:text-white/40 focus:border-(--color-primaryButton) focus:outline-none focus:ring-1 focus:ring-(--color-primaryButton)"
              />
            </div>
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1">
              <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-emerald-400">Live Pipeline</span>
            </div>
          </div>
        }
      />
      <ContentHeader
        title={data?.campaign_brief?.title ?? ''}
        logo={data?.campaign_logo_url ?? ''}
        description="Showing influencers content waiting for content feedback review"
        category="Influencers Content"
        deliverables={data?.campaign_brief?.deliverables_per_influencer}
        timeline={data?.campaign_brief?.timeline}
        platform={data?.campaign?.platform}
        companyName={data?.campaign?.company_name}
        briefId={data?.campaign?.brief_id}
        brandThreadId={data?.campaign?.brand_thread_id}
        onViewBrief={(id) => {
          setSelectedBriefId(id);
          setDialogOpen(true);
        }}
      />

      <div className="flex gap-6 mt-6 overflow-x-auto pb-4 items-start">
        {COLUMNS.map((col) => {
          const combinedCards: CardWithSource[] =
            col.id === 'approved'
              ? apiCards.filter(
                  (card) => (card.Brand_approved ?? '').toLowerCase() === 'approved',
                )
              : col.id === 'revision'
                ? apiCards.filter(
                    (card) => (card.Brand_approved ?? '').toLowerCase() === 'revision',
                  )
                : col.id === 'review'
                  ? apiCards.filter((card) => {
                      const status = (card.Brand_approved ?? '').toLowerCase();
                      return status !== 'approved' && status !== 'revision';
                    })
                  : [];

          return (
            <div
              key={col.id}
              className="flex w-96 shrink-0 flex-col gap-4 rounded-xl border border-white/10 bg-white/2 p-4"
            >
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
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
                <button className="text-white/40 hover:text-white/70 transition-colors">
                  <MoreHorizontal className="size-4" />
                </button>
              </div>

              <div className="flex flex-col gap-3 overflow-y-auto">
                {combinedCards?.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => {
                      const campaignId = card.campaign_id ?? campaignIdFromQuery;
                      if (!campaignId) return;

                      const selectedCardPayload = {
                        item: card.source,
                        title: card.title,
                        campaign: card.campaign,
                      };
                      if (typeof window !== 'undefined') {
                        sessionStorage.setItem(
                          'content-feedback:selected-card',
                          JSON.stringify(selectedCardPayload),
                        );
                      }
                      const params = new URLSearchParams({
                        negotiation_id: card.id,
                        campaign_id: campaignId,
                      });
                      router.push(
                        `/client/content-feedback/content?${params.toString()}`,
                      );
                    }}
                    className="cursor-pointer rounded-2xl border border-white/10 bg-[#0F0F0F] p-6 transition-all hover:border-white/20 min-h-[260px] flex flex-col justify-between"
                  >
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative w-20 h-20 overflow-hidden rounded-full border border-white/10">
                        <Image
                          src={card.source?.influencer?.picture ?? ''}
                          alt={card.source?.influencer?.username ?? ''}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-base font-bold text-white">
                          @{card.source?.influencer?.username ?? ''}
                        </h4>
                      </div>
                    </div>

                    {/* DETAILS - Influencer Information */}
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                          Engagement Rate
                        </span>
                        <span className="text-sm text-white/90">
                          {card.source?.influencer?.engagementRate
                            ? `${(card.source.influencer.engagementRate * 100).toFixed(2)}%`
                            : 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                          Country
                        </span>
                        <span className="text-sm text-white/90">
                          {card.source?.influencer?.country || 'N/A'}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/30">
                          Platform
                        </span>
                        <span className="text-sm text-white/90 capitalize">
                          {card.source?.influencer?.platform || 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="flex-1 h-11 rounded-xl bg-white/5 border-white/5 text-white hover:bg-white/10"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleViewProfile(
                            card.source?.influencer?.username,
                            card.source?.influencer?.platform,
                          );
                        }}
                      >
                        View Profile
                      </Button>

                      <Button
                        variant="default"
                        onClick={(e) => {
                          e.stopPropagation();

                          const campaignId = card.campaign_id ?? campaignIdFromQuery;
                          if (!campaignId) return;

                          const selectedCardPayload = {
                            item: card.source,
                            title: card.title,
                            campaign: card.campaign,
                          };
                          if (typeof window !== 'undefined') {
                            sessionStorage.setItem(
                              'content-feedback:selected-card',
                              JSON.stringify(selectedCardPayload),
                            );
                          }
                          const params = new URLSearchParams({
                            negotiation_id: card.id,
                            campaign_id: campaignId,
                          });
                          router.push(
                            `/client/content-feedback/content?${params.toString()}`,
                          );
                        }}
                        className="flex-1 h-11 rounded-xl bg-primaryButton hover:bg-primaryHover text-white font-bold"
                      >
                        View Content
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <CampaignBriefDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        briefData={brief}
        onUpdate={() => {}}
      />
    </div>
  );
}

export default function ContentFeedbackPage() {
  return (
    <Suspense fallback={<div className="p-4 text-white/60">Loading content...</div>}>
      <ContentFeedbackPageContent />
    </Suspense>
  );
}
