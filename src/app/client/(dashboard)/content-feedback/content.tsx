'use client';

import { useEffect, useMemo, useState } from 'react';
import { Check, ChevronLeft, Maximize2, RefreshCw } from 'lucide-react';
import useAuthStore from '@/src/store/AuthStore/authStore';
import useAdminCompanyMessagesHook from '@/src/routes/Admin/Hooks/feedback/whatsapp-admin-company-hook';
import useSendCompanyAdminMessage from '@/src/routes/Admin/Hooks/feedback/whatsapp-company-admin-send-message-hook';
import useAdminNegotiationApprovalStatus from '@/src/routes/Admin/Hooks/Whatsapp/negotiation-approval-status-hook';
import useSaveContentFeedbackHook from '@/src/routes/Admin/Hooks/feedback/content-feedback-write-hook';
import useBrandContentFeedbackReadHook from '@/src/routes/Admin/Hooks/feedback/content-feedback-brand-read-hook';
import useWhatsAppAdminCompanyApproveVideo from '@/src/routes/Admin/Hooks/feedback/whatsapp-admin-company-approve-video-hook';
import useUpdateApprovedContent from '@/src/routes/Company/api/Hooks/use-update-approved-content.hook';
import useFeedbackIdMap from '@/src/routes/Admin/Hooks/feedback/use-feedback-id-map';
import ChatMessagesList from '@/src/app/component/content-feedback/chat-messages-list';
import ContentFeedbackBrandSidebar from '@/src/app/component/content-feedback-client/content-feedback-brand-sidebar';
import ContentFeedbackMediaPreview from '@/src/app/component/content-feedback-client/content-feedback-media-preview';
import type {
  ChatMessage,
  NegotiationItem,
} from '@/src/types/Compnay/feeedback-content-type';
import type { WhatsAppAdminCompanyApproveVideoResponse } from '@/src/types/Compnay/approved-video-type';

export type SelectedContentFeedbackCard = {
  item: NegotiationItem;
  title: string;
  campaign: string;
};

type ContentFeedbackModalProps = {
  selectedCard: SelectedContentFeedbackCard | null;
  onClose: () => void;
  asPage?: boolean;
};

function normalizeMediaUrlKey(url: string): string {
  return url.trim();
}

function isVideoUrl(value: string) {
  return /\.(mp4|webm|ogg)(\?.*)?$/i.test(value);
}

function isImageUrl(value: string) {
  return /\.(jpg|jpeg|png|gif|webp|bmp)(\?.*)?$/i.test(value);
}

function formatVideoDuration(seconds: number | null) {
  if (!seconds || Number.isNaN(seconds)) return '--:--';
  const total = Math.max(0, Math.floor(seconds));
  const mins = Math.floor(total / 60);
  const secs = total % 60;
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

export default function ContentFeedbackModal({
  selectedCard,
  onClose,
  asPage = false,
}: ContentFeedbackModalProps) {
  const { company_user_id } = useAuthStore();

  const [feedback, setFeedback] = useState('');
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
  const [isSending, setIsSending] = useState(false);

  const [brandApprovedByVideoUrl, setBrandApprovedByVideoUrl] = useState<
    Record<string, boolean>
  >({});
  const [approveVideoResponseByUrl, setApproveVideoResponseByUrl] = useState<
    Partial<Record<string, WhatsAppAdminCompanyApproveVideoResponse>>
  >({});
  const [approvedCopyDraftByUrl, setApprovedCopyDraftByUrl] = useState<
    Record<string, { hashtags: string }>
  >({});

  const threadId = selectedCard?.item.thread_id || '';
  const brandThreadId = selectedCard?.item.brand_thread_id || '';
  const effectiveBrandThreadId = brandThreadId || threadId;
  const negotiationId = selectedCard?.item._id || '';
  const campaignId = selectedCard?.item.campaign_id;
  const isBrandAlreadyApproved =
    (selectedCard?.item.Brand_approved ?? '').toLowerCase() === 'approved';

  const {
    data: chatData,
    isLoading: chatLoading,
    refetch: refetchChat,
  } = useAdminCompanyMessagesHook(effectiveBrandThreadId, negotiationId, 1, 20);
  const { sendMessage } = useSendCompanyAdminMessage(company_user_id, negotiationId);
  const { mutate: approveNegotiation, isPending: isApproving } =
    useAdminNegotiationApprovalStatus();
  const approveVideoMutation = useWhatsAppAdminCompanyApproveVideo();
  const updateApprovedContentMutation = useUpdateApprovedContent();
  const saveContentFeedbackMutation = useSaveContentFeedbackHook();

  const { getFeedbackId, setFeedbackId } = useFeedbackIdMap(
    'brand-content-feedback-id-map',
  );
  const activeFeedbackId = getFeedbackId(negotiationId, selectedPreviewMediaUrl);
  const { data: brandFeedbackData, refetch: refetchBrandFeedback } =
    useBrandContentFeedbackReadHook(activeFeedbackId, !!activeFeedbackId);

  const selectedMediaKey = selectedPreviewMediaUrl
    ? normalizeMediaUrlKey(selectedPreviewMediaUrl)
    : null;

  const isBrandContentApprovedInBrandChat = useMemo(() => {
    const url = selectedPreviewMediaUrl;
    if (!url || !chatData?.messages) return false;
    const key = normalizeMediaUrlKey(url);
    return chatData.messages.some((msg: ChatMessage) => {
      const contentUrl =
        typeof msg.message === 'string' &&
        (isVideoUrl(msg.message) || isImageUrl(msg.message))
          ? msg.message
          : (msg.video_url ?? '');
      const brandOk = (msg.video_approve_brand ?? '').toLowerCase() === 'approved';
      return normalizeMediaUrlKey(contentUrl) === key && brandOk;
    });
  }, [chatData, selectedPreviewMediaUrl]);

  const isSelectedContentBrandApproved = useMemo(() => {
    if (!selectedMediaKey) return false;
    if (brandApprovedByVideoUrl[selectedMediaKey]) return true;
    return isBrandContentApprovedInBrandChat;
  }, [selectedMediaKey, brandApprovedByVideoUrl, isBrandContentApprovedInBrandChat]);

  useEffect(() => {
    setFeedback('');
    setSelectedContentFeedback('');
    setSelectedPreviewMediaUrl(null);
    setSelectedPreviewMediaType(null);
    setIsPlaying(false);
    setSelectedVideoDuration(null);
    setSelectedVideoResolution('—');
    setBrandApprovedByVideoUrl({});
    setApproveVideoResponseByUrl({});
    setApprovedCopyDraftByUrl({});
  }, [selectedCard?.item._id]);

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
      mediaMessages.some((msg: ChatMessage) => {
        if (typeof msg.message !== 'string') return false;
        return (
          normalizeMediaUrlKey(msg.message) ===
          normalizeMediaUrlKey(selectedPreviewMediaUrl)
        );
      })
    ) {
      return;
    }

    const latestMedia = mediaMessages[mediaMessages.length - 1];
    setSelectedPreviewMediaUrl(normalizeMediaUrlKey(latestMedia.message));
    setSelectedPreviewMediaType(isVideoUrl(latestMedia.message) ? 'video' : 'image');
    setIsPlaying(false);
    setSelectedVideoDuration(null);
    setSelectedVideoResolution('—');
  }, [chatData, selectedPreviewMediaUrl]);

  const approvedCopyDraft =
    selectedMediaKey != null
      ? (approvedCopyDraftByUrl[selectedMediaKey] ?? {
          hashtags: '',
        })
      : { hashtags: '' };

  const setApprovedCopyDraftField = (field: 'hashtags', value: string) => {
    if (!selectedMediaKey) return;
    setApprovedCopyDraftByUrl((prev) => {
      const current = prev[selectedMediaKey] ?? {
        hashtags: '',
      };
      return {
        ...prev,
        [selectedMediaKey]: { ...current, [field]: value },
      };
    });
  };

  if (!selectedCard) return null;

  return (
    <div
      className={
        asPage
          ? 'h-full min-h-[calc(100vh-120px)] p-4'
          : 'fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4'
      }
      onClick={asPage ? undefined : onClose}
    >
      <div
        className={`flex h-full w-full overflow-hidden rounded-2xl border border-white/10 bg-(--color-background) shadow-2xl ${
          asPage ? '' : 'max-h-[90vh] max-w-6xl'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-1 flex-col border-r border-white/10">
          <div className="flex items-center justify-between border-b border-white/10 p-4">
            <div className="flex items-center gap-3">
              <button
                onClick={onClose}
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
              <select className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-white focus:border-primaryButton focus:outline-none">
                <option>Version 1 (Active)</option>
                <option disabled>Version 2 (Draft)</option>
              </select>
              <button className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 hover:bg-white/10 hover:text-white transition-colors">
                <Maximize2 className="size-5" />
              </button>
            </div>
          </div>
          <div className="flex flex-1 flex-col lg:flex-row items-start lg:items-stretch justify-start lg:justify-center overflow-y-auto lg:overflow-hidden bg-slate-900 p-4 gap-4">
            <ContentFeedbackMediaPreview
              selectedPreviewMediaUrl={selectedPreviewMediaUrl}
              selectedPreviewMediaType={selectedPreviewMediaType}
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
              setSelectedVideoDuration={setSelectedVideoDuration}
              setSelectedVideoResolution={setSelectedVideoResolution}
            />
            <ContentFeedbackBrandSidebar
              selectedContentFeedback={selectedContentFeedback}
              onSelectedContentFeedbackChange={setSelectedContentFeedback}
              saveContentFeedbackMutation={saveContentFeedbackMutation}
              selectedPreviewMediaUrl={selectedPreviewMediaUrl}
              negotiationId={negotiationId}
              campaignId={campaignId}
              setFeedbackId={setFeedbackId}
              activeFeedbackId={activeFeedbackId}
              refetchBrandFeedback={refetchBrandFeedback}
              brandFeedbackData={brandFeedbackData}
              selectedMediaKey={selectedMediaKey}
              approveVideoResponseByUrl={approveVideoResponseByUrl}
              approvedCopyDraft={approvedCopyDraft}
              setApprovedCopyDraftField={setApprovedCopyDraftField}
              setApprovedCopyDraftByUrl={setApprovedCopyDraftByUrl}
              updateApprovedContentMutation={updateApprovedContentMutation}
            />
          </div>
          <div className="flex items-center justify-between border-t border-white/10 bg-black/20 p-4">
            <div className="flex gap-8 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
              <div>
                <p className="text-[10px] font-bold uppercase text-white/40">Duration</p>
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
                      if (threadId && !isBrandAlreadyApproved) {
                        approveNegotiation({
                          thread_id: threadId,
                          payload: { Brand_approved: 'Approved' },
                        });
                      }
                      approveVideoMutation.mutate(
                        {
                          brand_thread_id: effectiveBrandThreadId,
                          campaign_id: campaignId ?? '',
                          negotiation_id: negotiationId,
                          video_url: selectedPreviewMediaUrl,
                          video_approve_brand: 'approved',
                        },
                        {
                          onSuccess: (
                            data: WhatsAppAdminCompanyApproveVideoResponse,
                            variables,
                          ) => {
                            const key = normalizeMediaUrlKey(variables.video_url);
                            if (
                              data?.success &&
                              (data.video_approve_brand ?? '').toLowerCase().trim() ===
                                'approved'
                            ) {
                              setBrandApprovedByVideoUrl((prev) => ({
                                ...prev,
                                [key]: true,
                              }));
                            }
                            setApproveVideoResponseByUrl((prev) => {
                              const next = { ...prev };
                              if (data.approved_content_id) {
                                next[key] = data;
                              } else {
                                delete next[key];
                              }
                              return next;
                            });
                          },
                        },
                      );
                    }
                  }}
                  disabled={
                    isApproving ||
                    approveVideoMutation.isPending ||
                    !selectedPreviewMediaUrl ||
                    !effectiveBrandThreadId ||
                    isSelectedContentBrandApproved
                  }
                  className="flex items-center justify-center gap-2 rounded-xl bg-(--color-primaryButton) px-4 py-2 text-sm font-bold text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <Check className="size-4" />
                  {selectedPreviewMediaType === 'image'
                    ? 'Image Approve'
                    : 'Video Approve'}
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-100 shrink-0 flex-col bg-white/2">
          <div className="flex-1 space-y-4 overflow-y-auto p-5">
            <ChatMessagesList
              messages={chatData?.messages}
              isLoading={chatLoading}
              isRightMessage={(msg) => msg.sender !== 'ADMIN'}
              roleLabels={{ right: 'Brand', left: 'Admin' }}
              onSelectMedia={(url, type) => {
                setSelectedPreviewMediaUrl(normalizeMediaUrlKey(url));
                setSelectedPreviewMediaType(type);
                setIsPlaying(false);
              }}
            />
          </div>
          <div className="space-y-4 border-t border-white/10 p-5">
            <div className="relative">
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                placeholder="Type your feedback..."
                className="h-24 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 pr-12 text-sm text-white placeholder:text-white/40 focus:border-primaryButton focus:outline-none focus:ring-1 focus:ring-primaryButton"
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
                className={`absolute bottom-4 right-4 flex h-8 items-center justify-center rounded-lg px-3 text-xs font-bold uppercase tracking-wide transition-colors
${isSending ? 'bg-white/10 text-white/50 cursor-not-allowed' : 'bg-(--color-primaryButton)/10 text-(--color-primaryButton) hover:bg-(--color-primaryButton) hover:text-white'}`}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
