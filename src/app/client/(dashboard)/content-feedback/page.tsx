'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import PageHeader from '@/src/app/component/PageHeader';

import { MessageSquare, MoreHorizontal, Search, Video } from 'lucide-react';
import Image from 'next/image';
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

function ContentFeedbackPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const campaignIdFromQuery = searchParams.get('campaign_id') ?? '';

  const [search, setSearch] = useState('');
  const { data } = NegotiationAgreedByCampaignHook(campaignIdFromQuery) as {
    data?: NegotiationResponse;
  };

  const negotiationItems = data?.negotiations ?? data?.negotiation_controls ?? [];

  type CardWithSource = CardType & { source: NegotiationItem };
  const apiCards: CardWithSource[] = negotiationItems
    .filter(
      (item) =>
        item.negotiation_status === 'agreed' && item.admin_approved === 'Approved',
    )
    .map((item) => ({
      id: item._id,
      campaign_id: item.campaign_id,
      title: `${item.name ?? 'Unknown'} - ${item.thread_id ?? ''}`,
      campaign: item.campaign_brief?.title ?? 'Campaign',
      rights: 'Full Rights',
      status: 'Ready to Post',

      thumb:
        item.campaign_logo_url ??
        item.campaign_brief?.campaign_logo_url ??
        '/assets/logo.svg',

      thread_id: item.thread_id,
      brand_thread_id: item.brand_thread_id,
      Brand_approved: item.Brand_approved,
      source: item,
    }));

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

      <div className="flex gap-6 overflow-x-auto pb-4">
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
              className="flex w-80 shrink-0 flex-col gap-4 rounded-xl border border-white/10 bg-white/2 p-4"
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
                    {col.count}
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
                    <p className="mb-3 text-xs text-white/50">{card.campaign}</p>

                    <div className="flex items-center justify-between">
                      <span className="rounded-md border border-blue-500/30 bg-blue-500/10 px-2 py-1 text-[10px] font-bold uppercase text-blue-400">
                        {'rights' in card ? card.rights : 'Full Rights'}
                      </span>

                      {'comments' in card && card.comments && (
                        <div className="flex items-center gap-1 text-white/50">
                          <MessageSquare className="size-3" />
                          <span className="text-xs font-bold">{card.comments}</span>
                        </div>
                      )}

                      {'status' in card && card.status && (
                        <span className="text-[10px] font-bold text-emerald-400">
                          {card.status}
                        </span>
                      )}
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

export default function ContentFeedbackPage() {
  return (
    <Suspense fallback={<div className="p-4 text-white/60">Loading content...</div>}>
      <ContentFeedbackPageContent />
    </Suspense>
  );
}
