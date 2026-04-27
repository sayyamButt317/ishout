'use client';

import Image from 'next/image';
import Waveform from './audiowave';
import { AnalyzeURL, formatVideoDuration } from '@/src/utils/video-duration';
import { parseTimedFeedbackMessage } from '@/src/utils/content-feedback-chat';
import { FiFileText } from 'react-icons/fi';
import { ChatMessageContentProps, ChatMessageType } from '@/src/types/Admin-Type/chat/chat-type';


function normalizeMessage(raw: unknown): ChatMessageType {
  if (raw != null && typeof raw === 'object' && !Array.isArray(raw)) {
    return raw as ChatMessageType;
  }
  if (typeof raw === 'string') {
    const parsed = parseTimedFeedbackMessage(raw);
    if (parsed) {
      return {
        text: parsed.m,
        timestamp: parsed.t,
        snapshot: parsed.s,
        mediaUrl: parsed.u,
      };
    }
    return { text: raw };
  }
  return { text: String(raw ?? '') };
}

function isDataUrl(src: string) {
  return src.startsWith('data:');
}

function isPdfUrl(value: string) {
  return /^https?:\/\/.+\.pdf(?:[?#].*)?$/i.test(value.trim());
}

function extractFileName(url: string) {
  try {
    const pathname = new URL(url).pathname;
    const name = pathname.split('/').pop();
    return name || 'document.pdf';
  } catch {
    return 'document.pdf';
  }
}

export default function ChatMessageContent({
  message,
  onSelectMedia,
  onSeekToTime,
}: ChatMessageContentProps) {
  const msg = normalizeMessage(message);

  const hasTimedStamp = msg.timestamp != null && Number.isFinite(msg.timestamp);

  if (hasTimedStamp) {
    return (
      <div className="w-fit max-w-full space-y-2 text-left">
        <button
          type="button"
          onClick={() => onSeekToTime?.(msg.timestamp!)}
          className="block w-full cursor-pointer rounded-lg text-left outline-none ring-offset-2 focus-visible:ring-2 focus-visible:ring-(--color-primaryButton)"
        >
          {msg.snapshot ? (
            <div className="relative w-full max-w-[320px]">
              <Image
                src={msg.snapshot}
                alt="Video frame"
                width={360}
                height={200}
                unoptimized={isDataUrl(msg.snapshot)}
                className="max-h-[200px] w-full rounded-lg object-cover"
              />
              <div className="absolute bottom-1 right-1 rounded bg-black/70 px-2 py-1 text-xs text-white">
                {formatVideoDuration(msg.timestamp)}
              </div>
            </div>
          ) : (
            <div className="rounded-lg border border-white/15 bg-white/10 px-3 py-2">
              <span className="text-xs font-bold text-(--color-primaryButton)">
                {formatVideoDuration(msg.timestamp)}
              </span>
              <span className="ml-2 text-xs text-white/60">
                Tap to jump to this moment
              </span>
            </div>
          )}
        </button>
        {msg.text ? (
          <p className="whitespace-pre-wrap text-sm text-white/85">{msg.text}</p>
        ) : null}
      </div>
    );
  }

  if (msg?.snapshot) {
    return (
      <div className="relative w-fit max-w-full">
        <button
          type="button"
          onClick={() => {
            if (onSeekToTime && msg.timestamp !== undefined) {
              onSeekToTime(msg.timestamp);
            }
          }}
          className="cursor-pointer"
        >
          <Image
            src={msg.snapshot}
            alt="Snapshot"
            width={360}
            height={200}
            unoptimized={isDataUrl(msg.snapshot)}
            className="rounded-lg object-cover"
          />
          {msg.timestamp !== undefined && (
            <div className="absolute bottom-1 right-1 rounded bg-black/70 px-2 py-1 text-xs text-white">
              {formatVideoDuration(msg.timestamp)}
            </div>
          )}
        </button>
        {msg.text && <p className="mt-1 text-sm text-white/80">{msg.text}</p>}
      </div>
    );
  }

  const mediaUrl = msg?.mediaUrl || msg?.text || '';
  const analyzed = AnalyzeURL(mediaUrl);

  if (isPdfUrl(mediaUrl)) {
    return (
      <a
        href={mediaUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
      >
        <FiFileText className="text-2xl text-white/90" />
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-white">
            {extractFileName(mediaUrl)}
          </p>
          <p className="text-xs text-white/60">PDF Document</p>
        </div>
      </a>
    );
  }

  if (analyzed.isVideoUrl) {
    return (
      <button
        type="button"
        onClick={() => onSelectMedia(mediaUrl, 'video')}
        className="w-full text-left"
      >
        <video
          src={mediaUrl}
          controls
          className="w-full max-h-[400px] rounded-lg bg-black"
        />
      </button>
    );
  }

  if (analyzed.isImageUrl) {
    return (
      <button type="button" onClick={() => onSelectMedia(mediaUrl, 'image')}>
        <Image
          src={mediaUrl}
          alt="Chat image"
          width={360}
          height={420}
          className="max-h-[420px] rounded-lg object-contain"
        />
      </button>
    );
  }

  if (analyzed.isAudioUrl) {
    return (
      <div className="w-full ">
        <Waveform key={mediaUrl} recordedVoiceURL={mediaUrl} />
      </div>
    );
  }

  return <p className="whitespace-pre-wrap">{msg.text}</p>;
}
