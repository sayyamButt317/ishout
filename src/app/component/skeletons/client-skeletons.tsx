'use client';

import { Skeleton } from '@/components/ui/skeleton';

export function ClientDashboardHomeSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-slate-200 dark:bg-section-overlays p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <Skeleton className="h-10 w-10 shrink-0 rounded-lg bg-slate-200 dark:bg-white/8" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-48 bg-slate-200 dark:bg-white/8" />
              <Skeleton className="h-4 w-72 max-w-full bg-slate-100 dark:bg-white/5" />
            </div>
          </div>
        </div>
      </div>
      <Skeleton className="h-40 w-full max-w-2xl rounded-2xl border border-white/10 bg-slate-200 dark:bg-white/3" />
    </div>
  );
}

/** Choose campaign — hero header + stacked option cards */
export function ChooseCampaignSkeleton() {
  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300">
      <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-slate-100 dark:bg-section-overlays p-6">
        <div className="flex items-start gap-3">
          <Skeleton className="h-10 w-10 shrink-0 rounded-lg bg-slate-200 dark:bg-white/8" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-[min(100%,28rem)] bg-slate-200 dark:bg-white/8" />
            <Skeleton className="h-4 w-full max-w-xl bg-slate-100 dark:bg-white/5" />
          </div>
        </div>
        <div className="mt-4 flex justify-center">
          <Skeleton className="h-7 w-40 rounded-full bg-slate-200 dark:bg-white/6" />
        </div>
      </div>
      <div className="space-y-4 border-t border-white/10 pt-4">
        {[0, 1].map((i) => (
          <div
            key={i}
            className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/30 p-6 md:p-8"
          >
            <div className="flex flex-col gap-6 md:flex-row md:items-center">
              <div className="flex-1 space-y-4">
                <Skeleton className="h-14 w-14 rounded-2xl bg-slate-200 dark:bg-white/8" />
                <Skeleton className="h-8 w-56 bg-slate-200 dark:bg-white/8" />
                <Skeleton className="h-4 w-full max-w-md bg-slate-100 dark:bg-white/5" />
                <Skeleton className="h-10 w-36 rounded-full bg-slate-200 dark:bg-white/6" />
              </div>
              <Skeleton className="h-48 flex-1 rounded-2xl bg-slate-100 dark:bg-white/5 md:max-w-sm" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Video / image studio — header with search + filter row + template grid */
export function StudioLibrarySkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans">
      <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-slate-100 dark:bg-section-overlays p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <Skeleton className="h-10 w-10 shrink-0 rounded-lg bg-slate-200 dark:bg-white/8" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-56 bg-slate-200 dark:bg-white/8" />
              <Skeleton className="h-4 w-full max-w-lg bg-slate-100 dark:bg-white/5" />
            </div>
          </div>
          <Skeleton className="h-10 w-full max-w-64 rounded-lg bg-slate-200 dark:bg-white/6" />
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-9 w-24 rounded-full bg-slate-200 dark:bg-white/6" />
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <Skeleton className="h-9 w-28 rounded-lg bg-slate-100 dark:bg-white/5" />
        <Skeleton className="h-9 w-28 rounded-lg bg-slate-100 dark:bg-white/5" />
        <Skeleton className="ml-auto h-9 w-32 rounded-lg bg-slate-100 dark:bg-white/5" />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: cards }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-white/10 bg-slate-100 dark:bg-[#0f0f12] shadow-lg"
          >
            <Skeleton className="aspect-video w-full rounded-none bg-slate-200 dark:bg-white/6" />
            <div className="space-y-3 p-4">
              <Skeleton className="h-5 w-4/5 bg-slate-200 dark:bg-white/8" />
              <div className="flex gap-2">
                <Skeleton className="h-6 w-20 rounded-md bg-slate-100 dark:bg-white/5" />
                <Skeleton className="h-6 w-24 rounded-md bg-slate-100 dark:bg-white/5" />
              </div>
              <Skeleton className="h-3 w-28 bg-slate-100 dark:bg-white/5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Company profile — avatar + two form cards */
export function ClientProfileSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-slate-100 dark:bg-section-overlays p-6">
        <div className="flex items-start gap-3">
          <Skeleton className="h-10 w-10 shrink-0 rounded-lg bg-slate-200 dark:bg-white/8" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-40 bg-slate-200 dark:bg-white/8" />
            <Skeleton className="h-4 w-56 bg-slate-100 dark:bg-white/5" />
          </div>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[auto_1fr] lg:items-start">
        <div className="flex flex-col items-center gap-3 rounded-xl border border-white/5 bg-foreground/5 p-6">
          <Skeleton className="h-24 w-24 rounded-full bg-slate-200 dark:bg-white/8" />
          <Skeleton className="h-9 w-32 rounded-xl bg-slate-200 dark:bg-white/6" />
        </div>
        <div className="space-y-6">
          {[0, 1].map((card) => (
            <div
              key={card}
              className="rounded-xl border border-white/5 bg-foreground/5 px-6 py-6 space-y-4"
            >
              <Skeleton className="h-4 w-36 bg-slate-200 dark:bg-white/8" />
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="space-y-2">
                  <Skeleton className="h-3 w-24 bg-slate-100 dark:bg-white/5" />
                  <Skeleton className="h-11 w-full rounded-xl bg-slate-200 dark:bg-white/6" />
                </div>
              ))}
              <div className="flex justify-end gap-2 pt-2">
                <Skeleton className="h-9 w-24 rounded-xl bg-slate-200 dark:bg-white/6" />
                <Skeleton className="h-9 w-28 rounded-xl bg-slate-200 dark:bg-white/8" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** AI campaign brief generator — prompt + optional result panel */
export function CampaignBriefGeneratorSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-slate-100 dark:bg-section-overlays p-6">
        <div className="flex items-start gap-3">
          <Skeleton className="h-10 w-10 shrink-0 rounded-lg bg-slate-200 dark:bg-white/8" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-64 bg-slate-200 dark:bg-white/8" />
            <Skeleton className="h-4 w-full max-w-xl bg-slate-100 dark:bg-white/5" />
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4 rounded-2xl border border-white/10 bg-slate-100 dark:bg-black/25 p-6">
          <Skeleton className="h-4 w-32 bg-slate-200 dark:bg-white/8" />
          <Skeleton className="h-36 w-full rounded-xl bg-slate-100 dark:bg-white/5" />
          <Skeleton className="h-11 w-full rounded-xl bg-slate-200 dark:bg-white/8 sm:max-w-xs" />
        </div>
        <div className="min-h-70 space-y-4 rounded-2xl border border-white/10 bg-slate-100 dark:bg-black/20 p-6">
          <Skeleton className="h-4 w-40 bg-slate-200 dark:bg-white/8" />
          <Skeleton className="h-3 w-full bg-slate-100 dark:bg-white/5" />
          <Skeleton className="h-3 w-full bg-slate-100 dark:bg-white/5" />
          <Skeleton className="h-3 w-4/5 bg-slate-100 dark:bg-white/5" />
          <Skeleton className="h-3 w-full bg-slate-100 dark:bg-white/5" />
          <Skeleton className="h-3 w-2/3 bg-slate-100 dark:bg-white/5" />
        </div>
      </div>
    </div>
  );
}

/** Briefs list — search/sort bar + document cards */
export function ClientBriefsListSkeleton({ items = 6 }: { items?: number }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-section-overlays p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-3">
            <Skeleton className="h-10 w-10 shrink-0 rounded-lg bg-slate-200 dark:bg-white/8" />
            <div className="space-y-2">
              <Skeleton className="h-7 w-48 bg-slate-200 dark:bg-white/8" />
              <Skeleton className="h-4 w-72 max-w-full bg-slate-100 dark:bg-white/5" />
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <Skeleton className="h-10 w-full sm:w-72 rounded-lg bg-slate-200 dark:bg-white/6" />
            <Skeleton className="h-10 w-36 rounded-lg bg-slate-200 dark:bg-white/6" />
          </div>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: items }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-300 dark:bg-[#0f0f12]"
          >
            <Skeleton className="h-40 w-full bg-slate-200 dark:bg-white/6" />
            <div className="space-y-3 p-4">
              <Skeleton className="h-5 w-3/4 bg-slate-200 dark:bg-white/8" />
              <Skeleton className="h-3 w-full bg-slate-100 dark:bg-white/5" />
              <Skeleton className="h-3 w-5/6 bg-slate-100 dark:bg-white/5" />
              <div className="flex gap-2 pt-2">
                <Skeleton className="h-9 flex-1 rounded-lg bg-slate-200 dark:bg-white/6" />
                <Skeleton className="h-9 w-9 rounded-lg bg-slate-100 dark:bg-white/5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/** Approved content grid when campaign is selected */
export function ApprovedContentGridSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-slate-100 dark:bg-section-overlays p-6">
        <div className="flex items-start gap-3">
          <Skeleton className="h-10 w-10 shrink-0 rounded-lg bg-slate-200 dark:bg-white/8" />
          <div className="space-y-2">
            <Skeleton className="h-7 w-44 bg-slate-200 dark:bg-white/8" />
            <Skeleton className="h-4 w-80 max-w-full bg-slate-100 dark:bg-white/5" />
          </div>
        </div>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: cards }).map((_, i) => (
          <div
            key={i}
            className="overflow-hidden rounded-2xl border border-white/10 bg-slate-100 dark:bg-[#0f0f10] p-4 space-y-3"
          >
            <Skeleton className="aspect-video w-full rounded-xl bg-slate-200 dark:bg-white/6" />
            <Skeleton className="h-4 w-2/3 bg-slate-200 dark:bg-white/8" />
            <Skeleton className="h-3 w-1/2 bg-slate-100 dark:bg-white/5" />
          </div>
        ))}
      </div>
    </div>
  );
}

/** Minimal placeholder for stub pages (e.g. reports) */
export function ClientPlaceholderPageSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-slate-100 dark:bg-section-overlays p-6">
        <div className="space-y-2">
          <Skeleton className="h-7 w-40 bg-slate-200 dark:bg-white/8" />
          <Skeleton className="h-4 w-56 bg-slate-100 dark:bg-white/5" />
        </div>
      </div>
      <Skeleton className="h-32 w-full rounded-2xl border border-white/10 bg-slate-200 dark:bg-white/3" />
    </div>
  );
}
