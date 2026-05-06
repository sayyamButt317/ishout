'use client';
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';

import NegotiationAgreedByCampaignHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-agreed-by-campaign-hook';
import { CardType } from '@/src/types/Admin-Type/agreed-negotiation-type';
import { countStyles } from '@/src/utils/countStyle';
import ContentHeader from '@/src/app/component/custom-component/ContentHeader';
import { Button } from '@/components/ui/button';
import CampaignBriefDialog from '@/src/app/component/custom-component/CampaignBriefDialog';
import CampaignBriefDetailHook from '@/src/routes/Company/api/Hooks/get-campaign-brief-detail-hook';
import { UpdateCampaignBrief } from '@/src/types/Compnay/campaignbrieftype';
import { Trash2 } from 'lucide-react';
import { DeleteDialogue } from '@/src/app/component/DeleteDialogue';
import useDeleteAdminInfluencerMessagesHook from '@/src/routes/Admin/Hooks/feedback/delete-admin-influencer-messages-hook';
import { CircleDashed, CircleCheck, RefreshCcw, CircleCheckBig } from 'lucide-react';
import { Skeleton } from 'boneyard-js/react';

const COLUMNS = [

  { icon: <CircleDashed />,id: 'review', label: 'Under Review', color: 'primary' },
  { icon: <RefreshCcw />,id: 'revision', label: 'Revision', color: 'amber' },
  { icon: <CircleCheck />,id: 'approved', label: 'Approved', color: 'emerald' },
  { icon: <CircleCheckBig />,id: 'posted', label: 'Posted', color: 'green' },
=======
  { icon: <CircleDashed />, id: 'review', label: 'Under Review', color: 'primary' },
  { icon: <RefreshCcw />, id: 'revision', label: 'Revision', color: 'amber' },
  { icon: <CircleCheck />, id: 'approved', label: 'Approved', color: 'emerald' },
  { icon: <CircleCheckBig />, id: 'posted', label: 'Rejected', color: 'green' },
>>>>>>> c922e81c240b5e9643914acca216ea0af159fcfe
];

function ContentFeedbackPageContent() {
  const searchParams = useSearchParams();
  const campaignIdFromQuery = searchParams.get('campaign_id') ?? '';
  const router = useRouter();

  const { data, isLoading } = NegotiationAgreedByCampaignHook(campaignIdFromQuery);
  const negotiationItems = data?.negotiations ?? [];
  const [selectedBriefId, setSelectedBriefId] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [selectedNegotiationId, setSelectedNegotiationId] = useState<string | null>(null);
  const { data: briefData } = CampaignBriefDetailHook(selectedBriefId ?? '');
  const deleteAdminInfluencerMessagesHook = useDeleteAdminInfluencerMessagesHook();

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
    campaign: data?.campaign_brief?.title ?? 'Campaign',
    thumb: data?.campaign_logo_url ?? '',
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

  const brief: UpdateCampaignBrief | null = briefData?.response
    ? {
        ...briefData.response,
        id: briefData.id,
      }
    : null;

  return (
    <Skeleton name="admin-content-kanban" loading={isLoading}>
    <div className="font-sans">
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
              <div className="flex flex-row items-center justify-between px-2">
                <h3 className="flex flex-row gap-2 text-xs font-bold uppercase tracking-widest text-white/50">
                  {col.icon}
                  {col.label}

                </h3>

                <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${col.color === 'primary'
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
                    key={card.id}
                    onClick={() => {
                      const campaignId = card.campaign_id ?? campaignIdFromQuery;
                      if (!campaignId) return;

                      router.push(
                        `/Admin/content/${encodeURIComponent(
                          card.id,
                        )}?campaign_id=${encodeURIComponent(campaignId)}`,
                      );
                    }}
                    className="relative cursor-pointer rounded-2xl border border-white/10 bg-[#0F0F0F] p-5 transition-all hover:border-white/20"
                  >
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (!card.thread_id) return;
                        setSelectedThreadId(card.thread_id);
                        setSelectedNegotiationId(card.id);
                        setDeleteOpen(true);
                      }}
                      className="absolute right-3 top-3 rounded-full border border-red-500/30 bg-red-500/10 p-1.5 text-red-300 transition-colors hover:bg-red-500/20"
                      aria-label="Delete admin-influencer chat"
                    >
                      <Trash2 className="size-4" />
                    </button>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="relative size-12 overflow-hidden rounded-full border border-white/10">
                        <Image
                          src={card.picture || '/assets/logo.svg'}
                          alt={card.influncer_name ?? 'Influencer avatar'}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col">
                        <h4 className="text-base font-bold text-white">
                          @{card.influncer_name}
                        </h4>
                        <span className="text-sm text-white/40">
                          {card.influncer_name}
                        </span>
                      </div>
                    </div>

                    {/* DETAILS */}
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

                    {/* ACTIONS */}
                    <div className="flex gap-3">
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
                        className="flex-1 h-11 rounded-xl curcor-pointer bg-primaryButton hover:bg-primaryHover text-white font-bold"
                      >
                        View Content
                      </Button>
                    </div>
                  </div>
                ))}


                {combinedCards.length === 0 && (
                  <p className="text-xs text-white/40 text-center py-4">No items</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <CampaignBriefDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        briefData={brief}
          onUpdate={() => { }}
      />
      <DeleteDialogue
        heading="Delete Chat"
        subheading={`This will delete all chat history between admin and influencer.\nAre you sure?`}
        open={deleteOpen}
        onClose={() => {
          setDeleteOpen(false);
          setSelectedThreadId(null);
          setSelectedNegotiationId(null);
        }}
        ondelete={async () => {
          if (!selectedThreadId) return;
          try {
            await deleteAdminInfluencerMessagesHook.mutateAsync({
              thread_id: selectedThreadId,
              negotiation_id: selectedNegotiationId ?? undefined,
            });
            setDeleteOpen(false);
            setSelectedThreadId(null);
            setSelectedNegotiationId(null);
          } catch {
            // toast is already handled in hook
          }
        }}
      />
    </div>
    </Skeleton>
  );
}

export default function InfluncersContentPage() {
  return (
    <Suspense fallback={<div className="p-4 text-white/60">Loading...</div>}>
      <ContentFeedbackPageContent />
    </Suspense>
  );
}
