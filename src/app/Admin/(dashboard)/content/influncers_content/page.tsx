'use client';
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import NegotiationAgreedByCampaignHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-agreed-by-campaign-hook';
import { CardType } from '@/src/types/Admin-Type/agreed-negotiation-type';
import { countStyles } from '@/src/utils/countStyle';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { DeleteDialogue } from '@/src/app/component/DeleteDialogue';
import useDeleteAdminInfluencerMessagesHook from '@/src/routes/Admin/Hooks/feedback/delete-admin-influencer-messages-hook';
import { CircleDashed, CircleCheck, RefreshCcw, CircleCheckBig } from 'lucide-react';
import { KanbanSkeleton } from '@/src/app/component/skeletons/admin-skeletons';
import PlatformBadge from '@/src/app/component/custom-component/platformbadge';
import { PlatformType } from '@/src/types/readymadeinfluencers-type';

const COLUMN_ICON_CLASS = 'size-3.5 shrink-0 md:size-3';

const COLUMNS = [
  { icon: <CircleDashed className={COLUMN_ICON_CLASS} />, id: 'review', label: 'Under Review', color: 'primary' },
  { icon: <RefreshCcw className={COLUMN_ICON_CLASS} />, id: 'revision', label: 'Revision', color: 'amber' },
  { icon: <CircleCheck className={COLUMN_ICON_CLASS} />, id: 'approved', label: 'Approved', color: 'emerald' },
  { icon: <CircleCheckBig className={COLUMN_ICON_CLASS} />, id: 'posted', label: 'Posted', color: 'green' },
];

function ContentFeedbackPageContent() {
  const searchParams = useSearchParams();
  const campaignIdFromQuery = searchParams.get('campaign_id') ?? '';
  const router = useRouter();

  const { data, isLoading } = NegotiationAgreedByCampaignHook(campaignIdFromQuery);
  const negotiationItems = data?.negotiations ?? [];

  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedThreadId, setSelectedThreadId] = useState<string | null>(null);
  const [selectedNegotiationId, setSelectedNegotiationId] = useState<string | null>(null);
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
    Brand_approved: item.Brand_approved,

    rights: 'Full Rights',
    status: 'Ready to Post',
  }));

  if (isLoading) return <KanbanSkeleton />;

  return (
    <div className="font-sans w-full min-w-0">
      <div
        className="grid w-full min-w-0 grid-cols-1 gap-4 pb-4 md:grid-cols-2 md:gap-3 lg:grid-cols-4 lg:gap-2 lg:pb-3"
      >
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
                : col.id === 'posted'
                  ? apiCards.filter(
                    (card) => (card.admin_approved ?? '').toLowerCase() === 'posted',
                  )
                  : apiCards.filter((card) => {
                    const adminStatus = (card.admin_approved ?? '').toLowerCase();
                    return (
                      adminStatus !== 'approved' &&
                      adminStatus !== 'revision' &&
                      adminStatus !== 'posted'
                    );
                  });

          return (
            <div
              key={col.id}
              className="flex w-full min-w-0 flex-col gap-2 rounded-xl border mt-5 border-white/10 bg-white/2 p-3 md:max-h-[calc(100dvh-5.5rem)] md:gap-1.5 md:rounded-lg md:p-2 lg:max-h-[calc(100dvh-5.5rem)] lg:gap-2 lg:rounded-xl"
            >
              <div className="flex shrink-0 flex-row items-center justify-between gap-2 px-0.5 md:gap-1">
                <h3 className="flex min-w-0 flex-row items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-white/50 md:gap-1 md:text-[9px] lg:text-[10px] lg:tracking-wider">
                  {col.icon}
                  <span className="truncate leading-tight">{col.label}</span>
                </h3>

                <span
                  className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold md:px-1.5 md:py-px md:text-[9px] lg:px-2 lg:text-[10px] ${col.color === 'primary'
                    ? 'bg-(--color-primaryButton) text-white'
                    : countStyles[col.color]
                    }`}
                >
                  {combinedCards.length}
                </span>
              </div>

              {/* CARDS */}
              <div className="flex flex-col gap-2 md:min-h-0 md:flex-1 md:overflow-y-auto md:gap-1.5 lg:gap-2">
                {combinedCards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => handleViewProfile(card.influncer_name, card.platform)}
                    className="relative min-w-0 cursor-pointer rounded-xl border border-white/10 bg-[#0F0F0F] p-3 transition-all hover:border-white/20 md:rounded-lg md:p-1.5 lg:rounded-xl lg:p-2"
                  >
                    <div className="absolute right-2 top-2 md:right-1.5 md:top-1.5 md:origin-top-right md:scale-90 lg:right-2 lg:top-2 lg:scale-100">
                      <PlatformBadge
                        key={card.id} platform={card.platform as PlatformType} />
                    </div>
                    <div className="mb-3 flex items-center gap-3 pr-9 md:mb-2 md:gap-2 md:pr-7 lg:mb-2.5 lg:gap-2.5 lg:pr-8">
                      <div className="relative size-10 shrink-0 overflow-hidden rounded-full border border-white/10 md:size-8 lg:size-9">
                        <Image
                          src={card.picture || '/assets/logo.svg'}
                          alt={card.influncer_name ?? 'Influencer avatar'}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 40px, 36px"
                        />
                      </div>
                      <div className="min-w-0 flex flex-col">
                        <h4 className="truncate text-sm font-bold text-white md:text-[11px] lg:text-xs">
                          @{card.influncer_name}
                        </h4>
                        <span className="truncate text-xs text-white/40 md:text-[10px]">
                          {card.influncer_name}
                        </span>
                      </div>
                    </div>

                    {/* DETAILS */}
                    <div className="mb-3 space-y-2 md:mb-2 md:space-y-1 lg:mb-2.5 lg:space-y-1.5">
                      <div className="flex items-center justify-between gap-2 md:gap-1">
                        <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-white/30 md:text-[8px] lg:text-[9px]">
                          Phone
                        </span>
                        <span className="truncate text-right text-sm text-white/90 md:text-[10px] lg:text-[11px]">
                          {card.thread_id || 'N/A'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between gap-2 md:gap-1">
                        <span className="shrink-0 text-[10px] font-bold uppercase tracking-wide text-white/30 md:text-[8px] lg:text-[9px]">
                          Country
                        </span>
                        <span className="truncate text-right text-sm text-white/90 md:text-[10px] lg:text-[11px]">
                          {card.country ?? 'N/A'}
                        </span>
                      </div>
                    </div>

                    {/* ACTIONS */}
                    <div className="flex gap-2 md:gap-1.5 lg:gap-2">
                      <Button
                        variant="default"
                        onClick={(e) => {
                          e.stopPropagation();

                          const campaignId = card.campaign_id ?? campaignIdFromQuery;
                          const briefId = data?.campaign?.brief_id ?? '';
                          if (!campaignId) return;

                          router.push(
                            `/Admin/content/${encodeURIComponent(
                              card.id,
                            )}?campaign_id=${encodeURIComponent(campaignId)}&brief_id=${encodeURIComponent(briefId)}`,
                          );
                        }}
                        className="h-10 flex-1 cursor-pointer rounded-lg bg-primaryButton px-3 text-sm font-semibold text-white hover:bg-primaryHover md:h-7 md:rounded-md md:px-2 md:text-[10px] lg:h-8 lg:rounded-lg lg:text-xs"
                      >
                        View Content
                      </Button>
                      {/* <button
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
                        </button> */}
                    </div>
                  </div>
                ))}

                {combinedCards.length === 0 && (
                  <p className="py-4 text-center text-xs text-white/40 md:py-3 md:text-[10px] lg:text-xs">No items</p>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* <DeleteDialogue
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
      /> */}
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
