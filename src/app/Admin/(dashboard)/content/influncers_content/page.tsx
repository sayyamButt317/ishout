'use client';
import { Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { MoreHorizontal } from 'lucide-react';
import Image from 'next/image';

import NegotiationAgreedByCampaignHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-agreed-by-campaign-hook';
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

  const { data } = NegotiationAgreedByCampaignHook(campaignIdFromQuery);

  const negotiations: CampaingnContentProps[] = data?.negotiations ?? [];
  const firstItem = negotiations?.[0];

  return (
    <div className="font-sans">
      <ContentHeader
        title={firstItem?.campaign_brief?.title}
        logo={firstItem?.campaign_logo_url}
        description="Showing influencers content waiting for content feedback review"
        category="Influencers Content"
      />

      <div className="flex gap-6 overflow-x-auto pb-4">
        {COLUMNS.map((col) => {
          const combinedCards =
            col.id === 'approved'
              ? negotiations.filter(
                (card) =>
                  (card.admin_approved ?? '').toLowerCase() === 'approved'
              )
              : col.id === 'revision'
                ? negotiations.filter(
                  (card) =>
                    (card.admin_approved ?? '').toLowerCase() === 'revision'
                )
                : col.id === 'review'
                  ? negotiations.filter((card) => {
                    const status = (card.admin_approved ?? '').toLowerCase();
                    return status !== 'approved' && status !== 'revision';
                  })
                  : [];

          return (
            <div
              key={col.id}
              className="flex w-1/3 shrink-0 flex-col mt-2 gap-4 rounded-xl border border-white/10 bg-white/2 p-4"
            >
              {/* Column Header */}
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

              {/* Cards */}
              <div className="flex flex-col gap-3 overflow-y-auto">
                {combinedCards?.map((card) => (
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
                    className="cursor-pointer rounded-xl border border-white/10 bg-white/5 p-3 transition-all hover:border-(--color-primaryButton)/30 hover:shadow-lg"
                  >
                    {/* Image */}
                    <div className="relative aspect-4/3 overflow-hidden rounded-lg">
                      <Image
                        src={card.campaign_logo_url}
                        alt={card.campaign_brief?.title}
                        width={200}
                        height={200}
                      />
                    </div>
                    {/* Influencer Name */}
                    <p className="text-xs text-white/60">Influencer Name:{card.name}</p>
                    {/* Title */}
                    <h4 className="truncate text-sm font-bold text-white mt-2">
                      Phone {card.brand_thread_id}
                    </h4>



                    {/* Buttons */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex flex-row gap-2">
                        <Button
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="whitespace-nowrap text-xs px-3 cursor-pointer"
                        >
                          Message
                        </Button>

                        <Button
                          variant="default"
                          onClick={(e) => {
                            e.stopPropagation();
                            router.push(
                              `/Admin/influencers/${card.influencer_id}`
                            );
                          }}
                          className="bg-primaryButton hover:bg-primaryHover text-white whitespace-nowrap text-xs px-3 cursor-pointer"
                        >
                          View Content
                        </Button>
                      </div>
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