'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import NegotiationAgreedByCampaignHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-agreed-by-campaign-hook';
import ContentFeedbackModal, { SelectedContentFeedbackCard } from '../content';
import type {
  NegotiationItem,
  NegotiationResponse,
} from '@/src/types/Compnay/feeedback-content-type';

function ContentFeedbackContentPageInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const campaignIdFromQuery = searchParams.get('campaign_id') ?? '';
  const negotiationIdFromQuery = searchParams.get('negotiation_id') ?? '';
  const [selectedCardFromStorage, setSelectedCardFromStorage] =
    useState<SelectedContentFeedbackCard | null>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const raw = sessionStorage.getItem('content-feedback:selected-card');
    if (!raw) return;
    try {
      const parsed = JSON.parse(raw) as SelectedContentFeedbackCard;
      if (parsed?.item?._id && parsed.item._id === negotiationIdFromQuery) {
        setSelectedCardFromStorage(parsed);
      }
    } catch (error) {
      console.error('Failed to parse selected content card from storage', error);
    }
  }, [negotiationIdFromQuery]);

  const { data } = NegotiationAgreedByCampaignHook(campaignIdFromQuery) as {
    data?: NegotiationResponse;
  };
  const negotiationItems = data?.negotiations ?? data?.negotiation_controls ?? [];

  const selectedCardFromApi = useMemo<SelectedContentFeedbackCard | null>(() => {
    const item = negotiationItems.find((entry: NegotiationItem) => {
      return entry._id === negotiationIdFromQuery;
    });
    if (!item) return null;
    return {
      item,
      title: `${item.name ?? 'Unknown'} - ${item.thread_id ?? ''}`,
      campaign: item.campaign_brief?.title ?? 'Campaign',
    };
  }, [negotiationItems, negotiationIdFromQuery]);

  const selectedCard = selectedCardFromStorage ?? selectedCardFromApi;

  if (!selectedCard) {
    return (
      <div className="p-6 text-white/70">
        Selected content not found. Go back and open a card again.
      </div>
    );
  }

  return (
    <ContentFeedbackModal
      selectedCard={selectedCard}
      asPage
      onClose={() => {
        const params = new URLSearchParams();
        if (campaignIdFromQuery) {
          params.set('campaign_id', campaignIdFromQuery);
        }
        const suffix = params.toString();
        router.push(suffix ? `/client/content-feedback?${suffix}` : '/client/content-feedback');
      }}
    />
  );
}

export default function ContentFeedbackContentPage() {
  return (
    <Suspense fallback={<div className="p-4 text-white/60">Loading content...</div>}>
      <ContentFeedbackContentPageInner />
    </Suspense>
  );
}
