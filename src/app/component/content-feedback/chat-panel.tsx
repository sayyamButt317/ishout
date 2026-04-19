'use client';

import React, { ReactNode, useState } from 'react';
import ChatMessagesList from './chat-messages-list';
import { Mic, Paperclip, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';

type Mode = 'influencer' | 'brand';

type ChatMessageItem = {
  _id: string;
  sender: string;
  username?: string;
  message: unknown;
  timestamp: string;
};

type ChatPanelProps = {
  title?: string;
  unreadText?: string;
  className?: string;

  modeToggle?: {
    value: Mode;
    onChange: (value: Mode) => void;
  };

  messages?: ChatMessageItem[];
  isLoading: boolean;
  messagesAvailable?: boolean;
  messagesUnavailableText?: string;

  isRightMessage: (msg: ChatMessageItem) => boolean;
  /** Override default labels when using modeToggle (default: Admin right, Brand/Influencer left). */
  messageRoleLabels?: { right: string; left: string };
  onSelectMedia: (url: string, type: 'video' | 'image') => void;
  onSeekToTime?: (time: number) => void;

  sendEnabled: boolean;
  onSend: (text: string) => Promise<void> | void;

  afterComposer?: ReactNode;
  bubbleMaxWidthClassName?: string;
};

export default function ChatPanel({
  className,
  modeToggle,
  messages,
  isLoading,
  messagesAvailable = true,
  messagesUnavailableText = 'No messages.',
  isRightMessage,
  messageRoleLabels,
  onSelectMedia,
  onSeekToTime,
  sendEnabled,
  onSend,
  afterComposer,
  bubbleMaxWidthClassName,
}: ChatPanelProps) {
  const [draft, setDraft] = useState('');
  const [isSending, setIsSending] = useState(false);

  const resolvedRoleLabels =
    messageRoleLabels ??
    (modeToggle
      ? {
        right: 'Admin',
        left: modeToggle.value === 'brand' ? 'Brand' : 'Influencer',
      }
      : undefined);

  const handleSend = async () => {
    const text = draft.trim();
    if (!text) return;
    if (!sendEnabled) return;

    setIsSending(true);
    try {
      await onSend(text);
      setDraft('');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className={`flex shrink-0 flex-col bg-white/2 ${className ?? ''}`}>
      {modeToggle && (
        <div className="border-b border-white/10 px-4 pt-3 pb-2">
          <div className="mx-auto flex max-w-md rounded-full border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => modeToggle.onChange('influencer')}
              className={`flex-1 rounded-full py-2 text-center text-xs font-bold transition-colors ${modeToggle.value === 'influencer'
                ? 'bg-primaryButton text-white shadow-sm'
                : 'text-white/45 hover:text-white/70'
                }`}
            >
              Influencer Chat
            </button>
            <button
              type="button"
              onClick={() => modeToggle.onChange('brand')}
              className={`flex-1 rounded-full py-2 text-center text-xs font-bold transition-colors ${modeToggle.value === 'brand'
                ? 'bg-primaryButton text-white shadow-sm'
                : 'text-white/45 hover:text-white/70'
                }`}
            >
              Brand Chat
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 space-y-4 overflow-y-auto p-5">
        {messagesAvailable ? (
          <ChatMessagesList
            messages={messages}
            isLoading={isLoading}
            isRightMessage={isRightMessage}
            roleLabels={resolvedRoleLabels}
            onSelectMedia={onSelectMedia}
            onSeekToTime={onSeekToTime}
            bubbleMaxWidthClassName={bubbleMaxWidthClassName}
          />
        ) : (
          <p className="text-white/50 text-sm">{messagesUnavailableText}</p>
        )}
      </div>

      <div className="space-y-4 border-t border-white/10 p-5">
        <div className="relative">
          <textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            placeholder="Type your message..."
            className="h-24 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 pr-32 text-sm text-white placeholder:text-white/40 focus:border-(--color-primaryButton) focus:outline-none focus:ring-1 focus:ring-(--color-primaryButton)"
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              title="Attach files"
            >
              <Paperclip className="size-4" />
            </button>
            <button
              type="button"
              className="flex size-8 items-center justify-center rounded-lg bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white"
              title="Record voice"
            >
              <Mic className="size-4" />
            </button>
            <Button
              onClick={handleSend}
              disabled={!sendEnabled || isSending}
              className={`flex h-8 items-center justify-center rounded-lg px-3 text-xs font-bold uppercase tracking-wide transition-colors ${!sendEnabled || isSending
                ? 'bg-white/10 text-white/50 cursor-not-allowed'
                : 'bg-primaryButton font-bold cursor-pointer text-white hover:bg-primaryButton/80 hover:text-white'
                }`}
            >
              <Send className="size-4 mr-2" />
              Send Message
            </Button>
          </div>
        </div>

        {afterComposer}
      </div>
    </div>
  );
}
