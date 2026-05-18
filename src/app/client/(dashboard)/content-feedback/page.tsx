'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PageHeader from '@/src/app/component/PageHeader';
import ContentHeader from '@/src/app/component/custom-component/ContentHeader';
import CampaignBriefDialog from '@/src/app/component/custom-component/CampaignBriefDialog';
import CampaignBriefDetailHook from '@/src/routes/Company/Hooks/get-campaign-brief-detail-hook';
import { UpdateCampaignBrief } from '@/src/types/Compnay/campaignbrieftype';
import { MessageSquare, MoreHorizontal, Search } from 'lucide-react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import NegotiationAgreedByCampaignHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-agreed-by-campaign-hook';
import { CardType, NegotiationItem } from '@/src/types/Compnay/feeedback-content-type';
import { KanbanSkeleton } from '@/src/app/component/skeletons/admin-skeletons';

const COLUMNS = [
  { id: 'review', label: 'Under Review', color: 'primary' },
  { id: 'revision', label: 'Revision', color: 'amber' },
  { id: 'approved', label: 'Approved', color: 'emerald' },
  { id: 'posted', label: 'Posted', color: 'green' },
];

const countStyles: Record<string, string> = {
  slate:
    'bg-slate-100 border border-slate-200 text-slate-600 dark:bg-white/10 dark:border-white/10 dark:text-white/70',

  primary: 'bg-[var(--color-primaryButton)] text-white',

  amber:
    'bg-amber-100 border border-amber-200 text-amber-700 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-300',

  emerald:
    'bg-emerald-100 border border-emerald-200 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-300',

  green:
    'bg-green-100 border border-green-200 text-green-700 dark:bg-green-500/10 dark:border-green-500/20 dark:text-green-300',
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

  const { data, isPending } = NegotiationAgreedByCampaignHook(campaignIdFromQuery);

  const { data: briefData } = CampaignBriefDetailHook(selectedBriefId ?? '');

  const negotiationItems = data?.negotiations ?? [];

  type CardWithSource = CardType & { source: NegotiationItem };

  if (campaignIdFromQuery && isPending) {
    return <KanbanSkeleton columnsCount={4} cardsPerColumn={3} />;
  }

  const apiCards: CardWithSource[] = negotiationItems
    .filter((item) => {
      const adminStatus = (item.admin_approved ?? '').toLowerCase();
      return adminStatus === 'approved' || adminStatus === 'posted';
    })
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
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400 dark:text-white/40" />

              <input
                type="text"
                placeholder="Search content..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="h-10 w-64 rounded-xl border border-slate-200 bg-white pl-9 pr-4 text-sm text-slate-700 placeholder:text-slate-400 shadow-sm transition-all focus:border-(--color-primaryButton) focus:outline-none focus:ring-2 focus:ring-(--color-primaryButton)/20 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:placeholder:text-white/35"
              />
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 backdrop-blur-sm">
              <span className="size-2 animate-pulse rounded-full bg-emerald-500" />

              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                Live Pipeline
              </span>
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
        progress={72}
        status="Awaiting Review"
        onViewBrief={(id) => {
          setSelectedBriefId(id);
          setDialogOpen(true);
        }}
      />

      <div className="mt-6 flex items-start gap-6 overflow-x-auto pb-4">
        {COLUMNS.map((col) => {
          const combinedCards: CardWithSource[] =
            col.id === 'posted'
              ? apiCards.filter(
                  (card) => (card.source.admin_approved ?? '').toLowerCase() === 'posted',
                )
              : col.id === 'approved'
                ? apiCards.filter((card) => {
                    const adminStatus = (card.source.admin_approved ?? '').toLowerCase();
                    return (
                      adminStatus !== 'posted' &&
                      (card.Brand_approved ?? '').toLowerCase() === 'approved'
                    );
                  })
                : col.id === 'revision'
                  ? apiCards.filter((card) => {
                      const adminStatus = (
                        card.source.admin_approved ?? ''
                      ).toLowerCase();
                      return (
                        adminStatus !== 'posted' &&
                        (card.Brand_approved ?? '').toLowerCase() === 'revision'
                      );
                    })
                  : col.id === 'review'
                    ? apiCards.filter((card) => {
                        const brandStatus = (card.Brand_approved ?? '').toLowerCase();
                        const adminStatus = (
                          card.source.admin_approved ?? ''
                        ).toLowerCase();
                        return (
                          adminStatus !== 'posted' &&
                          brandStatus !== 'approved' &&
                          brandStatus !== 'revision'
                        );
                      })
                    : [];

          return (
            <div
              key={col.id}
              className="flex w-96 shrink-0 flex-col gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-4 shadow-sm backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.03]"
            >
              {/* COLUMN HEADER */}
              <div className="flex items-center justify-between px-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-white/50">
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

                <button className="text-slate-400 transition-colors hover:text-slate-700 dark:text-white/40 dark:hover:text-white/70">
                  <MoreHorizontal className="size-4" />
                </button>
              </div>

              {/* CARDS */}
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
                    className="min-h-65 flex cursor-pointer flex-col justify-between rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-slate-300 hover:shadow-md dark:border-white/10 dark:bg-[#101010] dark:hover:border-white/20"
                  >
                    {/* TOP */}
                    <div>
                      <div className="mb-6 flex items-center gap-4">
                        <div className="relative h-20 w-20 overflow-hidden rounded-full border border-slate-200 dark:border-white/10">
                          <Image
                            src={card.source?.influencer?.picture ?? ''}
                            alt={card.source?.influencer?.username ?? ''}
                            fill
                            className="object-cover"
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h4 className="truncate text-base font-semibold text-slate-900 dark:text-white">
                            @{card.source?.influencer?.username ?? ''}
                          </h4>
                        </div>
                      </div>

                      {/* DETAILS */}
                      <div className="space-y-4">
                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/30">
                            Engagement Rate
                          </span>

                          <span className="text-sm text-slate-700 dark:text-white/90">
                            {card.source?.influencer?.engagementRate
                              ? `${(card.source.influencer.engagementRate * 100).toFixed(
                                  2,
                                )}%`
                              : 'N/A'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/30">
                            Country
                          </span>

                          <span className="text-sm text-slate-700 dark:text-white/90">
                            {card.source?.influencer?.country || 'N/A'}
                          </span>
                        </div>

                        <div className="flex items-center justify-between gap-4">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-white/30">
                            Platform
                          </span>

                          <span className="text-sm capitalize text-slate-700 dark:text-white/90">
                            {card.source?.influencer?.platform || 'N/A'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="mt-6 flex gap-3">
                      <Button
                        variant="outline"
                        className="h-11 flex-1 rounded-xl border border-slate-200 bg-slate-50 text-slate-700 transition-all hover:bg-slate-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:hover:bg-white/[0.08]"
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
                            briefId: data?.campaign?.brief_id ?? '',
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
                        className="h-11 flex-1 rounded-xl bg-primaryButton font-semibold text-white transition-all hover:bg-primaryHover"
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
    <Suspense fallback={<KanbanSkeleton columnsCount={4} cardsPerColumn={2} />}>
      <ContentFeedbackPageContent />
    </Suspense>
  );
}
