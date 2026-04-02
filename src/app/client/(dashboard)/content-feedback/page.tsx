'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import PageHeader from '@/src/app/component/PageHeader';

import {
  MessageSquare,
  MoreHorizontal,
  Play,
  Search,
  Video,
  Check,
  RefreshCw,
  Send,
  ChevronLeft,
  Maximize2,
} from 'lucide-react';
import Image from 'next/image';
import useAuthStore from '@/src/store/AuthStore/authStore';
import NegotiationAgreedByCampaignHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-agreed-by-campaign-hook';
import useAdminCompanyMessagesHook from '@/src/routes/Admin/Hooks/feedback/whatsapp-admin-company-hook';
import useSendCompanyAdminMessage from '@/src/routes/Admin/Hooks/feedback/whatsapp-company-admin-send-message-hook';
import useAdminNegotiationApprovalStatus from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-approval-status-hook';
import useSaveContentFeedbackHook from '@/src/routes/Admin/Hooks/feedback/content-feedback-write-hook';
import useBrandContentFeedbackReadHook from '@/src/routes/Admin/Hooks/feedback/content-feedback-brand-read-hook';
import useWhatsAppAdminCompanyApproveVideo from '@/src/routes/Admin/Hooks/feedback/whatsapp-admin-company-approve-video-hook';
import useFeedbackIdMap from '@/src/routes/Admin/Hooks/feedback/use-feedback-id-map';
import ChatMessagesList from '@/src/app/component/content-feedback/chat-messages-list';
import {
  CardType,
  ChatMessage,
  NegotiationResponse,
} from '@/src/types/Compnay/feeedback-content-type';

const COLUMNS = [
  { id: 'drafts', label: 'Drafts', count: 5, color: 'slate' },
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
  const campaignIdFromQuery = searchParams.get('campaign_id') ?? '';

  const [search, setSearch] = useState('');
  interface SelectedCardType {
    id: string;
    campaign_id?: string;
    title: string;
    campaign: string;
    thread_id?: string;
    brand_thread_id?: string;
    Brand_approved?: string | null;
  }
  const [selectedCard, setSelectedCard] = useState<SelectedCardType | null>(null);
  const { company_user_id } = useAuthStore();
  const [feedback, setFeedback] = useState('');
  const [selectedContentFeedback, setSelectedContentFeedback] = useState('');
  const { data } = NegotiationAgreedByCampaignHook(campaignIdFromQuery) as {
    data?: NegotiationResponse;
  };
  const { mutate: approveNegotiation, isPending: isApproving } =
    useAdminNegotiationApprovalStatus();
  const threadId = selectedCard?.thread_id || '';
  const brandThreadId = selectedCard?.brand_thread_id || '';
  const effectiveBrandThreadId = brandThreadId || threadId;
  const negotiationId = selectedCard?.id || '';
  const {
    data: chatData,
    isLoading: chatLoading,
    refetch: refetchChat,
  } = useAdminCompanyMessagesHook(
    effectiveBrandThreadId,
    negotiationId,
    1,
    20,
  );

  const { sendMessage } = useSendCompanyAdminMessage(company_user_id, negotiationId);
  const approveVideoMutation = useWhatsAppAdminCompanyApproveVideo();

  const negotiationItems =
    data?.negotiations ?? data?.negotiation_controls ?? [];

  const apiCards: CardType[] = negotiationItems
    .filter(
      (item) =>
        (!item.negotiation_status || item.negotiation_status === 'agreed') &&
        item.admin_approved === 'Approved',
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
    }));
  const isVideoUrl = (value: string) => /\.(mp4|webm|ogg)(\?.*)?$/i.test(value);
  const isImageUrl = (value: string) =>
    /\.(jpg|jpeg|png|gif|webp|bmp)(\?.*)?$/i.test(value);
  const [selectedPreviewMediaUrl, setSelectedPreviewMediaUrl] = useState<string | null>(
    null,
  );
  const [selectedPreviewMediaType, setSelectedPreviewMediaType] = useState<
    'video' | 'image' | null
  >(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVideoDuration, setSelectedVideoDuration] = useState<number | null>(null);
  const [selectedVideoResolution, setSelectedVideoResolution] = useState<string>('—');

  const [isSending, setIsSending] = useState(false);

  const isBrandAlreadyApproved =
    (selectedCard?.Brand_approved ?? '').toLowerCase() === 'approved';
  const { getFeedbackId, setFeedbackId } = useFeedbackIdMap(
    'brand-content-feedback-id-map',
  );
  const activeFeedbackId = getFeedbackId(negotiationId, selectedPreviewMediaUrl);

  const saveContentFeedbackMutation = useSaveContentFeedbackHook();
  const { data: brandFeedbackData, refetch: refetchBrandFeedback } =
    useBrandContentFeedbackReadHook(activeFeedbackId, !!activeFeedbackId);

  const isBrandContentApprovedInBrandChat = useMemo(() => {
    const url = selectedPreviewMediaUrl;
    if (!url || !chatData?.messages) return false;
    return chatData.messages.some((msg: ChatMessage) => {
      const contentUrl =
        typeof msg.message === 'string' &&
          (isVideoUrl(msg.message) || isImageUrl(msg.message))
          ? msg.message
          : (msg.video_url ?? '');
      const brandOk = (msg.video_approve_brand ?? '').toLowerCase() === 'approved';
      return contentUrl === url && brandOk;
    });
  }, [chatData, selectedPreviewMediaUrl]);

  useEffect(() => {
    setSelectedPreviewMediaUrl(null);
    setSelectedPreviewMediaType(null);
    setIsPlaying(false);
    setSelectedVideoDuration(null);
    setSelectedVideoResolution('—');
  }, [selectedCard?.id]);

  useEffect(() => {
    const mediaMessages =
      chatData?.messages?.filter(
        (msg: ChatMessage) =>
          typeof msg.message === 'string' &&
          (isVideoUrl(msg.message) || isImageUrl(msg.message)),
      ) ?? [];

    if (mediaMessages.length === 0) {
      setSelectedPreviewMediaUrl(null);
      setSelectedPreviewMediaType(null);
      setIsPlaying(false);
      setSelectedVideoDuration(null);
      setSelectedVideoResolution('—');
      return;
    }

    if (
      selectedPreviewMediaUrl &&
      mediaMessages.some((msg: ChatMessage) => msg.message === selectedPreviewMediaUrl)
    ) {
      return;
    }

    const latestMedia = mediaMessages[mediaMessages.length - 1];
    setSelectedPreviewMediaUrl(latestMedia.message);
    setSelectedPreviewMediaType(isVideoUrl(latestMedia.message) ? 'video' : 'image');
    setIsPlaying(false);
    setSelectedVideoDuration(null);
    setSelectedVideoResolution('—');
  }, [chatData, selectedPreviewMediaUrl]);

  const formatVideoDuration = (seconds: number | null) => {
    if (!seconds || Number.isNaN(seconds)) return '--:--';
    const total = Math.max(0, Math.floor(seconds));
    const mins = Math.floor(total / 60);
    const secs = total % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
                className="h-10 w-64 rounded-lg border border-white/10 bg-white/5 pl-9 pr-4 text-sm text-white placeholder:text-white/40 focus:border-(--color-primaryButton) focus:outline-none focus:ring-1 focus:ring-[var(--color-primaryButton)]"
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
          const combinedCards: CardType[] = col.id === 'approved' ? [...apiCards] : [];

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
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${col.color === 'primary'
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
                    onClick={() =>
                      setSelectedCard({
                        id: card.id,
                        campaign_id: card.campaign_id,
                        title: card.title,
                        campaign: card.campaign,
                        thread_id: card.thread_id,
                        brand_thread_id: card.brand_thread_id,
                        Brand_approved: card.Brand_approved,
                      })
                    }
                    className={`cursor-pointer rounded-xl border bg-white/5 p-3 transition-all hover:shadow-lg ${col.id === 'review'
                        ? 'border-2 border-(--color-primaryButton)'
                        : col.id === 'revision'
                          ? 'border-l-4 border-l-amber-400 border-white/10'
                          : 'border-white/10 hover:border-(--color-primaryButton)/30'
                      }`}
                  >
                    <div className="relative aspect-4/3 overflow-hidden rounded-lg ">
                      <Image
                        src={card.thumb}
                        alt={card.title}
                        fill
                        className="object-cover"
                        sizes="320px"
                      />

                      {col.id === 'review' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-(--color-primaryButton)/10">
                          <Play
                            className="size-10 text-(--color-primaryButton)"
                            fill="currentColor"
                          />
                        </div>
                      )}

                      {col.id === 'revision' && (
                        <div className="absolute inset-0 flex items-center justify-center bg-amber-500/20">
                          <RefreshCw className="size-8 text-amber-500" />
                        </div>
                      )}

                      {col.id === 'approved' && (
                        <div className="absolute top-2 right-2 rounded-full bg-emerald-500 p-1">
                          <Check className="size-3 text-white" />
                        </div>
                      )}

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

      {/* Preview & Feedback modal */}
      {selectedCard && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="flex h-full max-h-[90vh] w-full max-w-6xl overflow-hidden rounded-2xl border border-white/10 bg-[var(--color-background)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-1 flex-col border-r border-white/10">
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setSelectedCard(null)}
                    className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors"
                  >
                    <ChevronLeft className="size-5" />
                  </button>
                  <div>
                    <h3 className="text-sm font-bold text-white">{selectedCard.title}</h3>
                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                      {selectedCard.campaign} Campaign
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white focus:border-[var(--color-primaryButton)] focus:outline-none">
                    <option>Version 1 (Active)</option>
                    <option disabled>Version 2 (Draft)</option>
                  </select>
                  <button className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                    <Maximize2 className="size-5" />
                  </button>
                </div>
              </div>
              <div className="flex flex-1 flex-col lg:flex-row items-start lg:items-stretch justify-start lg:justify-center overflow-y-auto lg:overflow-hidden bg-slate-900 p-4 gap-4">
                <div className="relative shrink-0 aspect-9/16 h-[92%] max-h-[600px] overflow-hidden rounded-lg border border-white/10 bg-slate-800">
                  {selectedPreviewMediaUrl ? (
                    selectedPreviewMediaType === 'image' ? (
                      <Image
                        src={selectedPreviewMediaUrl}
                        alt="Selected chat image"
                        fill
                        className="object-contain"
                        sizes="(max-width: 1280px) 100vw, 600px"
                      />
                    ) : (
                      <>
                        <video
                          src={selectedPreviewMediaUrl}
                          className="h-full w-full object-cover"
                          controls={isPlaying}
                          onLoadedMetadata={(event) => {
                            const media = event.currentTarget;
                            setSelectedVideoDuration(media.duration || null);
                            if (media.videoWidth && media.videoHeight) {
                              setSelectedVideoResolution(
                                `${media.videoWidth} × ${media.videoHeight}`,
                              );
                            } else {
                              setSelectedVideoResolution('—');
                            }
                          }}
                        />
                        {!isPlaying && (
                          <div
                            onClick={() => setIsPlaying(true)}
                            className="absolute inset-0 flex items-center justify-center bg-black/20 hover:bg-black/30 transition-colors cursor-pointer"
                          >
                            <Play
                              className="size-16 text-white/80 hover:text-white hover:scale-110 transition-all"
                              fill="currentColor"
                            />
                          </div>
                        )}
                      </>
                    )
                  ) : (
                    <div className="flex h-full items-center justify-center text-white/50 text-sm">
                      No media available
                    </div>
                  )}
                </div>
                <div className="flex w-full lg:w-72 shrink-0 flex-col gap-3 overflow-y-auto rounded-lg border border-white/10 bg-white/5 p-3">
                  <div className="relative">
                    <textarea
                      value={selectedContentFeedback}
                      onChange={(e) => setSelectedContentFeedback(e.target.value)}
                      placeholder="Type feedback on selected content..."
                      className="h-24 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-white placeholder:text-white/40 focus:border-[var(--color-primaryButton)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primaryButton)]"
                    />
                    <button
                      type="button"
                      onClick={async () => {
                        if (
                          !selectedContentFeedback.trim() ||
                          !selectedPreviewMediaUrl ||
                          !negotiationId ||
                          !selectedCard?.campaign_id
                        ) {
                          return;
                        }

                        try {
                          const response = await saveContentFeedbackMutation.mutateAsync({
                            negotiation_id: negotiationId,
                            campaign_id: selectedCard.campaign_id,
                            content_url: selectedPreviewMediaUrl,
                            msg: selectedContentFeedback.trim(),
                            review_side: 'brand_review',
                          });
                          const newFeedbackId = response?.feedback?.feedback_id as
                            | string
                            | undefined;
                          if (newFeedbackId) {
                            setFeedbackId(
                              negotiationId,
                              selectedPreviewMediaUrl,
                              newFeedbackId,
                            );
                          }
                          setSelectedContentFeedback('');
                          if (newFeedbackId || activeFeedbackId) {
                            await refetchBrandFeedback();
                          }
                        } catch (error) {
                          console.error('Failed to save content feedback:', error);
                        }
                      }}
                      disabled={saveContentFeedbackMutation.isPending}
                      className="mt-2 w-full rounded-xl bg-[var(--color-primaryButton)] px-4 py-2 text-sm font-bold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {saveContentFeedbackMutation.isPending
                        ? 'Saving...'
                        : 'Save Brand Feedback'}
                    </button>
                  </div>
                  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
                    <p className="text-xs font-bold uppercase tracking-wider text-white/50">
                      Brand feedback
                    </p>
                    <div className="mt-2 max-h-40 space-y-2 overflow-y-auto">
                      {brandFeedbackData?.feedback?.brand_review?.message?.length ? (
                        brandFeedbackData.feedback.brand_review.message.map(
                          (message: string, index: number) => (
                            <p
                              key={`brand-feedback-${index}`}
                              className="text-sm text-white/70"
                            >
                              {message}
                            </p>
                          ),
                        )
                      ) : (
                        <p className="text-sm text-white/70">No brand feedback yet.</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between border-t border-white/10 bg-black/20 p-4">
                <div className="flex gap-8 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                  <div>
                    <p className="text-[10px] font-bold uppercase text-white/40">
                      Duration
                    </p>
                    <p className="text-sm font-bold text-white">
                      {selectedPreviewMediaType === 'video'
                        ? formatVideoDuration(selectedVideoDuration)
                        : '--:--'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-white/40">
                      Resolution
                    </p>
                    <p className="text-sm font-bold text-white">
                      {selectedPreviewMediaType === 'video'
                        ? selectedVideoResolution
                        : 'Image'}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase text-white/40">
                      Usage Rights
                    </p>
                    <span className="inline-block rounded border border-(--color-primaryButton)/20 bg-(--color-primaryButton)/10 px-2 py-0.5 text-[10px] font-bold text-(--color-primaryButton)">
                      Standard Commercial
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2 text-white/50">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/10 px-4 py-2 text-sm font-bold text-white hover:border-white/20 hover:bg-white/5 transition-colors"
                    >
                      <RefreshCw className="size-4" />
                      Revision
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        if (
                          effectiveBrandThreadId &&
                          negotiationId &&
                          selectedPreviewMediaUrl
                        ) {
                          approveVideoMutation.mutate({
                            brand_thread_id: effectiveBrandThreadId,
                            negotiation_id: negotiationId,
                            video_url: selectedPreviewMediaUrl,
                            video_approve_brand: 'approved',
                          });
                        }
                      }}
                      disabled={
                        approveVideoMutation.isPending ||
                        !selectedPreviewMediaUrl ||
                        !effectiveBrandThreadId ||
                        isBrandContentApprovedInBrandChat
                      }
                      className="flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primaryButton)] px-4 py-2 text-sm font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Check className="size-4" />
                      {selectedPreviewMediaType === 'image'
                        ? 'Image Approve'
                        : 'Video Approve'}
                    </button>
                  </div>
                  <span className="text-[11px] font-bold leading-tight">
                    unboxing_draft_v1.mp4 (42MB)
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-100 shrink-0 flex-col bg-white/2">
              <div className="flex items-center justify-between border-b border-white/10 p-4">
                <h4 className="flex items-center gap-2 text-sm font-bold text-white">
                  <MessageSquare className="size-4 text-(--color-primaryButton)" />
                  Feedback
                </h4>
                <span className="rounded-full bg-(--color-primaryButton)/10 px-2.5 py-0.5 text-[10px] font-bold text-(--color-primaryButton)">
                  3 UNREAD
                </span>
              </div>
              <div className="flex-1 space-y-4 overflow-y-auto p-5">
                <ChatMessagesList
                  messages={chatData?.messages}
                  isLoading={chatLoading}
                  isRightMessage={(msg) => msg.sender !== 'ADMIN'}
                  isVideoUrl={isVideoUrl}
                  isImageUrl={isImageUrl}
                  onSelectMedia={(url, type) => {
                    setSelectedPreviewMediaUrl(url);
                    setSelectedPreviewMediaType(type);
                    setIsPlaying(false);
                  }}
                />
              </div>
              <div className="space-y-4 border-t border-white/10 p-5">
                {' '}
                <div className="relative">
                  <textarea
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Type your feedback..."
                    className="h-24 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 pr-12 text-sm text-white placeholder:text-white/40 focus:border-[var(--color-primaryButton)] focus:outline-none focus:ring-1 focus:ring-[var(--color-primaryButton)]"
                  />
                  <button
                    onClick={async () => {
                      if (!feedback.trim()) return;
                      setIsSending(true);
                      try {
                        await sendMessage(feedback);
                        setFeedback('');
                        await refetchChat();
                      } catch (error) {
                        console.error('Failed to send message:', error);
                      } finally {
                        setIsSending(false);
                      }
                    }}
                    disabled={isSending}
                    className={`absolute bottom-4 right-4 flex size-8 items-center justify-center rounded-lg transition-colors
    ${isSending ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-[var(--color-primaryButton)]/10 text-[var(--color-primaryButton)] hover:bg-[var(--color-primaryButton)] hover:text-white'}`}
                  >
                    <Send className="size-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/10 px-4 py-3 text-sm font-bold text-white hover:border-white/20 hover:bg-white/5 transition-colors">
                    <RefreshCw className="size-4" />
                    Revision
                  </button>
                  <button
                    onClick={() => {
                      if (threadId && !isBrandAlreadyApproved) {
                        approveNegotiation({
                          thread_id: threadId,
                          payload: { Brand_approved: 'Approved' },
                        });
                      }
                    }}
                    disabled={isApproving || isBrandAlreadyApproved}
                    className="flex items-center justify-center gap-2 rounded-xl bg-[var(--color-primaryButton)] px-4 py-3 text-sm font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <Check className="size-4" />
                    {isBrandAlreadyApproved
                      ? 'Approved'
                      : isApproving
                        ? 'Approving...'
                        : 'Approve'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
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
