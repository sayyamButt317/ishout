'use client';

import ChatMessageContent from './chat-message-content';

type MessageItem = {
  _id: string;
  sender: string;
  username?: string;
  message: unknown;
  timestamp: string;
};

type Props = {
  messages?: MessageItem[];
  isLoading: boolean;
  emptyMessage?: string;
  isRightMessage: (message: MessageItem) => boolean;
  roleLabels?: { right: string; left: string };
  onSelectMedia: (url: string, type: 'video' | 'image') => void;
  onSeekToTime?: (time: number) => void;
  bubbleMaxWidthClassName?: string;
};

export default function ChatMessagesList({
  messages,
  isLoading,
  emptyMessage,
  isRightMessage,
  roleLabels,
  onSelectMedia,
  onSeekToTime,
  bubbleMaxWidthClassName,
}: Props) {
  if (isLoading) {
    return <p className="text-sm text-white/50">Loading messages…</p>;
  }

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
            className={`flex gap-3 ${isRight ? 'flex-row-reverse' : ''}`}
          >
            <div className="size-8 rounded-full bg-slate-600" />

            <div className={bubbleMaxWidthClassName ?? 'max-w-[80%]'}>
              <span className="text-xs font-bold text-white/80">{headerLabel}</span>

              <div className="mt-1 rounded-2xl p-2 text-xs bg-white/5">
                <ChatMessageContent
                  message={msg.message}
                  onSelectMedia={onSelectMedia}
                  onSeekToTime={onSeekToTime}
                />
              </div>
              <span className="text-[10px] text-white/40">
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
