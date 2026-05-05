'use client';
import React, { useRef, useState } from 'react';
import ChatMessagesList from './chat-messages-list';
import { Mic, Paperclip, X } from 'lucide-react';
import { ChatPanelProps } from '@/src/types/Admin-Type/chat/chat-type';


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
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const resolvedRoleLabels =
    messageRoleLabels ??
    (modeToggle
      ? {
        right: 'Admin',
        left: modeToggle.value === 'brand' ? 'Brand' : 'Influencer',
      }
      : undefined);

  const handleSend = async () => {
    if (!sendEnabled) return;

    setIsSending(true);
    try {
      if (selectedFile) {
        await onSend(selectedFile);
        setSelectedFile(null);
        return;
      }

      const text = draft.trim();
      if (!text) return;

      await onSend(text);
      setDraft('');
    } finally {
      setIsSending(false);
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    if (!file) return;
    setSelectedFile(file);
  };

  return (
    <div className={`flex h-full min-h-0 flex-col bg-white/2 ${className ?? ''}`}>
      {modeToggle && (
        <div className="border-b border-white/10 px-4 pt-3 pb-2">
          <div className="mx-auto flex max-w-md rounded-full border border-white/10 bg-white/5 p-1">
            <button
              type="button"
              onClick={() => modeToggle.onChange('influencer')}
              className={`flex-1 rounded-full py-2 text-center cursor-pointer text-xs font-bold transition-colors ${modeToggle.value === 'influencer'
                ? 'bg-primaryButton text-white shadow-sm'
                : 'text-white/45 cursor-pointer  hover:text-white/70'
                }`}
            >
              Influencer Chat
            </button>
            <button
              type="button"
              onClick={() => modeToggle.onChange('brand')}
              className={`flex-1 rounded-full py-2 text-center cursor-pointer text-xs font-bold transition-colors ${modeToggle.value === 'brand'
                ? 'bg-primaryButton text-white shadow-sm'
                : 'text-white/45 hover:text-white/70'
                }`}
            >
              Brand Chat
            </button>
          </div>
        </div>
      )}

      <div className=" space-y-4 overflow-y-auto p-5">
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
            placeholder="Type your feedback..."
            className="h-24 w-full resize-none rounded-xl border border-white/10 bg-white/5 p-4 pr-32 text-sm text-white placeholder:text-white/40 focus:border-(--color-primaryButton) focus:outline-none focus:ring-1 focus:ring-(--color-primaryButton)"
          />
          <input
            ref={fileInputRef}
            type="file"
            className="hidden"
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
            onChange={handleFileChange}
          />
          <div className="absolute bottom-4 right-4 flex items-center gap-2">
            {selectedFile ? (
              <div className="flex max-w-42.5 items-center gap-1 rounded-lg bg-white/10 px-2 py-1 text-[11px] font-semibold text-white/80">
                <span className="truncate" title={selectedFile.name}>
                  {selectedFile.name}
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedFile(null)}
                  disabled={isSending}
                  className="inline-flex size-4 items-center justify-center rounded text-white/80 hover:bg-white/15 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  title="Deselect file"
                >
                  <X className="size-3" />
                </button>
              </div>
            ) : null}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={!sendEnabled || isSending}
              className="flex size-8 items-center justify-center rounded-lg bg-white/10 text-white/80 transition-colors hover:bg-white/20 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              title="Attach image, video, audio, or document"
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
            <button
              type="button"
              onClick={handleSend}
              disabled={!sendEnabled || isSending}
              className={`flex h-8 items-center justify-center rounded-lg px-3 text-xs font-bold uppercase tracking-wide transition-colors ${!sendEnabled || isSending
                ? 'bg-white/10 text-white/50 cursor-not-allowed'
                : 'bg-(--color-primaryButton)/10 text-(--color-primaryButton) hover:bg-(--color-primaryButton) hover:text-white'
                }`}
            >
              Send
            </button>
          </div>
        </div>

        {afterComposer}
      </div>
    </div>
  );
}
