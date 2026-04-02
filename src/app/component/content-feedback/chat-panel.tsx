'use client';

import React, { ReactNode, useState } from 'react';
import ChatMessagesList from './chat-messages-list';
import { MessageSquare, Send } from 'lucide-react';

type Mode = 'influencer' | 'brand';

type ChatMessageItem = {
  _id: string;
  sender: string;
  username?: string;
  message: string;
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

  sendEnabled: boolean;
  onSend: (text: string) => Promise<void> | void;

  afterComposer?: ReactNode;
  bubbleMaxWidthClassName?: string;
};

export default function ChatPanel({
  title = 'Feedback',
  unreadText = '0 UNREAD',
  className,
  modeToggle,
  messages,
  isLoading,
  messagesAvailable = true,
  messagesUnavailableText = 'No messages.',
  isRightMessage,
  messageRoleLabels,
  onSelectMedia,
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
    <div
      className={`flex w-1/2 shrink-0 flex-col bg-white/2 ${className ?? ''}`}
    >
      <div className="flex items-center justify-between border-b border-white/10 p-4">
        <h4 className="flex items-center gap-2 text-sm font-bold text-white">
          <MessageSquare className="size-4 text-(--color-primaryButton)" />
          {title}
        </h4>
        <span className="rounded-full bg-(--color-primaryButton)/10 px-2.5 py-0.5 text-[10px] font-bold text-(--color-primaryButton)">
          {unreadText}
        </span>
      </div>

      {modeToggle && (
        <div className="border-b border-white/10 px-4 pt-3 pb-2">
          <div className="mx-auto flex max-w-md rounded-full border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => modeToggle.onChange('influencer')}
              className={`flex-1 rounded-full py-2 text-center text-xs font-bold transition-colors ${modeToggle.value === 'influencer'
                ? 'bg-white/15 text-white shadow-sm'
                : 'text-white/45 hover:text-white/70'
                }`}
            >
              Influencer Chat
            </button>
            <button
              type="button"
              onClick={() => modeToggle.onChange('brand')}
              className={`flex-1 rounded-full py-2 text-center text-xs font-bold transition-colors ${modeToggle.value === 'brand'
                ? 'bg-white/15 text-white shadow-sm'
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
            placeholder="Type your feedback..."
            className="h-24 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 pr-12 text-sm text-white placeholder:text-white/40 focus:border-(--color-primaryButton) focus:outline-none focus:ring-1 focus:ring-(--color-primaryButton)"
          />
          <button
            type="button"
            onClick={handleSend}
            disabled={!sendEnabled || isSending}
            className={`absolute bottom-4 right-4 flex size-8 items-center justify-center rounded-lg transition-colors ${!sendEnabled || isSending
              ? 'bg-white/10 text-white/50 cursor-not-allowed'
              : 'bg-(--color-primaryButton)/10 text-(--color-primaryButton) hover:bg-(--color-primaryButton) hover:text-white'
              }`}
          >
            <Send className="size-4" />
          </button>
        </div>

        {afterComposer}
      </div>
    </div>
  );
}

