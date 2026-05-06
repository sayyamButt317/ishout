'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, MessageSquare } from 'lucide-react';

import PageHeader from '@/src/app/component/PageHeader';
import NegotiationAgreedByCampaignHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-agreed-by-campaign-hook';
import useAdminInfluencerMessagesHook from '@/src/routes/Admin/Hooks/feedback/whatsapp-admin-influencer-hook';
import useAdminCompanyMessagesHook from '@/src/routes/Admin/Hooks/feedback/whatsapp-admin-company-hook';
import useSendAdminMessage from '@/src/routes/Admin/Hooks/feedback/whatsapp-admin-influncer-send-message-hook';
import useSendAdminCompanyMessage from '@/src/routes/Admin/Hooks/feedback/whatsapp-admin-company-send-message-hook';
import useAdminNegotiationApprovalStatus from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-approval-status-hook';
import useWhatsAppAdminCompanyApproveVideo from '@/src/routes/Admin/Hooks/feedback/whatsapp-admin-company-approve-video-hook';
import ChatPanel from '@/src/app/component/content-feedback/chat-panel';

import {
  CardType,
  ChatMessage,
  NegotiationResponse,
} from '@/src/types/Admin-Type/Content-type';
import VideoFeedbackWorkspace from '@/src/app/component/content-feedback/feedback-dialogue';
import ContentFeedbackPanel from '@/src/app/component/content-feedback/feedback';
import { AnalyzeURL, formatVideoDuration } from '@/src/utils/video-duration';
import {
  extractTimelineMarkersFromMessages,
  serializeTimedFeedbackMessage,
} from '@/src/utils/content-feedback-chat';
import { TimelineMarkerData } from '@/src/types/Admin-Type/timeline-type';
import { toast } from 'sonner';
import { mapAdminInfluencerMessageError } from '@/src/types/Admin-Type/admin-influencer-message-type';
import { RevisionBox } from '@/src/app/component/content-feedback/revisionbox';
import useRevisionMessageStore from '@/src/store/Feedback/revisionmessage-store';
import type { AdminInfluencerMessageItem } from '@/src/types/Admin-Type/Feedback/admin-influencer-messages-type';
import InfluencerDetailDialog from '@/src/app/component/content-feedback/influencerdetail';
import useReportStore from '@/src/store/Feedback/report-store';

export default function ContentFeedbackDetailPage() {
  const router = useRouter();
  const params = useParams<{ negotiationId: string }>();
  const negotiationIdParam = params?.negotiationId ?? '';

  const [chatMode, setChatMode] = useState<'influencer' | 'brand'>('influencer');
  const [activeTab, setActiveTab] = useState<'chat' | 'revisions' | 'brandfeedback' | 'media' | 'guidelines'>('chat');
  const [selectedContentFeedback, setSelectedContentFeedback] = useState('');
  const [selectedPreviewMediaUrl, setSelectedPreviewMediaUrl] = useState<string | null>(null);
  const [selectedPreviewMediaType, setSelectedPreviewMediaType] = useState<'video' | 'image' | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVideoDuration, setSelectedVideoDuration] = useState<number | null>(null);
  const [selectedVideoResolution, setSelectedVideoResolution] = useState<string>('—');


  const videoRef = useRef<HTMLVideoElement | null>(null);

  const searchParams = useSearchParams();
  const campaignIdFromQuery = searchParams.get('campaign_id') ?? '';

  const { data } = NegotiationAgreedByCampaignHook(campaignIdFromQuery) as {
    data?: NegotiationResponse;
  };

  const { setcampaignIdForReport } = useReportStore();

  useEffect(() => {
    if (data?.campaign_id) {
      setcampaignIdForReport(data.campaign_id);
    }
  }, [data?.campaign_id, setcampaignIdForReport]);

  const { setAll } = useRevisionMessageStore();
  useEffect(() => {
    if (!data?.negotiations?.length) return;
    const n = data.negotiations[0];
    setAll({
      negotiation_id: n._id,
      thread_id: n.thread_id,
      message_id: '',
      contentType: 'VIDEO',
      contentUrl: '',
      current_version: 0,
      status: 'UNDER_REVIEW',
    });
  }, [data, setAll]);

  const apiCards: CardType[] = useMemo(() => {
    const negotiationItems = data?.negotiations ?? data?.negotiation_controls ?? [];
    return negotiationItems
      .filter((item) => !item.negotiation_status || item.negotiation_status === 'agreed')
      .map((item) => ({
        id: item._id,
        campaign_id: item.campaign_id,
        title: `${item.name ?? 'Unknown'} - ${item.thread_id ?? ''}`,
        campaign: item.campaign_brief?.title ?? 'Campaign',
        rights: 'Full Rights',
        status: 'Ready to Post',
        thumb: item.campaign_logo_url ?? '/assets/logo.svg',
        thread_id: item.thread_id,
        brand_thread_id: item.brand_thread_id,
        admin_approved: item.admin_approved,
      }));
  }, [data]);

  const selectedCard = useMemo(() => {
    if (!negotiationIdParam) return null;
    return apiCards.find((c) => c.id === negotiationIdParam) ?? null;
  }, [apiCards, negotiationIdParam]);

  const backToList = () => {
    const campaignId = campaignIdFromQuery || selectedCard?.campaign_id || '';
    if (campaignId) {
      router.push(`/Admin/content?campaign_id=${encodeURIComponent(campaignId)}`);
      return;
    }
    router.push('/Admin/content/influncers_content');
  };

  const threadId = selectedCard?.thread_id || '';
  const brandThreadId = selectedCard?.brand_thread_id || '';
  const negotiationId = selectedCard?.id || negotiationIdParam || '';

  const influencerChatQuery = useAdminInfluencerMessagesHook(threadId, 1, 20, chatMode === 'influencer');
  const companyChatQuery = useAdminCompanyMessagesHook(brandThreadId, negotiationId, 1, 20, chatMode === 'brand');

  const chatData = chatMode === 'influencer' ? influencerChatQuery.data : companyChatQuery.data;
  const chatLoading = chatMode === 'influencer' ? influencerChatQuery.isLoading : companyChatQuery.isLoading;

  const { sendMessage: sendInfluencerMessage } = useSendAdminMessage(threadId, negotiationId);
  const { sendMessage: sendCompanyMessage } = useSendAdminCompanyMessage(brandThreadId, negotiationId);

  const approveVideoMutation = useWhatsAppAdminCompanyApproveVideo();
  const { mutate: approveNegotiation, isPending: isApproving } = useAdminNegotiationApprovalStatus();
  const [open, setOpen] = useState(false);
  const { setContentType } = useRevisionMessageStore();

  const isVideoUrl = useCallback((value: string) => AnalyzeURL(value).isVideoUrl, []);
  const isImageUrl = useCallback((value: string) => AnalyzeURL(value).isImageUrl, []);

  const timelineMarkers = useMemo((): TimelineMarkerData[] => {
    const messages = chatData?.messages ?? [];
    const fromSerialized = extractTimelineMarkersFromMessages(messages, selectedPreviewMediaUrl);
    const fromObjects: TimelineMarkerData[] = [];
    for (const msg of messages) {
      if (
        typeof msg.message === 'object' &&
        msg.message !== null &&
        'timestamp' in msg.message &&
        typeof (msg.message as { timestamp: unknown }).timestamp === 'number'
      ) {
        const m = msg.message as { text?: string; timestamp: number; snapshot?: string };
        fromObjects.push({ id: msg._id, timestamp: m.timestamp, text: m.text ?? '', snapshot: m.snapshot });
      }
    }
    const map = new Map<string, TimelineMarkerData>();
    for (const m of fromObjects) map.set(m.id, m);
    for (const m of fromSerialized) { if (!map.has(m.id)) map.set(m.id, m); }
    return [...map.values()].sort((a, b) => a.timestamp - b.timestamp);
  }, [chatData?.messages, selectedPreviewMediaUrl]);

  useEffect(() => {
    setChatMode('influencer');
    setSelectedContentFeedback('');
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
          typeof msg.message === 'string' && (isVideoUrl(msg.message) || isImageUrl(msg.message)),
      ) ?? [];

    if (mediaMessages.length === 0) {
      setSelectedPreviewMediaUrl(null);
      setSelectedPreviewMediaType(null);
      setIsPlaying(false);
      setSelectedVideoDuration(null);
      setSelectedVideoResolution('—');
      return;
    }

    if (selectedPreviewMediaUrl && mediaMessages.some((msg: ChatMessage) => msg.message === selectedPreviewMediaUrl)) return;

    const latestMedia = mediaMessages[mediaMessages.length - 1];
    const analyzed = AnalyzeURL(latestMedia.message ?? '');
    setSelectedPreviewMediaUrl(latestMedia.message);
    setSelectedPreviewMediaType(analyzed.type === 'video' || analyzed.type === 'image' ? analyzed.type : null);
    setSelectedVideoResolution(analyzed.resolution);
    setIsPlaying(false);
    setSelectedVideoDuration(null);
  }, [chatData, selectedPreviewMediaUrl, isImageUrl, isVideoUrl]);

  useEffect(() => {
    if (!selectedCard?.id) return;
    const messages = chatData?.messages ?? [];
    const matchedMessage = messages.find(
      (msg: ChatMessage) =>
        typeof msg.message === 'string' &&
        msg.message === selectedPreviewMediaUrl &&
        (isVideoUrl(msg.message) || isImageUrl(msg.message)),
    );
    const contentType = selectedPreviewMediaType === 'image' ? 'IMAGE' : 'VIDEO';
    setAll({
      negotiation_id: selectedCard.id,
      thread_id: chatMode === 'influencer' ? threadId : brandThreadId,
      message_id: matchedMessage?._id ?? '',
      contentType,
      contentUrl: selectedPreviewMediaUrl ?? '',
      current_version: 0,
      status: 'UNDER_REVIEW',
    });
  }, [selectedCard?.id, chatData?.messages, selectedPreviewMediaUrl, selectedPreviewMediaType, chatMode, threadId, brandThreadId, isVideoUrl, isImageUrl, setAll]);

  const sendEnabled = chatMode === 'influencer' ? !!threadId : !!brandThreadId && !!negotiationId;

  const selectedInfluencerMessageContentId = useMemo(() => {
    if (!selectedPreviewMediaUrl) return undefined;
    const influencerMessages = influencerChatQuery.data?.messages ?? [];
    const matchedMessage = influencerMessages.find(
      (msg: AdminInfluencerMessageItem) => msg.message === selectedPreviewMediaUrl,
    );
    return matchedMessage?.content_id ?? undefined;
  }, [influencerChatQuery.data?.messages, selectedPreviewMediaUrl]);

  const activeFeedbackId2 = selectedInfluencerMessageContentId ?? '';

  const handleSendMessage = async (textOrFile: string | File) => {
    if (textOrFile instanceof File) {
      if (chatMode !== 'influencer') { toast.error('Attach files in Influencer Chat only.'); return; }
      if (!threadId) return;
      try { await sendInfluencerMessage({ file: textOrFile }); await influencerChatQuery.refetch(); }
      catch (error) { toast.error(mapAdminInfluencerMessageError(error)); }
      return;
    }
    if (chatMode === 'influencer') {
      if (!threadId) return;
      try { await sendInfluencerMessage({ message: textOrFile }); await influencerChatQuery.refetch(); }
      catch (error) { toast.error(mapAdminInfluencerMessageError(error)); }
      return;
    }
    if (!brandThreadId || !negotiationId) return;
    await sendCompanyMessage(textOrFile);
    await companyChatQuery.refetch();
  };

  const handleSeekPreviewToTime = useCallback((time: number) => {
    const v = videoRef.current;
    if (!v || !Number.isFinite(time)) return;
    v.currentTime = time;
    setIsPlaying(true);
  }, []);

  const handleTimedFeedbackSubmit = async (payload: {
    text: string;
    timestamp: number;
    snapshotDataUrl: string | null;
  }) => {
    if (!selectedPreviewMediaUrl) return;
    const body = serializeTimedFeedbackMessage({
      t: payload.timestamp,
      m: payload.text,
      s: payload.snapshotDataUrl ?? undefined,
      u: selectedPreviewMediaUrl,
    });
    if (chatMode === 'influencer') {
      if (!threadId) return;
      await sendInfluencerMessage({ message: body });
      await influencerChatQuery.refetch();
      return;
    }
    if (!brandThreadId || !negotiationId) return;
    await sendCompanyMessage(body);
    await companyChatQuery.refetch();
  };

  if (!selectedCard) {
    return (
      <div className="font-sans p-4">
        <PageHeader
          title="Content Review & Feedback Pipeline"
          description="Select a negotiation to review"
          icon={<MessageSquare className="size-5" />}
          actions={
            <button
              onClick={backToList}
              className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white hover:bg-white/10"
            >
              Back
            </button>
          }
        />
      </div>
    );
  }

  return (
    <div className="flex w-full flex-col font-sans overflow-y-auto lg:h-[calc(100vh-24px)] lg:flex-row lg:overflow-hidden">

      {/* ══════════ LEFT — Video column ══════════ */}
      <div className="flex w-full flex-col lg:flex-1 lg:overflow-hidden lg:border-r lg:border-white/10">

        {/* Header */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-white/10 px-3 py-2">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10"
            >
              <ChevronLeft className="size-5" />
            </button>
            <div className="min-w-0">
              <h3 className="truncate text-sm font-bold text-white">{selectedCard.title}</h3>
              <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                {selectedCard.campaign}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <select className="rounded-lg border border-white/10 bg-black px-3 py-2 text-xs font-bold text-white focus:outline-none">
              <option>Story</option>
              <option>Post</option>
              <option>Demographics</option>
            </select>
            <select className="rounded-lg border border-white/10 bg-black px-3 py-2 text-xs font-bold text-white focus:outline-none">
              <option>Version 1</option>
              <option>Version 2</option>
            </select>
          </div>
        </div>

        {/* Video workspace */}
        <div className="relative w-full lg:flex lg:min-h-0 lg:flex-1 lg:overflow-hidden lg:p-2">
          <div className="aspect-9/16 w-full lg:aspect-auto lg:flex lg:flex-1">
            <VideoFeedbackWorkspace
              videoRef={videoRef}
              selectedPreviewMediaUrl={selectedPreviewMediaUrl}
              selectedPreviewMediaType={selectedPreviewMediaType}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              setSelectedVideoDuration={setSelectedVideoDuration}
              setSelectedVideoResolution={setSelectedVideoResolution}
              duration={selectedVideoDuration}
              markers={timelineMarkers}
              sendEnabled={sendEnabled}
              contentUrl={selectedPreviewMediaUrl}
              onSubmitTimedFeedback={handleTimedFeedbackSubmit}
              onMarkerSeek={handleSeekPreviewToTime}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-t border-white/10 bg-black/20 px-3 py-2">
          <div className="flex gap-4 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
            <div>
              <p className="text-[10px] font-bold uppercase text-white/40">Duration</p>
              <p className="text-sm font-bold text-white">
                {AnalyzeURL(selectedPreviewMediaUrl ?? '')?.type === 'video'
                  ? formatVideoDuration(selectedVideoDuration)
                  : '--:--'}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-white/40">Resolution</p>
              <p className="text-sm font-bold text-white">
                {selectedPreviewMediaType === 'video' ? selectedVideoResolution : 'Image'}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <InfluencerDetailDialog open={open} onOpenChange={setOpen} />
            <button
              onClick={() => {
                if (threadId && brandThreadId && negotiationId && selectedPreviewMediaUrl && selectedCard.campaign_id) {
                  approveNegotiation({ thread_id: threadId, payload: { admin_approved: 'Approved' } });
                  approveVideoMutation.mutate({
                    brand_thread_id: brandThreadId,
                    campaign_id: selectedCard.campaign_id,
                    negotiation_id: negotiationId,
                    video_url: selectedPreviewMediaUrl,
                    content_id: selectedInfluencerMessageContentId,
                    video_approve_admin: 'approved',
                  });
                }
              }}
              disabled={isApproving || approveVideoMutation.isPending || !selectedPreviewMediaUrl}
              className="rounded-lg bg-primaryButton px-3 py-2 text-xs font-bold text-white disabled:opacity-50 lg:px-4 lg:text-sm"
            >
              Forward to Brand
            </button>
            <button
              className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white lg:px-4 lg:text-sm"
              onClick={() => setOpen(true)}
            >
              Influencer Analytics
            </button>
          </div>
        </div>
      </div>

      <div className="flex w-full flex-col border-t border-white/10 lg:flex-1 lg:overflow-hidden lg:border-t-0">
        <div className="flex flex-row width-full justify-evenly border-b border-white/10 scrollbar-none">
          {(['chat', 'revisions', 'brandfeedback', 'media', 'guidelines'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`shrink-0 whitespace-nowrap px-4 py-3 cursor-pointer text-[11px] font-bold uppercase tracking-widest transition-colors ${activeTab === tab
                ? 'border-b-2 border-primaryButton cursor-pointer bg-white/5 text-white'
                : 'text-white/40 hover:text-white/70'
                }`}
            >
              {tab === 'chat'
                ? 'Chat'
                : tab === 'revisions'
                  ? 'Content Revisions'
                  : tab === 'brandfeedback'
                    ? 'Brand Feedback'
                    : tab === 'media'
                      ? 'Media'
                      : 'Guidelines'}
            </button>
          ))}
        </div>
        <div
          className={`flex min-h-130 flex-col overflow-hidden lg:min-h-0 lg:flex-1 ${activeTab === 'chat' ? 'flex' : 'hidden'
            }`}
        >
          <ChatPanel
            className="h-full"
            modeToggle={{ value: chatMode, onChange: setChatMode }}
            messages={chatData?.messages}
            isLoading={chatLoading}
            messagesAvailable={!(chatMode === 'brand' && !brandThreadId)}
            messagesUnavailableText="No brand thread for this negotiation."
            isRightMessage={(msg) => msg.sender === 'ADMIN'}
            onSelectMedia={(url, type) => {
              setSelectedPreviewMediaUrl(url);
              setSelectedPreviewMediaType(type);
              setIsPlaying(false);
            }}
            onSeekToTime={handleSeekPreviewToTime}
            sendEnabled={sendEnabled}
            onSend={handleSendMessage}
            bubbleMaxWidthClassName="max-w-[100%] lg:max-w-[80%]"
          />
        </div>

        {/* REVISIONS TAB */}
        {activeTab === 'revisions' && (
          <div className="min-h-75 flex-1 overflow-y-auto p-3 lg:min-h-0">
            <RevisionBox negotiationId={negotiationId} />
          </div>
        )}

        {/* BRAND FEEDBACK TAB */}
        {activeTab === 'brandfeedback' && (
          <div className="min-h-75 flex-1 overflow-y-auto p-3 lg:min-h-0">
            <ContentFeedbackPanel
              videoRef={videoRef}
              activeFeedbackId={activeFeedbackId2}
              selectedContentFeedback={selectedContentFeedback}
              setSelectedContentFeedback={setSelectedContentFeedback}
              selectedPreviewMediaUrl={selectedPreviewMediaUrl}
              negotiationId={negotiationId}
              selectedCard={selectedCard}
            />
          </div>
        )}

        {/* MEDIA TAB */}
        {activeTab === 'media' && (
          <div className="min-h-75 flex-1 overflow-y-auto p-3 lg:min-h-0">
            <div className="grid grid-cols-2 gap-3">
              {[1, 2].map((i) => (
                <div key={i} className="rounded-lg border border-white/10 bg-white/5 p-2">
                  <div className="mb-2 h-28 rounded bg-white/10" />
                  <p className="text-xs font-semibold text-white">Version {i}</p>
                  <p className="text-[10px] text-white/40">{i} May · Story {i}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* GUIDELINES TAB */}
        {activeTab === 'guidelines' && (
          <div className="min-h-75 flex-1 overflow-y-auto p-3 lg:min-h-0">
            <p className="text-xs leading-relaxed text-white/60">
              Follow brand tone, avoid prohibited claims, maintain visual consistency,
              and ensure CTA clarity. Keep content aligned with campaign goals.
            </p>
          </div>
        )}
      </div>
    </div>
  );
} 