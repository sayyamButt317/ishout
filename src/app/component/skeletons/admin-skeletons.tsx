'use client';
import { Skeleton } from '@/components/ui/skeleton';

export function TablePageSkeleton({ columns = 8, rows = 6 }: { columns?: number; rows?: number }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-section-overlays p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-7 w-52 bg-white/8" />
            <Skeleton className="h-4 w-72 bg-white/5" />
          </div>
          <Skeleton className="h-8 w-8 rounded-lg bg-white/8" />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/2 overflow-hidden">
        <div className="flex gap-4 border-b border-white/10 px-4 py-3">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1 bg-white/8" />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex items-center gap-4 border-b border-white/5 px-4 py-4">
            <Skeleton className="h-10 w-10 shrink-0 rounded-full bg-white/6" />
            {Array.from({ length: columns - 1 }).map((_, c) => (
              <Skeleton key={c} className="h-4 flex-1 bg-white/5" />
            ))}
          </div>
        ))}
        <div className="flex items-center justify-between px-4 py-3">
          <Skeleton className="h-4 w-32 bg-white/5" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20 rounded-lg bg-white/8" />
            <Skeleton className="h-8 w-20 rounded-lg bg-white/8" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function TablePageWithFiltersSkeleton({ columns = 8, rows = 6 }: { columns?: number; rows?: number }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-section-overlays p-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-2">
              <Skeleton className="h-7 w-52 bg-white/8" />
              <Skeleton className="h-4 w-72 bg-white/5" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-8 w-8 rounded-lg bg-white/8" />
              <Skeleton className="h-10 w-56 rounded-lg bg-white/6" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <Skeleton className="h-10 w-40 rounded-lg bg-white/6" />
            <Skeleton className="h-10 w-40 rounded-lg bg-white/6" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/2 overflow-hidden">
        <div className="flex gap-4 border-b border-white/10 px-4 py-3">
          {Array.from({ length: columns }).map((_, i) => (
            <Skeleton key={i} className="h-4 flex-1 bg-white/8" />
          ))}
        </div>
        {Array.from({ length: rows }).map((_, r) => (
          <div key={r} className="flex items-center gap-4 border-b border-white/5 px-4 py-4">
            <Skeleton className="h-10 w-10 shrink-0 rounded-full bg-white/6" />
            {Array.from({ length: columns - 1 }).map((_, c) => (
              <Skeleton key={c} className="h-4 flex-1 bg-white/5" />
            ))}
          </div>
        ))}
        <div className="flex items-center justify-between px-4 py-3">
          <Skeleton className="h-4 w-32 bg-white/5" />
          <div className="flex gap-2">
            <Skeleton className="h-8 w-20 rounded-lg bg-white/8" />
            <Skeleton className="h-8 w-20 rounded-lg bg-white/8" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function CardGridSkeleton({ cards = 8 }: { cards?: number }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-section-overlays p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-7 w-52 bg-white/8" />
            <Skeleton className="h-4 w-60 bg-white/5" />
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="h-8 w-8 rounded-lg bg-white/8" />
            <Skeleton className="h-10 w-40 rounded-xl bg-white/6" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: cards }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-[#0f0f12] p-4 space-y-4"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full bg-white/8" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4 bg-white/8" />
                <Skeleton className="h-3 w-1/2 bg-white/5" />
              </div>
            </div>
            <div className="space-y-2">
              <Skeleton className="h-3 w-full bg-white/5" />
              <Skeleton className="h-3 w-4/5 bg-white/5" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Skeleton className="h-8 rounded-md bg-white/5" />
              <Skeleton className="h-8 rounded-md bg-white/5" />
            </div>
            <Skeleton className="h-10 w-full rounded-xl bg-white/6" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function CampaignDetailSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans">
      <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-section-overlays p-6 sm:p-8">
        <div className="mb-4 flex items-center gap-1.5">
          <Skeleton className="h-3 w-20 bg-white/5" />
          <Skeleton className="h-3 w-3 rounded-full bg-white/5" />
          <Skeleton className="h-3 w-28 bg-white/5" />
        </div>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <Skeleton className="h-14 w-14 rounded-2xl bg-white/8" />
            <div className="space-y-2">
              <Skeleton className="h-8 w-48 bg-white/8" />
              <Skeleton className="h-4 w-32 bg-white/5" />
            </div>
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-28 rounded-xl bg-white/6" />
            <Skeleton className="h-10 w-28 rounded-xl bg-white/6" />
          </div>
        </div>
        <div className="mt-4 flex gap-3">
          <Skeleton className="h-9 w-32 rounded-xl bg-white/6" />
          <Skeleton className="h-9 w-32 rounded-xl bg-white/6" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-[#0f0f12] p-4 space-y-3"
          >
            <div className="flex items-center gap-3">
              <Skeleton className="h-12 w-12 rounded-full bg-white/8" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4 bg-white/8" />
                <Skeleton className="h-3 w-1/2 bg-white/5" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Skeleton className="h-8 rounded-md bg-white/5" />
              <Skeleton className="h-8 rounded-md bg-white/5" />
            </div>
            <Skeleton className="h-10 w-full rounded-xl bg-white/6" />
          </div>
        ))}
      </div>
    </div>
  );
}

export function KanbanSkeleton({ columnsCount = 4, cardsPerColumn = 3 }: { columnsCount?: number; cardsPerColumn?: number }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300 font-sans">
      <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-section-overlays p-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-12 w-12 rounded-xl bg-white/8" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-6 w-48 bg-white/8" />
            <Skeleton className="h-4 w-72 bg-white/5" />
          </div>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-4">
        {Array.from({ length: columnsCount }).map((_, col) => (
          <div
            key={col}
            className="flex w-1/3 shrink-0 flex-col gap-4 rounded-xl border border-white/10 bg-white/2 p-4"
          >
            <div className="flex items-center justify-between px-2">
              <Skeleton className="h-4 w-24 bg-white/8" />
              <Skeleton className="h-5 w-8 rounded-full bg-white/8" />
            </div>
            {Array.from({ length: cardsPerColumn }).map((_, card) => (
              <div
                key={card}
                className="rounded-2xl border border-white/10 bg-[#0F0F0F] p-5 space-y-4"
              >
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full bg-white/8" />
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-4 w-3/4 bg-white/8" />
                    <Skeleton className="h-3 w-1/2 bg-white/5" />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-12 bg-white/5" />
                    <Skeleton className="h-3 w-24 bg-white/5" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-14 bg-white/5" />
                    <Skeleton className="h-3 w-16 bg-white/5" />
                  </div>
                </div>
                <div className="flex gap-3">
                  <Skeleton className="h-11 flex-1 rounded-xl bg-white/5" />
                  <Skeleton className="h-11 flex-1 rounded-xl bg-white/6" />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ChatInboxSkeleton() {
  return (
    <div className="flex h-screen animate-in fade-in duration-300">
      <aside className="w-1/3 border-r border-gray-700">
        <div className="p-4 flex items-center gap-3 border-b border-gray-700">
          <Skeleton className="h-10 w-10 rounded-xl bg-white/8" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-36 bg-white/8" />
            <Skeleton className="h-3 w-24 bg-white/5" />
          </div>
        </div>
        <div className="space-y-1 p-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-5 rounded-lg">
              <Skeleton className="h-10 w-10 rounded-xl bg-white/8" />
              <Skeleton className="h-5 w-32 bg-white/6" />
            </div>
          ))}
        </div>
      </aside>
      <main className="flex-1 flex flex-col">
        <div className="p-4 border-b border-gray-700 flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-xl bg-white/8" />
          <Skeleton className="h-5 w-36 bg-white/6" />
        </div>
        <div className="flex-1 p-4 space-y-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <Skeleton
                className={`h-10 rounded-2xl bg-white/5 ${i % 2 === 0 ? 'w-2/3' : 'w-1/2'}`}
              />
            </div>
          ))}
        </div>
        <div className="border-t border-gray-700 p-3 flex gap-2">
          <Skeleton className="h-10 flex-1 rounded-lg bg-white/5" />
          <Skeleton className="h-10 w-12 rounded-md bg-white/8" />
        </div>
      </main>
    </div>
  );
}

export function NegotiationListSkeleton({ items = 4 }: { items?: number }) {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="relative overflow-hidden rounded-2xl border border-white/6 bg-section-overlays p-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-7 w-40 bg-white/8" />
            <Skeleton className="h-4 w-56 bg-white/5" />
          </div>
          <Skeleton className="h-8 w-8 rounded-lg bg-white/8" />
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-[#0f0f11] p-3 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <Skeleton className="h-10 w-full md:max-w-sm rounded-xl bg-white/5" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-28 rounded-xl bg-white/5" />
          <Skeleton className="h-9 w-24 rounded-xl bg-white/5" />
        </div>
      </div>

      <div className="space-y-4">
        {Array.from({ length: items }).map((_, i) => (
          <div
            key={i}
            className="rounded-2xl border border-white/10 bg-[linear-gradient(135deg,#17181c_0%,#111217_100%)] p-5"
          >
            <div className="flex flex-wrap items-center gap-5 lg:flex-nowrap">
              <div className="min-w-[220px] flex-1 space-y-2">
                <Skeleton className="h-5 w-40 bg-white/8" />
                <Skeleton className="h-3 w-32 bg-white/5" />
                <Skeleton className="h-3 w-48 bg-white/5" />
                <Skeleton className="h-4 w-full bg-white/5" />
              </div>
              <div className="min-w-[190px] flex-1">
                <div className="rounded-xl border border-white/10 bg-black/20 p-2.5 space-y-2">
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-10 bg-white/5" />
                    <Skeleton className="h-5 w-16 rounded-full bg-white/6" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-10 bg-white/5" />
                    <Skeleton className="h-3 w-20 bg-white/5" />
                  </div>
                  <div className="flex justify-between">
                    <Skeleton className="h-3 w-10 bg-white/5" />
                    <Skeleton className="h-5 w-12 rounded-full bg-white/6" />
                  </div>
                </div>
              </div>
              <div className="min-w-[170px] flex-1 space-y-2">
                <Skeleton className="h-3 w-24 bg-white/5" />
                <div className="grid grid-cols-2 gap-y-1">
                  <Skeleton className="h-3 w-10 bg-white/5" />
                  <Skeleton className="h-3 w-16 bg-white/5" />
                  <Skeleton className="h-3 w-14 bg-white/5" />
                  <Skeleton className="h-3 w-12 bg-white/5" />
                </div>
              </div>
              <div className="min-w-[140px] flex-1 space-y-2">
                <Skeleton className="h-3 w-24 bg-white/5" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-2 w-2 rounded-full bg-white/8" />
                  <Skeleton className="h-3 w-16 bg-white/5" />
                </div>
                <Skeleton className="h-3 w-20 bg-white/5" />
              </div>
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-28 rounded-xl bg-white/6" />
                <Skeleton className="h-10 w-10 rounded-lg bg-white/5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-4 py-3">
        <Skeleton className="h-4 w-24 bg-white/5" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-20 rounded-lg bg-white/6" />
          <Skeleton className="h-8 w-20 rounded-lg bg-white/6" />
        </div>
      </div>
    </div>
  );
}

export function ContentDetailSkeleton() {
  return (
    <div className="flex w-full flex-col font-sans overflow-y-auto lg:h-[calc(100vh-24px)] lg:flex-row lg:overflow-hidden animate-in fade-in duration-300">
      <div className="flex w-full flex-col lg:flex-1 lg:overflow-hidden lg:border-r lg:border-white/10">
        <div className="flex items-center gap-3 border-b border-white/10 p-4">
          <Skeleton className="h-8 w-8 rounded-lg bg-white/8" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-5 w-48 bg-white/8" />
            <Skeleton className="h-3 w-32 bg-white/5" />
          </div>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-20 rounded-lg bg-white/6" />
            <Skeleton className="h-9 w-20 rounded-lg bg-white/6" />
          </div>
        </div>
        <div className="relative flex-1 p-4">
          <Skeleton className="aspect-9/16 w-full max-w-md mx-auto rounded-2xl bg-white/5" />
        </div>
        <div className="flex items-center gap-3 border-t border-white/10 p-4">
          <Skeleton className="h-4 w-16 bg-white/5" />
          <Skeleton className="h-4 w-16 bg-white/5" />
          <div className="ml-auto flex gap-2">
            <Skeleton className="h-10 w-32 rounded-xl bg-white/6" />
            <Skeleton className="h-10 w-32 rounded-xl bg-white/6" />
          </div>
        </div>
      </div>
      <div className="w-full lg:w-[400px] border-t lg:border-t-0 lg:border-l border-white/10 p-4 space-y-4">
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1 rounded-lg bg-white/6" />
          <Skeleton className="h-10 flex-1 rounded-lg bg-white/6" />
        </div>
        <div className="space-y-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
              <Skeleton className={`h-10 rounded-2xl bg-white/5 ${i % 2 === 0 ? 'w-3/4' : 'w-1/2'}`} />
            </div>
          ))}
        </div>
        <div className="flex gap-2 pt-2">
          <Skeleton className="h-10 flex-1 rounded-lg bg-white/5" />
          <Skeleton className="h-10 w-10 rounded-lg bg-white/8" />
        </div>
      </div>
    </div>
  );
}

export function AnalyticsDashboardSkeleton() {
  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Skeleton className="h-8 w-72 bg-white/8" />
          <Skeleton className="h-10 w-28 rounded-xl bg-white/6" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-[#0f0f12] border border-white/10 rounded-xl p-3 space-y-2">
              <Skeleton className="h-3 w-16 bg-white/5" />
              <Skeleton className="h-5 w-12 bg-white/8" />
            </div>
          ))}
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/3 p-4 flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full bg-white/8" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-40 bg-white/8" />
            <Skeleton className="h-3 w-56 bg-white/5" />
          </div>
          <Skeleton className="h-4 w-20 bg-white/5" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl bg-[#0f0f12] border border-white/10 overflow-hidden flex">
            <Skeleton className="w-[45%] aspect-9/16 bg-white/5" />
            <div className="flex-1 p-5 space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-11 w-11 rounded-full bg-white/8" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-28 bg-white/8" />
                  <Skeleton className="h-3 w-20 bg-white/5" />
                </div>
              </div>
              <Skeleton className="h-3 w-full bg-white/5" />
              <div className="grid grid-cols-2 gap-2">
                {Array.from({ length: 6 }).map((_, j) => (
                  <Skeleton key={j} className="h-8 rounded-md bg-white/5" />
                ))}
              </div>
              <Skeleton className="h-3 w-32 bg-white/5" />
              <div className="flex gap-3">
                <Skeleton className="h-4 w-20 bg-white/5" />
                <Skeleton className="h-6 w-24 rounded-full bg-white/6" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
