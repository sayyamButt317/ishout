'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { MessageSquare } from 'lucide-react';
import { Skeleton } from 'boneyard-js/react';

import PageHeader from '@/src/app/component/PageHeader';
import NegotiationAgreedByCampaignHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-agreed-by-campaign-hook';
import useAdminInfluencerMessagesHook from '@/src/routes/Admin/Hooks/feedback/whatsapp-admin-influencer-hook';
import useAdminCompanyMessagesHook from '@/src/routes/Admin/Hooks/feedback/whatsapp-admin-company-hook';
import useSendAdminMessage from '@/src/routes/Admin/Hooks/feedback/whatsapp-admin-influncer-send-message-hook';
import useSendAdminCompanyMessage from '@/src/routes/Admin/Hooks/feedback/whatsapp-admin-company-send-message-hook';
import useAdminNegotiationApprovalStatus from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-approval-status-hook';
import useWhatsAppAdminCompanyApproveVideo from '@/src/routes/Admin/Hooks/feedback/whatsapp-admin-company-approve-video-hook';
import FeedbackDetailFooter from '@/src/app/component/content-feedback/feedback-detail-footer';
import FeedbackDetailHeader from '@/src/app/component/content-feedback/feedback-detail-header';
import FeedbackTabsSection from '@/src/app/component/content-feedback/tabs-section';

import {
  CardType,
  ChatMessage,
  NegotiationResponse,
} from '@/src/types/Admin-Type/Content-type';
import VideoFeedbackWorkspace from '@/src/app/component/content-feedback/feedback-dialogue';
import { AnalyzeURL, formatVideoDuration } from '@/src/utils/video-duration';
import {
  extractTimelineMarkersFromMessages,
  serializeTimedFeedbackMessage,
} from '@/src/utils/content-feedback-chat';
import { TimelineMarkerData } from '@/src/types/Admin-Type/timeline-type';
import { toast } from 'sonner';
import { mapAdminInfluencerMessageError } from '@/src/types/Admin-Type/admin-influencer-message-type';
import useRevisionMessageStore from '@/src/store/Feedback/revisionmessage-store';
import type { AdminInfluencerMessageItem } from '@/src/types/Admin-Type/Feedback/admin-influencer-messages-type';
import useReportStore from '@/src/store/Feedback/report-store';
import useInfluencerMediaUrlsHook from '@/src/routes/Admin/Hooks/content/media';

export default function ContentFeedbackDetailPage() {
  const router = useRouter();
  const params = useParams<{ negotiationId: string }>();
  const negotiationIdParam = params?.negotiationId ?? '';

  const [chatMode, setChatMode] = useState<'influencer' | 'brand'>('influencer');
  const [selectedContentFeedback, setSelectedContentFeedback] = useState('');
  const [selectedPreviewMediaUrl, setSelectedPreviewMediaUrl] = useState<string | null>(
    null,
  );
  const [selectedPreviewMediaType, setSelectedPreviewMediaType] = useState<
    'video' | 'image' | null
  >(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedVideoDuration, setSelectedVideoDuration] = useState<number | null>(null);
  const [selectedVideoResolution, setSelectedVideoResolution] = useState<string>('—');

  const videoRef = useRef<HTMLVideoElement | null>(null);

  const searchParams = useSearchParams();
  const campaignIdFromQuery = searchParams.get('campaign_id') ?? '';

  const { data, isLoading: isNegotiationLoading } = NegotiationAgreedByCampaignHook(
    campaignIdFromQuery,
  ) as {
    data?: NegotiationResponse;
    isLoading: boolean;
  };

  const { data: mediaUrlsData } = useInfluencerMediaUrlsHook(
    data?.negotiations?.[0]?.thread_id ?? '',
  );
  const mediaUrls = useMemo(() => {
    if (!mediaUrlsData || typeof mediaUrlsData !== 'object') return [];
    const maybeUrls = (mediaUrlsData as { media_urls?: unknown }).media_urls;
    if (!Array.isArray(maybeUrls)) return [];
    return maybeUrls.filter(
      (url): url is string => typeof url === 'string' && url.length > 0,
    );
  }, [mediaUrlsData]);

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

  const influencerChatQuery = useAdminInfluencerMessagesHook(
    threadId,
    1,
    20,
    chatMode === 'influencer',
  );
  const companyChatQuery = useAdminCompanyMessagesHook(
    brandThreadId,
    negotiationId,
    1,
    20,
    chatMode === 'brand',
  );

  const chatData =
    chatMode === 'influencer' ? influencerChatQuery.data : companyChatQuery.data;
  const chatLoading =
    chatMode === 'influencer'
      ? influencerChatQuery.isLoading
      : companyChatQuery.isLoading;

  const { sendMessage: sendInfluencerMessage } = useSendAdminMessage(
    threadId,
    negotiationId,
  );
  const { sendMessage: sendCompanyMessage } = useSendAdminCompanyMessage(
    brandThreadId,
    negotiationId,
  );

  const approveVideoMutation = useWhatsAppAdminCompanyApproveVideo();
  const { mutate: approveNegotiation, isPending: isApproving } =
    useAdminNegotiationApprovalStatus();

  const isVideoUrl = useCallback((value: string) => AnalyzeURL(value).isVideoUrl, []);
  const isImageUrl = useCallback((value: string) => AnalyzeURL(value).isImageUrl, []);

  const timelineMarkers = useMemo((): TimelineMarkerData[] => {
    const messages = chatData?.messages ?? [];
    const fromSerialized = extractTimelineMarkersFromMessages(
      messages,
      selectedPreviewMediaUrl,
    );
    const fromObjects: TimelineMarkerData[] = [];
    for (const msg of messages) {
      if (
        typeof msg.message === 'object' &&
        msg.message !== null &&
        'timestamp' in msg.message &&
        typeof (msg.message as { timestamp: unknown }).timestamp === 'number'
      ) {
        const m = msg.message as { text?: string; timestamp: number; snapshot?: string };
        fromObjects.push({
          id: msg._id,
          timestamp: m.timestamp,
          text: m.text ?? '',
          snapshot: m.snapshot,
        });
      }
    }
    const map = new Map<string, TimelineMarkerData>();
    for (const m of fromObjects) map.set(m.id, m);
    for (const m of fromSerialized) {
      if (!map.has(m.id)) map.set(m.id, m);
    }
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
    )
      return;

    const latestMedia = mediaMessages[mediaMessages.length - 1];
    const analyzed = AnalyzeURL(latestMedia.message ?? '');
    setSelectedPreviewMediaUrl(latestMedia.message);
    setSelectedPreviewMediaType(
      analyzed.type === 'video' || analyzed.type === 'image' ? analyzed.type : null,
    );
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
  }, [
    selectedCard?.id,
    chatData?.messages,
    selectedPreviewMediaUrl,
    selectedPreviewMediaType,
    chatMode,
    threadId,
    brandThreadId,
    isVideoUrl,
    isImageUrl,
    setAll,
  ]);

  const sendEnabled =
    chatMode === 'influencer' ? !!threadId : !!brandThreadId && !!negotiationId;

  const selectedInfluencerMessageContentId = useMemo(() => {
    if (!selectedPreviewMediaUrl) return undefined;
    const influencerMessages = influencerChatQuery.data?.messages ?? [];
    const matchedMessage = influencerMessages.find(
      (msg: AdminInfluencerMessageItem) => msg.message === selectedPreviewMediaUrl,
    );
    return matchedMessage?.content_id ?? undefined;
  }, [influencerChatQuery.data?.messages, selectedPreviewMediaUrl]);

  const activeFeedbackId2 = selectedInfluencerMessageContentId ?? '';
  const durationText =
    AnalyzeURL(selectedPreviewMediaUrl ?? '')?.type === 'video'
      ? formatVideoDuration(selectedVideoDuration)
      : '--:--';
  const resolutionText =
    selectedPreviewMediaType === 'video' ? selectedVideoResolution : 'Image';
  const canForwardToBrand = Boolean(selectedPreviewMediaUrl);
  const isForwardToBrandLoading = isApproving || approveVideoMutation.isPending;

  const handleSendMessage = async (textOrFile: string | File) => {
    if (textOrFile instanceof File) {
      if (chatMode !== 'influencer') {
        toast.error('Attach files in Influencer Chat only.');
        return;
      }
      if (!threadId) return;
      try {
        await sendInfluencerMessage({ file: textOrFile });
        await influencerChatQuery.refetch();
      } catch (error) {
        toast.error(mapAdminInfluencerMessageError(error));
      }
      return;
    }
    if (chatMode === 'influencer') {
      if (!threadId) return;
      try {
        await sendInfluencerMessage({ message: textOrFile });
        await influencerChatQuery.refetch();
      } catch (error) {
        toast.error(mapAdminInfluencerMessageError(error));
      }
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

  const handleForwardToBrand = () => {
    if (
      !(
        threadId &&
        brandThreadId &&
        negotiationId &&
        selectedPreviewMediaUrl &&
        selectedCard?.campaign_id
      )
    )
      return;
    approveNegotiation({ thread_id: threadId, payload: { admin_approved: 'Approved' } });
    approveVideoMutation.mutate({
      brand_thread_id: brandThreadId,
      campaign_id: selectedCard.campaign_id,
      negotiation_id: negotiationId,
      video_url: selectedPreviewMediaUrl,
      content_id: selectedInfluencerMessageContentId,
      video_approve_admin: 'approved',
    });
  };

  if (!selectedCard) {
    return (
      <Skeleton name="admin-content-review" loading={isNegotiationLoading}>
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
      </Skeleton>
    );
  }

  return (
    <Skeleton name="admin-content-review" loading={isNegotiationLoading}>
      <div className="flex w-full flex-col font-sans overflow-y-auto lg:h-[calc(100vh-24px)] lg:flex-row lg:overflow-hidden">
        <div className="flex w-full flex-col lg:flex-1 lg:overflow-hidden lg:border-r lg:border-white/10">
          <FeedbackDetailHeader
            title={selectedCard.title}
            campaign={selectedCard.campaign}
            onBack={() => router.back()}
          />

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

          <FeedbackDetailFooter
            durationText={durationText}
            resolutionText={resolutionText}
            canForward={canForwardToBrand}
            isForwardLoading={isForwardToBrandLoading}
            onForwardToBrand={handleForwardToBrand}
          />
        </div>

        <FeedbackTabsSection
          videoRef={videoRef}
          chatMode={chatMode}
          setChatMode={setChatMode}
          messages={chatData?.messages}
          isChatLoading={chatLoading}
          brandThreadId={brandThreadId}
          sendEnabled={sendEnabled}
          onSendMessage={handleSendMessage}
          onSeekToTime={handleSeekPreviewToTime}
          onSelectMedia={(url, type) => {
            setSelectedPreviewMediaUrl(url);
            setSelectedPreviewMediaType(type);
            setIsPlaying(false);
          }}
          activeFeedbackId={activeFeedbackId2}
          selectedContentFeedback={selectedContentFeedback}
          setSelectedContentFeedback={setSelectedContentFeedback}
          selectedPreviewMediaUrl={selectedPreviewMediaUrl}
          mediaUrls={mediaUrls}
          negotiationId={negotiationId}
          selectedCard={selectedCard}
        />
      </div>
    </Skeleton>
  );
}
