'use client';

import { useState } from 'react';
import type { Dispatch, RefObject, SetStateAction } from 'react';
import { Clapperboard, FileCheck2, MessageSquare, MessagesSquare, ScrollText } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

import ChatPanel from '@/src/app/component/content-feedback/chat-panel';
import ContentFeedbackPanel from '@/src/app/component/content-feedback/feedback';
import FeedbackGuidelinesTab from '@/src/app/component/content-feedback/guidelines-tab';
import FeedbackMediaTab from '@/src/app/component/content-feedback/media-tab';
import { RevisionBox } from '@/src/app/component/content-feedback/revisionbox';
import { CardType, ChatMessage } from '@/src/types/Admin-Type/Content-type';

type FeedbackTabsSectionProps = {
  videoRef: RefObject<HTMLVideoElement | null>;
  chatMode: 'influencer' | 'brand';
  setChatMode: Dispatch<SetStateAction<'influencer' | 'brand'>>;
  messages: ChatMessage[] | undefined;
  isChatLoading: boolean;
  brandThreadId: string;
  sendEnabled: boolean;
  onSendMessage: (textOrFile: string | File) => Promise<void>;
  onSeekToTime: (time: number) => void;
  onSelectMedia: (url: string, type: 'video' | 'image') => void;
  activeFeedbackId: string;
  selectedContentFeedback: string;
  setSelectedContentFeedback: Dispatch<SetStateAction<string>>;
  selectedPreviewMediaUrl: string | null;
  mediaUrls: string[];
  negotiationId: string;
  selectedCard: CardType;
};

const tabs = ['chat', 'revisions', 'brandfeedback', 'media', 'guidelines'] as const;
type TabType = (typeof tabs)[number];

const TAB_META: Record<TabType, { label: string; icon: LucideIcon }> = {
  chat: { label: 'Chat', icon: MessageSquare },
  revisions: { label: 'Content Revisions', icon: FileCheck2 },
  brandfeedback: { label: 'Brand Feedback', icon: MessagesSquare },
  media: { label: 'Media', icon: Clapperboard },
  guidelines: { label: 'Guidelines', icon: ScrollText },
};

export default function FeedbackTabsSection({
  videoRef,
  chatMode,
  setChatMode,
  messages,
  isChatLoading,
  brandThreadId,
  sendEnabled,
  onSendMessage,
  onSeekToTime,
  onSelectMedia,
  activeFeedbackId,
  selectedContentFeedback,
  setSelectedContentFeedback,
  selectedPreviewMediaUrl,
  mediaUrls,
  negotiationId,
  selectedCard,
}: FeedbackTabsSectionProps) {
  const [activeTab, setActiveTab] = useState<TabType>('chat');

  return (
    <div className="flex w-full flex-col border-t border-white/10 lg:flex-1 lg:overflow-hidden lg:border-t-0">
      <div className="flex flex-row width-full justify-evenly border-b border-white/10 scrollbar-none">
        {tabs.map((tab) => (
          (() => {
            const { label, icon: TabIcon } = TAB_META[tab];
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`shrink-0 whitespace-nowrap px-4 py-3 cursor-pointer text-[11px] font-bold uppercase tracking-widest transition-colors ${activeTab === tab
                  ? 'border-b-2 border-primaryButton cursor-pointer bg-white/5 text-white'
                  : 'text-white/40 hover:text-white/70'
                  }`}
              >
                <span className="inline-flex items-center gap-1.5">
                  <TabIcon className="size-3.5" />
                  <span>{label}</span>
                </span>
              </button>
            );
          })()
        ))}
      </div>
      <div
        className={`flex min-h-130 flex-col overflow-hidden lg:min-h-0 lg:flex-1 ${activeTab === 'chat' ? 'flex' : 'hidden'
          }`}
      >
        <ChatPanel
          className="h-full"
          modeToggle={{ value: chatMode, onChange: setChatMode }}
          messages={messages}
          isLoading={isChatLoading}
          messagesAvailable={!(chatMode === 'brand' && !brandThreadId)}
          messagesUnavailableText="No brand thread for this negotiation."
          isRightMessage={(msg) => msg.sender === 'ADMIN'}
          onSelectMedia={onSelectMedia}
          onSeekToTime={onSeekToTime}
          sendEnabled={sendEnabled}
          onSend={onSendMessage}
          bubbleMaxWidthClassName="max-w-[100%] lg:max-w-[80%]"
        />
      </div>

      {activeTab === 'revisions' && (
        <div className="min-h-75 flex-1 overflow-y-auto p-3 lg:min-h-0">
          <RevisionBox />
        </div>
      )}

      {activeTab === 'brandfeedback' && (
        <div className="min-h-75 flex-1 overflow-y-auto p-3 lg:min-h-0">
          <ContentFeedbackPanel
            videoRef={videoRef}
            activeFeedbackId={activeFeedbackId}
            selectedContentFeedback={selectedContentFeedback}
            setSelectedContentFeedback={setSelectedContentFeedback}
            selectedPreviewMediaUrl={selectedPreviewMediaUrl}
            negotiationId={negotiationId}
            selectedCard={selectedCard}
          />
        </div>
      )}

      {activeTab === 'media' && (
        <FeedbackMediaTab
          mediaUrls={mediaUrls}
          onSelectMedia={onSelectMedia}
        />
      )}

      {activeTab === 'guidelines' && <FeedbackGuidelinesTab />}
    </div>
  );
}
