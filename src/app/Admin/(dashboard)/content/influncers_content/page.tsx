'use client';
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MessageSquare, MoreHorizontal, Video } from 'lucide-react';
import Image from 'next/image';
import NegotiationAgreedByCampaignHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-agreed-by-campaign-hook';
import { CardType, NegotiationResponse } from '@/src/types/Admin-Type/Content-type';
import { countStyles } from '@/src/utils/countStyle';
import ContentHeader from '@/src/app/component/custom-component/ContentHeader';
import { Button } from '@/components/ui/button';

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
  const { data } = NegotiationAgreedByCampaignHook(campaignIdFromQuery) as {
    data?: NegotiationResponse;
  };

  const negotiationItems = data?.negotiations ?? data?.negotiation_controls ?? [];

  const apiCards: CardType[] = negotiationItems
    .filter((item) => !item.negotiation_status || item.negotiation_status === 'agreed')
    .map((item) => {
      return {
        id: item._id,
        campaign_id: item.campaign_id,
        title: `${item.name ?? 'Unknown'} - ${item.thread_id ?? ''}`,
        campaign: item.campaign_brief?.title ?? 'Campaign',
        rights: 'Full Rights',
        status: 'Ready to Post',
        thumb: item.campaign_logo_url ?? '',
        thread_id: item.thread_id,
        brand_thread_id: item.brand_thread_id,
        admin_approved: item.admin_approved,
      };
    });

  return (
    <div className="font-sans">
      <ContentHeader title={apiCards?.[0]?.campaign ?? ''}
        logo={apiCards?.[0]?.thumb ?? ''}
        description='Showing influencers content waiting for content feedback review'
        category='Influencers Content' />

      <div className="flex gap-6 overflow-x-auto pb-4">
        {COLUMNS.map((col) => {
          const combinedCards: CardType[] =
            col.id === 'approved'
              ? apiCards.filter(
                (card) => (card.admin_approved ?? '').toLowerCase() === 'approved',
              )
              : col.id === 'revision'
                ? apiCards.filter(
                  (card) => (card.admin_approved ?? '').toLowerCase() === 'revision',
                )
                : col.id === 'review'
                  ? apiCards.filter((card) => {
                    const status = (card.admin_approved ?? '').toLowerCase();
                    return status !== 'approved' && status !== 'revision';
                  })
                  : [];

          return (
            <div
              key={col.id}
              className="flex w-1/3 shrink-2 flex-col mt-2 gap-4 rounded-xl border border-white/10 bg-white/2 p-4"
            >
              <div className="flex items-center justify-between px-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-white/50">
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
                      router.push(
                        `/Admin/content/${encodeURIComponent(
                          card.id,
                        )}?campaign_id=${encodeURIComponent(campaignId)}`,
                      );
                    }}
                    className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-3 transition-all hover:border-(--color-primaryButton)/30 hover:shadow-lg"
                  >
                    <div className="relative aspect-4/3 overflow-hidden rounded-lg ">
                      <Image
                        src={card.thumb}
                        alt={card.title}
                        fill
                        className="object-cover"
                        sizes="320px"
                      />

                      <div className="absolute top-2 right-2 rounded-lg bg-white/90 p-1">
                        <Video className="size-3 text-slate-700" />
                      </div>
                    </div>
                    <h4 className="truncate text-sm font-bold text-white">
                      {card.title}
                    </h4>
                    <div className="flex items-center justify-between mt-2">

                      <div className="flex flex-row justify-between gap-2">
                        <Button
                          variant="outline"
                          onClick={() => { }}
                          className="whitespace-nowrap text-xs px-3 cursor-pointer">Message</Button>
                        <Button
                          variant="default"
                          onClick={() => {
                            router.push(`/Admin/influencers/${card.id}`);
                          }}
                          className="bg-primaryButton hover:bg-primaryHover text-white whitespace-nowrap text-xs px-3 cursor-pointer">View Content</Button>
                      </div>
                    </div>
                  </div>
                ))}
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
