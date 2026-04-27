'use client';
import { MessageListProps } from '@/src/types/Admin-Type/chat/chat-type';
import ChatMessageContent from './chat-message-content';
import { Loader2 } from 'lucide-react';


export default function ChatMessagesList({
  messages,
  isLoading,
  emptyMessage,
  isRightMessage,
  roleLabels,
  onSelectMedia,
  onSeekToTime,
  bubbleMaxWidthClassName,
}: MessageListProps) {
  if (isLoading) {
    return <p className="text-sm text-white/50">
      <Loader2 className='animate-spin' />
    </p>;
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
