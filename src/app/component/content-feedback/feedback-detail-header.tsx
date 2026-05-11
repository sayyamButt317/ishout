'use client';

import { ChevronDown, ChevronLeft } from 'lucide-react';

type ContentType = 'story' | 'post' | 'demographics';
type FeedbackDetailHeaderProps = {
  title: string;
  campaign: string;
  onBack: () => void;
  contentType: 'story' | 'post' | 'demographics';
  onContentTypeChange: (value: 'story' | 'post' | 'demographics') => void;
  version: string;
  onVersionChange: (value: string) => void;
};

export default function FeedbackDetailHeader({
  title,
  campaign,
  onBack,
  contentType,
  onContentTypeChange,
  version,
  onVersionChange,
}: FeedbackDetailHeaderProps) {


  const selectClassName =
    'h-9 w-full appearance-none rounded-xl border border-white/15 bg-black px-3 pr-8 text-xs font-semibold tracking-wide text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] transition-all outline-none hover:border-white/30 hover:bg-black focus:border-cyan-300/60 focus:ring-2 focus:ring-cyan-400/25';

  return (
    <div className="flex shrink-0 flex-wrap items-center justify-between gap-2 border-b border-white/10 bg-black px-3 py-2 text-white shadow-[0_10px_24px_rgba(0,0,0,0.35)]">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="flex size-9 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10"
        >
          <ChevronLeft className="size-5" />
        </button>
        <div className="min-w-0 ">
          <h3 className="truncate text-sm font-bold text-white">{title}</h3>
          <p className="text-[10px] font-bold uppercase tracking-wider text-white/50">
            {campaign}
          </p>
        </div>
      </div>
      <div className="grid w-full max-w-[340px] grid-cols-2 gap-2 sm:w-auto bg-black">
        <div className="relative bg-black">
          <select
            value={contentType}
            onChange={(e) =>
              onContentTypeChange(e.target.value as ContentType)
            }
            className={selectClassName}
          >
            <option className="bg-black text-white" value="story">
              Story
            </option>
            <option className="bg-black text-white" value="post">
              Post
            </option>
            <option className="bg-black text-white" value="demographics">
              Demographics
            </option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-white/55" />
        </div>

        <div className="relative ">
          <select
            value={version}
            onChange={(e) => onVersionChange(e.target.value)}
            className={selectClassName}
          >
            <option className="bg-black text-white" value="1">Version 1</option>
            <option className="bg-black text-white" value="2">Version 2</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-2.5 top-1/2 size-4 -translate-y-1/2 text-white/55" />
        </div>
      </div>
    </div>
  );
}
