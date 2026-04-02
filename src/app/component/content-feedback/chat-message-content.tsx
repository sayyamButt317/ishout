'use client';
import Image from 'next/image';
import Waveform from './audiowave';
import { AnalyzeURL } from '@/src/utils/video-duration';

type ChatMessageContentProps = {
  message: string;
  onSelectMedia: (url: string, type: 'video' | 'image') => void;
};

const getMediaUrlFromMessage = (raw: string) => {
  const value = raw.trim();
  const match = value.match(/https?:\/\/\S+/i);
  const url = match ? match[0] : value;
  return url.replace(/[),.;!?]+$/, '');
};

export default function ChatMessageContent({
  message,
  onSelectMedia,
}: ChatMessageContentProps) {
  const mediaUrl = getMediaUrlFromMessage(message);
  const analyzed = AnalyzeURL(mediaUrl);

  if (analyzed.isVideoUrl) {
    return (
      <button
        type="button"
        onClick={() => onSelectMedia(mediaUrl, 'video')}
        className="w-full text-left cursor-pointer"
      >
        <video
          src={mediaUrl}
          autoPlay={false}
          preload="auto"
          poster={mediaUrl}
          controls={true}
          className="w-full h-auto max-h-[300px] sm:max-h-[350px] md:max-h-[400px] rounded-lg bg-black"
        />
      </button>
    );
  }
  if (analyzed.isImageUrl) {
    return (
      <button
        type="button"
        onClick={() => onSelectMedia(mediaUrl, 'image')}
        className="w-full text-left cursor-pointer"
      >
        <Image
          src={mediaUrl}
          alt="Chat image"
          width={360}
          height={420}
          className="w-auto max-w-full h-auto max-h-[420px] rounded-lg object-contain bg-black/20"
        />
      </button>
    );
  }

  if (analyzed.isAudioUrl) {
    return (
      <div className="w-full min-w-[200px] max-w-[min(100%,360px)] py-0.5">
        <Waveform key={mediaUrl} recordedVoiceURL={mediaUrl} />
      </div>
    );
  }

  return <p className="whitespace-pre-wrap break-normal">{message}</p>;
}

