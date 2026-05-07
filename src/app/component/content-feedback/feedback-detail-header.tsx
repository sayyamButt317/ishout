'use client';

import { ChevronLeft } from 'lucide-react';

type FeedbackDetailHeaderProps = {
  title: string;
  campaign: string;
  onBack: () => void;
  contentType: 'story' | 'post' | 'demographics';
  onContentTypeChange: (value: 'story' | 'post' | 'demographics') => void;
};

export default function FeedbackDetailHeader({
  title,
  campaign,
  onBack,
  contentType,
  onContentTypeChange,
}: FeedbackDetailHeaderProps) {
  return (
    <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-white/10 px-3 py-2">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="min-w-0">
          <h3 className="truncate text-sm font-bold text-white">{title}</h3>
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">
            {campaign}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <select
          value={contentType}
          onChange={(e) =>
            onContentTypeChange(e.target.value as 'story' | 'post' | 'demographics')
          }
          className="rounded-lg border border-white/10 bg-black px-3 py-2 text-xs font-bold text-white focus:outline-none"
        >
          <option value="story">Story</option>
          <option value="post">Post</option>
          <option value="demographics">Demographics</option>
        </select>
        <select className="rounded-lg border border-white/10 bg-black px-3 py-2 text-xs font-bold text-white focus:outline-none">
          <option>Version 1</option>
          <option>Version 2</option>
        </select>
      </div>
    </div>
  );
}
