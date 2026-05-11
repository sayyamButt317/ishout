'use client';

import useCampaignBriefDeliverablesHook from '@/src/routes/Admin/Hooks/content/campaign-brief-deliverables';
import { ScrollText, ClipboardList, CalendarClock, Sparkles } from 'lucide-react';

type BrandFeedbackGuidelinesTabProps = {
  briefId: string;
};

function renderList(items: string[]) {
  if (items.length === 0) {
    return (
      <p className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs leading-relaxed text-white/50">
        No data found.
      </p>
    );
  }
  return (
    <div className="space-y-2">
      {items.map((item, idx) => (
        <div
          key={`${item}-${idx}`}
          className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-xs leading-relaxed text-white/75"
        >
          <span className="mr-2 text-violet-400">•</span>
          {item}
        </div>
      ))}
    </div>
  );
}

export default function BrandFeedbackGuidelinesTab({ briefId }: BrandFeedbackGuidelinesTabProps) {
  const { data, isLoading, isError } = useCampaignBriefDeliverablesHook(briefId);
  const brief = data?.campaign_brief;

  return (
    <div className="min-h-75 flex-1 overflow-y-auto p-3 lg:min-h-0">
      {!briefId ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs leading-relaxed text-white/60">Campaign brief id not found.</p>
        </div>
      ) : isLoading ? (
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <p className="text-xs leading-relaxed text-white/60">Loading guidelines...</p>
        </div>
      ) : isError ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
          <p className="text-xs leading-relaxed text-red-300">Campaign brief not found.</p>
        </div>
      ) : !brief ? (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4">
          <p className="text-xs leading-relaxed text-red-300">Campaign brief not found.</p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="rounded-xl border border-violet-500/25 bg-linear-to-r from-violet-500/15 via-violet-500/5 to-transparent p-4">
            <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-violet-400/30 bg-violet-500/10 px-2 py-1 text-[10px] font-semibold uppercase tracking-wider text-violet-300">
              <Sparkles className="size-3" />
              Campaign Guidelines
            </div>
            <h3 className="text-sm font-semibold text-white">{brief.title}</h3>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#10131A] p-4">
            <h3 className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-white">
              <ScrollText className="size-4 text-violet-400" />
              Campaign Overview
            </h3>
            <div>{renderList(brief.campaign_overview ?? [])}</div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#10131A] p-4">
            <h3 className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-white">
              <ClipboardList className="size-4 text-violet-400" />
              Deliverables Per Influencer
            </h3>
            <div>{renderList(brief.deliverables_per_influencer ?? [])}</div>
          </div>

          <div className="rounded-xl border border-white/10 bg-[#10131A] p-4">
            <h3 className="mb-3 inline-flex items-center gap-2 text-sm font-semibold text-white">
              <CalendarClock className="size-4 text-violet-400" />
              Timeline
            </h3>
            <div>{renderList(brief.timeline ?? [])}</div>
          </div>
        </div>
      )}
    </div>
  );
}
