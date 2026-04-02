'use client';

import ChatMessageContent from './chat-message-content';

type MessageItem = {
  _id: string;
  sender: string;
  username?: string;
  message: string;
  timestamp: string;
};

type ChatMessagesListProps = {
  messages?: MessageItem[];
  isLoading: boolean;
  emptyMessage?: string;
  isRightMessage: (message: MessageItem) => boolean;
  /** When set, header above each bubble uses these fixed names (e.g. Admin right, Brand/Influencer left). */
  roleLabels?: { right: string; left: string };
  onSelectMedia: (url: string, type: 'video' | 'image') => void;
  bubbleMaxWidthClassName?: string;
};

export default function ChatMessagesList({
  messages,
  isLoading,
  emptyMessage,
  isRightMessage,
  roleLabels,
  onSelectMedia,
  bubbleMaxWidthClassName,
}: ChatMessagesListProps) {
  if (isLoading) return <p className="text-white/50 text-sm">Loading...</p>;
  if (!messages?.length) {
    return <p className="text-white/50 text-sm">{emptyMessage ?? 'No messages.'}</p>;
  }

  return (
    <>
      {messages.map((msg) => {
        const isRight = isRightMessage(msg);
        const headerLabel = roleLabels
          ? isRight
            ? roleLabels.right
            : roleLabels.left
          : msg.username || msg.sender;

        return (
          <div
            key={msg._id}
            className={`flex items-end gap-3 ${isRight ? 'flex-row-reverse' : 'flex-row'}`}
          >
            <div
              className="size-8 shrink-0 rounded-full bg-slate-600"
              aria-hidden
            />
            <div
              className={`space-y-1 ${bubbleMaxWidthClassName ?? 'max-w-[80%]'} min-w-0 shrink`}
            >
              <span
                className={`block text-xs font-bold text-white/85 ${isRight ? 'text-right' : 'text-left'}`}
              >
                {headerLabel}
              </span>
              <div
                className={`w-fit max-w-full rounded-2xl p-2 text-xs overflow-hidden ${isRight ? 'ml-auto' : 'mr-auto'}`}
              >
                {typeof msg.message === 'string' ? (
                  <ChatMessageContent message={msg.message} onSelectMedia={onSelectMedia} />
                ) : (
                  <p className="whitespace-pre-wrap break-normal">{String(msg.message ?? '')}</p>
                )}
              </div>
              <span
                className={`block text-[10px] text-white/40 ${isRight ? 'text-right' : 'text-left'}`}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}
