'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import {
    Check,
    ChevronLeft,
    Maximize2,
    MessageSquare,
    RefreshCw,
} from 'lucide-react';

import PageHeader from '@/src/app/component/PageHeader';
import NegotiationAgreedByCampaignHook from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-agreed-by-campaign-hook';
import useAdminInfluencerMessagesHook from '@/src/routes/Admin/Hooks/feedback/whatsapp-admin-influencer-hook';
import useAdminCompanyMessagesHook from '@/src/routes/Admin/Hooks/feedback/whatsapp-admin-company-hook';
import useSendAdminMessage from '@/src/routes/Admin/Hooks/feedback/whatsapp-admin-influncer-send-message-hook';
import useSendAdminCompanyMessage from '@/src/routes/Admin/Hooks/feedback/whatsapp-admin-company-send-message-hook';
import useAdminNegotiationApprovalStatus from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-approval-status-hook';
import useWhatsAppAdminCompanyApproveVideo from '@/src/routes/Admin/Hooks/feedback/whatsapp-admin-company-approve-video-hook';
import useFeedbackIdMap from '@/src/routes/Admin/Hooks/feedback/use-feedback-id-map';
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

    const { data } = NegotiationAgreedByCampaignHook(campaignIdFromQuery) as {
        data?: NegotiationResponse;
    };

    const apiCards: CardType[] = useMemo(() => {
        const negotiationItems =
            data?.negotiations ?? data?.negotiation_controls ?? [];

        return negotiationItems
            .filter((item) => !item.negotiation_status || item.negotiation_status === 'agreed')
            .map((item) => {
                return {
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
                };
            });
    }, [data]);

    const selectedCard = useMemo(() => {
        if (!negotiationIdParam) return null;
        return apiCards.find((c) => c.id === negotiationIdParam) ?? null;
    }, [apiCards, negotiationIdParam]);

    const backToList = () => {
        const campaignId =
            campaignIdFromQuery || selectedCard?.campaign_id || '';
        if (campaignId) {
            router.push(
                `/Admin/content?campaign_id=${encodeURIComponent(campaignId)}`,
            );
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

    const { sendMessage: sendInfluencerMessage } = useSendAdminMessage(threadId);
    const { sendMessage: sendCompanyMessage } = useSendAdminCompanyMessage(
        brandThreadId,
        negotiationId,
    );

    const approveVideoMutation = useWhatsAppAdminCompanyApproveVideo();
    const { mutate: approveNegotiation, isPending: isApproving } =
        useAdminNegotiationApprovalStatus();

    const { getFeedbackId, setFeedbackId } = useFeedbackIdMap(
        'admin-content-feedback-id-map',
    );


    const isVideoUrl = useCallback((value: string) => AnalyzeURL(value).isVideoUrl, []);
    const isImageUrl = useCallback((value: string) => AnalyzeURL(value).isImageUrl, []);
    const isAdminAlreadyApproved =
        (selectedCard?.admin_approved ?? '').toLowerCase() === 'approved';

    const activeFeedbackId2 = getFeedbackId(negotiationId, selectedPreviewMediaUrl);

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
                const m = msg.message as {
                    text?: string;
                    timestamp: number;
                    snapshot?: string;
                };
                fromObjects.push({
                    id: msg._id,
                    timestamp: m.timestamp,
                    text: m.text ?? '',
                    snapshot: m.snapshot,
                });
            }
        }
        const map = new Map<string, TimelineMarkerData>();
        for (const m of fromObjects) {
            map.set(m.id, m);
        }
        for (const m of fromSerialized) {
            if (!map.has(m.id)) {
                map.set(m.id, m);
            }
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
        ) {
            return;
        }

        const latestMedia = mediaMessages[mediaMessages.length - 1];
        const analyzed = AnalyzeURL(latestMedia.message ?? '');
        setSelectedPreviewMediaUrl(latestMedia.message);
        setSelectedPreviewMediaType(
            analyzed.type === 'video' || analyzed.type === 'image'
                ? analyzed.type
                : null,
        );
        setSelectedVideoResolution(analyzed.resolution);
        setIsPlaying(false);
        setSelectedVideoDuration(null);
    }, [chatData, selectedPreviewMediaUrl, isImageUrl, isVideoUrl]);

    const sendEnabled =
        chatMode === 'influencer'
            ? !!threadId
            : !!brandThreadId && !!negotiationId;

    const handleSendMessage = async (text: string) => {
        const trimmed = text.trim();
        if (!trimmed) return;

        if (chatMode === 'influencer') {
            if (!threadId) return;
            await sendInfluencerMessage(trimmed);
            await influencerChatQuery.refetch();
            return;
        }

        if (!brandThreadId || !negotiationId) return;
        await sendCompanyMessage(trimmed);
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
            await sendInfluencerMessage(body);
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
                <div className="mt-4 text-white/60">
                    Negotiation not found (or missing `campaign_id`).
                </div>
            </div>
        );
    }

    return (
        <div className="font-sans">
            <div className="w-full mt-4">
                <PageHeader
                    title="Content Review & Feedback Pipeline"
                    description="Review content from influencers and provide feedback"
                    icon={<MessageSquare className="size-5" />}
                    actions={
                        <button
                            onClick={backToList}
                            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white hover:bg-white/10"
                        >
                            <ChevronLeft className="size-4" />
                            Back
                        </button>
                    }
                />
                <div className="mt-4 flex h-full max-h-[90vh] w-full overflow-hidden rounded-2xl border border-white/10 bg-(--color-background) shadow-2xl">
                    <div className="flex flex-1 flex-col border-r border-white/10">
                        <div className="flex items-center justify-between border-b border-white/10 p-4">
                            <div className="flex items-center gap-3">
                                <div className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70">
                                    <ChevronLeft className="size-5" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-white">
                                        {selectedCard.title}
                                    </h3>
                                    <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">
                                        {selectedCard.campaign} Campaign
                                    </p>
                                </div>
                            </div>
                            {/* <div className="flex items-center gap-2">
                                <select className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white focus:border-(--color-primaryButton) focus:outline-none">
                                    <option>Version 1 (Active)</option>
                                    <option disabled>Version 2 (Draft)</option>
                                </select>
                                <button className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                                    <Maximize2 className="size-5" />
                                </button>
                            </div> */}
                        </div>

                        <div className="relative px-2 pt-2">
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
                        {/* feedback section */}
                        <ContentFeedbackPanel
                            videoRef={videoRef}
                            activeFeedbackId={activeFeedbackId2}
                            selectedContentFeedback={selectedContentFeedback}
                            setSelectedContentFeedback={setSelectedContentFeedback}
                            selectedPreviewMediaUrl={selectedPreviewMediaUrl}
                            negotiationId={negotiationId}
                            selectedCard={selectedCard}
                            setFeedbackId={setFeedbackId}
                        />
                        <div className="flex items-center justify-between border-t border-white/10 bg-black/20 p-3">
                            <div className="flex gap-6 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                                <div>
                                    <p className="text-[10px] font-bold uppercase text-white/40">
                                        Duration
                                    </p>
                                    <p className="text-sm font-bold text-white">
                                        {AnalyzeURL(selectedPreviewMediaUrl ?? '')?.type === 'video'
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
                            </div>

                            <div className="flex flex-col items-end gap-2 text-white/50">
                                <div className="flex items-center gap-2">
                                    {/* <button className="flex items-center justify-center gap-2 rounded-xl border-2 border-white/10 px-4 py-2 text-sm font-bold text-white hover:border-white/20 hover:bg-white/5 transition-colors">
                                        <RefreshCw className="size-4" />
                                        Request Revision
                                    </button> */}
                                    <button
                                        onClick={() => {
                                            if (
                                                threadId &&
                                                brandThreadId &&
                                                negotiationId &&
                                                selectedPreviewMediaUrl
                                            ) {
                                                if (!isAdminAlreadyApproved) {
                                                    approveNegotiation({
                                                        thread_id: threadId,
                                                        payload: { admin_approved: 'Approved' },
                                                    });
                                                }
                                                approveVideoMutation.mutate({
                                                    brand_thread_id: brandThreadId,
                                                    negotiation_id: negotiationId,
                                                    video_url: selectedPreviewMediaUrl,
                                                    video_approve_admin: 'approved',
                                                });
                                            }
                                        }}
                                        disabled={
                                            isApproving ||
                                            approveVideoMutation.isPending ||
                                            !selectedPreviewMediaUrl
                                        }
                                        className="flex items-center justify-center gap-2 rounded-xl bg-(--color-primaryButton) px-4 py-2 text-sm font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <Check className="size-4" />
                                        Approve for Brand
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ChatPanel
                        title="Feedback"
                        unreadText="3 UNREAD"
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
                        bubbleMaxWidthClassName="max-w-[90%]"
                        afterComposer={
                            <div className="flex flex-col gap-3">
                                <button
                                    onClick={() => {
                                        if (threadId && !isAdminAlreadyApproved) {
                                            approveNegotiation({
                                                thread_id: threadId,
                                                payload: { admin_approved: 'Approved' },
                                            });
                                        }
                                    }}
                                    disabled={isApproving || isAdminAlreadyApproved}
                                    className="w-full flex items-center justify-center gap-2 rounded-xl bg-(--color-primaryButton) px-4 py-3 text-sm font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <Check className="size-4" />
                                    {isAdminAlreadyApproved
                                        ? 'Approved'
                                        : isApproving
                                            ? 'Approving...'
                                            : 'Approve'}
                                </button>
                            </div>
                        }
                    />
                </div>
            </div>
        </div>
    );
}

