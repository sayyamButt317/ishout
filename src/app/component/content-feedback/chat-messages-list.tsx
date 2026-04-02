'use client';

import Image from 'next/image';

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
  isVideoUrl: (value: string) => boolean;
  isImageUrl: (value: string) => boolean;
  onSelectMedia: (url: string, type: 'video' | 'image') => void;
  bubbleMaxWidthClassName?: string;
};

export default function ChatMessagesList({
  messages,
  isLoading,
  emptyMessage,
  isRightMessage,
  isVideoUrl,
  isImageUrl,
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
        return (
          <div key={msg._id} className={`flex gap-3 ${isRight ? 'justify-end' : 'justify-start'}`}>
            {!isRight && <div className="size-8 rounded-full bg-slate-600" />}
            <div
              className={`w-full ${bubbleMaxWidthClassName ?? 'max-w-[80%]'} space-y-1`}
            >
              <span
                className={`block text-xs font-bold text-white/85 ${isRight ? 'text-right' : 'text-left'
                  }`}
              >
                {msg.username || msg.sender}
              </span>
              <div
                className={`w-fit max-w-full rounded-2xl p-2 text-xs overflow-hidden ${isRight
                    ? 'bg-(--color-primaryButton) text-white rounded-tr-none ml-auto'
                    : 'bg-white/5 text-white/70 rounded-tl-none'
                  }`}
              >
                {typeof msg.message === 'string' && isVideoUrl(msg.message) ? (
                  <button
                    type="button"
                    onClick={() => onSelectMedia(msg.message, 'video')}
                    className="w-full text-left cursor-pointer"
                  >
                    <video
                      src={msg.message}
                      controls
                      className="w-full h-auto max-h-[300px] sm:max-h-[350px] md:max-h-[400px] rounded-lg bg-black"
                    />
                  </button>
                ) : typeof msg.message === 'string' && isImageUrl(msg.message) ? (
                  <button
                    type="button"
                    onClick={() => onSelectMedia(msg.message, 'image')}
                    className="w-full text-left cursor-pointer"
                  >
                    <Image
                      src={msg.message}
                      alt="Chat image"
                      width={360}
                      height={420}
                      className="w-auto max-w-full h-auto max-h-[420px] rounded-lg object-contain bg-black/20"
                    />
                  </button>
                ) : (
                  <p className="whitespace-pre-wrap break-normal">{msg.message}</p>
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
